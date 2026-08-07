# Scout Quick Check — 2026-08-07

**Run type:** Greenhouse API quick check (41 companies)  
**Jobs scanned:** ~6,895 (across 40 responsive boards)  
**Seen URLs in history (pre-run):** 20,393  
**History lines appended:** 459  
**New matches added to pipeline:** 4  
**Errors:** Aurora Innovation (404 — still migrated to Ashby), Dagster (0 open roles)

---

## New Jobs Added to Pipeline

### 1. Anduril — Applied LLM Systems Engineer
- **URL:** https://boards.greenhouse.io/andurilindustries/jobs/5197253007?gh_jid=5197253007
- **Location:** Costa Mesa, California (Anduril HQ campus)
- **Notes:** LLM systems engineering at Anduril's primary campus. Dream company match. Applied AI in a defense/autonomy context. Costa Mesa is Anduril's main office — evaluate relocation appetite and comp before applying.

### 2. Anduril — Senior Software Engineer, Video
- **URL:** https://boards.greenhouse.io/andurilindustries/jobs/5206580007?gh_jid=5206580007
- **Location:** Seattle, Washington
- **Notes:** Senior SWE on video/sensor data pipeline at Anduril's Seattle office. Seattle is an accepted city. Dream company + hardware moat. Evaluate scope and tech stack.

### 3. Databricks — Staff Software Engineer, Access Management
- **URL:** https://databricks.com/company/careers/open-positions/job?gh_jid=8691490002
- **Location:** Bellevue, Washington (Seattle metro)
- **Notes:** Staff IC role in identity/access management systems. Bellevue is Seattle metro — accepted location. $43B company with strong Staff IC career track. Evaluate authz-domain fit vs Patrick's data platform background.

### 4. Nuro — Staff/Lead Machine Learning Engineer, Behavior & Planning
- **URL:** https://nuro.ai/careersitem?gh_jid=8114754
- **Location:** Mountain View, California (HQ)
- **Notes:** Staff/Lead ML on autonomous vehicle behavior and planning stack. Mountain View (Bay Area). Hardware moat company. Role requires deep AV/robotics ML experience — evaluate domain fit and comp expectations.

---

## Location-Filtered (not added to pipeline)

These passed the title filter but fall outside accepted location criteria:

| Company | Role | Location | Reason |
|---------|------|----------|--------|
| Anduril | Senior Deployed Software Engineer | Lexington, MA | Not US Remote / accepted city — Anduril East Coast defense hub. Manual review if interested in relocation. |
| Anduril | Senior Mission Software Engineer | Lexington, MA | Same — Lexington MA defense hub, not in accepted city list. |

---

## False Positives (script location filter miss, logged to history, not added to pipeline)

| Company | Role | Location | Reason |
|---------|------|----------|--------|
| SumUp | Senior Software Engineer (Golang) — Payments Experience | Sofia, Bulgaria | Non-US, non-remote. Location filter missed it (Bulgaria not in reject list). |
| Databricks | Field Engineering Manager — Specialist Solutions Architects, Nordics | Denmark / Sweden | European-only role. Location filter missed it (Denmark/Sweden not in reject list). |

Both logged to `scan-history.tsv` — will be deduplicated in future runs.

---

## Errors / Gaps

| Company | Status | Notes |
|---------|--------|-------|
| Aurora Innovation | **404** | Greenhouse board still gone — migrated to Ashby. Not covered by this quickcheck. |
| Dagster | **0 jobs** | Board returned empty. Continued from 2026-08-06. |
| RunPod | **disabled** | `enabled: false` in portals.yml (board was 404). |

---

## Companies with 0 New Matches (all previously seen)

Anthropic (387), PolyAI (15), Parloa (59), Intercom (122), Hume AI (5), Airtable (38), Vercel (82), Temporal (54), Arize AI (29), Glean (104), Speechmatics (12), Black Forest Labs (12), Helsing (140), Celonis (258), Contentful (27), GetYourGuide (53), HelloFresh (340), N26 (91), Trade Republic (46), Scandit (15), Wayve (106), Isomorphic Labs (25), PhysicsX (41), Stability AI (5), Amplemarket (13), Fivetran (199), Samsara (288), Chainguard (80), Scale AI (214), Clickhouse (166), Zipline (265), Figure AI (128), Planet Labs (79), Rocket Lab (400), Vast (168).
