# Scout Quick-Check — 2026-09-28

**Type:** Greenhouse API scan (quick-check)
**Run:** Automated scheduled task
**APIs checked:** 41 companies

---

## New Matches (4)

| Company | Role | Location | URL |
|---------|------|----------|-----|
| Anthropic | Staff + Sr. Software Engineer, Cloud Inference | San Francisco, CA \| Seattle, WA | [link](https://job-boards.greenhouse.io/anthropic/jobs/5436684008) |
| Anthropic | Staff + Sr. Software Engineer, Cloud Inference Launch Engineering | San Francisco, CA \| Seattle, WA | [link](https://job-boards.greenhouse.io/anthropic/jobs/5436697008) |
| Anthropic | Staff + Sr. Software Engineer, Scaling | NYC \| San Francisco, CA \| Seattle, WA | [link](https://job-boards.greenhouse.io/anthropic/jobs/5436703008) |
| Chainguard | Software Engineer (Repositories) | United States - Remote | [link](https://job-boards.greenhouse.io/chainguard/jobs/4714568006) |

All 4 added to `data/pipeline.md`.

---

## Skipped (location filter)

| Company | Role | Location | Reason |
|---------|------|----------|--------|
| Anthropic | Applied AI Engineer, DNB | London, UK | relocation |
| Anthropic | Applied AI Engineer, Enterprise | London, UK | relocation |
| Speechmatics | Senior Software Engineer – Front-End | London, UK | relocation |
| Celonis | (Senior) Backend Software Engineer (Java) | Munich, Germany | relocation |
| Nuro | Software Engineer, Cloud Infrastructure | Mountain View, CA | relocation (no remote) |
| Chainguard | Software Engineer (Repositories) | United Kingdom - Remote | non-US remote |
| Chainguard | Software Engineer (Repositories) | Canada - Remote | non-US remote |

---

## API Errors

| Company | Error |
|---------|-------|
| Anduril | timeout |
| Black Forest Labs | HTTP 404 (board likely migrated) |
| HelloFresh | timeout |
| Clickhouse | timeout |

**Note:** Anduril timeout is worth monitoring — it's a priority company. Black Forest Labs 404 suggests their Greenhouse board may be gone; the portals.yml entry may need updating.

---

## Summary

- **4 new roles** found across 2 companies (Anthropic ×3, Chainguard ×1)
- All added to pipeline for review
- Anduril API timed out — retry in next full scan
- Black Forest Labs board is 404 — consider disabling or finding new board URL
