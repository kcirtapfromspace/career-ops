# Scout Quick-Check — Greenhouse API — 2026-06-02

**Date:** 2026-06-02
**Mode:** Greenhouse API direct scan (two passes)
**Boards scanned:** 42
**Jobs reviewed:** ~4,400+ total (all jobs from all 42 boards, title + location filtered)
**New matches (total day):** 17 (1 from first pass, 16 from second pass)
**Scan history size before:** 9,452 entries

---

## Summary

Full scan of all 42 configured Greenhouse API boards across two passes today. Applied title and location filters across every board. Deduped all candidates against `data/scan-history.tsv`. Total 17 new roles discovered across 7 companies.

Notable finds:
- **Anduril** posted 6 new Colorado/Seattle SW Eng roles (Broomfield, Fort Collins, Seattle) — defense tech with hardware moat, dream company
- **Databricks** posted two Sr. Staff Observability/Governance roles + a SA-Data Engineering role — strong stack match
- **PhysicsX** opened US SF-based roles (Forward Deployed SE + ML Engineer) — previously EU-only board, now hiring in SF
- **Aurora Innovation** added two Staff Deep Learning Acceleration roles (Mountain View + SF)
- **Nuro** added Staff SW Eng, Onboard Infrastructure (Mountain View)

---

## New Matches

### Anduril (6)
| Title | Location | URL |
|-------|----------|-----|
| Senior Software Engineer | Broomfield, CO | [link](https://boards.greenhouse.io/andurilindustries/jobs/5150327007?gh_jid=5150327007) |
| Senior Software Engineer - Forge Factory Automation | Seattle, WA | [link](https://boards.greenhouse.io/andurilindustries/jobs/5152747007?gh_jid=5152747007) |
| Software Engineer | Broomfield, CO | [link](https://boards.greenhouse.io/andurilindustries/jobs/5150344007?gh_jid=5150344007) |
| Software Engineer | Fort Collins, CO | [link](https://boards.greenhouse.io/andurilindustries/jobs/5150341007?gh_jid=5150341007) |
| Software Engineer, Rust | Broomfield, CO | [link](https://boards.greenhouse.io/andurilindustries/jobs/5150957007?gh_jid=5150957007) |
| Staff Software Engineer, Production Solutions | Seattle, WA | [link](https://boards.greenhouse.io/andurilindustries/jobs/5152095007?gh_jid=5152095007) |

### Databricks (3)
| Title | Location | URL |
|-------|----------|-----|
| Specialist Solutions Architect - Data Engineering & Observability | United States | [link](https://databricks.com/company/careers/open-positions/job?gh_jid=8570023002) |
| Sr. Staff Software Engineer — Observability, Insights & Governance | Bellevue/Seattle, WA | [link](https://databricks.com/company/careers/open-positions/job?gh_jid=8575251002) |
| Sr. Staff Software Engineer — Observability, Insights & Governance | Mountain View/SF, CA | [link](https://databricks.com/company/careers/open-positions/job?gh_jid=8575248002) |

### PhysicsX (2)
| Title | Location | URL |
|-------|----------|-----|
| Forward Deployed Software Engineer | San Francisco, CA | [link](https://job-boards.eu.greenhouse.io/physicsx/jobs/4880930101) |
| Machine Learning Engineer | San Francisco, CA | [link](https://job-boards.eu.greenhouse.io/physicsx/jobs/4880947101) |

### Aurora Innovation (2)
| Title | Location | URL |
|-------|----------|-----|
| Staff Software Engineer, Deep Learning Acceleration | Mountain View, CA | [link](https://aurora.tech/jobs/8571618002?gh_jid=8571618002) |
| Staff Software Engineer, Deep Learning Acceleration | San Francisco, CA | [link](https://aurora.tech/jobs/8571624002?gh_jid=8571624002) |

### Glean (1)
| Title | Location | URL |
|-------|----------|-----|
| Software Engineer, Storage | Mountain View, CA | [link](https://job-boards.greenhouse.io/gleanwork/jobs/4610281005) |

### Nuro (1)
| Title | Location | URL |
|-------|----------|-----|
| Staff Software Engineer, Onboard Infrastructure | Mountain View, CA | [link](https://nuro.ai/careersitem?gh_jid=7974966) |

### Samsara (1)
| Title | Location | URL |
|-------|----------|-----|
| Software Engineer II, AI Platform | Remote - CA | [link](https://www.samsara.com/company/careers/roles/7618581?gh_jid=7618581) |

### Figure AI (1) — first pass
| Title | Location | URL |
|-------|----------|-----|
| Helix AI Engineer, Backend Infrastructure | San Jose, CA (Bay Area) | [link](https://job-boards.greenhouse.io/figureai/jobs/4685172006) |

---

## Boards With No New Matches (already in history)

Anthropic, Temporal, Arize AI, RunPod, Intercom, Hume AI, Airtable, Vercel,
ClickHouse, Fivetran, Chainguard, Rocket Lab, Vast, Wayve, Scale AI, Planet Labs,
Black Forest Labs, Stability AI, Amplemarket, Isomorphic Labs

## Boards With No US-Eligible Matches (EU/non-US location)

Parloa, PolyAI, Speechmatics, Helsing, N26, Trade Republic, SumUp, Scandit,
Celonis, Contentful, GetYourGuide, HelloFresh

## Boards Empty / 404
Dagster Labs (0 jobs returned)

---

## Filters Applied

**Title ACCEPT:** Software Engineer, Backend Engineer, Data Engineer, Data Platform, Platform Engineer, Infrastructure Engineer, ML Engineer, Engineering Manager, SRE, Site Reliability, Machine Learning Engineer, ML Platform, MLOps, AI Engineer, AI Infrastructure, NLP, LLM, DevOps, Engineering Lead

**Title REJECT:** Junior, Intern, .NET, "Java ", iOS, Android, PHP, Ruby, Embedded, Firmware, FPGA, ASIC, Blockchain, Web3, Crypto, Salesforce Admin, "SAP ", Oracle EBS, Mainframe, COBOL

**Location ACCEPT:** Remote (US), Denver metro (Broomfield, Fort Collins, Boulder, Aurora CO), SF Bay Area (Mountain View, Sunnyvale, Palo Alto, South SF, etc.), Los Gatos, Seattle metro (Bellevue, Kirkland, Redmond WA), Bend OR, "United States" (nationwide)

**Location REJECT:** NYC/Chicago without Remote, all non-US cities

**Blocked companies:** Palantir (disabled in portals.yml)

---

*Pipeline entries added to `data/pipeline.md`. Scan history updated in `data/scan-history.tsv`.*
