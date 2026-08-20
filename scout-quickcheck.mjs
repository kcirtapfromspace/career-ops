#!/usr/bin/env node
// Scout quick-check: Greenhouse APIs only
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TODAY = '2026-08-20';
const RUN_ID = `quickcheck-${TODAY}`;

// Title filters (from portals.yml + task spec)
const POSITIVE = [
  'Software Engineer', 'Backend Engineer', 'Full Stack Engineer', 'Engineering Manager',
  'Data Engineer', 'Data Architect', 'Data Platform', 'Data Infrastructure',
  'Platform Engineer', 'Infrastructure Engineer', 'Site Reliability', 'SRE', 'DevOps',
  'ML Engineer', 'Machine Learning Engineer', 'ML Platform', 'MLOps',
  'AI Engineer', 'AI Infrastructure', 'NLP', 'LLM',
  'Manager, Software', 'Manager, Data', 'Manager, Platform', 'Manager, Infrastructure',
  'Manager, Engineering', 'Engineering Lead',
];
const NEGATIVE = [
  'Junior', 'Intern', '.NET', 'Java ', 'iOS', 'Android', 'PHP', 'Ruby', 'Embedded',
  'Firmware', 'FPGA', 'ASIC', 'Blockchain', 'Web3', 'Crypto',
  'Salesforce Admin', 'SAP ', 'Oracle EBS', 'Mainframe', 'COBOL',
];

// Location acceptance logic
// US Remote, Denver, SF, Los Gatos, Seattle, Bend = ACCEPT
// NYC/Chicago = remote only
// International / non-US only = REJECT
function acceptLocation(locStr) {
  if (!locStr) return { accept: true, reason: 'no-location' }; // no location = assume remote
  const l = locStr.toLowerCase();
  // Always accept if explicitly remote
  if (l.includes('remote') || l.includes('distributed') || l.includes('anywhere')) {
    return { accept: true, reason: 'remote' };
  }
  // Accept US cities we want
  const acceptCities = ['denver', 'colorado', 'san francisco', ' sf,', 'los gatos', 'seattle', 'bend', 'los angeles', 'san diego', 'pittsburgh', 'austin', 'mountain view', 'palo alto', 'sunnyvale', 'bay area', 'santa clara', 'fremont', 'san jose', 'menlo park', 'redwood', 'long beach', 'south san francisco', 'santa cruz', 'hawthorne', 'irvine', 'united states', 'usa', ', co', ', ca', ', wa', ', or', ', tx', ', ny'];
  for (const city of acceptCities) {
    if (l.includes(city)) return { accept: true, reason: 'us-location' };
  }
  // NYC/Chicago = reject unless remote (already handled above)
  if (l.includes('new york') || l.includes('nyc') || l.includes('chicago')) {
    return { accept: false, reason: 'location-skip' };
  }
  // International-only = reject
  return { accept: false, reason: 'location-skip' };
}

function matchesTitle(title) {
  const t = title.toLowerCase();
  const hasPositive = POSITIVE.some(k => t.includes(k.toLowerCase()));
  const hasNegative = NEGATIVE.some(k => t.toLowerCase().includes(k.toLowerCase()));
  return { hasPositive, hasNegative };
}

// Companies with Greenhouse API (from portals.yml)
const COMPANIES = [
  { name: 'Anthropic', api: 'https://boards-api.greenhouse.io/v1/boards/anthropic/jobs', board: 'anthropic' },
  { name: 'Anduril', api: 'https://boards-api.greenhouse.io/v1/boards/andurilindustries/jobs', board: 'andurilindustries' },
  { name: 'PolyAI', api: 'https://boards-api.greenhouse.io/v1/boards/polyai/jobs', board: 'polyai' },
  { name: 'Parloa', api: 'https://boards-api.greenhouse.io/v1/boards/parloa/jobs', board: 'parloa' },
  { name: 'Intercom', api: 'https://boards-api.greenhouse.io/v1/boards/intercom/jobs', board: 'intercom' },
  { name: 'Hume AI', api: 'https://boards-api.greenhouse.io/v1/boards/humeai/jobs', board: 'humeai' },
  { name: 'Airtable', api: 'https://boards-api.greenhouse.io/v1/boards/airtable/jobs', board: 'airtable' },
  { name: 'Vercel', api: 'https://boards-api.greenhouse.io/v1/boards/vercel/jobs', board: 'vercel' },
  { name: 'Temporal', api: 'https://boards-api.greenhouse.io/v1/boards/temporaltechnologies/jobs', board: 'temporaltechnologies' },
  { name: 'Arize AI', api: 'https://boards-api.greenhouse.io/v1/boards/arizeai/jobs', board: 'arizeai' },
  { name: 'RunPod', api: 'https://boards-api.greenhouse.io/v1/boards/runpod/jobs', board: 'runpod' },
  { name: 'Glean', api: 'https://boards-api.greenhouse.io/v1/boards/gleanwork/jobs', board: 'gleanwork' },
  { name: 'Speechmatics', api: 'https://boards-api.greenhouse.io/v1/boards/speechmatics/jobs', board: 'speechmatics' },
  { name: 'Black Forest Labs', api: 'https://boards-api.greenhouse.io/v1/boards/blackforestlabs/jobs', board: 'blackforestlabs' },
  { name: 'Helsing', api: 'https://boards-api.greenhouse.io/v1/boards/helsing/jobs', board: 'helsing' },
  { name: 'Celonis', api: 'https://boards-api.greenhouse.io/v1/boards/celonis/jobs', board: 'celonis' },
  { name: 'Contentful', api: 'https://boards-api.greenhouse.io/v1/boards/contentful/jobs', board: 'contentful' },
  { name: 'GetYourGuide', api: 'https://boards-api.greenhouse.io/v1/boards/getyourguide/jobs', board: 'getyourguide' },
  { name: 'HelloFresh', api: 'https://boards-api.greenhouse.io/v1/boards/hellofresh/jobs', board: 'hellofresh' },
  { name: 'N26', api: 'https://boards-api.greenhouse.io/v1/boards/n26/jobs', board: 'n26' },
  { name: 'Trade Republic', api: 'https://boards-api.greenhouse.io/v1/boards/traderepublicbank/jobs', board: 'traderepublicbank' },
  { name: 'SumUp', api: 'https://boards-api.greenhouse.io/v1/boards/sumup/jobs', board: 'sumup' },
  { name: 'Scandit', api: 'https://boards-api.greenhouse.io/v1/boards/scandit/jobs', board: 'scandit' },
  { name: 'Wayve', api: 'https://boards-api.greenhouse.io/v1/boards/wayve/jobs', board: 'wayve' },
  { name: 'Isomorphic Labs', api: 'https://boards-api.greenhouse.io/v1/boards/isomorphiclabs/jobs', board: 'isomorphiclabs' },
  { name: 'PhysicsX', api: 'https://boards-api.greenhouse.io/v1/boards/physicsx/jobs', board: 'physicsx' },
  { name: 'Stability AI', api: 'https://boards-api.greenhouse.io/v1/boards/stabilityai/jobs', board: 'stabilityai' },
  { name: 'Amplemarket', api: 'https://boards-api.greenhouse.io/v1/boards/amplemarket/jobs', board: 'amplemarket' },
  { name: 'Prefect', api: 'https://boards-api.greenhouse.io/v1/boards/prefect/jobs', board: 'prefect' },
  { name: 'Dagster', api: 'https://boards-api.greenhouse.io/v1/boards/dagsterlabs/jobs', board: 'dagsterlabs' },
  { name: 'Fivetran', api: 'https://boards-api.greenhouse.io/v1/boards/fivetran/jobs', board: 'fivetran' },
  { name: 'Neon', api: 'https://boards-api.greenhouse.io/v1/boards/neondatabase/jobs', board: 'neondatabase' },
  { name: 'Samsara', api: 'https://boards-api.greenhouse.io/v1/boards/samsara/jobs', board: 'samsara' },
  { name: 'Chainguard', api: 'https://boards-api.greenhouse.io/v1/boards/chainguard/jobs', board: 'chainguard' },
  { name: 'Shield AI', api: 'https://boards-api.greenhouse.io/v1/boards/shieldai/jobs', board: 'shieldai' },
  { name: 'Skydio', api: 'https://boards-api.greenhouse.io/v1/boards/skydio/jobs', board: 'skydio' },
  { name: 'Hadrian', api: 'https://boards-api.greenhouse.io/v1/boards/hadrian/jobs', board: 'hadrian' },
  { name: 'Hermeus', api: 'https://boards-api.greenhouse.io/v1/boards/hermeus/jobs', board: 'hermeus' },
  { name: 'Rocket Lab', api: 'https://boards-api.greenhouse.io/v1/boards/rocketlab/jobs', board: 'rocketlab' },
  { name: 'Joby Aviation', api: 'https://boards-api.greenhouse.io/v1/boards/jobyaviation/jobs', board: 'jobyaviation' },
  { name: 'Archer Aviation', api: 'https://boards-api.greenhouse.io/v1/boards/archeraviation/jobs', board: 'archeraviation' },
  { name: 'Vast', api: 'https://boards-api.greenhouse.io/v1/boards/vast/jobs', board: 'vast' },
  { name: 'Aurora Innovation', api: 'https://boards-api.greenhouse.io/v1/boards/aurorainnovation/jobs', board: 'aurorainnovation' },
  { name: 'Nuro', api: 'https://boards-api.greenhouse.io/v1/boards/nuro/jobs', board: 'nuro' },
  { name: 'Zipline', api: 'https://boards-api.greenhouse.io/v1/boards/flyzipline/jobs', board: 'flyzipline' },
  { name: 'Figure AI', api: 'https://boards-api.greenhouse.io/v1/boards/figureai/jobs', board: 'figureai' },
  { name: 'Planet Labs', api: 'https://boards-api.greenhouse.io/v1/boards/planetlabs/jobs', board: 'planetlabs' },
  { name: 'Scale AI', api: 'https://boards-api.greenhouse.io/v1/boards/scaleai/jobs', board: 'scaleai' },
  { name: 'Databricks', api: 'https://boards-api.greenhouse.io/v1/boards/databricks/jobs', board: 'databricks' },
  { name: 'Snowflake', api: 'https://boards-api.greenhouse.io/v1/boards/snowflake/jobs', board: 'snowflake' },
  { name: 'ClickHouse', api: 'https://boards-api.greenhouse.io/v1/boards/clickhouse/jobs', board: 'clickhouse' },
];

async function fetchCompany(company) {
  try {
    const res = await fetch(company.api, {
      headers: { 'User-Agent': 'career-ops-scout/1.0' },
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return { company: company.name, jobs: [], error: `HTTP ${res.status}` };
    const data = await res.json();
    return { company: company.name, board: company.board, jobs: data.jobs || [] };
  } catch (e) {
    return { company: company.name, jobs: [], error: e.message };
  }
}

// Load scan history URLs and job IDs
function loadSeenUrls() {
  const histPath = path.join(__dirname, 'data/scan-history.tsv');
  const lines = fs.readFileSync(histPath, 'utf8').split('\n');
  const seenUrls = new Set();
  const seenIds = new Set();
  for (const line of lines) {
    const url = line.split('\t')[0];
    if (url && url.startsWith('http')) {
      seenUrls.add(url.trim());
      // Extract numeric job ID from URL
      const m = url.match(/\/(\d{6,})/);
      if (m) seenIds.add(m[1]);
      const m2 = url.match(/gh_jid=(\d+)/);
      if (m2) seenIds.add(m2[1]);
    }
  }
  return { seenUrls, seenIds };
}

async function main() {
  console.log(`Scout quick-check — ${TODAY} (run: ${RUN_ID})`);
  console.log(`Checking ${COMPANIES.length} Greenhouse APIs...`);

  const { seenUrls: seen, seenIds } = loadSeenUrls();
  console.log(`Loaded ${seen.size} seen URLs, ${seenIds.size} seen job IDs from scan history`);

  // Fetch in parallel batches of 10
  const results = [];
  for (let i = 0; i < COMPANIES.length; i += 10) {
    const batch = COMPANIES.slice(i, i + 10);
    const batchResults = await Promise.all(batch.map(fetchCompany));
    results.push(...batchResults);
    process.stdout.write('.');
  }
  console.log('\nAll fetches complete.');

  const newMatches = [];
  const tsvLines = [];
  let totalJobs = 0;
  let errors = 0;

  for (const result of results) {
    if (result.error) {
      console.error(`  ERROR ${result.company}: ${result.error}`);
      errors++;
      continue;
    }
    totalJobs += result.jobs.length;

    for (const job of result.jobs) {
      const url = job.absolute_url || job.url || '';
      if (!url) continue;

      // Normalize URL for dedup
      const normalizedUrl = url.trim();

      // Check dedup by URL or job ID
      const jobId = String(job.id);
      if (seen.has(normalizedUrl) || seenIds.has(jobId)) {
        continue; // already seen — skip silently
      }

      // Title filter
      const { hasPositive, hasNegative } = matchesTitle(job.title);
      if (!hasPositive) {
        tsvLines.push(`${normalizedUrl}\t${TODAY}\t${RUN_ID}\t${job.title}\t${result.company}\tskipped_title`);
        seenIds.add(jobId);
        continue;
      }
      if (hasNegative) {
        tsvLines.push(`${normalizedUrl}\t${TODAY}\t${RUN_ID}\t${job.title}\t${result.company}\tskipped_negative`);
        seenIds.add(jobId);
        continue;
      }

      // Location filter
      const locationStr = job.location?.name || '';
      const { accept, reason } = acceptLocation(locationStr);
      if (!accept) {
        tsvLines.push(`${normalizedUrl}\t${TODAY}\t${RUN_ID}\t${job.title}\t${result.company}\tskipped_location`);
        seenIds.add(jobId);
        continue;
      }

      // NEW MATCH
      newMatches.push({
        url: normalizedUrl,
        title: job.title,
        company: result.company,
        location: locationStr,
      });
      tsvLines.push(`${normalizedUrl}\t${TODAY}\t${RUN_ID}\t${job.title}\t${result.company}\tnew`);
      seen.add(normalizedUrl);
      seenIds.add(jobId);
    }
  }

  console.log(`\nResults: ${totalJobs} total jobs, ${newMatches.length} new matches, ${errors} API errors`);

  // Write TSV lines to scan history
  if (tsvLines.length > 0) {
    fs.appendFileSync(path.join(__dirname, 'data/scan-history.tsv'), tsvLines.join('\n') + '\n');
    console.log(`Appended ${tsvLines.length} lines to scan-history.tsv`);
  }

  // Append new matches to pipeline.md
  if (newMatches.length > 0) {
    const pipelinePath = path.join(__dirname, 'data/pipeline.md');
    const pipelineLines = newMatches.map(m =>
      `- [ ] [${m.company} — ${m.title}](${m.url}) <!-- ${m.location || 'remote'} | scout ${TODAY} -->`
    );
    fs.appendFileSync(pipelinePath, '\n' + pipelineLines.join('\n') + '\n');
    console.log(`Appended ${newMatches.length} matches to pipeline.md`);
  }

  // Save JSON results for report generation
  const output = {
    date: TODAY,
    runId: RUN_ID,
    totalJobs,
    companiesChecked: COMPANIES.length,
    newMatchCount: newMatches.length,
    newMatches,
    apiErrors: errors,
  };
  fs.writeFileSync(path.join(__dirname, 'data/scout-quickcheck-results.json'), JSON.stringify(output, null, 2));

  console.log('\nNew matches:');
  for (const m of newMatches) {
    console.log(`  [${m.company}] ${m.title} — ${m.location || 'remote'}`);
    console.log(`    ${m.url}`);
  }

  return output;
}

main().catch(e => { console.error(e); process.exit(1); });
