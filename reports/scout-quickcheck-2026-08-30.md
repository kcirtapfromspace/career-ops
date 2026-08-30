# Scout Quick-Check — 2026-08-30

**Run type:** Greenhouse API quick-check (no WebSearch)  
**Companies scanned:** 42 (Greenhouse API only, `enabled: true`)  
**Total jobs checked:** ~7,933  
**New jobs added to pipeline:** 1  
**Errors:** Temporal (HTTP 404), Black Forest Labs (HTTP 404), Aurora Innovation (HTTP 404)

---

## New Matches

### Wayve (1) — Sunnyvale ⭐ Autonomous Vehicles

- **Software Engineer, Data Flywheel Platform** (Sunnyvale)  
  URL: https://wayve.firststage.co/jobs?gh_jid=8752578002  
  Data infrastructure role for the training data pipeline powering Wayve's AV system. Strong fit for Patrick's data platform background.

---

## Dedup Notes

9 Anduril jobs were returned by the API under `boards.greenhouse.io` URLs but were already in scan history from 2026-08-28 under `job-boards.greenhouse.io` format. Added as `dupe-url` entries to prevent future re-detection. No pipeline changes — those jobs are already queued.

## Errors (ATS migrations — check manually)

- **Temporal** — Greenhouse slug `temporaltechnologies` returns 404; likely migrated to another ATS
- **Black Forest Labs** — Greenhouse slug `blackforestlabs` returns 404
- **Aurora Innovation** — Greenhouse slug `aurorainnovation` returns 404 (ongoing, also flagged 2026-08-27)

---

## Action Items

- Evaluate Wayve Data Flywheel Platform SE when time permits (Sunnyvale location)
- Update `portals.yml` to fix broken Greenhouse slugs: Temporal, Black Forest Labs, Aurora Innovation — all have migrated
