#!/usr/bin/env node
/**
 * quickcheck-finalize.mjs
 * Dedup candidates against scan-history.tsv, append new matches to
 * pipeline.md and scan-history.tsv.
 */

import fs from 'fs';

const TODAY = '2026-04-11';
const HISTORY_PATH = 'data/scan-history.tsv';
const PIPELINE_PATH = 'data/pipeline.md';

// --- All candidates from the quick-check scan ---
// Format: { url, company, title, location }
const CANDIDATES = [
  // === ANTHROPIC ===
  { url: 'https://job-boards.greenhouse.io/anthropic/jobs/5159608008', company: 'Anthropic', title: 'Engineering Manager, Agent Prompts & Evals', location: 'San Francisco, CA | New York City, NY' },
  { url: 'https://job-boards.greenhouse.io/anthropic/jobs/4889396008', company: 'Anthropic', title: 'Engineering Manager, Auth & Identity', location: 'New York City, NY; San Francisco, CA; Seattle, WA' },
  { url: 'https://job-boards.greenhouse.io/anthropic/jobs/5140492008', company: 'Anthropic', title: 'Engineering Manager, Claude for Financial Services', location: 'San Francisco, CA | New York City, NY' },
  { url: 'https://job-boards.greenhouse.io/anthropic/jobs/5141377008', company: 'Anthropic', title: 'Engineering Manager, Cloud Inference AWS', location: 'San Francisco, CA | Seattle, WA' },
  { url: 'https://job-boards.greenhouse.io/anthropic/jobs/4741104008', company: 'Anthropic', title: 'Engineering Manager, GPU (ML Accelerator)', location: 'San Francisco, CA | New York City, NY | Seattle, WA' },
  { url: 'https://job-boards.greenhouse.io/anthropic/jobs/4741102008', company: 'Anthropic', title: 'Engineering Manager, Inference', location: 'San Francisco, CA | New York City, NY | Seattle, WA' },
  { url: 'https://job-boards.greenhouse.io/anthropic/jobs/5155391008', company: 'Anthropic', title: 'Engineering Manager, Inference Routing and Performance', location: 'San Francisco, CA | New York City, NY' },
  { url: 'https://job-boards.greenhouse.io/anthropic/jobs/5119478008', company: 'Anthropic', title: 'Engineering Manager, People Products', location: 'Remote-Friendly | San Francisco, CA' },
  { url: 'https://job-boards.greenhouse.io/anthropic/jobs/5146363008', company: 'Anthropic', title: 'Engineering Manager, Product Monetization (Billing Platform)', location: 'San Francisco, CA | New York City, NY' },

  // === DATABRICKS ===
  { url: 'https://databricks.com/company/careers/open-positions/job?gh_jid=6736119002', company: 'Databricks', title: 'Engineering Manager - Compute Infra', location: 'Mountain View / San Francisco, CA' },
  { url: 'https://databricks.com/company/careers/open-positions/job?gh_jid=8190108002', company: 'Databricks', title: 'Engineering Manager - Notebook Dataplane', location: 'San Francisco, CA' },

  // === ANDURIL ===
  { url: 'https://boards.greenhouse.io/andurilindustries/jobs/5078023007?gh_jid=5078023007', company: 'Anduril', title: 'AI Chief Engineering Lead', location: 'Boston/Costa Mesa/Seattle/DC' },
  { url: 'https://boards.greenhouse.io/andurilindustries/jobs/5102282007?gh_jid=5102282007', company: 'Anduril', title: 'AI Chief Engineering Lead', location: 'Remote' },

  // === AIRTABLE ===
  { url: 'https://job-boards.greenhouse.io/airtable/jobs/8397665002', company: 'Airtable', title: 'Engineering Manager, Enterprise Product', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/airtable/jobs/8442397002', company: 'Airtable', title: 'Software Engineer, Compute (8+ YOE)', location: 'San Francisco, CA; New York, NY; Remote - US' },
  { url: 'https://job-boards.greenhouse.io/airtable/jobs/8124953002', company: 'Airtable', title: 'Software Engineer, Data', location: 'San Francisco, CA; Austin, TX; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/airtable/jobs/8400373002', company: 'Airtable', title: 'Software Engineer, Infrastructure (2-8 YOE)', location: 'San Francisco, CA; Remote - US (Seattle, WA)' },
  { url: 'https://job-boards.greenhouse.io/airtable/jobs/8400388002', company: 'Airtable', title: 'Software Engineer, Infrastructure (8+ YOE)', location: 'San Francisco, CA; Remote - US (Seattle, WA)' },
  { url: 'https://job-boards.greenhouse.io/airtable/jobs/8400374002', company: 'Airtable', title: 'Software Engineer, Observability', location: 'San Francisco, CA; New York, NY; Remote (Seattle, WA)' },
  { url: 'https://job-boards.greenhouse.io/airtable/jobs/8397618002', company: 'Airtable', title: 'Software Engineer, Product Backend (8+ YOE)', location: 'San Francisco, CA; Remote - US (Seattle, WA)' },
  { url: 'https://job-boards.greenhouse.io/airtable/jobs/8397137002', company: 'Airtable', title: 'Software Engineer, Product Frontend (2-8 YOE)', location: 'San Francisco, CA; Remote - US (Seattle, WA)' },

  // === VERCEL ===
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5829980004', company: 'Vercel', title: 'Engineering Manager, AI Gateway', location: 'Hybrid - San Francisco' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5701765004', company: 'Vercel', title: 'Engineering Manager, CDN', location: 'Hybrid - San Francisco' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5430088004', company: 'Vercel', title: 'Software Engineer, Backend', location: 'Remote - United States' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5431123004', company: 'Vercel', title: 'Software Engineer, Backend (II)', location: 'Remote - United States' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5179639004', company: 'Vercel', title: 'Software Engineer, CDN', location: 'Hybrid - San Francisco, New York City' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5473266004', company: 'Vercel', title: 'Software Engineer, CDN Security', location: 'Remote - United States' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5551619004', company: 'Vercel', title: 'Software Engineer, Compute', location: 'Remote - United States' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5808568004', company: 'Vercel', title: 'Software Engineer, Dashboard', location: 'Hybrid - San Francisco, New York City' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5633880004', company: 'Vercel', title: 'Software Engineer, Deployment Infrastructure', location: 'Hybrid - San Francisco, New York City' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5813134004', company: 'Vercel', title: 'Software Engineer, Domains', location: 'Remote - United States' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5613601004', company: 'Vercel', title: 'Software Engineer, Growth', location: 'Hybrid - San Francisco, New York City' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5661583004', company: 'Vercel', title: 'Software Engineer, Lua', location: 'Remote - United States' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5798416004', company: 'Vercel', title: 'Software Engineer, Workflows', location: 'Hybrid - San Francisco, New York City' },
  { url: 'https://job-boards.greenhouse.io/vercel/jobs/5461002004', company: 'Vercel', title: 'Sr. Engineering Manager, Platform', location: 'Hybrid - San Francisco, New York City' },

  // === ARIZE AI ===
  { url: 'https://job-boards.greenhouse.io/arizeai/jobs/5661972004', company: 'Arize AI', title: 'AI Engineer, Instrumentation', location: 'Remote (United States)' },
  { url: 'https://job-boards.greenhouse.io/arizeai/jobs/5421310004', company: 'Arize AI', title: 'Engineering Manager - Product & Platform', location: 'Remote (United States)' },

  // === GLEAN ===
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4547218005', company: 'Glean', title: 'Cloud Infrastructure Engineer', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4605215005', company: 'Glean', title: 'Machine Learning Engineer, AI Assistant & Autonomous AI Agents', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4501783005', company: 'Glean', title: 'Machine Learning Engineer, Infrastructure', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4669417005', company: 'Glean', title: 'Machine Learning Engineer, LLM Evals & Observability', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4006735005', company: 'Glean', title: 'Machine Learning Engineer, Search Quality', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4654833005', company: 'Glean', title: 'Lead Site Reliability Engineer', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4598386005', company: 'Glean', title: 'Lead Software Engineer, Product Backend', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4581643005', company: 'Glean', title: 'Software Engineer, Backend', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4675862005', company: 'Glean', title: 'Software Engineer, Billing & Revenue Platform', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4637208005', company: 'Glean', title: 'Software Engineer, Data Foundations', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4614706005', company: 'Glean', title: 'Software Engineer, Developer Productivity', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4006733005', company: 'Glean', title: 'Software Engineer, Frontend', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4006734005', company: 'Glean', title: 'Software Engineer, Fullstack', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4659229005', company: 'Glean', title: 'Software Engineer, Insights', location: 'San Francisco, CA' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4636739005', company: 'Glean', title: 'Software Engineer, Platform', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4428090005', company: 'Glean', title: 'Software Engineer, Product Backend', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4436194005', company: 'Glean', title: 'Software Engineer, Security', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4592324005', company: 'Glean', title: 'Software Engineer, University Grad', location: 'San Francisco Bay Area' },
  { url: 'https://job-boards.greenhouse.io/gleanwork/jobs/4616929005', company: 'Glean', title: 'Software Engineer, Agentic Runtime', location: 'San Francisco Bay Area' },

  // === FIVETRAN ===
  { url: 'https://www.fivetran.com/careers/job?gh_jid=7581688003', company: 'Fivetran', title: 'Senior Site Reliability Engineer', location: 'Denver, Colorado, United States' },
  { url: 'https://www.fivetran.com/careers/job?gh_jid=7483663003', company: 'Fivetran', title: 'Senior Staff Software Engineer - Binary Log Data Replication', location: 'Denver, Colorado, United States' },

  // === RUNPOD ===
  { url: 'https://job-boards.greenhouse.io/runpod/jobs/5020164008', company: 'RunPod', title: 'Engineering Manager - Product & Platform Delivery', location: 'Remote, USA' },
  { url: 'https://job-boards.greenhouse.io/runpod/jobs/4142227008', company: 'RunPod', title: 'Senior Software Engineer (Cloud)', location: 'Remote, USA' },
  { url: 'https://job-boards.greenhouse.io/runpod/jobs/4785681008', company: 'RunPod', title: 'Software Engineer (Full-Stack)', location: 'Remote, USA' },
  { url: 'https://job-boards.greenhouse.io/runpod/jobs/5020167008', company: 'RunPod', title: 'Sr Director of Software Engineering - Product & Platform Delivery', location: 'Remote, USA' },

  // === SAMSARA ===
  { url: 'https://www.samsara.com/company/careers/roles/7491153?gh_jid=7491153', company: 'Samsara', title: 'AI Engineer', location: 'Remote - US' },
  { url: 'https://www.samsara.com/company/careers/roles/7650290?gh_jid=7650290', company: 'Samsara', title: 'Data Engineer II', location: 'Remote - US' },

  // === CHAINGUARD ===
  { url: 'https://job-boards.greenhouse.io/chainguard/jobs/4649097006', company: 'Chainguard', title: 'Manager, Software Engineering (Libraries)', location: 'United States - Remote' },
  { url: 'https://job-boards.greenhouse.io/chainguard/jobs/4670626006', company: 'Chainguard', title: 'Senior Software Engineer (Experience)', location: 'United States - Remote' },
  { url: 'https://job-boards.greenhouse.io/chainguard/jobs/4671015006', company: 'Chainguard', title: 'Staff Software Engineer (AI CICD)', location: 'United States - Remote' },
  { url: 'https://job-boards.greenhouse.io/chainguard/jobs/4671007006', company: 'Chainguard', title: 'Staff Software Engineer (AI CICD) II', location: 'United States - Remote' },
  { url: 'https://job-boards.greenhouse.io/chainguard/jobs/4627499006', company: 'Chainguard', title: 'Staff Software Engineer (Customer Platform)', location: 'United States - Remote' },
  { url: 'https://job-boards.greenhouse.io/chainguard/jobs/4639034006', company: 'Chainguard', title: 'Staff Software Engineer (Integrations)', location: 'United States - Remote' },
  { url: 'https://job-boards.greenhouse.io/chainguard/jobs/4639065006', company: 'Chainguard', title: 'Staff Software Engineer (Libraries Platform)', location: 'United States - Remote' },
  { url: 'https://job-boards.greenhouse.io/chainguard/jobs/4661970006', company: 'Chainguard', title: 'Staff Software Engineer (Platform)', location: 'United States - Remote' },
  { url: 'https://job-boards.greenhouse.io/chainguard/jobs/4661458006', company: 'Chainguard', title: 'Staff Software Engineer (Sustaining Automation)', location: 'United States - Remote' },

  // === AURORA INNOVATION ===
  { url: 'https://aurora.tech/jobs/8391240002?gh_jid=8391240002', company: 'Aurora Innovation', title: 'Behavior Planning Software Engineer', location: 'San Francisco, CA' },
  { url: 'https://aurora.tech/jobs/8291042002?gh_jid=8291042002', company: 'Aurora Innovation', title: 'Software Engineer, Mapping', location: 'Seattle, WA' },
  { url: 'https://aurora.tech/jobs/8445161002?gh_jid=8445161002', company: 'Aurora Innovation', title: 'Software Engineer, MLDE Labels Platform', location: 'Seattle, WA' },

  // === SCALE AI ===
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4591300005', company: 'Scale AI', title: 'Software Engineer, Gen AI', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4594879005', company: 'Scale AI', title: 'Software Engineer, Platform', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4654897005', company: 'Scale AI', title: 'Senior Software Engineer - Internal Tools & Productivity', location: 'San Francisco, CA' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4591298005', company: 'Scale AI', title: 'Senior Software Engineer, GenAI', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4630325005', company: 'Scale AI', title: 'Senior Software Engineer, Billing Platform', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4654275005', company: 'Scale AI', title: 'Senior Software Engineer, Connectivity', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4648525005', company: 'Scale AI', title: 'Senior Software Engineer, Backend — Frontier Data', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4653827005', company: 'Scale AI', title: 'Senior Software Engineer, Agentic Data Products', location: 'San Francisco, CA' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4674911005', company: 'Scale AI', title: 'Senior Software Engineer', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4654831005', company: 'Scale AI', title: 'Site Reliability Engineer / DevOps', location: 'San Francisco, CA' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4657267005', company: 'Scale AI', title: 'Engineering Manager, Security', location: 'San Francisco, CA; Seattle, WA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4625271005', company: 'Scale AI', title: 'Engineering Manager, AgentOps', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4602177005', company: 'Scale AI', title: 'Forward Deployed AI Engineering Manager, Enterprise', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4597399005', company: 'Scale AI', title: 'Senior Forward Deployed AI Engineer, Enterprise', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4520320005', company: 'Scale AI', title: 'Senior AI Infrastructure Engineer, Model Serving Platform', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4658162005', company: 'Scale AI', title: 'Senior/Staff Machine Learning Engineer, General Agents, Enterprise GenAI', location: 'San Francisco, CA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4676936005', company: 'Scale AI', title: 'Software Engineer, AI Developer Tooling', location: 'San Francisco, CA; Seattle, WA; New York, NY' },
  { url: 'https://job-boards.greenhouse.io/scaleai/jobs/4665557005', company: 'Scale AI', title: 'Infrastructure Software Engineer, Enterprise GenAI', location: 'San Francisco, CA; New York, NY' },

  // === CLICKHOUSE ===
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5802320004', company: 'ClickHouse', title: 'Cloud Platform Engineer - Control Plane', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5766229004', company: 'ClickHouse', title: 'Cloud Software Engineer - Identity and Access Management', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5686805004', company: 'ClickHouse', title: 'Cloud Software Engineer - Observability Platform', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5755093004', company: 'ClickHouse', title: 'Core Software Engineer (C++) - Remote', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5809710004', company: 'ClickHouse', title: 'Engineering Manager - Language clients', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5584386004', company: 'ClickHouse', title: 'Full Stack Software Engineer - Billing Team', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5587666004', company: 'ClickHouse', title: 'Full Stack Software Engineer - Control Plane', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5838217004', company: 'ClickHouse', title: 'Senior Backend Engineer - HyperDX', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5776991004', company: 'ClickHouse', title: 'Senior Backend Engineer - Infrastructure (ClickPipes)', location: 'United States' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5778617004', company: 'ClickHouse', title: 'Senior Cloud Software Engineer - AutoScaling', location: 'United States (Remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5732503004', company: 'ClickHouse', title: 'Senior Full Stack Engineer - HyperDX', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5777065004', company: 'ClickHouse', title: 'Senior Full Stack Software Engineer - ClickPipes Platform', location: 'United States' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5706417004', company: 'ClickHouse', title: 'Senior Infrastructure Engineer - Postgres', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5819754004', company: 'ClickHouse', title: 'Senior Site Reliability Engineer - Remote', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5819674004', company: 'ClickHouse', title: 'Senior Software Engineer - Cloud Infrastructure', location: 'United States (Remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5722210004', company: 'ClickHouse', title: 'Senior Software Engineer - Data Integration & JVM Ecosystem', location: 'United States (Remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5727343004', company: 'ClickHouse', title: 'Senior Software Engineer (Infrastructure) - HyperDX', location: 'United States' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5842100004', company: 'ClickHouse', title: 'Senior Software Engineer - Python and Data Ecosystem', location: 'United States (Remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5802760004', company: 'ClickHouse', title: 'Senior Software Engineer (Typescript / Backend) - AI/ML', location: 'United States (remote)' },
  { url: 'https://job-boards.greenhouse.io/clickhouse/jobs/5765673004', company: 'ClickHouse', title: 'Software Engineer - Database Integrations', location: 'United States (remote)' },

  // === PLANET LABS ===
  { url: 'https://job-boards.greenhouse.io/planetlabs/jobs/7603823', company: 'Planet Labs', title: 'Senior Software Engineer', location: 'United States, Remote' },
  { url: 'https://job-boards.greenhouse.io/planetlabs/jobs/7603817', company: 'Planet Labs', title: 'Software Engineer, AI Systems & Infrastructure', location: 'San Francisco, CA' },
  { url: 'https://job-boards.greenhouse.io/planetlabs/jobs/7603803', company: 'Planet Labs', title: 'Software Engineer, Applied GenAI Apps', location: 'San Francisco, CA' },
  { url: 'https://job-boards.greenhouse.io/planetlabs/jobs/7590726', company: 'Planet Labs', title: 'Software Engineer, Missions Software', location: 'United States, Remote' },
  { url: 'https://job-boards.greenhouse.io/planetlabs/jobs/7555019', company: 'Planet Labs', title: 'Software Engineer, Platform Operations', location: 'United States, Remote' },
  { url: 'https://job-boards.greenhouse.io/planetlabs/jobs/7603801', company: 'Planet Labs', title: 'Senior Engineering Manager - AI Geospatial Assistant Team', location: 'San Francisco, CA' },
  { url: 'https://job-boards.greenhouse.io/planetlabs/jobs/7603834', company: 'Planet Labs', title: 'Senior Software Engineering Manager', location: 'United States, Remote' },

  // === BLACK FOREST LABS ===
  { url: 'https://job-boards.greenhouse.io/blackforestlabs/jobs/4925659008', company: 'Black Forest Labs', title: 'Member of Technical Staff - Infrastructure Engineer', location: 'Freiburg (Germany) / San Francisco (USA)' },
  { url: 'https://job-boards.greenhouse.io/blackforestlabs/jobs/5019171008', company: 'Black Forest Labs', title: 'Member of Technical Staff - Large Scale Data Infrastructure', location: 'Freiburg (Germany) / San Francisco (USA)' },

  // === CONTENTFUL (Denver) ===
  { url: 'https://job-boards.greenhouse.io/contentful/jobs/7544099', company: 'Contentful', title: 'Data Engineer', location: 'Denver, Colorado, United States' },
  { url: 'https://job-boards.greenhouse.io/contentful/jobs/7544103', company: 'Contentful', title: 'Platform Engineer', location: 'Denver, Colorado, United States' },

  // === POLYAI ===
  { url: 'https://job-boards.eu.greenhouse.io/polyai/jobs/4796935101', company: 'PolyAI', title: 'Forward Deployed AI Engineer (Must be PST timezone)', location: 'United States (West Coast)' },

  // === AMPLEMARKET ===
  { url: 'https://job-boards.eu.greenhouse.io/amplemarket/jobs/4066899101', company: 'Amplemarket', title: 'Senior Backend Software Engineer', location: 'Remote, EMEA/LATAM/North America' },
];

// --- Load known URLs ---
const historyLines = fs.readFileSync(HISTORY_PATH, 'utf8').split('\n');
const knownURLs = new Set(historyLines.map(l => l.split('\t')[0]).filter(Boolean));
knownURLs.delete('url'); // remove header

// --- Dedup ---
const newMatches = CANDIDATES.filter(c => !knownURLs.has(c.url));
const alreadyKnown = CANDIDATES.length - newMatches.length;

console.log(`Total candidates: ${CANDIDATES.length}`);
console.log(`Already in scan history: ${alreadyKnown}`);
console.log(`NEW matches: ${newMatches.length}`);

if (newMatches.length === 0) {
  console.log('No new matches to add.');
  process.exit(0);
}

// --- Group by company for pipeline.md ---
const byCompany = {};
for (const m of newMatches) {
  if (!byCompany[m.company]) byCompany[m.company] = [];
  byCompany[m.company].push(m);
}

// --- Append to pipeline.md ---
let pipelineAppend = '\n';
for (const [company, jobs] of Object.entries(byCompany)) {
  pipelineAppend += `### ${company} (scanned ${TODAY})\n`;
  for (const j of jobs) {
    pipelineAppend += `- [ ] ${j.url} | ${j.company} | ${j.title} [${j.location}]\n`;
  }
  pipelineAppend += '\n';
}

fs.appendFileSync(PIPELINE_PATH, pipelineAppend.trimEnd() + '\n');
console.log(`✓ Appended ${newMatches.length} entries to pipeline.md`);

// --- Append to scan-history.tsv ---
const tsv = newMatches.map(m =>
  `${m.url}\t${TODAY}\tgreenhouse-api\t${m.title}\t${m.company}\tmatched`
).join('\n') + '\n';
fs.appendFileSync(HISTORY_PATH, tsv);
console.log(`✓ Appended ${newMatches.length} entries to scan-history.tsv`);

// --- Output summary for report ---
console.log('\n=== NEW MATCHES BY COMPANY ===');
for (const [company, jobs] of Object.entries(byCompany)) {
  console.log(`\n${company} (${jobs.length}):`);
  for (const j of jobs) {
    console.log(`  - ${j.title} [${j.location}]`);
  }
}
