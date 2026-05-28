# Scout Quick-Check — 2026-05-28

**Method:** Greenhouse API only (42 boards)
**Runtime:** Sequential, no errors
**History before scan:** 8,869 known URLs
**New matches added:** 5 (1 false-positive removed before logging)

---

## New Matches

| # | Company | Title | Location | URL |
|---|---------|-------|----------|-----|
| 1 | **Anthropic** | Software Engineer, Claude Design | SF / NYC / Seattle | [link](https://job-boards.greenhouse.io/anthropic/jobs/5229345008) |
| 2 | **Anduril** ⭐ | Senior Machine Learning Engineer | Fort Collins, CO | [link](https://boards.greenhouse.io/andurilindustries/jobs/5126634007?gh_jid=5126634007) |
| 3 | **Aurora Innovation** | Staff Software Engineer, Logging | Mountain View, CA | [link](https://aurora.tech/jobs/8557100002?gh_jid=8557100002) |
| 4 | **Nuro** | Senior Software Engineer, FinOps | Mountain View, CA | [link](https://nuro.ai/careersitem?gh_jid=7958983) |
| 5 | **Databricks** | Sr. Manager, Engineering — Configuration Platform Team | Bellevue, WA | [link](https://databricks.com/company/careers/open-positions/job?gh_jid=8567602002) |

⭐ Anduril is flagged as a Dream Company in portals.yml — prioritize review.

---

## Notes

- **Zipline false-positive removed:** "Production Manager, Platform 2 Manufacturing Operations" matched the `manager, platform` substring filter but is a manufacturing operations role. Logged to scan-history to prevent re-surfacing; removed from pipeline.
- All 42 boards returned HTTP 200. Zero fetch errors.
- Dagster board returned 0 open roles.

---

## Board Stats (title-match highlights)

| Company | Total Jobs | Title Matches |
|---------|-----------|---------------|
| Databricks | 770 | 216 |
| Anduril | 1,959 | 318 |
| Glean | 170 | 27 |
| Samsara | 323 | 37 |
| Scale AI | 167 | 35 |
| Fivetran | 138 | 35 |
| SumUp | 474 | 35 |
| Clickhouse | 166 | 75 |

All other boards: ≤30 title matches, fully deduped against history.
