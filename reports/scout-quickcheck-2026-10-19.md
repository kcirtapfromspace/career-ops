# Scout Quickcheck — 2026-10-19

**Type:** Greenhouse API quick scan (no WebSearch)
**Companies checked:** 40
**Raw matches:** 28
**After filtering:** 18 valid (7 top, 11 secondary)
**Excluded:** 10 (German/Canada location, non-SW title false positives, Long Beach relocation)

## Errors
- **Anduril** — Request timeout (retry in next full scan)
- **Black Forest Labs** — HTTP 404 (board may have moved)
- **Wayve** — HTTP 404 (board may have moved)
- **Clickhouse** — HTTP 404 (board may have moved)

## ★★ Top Picks (Denver / Remote US / SF)

| Company | Title | Location |
|---------|-------|----------|
| Fivetran | Senior Software Engineer - Orchestration | Denver, Colorado |
| Samsara | Data Engineer | Remote - US |
| Samsara | Manager II, Software Engineering, Infrastructure | Remote - US |
| Samsara | Senior Software Engineer II, Route Planning | Remote - US |
| Samsara | Staff Software Engineer, Maps Services | Remote - US |
| Databricks | Senior Software Engineer — Backend (Files Team) | San Francisco, CA |
| Databricks | Sr. Manager, Engineering - AI/BI | SF / Mountain View |

**Highlights:**
- **Fivetran Denver** — Direct local match. Patrick already knows Fivetran stack (Denver HQ, data integration). Orchestration role aligns with Argo/Airflow background.
- **Samsara x4 Remote** — IoT/AI platform with solid data and infra roles. Data Engineer + two manager tracks (infra/route planning). Samsara is large-scale, high-quality infra work.
- **Databricks x2** — Files Team backend (SF) and AI/BI eng manager. Databricks is a premium target. Worth evaluating both.

## ★ Secondary (verify location / SF-adjacent / Oakland Fivetran)

| Company | Title | Location |
|---------|-------|----------|
| Samsara | Senior Software Engineer II | Remote - SF Bay Area |
| Samsara | Senior Software Engineer II, DevEx | Remote - NYC |
| Samsara | Sr. Software Engineer II, DevEx | Remote - CA |
| Databricks | Sr. Staff Security Software Engineer - Agentic Security Engineering | Remote - CA |
| Databricks | Staff Security Software Engineer - Agentic Security Engineering | United States (remote) |
| Zipline | Sr. Manager, Software Engineering – Marketplace | South San Francisco, CA |
| Zipline | Staff Software Engineer – Integrations Platform | South San Francisco, CA |
| Fivetran | Manager Software Engineering | Oakland, CA (verify remote) |
| Fivetran | Senior Software Engineer | Oakland, CA (verify remote) |
| Fivetran | Senior Software Engineer - Orchestration | Oakland, CA (verify remote) |
| Fivetran | Staff Software Engineer, Backend | Oakland, CA (verify remote) |

**Notes:**
- Fivetran Oakland roles: Fivetran is described as "Denver/Remote" in portals. Oakland listings may still be remote-eligible — verify before discarding.
- Databricks security engineering: interesting if Patrick has security exposure in cloud infra work.
- Zipline SSF: on-site in SF bay area, no Denver or remote. Good company (drone delivery) but would need relocation to Bay Area.

## Excluded (10 matches)

| Reason | Count |
|--------|-------|
| Germany/European remote only (Parloa) | 1 |
| False positive title match via "llm" in "fulfillment" (HelloFresh) | 1 |
| Remote - Canada (Samsara x3) | 3 |
| Product/ops manager, not engineering (Samsara) | 1 |
| Mechanical Engineering Manager, not SW (Zipline) | 1 |
| Long Beach CA relocation required (Vast x3) | 3 |

## Actions
- Added all 28 raw URLs to `data/scan-history.tsv` (dedup for future scans)
- Added 18 matches to `data/pipeline.md` (7 top, 11 secondary)
- Anduril retry needed — timed out; should appear in next full scan with Playwright
