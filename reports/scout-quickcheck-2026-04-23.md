# Scout Quick-Check — 2026-04-23

**Method:** Greenhouse API (direct JSON) — 51 companies  
**New matches:** 2  
**Companies scanned:** 51 (18 returned data in first pass, 28 retried with rate-limit backoff, 5 returned HTTP 404 — board likely migrated or closed)

---

## New Matches

### 1. Aurora Innovation — Senior Software Engineer, Sensor Infrastructure
- **URL:** https://aurora.tech/jobs/8512871002
- **Location:** Mountain View, CA (SF Bay Area)
- **Notes:** Aurora has a Denver office (per portals.yml). This role is Bay Area but sensor infrastructure = data pipeline / embedded systems at self-driving scale. Patrick's infra background relevant. Verify if remote/hybrid option exists before evaluating.

### 2. Samsara — Sr AI Engineer, AI Platform
- **URL:** https://www.samsara.com/company/careers/roles/7766851?gh_jid=7766851
- **Location:** Remote - CA
- **Notes:** AI Platform team at IoT/fleet intelligence company. "Sr AI Engineer" + remote fits Patrick's profile. Samsara runs large-scale data pipelines. Worth evaluating.

---

## Filtered Out (not added to pipeline)

| Company | Title | Location | Reason |
|---------|-------|----------|--------|
| Anduril | Senior Cloud Software Engineer | Reston, VA | location-skip — not target city, not remote |
| SumUp | Software Engineer, Golang - Payments Platform | Sofia, Bulgaria | location-skip — non-US |
| SumUp | Software Engineer (Golang) - Online Payments | Sofia, Bulgaria | location-skip — non-US |
| Fivetran | Senior Software Engineer - Databases | Toronto, Canada | location-skip — non-US |
| Aurora Innovation | Senior Software Engineer, Sensor Infrastructure | Pittsburgh, PA | location-skip — not target city |
| Databricks | Sr Software Engineer - Public Sector | McLean, VA | location-skip — not target city |
| Databricks | Staff Software Engineer - Public Sector | Virginia | location-skip — not target city |
| Anthropic | Senior Manager, Infrastructure Capex Accounting | SF / Seattle | title-skip — finance/accounting role, not engineering |
| Anthropic | Senior Manager, Infrastructure Lease Accounting | SF / Seattle | title-skip — finance/accounting role, not engineering |

---

## API Errors (404 — boards likely migrated)

- Prefect, Joby Aviation, Zipline, Skydio, Hadrian, Archer Aviation, Snowflake, Shield AI, Neon — returned HTTP 404. Greenhouse board slugs may be stale. Recommend verifying portals.yml entries.

---

## System Note

career-ops update available: v1.2.0 → v1.3.0. Run `node update-system.mjs apply` to update (your data files will not be touched).
