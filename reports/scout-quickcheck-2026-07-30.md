# Scout Quick-Check — 2026-07-30

**Type:** Greenhouse API scan (no WebSearch)
**Scope:** 42 enabled companies (Palantir blocked)
**Total new matches added to pipeline:** 283 (22 from initial partial run + 261 from full scan)

## API Errors
- **RunPod:** HTTP 404 — board not found (may have migrated away from Greenhouse)
- **Isomorphic Labs:** HTTP 503 — transient error (skipped)
- **Dagster:** Empty board `[]` — may have migrated (see portals.yml note)
- **Anduril, Arize AI, Black Forest Labs, Helsing, HelloFresh, Rocket Lab:** HTTP 503 during initial run (subsequently recovered — 4 Rocket Lab matches logged in full scan)

## Initial Run Highlights (22 entries)
| Company | Role | Location |
|---------|------|----------|
| Zipline | Staff Platform SWE, AI Enablement | S. San Francisco ⭐ |
| Zipline | Forward Deployed AI Engineer, Operations | S. San Francisco ⭐ |
| SumUp | Senior Platform Engineer | Boulder, CO ⭐ (local!) |
| Databricks | AI Engineer — GTM Analytics | Remote, US |
| Samsara | Senior Software Engineer II | Remote, US |
| Zipline | Sr. Software Engineering Manager, Financial Platform | S. San Francisco |

## Full Scan — New Matches by Company (261 entries)

| Company | Count | Sample Roles |
|---------|-------|-------------|
| Databricks | 98 | Engineering Managers (Compute, SQL, IAM, Streaming, UI Platform), Senior ML Engineer - GenAI Platform, 80+ Senior SEs (Backend, AI, Distributed Systems, Infra) |
| Anthropic | 41 | Data Engineers, Engineering Managers (GPU/ML, Product, Data Eng), Full-Stack Engineers, ML Infrastructure Engineers |
| Scale AI | 22 | AI Infrastructure Engineers (Model Serving, Sandbox Platform), Deployment Engineering Manager, Deployment SEs |
| Clickhouse | 16 | Cloud Database Infrastructure Engineer, Cloud SE Observability Platform, Core SE (C++), Backend SEs |
| Figure AI | 13 | AI Training Infrastructure Engineer, Helix AI Engineers (Agentic Systems, Data Infra), Platform SRE |
| Vercel | 13 | Engineering Manager CDN, SEs (AI Gateway, AI SDK, Backend, CDN, Deployment Infra, Workflows, Trust & Safety) |
| Aurora Innovation | 12 | Senior EM Core Cloud Services, Senior SEs (Localization, Maps Infra), Behavior Planning SE |
| Temporal | 10 | Senior SEs (Cloud Data Storage, Compute, Infrastructure Foundations, Server Infra) |
| Glean | 6 | Lead SRE, SE AI Infrastructure, SE Data Foundations, Senior SEs |
| Planet Labs | 6 | Senior EM AI Geospatial, Senior Forward Deployed Engineer, Senior SE Storage Infra, SEs (Compute, Missions, Platform Ops) |
| Airtable | 5 | SE Compute (8+ YOE), SE Data, SE Infrastructure (4-8 YOE + 8+ YOE), SE Product Backend |
| Rocket Lab | 4 | DevOps Engineer II/Senior, Principal Network SE (TS/SCI), Senior SE Digital Engineering |
| Fivetran | 3 | Principal SE, Principal SE AI Tooling & Adoption, Senior SE |
| Chainguard | 3 | Senior SE Containers, SE Libraries Platform, Staff SE Customer Platform |
| Wayve | 3 | ML Engineer App SW, ML Engineering Manager App SW, Principal SE Robot Software |
| PhysicsX | 3 | ML Engineer, Senior Forward Deployed SE, Senior ML Engineer |
| Hume AI | 1 | Senior Platform Engineer |
| Black Forest Labs | 1 | Member of Technical Staff - Model Serving / API Backend Engineer |
| Zipline | 1 | Senior Software Engineer - Maps Routing |

## No New Matches (already in scan history)
Samsara, PolyAI, Arize AI, Amplemarket, Nuro — all qualifying jobs already logged from previous scans.

## Next Steps
Run `/career-ops pipeline` to evaluate high-priority matches.
High-signal targets: Anthropic, Temporal, Glean, Chainguard, Black Forest Labs, Figure AI (AI infra), Vercel (AI SDK/Gateway).

---
*Pipeline entries added to `data/pipeline.md`. Scan history updated in `data/scan-history.tsv`.*
*Run `/career-ops pipeline` to evaluate these offers.*
