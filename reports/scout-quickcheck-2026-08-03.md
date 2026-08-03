# Scout Quick-Check — 2026-08-03

**Type:** Greenhouse API scan (no WebSearch) — Run 2 (second pass same day)
**Scope:** 42 enabled companies with `api:` field (Palantir blocked)
**Date:** 2026-08-03
**Total jobs scanned:** 7,462
**New matches added to pipeline:** 3
**Filtered/rejected:** 5

## API Errors
- **RunPod:** HTTP 404 — board not found (consistent with previous run; likely migrated away from Greenhouse)
- **Aurora Innovation:** HTTP 404 — board not found (new; was OK in 2026-07-30 scan)
- **Dagster:** Empty board `[]` — no jobs posted (ongoing issue; may have migrated)

## New Matches (added to pipeline)

| Company | Role | Location | Notes |
|---------|------|----------|-------|
| Anduril | Senior Software Engineer, Data Distribution | Seattle, WA | ⭐ Data distribution infra at dream defense tech company. Seattle = accept. |
| Glean | Machine Learning Engineer, Assistant Quality | San Francisco, CA | ML engineering for AI assistant quality at enterprise search leader. SF. |
| Samsara | Lead AI Engineer, GTM Systems | Remote - US | AI for go-to-market automation. Remote US. Lead band. |

## Filtered Entries (not added to pipeline)

| Company | Role | Location | Reason |
|---------|------|----------|--------|
| Anduril | Sr. Robotics Software Engineer, Payload Integration | Sydney, Australia | International relocation required |
| Anduril | Sr. Robotics Software Engineer, Payload Integration | Brussels, Belgium | International relocation required |
| Anduril | Sr. Robotics Software Engineer, Payload Integration | Berlin, Germany | International relocation required |
| Anduril | Senior Software Engineer, Data Distribution | Costa Mesa, CA | Requires relocation (Costa Mesa not on accept list) |
| Samsara | Lead AI Engineer, GTM Systems | Remote - Canada | Canada geo variant |

## Context
This is the second Greenhouse-only quick-check pass of the day. An earlier run (same date) found 3 different matches:
- Anthropic EM, Search (SF/NYC)
- Anduril SE, PLM (Remote)
- Databricks Senior Applied ML Engineer - ML4Sys (SF)

All 6 entries from both runs are now in the `## 2026-08-03 — Quick Check` section of `data/pipeline.md`.

## Infrastructure Notes
- Aurora Innovation's Greenhouse board returned HTTP 404 (new failure — was working 2026-07-30)
- Consider updating `portals.yml`: `Aurora Innovation` may have migrated to a different ATS (check `aurora.tech/jobs`)

---
*Pipeline entries added to `data/pipeline.md`. Scan history updated in `data/scan-history.tsv`.*
*Run `/career-ops pipeline` to evaluate these offers.*
