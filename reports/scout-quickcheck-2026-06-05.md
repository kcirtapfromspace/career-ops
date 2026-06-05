# Scout Quick-Check — 2026-06-05

**Date:** 2026-06-05  
**Scan type:** Full portal scan (Greenhouse API + WebSearch + HN Who's Hiring June 2026)  
**Sources scanned:** 45 Greenhouse API boards, 4 WebSearch queries, HN Who's Hiring June 2026 thread  
**Jobs reviewed:** ~3,200+  
**New matches added:** 3  
**Skipped (already in history):** 50+  
**Skipped (location blocker):** 12  
**Skipped (title/seniority mismatch):** 15+

---

## New Matches Added to Pipeline

### ★ 4.2/5 — Armis Security | Senior Staff Data Infrastructure Engineer (FedRAMP)

- **URL:** https://job-boards.greenhouse.io/armissecurity/jobs/5995276004
- **Location:** US Remote (US Citizenship required — strict FedRAMP)
- **Comp:** $200,000–$220,000 + bonus + equity
- **Stack:** PostgreSQL, Kafka, Kubernetes, Terraform/Helm, AWS (GovCloud), MongoDB, service mesh (Istio)
- **Why it scored:** FedRAMP/GovCloud experience is a sought-after differentiator; Patrick's HHS/VA.gov federal background makes him a rare fit vs. typical startup candidates. Stack is an exact match (Kafka+CDC+Postgres+K8s+Terraform). Senior Staff level with comp firmly in target range.
- **Risk:** Cybersecurity domain is adjacent; some big data frameworks (Spark, EMR, Hive, Trino) listed as nice-to-haves Patrick hasn't used at scale.

---

### ★ 3.9/5 — Temporal | Staff Cloud Security Engineer

- **URL:** https://job-boards.greenhouse.io/temporaltechnologies/jobs/5151694007
- **Location:** United States - Remote
- **Comp:** $225,000–$275,000
- **Stack:** Multi-cloud (AWS, GCP, Azure), secrets management, threat modeling, IAM, distributed systems security
- **Why it scored:** Temporal is already in Patrick's pipeline for multiple data/infra roles. This security-focused Staff role overlaps with his auth infrastructure experience (Vault, KMS, OAuth/OIDC, RBAC/ABAC). Comp ceiling at $275K is above target. Remote US confirmed.
- **Risk:** Security engineering is not Patrick's primary identity — he's a data/platform engineer who does security well, not a dedicated cloud security specialist. May be outcompeted by pure security backgrounds.

---

### ★ 3.7/5 — Anthropic | Engineering Manager - Privacy Infrastructure

- **URL:** https://job-boards.greenhouse.io/anthropic/jobs/5227810008
- **Location:** San Francisco, CA | Seattle, WA (hybrid — relocation required from Denver)
- **Comp:** $405,000–$485,000
- **Stack:** Privacy-preserving AI architectures, data governance/lifecycle systems, distributed systems, compliance automation
- **Why it scored:** Exceptional comp; Patrick already applied to Anthropic EM Safeguards Data Infrastructure (report 005). Privacy engineering EM at the same org is a strong secondary option. Seattle is acceptable per location policy.
- **Risk:** Requires relocation to SF or Seattle; Patrick already has an active application at Anthropic — dual-applying may complicate pipeline. Privacy engineering is adjacent (not core) to his data/platform archetype. SF/Seattle hybrid is not Denver-remote-friendly.

---

## Notable Skips

### Location Blockers

| Company | Role | Location | Note |
|---------|------|----------|------|
| Amplitude | Senior Platform Engineer (Cloud Platform) | San Francisco hybrid | Greenhouse ID 8541556002 |
| ClickHouse | Senior Software Engineer - AI/ML (Canada) | Canada (remote) | ID 6009094004 |
| ClickHouse | Senior Software Engineer - Postgres (EU) | India/Netherlands/Spain/UK | Multiple EU/Asia IDs |
| Fivetran | Staff DevOps Engineer | Novi Sad, Serbia | ID 7747624003 |
| Anthropic | Senior Staff+ Software Engineer, Kubernetes Platform | London, UK | ID 5211305008 |
| Trade Republic | Senior Kafka Platform Engineer | Berlin | Already in history |
| Intercom | Senior Engineer, Infrastructure Platform | London, England | ID 7982419 |

### Already In Scan History (Dedup)

All previously surfaced matches from 2026-06-03 and 2026-06-04 scans were confirmed in scan-history.tsv:
- Samsara Staff ML Engineer ML Infrastructure (★4.5) — added 2026-06-03
- WandB Staff Software Engineer Metrics (★4.4) — added 2026-06-03
- RunPod EM Product & Platform (★4.2) — added 2026-06-03
- Fivetran Senior Staff Binary Log Data Replication (★4.1) — added 2026-06-03
- ClickHouse Senior Cloud Engineer 5994726004 (unscored) — added 2026-06-04
- MotherDuck Platform Infra + Backend (★4.0 each) — added 2026-06-04

### HN Who's Hiring June 2026 — Screened

Thread reviewed at https://news.ycombinator.com/item?id=48357725. Notable matches considered:

- **PostHog** — Backend + ClickHouse Ops Engineer: GMT-8 to GMT+2 timezone restriction for remote; likely blocks US Pacific time zones partially. Board returned 0 jobs via API.
- **Runway** — Engineering Manager (API): Remote global, but Runway board returned 0 via Greenhouse API; role not confirmed active.
- **Seeq** — Staff Software Engineers (Platform, DevEx): $170K + bonus + equity; JVM/React stack, not Patrick's primary stack; below comp target.
- **Xata** — Backend Engineer (Go, Rust, K8s, PostgreSQL): Remote (Europe/East Coast US). Timezone restriction partially blocks; early-stage, comp not disclosed.
- **Piramidal** — Senior Backend/Infra Engineers: NYC on-site; location blocker.

---

## Boards With Zero New Engineering Matches

Boards scanned with no new relevant results (all matches already in history or failed title/location filters):

Glean, Dagster, Samsara (only non-eng new), Hume AI, Arize AI, Contentful (EU only), HelloFresh (EU), N26 (EU), Trade Republic (EU), Vast (EU locations), Rocket Lab (hardware), Planet Labs (already in history), Wayve (Sunnyvale), Figure AI (Sunnyvale), Amplemarket (no postings), Stability AI (researchers only), Scandit (Zurich), Isomorphic Labs (London), PhysicsX (London), Black Forest Labs (Berlin), Helsing (EU), GetYourGuide (EU), SumUp (EU), Celonis (no US eng), Scale AI (no new US eng), Vercel (no new eng), Intercom (EU/SF only new).

---

## Cumulative Pipeline Summary (Top Unactioned Matches)

As of 2026-06-05, highest-priority unactioned items in pipeline:

| Score | Company | Role | Date Added |
|-------|---------|------|------------|
| ★4.8 | Temporal | Staff Software Engineer, Observability | 2026-05-29 |
| ★4.7 | Temporal | Senior Staff Software Engineer, Infrastructure | 2026-05-29 |
| ★4.5 | Temporal | Staff Software Engineer, Infrastructure Foundations | 2026-05-29 |
| ★4.5 | Arize AI | Engineering Manager, Product & Platform | 2026-05-29 |
| ★4.5 | Samsara | Staff ML Engineer, ML Infrastructure | 2026-06-03 |
| ★4.4 | WandB | Staff Software Engineer, Metrics | 2026-06-03 |
| ★4.2 | Armis Security | Senior Staff Data Infrastructure Engineer | 2026-06-05 (NEW) |
| ★4.2 | RunPod | Engineering Manager, Product & Platform | 2026-06-03 |
| ★4.1 | Fivetran | Senior Staff SE, Binary Log Data Replication | 2026-06-03 |

**Recommendation:** Prioritize the 4.5+ Temporal roles and Samsara/WandB before they close. Armis Security's FedRAMP angle is a unique differentiator worth a fast application.
