# Scout Quick-Check — 2026-08-31

**Type:** Greenhouse API scan (lightweight, no evaluations)
**Companies scanned:** 38 of 41 (3 board errors — see below)
**New matches added to pipeline:** 2

---

## New Jobs Found

### 1. Wayve — Machine Learning Engineer, Performance Tooling
- **Location:** London; Sunnyvale (Bay Area)
- **URL:** https://wayve.firststage.co/jobs?gh_jid=8763509002
- **Note:** Wayve is London-based autonomous driving AI (Embodied AI). US hiring in Sunnyvale. Title matches ML Engineer filter. Bay Area location — reviewable.

### 2. Wayve — Site Reliability Engineer, Vehicle Software
- **Location:** Sunnyvale (Bay Area)
- **URL:** https://wayve.firststage.co/jobs?gh_jid=8758604002
- **Note:** SRE role at Wayve's US Sunnyvale office. Vehicle software stack SRE — autonomous driving infra. Bay Area location — reviewable.

---

## Filtered Out (location mismatch)

4 Anduril roles found (Mission Software Engineer / Sr. Mission Software Engineer — Undersea Reconnaissance & Strike) in Washington DC, Boston MA, and Quincy MA. None are on the accept list. Logged to scan-history to prevent re-scan, not added to pipeline.

---

## API Status

| Company | Status |
|---------|--------|
| Temporal | HTTP 404 — Greenhouse board may have moved |
| Black Forest Labs | HTTP 404 — Greenhouse board may have moved |
| Aurora Innovation | HTTP 404 — Greenhouse board may have moved |

**Action recommended:** Verify Temporal, Black Forest Labs, and Aurora Innovation Greenhouse slugs in `portals.yml` — their boards returned 404. They may have migrated ATS.

---

## Actions Taken

- Appended 2 entries to `data/pipeline.md` (Wayve ML Engineer + SRE)
- Appended 6 entries to `data/scan-history.tsv` (2 Wayve + 4 Anduril filtered-but-logged)
