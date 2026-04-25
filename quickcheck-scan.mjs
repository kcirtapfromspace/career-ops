#!/usr/bin/env node
// Greenhouse quick-check scanner for Patrick Deutsch
// Accept: US Remote, Denver/CO metro, SF Bay Area, Los Gatos, Seattle metro, Bend OR
// NYC/Chicago without "remote" = REJECT. All non-US = REJECT. Other US cities = REJECT.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const POSITIVE = [
  'software engineer', 'backend engineer', 'data engineer', 'data platform',
  'platform engineer', 'infrastructure engineer', 'ml engineer', 'machine learning engineer',
  'engineering manager', 'sre', 'site reliability', 'devops', 'ml platform', 'mlops',
  'ai engineer', 'ai infrastructure', 'nlp', 'llm', 'full stack engineer',
  'data architect', 'data infrastructure', 'manager, software', 'manager, data',
  'manager, platform', 'manager, infrastructure', 'manager, engineering', 'engineering lead',
];
const NEGATIVE = [
  'junior', 'intern', '.net', 'java ', 'ios', 'android', 'php', 'ruby', 'embedded',
  'firmware', 'fpga', 'asic', 'blockchain', 'web3', 'crypto', 'salesforce admin',
  'sap ', 'oracle ebs', 'mainframe', 'cobol',
];

// Non-US indicators — reject if ANY appear
const NON_US = [
  'united kingdom', ' uk)', '(uk)', ', uk,', ', uk ', 'uk (', '- uk', 'uk\n', 'england', 'scotland', 'wales',
  'london', 'manchester', 'edinburgh',
  'germany', 'berlin', 'munich', 'münchen', 'hamburg', 'cologne', 'frankfurt',
  'france', 'paris', 'lyon',
  'netherlands', 'amsterdam', 'rotterdam',
  'spain', 'barcelona', 'madrid',
  'portugal', 'lisbon',
  'sweden', 'stockholm',
  'norway', 'oslo',
  'denmark', 'copenhagen',
  'finland', 'helsinki',
  'switzerland', 'zurich', 'zürich', 'geneva', 'lausanne',
  'austria', 'vienna',
  'poland', 'warsaw',
  'belgium', 'brussels',
  'ireland', 'dublin',
  'italy', 'milan', 'rome',
  'czech', 'prague',
  'hungary', 'budapest',
  'israel', 'tel aviv',
  'india', 'bangalore', 'bengaluru', 'mumbai', 'hyderabad', 'pune', 'chennai',
  'japan', 'tokyo', 'osaka',
  'south korea', 'seoul',
  'china', 'beijing', 'shanghai', 'shenzhen',
  'singapore',
  'taiwan', 'taipei',
  'australia', 'sydney', 'melbourne',
  'canada', 'toronto', 'vancouver', 'montreal', 'ottawa', 'calgary',
  'brazil', 'são paulo', 'sao paulo',
  'mexico', 'ciudad de méxico',
  'argentina', 'buenos aires',
  'uae', 'dubai',
  'south africa', 'cape town',
  'vilnius', 'riga', 'tallinn',
  'athens', 'greece',
  'europe', 'emea', 'apac', 'latam',
];

// Accepted US on-site cities (only the explicitly listed + immediate metro)
const US_ONSITE = [
  // Denver metro (Patrick's base + Colorado)
  'denver', 'boulder, co', 'boulder, colorado', 'broomfield, co', 'broomfield, colorado',
  'fort collins, co', 'fort collins, colorado', 'aurora, co', 'aurora, colorado',
  // SF Bay Area
  'san francisco', 'bay area', 'mountain view', 'palo alto', 'sunnyvale',
  'menlo park', 'redwood city', 'redwood shores', 'santa clara', 'san jose, ca',
  'san jose, california', 'san mateo', 'foster city', 'oakland', 'berkeley',
  'south san francisco', 'emeryville', 'burlingame', 'milpitas', 'fremont, ca',
  'fremont, california', 'cupertino',
  // Los Gatos
  'los gatos',
  // Seattle metro
  'seattle', 'bellevue, wa', 'bellevue, washington', 'kirkland, wa', 'kirkland, washington',
  'redmond, wa', 'redmond, washington', 'bothell',
  // Bend OR
  'bend, or', 'bend, oregon',
];

function titleMatches(title) {
  const t = title.toLowerCase();
  return POSITIVE.some(p => t.includes(p)) && !NEGATIVE.some(n => t.includes(n));
}

function locationAccepted(location) {
  if (!location || location.trim() === '') return true;
  const l = location.toLowerCase();

  // Non-US always rejected (even with remote)
  if (NON_US.some(n => l.includes(n))) return false;

  // US Remote = accept
  if (l.includes('remote')) return true;

  // "United States" / "USA" alone (no specific city) = accept (nationwide/remote)
  if (/^(united states|usa|u\.s\.)(\s*[\(\)].*)?$/.test(l.trim())) return true;

  // Accepted US cities (onsite / hybrid OK)
  if (US_ONSITE.some(a => l.includes(a))) return true;

  // All other specific US locations (Boston, DC, Atlanta, Chicago, NYC, etc.) = reject
  return false;
}

function extractGreenhouseCompanies(yamlPath) {
  const text = fs.readFileSync(yamlPath, 'utf8');
  const lines = text.split('\n');
  const companies = [];
  let current = null;

  for (const line of lines) {
    if (/^\s{2}-\s+name:/.test(line)) {
      if (current) companies.push(current);
      current = { name: line.match(/name:\s*(.+)/)[1].trim(), enabled: true, api: null };
    }
    if (!current) continue;
    if (/^\s+api:/.test(line)) current.api = line.match(/api:\s*(.+)/)[1].trim();
    if (/^\s+enabled:\s*false/.test(line)) current.enabled = false;
  }
  if (current) companies.push(current);
  return companies.filter(c => c.api && c.enabled);
}

function loadHistory(histPath) {
  if (!fs.existsSync(histPath)) return new Set();
  const text = fs.readFileSync(histPath, 'utf8');
  const seen = new Set();
  for (const line of text.split('\n')) {
    const parts = line.split('\t');
    // Standard format: url\tfirst_seen\tportal\ttitle\tcompany\tstatus (col 0 = URL)
    // Legacy quickcheck format: date\tcompany\ttitle\turl\tlocation (col 3 = URL)
    const col0 = parts[0]?.trim();
    const col3 = parts[3]?.trim();
    if (col0?.startsWith('http')) seen.add(col0);
    else if (col3?.startsWith('http')) seen.add(col3);
  }
  return seen;
}

async function fetchJSON(url) {
  for (let i = 0; i < 3; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'career-ops-scanner/1.0' },
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) {
        if (res.status === 404 || res.status === 410) return null;
        throw new Error(`HTTP ${res.status}`);
      }
      return await res.json();
    } catch (e) {
      if (i === 2) return null;
      await new Promise(r => setTimeout(r, 1200 * (i + 1)));
    }
  }
  return null;
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const portalsPath = path.join(__dirname, 'portals.yml');
  const histPath = path.join(__dirname, 'data', 'scan-history.tsv');
  const pipelinePath = path.join(__dirname, 'data', 'pipeline.md');

  const companies = extractGreenhouseCompanies(portalsPath);
  process.stderr.write(`Scanning ${companies.length} Greenhouse companies...\n`);

  const seen = loadHistory(histPath);
  process.stderr.write(`Known history: ${seen.size} URLs\n\n`);

  const newMatches = [];
  const errors = [];
  let checked = 0;

  for (const company of companies) {
    checked++;
    process.stderr.write(`[${checked}/${companies.length}] ${company.name}... `);
    const data = await fetchJSON(company.api + '?content=true');
    if (!data) {
      process.stderr.write('FAIL\n');
      errors.push(company.name);
      continue;
    }

    const jobs = data.jobs || [];
    let found = 0;
    let titlePass = 0;
    for (const job of jobs) {
      const title = job.title || '';
      const location = job.location?.name || '';
      const url = job.absolute_url || '';

      if (!titleMatches(title)) continue;
      titlePass++;
      if (!locationAccepted(location)) continue;
      if (seen.has(url)) continue;

      seen.add(url);
      found++;
      newMatches.push({ company: company.name, title, location, url, date: today });
    }
    process.stderr.write(found > 0
      ? `${found} new  (${titlePass} title / ${jobs.length} total)\n`
      : `ok  (${jobs.length} total, ${titlePass} title match)\n`);
  }

  process.stderr.write(`\nNew: ${newMatches.length} | Errors: ${errors.length}\n`);
  if (errors.length > 0) process.stderr.write(`Failed: ${errors.join(', ')}\n`);

  if (newMatches.length > 0) {
    // Standard TSV format: url\tfirst_seen\tportal\ttitle\tcompany\tstatus
    const tsv = newMatches.map(m =>
      `${m.url}\t${m.date}\tgreenhouse-api\t${m.title}\t${m.company}\tmatched`
    ).join('\n') + '\n';
    fs.appendFileSync(histPath, tsv);

    const section = `\n### Quick-Check Scan (${today}) — Round 2\n\n` +
      newMatches.map(m => `- [ ] ${m.url} | ${m.company} | ${m.title} | ${m.location}`).join('\n') + '\n';
    // Prepend after the first line of pipeline.md (after the H1 + blank line)
    const existing = fs.readFileSync(pipelinePath, 'utf8');
    const insertAfter = '## Pendientes\n';
    const idx = existing.indexOf(insertAfter);
    if (idx !== -1) {
      const updated = existing.slice(0, idx + insertAfter.length) + '\n' + section + '\n' + existing.slice(idx + insertAfter.length);
      fs.writeFileSync(pipelinePath, updated);
    } else {
      fs.appendFileSync(pipelinePath, section);
    }
    process.stderr.write(`Written to scan-history.tsv + pipeline.md\n`);
  }

  console.log(JSON.stringify({ newMatches, errors, today }, null, 2));
}

await main();
