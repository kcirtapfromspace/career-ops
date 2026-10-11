# Scout Quickcheck — 2026-10-06

**Type:** Greenhouse API quickcheck (no WebSearch, no Playwright)
**Companies checked:** 36 (all enabled companies with `api:` field)
**Duration:** ~7 minutes

## Summary

**1 new match found.** All other API results were already in `scan-history.tsv`.

## New Match

| Company | Title | Location | URL |
|---------|-------|----------|-----|
| Chainguard | Senior Software Engineer (Customer Platform) | US Remote | https://job-boards.greenhouse.io/chainguard/jobs/4697216006 |

Added to `data/pipeline.md` for evaluation.

## API Errors (ongoing)

| Company | Error |
|---------|-------|
| ClickHouse | HTTP 404 — board appears migrated |
| Wayve | HTTP 404 — board appears migrated |
| Black Forest Labs | HTTP 404 — board appears migrated |

## Truncated Responses (large boards — partial check only)

These companies returned >100k response; only jobs visible in the first portion were checked:

- Anthropic (458k), Anduril (2.5MB), Scale AI (150k), Databricks (760k), Fivetran (154k), Samsara (185k), Nuro (129k), Vast (298k), Rocket Lab (461k), Zipline (219k), Celonis (415k), HelloFresh (337k), SumUp (215k)

For these companies, the full pipeline scan (Playwright-based) provides better coverage.

## Note on Update

System update available: v1.2.0 → v1.35.0. Run `node update-system.mjs apply` to update.
