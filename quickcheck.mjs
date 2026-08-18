#!/usr/bin/env node
// Quick check scan - Greenhouse APIs only
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const TITLE_POSITIVE = [
  'Software Engineer', 'Backend Engineer', 'Data Engineer', 'Data Platform',
  'Platform Engineer', 'Infrastructure Engineer', 'ML Engineer',
  'Engineering Manager', 'SRE', 'Site Reliability',
  'Machine Learning Engineer', 'ML Platform', 'MLOps', 'AI Engineer',
  'AI Infrastructure', 'LLM', 'NLP', 'DevOps', 'Full Stack Engineer',
  'Data Architect', 'Data Infrastructure',
];

const TITLE_NEGATIVE = [
  'Junior', 'Intern', '.NET', 'Java ', 'iOS', 'Android', 'PHP', 'Ruby',
  'Embedded', 'Firmware', 'FPGA', 'ASIC', 'Blockchain', 'Web3', 'Crypto',
  'Salesforce Admin', 'SAP ', 'Oracle EBS', 'Mainframe', 'COBOL',
];

// Location filters — accept these
const LOC_ACCEPT = [
  'remote', 'us remote', 'denver', 'san francisco', 'sf', 'los gatos',
  'seattle', 'bend', 'united states', 'usa', 'anywhere',
];
// NYC/Chicago only if remote in location
const LOC_NYC_CHICAGO = ['new york', 'nyc', 'chicago'];
// Reject these (relocation required, non-US)
const LOC_REJECT_PATTERNS = [
  'london', 'berlin', 'paris', 'munich', 'amsterdam', 'tokyo', 'toronto',
  'sydney', 'singapore', 'bangalore', 'india', 'uk', 'germany', 'france',
  'australia', 'canada', 'europe', 'emea', 'apac', 'latam',
];

const COMPANIES = [
  { name: 'Anthropic', api: 'https://boards-api.greenhouse.io/v1/boards/anthropic/jobs' },
  { name: 'Anduril', api: 'https://boards-api.greenhouse.io/v1/boards/andurilindustries/jobs' },
  { name: 'PolyAI', api: 'https://boards-api.greenhouse.io/v1/boards/polyai/jobs' },
  { name: 'Parloa', api: 'https://boards-api.greenhouse.io/v1/boards/parloa/jobs' },
  { name: 'Intercom', api: 'https://boards-api.greenhouse.io/v1/boards/intercom/jobs' },
  { name: 'Hume AI', api: 'https://boards-api.greenhouse.io/v1/boards/humeai/jobs' },
  { name: 'Airtable', api: 'https://boards-api.greenhouse.io/v1/boards/airtable/jobs' },
  { name: 'Vercel', api: 'https://boards-api.greenhouse.io/v1/boards/vercel/jobs' },
  { name: 'Temporal', api: 'https://boards-api.greenhouse.io/v1/boards/temporaltechnologies/jobs' },
  { name: 'Arize AI', api: 'https://boards-api.greenhouse.io/v1/boards/arizeai/jobs' },
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
  { name: 'Dagster', api: 'https://boards-api.greenhouse.io/v1/boards/dagsterlabs/jobs' },
  { name: 'Fivetran', api: 'https://boards-api.greenhouse.io/v1/boards/fivetran/jobs' },
  { name: 'Samsara', api: 'https://boards-api.greenhouse.io/v1/boards/samsara/jobs' },
  { name: 'Chainguard', api: 'https://boards-api.greenhouse.io/v1/boards/chainguard/jobs' },
  { name: 'Scale AI', api: 'https://boards-api.greenhouse.io/v1/boards/scaleai/jobs' },
  { name: 'Databricks', api: 'https://boards-api.greenhouse.io/v1/boards/databricks/jobs' },
  { name: 'Clickhouse', api: 'https://boards-api.greenhouse.io/v1/boards/clickhouse/jobs' },
  { name: 'Aurora Innovation', api: 'https://boards-api.greenhouse.io/v1/boards/aurorainnovation/jobs' },
  { name: 'Nuro', api: 'https://boards-api.greenhouse.io/v1/boards/nuro/jobs' },
  { name: 'Zipline', api: 'https://boards-api.greenhouse.io/v1/boards/flyzipline/jobs' },
  { name: 'Figure AI', api: 'https://boards-api.greenhouse.io/v1/boards/figureai/jobs' },
  { name: 'Planet Labs', api: 'https://boards-api.greenhouse.io/v1/boards/planetlabs/jobs' },
  { name: 'Rocket Lab', api: 'https://boards-api.greenhouse.io/v1/boards/rocketlab/jobs' },
  { name: 'Vast', api: 'https://boards-api.greenhouse.io/v1/boards/vast/jobs' },
];

function matchesTitle(title) {
  const t = title.toLowerCase();
  const hasPositive = TITLE_POSITIVE.some(p => t.includes(p.toLowerCase()));
  const hasNegative = TITLE_NEGATIVE.some(n => t.includes(n.toLowerCase()));
  return hasPositive && !hasNegative;
}

function acceptLocation(location) {
  if (!location) return true; // no location = assume remote/any
  const loc = location.toLowerCase();
  // Accept known good locations
  if (LOC_ACCEPT.some(a => loc.includes(a))) return true;
  // NYC/Chicago only if 'remote' is also in location string
  if (LOC_NYC_CHICAGO.some(c => loc.includes(c))) {
    return loc.includes('remote');
  }
  // Reject non-US
  if (LOC_REJECT_PATTERNS.some(r => loc.includes(r))) return false;
  // Default: keep it (might be US-based unlisted city)
  return true;
}

async function fetchCompany(company) {
  try {
    const res = await fetch(company.api, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'career-ops/1.0' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) {
      console.error(`[${company.name}] HTTP ${res.status}`);
      return { company: company.name, jobs: [], error: `HTTP ${res.status}` };
    }
    const data = await res.json();
    const jobs = (data.jobs || []).filter(j => {
      if (!matchesTitle(j.title)) return false;
      const loc = j.location?.name || '';
      if (!acceptLocation(loc)) return false;
      return true;
    }).map(j => ({
      id: String(j.id),
      title: j.title,
      url: j.absolute_url || `https://boards.greenhouse.io/embed/job_app?for=${j.id}`,
      location: j.location?.name || '',
      company: company.name,
    }));
    return { company: company.name, jobs };
  } catch (e) {
    console.error(`[${company.name}] Error: ${e.message}`);
    return { company: company.name, jobs: [], error: e.message };
  }
}

async function main() {
  const historyPath = path.join(__dirname, 'data/scan-history.tsv');
  const pipelinePath = path.join(__dirname, 'data/pipeline.md');

  // Load seen IDs from scan history
  const seenIds = new Set();
  try {
    // Read last 50000 chars to catch recent entries without loading 3MB
    const stat = fs.statSync(historyPath);
    const readSize = Math.min(stat.size, 200000);
    const buf = Buffer.alloc(readSize);
    const fd = fs.openSync(historyPath, 'r');
    fs.readSync(fd, buf, 0, readSize, stat.size - readSize);
    fs.closeSync(fd);
    const text = buf.toString('utf8');
    // Also read the first line for header
    const lines = text.split('\n');
    for (const line of lines) {
      const parts = line.split('\t');
      if (parts.length >= 2) {
        seenIds.add(parts[1].trim()); // URL or ID in col 2
        seenIds.add(parts[0].trim()); // Sometimes ID in col 0
      }
    }
  } catch (e) {
    console.error('Could not read scan history:', e.message);
  }

  // Also grep full file for greenhouse job IDs to ensure dedup
  // We'll check URL patterns like /jobs/NNNNNNN
  const fullHistoryText = fs.readFileSync(historyPath, 'utf8');
  const idRegex = /\/jobs\/(\d+)/g;
  let m;
  while ((m = idRegex.exec(fullHistoryText)) !== null) {
    seenIds.add(m[1]);
  }
  // Also match boards.greenhouse.io patterns
  const boardRegex = /greenhouse\.io[^\s\t]*?(\d{7,})/g;
  while ((m = boardRegex.exec(fullHistoryText)) !== null) {
    seenIds.add(m[1]);
  }

  console.log(`Loaded ${seenIds.size} seen IDs from scan history`);

  // Also check pipeline.md for already-queued jobs
  try {
    const pipelineText = fs.readFileSync(pipelinePath, 'utf8');
    const pipelineIds = pipelineText.match(/\/jobs\/(\d+)/g) || [];
    for (const id of pipelineIds) {
      seenIds.add(id.replace('/jobs/', ''));
    }
    const pipelineUrls = pipelineText.match(/https:\/\/[^\s\)]+/g) || [];
    for (const url of pipelineUrls) {
      seenIds.add(url.trim());
    }
  } catch (e) {
    console.error('Could not read pipeline:', e.message);
  }

  // Fetch all companies in parallel batches of 10
  const results = [];
  for (let i = 0; i < COMPANIES.length; i += 10) {
    const batch = COMPANIES.slice(i, i + 10);
    const batchResults = await Promise.all(batch.map(fetchCompany));
    results.push(...batchResults);
    console.log(`Fetched batch ${Math.floor(i/10)+1}/${Math.ceil(COMPANIES.length/10)}`);
  }

  // Collect new jobs
  const newJobs = [];
  const today = new Date().toISOString().split('T')[0];

  for (const r of results) {
    if (r.error) continue;
    for (const job of r.jobs) {
      // Check if already seen by ID or URL
      if (seenIds.has(job.id) || seenIds.has(job.url)) continue;
      // Also check for ID in URL
      const urlMatch = job.url.match(/(\d{7,})/);
      if (urlMatch && seenIds.has(urlMatch[1])) continue;
      newJobs.push(job);
    }
  }

  console.log(`\nFound ${newJobs.length} new matching jobs`);

  if (newJobs.length === 0) {
    console.log('No new jobs to add.');
    process.exit(0);
  }

  // Append to pipeline.md
  const pipelineAppend = newJobs.map(j =>
    `- ${j.url} <!-- ${j.company}: ${j.title} | ${j.location} | scout-quickcheck ${today} -->`
  ).join('\n') + '\n';

  fs.appendFileSync(pipelinePath, '\n' + pipelineAppend);
  console.log(`Appended ${newJobs.length} jobs to pipeline.md`);

  // Append to scan-history.tsv
  const historyAppend = newJobs.map(j =>
    `${today}\t${j.url}\t${j.company}\t${j.title}\t${j.location}\tquickcheck`
  ).join('\n') + '\n';

  fs.appendFileSync(historyPath, historyAppend);
  console.log(`Appended to scan-history.tsv`);

  // Write results summary to stdout as JSON for report generation
  const summary = {
    date: today,
    total_new: newJobs.length,
    by_company: {},
    jobs: newJobs,
    errors: results.filter(r => r.error).map(r => ({ company: r.company, error: r.error })),
  };

  for (const job of newJobs) {
    if (!summary.by_company[job.company]) summary.by_company[job.company] = [];
    summary.by_company[job.company].push(job.title);
  }

  fs.writeFileSync(
    path.join(__dirname, 'reports', `scout-quickcheck-${today}-results.json`),
    JSON.stringify(summary, null, 2)
  );

  console.log(JSON.stringify(summary));
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
