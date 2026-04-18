# Scout Quick-Check — 2026-04-18

**Method:** Greenhouse API (50 boards, batch fetch)
**Companies scanned:** 50 (Greenhouse API boards only)
**Errors (404/invalid boards):** Neon, Shield AI, Hadrian, Hermeus, Skydio, Archer Aviation, Joby Aviation, Zipline, Confluent, Prefect, Snowflake (11 boards unreachable)

---

## Summary

- Quickcheck ran against 50 Greenhouse API boards
- 11 boards returned 404 (likely slug changes or deactivated boards)
- **0 net-new jobs** found by quickcheck — scan history was already current (11,450 URLs loaded)
- **122 backfill entries** recovered: today's earlier full scan found 196 matches that were recorded in `scan-history.tsv` but never appended to `pipeline.md`. All 122 missing entries have now been added.

---

## Top Picks (High-Signal Roles)

### Databricks — Multiple roles
- AI Engineer - FDE (Forward Deployed Engineer)
- Data Platform Solutions Architect (Professional Services) × 3
- Engineering Manager - Platform Reliability
- Senior Solutions Architect (DS/ML/GenAI/LLM)
- Senior Staff Software Engineer - Delta × 3

### Scale AI — Defense-adjacent FDE roles
- Forward Deployed AI Engineering Manager, GenAI Applications
- Senior Full-Stack Software Engineer, (Forward Deployed), GPS
- Staff Full-Stack Software Engineer, (Forward Deployed), GPS
- Applied AI Engineer, Enterprise / Global Public Sector

### Intercom — AI Infrastructure
- AI Infrastructure Engineer × 2 (new openings)
- Engineering Manager, AI Models Infrastructure × 3

### Anduril — Large batch (47 roles)
- Senior SRE, Senior Software Engineer Platform/Kubernetes/Maritime
- Staff Software Engineer, Developer Platform
- Senior Software Engineering Manager

### Fivetran (Denver) — Direct fit
- Staff Software Engineer
- Staff Software Engineer - ETL Platform

---

## 404 Boards to Fix

The following Greenhouse board slugs are returning 404 — consider updating `portals.yml`:

| Company | Current Slug | Action |
|---------|-------------|--------|
| Neon | neondatabase | Verify slug |
| Shield AI | shieldai | Verify slug |
| Hadrian | hadrian | Verify slug |
| Hermeus | hermeus | Verify slug |
| Skydio | skydio | Verify slug |
| Archer Aviation | archeraviation | Verify slug |
| Joby Aviation | jobyaviation | Verify slug |
| Zipline | ziplineofficial | Verify slug |
| Confluent | confluent | Verify slug |
| Prefect | prefect | Verify slug |
| Snowflake | snowflake | Verify slug |

---

## Pipeline Status

- Total pipeline entries before: ~1,171
- Added: 122
- Next action: Review top picks above, run `/career-ops oferta` on the highest-signal roles
