# Scout Quickcheck — 2026-10-19

**Type:** Greenhouse API quick scan (no WebSearch)
**Companies checked:** 40 (run 1) + 36 (run 2, history refresh)
**Raw matches:** 28 (run 1) + 2 additional (run 2)
**After filtering:** 18 valid (7 top, 11 secondary) + 2 additional
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

## Additional Matches (Run 2 — History Refresh)

A second scan pass ran later in the day, adding 848 previously-untracked URLs to scan-history.tsv. Two additional matches surfaced that weren't in history after run 1:

| Company | Title | Location | URL |
|---------|-------|----------|-----|
| Anthropic | IT Systems Engineer, Client Platform Engineer, ChromeOS | Remote-Friendly + SF + Seattle | https://job-boards.greenhouse.io/anthropic/jobs/5456018008 |
| Rocket Lab | Flight Software Engineer I | Littleton, CO (Denver metro) | https://job-boards.greenhouse.io/rocketlab/jobs/8038139003 |

**Notes:**
- **Anthropic ChromeOS** — Endpoint/IT systems role focused on ChromeOS fleet management. Travel required. "Platform Engineer" is in title but this is closer to IT ops than software engineering. Verify fit.
- **Rocket Lab Littleton** — Flight software for launch vehicles at Rocket Lab's Denver metro office. Level I indicates mid-level entry into aerospace flight software. Strong hardware moat.

## Excluded (10 matches, run 1)

| Reason | Count |
|--------|-------|
| Germany/European remote only (Parloa) | 1 |
| False positive title match via "llm" in "fulfillment" (HelloFresh) | 1 |
| Remote - Canada (Samsara x3) | 3 |
| Product/ops manager, not engineering (Samsara) | 1 |
| Mechanical Engineering Manager, not SW (Zipline) | 1 |
| Long Beach CA relocation required (Vast x3) | 3 |

## Actions
- Run 1: Added 28 raw URLs to `data/scan-history.tsv` (dedup for future scans)
- Run 1: Added 18 matches to `data/pipeline.md` (7 top, 11 secondary)
- Run 2: Added 848 additional URLs to `data/scan-history.tsv` (comprehensive history refresh)
- Run 2: Added 2 additional matches to `data/pipeline.md`
- Anduril retry needed — timed out in both runs; should appear in next full scan with Playwright
