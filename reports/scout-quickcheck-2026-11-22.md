# Scout Quick-Check — 2026-11-22

**Run type:** Greenhouse API scan + Ashby/WebSearch for select companies
**Companies scanned:** 19 (Anthropic, Anduril, True Anomaly, Scale AI, Chainguard, Samsara, Figure AI, Rocket Lab, Temporal, Databricks, Vercel, Glean, Fivetran/dbt Labs, Arize AI, OpenAI, Cohere, W&B, Modal, Dagster/Prefect)
**New roles found:** 2
**API errors / empty boards:** Dagster (merged into Prefect, board empty), Prefect Ashby (empty), Modal Ashby (empty), W&B Lever role 404 (removed)

---

## New Pipeline Additions (2)

### Anthropic (1)

- **[Principal Engineer, Capacity/Compute](https://job-boards.greenhouse.io/anthropic/jobs/5490974008)** — San Francisco, CA (hybrid, on-site 3-4x/week)

  **Score: 4.0/5**

  Strong archetype match: data platform + observability + K8s at scale. The role sits at the intersection of data engineering (BigQuery pipelines, telemetry normalization across cloud providers), platform engineering (K8s operations, cluster health tooling, occupancy alerting), and financial attribution (CSP billing reconciliation, spend attribution). Patrick's profile aligns well: Kubernetes-native orchestration, Four Golden Signals / DORA observability culture, CDC pipelines (Postgres → Kafka → dbt/DuckDB), and federal-scale data systems. The "data platform" and "efficiency instrumentation" tracks are near-perfect CV matches. 

  **Comp:** $320K–$485K base + equity (pre-disclosure numbers from Levels.fyi; Anthropic doesn't post base publicly but this range is well above $185K minimum)
  **Location:** SF on-site 3-4x/week — SF is on Patrick's relocate_ok list
  **Tech:** K8s, BigQuery, Prometheus/PromQL/Grafana, Python, cloud ops (AWS/GCP multi-cloud)
  **Risk:** Strong on-site expectation (3-4x/week SF relocation). "Principal" may be leveled above what's reflected in the JD — could land as Staff. No Rust/Go requirement, but Python-heavy.

---

### OpenAI (1)

- **[Principal Software Engineer, B2B Engineering](https://openai.com/careers/principal-software-engineer-b2b-engineering-us-remote/)** — US Remote

  **Score: 3.8/5**

  B2B platform engineering (API infra, enterprise integrations, distributed systems). Ashby ID: `aeff784b-ea9a-40c9-aa13-6cb0b5e362cc`. Originally posted March 2026, resurfaced ~Nov 14 — may indicate a re-open or difficulty filling. Patrick's distributed systems background (Kafka, Kubernetes, multi-cluster workflows), Go/Rust stack, and observability depth are strong matches. API-centric B2B work is adjacent but not the core data/ML platform archetype. Fully remote is ideal.

  **Comp:** $385K–$490K + equity (OpenAI discloses ranges on the posting per Levels.fyi)
  **Location:** US Remote ✓
  **Tech:** Python, Go, Rust, TypeScript; distributed systems; API design at scale
  **Risk:** Role has been open since March 2026 (8 months) — possibly very high bar or niche requirement. B2B focus is less aligned with Patrick's data/ML platform archetype than the Anthropic role. Repost may mean active hiring or may be stale.

---

## Already in Pipeline (do not re-add)

These were added 2026-11-21 and are already tracked:

| Company | Role | Pipeline Date |
|---------|------|--------------|
| Anthropic | Engineering Manager, Privacy Infrastructure (5490122008) | 2026-11-21 |
| Anthropic | Staff+ Software Engineer, Capacity Engineering (5490979008) | 2026-11-21 |
| Stability AI | Staff Software Engineer, Data (5018185101) | 2026-11-21 |
| Anduril | 11 Colorado/Denver roles | 2026-11-21 |
| Rocket Lab | 7 Littleton, CO roles | 2026-11-21 |

---

## Scan Coverage Summary

| Company | Method | Jobs Seen | New (count=0) | Notes |
|---------|--------|-----------|----------------|-------|
| Anthropic | Greenhouse API | ~50 | 1 | 5490974008 (new) |
| Anduril | Greenhouse API | ~400 | 0 | All already in history |
| True Anomaly | Greenhouse API | ~20 | 0 | All already in history |
| Scale AI | Greenhouse API | ~100 | 0 | All already in history |
| Chainguard | Greenhouse API | — | 0 | Checked 2026-11-21 |
| Samsara | Greenhouse API | — | 0 | Checked 2026-11-21 |
| Figure AI | Greenhouse API | — | 0 | Checked 2026-11-21 |
| Rocket Lab | Greenhouse API | — | 0 | All already in history |
| Temporal | temporal.io/careers UUID | 92 | 0 | Last new from 2026-11-20 |
| Databricks | Greenhouse API | 895 | 0 | Spot-checked; all in history |
| Vercel | Greenhouse API | 86 | 0 | All already in history |
| Glean | Greenhouse API | 129 | 0 | 4 new Solutions Engr (pre-sales, skip) |
| Fivetran/dbt Labs | Greenhouse API | 196 | 0 | All already in history |
| Arize AI | Greenhouse API | 20 | 0 | 1 new PM role (filtered out) |
| OpenAI | Ashby / WebSearch | — | 1 | B2B Principal SWE |
| Cohere | WebSearch | — | 0 | No new roles |
| W&B | Lever | — | 0 | Candidate role returned 404 |
| Modal | Ashby | — | 0 | Board empty |
| Dagster/Prefect | Greenhouse/Ashby | — | 0 | Boards empty (merger) |
