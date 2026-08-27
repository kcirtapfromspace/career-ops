/**
 * Scout Quick Check — Greenhouse API-only job discovery
 * No external npm dependencies.
 */

import { readFileSync, appendFileSync, writeFileSync, existsSync } from 'fs';
import { execSync } from 'child_process';

const POSITIVE_KEYWORDS = [
  'Software Engineer', 'Data Engineer', 'Data Platform', 'Platform Engineer',
  'Infrastructure Engineer', 'ML Engineer', 'Engineering Manager', 'SRE',
  'Backend Engineer', 'Site Reliability', 'Machine Learning Engineer',
  'ML Platform', 'MLOps', 'AI Engineer', 'AI Infrastructure',
  'Data Architect', 'Data Infrastructure', 'Full Stack Engineer',
  'Engineering Lead', 'DevOps'
];

const NEGATIVE_KEYWORDS = [
  'Junior', 'Intern', '.NET', 'Java ', 'iOS', 'Android', 'PHP', 'Ruby', 'Embedded',
  'Firmware', 'FPGA', 'ASIC', 'Blockchain', 'Web3', 'Crypto',
  'Salesforce Admin', 'SAP ', 'Oracle EBS', 'Mainframe', 'COBOL'
];

// Parse portals.yml with regex to extract tracked_companies with api: field
function parsePortals(content) {
  const companies = [];
  // Split into company blocks by looking for "  - name:" at the top level under tracked_companies
  const trackedStart = content.indexOf('tracked_companies:');
  if (trackedStart === -1) return companies;
  const section = content.slice(trackedStart);

  // Split on "  - name:" (two spaces, dash, space, name:)
  const blocks = section.split(/\n  - name:/);
  blocks.shift(); // remove header

  for (const block of blocks) {
    const lines = block.split('\n');
    const name = lines[0].trim();

    // Check enabled — if there's "enabled: false" in block, skip
    if (block.includes('enabled: false')) continue;

    // Extract api: field
    const apiMatch = block.match(/\n    api:\s*(\S+)/);
    if (!apiMatch) continue;

    const api = apiMatch[1].trim();
    companies.push({ name, api });
  }
  return companies;
}

function acceptLocation(location) {
  if (!location || location.trim() === '') return true;
  const loc = location.toLowerCase();
  const alwaysAccept = ['remote', 'denver', 'san francisco', 'los gatos', 'seattle', 'bend'];
  for (const a of alwaysAccept) {
    if (loc.includes(a)) return true;
  }
  if (loc.includes('new york') || loc.includes('nyc') || loc.includes('chicago')) {
    return loc.includes('remote');
  }
  return false;
}

function titleMatches(title) {
  const t = title.toLowerCase();
  for (const neg of NEGATIVE_KEYWORDS) {
    if (t.includes(neg.toLowerCase())) return false;
  }
  for (const pos of POSITIVE_KEYWORDS) {
    if (t.toLowerCase().includes(pos.toLowerCase())) return true;
  }
  return false;
}

async function fetchGreenhouse(apiUrl) {
  try {
    const res = await fetch(apiUrl, {
      headers: { 'User-Agent': 'career-ops-scout/1.0' },
      signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.jobs || [];
  } catch (e) {
    return null;
  }
}

function extractJobId(url) {
  const match = url.match(/\/jobs\/(\d+)/);
  return match ? match[1] : url;
}

async function main() {
  const portalsRaw = readFileSync('portals.yml', 'utf8');
  const apiCompanies = parsePortals(portalsRaw);
  const today = new Date().toISOString().slice(0, 10);

  console.log(`Found ${apiCompanies.length} companies with Greenhouse API`);

  const historyPath = 'data/scan-history.tsv';
  const seenUrls = new Set();
  try {
    const histContent = execSync(`awk -F'\\t' '{print $3}' "${historyPath}" 2>/dev/null`, {
      maxBuffer: 20 * 1024 * 1024
    }).toString();
    histContent.split('\n').forEach(url => {
      const u = url.trim();
      if (u) {
        seenUrls.add(u);
        const id = extractJobId(u);
        if (id !== u) seenUrls.add(id);
      }
    });
    console.log(`Loaded ${seenUrls.size} known entries from history`);
  } catch (e) {
    console.error('History load error:', e.message);
  }

  const newJobs = [];
  const errors = [];

  const BATCH = 8;
  for (let i = 0; i < apiCompanies.length; i += BATCH) {
    const batch = apiCompanies.slice(i, i + BATCH);
    const results = await Promise.allSettled(batch.map(async company => {
      const jobs = await fetchGreenhouse(company.api);
      if (jobs === null) {
        errors.push(company.name);
        return [];
      }

      const matched = [];
      for (const job of jobs) {
        const title = job.title || '';
        const location = job.location?.name || '';
        const url = job.absolute_url || job.url || '';
        const jobId = job.id ? String(job.id) : extractJobId(url);

        if (!titleMatches(title)) continue;
        if (!acceptLocation(location)) continue;
        if (seenUrls.has(url) || seenUrls.has(jobId)) continue;

        matched.push({ company: company.name, title, location, url, jobId, date: today });
      }
      return matched;
    }));

    for (const result of results) {
      if (result.status === 'fulfilled') {
        newJobs.push(...result.value);
      }
    }
  }

  console.log(`\nFound ${newJobs.length} new matching jobs`);
  if (errors.length > 0) {
    console.log(`API errors for: ${errors.join(', ')}`);
  }

  if (newJobs.length === 0) {
    console.log('No new jobs. Exiting.');
    process.exit(0);
  }

  // Append to scan-history.tsv
  const historyLines = newJobs.map(j =>
    `${j.date}\t${j.company}\t${j.url}\t${j.title}\t${j.location}\tgreenhouse_api`
  ).join('\n') + '\n';
  appendFileSync(historyPath, historyLines);

  // Append to pipeline.md
  const pipelineLines = newJobs.map(j =>
    `- [ ] ${j.url} <!-- ${j.company}: ${j.title}${j.location ? ` (${j.location})` : ''} | found ${j.date} -->`
  ).join('\n') + '\n';
  appendFileSync('data/pipeline.md', '\n' + pipelineLines);

  // Build by-company grouping
  const byCompany = {};
  for (const j of newJobs) {
    if (!byCompany[j.company]) byCompany[j.company] = [];
    byCompany[j.company].push(j);
  }

  // Write scout report
  const reportPath = `reports/scout-quickcheck-${today}.md`;
  const reportContent = [
    `# Scout Quick Check — ${today}`,
    '',
    `**Companies checked:** ${apiCompanies.length} (Greenhouse API only)`,
    `**New matches found:** ${newJobs.length}`,
    errors.length > 0 ? `**API errors (${errors.length}):** ${errors.join(', ')}` : `**API errors:** none`,
    '',
    '## New Jobs by Company',
    '',
    ...Object.entries(byCompany).flatMap(([company, jobs]) => [
      `### ${company}`,
      ...jobs.map(j => `- [${j.title}](${j.url})${j.location ? ` · \`${j.location}\`` : ''}`),
      ''
    ]),
    '---',
    '*Generated by career-ops scout-quickcheck · Greenhouse API only · no evaluations*'
  ].join('\n');
  writeFileSync(reportPath, reportContent);

  console.log(`\nReport: ${reportPath}`);

  const topCompanies = Object.entries(byCompany)
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, 6)
    .map(([c, jobs]) => `${c}(${jobs.length})`)
    .join(', ');
  console.log(`SUMMARY: ${newJobs.length} new jobs — ${topCompanies}`);
  console.log('REPORT_PATH:', reportPath);
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
