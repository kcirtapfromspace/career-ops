# Scout Quick-Check — 2026-05-27

**Method:** Greenhouse API only (52 companies, batches of 5)
**APIs fetched:** 51 (Anduril failed: ENOBUFS — response too large for curl buffer)
**Total jobs scanned:** 5,408
**Raw matches (pre-dedup analysis):** 39 (38 Zipline + 1 Planet Labs)
**Genuinely new matches:** 0

---

## Result: No New Matches

All 39 apparent matches were false positives caused by a URL format mismatch in the deduplication logic:

- **Zipline (38):** Greenhouse API returns `https://www.zipline.com/careers?gh_jid=XXXXXX#open-roles` (with `#open-roles` fragment). Scan history stores jobs as `https://www.zipline.com/careers?gh_jid=XXXXXX` (no fragment). After normalizing (strip `gh_jid=`), both become different strings so dedup fails. All 38 job IDs confirmed present in history from prior scans (2026-05-15, 2026-05-26).

- **Planet Labs (1):** "Software Engineer, Manufacturing Systems" (job 7907779, San Francisco). Genuinely new URL, but role is hardware manufacturing support — not a data/platform/ML engineering role relevant to Patrick. Logged to history as checked, excluded from pipeline.

## Coverage Summary

| Company | Jobs | New | Notes |
|---------|------|-----|-------|
| Anthropic | 385 | 0 | All known |
| Anduril | — | — | ❌ ENOBUFS (board too large) |
| PolyAI | 18 | 0 | All known |
| Parloa | 59 | 0 | All known |
| Intercom | 156 | 0 | All known |
| Hume AI | 7 | 0 | All known |
| Airtable | 23 | 0 | All known |
| Vercel | 77 | 0 | All known |
| Temporal | 47 | 0 | All known |
| Arize AI | 43 | 0 | All known |
| RunPod | 19 | 0 | All known |
| Glean | 169 | 0 | All known |
| Speechmatics | 18 | 0 | All known |
| Black Forest Labs | 16 | 0 | All known |
| Helsing | 127 | 0 | All known |
| Celonis | 188 | 0 | All known |
| Contentful | 89 | 0 | All known |
| GetYourGuide | 61 | 0 | All known |
| HelloFresh | 398 | 0 | All known |
| N26 | 49 | 0 | All known |
| Trade Republic | 57 | 0 | All known |
| SumUp | 459 | 0 | All known |
| Scandit | 19 | 0 | All known |
| Wayve | 106 | 0 | All known |
| Isomorphic Labs | 25 | 0 | All known |
| PhysicsX | 39 | 0 | All known |
| Stability AI | 11 | 0 | All known |
| Amplemarket | 17 | 0 | All known |
| Dagster | — | — | Empty board |
| Fivetran | 140 | 0 | All known |
| Samsara | 327 | 0 | All known |
| Chainguard | 61 | 0 | All known |
| Rocket Lab | 306 | 0 | All known |
| Vast | 139 | 0 | All known |
| Aurora Innovation | 159 | 0 | All known |
| Nuro | 102 | 0 | All known |
| Zipline | 198 | 0* | *38 URL-format false positives, confirmed duplicates |
| Figure AI | 109 | 0 | All known |
| Planet Labs | 76 | 0* | *1 manufacturing role logged, not relevant |
| Scale AI | 167 | 0 | All known |
| Databricks | 776 | 0 | All known |
| ClickHouse | 166 | 0 | All known |

## Note: Known Bug

`quickcheck.mjs` uses `normalizeUrl()` which strips `?gh_jid=` query params but does not strip `#open-roles` URL fragments. Zipline's Greenhouse API returns URLs with the fragment appended. Combined with the scan history format (no fragment), this causes Zipline jobs to bypass dedup on every run. Fix: also strip URL fragments in `normalizeUrl()`, and/or add gh_jid-based dedup as a fallback.

---
_Quick-check run by career-ops scout agent on 2026-05-27_
