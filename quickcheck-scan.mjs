#!/usr/bin/env node
/**
 * Quick-check scan: Greenhouse API only, no Playwright, no WebSearch.
 * Reads portals.yml, fetches all companies with api: field, applies filters,
 * dedups against scan-history.tsv, and appends new matches to pipeline.md.
 */

import { readFileSync, appendFileSync, writeFileSync, existsSync } from 'fs';

const TODAY = '2026-07-30';

// ── Filters ──────────────────────────────────────────────────────────────────

const POSITIVE = [
  'Software Engineer', 'Backend Engineer', 'Full Stack Engineer',
  'Engineering Manager', 'Data Engineer', 'Data Architect', 'Data Platform',
  'Data Infrastructure', 'Platform Engineer', 'Infrastructure Engineer',
  'Site Reliability', 'SRE', 'DevOps', 'ML Engineer', 'Machine Learning Engineer',
  'ML Platform', 'MLOps', 'AI Engineer', 'AI Infrastructure', 'NLP', 'LLM',
  'Manager, Software', 'Manager, Data', 'Manager, Platform',
  'Manager, Infrastructure', 'Manager, Engineering', 'Engineering Lead',
];

const NEGATIVE = [
  'Junior', 'Intern', '.NET', 'Java ', 'iOS', 'Android', 'PHP', 'Ruby',
  'Embedded', 'Firmware', 'FPGA', 'ASIC', 'Blockchain', 'Web3', 'Crypto',
  'Salesforce Admin', 'SAP ', 'Oracle EBS', 'Mainframe', 'COBOL',
];

// BLOCKED companies (never add)
const BLOCKED = ['palantir'];

function matchesTitle(title) {
  const t = title.toLowerCase();
  const hasPositive = POSITIVE.some(k => t.includes(k.toLowerCase()));
  const hasNegative = NEGATIVE.some(k => t.includes(k.toLowerCase()));
  return hasPositive && !hasNegative;
}

function acceptLocation(location) {
  if (!location) return true; // blank = potentially remote, accept for review
  const loc = location.toLowerCase();

  // Remote anywhere in US
  if (loc.includes('remote')) return true;

  // Accept specific US cities
  if (loc.includes('denver') || loc.includes('colorado')) return true;
  if (loc.includes('san francisco') || loc === 'sf') return true;
  if (loc.includes('los gatos')) return true;
  if (loc.includes('seattle')) return true;
  if (loc.includes('bend')) return true;
  if (loc === 'united states' || loc.includes('anywhere in the us')) return true;

  // NYC/Chicago: only accept if "remote" is also present
  if (loc.includes('new york') || loc.includes('chicago')) {
    return loc.includes('remote');
  }

  // Everything else (international, other US cities) → reject
  return false;
}

// ── Minimal YAML parser for portals.yml (just extract api: entries) ───────────
// We do a simple line-based parse to avoid needing an npm dep

function extractGreenhouseCompanies(yamlText) {
  const companies = [];
  let current = null;
  for (const raw of yamlText.split('\n')) {
    const line = raw.trimEnd();
    // Start of a new company entry
    if (/^  - name:/.test(line)) {
      if (current && current.api && current.enabled !== false) {
        companies.push(current);
      }
      current = { name: line.replace(/^  - name:\s*/, '').trim().replace(/^['"]|['"]$/g, '') };
    } else if (current) {
      if (/^\s+api:\s/.test(line)) {
        current.api = line.replace(/^\s+api:\s*/, '').trim().replace(/^['"]|['"]$/g, '');
      } else if (/^\s+enabled:\s*false/.test(line)) {
        current.enabled = false;
      }
    }
  }
  // Push last one
  if (current && current.api && current.enabled !== false) {
    companies.push(current);
  }
  return companies;
}

// ── Load portals.yml ─────────────────────────────────────────────────────────

const portalsText = readFileSync('./portals.yml', 'utf8');
const companies = extractGreenhouseCompanies(portalsText).filter(c =>
  !BLOCKED.includes((c.name || '').toLowerCase())
);

console.log(`Found ${companies.length} companies with Greenhouse API endpoints.`);

// ── Load existing scan history IDs for dedup ──────────────────────────────────

const historyPath = './data/scan-history.tsv';
const historySet = new Set();
if (existsSync(historyPath)) {
  // Only scan last 200KB to keep memory reasonable — new jobs will be recent
  const stat = (await import('fs')).statSync(historyPath);
  const readStart = Math.max(0, stat.size - 200 * 1024);
  const fd = (await import('fs')).openSync(historyPath, 'r');
  const buf = Buffer.alloc(stat.size - readStart);
  (await import('fs')).readSync(fd, buf, 0, buf.length, readStart);
  (await import('fs')).closeSync(fd);
  const chunk = buf.toString('utf8');
  for (const line of chunk.split('\n')) {
    if (!line.trim()) continue;
    const cols = line.split('\t');
    for (const col of cols) {
      if (col.startsWith('https://')) historySet.add(col.trim());
    }
    const idMatch = line.match(/\/jobs\/(\d+)/);
    if (idMatch) historySet.add(idMatch[1]);
  }
  // Also read the full file for IDs (cheap — just regex)
  // Actually let's scan the whole thing for greenhouse job IDs
  const fullHistStream = readFileSync(historyPath, 'utf8');
  for (const m of fullHistStream.matchAll(/\/jobs\/(\d+)/g)) {
    historySet.add(m[1]);
  }
  for (const m of fullHistStream.matchAll(/(https:\/\/boards\.greenhouse\.io\/[^\s\t]+)/g)) {
    historySet.add(m[1]);
  }
}
console.log(`Loaded ${historySet.size} known job IDs from scan history.`);

// ── Fetch each company's Greenhouse API ──────────────────────────────────────

async function fetchGreenhouseJobs(company) {
  try {
    const resp = await fetch(company.api, {
      headers: { 'User-Agent': 'career-ops-scanner/1.0' },
      signal: AbortSignal.timeout(20000),
    });
    if (!resp.ok) {
      console.warn(`  ${company.name}: HTTP ${resp.status}`);
      return [];
    }
    const data = await resp.json();
    const jobs = data.jobs || [];
    return jobs.map(j => ({
      id: String(j.id),
      title: j.title || '',
      url: j.absolute_url || '',
      location: (j.location && j.location.name) || '',
      company: company.name,
    }));
  } catch (e) {
    console.warn(`  ${company.name}: fetch error — ${e.message}`);
    return [];
  }
}

// Fetch in parallel batches of 8
const BATCH_SIZE = 8;
const allJobs = [];
for (let i = 0; i < companies.length; i += BATCH_SIZE) {
  const batch = companies.slice(i, i + BATCH_SIZE);
  const results = await Promise.all(batch.map(fetchGreenhouseJobs));
  for (const jobs of results) allJobs.push(...jobs);
  if (i + BATCH_SIZE < companies.length) {
    await new Promise(r => setTimeout(r, 300));
  }
}

console.log(`\nFetched ${allJobs.length} total jobs from ${companies.length} APIs.`);

// ── Filter and dedup ──────────────────────────────────────────────────────────

const newMatches = [];
for (const job of allJobs) {
  if (!matchesTitle(job.title)) continue;
  if (!acceptLocation(job.location)) continue;
  if (!job.url) continue;
  // Dedup by URL or job ID
  const jobId = (job.url.match(/\/jobs\/(\d+)/) || [])[1] || job.id;
  if (historySet.has(job.url) || historySet.has(job.id) || (jobId && historySet.has(jobId))) continue;
  newMatches.push(job);
}

console.log(`\nNew matches after filtering and dedup: ${newMatches.length}`);

if (newMatches.length === 0) {
  console.log('Nothing new. Exiting.');
  process.exit(0);
}

for (const job of newMatches) {
  console.log(`  [${job.company}] ${job.title} — ${job.location || 'no location'}`);
  console.log(`    ${job.url}`);
}

// ── Append to scan-history.tsv ────────────────────────────────────────────────

const historyLines = newMatches.map(j =>
  `${TODAY}\t${j.company}\t${j.url}\t${j.title}\t${j.location || ''}`
).join('\n') + '\n';

appendFileSync(historyPath, historyLines, 'utf8');
console.log(`\nAppended ${newMatches.length} entries to scan-history.tsv`);

// ── Append to pipeline.md ─────────────────────────────────────────────────────

const pipelinePath = './data/pipeline.md';
const pipelineLines = [
  ``,
  `<!-- scout-quickcheck ${TODAY} — ${newMatches.length} new -->`,
  ...newMatches.map(j => `- ${j.url}   <!-- ${j.company}: ${j.title} | ${j.location || 'no location'} -->`),
  ``,
].join('\n');

appendFileSync(pipelinePath, pipelineLines, 'utf8');
console.log(`Appended ${newMatches.length} URLs to pipeline.md`);

// ── Write scout report ────────────────────────────────────────────────────────

const reportPath = `./reports/scout-quickcheck-${TODAY}.md`;

const byCompany = {};
for (const j of newMatches) {
  if (!byCompany[j.company]) byCompany[j.company] = [];
  byCompany[j.company].push(j);
}

const companyBlocks = Object.entries(byCompany).sort((a,b) => b[1].length - a[1].length).map(([company, jobs]) => {
  const lines = jobs.map(j =>
    `- [${j.title}](${j.url}) — ${j.location || 'no location listed'}`
  ).join('\n');
  return `### ${company} (${jobs.length})\n${lines}`;
}).join('\n\n');

const report = `# Scout Quick-Check — ${TODAY}

**Type:** Greenhouse API scan (no WebSearch, no Playwright)
**Companies checked:** ${companies.length}
**Total jobs fetched:** ${allJobs.length}
**New matches (after filter + dedup):** ${newMatches.length}

## Filters applied
- **Title (positive):** Software Engineer, Data Engineer, ML Engineer, Platform Engineer, SRE, Engineering Manager, Backend Engineer, etc.
- **Title (negative):** Junior, Intern, .NET, Java, iOS, Android, PHP, Ruby, Embedded, etc.
- **Location:** US Remote, Denver, SF, Los Gatos, Seattle, Bend (NYC/Chicago remote-only)
- **Blocked:** Palantir

## New matches by company

${companyBlocks}

---
*All URLs appended to \`data/pipeline.md\` and \`data/scan-history.tsv\`.*
*Run \`/career-ops pipeline\` to evaluate these offers.*
`;

writeFileSync(reportPath, report, 'utf8');
console.log(`\nScout report written: ${reportPath}`);

const summary = {
  companiesChecked: companies.length,
  totalFetched: allJobs.length,
  newMatches: newMatches.length,
  byCompany: Object.fromEntries(Object.entries(byCompany).map(([k,v]) => [k, v.length])),
  reportPath,
};
console.log('\n--- SUMMARY ---');
console.log(JSON.stringify(summary, null, 2));
