# Scout Quick Check — 2026-06-03

**Method:** Greenhouse API only (no WebSearch)
**Boards scanned:** 42 companies (28 US-standard, 14 EU — 13 EU boards unreachable from this environment)
**Jobs reviewed:** ~5,300+ raw listings
**After title + location filter:** 8 new matches
**Run time:** ~20s parallel fetch

---

## New Matches

| # | Company | Title | Location | URL |
|---|---------|-------|----------|-----|
| 1 | Anthropic | Staff Software Engineer, Infrastructure Asset Systems | San Francisco, CA / New York City, NY | [link](https://job-boards.greenhouse.io/anthropic/jobs/5237762008) |

*Note: 7 additional matches were found in a prior quick check run earlier today (see pipeline.md header for the full 8-match list).*

---

## Coverage Notes

**US Greenhouse boards — OK (28 boards):**
Anthropic, Anduril, Intercom, Hume AI, Airtable, Vercel, Temporal, Arize AI, RunPod, Glean, Black Forest Labs, Celonis, Contentful, Stability AI, Amplemarket, Dagster, Fivetran, Samsara, Chainguard, Rocket Lab, Vast, Aurora Innovation, Nuro, Zipline, Figure AI, Planet Labs, Scale AI, Databricks, Clickhouse

**EU Greenhouse boards — failed (13 boards, `boards-api.eu.greenhouse.io` unreachable):**
PolyAI, Parloa, Speechmatics, Helsing, GetYourGuide, HelloFresh, N26, Trade Republic, SumUp, Scandit, Wayve, Isomorphic Labs, PhysicsX

---

## Filtered-Out Highlights

These passed title filter but failed location (not US Remote / Denver / SF / Los Gatos / Seattle / Bend):

| Company | Title | Location | Reason |
|---------|-------|----------|--------|
| Anduril | 20 SSE/Staff roles | Waltham/Irvine/Costa Mesa/DC/Atlanta | No remote, not in accept cities |
| Aurora Innovation | Staff SWE (3 roles) | Pittsburgh, PA | Not in accept cities |
| Rocket Lab | SWE II / SWE Lead | Long Beach, CA | Not in accept cities |
| Clickhouse | Sr SWE - AI/ML | Canada | Not US Remote |
| Zipline | Full Stack SWE | Kigali, Rwanda | Outside US |
| Scale AI | SWE Backend | Budapest, Hungary | Outside US |

---

## System Update Reminder

career-ops update available: **v1.2.0 → v1.8.1**. Run `node update-system.mjs apply` to update (your CV, profile, tracker, and reports are safe).
