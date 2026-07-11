# Scout Quick-Check — 2026-07-11

**Type:** Greenhouse API scan (no WebSearch, no Playwright)
**Companies checked:** 42
**API errors:** 1 (RunPod — HTTP 404, board may have moved)
**Total jobs fetched:** ~7,432
**History entries at scan time:** 13,841
**New matches found:** 2

## Filters applied
- **Title (positive):** Software Engineer, Data Engineer, ML Engineer, Platform Engineer, SRE, Engineering Manager, Backend Engineer, etc.
- **Title (negative):** Junior, Intern, .NET, Java, iOS, Android, PHP, Ruby, Embedded, etc.
- **Location:** US Remote, Denver, SF, Los Gatos, Seattle, Bend (NYC/Chicago remote-only)
- **Blocked:** Palantir (disabled in portals.yml)

## Infrastructure note

RunPod's Greenhouse board returned HTTP 404. Their board slug `runpod` may have changed. No action taken — they only had 1 known entry in scan history. Worth verifying manually if interested.

## New matches

### Zipline (2)

Both are new job IDs not previously seen (prior Zipline entries topped out at 7802xxx-range as of July 10).

| Title | URL | Location | Priority |
|-------|-----|----------|----------|
| Software Engineering Manager, Launch & Scale Platform | https://www.zipline.com/open-roles?gh_jid=7802154003 | South San Francisco, CA (on-site) | Medium — confirm remote |
| Senior Integration and Test Software Engineer - Long Range Platform | https://www.zipline.com/open-roles?gh_jid=7802156003 | South San Francisco, CA (on-site) | Lower — test eng role |

**EM role note:** "Software Engineering Manager, Launch & Scale Platform" — this is an engineering manager role for Zipline's Launch & Scale Platform team. Hardware moat company (drone delivery for medical & retail). South San Francisco is on-site. Before evaluating, confirm whether Zipline offers remote flexibility for EM roles; prior entries in pipeline were on-site.

**Test eng note:** "Senior Integration and Test Software Engineer - Long Range Platform" — this is integration & test engineering for Zipline's Long Range Platform (a drone product). It's a test/validation role more than a platform engineering role. Listed as lower priority.

## Companies with zero new matches (clean sweep)

All other 40 enabled API companies returned no new relevant jobs: Anthropic (411 total), Anduril (2166), Airtable (37), Arize AI (37), Aurora Innovation (146), Black Forest Labs (14), Celonis (216), Chainguard (74), Clickhouse (170), Contentful (33), Dagster (0), Databricks (787), Figure AI (118), Fivetran (129), GetYourGuide (56), Glean (132), HelloFresh (381), Helsing (124), Hume AI (5), Intercom (139), Isomorphic Labs (20), N26 (70), Nuro (95), Parloa (53), PhysicsX (34), Planet Labs (82), PolyAI (9), Rocket Lab (373), Samsara (311), Scale AI (184), Scandit (11), Speechmatics (12), Stability AI (3), SumUp (405), Trade Republic (52), Temporal (57), Vast (161), Vercel (67), Wayve (110).

All previously-seen jobs at these companies are already in the pipeline or scan history.
