# Quick-Check Scout Note — 2026-05-12

**Type:** Greenhouse API quick-check (52 companies)
**Triggered by:** Scout agent (Patrick Deutsch)
**Dedup base:** 13,070 known URLs pre-scan (scan-history.tsv)

---

## Summary

| Metric | Value |
|--------|-------|
| Companies scanned | 52 configured (41 reachable) |
| Jobs fetched | 5,544 |
| New matches added | **7** (5 from main run + 2 Anduril via retry) |
| False positives filtered | 1 (Glean "University Grad" — entry-level) |
| Errors | 1 (Anduril ENOBUFS — retried with `content=false`) |
| Added to pipeline | ✅ |
| Scan-history updated | ✅ |

**Note:** Yesterday's scout run (2026-05-11) wrote its report but did not persist to scan-history.tsv. Two of today's matches (Anthropic Staff+ Privacy, Temporal Compute) were also in yesterday's report. Both are now deduped and in history.

---

## New Matches

### 1. ⭐ Temporal — Senior Software Engineer, Compute (Temporal Cloud)
- **URL:** https://job-boards.greenhouse.io/temporaltechnologies/jobs/5133728007
- **Location:** United States — Remote
- **Why:** Cloud compute infrastructure for Temporal's managed service. Distributed systems, multi-tenant orchestration, Go + Kubernetes. Fully remote US. Patrick runs Argo/Airflow at scale — direct domain overlap. High priority.
- **Action:** Evaluate immediately

### 2. ⭐ Anthropic — Senior Staff Software Engineer
- **URL:** https://job-boards.greenhouse.io/anthropic/jobs/5204401008
- **Location:** San Francisco, CA | New York City, NY | Seattle, WA
- **Why:** Senior Staff level at a dream-tier AI lab. Multi-location posting — SF and Seattle are outright accepted; NYC only as part of a multi-location posting. Requires relocation or strong remote case. Top-tier opportunity if the role scope matches infrastructure.
- **Action:** Evaluate — check if scope is infra/platform or product-specific

### 3. Anthropic — Staff+ Software Engineer, Privacy
- **URL:** https://job-boards.greenhouse.io/anthropic/jobs/5159146008
- **Location:** San Francisco, CA | New York City, NY | Seattle, WA
- **Why:** Staff+ privacy engineering at Anthropic. Privacy-aware infrastructure, compliance systems, data handling at scale. High-prestige role at a dream company. Same multi-location caveat as above.
- **Action:** Evaluate — also noted in 2026-05-11 report, now properly tracked in history

### 4. Anduril — Senior Software Engineer (Fort Collins, CO)
- **URL:** https://boards.greenhouse.io/andurilindustries/jobs/5135694007?gh_jid=5135694007
- **Location:** Fort Collins, Colorado (~65 miles from Denver)
- **Why:** Anduril's Colorado presence is expanding. Senior role with defense tech moat. On-site commute from Denver is long but possible. Dream company for hardware moat + mission-driven work.
- **Action:** Evaluate if role is infrastructure/platform; flag commute distance

### 5. Anduril — Software Engineer, Air Defense (Broomfield, CO)
- **URL:** https://boards.greenhouse.io/andurilindustries/jobs/5134169007?gh_jid=5134169007
- **Location:** Broomfield, Colorado (Denver metro)
- **Why:** Air Defense software in the Denver metro. Anduril dream-tier. Title is "Software Engineer" without a seniority prefix — may be mid-level. Verify seniority before evaluating.
- **Action:** Check seniority / scope before evaluating

### 6. Vercel — Software Engineer, Next.js
- **URL:** https://job-boards.greenhouse.io/vercel/jobs/5993753004
- **Location:** Hybrid — San Francisco
- **Why:** Hybrid SF role, not remote. Patrick is Denver-based so this requires either SF relocation or a very flexible hybrid policy. Vercel is strong brand and relevant stack. Lower priority unless Vercel is known to be flexible with hybrid attendance.
- **Action:** Low priority — verify hybrid flexibility first

---

## False Positives Filtered

| Job | Reason |
|-----|--------|
| Glean — Software Engineer, University Grad (SF) | "University Grad" = entry-level hiring track. Title filter didn't catch "University Grad" as a negative. Flagged in pipeline.md. Skip. |

---

## Companies with No New Matches (41 scanned)

PolyAI, Parloa, Intercom, Hume AI, Airtable, Arize AI, RunPod, Glean,
Speechmatics, Black Forest Labs, Helsing, Celonis, Contentful, GetYourGuide,
HelloFresh, N26, Trade Republic, SumUp, Scandit, Wayve, Isomorphic Labs, PhysicsX,
Stability AI, Amplemarket, Samsara, Chainguard, Rocket Lab, Vast, Aurora Innovation,
Nuro, Zipline, Figure AI, Planet Labs, Scale AI, Databricks, ClickHouse, Fivetran, Dagster

## Failed / Skipped Companies

| Company | Reason |
|---------|--------|
| Anduril | ENOBUFS on main run (1,918 jobs = too large for curl spawn buffer); retried with `content=false` — caught 2 new Colorado matches |
| Neon | Greenhouse board 404 (acquired by Databricks, moved) |
| Shield AI | Moved to Lever |
| Confluent | Moved to Ashby |
| Snowflake | Moved to Ashby |
| Prefect | Moved to Ashby |
| Hermeus | Moved to Lever |
| Joby Aviation | Moved to iCIMS |
| Archer Aviation | Greenhouse board 404 |
| Skydio | Greenhouse board 404 |
| Hadrian | Moved to own careers page |

---

*Generated by career-ops scout agent · https://github.com/kcirtapfromspace/career-ops*
