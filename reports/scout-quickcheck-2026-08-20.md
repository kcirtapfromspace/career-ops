# Scout Quick-Check — 2026-08-20

**Type:** Greenhouse API quick-check (no WebSearch, no Playwright)
**Companies scanned:** 41 (all Greenhouse API-enabled, `enabled: true`)
**Total jobs fetched:** ~7,798
**New matches (title filter + location filter + dedup):** 1 (US remote)
**Added to pipeline:** 1 entry

---

## New Matches — Act on These First

| Company | Role | Location | URL |
|---------|------|----------|-----|
| **Clickhouse** | Cloud Software Engineer - Observability Platform | United States (remote) | [link](https://job-boards.greenhouse.io/clickhouse/jobs/6130197004) |

### Clickhouse — 1 new match

**Cloud Software Engineer - Observability Platform** — observability/platform engineering role at Clickhouse, the fast-growing open-source OLAP database. Remote US.

Context for Patrick:
- Clickhouse is a high-performance column-oriented DB used in data infrastructure at scale — adjacent to Patrick's Databricks/Spark/warehouse background
- "Observability Platform" = SRE/platform engineering adjacent; aligns with Colorado Payroll reliability work
- Company is remote-first, backed by Benchmark, growing fast
- Note: a Canada-remote variant of the same role (job ID 6130195004) was also found but excluded per location policy (US only)

Recommended next step: run `/career-ops oferta` to get a full evaluation score.

---

## Scan Stats

| Metric | Value |
|--------|-------|
| Companies checked | 41 |
| Total jobs fetched | ~7,798 |
| New matches (US-eligible) | 1 |
| Excluded (Canada remote, same role) | 1 |
| Both URLs added to scan-history | ✅ |

---

## Errors / Skipped

| Company | Status |
|---------|--------|
| Aurora Innovation | HTTP error (Greenhouse board unavailable — recurring issue; third+ consecutive failure) |

---

## Notes

- 1 entry appended to `data/pipeline.md`
- 2 URLs added to `data/scan-history.tsv` (US + Canada variants, to prevent future re-discovery)
- No full evaluations run (discovery only)
- Aurora Innovation continues to fail — `portals.yml` should be updated to switch to `scan_method: websearch` as fallback
