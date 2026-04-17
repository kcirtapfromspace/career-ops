#!/usr/bin/env node
// Quickcheck scanner: Greenhouse APIs only, no Playwright, no WebSearch
import { readFileSync, appendFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TODAY = '2026-04-17';

// --- Filter config (from task brief) ---
const TITLE_POSITIVE = [
  'Software Engineer', 'Data Engineer', 'Data Platform', 'Platform Engineer',
  'Infrastructure Engineer', 'ML Engineer', 'Engineering Manager', 'SRE',
  'Backend Engineer', 'Site Reliability', 'Machine Learning Engineer',
  'ML Platform', 'MLOps', 'AI Engineer', 'AI Infrastructure',
  'Data Architect', 'Data Infrastructure', 'Manager, Engineering',
  'Engineering Lead', 'Staff Engineer', 'Principal Engineer'
];
const TITLE_NEGATIVE = [
  'Junior', 'Intern', '.NET', 'Java ', 'iOS', 'Android', 'PHP', 'Ruby', 'Embedded',
  'Firmware', 'FPGA', 'ASIC', 'Blockchain', 'Web3', 'Crypto', 'Salesforce Admin',
  'SAP ', 'Oracle EBS', 'Mainframe', 'COBOL'
];

// Location accept patterns
const LOC_ACCEPT = [
  /remote/i, /denver/i, /san francisco/i, /\bsf\b/i, /los gatos/i,
  /seattle/i, /bend/i, /boulder/i, /colorado/i, /united states/i, /\bus\b/i
];
// NYC/Chicago = remote only (if location explicitly NYC or Chicago and NOT remote, reject)
const LOC_REJECT_IF_NOT_REMOTE = [/new york/i, /chicago/i, /\bnyc\b/i];
// Hard reject locations (non-US, non-remote)
const LOC_HARD_REJECT = [
  /\blondon\b/i, /\bberlin\b/i, /\bmunich\b/i, /\bparis\b/i, /\btokyo\b/i, /\bsydney\b/i,
  /\btoronto\b/i, /\bamsterdam\b/i, /\bzurich\b/i, /\bmadrid\b/i, /\bbarcelona\b/i,
  /\blisbon\b/i, /\bstockholm\b/i, /\bvilnius\b/i, /\bdublin\b/i, /\bsingapore\b/i,
  /\bhyderabad\b/i, /\bbangalore\b/i, /\bmumbai\b/i, /\bbeijing\b/i, /\bshanghai\b/i
];

// Companies with api: field from portals.yml (enabled: true, not Palantir)
const GREENHOUSE_COMPANIES = [
  { name: 'Anthropic', api: 'https://boards-api.greenhouse.io/v1/boards/anthropic/jobs' },
  { name: 'Anduril', api: 'https://boards-api.greenhouse.io/v1/boards/andurilindustries/jobs' },
  { name: 'PolyAI', api: 'https://boards-api.greenhouse.io/v1/boards/polyai/jobs' },
  { name: 'Parloa', api: 'https://boards-api.greenhouse.io/v1/boards/parloa/jobs' },
  { name: 'Intercom', api: 'https://boards-api.greenhouse.io/v1/boards/intercom/jobs' },
  { name: 'Hume AI', api: 'https://boards-api.greenhouse.io/v1/boards/humeai/jobs' },
  { name: 'Airtable', api: 'https://boards-api.greenhouse.io/v1/boards/airtable/jobs' },
  { name: 'Vercel', api: 'https://boards-api.greenhouse.io/v1/boards/vercel/jobs' },
  { name: 'Temporal', api: 'https://boards-api.greenhouse.io/v1/boards/temporal/jobs' },
  { name: 'Arize AI', api: 'https://boards-api.greenhouse.io/v1/boards/arizeai/jobs' },
  { name: 'RunPod', api: 'https://boards-api.greenhouse.io/v1/boards/runpod/jobs' },
  { name: 'Glean', api: 'https://boards-api.greenhouse.io/v1/boards/gleanwork/jobs' },
  { name: 'Speechmatics', api: 'https://boards-api.greenhouse.io/v1/boards/speechmatics/jobs' },
  { name: 'Black Forest Labs', api: 'https://boards-api.greenhouse.io/v1/boards/blackforestlabs/jobs' },
  { name: 'Helsing', api: 'https://boards-api.greenhouse.io/v1/boards/helsing/jobs' },
  { name: 'Celonis', api: 'https://boards-api.greenhouse.io/v1/boards/celonis/jobs' },
  { name: 'Contentful', api: 'https://boards-api.greenhouse.io/v1/boards/contentful/jobs' },
  { name: 'GetYourGuide', api: 'https://boards-api.greenhouse.io/v1/boards/getyourguide/jobs' },
  { name: 'HelloFresh', api: 'https://boards-api.greenhouse.io/v1/boards/hellofresh/jobs' },
  { name: 'N26', api: 'https://boards-api.greenhouse.io/v1/boards/n26/jobs' },
  { name: 'Trade Republic', api: 'https://boards-api.greenhouse.io/v1/boards/traderepublicbank/jobs' },
  { name: 'SumUp', api: 'https://boards-api.greenhouse.io/v1/boards/sumup/jobs' },
  { name: 'Scandit', api: 'https://boards-api.greenhouse.io/v1/boards/scandit/jobs' },
  { name: 'Wayve', api: 'https://boards-api.greenhouse.io/v1/boards/wayve/jobs' },
  { name: 'Isomorphic Labs', api: 'https://boards-api.greenhouse.io/v1/boards/isomorphiclabs/jobs' },
  { name: 'PhysicsX', api: 'https://boards-api.greenhouse.io/v1/boards/physicsx/jobs' },
  { name: 'Stability AI', api: 'https://boards-api.greenhouse.io/v1/boards/stabilityai/jobs' },
  { name: 'Amplemarket', api: 'https://boards-api.greenhouse.io/v1/boards/amplemarket/jobs' },
  { name: 'Prefect', api: 'https://boards-api.greenhouse.io/v1/boards/prefect/jobs' },
  { name: 'Neon', api: 'https://boards-api.greenhouse.io/v1/boards/neondatabase/jobs' },
  { name: 'Samsara', api: 'https://boards-api.greenhouse.io/v1/boards/samsara/jobs' },
  { name: 'Chainguard', api: 'https://boards-api.greenhouse.io/v1/boards/chainguard/jobs' },
  { name: 'Scale AI', api: 'https://boards-api.greenhouse.io/v1/boards/scaleai/jobs' },
  { name: 'Databricks', api: 'https://boards-api.greenhouse.io/v1/boards/databricks/jobs' },
  { name: 'Confluent', api: 'https://boards-api.greenhouse.io/v1/boards/confluent/jobs' },
  { name: 'Snowflake', api: 'https://boards-api.greenhouse.io/v1/boards/snowflake/jobs' },
  { name: 'Clickhouse', api: 'https://boards-api.greenhouse.io/v1/boards/clickhouse/jobs' },
  { name: 'Shield AI', api: 'https://boards-api.greenhouse.io/v1/boards/shieldai/jobs' },
  { name: 'Skydio', api: 'https://boards-api.greenhouse.io/v1/boards/skydio/jobs' },
  { name: 'Hadrian', api: 'https://boards-api.greenhouse.io/v1/boards/hadrian/jobs' },
  { name: 'Hermeus', api: 'https://boards-api.greenhouse.io/v1/boards/hermeus/jobs' },
  { name: 'Rocket Lab', api: 'https://boards-api.greenhouse.io/v1/boards/rocketlab/jobs' },
  { name: 'Joby Aviation', api: 'https://boards-api.greenhouse.io/v1/boards/jobyaviation/jobs' },
  { name: 'Archer Aviation', api: 'https://boards-api.greenhouse.io/v1/boards/archeraviation/jobs' },
  { name: 'Vast', api: 'https://boards-api.greenhouse.io/v1/boards/vast/jobs' },
  { name: 'Aurora Innovation', api: 'https://boards-api.greenhouse.io/v1/boards/aurorainnovation/jobs' },
  { name: 'Nuro', api: 'https://boards-api.greenhouse.io/v1/boards/nuro/jobs' },
  { name: 'Zipline', api: 'https://boards-api.greenhouse.io/v1/boards/ziplineofficial/jobs' },
  { name: 'Figure AI', api: 'https://boards-api.greenhouse.io/v1/boards/figureai/jobs' },
  { name: 'Planet Labs', api: 'https://boards-api.greenhouse.io/v1/boards/planetlabs/jobs' },
  { name: 'Fivetran', api: 'https://boards-api.greenhouse.io/v1/boards/fivetran/jobs' },
];

function titleMatches(title) {
  const t = title;
  const hasPositive = TITLE_POSITIVE.some(kw => t.toLowerCase().includes(kw.toLowerCase()));
  const hasNegative = TITLE_NEGATIVE.some(kw => t.toLowerCase().includes(kw.toLowerCase()));
  return hasPositive && !hasNegative;
}

function locationAccepted(loc) {
  if (!loc || loc.trim() === '') return true;
  const l = loc;

  // Hard reject non-US cities
  for (const re of LOC_HARD_REJECT) {
    if (re.test(l)) return false;
  }

  // Accept known good locations
  if (LOC_ACCEPT.some(re => re.test(l))) return true;

  // NYC/Chicago: only if remote mentioned
  for (const re of LOC_REJECT_IF_NOT_REMOTE) {
    if (re.test(l) && !/remote/i.test(l)) return false;
  }

  // Unknown location — be permissive
  return true;
}

async function fetchCompany(company) {
  try {
    const res = await fetch(company.api, {
      headers: { 'User-Agent': 'career-ops-quickcheck/1.0' },
      signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) {
      return { company: company.name, jobs: [], error: `HTTP ${res.status}` };
    }
    const data = await res.json();
    const jobs = (data.jobs || []).map(j => ({
      id: String(j.id),
      title: j.title || '',
      location: j.location?.name || '',
      url: j.absolute_url || '',
      company: company.name,
    }));
    return { company: company.name, jobs };
  } catch (e) {
    return { company: company.name, jobs: [], error: e.message };
  }
}

function loadSeenUrls() {
  const seen = new Set();
  const histPath = join(__dirname, 'data/scan-history.tsv');
  if (!existsSync(histPath)) return seen;
  const content = readFileSync(histPath, 'utf8');
  for (const line of content.split('\n')) {
    const url = line.split('\t')[0].trim();
    if (url && url !== 'url') {
      seen.add(url);
      const m = url.match(/\/jobs\/(\d+)/);
      if (m) seen.add(m[1]);
    }
  }
  return seen;
}

async function main() {
  console.log(`\nQuickcheck scan — ${TODAY} — ${GREENHOUSE_COMPANIES.length} companies\n`);

  const seen = loadSeenUrls();
  console.log(`Loaded ${seen.size} known entries from scan history.\n`);

  // Fetch all in parallel batches
  const BATCH = 10;
  const allResults = [];
  for (let i = 0; i < GREENHOUSE_COMPANIES.length; i += BATCH) {
    const batch = GREENHOUSE_COMPANIES.slice(i, i + BATCH);
    const results = await Promise.all(batch.map(fetchCompany));
    allResults.push(...results);
    console.log(`  Fetched ${Math.min(i + BATCH, GREENHOUSE_COMPANIES.length)}/${GREENHOUSE_COMPANIES.length} companies...`);
  }

  // Filter and dedup
  const newMatches = [];
  const errors = [];
  let totalJobs = 0;

  for (const result of allResults) {
    if (result.error) errors.push({ company: result.company, error: result.error });
    totalJobs += result.jobs.length;

    for (const job of result.jobs) {
      if (seen.has(job.url) || seen.has(job.id)) continue;
      if (!titleMatches(job.title)) continue;
      if (!locationAccepted(job.location)) continue;
      newMatches.push(job);
    }
  }

  console.log(`\nTotal jobs fetched: ${totalJobs}`);
  console.log(`New matches after filtering: ${newMatches.length}`);
  if (errors.length > 0) {
    console.log(`\nErrors (${errors.length}):`);
    errors.forEach(e => console.log(`  ${e.company}: ${e.error}`));
  }

  if (newMatches.length === 0) {
    console.log('\nNo new matches found.');
    writeFileSync('/tmp/quickcheck-results.json', JSON.stringify({ newMatches: [], errors }, null, 2));
    return;
  }

  // Append to scan-history.tsv
  const histPath = join(__dirname, 'data/scan-history.tsv');
  const histLines = newMatches.map(j =>
    `${j.url}\t${TODAY}\tgreenhouse-api\t${j.title}\t${j.company}\tmatched`
  ).join('\n') + '\n';
  appendFileSync(histPath, histLines, 'utf8');

  // Group by company
  const byCompany = {};
  for (const j of newMatches) {
    if (!byCompany[j.company]) byCompany[j.company] = [];
    byCompany[j.company].push(j);
  }

  // Append to pipeline.md
  const pipelinePath = join(__dirname, 'data/pipeline.md');
  let pipelineAddition = `\n#### Quickcheck additions — ${TODAY}\n`;
  for (const [company, jobs] of Object.entries(byCompany)) {
    for (const j of jobs) {
      pipelineAddition += `- [ ] ${j.url} | ${j.company} | ${j.title} | ${j.location}\n`;
    }
  }
  appendFileSync(pipelinePath, pipelineAddition, 'utf8');

  console.log('\nAppended to scan-history.tsv and pipeline.md');

  writeFileSync('/tmp/quickcheck-results.json', JSON.stringify({ newMatches, byCompany, errors }, null, 2));
  console.log('Results written to /tmp/quickcheck-results.json');
}

await main();
