# Scout Quick Check — 2026-08-06

**Run type:** Greenhouse API quick check (41 companies)  
**Jobs scanned:** ~4,900+ (across 39 responsive boards)  
**Seen URLs in history (pre-run):** 19,505  
**History lines appended:** 886  
**New matches added to pipeline:** 2  
**Errors:** Anduril (timeout), Aurora Innovation (404 — migrated to Ashby), Dagster (0 open roles)

---

## New Jobs Added to Pipeline

### 1. Samsara — Manager II, Data Platform
- **URL:** https://www.samsara.com/company/careers/roles/7811931?gh_jid=7811931
- **Location:** Remote - US
- **Notes:** Management role for the Data Platform org at Samsara (IoT/AI platform). Remote US confirmed. Strong match to Patrick's EM + Data Platform background. Priority: evaluate comp range and team scope before applying.

### 2. Samsara — Staff Software Engineer, DevEx
- **URL:** https://www.samsara.com/company/careers/roles/8109358?gh_jid=8109358
- **Location:** Remote - Canada
- **Notes:** Staff IC role on the Developer Experience team. Canada remote only (lower priority vs US remote). DevEx is adjacent to Patrick's infrastructure/platform background. Evaluate if Canada remote is acceptable; if so, assess comp and scope.

---

## Errors / Gaps

| Company | Status | Notes |
|---------|--------|-------|
| Anduril | **TIMEOUT** | API request timed out (15s). Last seen: Senior Realtime Software Engineer added 2026-08-05. Manual check recommended. |
| Aurora Innovation | **404** | Greenhouse board gone — migrated to Ashby. Not covered by this quickcheck (Ashby boards require Playwright). |
| Dagster | **0 jobs** | Board returned empty. Possible hiring freeze or open roles removed. |
| RunPod | **disabled** | `enabled: false` in portals.yml — board was 404 as of 2026-08-05. |

---

## Companies with 0 New Matches (all previously seen)

Anthropic (395 jobs, all seen), PolyAI (15), Parloa (59), Intercom (121), Hume AI (5), Airtable (40), Vercel (80), Temporal (54), Arize AI (29), Glean (102), Speechmatics (12), Black Forest Labs (13), Helsing (135), Celonis (257), Contentful (27), GetYourGuide (51), HelloFresh (331), N26 (86), Trade Republic (46), SumUp (377), Scandit (15), Wayve (106), Isomorphic Labs (23), PhysicsX (40), Stability AI (5), Fivetran (204), Chainguard (73), Rocket Lab (397), Vast (165), Nuro (102), Zipline (263), Figure AI (126), Planet Labs (80), Scale AI (216), Databricks (814), Clickhouse (167), Amplemarket (12).

---

## False Positives Filtered (script bugs, not added to pipeline)

The filtering script had two issues — corrected manually before pipeline insertion:

1. **`LLM` keyword matching `fulfiLLMent`** — produced 2 false positive HelloFresh non-tech roles ("Area Manager I, Fulfillment", "Fulfillment Technology Analyst"). Not added to pipeline.
2. **Location filter too permissive** — non-US cities not in the reject list (Aachen, Barcelona, Vilnius, Sofia, São Paulo, Singapore, Bengaluru, Tokyo) passed through as "null" instead of being rejected. 12 non-US roles incorrectly flagged as new. Not added to pipeline.

All 14 false positives were logged to scan-history.tsv and will be deduplicated in future runs.
