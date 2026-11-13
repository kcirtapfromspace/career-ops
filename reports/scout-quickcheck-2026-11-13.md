# Scout Quick Check — 2026-11-13

**Type:** Greenhouse API quick check (40 companies)
**Run:** Automated scheduled scan
**Date:** 2026-11-13

## Summary

- Checked 40 Greenhouse API endpoints
- Scanned 8,316 total job listings
- 5 new matches found (not previously seen)
- 1 location-rejected (Samsara Canada)
- 4 API errors (see below)

## New Matches

| Company | Title | Location | URL |
|---------|-------|----------|-----|
| Anthropic | Staff+ Software Engineer, Consumer | San Francisco, CA | [link](https://job-boards.greenhouse.io/anthropic/jobs/5477652008) |
| Anduril | Realtime Software Engineer | Waltham, MA | [link](https://boards.greenhouse.io/andurilindustries/jobs/5294365007?gh_jid=5294365007) |
| Anduril | Site Reliability Engineer | Waltham, MA | [link](https://boards.greenhouse.io/andurilindustries/jobs/5294371007?gh_jid=5294371007) |
| Anduril | Software Engineer, AI | Costa Mesa, CA | [link](https://boards.greenhouse.io/andurilindustries/jobs/5293883007?gh_jid=5293883007) |
| Anduril | Staff Guidance Navigation and Control SW Engineer (GNC) | Costa Mesa / Santa Ana, CA | [link](https://boards.greenhouse.io/andurilindustries/jobs/5294106007?gh_jid=5294106007) |

### Highlights
- **Anthropic - Staff+ Software Engineer, Consumer** — Staff+ level consumer product role at Anthropic (SF). High relevance.
- **Anduril - Software Engineer, AI** — New AI-specific SWE role at Anduril (dream company). Costa Mesa.
- **Anduril - Site Reliability Engineer** — SRE role at Anduril. Waltham MA. Defense-focused SRE.
- **Anduril - Realtime Software Engineer** — New posting (5294365007) alongside existing 5289370007. Waltham MA.
- **Anduril - Staff GNC Software Engineer** — Guidance/Navigation/Control aerospace role. Specialized; borderline fit.

## API Errors (404)

These companies' Greenhouse boards appear to have moved or been removed:
- Parloa (parloa) — 404
- Black Forest Labs (blackforestlabs) — 404
- Wayve (wayve) — 404
- Clickhouse (clickhouse) — 404

> **Action:** Update `portals.yml` to either disable or update slugs for these companies.

## Filtered (Location)

- Samsara — Manager II, Software Engineering (Remote - Canada) — rejected, Canada

## Notes

- Previous quickchecks added entries to scan-history.tsv in multiple formats; dedup works best when checking URL in both column 0 and column 1.
- All 5 new matches appended to `data/pipeline.md` for evaluation.
