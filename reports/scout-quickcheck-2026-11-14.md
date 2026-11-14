# Scout Quick Check — 2026-11-14

**Type:** Greenhouse API quick check (40 companies)
**Run:** Automated scheduled scan
**Date:** 2026-11-14

## Summary

- Checked 40 Greenhouse API endpoints
- Scanned 8,337 total job listings
- 1 genuinely new match (3 duplicates filtered — URL format variation with/without `?gh_jid=`)
- 52 location-rejected
- 4 API errors (see below)

## New Matches

| Company | Title | Location | URL |
|---------|-------|----------|-----|
| Anthropic | Engineering Manager, Billing Platform | SF / NYC / Seattle | [link](https://job-boards.greenhouse.io/anthropic/jobs/5469291008) |

### Highlights
- **Anthropic - Engineering Manager, Billing Platform** ⭐ — New Engineering Manager role at Anthropic (dream company). Billing Platform team. SF/NYC/Seattle locations. Strong relevance given Patrick's platform engineering background.

## API Errors (404)

These companies' Greenhouse boards appear to have moved or been removed (same as previous scan):
- Parloa (parloa) — 404
- Black Forest Labs (blackforestlabs) — 404
- Wayve (wayve) — 404
- Clickhouse (clickhouse) — 404

> **Action:** These 4 have been 404 across multiple scans — consider disabling in `portals.yml`.

## Dedup Note

Samsara (8374911, 8223641) and Zipline (8204030003) were initially flagged as new but were already in scan-history.tsv from an earlier run today — with base URL (no `?gh_jid=` param). Duplicates removed. The dedup logic was updated to handle both URL formats in future runs.

## Notes

- Dagster board is confirmed empty/merged (Prefect acquisition)
- Clickhouse 404 persists across multiple scans

