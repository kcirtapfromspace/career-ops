# Scout Quick-Check — 2026-06-16 (Greenhouse API only)

**Date:** 2026-06-16
**Run:** quickcheck-2026-06-16
**Companies scanned:** 41 successful / 10 API errors (404/timeout)
**Total jobs reviewed:** 5,347
**New matches:** 12 (5 US-remote priority, 4 Canada/UK remote, 2 flagged, 1 EU-only)

## API Errors (404 / Timeout)

These boards returned errors — boards that have moved or are temporarily down:
- Anduril (timeout — large board, retry later)
- Prefect (404 — moved to Ashby, correct in portals.yml)
- Neon (404 — acquired by Databricks, correct in portals.yml)
- Shield AI (404 — moved to Lever, correct in portals.yml)
- Skydio (404 — UUID-based URLs, correct in portals.yml)
- Hadrian (404 — own hosted board, correct in portals.yml)
- Hermeus (404 — moved to Lever, correct in portals.yml)
- Joby Aviation (404 — moved to iCIMS, correct in portals.yml)
- Archer Aviation (404 — 404, correct in portals.yml)
- Snowflake (404 — moved to Ashby, correct in portals.yml)

All of these exceptions are already documented in portals.yml with appropriate fallback scan methods.

## New Matches

### Priority — US Remote

| Company | Role | Location | URL |
|---------|------|----------|-----|
| Chainguard | Staff Software Engineer | United States - Remote | [link](https://job-boards.greenhouse.io/chainguard/jobs/4689447006) |
| Chainguard | Principal Software Engineer | United States - Remote | [link](https://job-boards.greenhouse.io/chainguard/jobs/4689477006) |
| Chainguard | Senior Software Engineer | United States - Remote | [link](https://job-boards.greenhouse.io/chainguard/jobs/4689483006) |
| Chainguard | Software Engineer | United States - Remote | [link](https://job-boards.greenhouse.io/chainguard/jobs/4689485006) |

**Note on Chainguard surge:** Chainguard posted 9 new roles today across US/Canada/UK. This looks like a hiring batch. The company builds cloud-native supply chain security (K8s, containers, Argo/Tekton). All 4 US-remote roles passed filters. Staff and Principal levels are priority. The "Senior" and "Software Engineer" roles may be below target level — verify before applying.

### Flagged — Review Location

| Company | Role | Location | Note |
|---------|------|----------|------|
| Airtable | Software Engineer, Product Frontend (8+ YOE) | San Francisco, CA; New York, NY | **Frontend role** — likely less relevant for Patrick's data/platform focus. SF location is good. Worth a quick check if title broadens. |
| Fivetran | Principal Software Engineer - Data Lakes | Remote, Germany, EMEA | **EU remote only** — Data Lakes is an excellent title match (Patrick's core domain). However, this role is EMEA-targeted. If Fivetran considers US candidates for this role, high priority. Verify. |

### International (Canada / UK Remote)

These passed the location filter because "remote" was detected, but are Canada/UK scoped:
- Chainguard — Staff Software Engineer (Canada - Remote)
- Chainguard — Staff Software Engineer (United Kingdom - Remote)
- Chainguard — Senior Software Engineer (Canada - Remote)
- Chainguard — Senior Software Engineer (United Kingdom - Remote)
- Chainguard — Software Engineer (Canada - Remote)
- Chainguard — Software Engineer (United Kingdom - Remote)

Added to pipeline for completeness. Skip unless Chainguard hires across North America for the Canada roles.

## Summary

The dominant signal from this quick-check is a **Chainguard hiring surge** — 9 new roles posted today across all seniority levels and regions. Chainguard is a strong technical fit (K8s, containers, cloud-native security). Patrick already has an `AI Solutions Engineer` role from Chainguard in the pipeline from today's earlier scan. The new roles are more traditional SWE tracks.

**Recommended actions:**
1. Evaluate `Staff Software Engineer` at Chainguard (US Remote) — highest priority
2. Verify Fivetran Data Lakes role for US eligibility — excellent domain match if they consider US candidates
3. Skip Airtable Product Frontend unless Patrick is interested in frontend-leaning roles
