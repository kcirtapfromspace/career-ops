#!/usr/bin/env node
/**
 * Greenhouse Quick-Check Scanner
 * Fetches all Greenhouse API endpoints from portals.yml, filters by title/location,
 * deduplicates against scan-history.tsv, and outputs new matches as JSON.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Filters (from task brief + portals.yml) ───────────────────────────────────
const POSITIVE_KEYWORDS = [
  'Software Engineer', 'Backend Engineer', 'Data Engineer', 'Data Platform',
  'Platform Engineer', 'Infrastructure Engineer', 'ML Engineer',
  'Engineering Manager', 'SRE', 'Site Reliability',
  'Machine Learning Engineer', 'ML Platform', 'MLOps',
  'AI Engineer', 'AI Infrastructure', 'NLP', 'LLM',
  'Data Architect', 'Data Infrastructure', 'DevOps',
  'Manager, Software', 'Manager, Data', 'Manager, Platform',
  'Manager, Infrastructure', 'Manager, Engineering', 'Engineering Lead',
];
const NEGATIVE_KEYWORDS = [
  'Junior', 'Intern', '.NET', 'Java ', 'iOS', 'Android', 'PHP', 'Ruby',
  'Embedded', 'Firmware', 'FPGA', 'ASIC', 'Blockchain', 'Web3', 'Crypto',
  'Salesforce Admin', 'SAP ', 'Oracle EBS', 'Mainframe', 'COBOL',
];

// Accepted locations (case-insensitive match)
const ACCEPT_LOCATIONS = [
  'remote', 'denver', 'san francisco', 'sf', 'los gatos', 'seattle', 'bend',
  'united states', 'us', // catch broad "US Remote" tags
];
// NYC/Chicago only accepted if "remote" also appears
const NYC_CHICAGO = ['new york', 'nyc', 'chicago'];

// ── Companies with Greenhouse API endpoints (enabled: true) ──────────────────
const COMPANIES = [
  { name: 'Anthropic',        api: 'https://boards-api.greenhouse.io/v1/boards/anthropic/jobs' },
  { name: 'Anduril',          api: 'https://boards-api.greenhouse.io/v1/boards/andurilindustries/jobs' },
  { name: 'PolyAI',           api: 'https://boards-api.greenhouse.io/v1/boards/polyai/jobs' },
  { name: 'Parloa',           api: 'https://boards-api.greenhouse.io/v1/boards/parloa/jobs' },
  { name: 'Intercom',         api: 'https://boards-api.greenhouse.io/v1/boards/intercom/jobs' },
  { name: 'Hume AI',          api: 'https://boards-api.greenhouse.io/v1/boards/humeai/jobs' },
  { name: 'Airtable',         api: 'https://boards-api.greenhouse.io/v1/boards/airtable/jobs' },
  { name: 'Vercel',           api: 'https://boards-api.greenhouse.io/v1/boards/vercel/jobs' },
  { name: 'Temporal',         api: 'https://boards-api.greenhouse.io/v1/boards/temporal/jobs' },
  { name: 'Arize AI',         api: 'https://boards-api.greenhouse.io/v1/boards/arizeai/jobs' },
  { name: 'RunPod',           api: 'https://boards-api.greenhouse.io/v1/boards/runpod/jobs' },
  { name: 'Glean',            api: 'https://boards-api.greenhouse.io/v1/boards/gleanwork/jobs' },
  { name: 'Speechmatics',     api: 'https://boards-api.greenhouse.io/v1/boards/speechmatics/jobs' },
  { name: 'Black Forest Labs', api: 'https://boards-api.greenhouse.io/v1/boards/blackforestlabs/jobs' },
  { name: 'Helsing',          api: 'https://boards-api.greenhouse.io/v1/boards/helsing/jobs' },
  { name: 'Celonis',          api: 'https://boards-api.greenhouse.io/v1/boards/celonis/jobs' },
  { name: 'Contentful',       api: 'https://boards-api.greenhouse.io/v1/boards/contentful/jobs' },
  { name: 'GetYourGuide',     api: 'https://boards-api.greenhouse.io/v1/boards/getyourguide/jobs' },
  { name: 'HelloFresh',       api: 'https://boards-api.greenhouse.io/v1/boards/hellofresh/jobs' },
  { name: 'N26',              api: 'https://boards-api.greenhouse.io/v1/boards/n26/jobs' },
  { name: 'Trade Republic',   api: 'https://boards-api.greenhouse.io/v1/boards/traderepublicbank/jobs' },
  { name: 'SumUp',            api: 'https://boards-api.greenhouse.io/v1/boards/sumup/jobs' },
  { name: 'Scandit',          api: 'https://boards-api.greenhouse.io/v1/boards/scandit/jobs' },
  { name: 'Wayve',            api: 'https://boards-api.greenhouse.io/v1/boards/wayve/jobs' },
  { name: 'Isomorphic Labs',  api: 'https://boards-api.greenhouse.io/v1/boards/isomorphiclabs/jobs' },
  { name: 'PhysicsX',         api: 'https://boards-api.greenhouse.io/v1/boards/physicsx/jobs' },
  { name: 'Stability AI',     api: 'https://boards-api.greenhouse.io/v1/boards/stabilityai/jobs' },
  { name: 'Amplemarket',      api: 'https://boards-api.greenhouse.io/v1/boards/amplemarket/jobs' },
  { name: 'Dagster',          api: 'https://boards-api.greenhouse.io/v1/boards/dagsterlabs/jobs' },
  { name: 'Fivetran',         api: 'https://boards-api.greenhouse.io/v1/boards/fivetran/jobs' },
  { name: 'Samsara',          api: 'https://boards-api.greenhouse.io/v1/boards/samsara/jobs' },
  { name: 'Chainguard',       api: 'https://boards-api.greenhouse.io/v1/boards/chainguard/jobs' },
  { name: 'Rocket Lab',       api: 'https://boards-api.greenhouse.io/v1/boards/rocketlab/jobs' },
  { name: 'Vast',             api: 'https://boards-api.greenhouse.io/v1/boards/vast/jobs' },
  { name: 'Aurora Innovation', api: 'https://boards-api.greenhouse.io/v1/boards/aurorainnovation/jobs' },
  { name: 'Nuro',             api: 'https://boards-api.greenhouse.io/v1/boards/nuro/jobs' },
  { name: 'Zipline',          api: 'https://boards-api.greenhouse.io/v1/boards/flyzipline/jobs' },
  { name: 'Figure AI',        api: 'https://boards-api.greenhouse.io/v1/boards/figureai/jobs' },
  { name: 'Planet Labs',      api: 'https://boards-api.greenhouse.io/v1/boards/planetlabs/jobs' },
  { name: 'Scale AI',         api: 'https://boards-api.greenhouse.io/v1/boards/scaleai/jobs' },
  { name: 'Databricks',       api: 'https://boards-api.greenhouse.io/v1/boards/databricks/jobs' },
  { name: 'Clickhouse',       api: 'https://boards-api.greenhouse.io/v1/boards/clickhouse/jobs' },
];

// ── Title filter ──────────────────────────────────────────────────────────────
function titleMatches(title) {
  const t = title.toLowerCase();
  const hasPositive = POSITIVE_KEYWORDS.some(k => t.includes(k.toLowerCase()));
  const hasNegative = NEGATIVE_KEYWORDS.some(k => t.includes(k.toLowerCase()));
  return hasPositive && !hasNegative;
}

// ── Location filter ───────────────────────────────────────────────────────────
function locationAccepted(location) {
  if (!location) return true; // no location = assume remote-ok
  const loc = location.toLowerCase();
  if (ACCEPT_LOCATIONS.some(a => loc.includes(a))) return true;
  if (NYC_CHICAGO.some(c => loc.includes(c)) && loc.includes('remote')) return true;
  return false;
}

// ── Load scan history (job IDs already seen) ──────────────────────────────────
function loadSeenIds() {
  const histPath = path.join(__dirname, 'data/scan-history.tsv');
  if (!fs.existsSync(histPath)) return new Set();
  const seen = new Set();
  const content = fs.readFileSync(histPath, 'utf8');
  for (const line of content.split('\n')) {
    const parts = line.split('\t');
    // Format: date \t id \t company \t title \t url \t location \t status
    // Try to grab the ID from column 1 (index 1)
    if (parts.length >= 2 && parts[1]) {
      seen.add(parts[1].trim());
    }
    // Also index 0 in case format is id-first
    if (parts[0] && /^\d+$/.test(parts[0].trim())) {
      seen.add(parts[0].trim());
    }
  }
  return seen;
}

// Also build set of seen URLs from pipeline.md (belt-and-suspenders dedup)
function loadSeenUrls() {
  const pipelinePath = path.join(__dirname, 'data/pipeline.md');
  if (!fs.existsSync(pipelinePath)) return new Set();
  const seen = new Set();
  const content = fs.readFileSync(pipelinePath, 'utf8');
  const urlRe = /https?:\/\/[^\s)>\]]+/g;
  let m;
  while ((m = urlRe.exec(content)) !== null) {
    seen.add(m[0].trim());
  }
  return seen;
}

// ── Fetch one company ─────────────────────────────────────────────────────────
async function fetchCompany(company, seenIds, seenUrls) {
  try {
    const res = await fetch(company.api, {
      headers: { 'User-Agent': 'career-ops-scanner/1.3.0' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      return { company: company.name, error: `HTTP ${res.status}`, matches: [] };
    }
    const data = await res.json();
    const jobs = data.jobs || [];
    const matches = [];

    for (const job of jobs) {
      const id = String(job.id);
      const title = job.title || '';
      const url = job.absolute_url || `https://boards.greenhouse.io/${company.api.split('/boards/')[1]?.split('/')[0]}/jobs/${id}`;
      const location = job.location?.name || '';

      if (seenIds.has(id)) continue;
      if (seenUrls.has(url)) continue;
      if (!titleMatches(title)) continue;
      if (!locationAccepted(location)) continue;

      matches.push({ id, title, url, location, company: company.name });
    }

    return { company: company.name, total: jobs.length, matches };
  } catch (err) {
    return { company: company.name, error: err.message, matches: [] };
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
const seenIds = loadSeenIds();
const seenUrls = loadSeenUrls();

console.error(`Loaded ${seenIds.size} seen IDs, ${seenUrls.size} seen URLs`);
console.error(`Scanning ${COMPANIES.length} Greenhouse companies...`);

const results = await Promise.all(
  COMPANIES.map(c => fetchCompany(c, seenIds, seenUrls))
);

const allMatches = results.flatMap(r => r.matches);
const errors = results.filter(r => r.error);

const output = {
  date: new Date().toISOString().slice(0, 10),
  scanned: COMPANIES.length,
  errors: errors.map(e => ({ company: e.company, error: e.error })),
  totalNewMatches: allMatches.length,
  matches: allMatches,
  perCompany: results.map(r => ({
    company: r.company,
    total: r.total ?? null,
    newMatches: r.matches.length,
    error: r.error ?? null,
  })),
};

console.log(JSON.stringify(output, null, 2));
