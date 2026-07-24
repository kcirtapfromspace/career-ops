# Scout Quick-Check — 2026-07-24 (3rd pass)

**Scan type:** Greenhouse API quick-check (42 endpoints)
**Date:** 2026-07-24
**History entries at scan time:** 19,961
**API errors:** RunPod (404 — stale slug, ongoing); Databricks (response truncated, some roles may be missing); Zipline (possible truncation)
**New matches added:** 21

---

## Summary

21 new jobs surfaced in the 3rd pass of the day — heavy Isomorphic Labs batch (4 new London roles, DeepMind drug-discovery spinout), 5 PhysicsX roles (principal ML infra + SF ML engineer), and 3 new Fivetran roles including a **Remote Colorado Platform SWE** (highest-priority match of this pass). Databricks added Principal AI/ML Infrastructure (SF) and an SRE (US remote).

---

## Top Picks (4 roles)

| Company | Title | Location | Score | Notes |
|---------|-------|----------|-------|-------|
| Fivetran | Senior Platform Software Engineer, Transport | Remote, Colorado | 4.5 | Dream match — local company + exact platform domain + home turf location |
| Databricks | Principal Engineer, AI/ML Infrastructure | San Francisco, CA | 4.3 | Dream company, principal-level, AI/ML infra |
| Chainguard | Senior Software Engineer, Developer Platform | United States - Remote | 4.2 | US Remote, K8s/containers/Argo = Patrick's stack |
| Databricks | Site Reliability Engineer | United States | 4.0 | Dream company, SRE, US remote likely |

---

## Strong Picks (4 roles)

| Company | Title | Location | Score | Notes |
|---------|-------|----------|-------|-------|
| PhysicsX | Machine Learning Engineer | San Francisco, CA | 3.8 | Physics-informed ML for engineering, SF presence |
| Fivetran | Principal Software Engineer - Data Lakes | Remote, Germany | 3.8 | Principal-level, data lakes domain, EU remote |
| PhysicsX | Principal ML Infrastructure Engineer | London | 3.7 | Principal-level ML infra, London |
| Isomorphic Labs | Senior SWE (Inference Platform) | London | 3.7 | DeepMind spinout, senior inference platform |

---

## Contextual Picks (13 roles)

| Company | Title | Location | Score |
|---------|-------|----------|-------|
| Scale AI | AI Infrastructure Engineer, Serving Platform | London | 3.6 |
| N26 | Engineering Manager, Runtime Platform | Barcelona | 3.5 |
| N26 | Engineering Manager, Runtime Platform | Berlin | 3.5 |
| Wayve | Machine Learning Engineer | Germany | 3.4 |
| Isomorphic Labs | Software Engineer (Inference Platform) | London | 3.4 |
| Isomorphic Labs | Software Engineer (Data Services) | London | 3.3 |
| Wayve | Data Engineer | Germany | 3.3 |
| PhysicsX | Senior ML Software Engineer, Research | London | 3.3 |
| PhysicsX | Senior Simulation Data Engineer | London | 3.2 |
| PhysicsX | Software Engineer - Go & Python (Core Services) | London | 3.1 |
| SumUp | Data Engineer | Berlin | 3.0 |
| Isomorphic Labs | Security Engineering Manager | London/Lausanne | 2.8 |
| Fivetran | Senior Full Stack Engineer - Dev Productivity | Novi Sad, Serbia | 2.5 |

---

## API Issues

| Company | Status |
|---------|--------|
| RunPod | 404 — Greenhouse board stale, ongoing since previous scans |
| Databricks | Response truncated — many Senior SWE / Data Engineer / ML Engineer roles likely missed |
| Zipline | Possible truncation after `Senior R...` entries |
| Figure AI | 0 matches — all 122 roles are on-site (San Jose, LA, Reno, Asia), none in accepted location set |

---

## Notes

- **Fivetran Colorado remote** is the standout of this pass — Senior Platform SWE for Transport layer at a Denver-local company Patrick already knows well. Evaluate immediately.
- **Isomorphic Labs surge** (4 new roles): DeepMind spinout for AI drug discovery, London. All appeared this pass suggesting a new hiring push. Review the Inference Platform roles together.
- **PhysicsX** now has 5 open roles across London + SF. ML-heavy org applying AI to aerospace/energy/automotive simulation. Not a mainstream target but the Principal ML Infra (London) is worth a look.
- **Databricks truncation warning**: the API returned 200+ jobs and the fetching agent hit context limits. A dedicated Databricks check may surface additional Senior/Staff SWE, Data Engineer, or ML Platform roles not captured here.
