# Scout Quick-Check — 2026-04-22

**Method:** Greenhouse API (portals.yml api: boards, no browser)
**Companies scanned:** ~52 Greenhouse API boards
**API errors (unreachable boards):** Zipline, Snowflake (2 boards)
**Scan-history side-fix:** 504 historical entries in wrong column order (date-first) were corrected to standard url-first format — future dedup will work correctly for all prior quickcheck data

---

## Summary

- Quickcheck ran against all Greenhouse API boards defined in portals.yml with `enabled: true`
- 2 boards returned errors: **Zipline**, **Snowflake** (may be slug changes or temporary outages)
- **15 net-new jobs** found and appended to `data/pipeline.md`

---

## New Matches (15 total)

| Company | Title | Location |
|---------|-------|----------|
| Anduril | Senior Software Engineer, Agentic Platform | Boston / Costa Mesa / Seattle |
| RunPod | Site Reliability Engineer | Remote, USA |
| Glean | Machine Learning Engineer, Enterprise Brain | San Francisco Bay Area |
| Wayve | Tech Lead, ML Engineer - AV Product engineering | Sunnyvale, CA |
| Dagster | Software Engineer - Enterprise Readiness | Remote (SF / NY / Minneapolis) |
| Dagster | Software Engineer - Product Development (Backend or Full-Stack) | Remote (SF / NY / Minneapolis) |
| Samsara | Senior Staff Software Engineer - STCE | Remote - US |
| Nuro | Senior Software Engineer, Cloud Efficiency & Cost Optimization | Mountain View, CA |
| Nuro | Senior Software Engineer, Software Update Infrastructure | Mountain View, CA |
| Figure AI | AI Training Infrastructure Engineer – Humanoid Whole Body Control | San Jose, CA |
| Planet Labs | Senior Software Engineer, Imaging Systems | United States, Remote |
| Databricks | Engineering Manager - App Frameworks | Mountain View, CA |
| Databricks | Sr Software Engineer, Infrastructure | San Francisco, CA |
| ClickHouse | Engineering Manager - Language clients | United States (remote) |
| ClickHouse | Senior Software Engineer - JVM Language Clients | United States (remote) |

---

## Top Picks

**Anduril — Senior SWE, Agentic Platform** — Dream company, Seattle/Boston/Costa Mesa on-site options. Agentic platform work is a direct fit.

**Dagster × 2** — Remote. Enterprise Readiness + Backend/Full-Stack. Patrick's Argo/Airflow/orchestration background is highly relevant.

**Samsara — Senior Staff SWE, STCE** — Remote US. Staff-level, IoT+AI platform at scale.

**Glean — MLE, Enterprise Brain** — SF Bay Area. LLM/enterprise AI search infra.

**ClickHouse — EM, Language Clients** — Remote. Engineering Manager scope at a fast-growing data infra company.

**Planet Labs — Senior SWE, Imaging Systems** — Remote. Data infra for satellite Earth observation.

---

## API Errors to Monitor

| Company | Board Slug | Status |
|---------|-----------|--------|
| Zipline | ziplineofficial | error |
| Snowflake | snowflake | error |

---

## Pipeline Status

- New entries added: **15**
- Next action: Run `/career-ops oferta` on Anduril (Agentic Platform), Dagster, or Samsara
