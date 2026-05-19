#!/usr/bin/env node
// Quick Check Scanner — Greenhouse API only
// Fetches all companies with api: field, filters, deduplicates, logs new matches.

import { readFileSync, appendFileSync, writeFileSync, existsSync } from 'fs';

const TODAY = '2026-05-19';
const HISTORY_FILE = 'data/scan-history.tsv';
const PIPELINE_FILE = 'data/pipeline.md';

// --- Filters (from portals.yml / user spec) ---
const POSITIVE_KEYWORDS = [
  'Software Engineer', 'Backend Engineer', 'Data Engineer', 'Data Platform',
  'Platform Engineer', 'Infrastructure Engineer', 'ML Engineer', 'Engineering Manager',
  'SRE', 'Site Reliability', 'Full Stack Engineer', 'Data Architect',
  'Data Infrastructure', 'Machine Learning Engineer', 'ML Platform', 'MLOps',
  'AI Engineer', 'AI Infrastructure', 'NLP', 'LLM', 'DevOps',
  'Manager, Software', 'Manager, Data', 'Manager, Platform', 'Manager, Infrastructure',
  'Manager, Engineering', 'Engineering Lead',
];
const NEGATIVE_KEYWORDS = [
  'Junior', 'Intern', '.NET', 'Java ', 'iOS', 'Android', 'PHP', 'Ruby',
  'Embedded', 'Firmware', 'FPGA', 'ASIC', 'Blockchain', 'Web3', 'Crypto',
  'Salesforce Admin', 'SAP ', 'Oracle EBS', 'Mainframe', 'COBOL',
];

// Location: US Remote, Denver, SF, Los Gatos, Seattle, Bend = ACCEPT
// NYC/Chicago = remote only. Other relocation = REJECT.
const ACCEPT_LOCATIONS = ['remote', 'denver', 'san francisco', 'sf', 'los gatos', 'seattle', 'bend', 'mountain view', 'bay area'];
const NYC_CHICAGO_LOCATIONS = ['new york', 'nyc', 'chicago'];
// Note: EU companies may have EU locations — we accept those as-is since they're not US-relocation

// All companies with api: field and enabled: true from portals.yml
const COMPANIES = [
  { name: 'Anthropic',       api: 'https://boards-api.greenhouse.io/v1/boards/anthropic/jobs' },
  { name: 'Anduril',         api: 'https://boards-api.greenhouse.io/v1/boards/andurilindustries/jobs' },
  { name: 'PolyAI',          api: 'https://boards-api.greenhouse.io/v1/boards/polyai/jobs' },
  { name: 'Parloa',          api: 'https://boards-api.greenhouse.io/v1/boards/parloa/jobs' },
  { name: 'Intercom',        api: 'https://boards-api.greenhouse.io/v1/boards/intercom/jobs' },
  { name: 'Hume AI',         api: 'https://boards-api.greenhouse.io/v1/boards/humeai/jobs' },
  { name: 'Airtable',        api: 'https://boards-api.greenhouse.io/v1/boards/airtable/jobs' },
  { name: 'Vercel',          api: 'https://boards-api.greenhouse.io/v1/boards/vercel/jobs' },
  { name: 'Temporal',        api: 'https://boards-api.greenhouse.io/v1/boards/temporaltechnologies/jobs' },
  { name: 'Arize AI',        api: 'https://boards-api.greenhouse.io/v1/boards/arizeai/jobs' },
  { name: 'RunPod',          api: 'https://boards-api.greenhouse.io/v1/boards/runpod/jobs' },
  { name: 'Glean',           api: 'https://boards-api.greenhouse.io/v1/boards/gleanwork/jobs' },
  { name: 'Speechmatics',    api: 'https://boards-api.greenhouse.io/v1/boards/speechmatics/jobs' },
  { name: 'Black Forest Labs',api: 'https://boards-api.greenhouse.io/v1/boards/blackforestlabs/jobs' },
  { name: 'Helsing',         api: 'https://boards-api.greenhouse.io/v1/boards/helsing/jobs' },
  { name: 'Celonis',         api: 'https://boards-api.greenhouse.io/v1/boards/celonis/jobs' },
  { name: 'Contentful',      api: 'https://boards-api.greenhouse.io/v1/boards/contentful/jobs' },
  { name: 'GetYourGuide',    api: 'https://boards-api.greenhouse.io/v1/boards/getyourguide/jobs' },
  { name: 'HelloFresh',      api: 'https://boards-api.greenhouse.io/v1/boards/hellofresh/jobs' },
  { name: 'N26',             api: 'https://boards-api.greenhouse.io/v1/boards/n26/jobs' },
  { name: 'Trade Republic',  api: 'https://boards-api.greenhouse.io/v1/boards/traderepublicbank/jobs' },
  { name: 'SumUp',           api: 'https://boards-api.greenhouse.io/v1/boards/sumup/jobs' },
  { name: 'Scandit',         api: 'https://boards-api.greenhouse.io/v1/boards/scandit/jobs' },
  { name: 'Wayve',           api: 'https://boards-api.greenhouse.io/v1/boards/wayve/jobs' },
  { name: 'Isomorphic Labs', api: 'https://boards-api.greenhouse.io/v1/boards/isomorphiclabs/jobs' },
  { name: 'PhysicsX',        api: 'https://boards-api.greenhouse.io/v1/boards/physicsx/jobs' },
  { name: 'Stability AI',    api: 'https://boards-api.greenhouse.io/v1/boards/stabilityai/jobs' },
  { name: 'Amplemarket',     api: 'https://boards-api.greenhouse.io/v1/boards/amplemarket/jobs' },
  { name: 'Dagster',         api: 'https://boards-api.greenhouse.io/v1/boards/dagsterlabs/jobs' },
  { name: 'Fivetran',        api: 'https://boards-api.greenhouse.io/v1/boards/fivetran/jobs' },
  { name: 'Samsara',         api: 'https://boards-api.greenhouse.io/v1/boards/samsara/jobs' },
  { name: 'Chainguard',      api: 'https://boards-api.greenhouse.io/v1/boards/chainguard/jobs' },
  { name: 'Rocket Lab',      api: 'https://boards-api.greenhouse.io/v1/boards/rocketlab/jobs' },
  { name: 'Vast',            api: 'https://boards-api.greenhouse.io/v1/boards/vast/jobs' },
  { name: 'Aurora Innovation',api:'https://boards-api.greenhouse.io/v1/boards/aurorainnovation/jobs' },
  { name: 'Nuro',            api: 'https://boards-api.greenhouse.io/v1/boards/nuro/jobs' },
  { name: 'Zipline',         api: 'https://boards-api.greenhouse.io/v1/boards/flyzipline/jobs' },
  { name: 'Figure AI',       api: 'https://boards-api.greenhouse.io/v1/boards/figureai/jobs' },
  { name: 'Planet Labs',     api: 'https://boards-api.greenhouse.io/v1/boards/planetlabs/jobs' },
  { name: 'Scale AI',        api: 'https://boards-api.greenhouse.io/v1/boards/scaleai/jobs' },
  { name: 'Databricks',      api: 'https://boards-api.greenhouse.io/v1/boards/databricks/jobs' },
  { name: 'ClickHouse',      api: 'https://boards-api.greenhouse.io/v1/boards/clickhouse/jobs' },
];

function titleMatches(title) {
  const t = title.toLowerCase();
  const hasPositive = POSITIVE_KEYWORDS.some(k => t.includes(k.toLowerCase()));
  if (!hasPositive) return false;
  const hasNegative = NEGATIVE_KEYWORDS.some(k => t.includes(k.toLowerCase()));
  return !hasNegative;
}

function locationAccepted(location) {
  if (!location) return false;
  const l = location.toLowerCase();
  // Accept known good locations
  if (ACCEPT_LOCATIONS.some(a => l.includes(a))) return true;
  // NYC/Chicago only if remote is mentioned
  if (NYC_CHICAGO_LOCATIONS.some(n => l.includes(n))) {
    return l.includes('remote');
  }
  // Non-US locations (EU, etc.) — accept for European companies
  // These are mostly EU companies, accept them
  if (l.includes('united kingdom') || l.includes('london') || l.includes('berlin') ||
      l.includes('munich') || l.includes('europe') || l.includes('paris') ||
      l.includes('amsterdam') || l.includes('zurich') || l.includes('stockholm') ||
      l.includes('cambridge') || l.includes('lausanne') || l.includes('freiburg') ||
      l.includes('lisbon') || l.includes('barcelona') || l.includes('milan') ||
      l.includes('vilnius') || l.includes('vienna') || l.includes('cologne')) {
    return true;
  }
  // Reject other specific US cities that require relocation
  return false;
}

// Load scan history for dedup
const historyRaw = existsSync(HISTORY_FILE) ? readFileSync(HISTORY_FILE, 'utf8') : '';
const seenUrls = new Set(historyRaw.split('\n').map(l => l.split('\t')[0].trim()).filter(Boolean));

async function fetchCompany(company) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(company.api, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return { company: company.name, error: `HTTP ${res.status}`, matches: [] };
    const data = await res.json();
    const jobs = data.jobs || [];
    const matches = [];
    for (const job of jobs) {
      const url = job.absolute_url || `https://job-boards.greenhouse.io/${job.id}`;
      if (seenUrls.has(url)) continue;
      const title = job.title || '';
      const location = (job.location && job.location.name) ? job.location.name : '';
      if (!titleMatches(title)) continue;
      if (!locationAccepted(location)) continue;
      matches.push({ url, title, location, company: company.name });
    }
    return { company: company.name, matches, total: jobs.length };
  } catch (err) {
    return { company: company.name, error: err.message, matches: [] };
  }
}

async function main() {
  console.log(`Quick Check Scan — ${TODAY}`);
  console.log(`Checking ${COMPANIES.length} Greenhouse APIs...`);
  console.log(`Known URLs in history: ${seenUrls.size}`);
  console.log('');

  // Fetch in batches of 8 to avoid overwhelming
  const BATCH = 8;
  const allMatches = [];
  const errors = [];

  for (let i = 0; i < COMPANIES.length; i += BATCH) {
    const batch = COMPANIES.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(fetchCompany));
    for (const r of results) {
      if (r.error) {
        errors.push(`${r.company}: ${r.error}`);
        process.stdout.write(`  ✗ ${r.company}: ${r.error}\n`);
      } else {
        const icon = r.matches.length > 0 ? `✓ +${r.matches.length}` : '·';
        process.stdout.write(`  ${icon} ${r.company} (${r.total} jobs)\n`);
        allMatches.push(...r.matches);
      }
    }
  }

  console.log(`\nNew matches found: ${allMatches.length}`);

  if (allMatches.length === 0) {
    console.log('No new matches. Pipeline and history unchanged.');
    return;
  }

  // Append to scan-history.tsv
  const historyLines = allMatches.map(m => `${m.url}\t${TODAY}`).join('\n');
  appendFileSync(HISTORY_FILE, '\n' + historyLines);
  console.log(`Appended ${allMatches.length} URLs to ${HISTORY_FILE}`);

  // Append to pipeline.md
  const pipelineEntry = [
    '',
    `### Quick Check — Greenhouse API (${TODAY}) — ${allMatches.length} new`,
    '',
    ...allMatches.map(m => `- [ ] ${m.url} | ${m.company} | ${m.title} | ${m.location}`),
    '',
    '---',
    '',
  ].join('\n');

  const existing = readFileSync(PIPELINE_FILE, 'utf8');
  // Insert after the "## Pendientes" header
  const insertPoint = existing.indexOf('\n## Pendientes\n');
  let updated;
  if (insertPoint !== -1) {
    updated = existing.slice(0, insertPoint + 15) + pipelineEntry + existing.slice(insertPoint + 15);
  } else {
    updated = existing + pipelineEntry;
  }
  writeFileSync(PIPELINE_FILE, updated);
  console.log(`Updated ${PIPELINE_FILE}`);

  // Output JSON for scout note
  console.log('\nMATCHES_JSON:' + JSON.stringify(allMatches));
}

main().catch(console.error);
