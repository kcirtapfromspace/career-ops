#!/usr/bin/env node
/**
 * quick-check-scan.mjs
 * Lightweight Greenhouse API scout scan for Patrick Deutsch.
 * Queries only companies with api: field and enabled: true.
 * Filters by title/location. Deduplicates against scan-history.tsv.
 */

import fs from 'fs';
import https from 'https';

const TODAY = '2026-04-16';

// --- Title filter ---
const POSITIVE_TITLES = [
  'Software Engineer', 'Backend Engineer', 'Full Stack Engineer', 'Engineering Manager',
  'Data Engineer', 'Data Architect', 'Data Platform', 'Data Infrastructure',
  'Platform Engineer', 'Infrastructure Engineer', 'Site Reliability', 'SRE', 'DevOps',
  'ML Engineer', 'Machine Learning Engineer', 'ML Platform', 'MLOps',
  'AI Engineer', 'AI Infrastructure', 'NLP', 'LLM',
  'Manager, Software', 'Manager, Data', 'Manager, Platform',
  'Manager, Infrastructure', 'Manager, Engineering', 'Engineering Lead',
];
const NEGATIVE_TITLES = [
  'Junior', 'Intern', '.NET', 'Java ', 'iOS', 'Android', 'PHP', 'Ruby',
  'Embedded', 'Firmware', 'FPGA', 'ASIC', 'Blockchain', 'Web3', 'Crypto',
  'Salesforce Admin', 'SAP ', 'Oracle EBS', 'Mainframe', 'COBOL',
];

// --- Location filter ---
const ACCEPT_LOCATIONS = [
  'remote', 'us remote', 'denver', 'san francisco', 'sf', 'los gatos',
  'seattle', 'bend', 'united states', 'anywhere', 'distributed',
];
const ACCEPT_NYC_CHICAGO_IF_REMOTE = ['new york', 'nyc', 'chicago'];

// --- Companies with Greenhouse API ---
const COMPANIES = [
  { name: 'Anthropic',       slug: 'anthropic',            api: 'https://boards-api.greenhouse.io/v1/boards/anthropic/jobs' },
  { name: 'Anduril',         slug: 'andurilindustries',    api: 'https://boards-api.greenhouse.io/v1/boards/andurilindustries/jobs' },
  { name: 'PolyAI',          slug: 'polyai',               api: 'https://boards-api.greenhouse.io/v1/boards/polyai/jobs' },
  { name: 'Parloa',          slug: 'parloa',               api: 'https://boards-api.greenhouse.io/v1/boards/parloa/jobs' },
  { name: 'Intercom',        slug: 'intercom',             api: 'https://boards-api.greenhouse.io/v1/boards/intercom/jobs' },
  { name: 'Hume AI',         slug: 'humeai',               api: 'https://boards-api.greenhouse.io/v1/boards/humeai/jobs' },
  { name: 'Airtable',        slug: 'airtable',             api: 'https://boards-api.greenhouse.io/v1/boards/airtable/jobs' },
  { name: 'Vercel',          slug: 'vercel',               api: 'https://boards-api.greenhouse.io/v1/boards/vercel/jobs' },
  { name: 'Temporal',        slug: 'temporal',             api: 'https://boards-api.greenhouse.io/v1/boards/temporal/jobs' },
  { name: 'Arize AI',        slug: 'arizeai',              api: 'https://boards-api.greenhouse.io/v1/boards/arizeai/jobs' },
  { name: 'RunPod',          slug: 'runpod',               api: 'https://boards-api.greenhouse.io/v1/boards/runpod/jobs' },
  { name: 'Glean',           slug: 'gleanwork',            api: 'https://boards-api.greenhouse.io/v1/boards/gleanwork/jobs' },
  { name: 'Speechmatics',    slug: 'speechmatics',         api: 'https://boards-api.greenhouse.io/v1/boards/speechmatics/jobs' },
  { name: 'Black Forest Labs',slug: 'blackforestlabs',     api: 'https://boards-api.greenhouse.io/v1/boards/blackforestlabs/jobs' },
  { name: 'Helsing',         slug: 'helsing',              api: 'https://boards-api.greenhouse.io/v1/boards/helsing/jobs' },
  { name: 'Celonis',         slug: 'celonis',              api: 'https://boards-api.greenhouse.io/v1/boards/celonis/jobs' },
  { name: 'Contentful',      slug: 'contentful',           api: 'https://boards-api.greenhouse.io/v1/boards/contentful/jobs' },
  { name: 'GetYourGuide',    slug: 'getyourguide',         api: 'https://boards-api.greenhouse.io/v1/boards/getyourguide/jobs' },
  { name: 'HelloFresh',      slug: 'hellofresh',           api: 'https://boards-api.greenhouse.io/v1/boards/hellofresh/jobs' },
  { name: 'N26',             slug: 'n26',                  api: 'https://boards-api.greenhouse.io/v1/boards/n26/jobs' },
  { name: 'Trade Republic',  slug: 'traderepublicbank',    api: 'https://boards-api.greenhouse.io/v1/boards/traderepublicbank/jobs' },
  { name: 'SumUp',           slug: 'sumup',                api: 'https://boards-api.greenhouse.io/v1/boards/sumup/jobs' },
  { name: 'Scandit',         slug: 'scandit',              api: 'https://boards-api.greenhouse.io/v1/boards/scandit/jobs' },
  { name: 'Wayve',           slug: 'wayve',                api: 'https://boards-api.greenhouse.io/v1/boards/wayve/jobs' },
  { name: 'Isomorphic Labs',  slug: 'isomorphiclabs',      api: 'https://boards-api.greenhouse.io/v1/boards/isomorphiclabs/jobs' },
  { name: 'PhysicsX',        slug: 'physicsx',             api: 'https://boards-api.greenhouse.io/v1/boards/physicsx/jobs' },
  { name: 'Stability AI',    slug: 'stabilityai',          api: 'https://boards-api.greenhouse.io/v1/boards/stabilityai/jobs' },
  { name: 'Amplemarket',     slug: 'amplemarket',          api: 'https://boards-api.greenhouse.io/v1/boards/amplemarket/jobs' },
  { name: 'Prefect',         slug: 'prefect',              api: 'https://boards-api.greenhouse.io/v1/boards/prefect/jobs' },
  { name: 'Fivetran',        slug: 'fivetran',             api: 'https://boards-api.greenhouse.io/v1/boards/fivetran/jobs' },
  { name: 'Neon',            slug: 'neondatabase',         api: 'https://boards-api.greenhouse.io/v1/boards/neondatabase/jobs' },
  { name: 'Samsara',         slug: 'samsara',              api: 'https://boards-api.greenhouse.io/v1/boards/samsara/jobs' },
  { name: 'Chainguard',      slug: 'chainguard',           api: 'https://boards-api.greenhouse.io/v1/boards/chainguard/jobs' },
  { name: 'Shield AI',       slug: 'shieldai',             api: 'https://boards-api.greenhouse.io/v1/boards/shieldai/jobs' },
  { name: 'Skydio',          slug: 'skydio',               api: 'https://boards-api.greenhouse.io/v1/boards/skydio/jobs' },
  { name: 'Hadrian',         slug: 'hadrian',              api: 'https://boards-api.greenhouse.io/v1/boards/hadrian/jobs' },
  { name: 'Hermeus',         slug: 'hermeus',              api: 'https://boards-api.greenhouse.io/v1/boards/hermeus/jobs' },
  { name: 'Rocket Lab',      slug: 'rocketlab',            api: 'https://boards-api.greenhouse.io/v1/boards/rocketlab/jobs' },
  { name: 'Joby Aviation',   slug: 'jobyaviation',         api: 'https://boards-api.greenhouse.io/v1/boards/jobyaviation/jobs' },
  { name: 'Archer Aviation', slug: 'archeraviation',       api: 'https://boards-api.greenhouse.io/v1/boards/archeraviation/jobs' },
  { name: 'Vast',            slug: 'vast',                 api: 'https://boards-api.greenhouse.io/v1/boards/vast/jobs' },
  { name: 'Aurora Innovation',slug: 'aurorainnovation',    api: 'https://boards-api.greenhouse.io/v1/boards/aurorainnovation/jobs' },
  { name: 'Nuro',            slug: 'nuro',                 api: 'https://boards-api.greenhouse.io/v1/boards/nuro/jobs' },
  { name: 'Zipline',         slug: 'ziplineofficial',      api: 'https://boards-api.greenhouse.io/v1/boards/ziplineofficial/jobs' },
  { name: 'Figure AI',       slug: 'figureai',             api: 'https://boards-api.greenhouse.io/v1/boards/figureai/jobs' },
  { name: 'Planet Labs',     slug: 'planetlabs',           api: 'https://boards-api.greenhouse.io/v1/boards/planetlabs/jobs' },
  { name: 'Scale AI',        slug: 'scaleai',              api: 'https://boards-api.greenhouse.io/v1/boards/scaleai/jobs' },
  { name: 'Databricks',      slug: 'databricks',           api: 'https://boards-api.greenhouse.io/v1/boards/databricks/jobs' },
  { name: 'Confluent',       slug: 'confluent',            api: 'https://boards-api.greenhouse.io/v1/boards/confluent/jobs' },
  { name: 'Snowflake',       slug: 'snowflake',            api: 'https://boards-api.greenhouse.io/v1/boards/snowflake/jobs' },
  { name: 'ClickHouse',      slug: 'clickhouse',           api: 'https://boards-api.greenhouse.io/v1/boards/clickhouse/jobs' },
];

// --- Helpers ---
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'career-ops-quickcheck/1.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          try { resolve(JSON.parse(data)); }
          catch (e) { reject(new Error(`JSON parse error for ${url}: ${e.message}`)); }
        } else {
          reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(15000, () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

function titleMatches(title) {
  const t = title.toLowerCase();
  const hasPositive = POSITIVE_TITLES.some(kw => t.includes(kw.toLowerCase()));
  const hasNegative = NEGATIVE_TITLES.some(kw => t.includes(kw.toLowerCase()));
  return hasPositive && !hasNegative;
}

function locationAccepted(location) {
  if (!location) return false; // no location info — skip conservatively
  const loc = location.toLowerCase();
  // explicit remote or accepted cities
  if (ACCEPT_LOCATIONS.some(kw => loc.includes(kw))) return true;
  // NYC/Chicago only if also says "remote"
  if (ACCEPT_NYC_CHICAGO_IF_REMOTE.some(kw => loc.includes(kw)) && loc.includes('remote')) return true;
  return false;
}

// --- Load known URLs ---
const historyPath = 'data/scan-history.tsv';
const historyLines = fs.readFileSync(historyPath, 'utf8').split('\n');
const knownURLs = new Set(historyLines.map(l => l.split('\t')[0]).filter(Boolean));
knownURLs.delete('url'); // header

// --- Main scan ---
const newMatches = [];
const errors = [];
let checked = 0;
let totalJobs = 0;

async function scanCompany(company) {
  try {
    const data = await fetchJSON(company.api);
    const jobs = data.jobs || [];
    checked++;
    totalJobs += jobs.length;

    for (const job of jobs) {
      const url = job.absolute_url || '';
      if (knownURLs.has(url)) continue;

      const title = job.title || '';
      if (!titleMatches(title)) continue;

      // Extract location from metadata or location field
      const location = job.location?.name || '';
      if (!locationAccepted(location)) continue;

      newMatches.push({
        url,
        title,
        company: company.name,
        location,
        id: job.id,
      });
      knownURLs.add(url); // prevent same-session dupes
    }
  } catch (err) {
    errors.push({ company: company.name, error: err.message });
  }
}

// Run in batches of 8 to avoid hammering
async function runBatches() {
  const BATCH_SIZE = 8;
  for (let i = 0; i < COMPANIES.length; i += BATCH_SIZE) {
    const batch = COMPANIES.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(scanCompany));
    process.stderr.write(`  [${Math.min(i + BATCH_SIZE, COMPANIES.length)}/${COMPANIES.length}] companies scanned...\n`);
  }
}

await runBatches();

// Output structured result
console.log(JSON.stringify({
  date: TODAY,
  checked,
  totalJobsScanned: totalJobs,
  newMatches,
  errors,
}, null, 2));
