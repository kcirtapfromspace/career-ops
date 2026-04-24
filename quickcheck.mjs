#!/usr/bin/env node
// Quick-check: Greenhouse APIs only, no browser, dedup against scan-history.tsv
import { readFileSync, existsSync, writeFileSync, appendFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dir = dirname(fileURLToPath(import.meta.url));

// --- Filters ---
const POS_KEYWORDS = [
  'Software Engineer', 'Data Engineer', 'Data Platform', 'Platform Engineer',
  'Infrastructure Engineer', 'ML Engineer', 'Engineering Manager', 'SRE',
  'Backend Engineer', 'Site Reliability', 'Machine Learning Engineer',
  'ML Platform', 'MLOps', 'AI Engineer', 'AI Infrastructure', 'Data Architect',
  'Data Infrastructure', 'DevOps',
];
const NEG_KEYWORDS = ['Junior', 'Intern', '.NET', 'Java ', 'iOS', 'Android', 'PHP', 'Ruby', 'Embedded'];
const NYC_CHICAGO = [/new york/i, /\bnyc\b/i, /chicago/i];

function titleMatches(title) {
  if (NEG_KEYWORDS.some(k => title.toLowerCase().includes(k.toLowerCase()))) return false;
  return POS_KEYWORDS.some(k => title.toLowerCase().includes(k.toLowerCase()));
}

function locationAccepted(location) {
  if (!location) return false;
  if (/remote/i.test(location)) return true;
  if (/denver/i.test(location) || /san francisco/i.test(location) || /los gatos/i.test(location) ||
      /seattle/i.test(location) || /bend/i.test(location)) return true;
  if (NYC_CHICAGO.some(r => r.test(location))) return false;
  return false;
}

// --- Load scan history ---
const historyPath = join(__dir, 'data/scan-history.tsv');
const seenUrls = new Set();
if (existsSync(historyPath)) {
  const lines = readFileSync(historyPath, 'utf8').split('\n');
  for (const line of lines) {
    const url = line.split('\t')[0].trim();
    if (url) seenUrls.add(url);
  }
}
console.error(`Loaded ${seenUrls.size} known URLs from scan history.`);

// --- Company API list ---
const companies = [
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
  { name: 'Wayve', api: 'https://boards-api.greenhouse.io/v1/boards/wayve/jobs' },
  { name: 'Isomorphic Labs', api: 'https://boards-api.greenhouse.io/v1/boards/isomorphiclabs/jobs' },
  { name: 'PhysicsX', api: 'https://boards-api.greenhouse.io/v1/boards/physicsx/jobs' },
  { name: 'Stability AI', api: 'https://boards-api.greenhouse.io/v1/boards/stabilityai/jobs' },
  { name: 'Amplemarket', api: 'https://boards-api.greenhouse.io/v1/boards/amplemarket/jobs' },
  { name: 'Neon', api: 'https://boards-api.greenhouse.io/v1/boards/neondatabase/jobs' },
  { name: 'Samsara', api: 'https://boards-api.greenhouse.io/v1/boards/samsara/jobs' },
  { name: 'Chainguard', api: 'https://boards-api.greenhouse.io/v1/boards/chainguard/jobs' },
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
  { name: 'Scale AI', api: 'https://boards-api.greenhouse.io/v1/boards/scaleai/jobs' },
  { name: 'Databricks', api: 'https://boards-api.greenhouse.io/v1/boards/databricks/jobs' },
  { name: 'Confluent', api: 'https://boards-api.greenhouse.io/v1/boards/confluent/jobs' },
  { name: 'Snowflake', api: 'https://boards-api.greenhouse.io/v1/boards/snowflake/jobs' },
  { name: 'Clickhouse', api: 'https://boards-api.greenhouse.io/v1/boards/clickhouse/jobs' },
  { name: 'Fivetran', api: 'https://boards-api.greenhouse.io/v1/boards/fivetran/jobs' },
  { name: 'Prefect', api: 'https://boards-api.greenhouse.io/v1/boards/prefect/jobs' },
  { name: 'Scandit', api: 'https://boards-api.greenhouse.io/v1/boards/scandit/jobs' },
  { name: 'Dagster', api: 'https://boards-api.greenhouse.io/v1/boards/dagsterlabs/jobs' },
  { name: 'Aurora Innovation', api: 'https://boards-api.greenhouse.io/v1/boards/aurorainnovation/jobs' },
  { name: 'Neon', api: 'https://boards-api.greenhouse.io/v1/boards/neondatabase/jobs' },
  { name: 'Rocket Lab', api: 'https://boards-api.greenhouse.io/v1/boards/rocketlab/jobs' },
  { name: 'Joby Aviation', api: 'https://boards-api.greenhouse.io/v1/boards/jobyaviation/jobs' },
  { name: 'Archer Aviation', api: 'https://boards-api.greenhouse.io/v1/boards/archeraviation/jobs' },
  { name: 'Vast', api: 'https://boards-api.greenhouse.io/v1/boards/vast/jobs' },
  { name: 'Hermeus', api: 'https://boards-api.greenhouse.io/v1/boards/hermeus/jobs' },
  { name: 'Hadrian', api: 'https://boards-api.greenhouse.io/v1/boards/hadrian/jobs' },
  { name: 'Nuro', api: 'https://boards-api.greenhouse.io/v1/boards/nuro/jobs' },
  { name: 'Temporal', api: 'https://boards-api.greenhouse.io/v1/boards/temporal/jobs' },
  { name: 'Arize AI', api: 'https://boards-api.greenhouse.io/v1/boards/arizeai/jobs' },
  { name: 'RunPod', api: 'https://boards-api.greenhouse.io/v1/boards/runpod/jobs' },
];

const UA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';

function fetchJobs(company) {
  try {
    const out = execSync(
      `curl -s --max-time 20 -A "${UA}" "${company.api}"`,
      { timeout: 25000 }
    ).toString();
    const data = JSON.parse(out);
    return data.jobs || [];
  } catch (e) {
    console.error(`  [${company.name}] error: ${e.message?.slice(0, 80)}`);
    return [];
  }
}

function extractLocation(job) {
  if (job.location && job.location.name) return job.location.name;
  if (job.offices && job.offices.length > 0) return job.offices.map(o => o.name).join(', ');
  return '';
}

const newMatches = [];

for (const company of companies) {
  process.stderr.write(`  Scanning ${company.name}...`);
  const jobs = fetchJobs(company);
  let fresh = 0;
  for (const job of jobs) {
    const title = job.title || '';
    const location = extractLocation(job);
    const url = job.absolute_url || '';
    if (!url || seenUrls.has(url)) continue;
    if (!titleMatches(title)) continue;
    if (!locationAccepted(location)) continue;
    newMatches.push({ company: company.name, title, url, location });
    fresh++;
  }
  console.error(` ${jobs.length} jobs, ${fresh} new`);
}

const TODAY = new Date().toISOString().slice(0, 10);

console.error(`Done. ${newMatches.length} new matches found.`);
writeFileSync('/tmp/quickcheck-results.json', JSON.stringify(newMatches, null, 2));

if (newMatches.length > 0) {
  // Append to scan-history.tsv
  const tsvLines = newMatches.map(m =>
    `${m.url}\t${TODAY}\tgreenhouse-api\t${m.title}\t${m.company}\tmatched`
  ).join('\n') + '\n';
  appendFileSync(historyPath, tsvLines);
  console.error(`Appended ${newMatches.length} entries to scan-history.tsv`);

  // Prepend section to pipeline.md
  const pipelinePath = join(__dir, 'data/pipeline.md');
  const pipelineContent = readFileSync(pipelinePath, 'utf8');
  const seniorKeywords = ['Senior', 'Staff', 'Principal', 'Lead', 'Head', 'Director'];
  const sorted = [...newMatches].sort((a, b) => {
    const aS = seniorKeywords.some(k => a.title.includes(k)) ? 1 : 0;
    const bS = seniorKeywords.some(k => b.title.includes(k)) ? 1 : 0;
    return bS - aS;
  });
  const pipelineLines = sorted.map(m =>
    `- [ ] ${m.url} | ${m.company} | ${m.title} | ${m.location}`
  ).join('\n');
  const section = `\n### Quick-Check Scan (${TODAY})\n\n${pipelineLines}\n`;
  const updated = pipelineContent.replace(/## Pendientes\n/, `## Pendientes\n${section}`);
  writeFileSync(pipelinePath, updated);
  console.error(`Updated pipeline.md`);
}

console.log(JSON.stringify(newMatches));
