# Scout Quick Check — 2026-08-26

**Method:** Greenhouse API (41 boards, parallel fetch)  
**Total matches scanned:** 811 raw → 11 after title/location pre-filter → 3 after strict filtering  
**Aurora Innovation:** HTTP 404 (board may have moved)

---

## New Matches Added to Pipeline

### 1. Planet Labs — Senior Data Engineer
- **Location:** Denver, CO ← direct match
- **URL:** https://job-boards.greenhouse.io/planetlabs/jobs/8160759
- **Why:** Satellite Earth observation data platform. Denver-based. Exact title+location hit.

### 2. Temporal — Staff Software Engineer - Test Systems & Tooling
- **Location:** United States - Remote Opportunity
- **URL:** https://job-boards.greenhouse.io/temporaltechnologies/jobs/5223128007
- **Why:** Temporal is workflow orchestration (Airflow/Argo adjacent). Fully US remote. Patrick uses Argo at scale.

### 3. Temporal — Senior Engineering Manager - Test Systems & Tooling
- **Location:** United States
- **URL:** https://job-boards.greenhouse.io/temporaltechnologies/jobs/5222955007
- **Why:** Engineering Manager at Temporal. US-based. Manager archetype match.

---

## Rejected (location or title mismatch)

| Company | Title | Location | Reason |
|---------|-------|----------|--------|
| Anthropic | Senior Manager, Infrastructure Tax | SF (Travel Required) | Finance/tax role, not engineering |
| Anduril | Agentic AI Engineer, Automation | Costa Mesa, CA | No remote; not in accept list |
| Anduril | Senior ML Engineer, Core Development | Costa Mesa, CA | No remote; not in accept list |
| HelloFresh | Fulfillment Associate | Lake Zurich, IL | False positive (title filter miss) |
| Clickhouse | Technical Customer Support Engineer, AI Infrastructure | EMEA Remote | Not US |
| Planet Labs | Software Engineer, Missions Software | Canada Remote | Not US |
| Planet Labs | Software Engineer - Platform, Mission Systems | Canada Remote | Not US |
| Vast | Senior Software Engineer, Mission Software | Long Beach, CA | Not in accept locations; no remote |

---

## Notes

- Aurora Innovation Greenhouse board returned HTTP 404 — may have migrated ATS. Update portals.yml to use websearch fallback.
- HelloFresh "Fulfillment Associate" slipped through title filter — likely an API data anomaly (title not matching job board display).
