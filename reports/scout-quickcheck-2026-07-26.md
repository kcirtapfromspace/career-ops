# Scout Quick Check — 2026-07-26

**Scope:** Greenhouse API only (42 boards)  
**Method:** Lightweight API check — no Playwright, no WebSearch  
**History entries at start:** 19,281  
**Candidates before dedup:** ~550+ (title-filtered from full boards)  
**New matches after dedup:** 5  
**Qualifying pipeline additions:** 0  

---

## Summary

Quick check ran across all 42 Greenhouse-enabled companies. 5 new job IDs surfaced that were not in scan history, but **all 5 were disqualified on secondary location review** (no remote option offered):

| Company | Title | Location | Reason Skipped |
|---------|-------|----------|----------------|
| HelloFresh | Senior Infrastructure Engineer [INTELLIGENT PLATFORMS] | Irving TX / Newark NJ / Phoenix AZ | No remote; non-accept cities |
| Rocket Lab | Principal Software Engineer - TS/SCI | Long Beach CA | TS/SCI clearance required; no remote |
| Rocket Lab | Senior Principal Software Engineer - TS/SCI | Long Beach CA | TS/SCI clearance required; no remote |
| Rocket Lab | Senior Network Software Engineer II - Secret Clearance | Long Beach CA | Secret clearance required; no remote |
| Rocket Lab | Senior Network Software Engineer I - Secret Clearance | Long Beach CA | Secret clearance required; no remote |

All 5 URLs have been added to `scan-history.tsv` to prevent re-discovery.

## Boards with Errors

- **Airtable**: HTTP 503 (temporary)
- **Arize AI**: HTTP 503 (temporary)
- **RunPod**: HTTP 404 (board may have moved)
- **Black Forest Labs**: HTTP 503 (temporary)

## Notes

- No notification sent — no qualifying new opportunities found.
- RunPod 404 should be investigated; the board slug may have changed.
- Previous full scan (2026-07-26) found 16 new matches and is in `data/pipeline.md`.
