# Scout Quick-Check — 2026-09-01

**Type:** Greenhouse API quick-check (no WebSearch)
**Companies checked:** 41
**New matches:** 4
**Scanned against:** 29,200+ history entries

---

## New Matches

### Anthropic (Dream Company ★)

| # | Role | Location | URL |
|---|------|----------|-----|
| 1 | Engineering Manager, Inference Infrastructure | SF / NYC / Seattle | https://job-boards.greenhouse.io/anthropic/jobs/5411560008 |
| 2 | Engineering Manager, Scheduler and Fleet Efficiency | SF / NYC | https://job-boards.greenhouse.io/anthropic/jobs/5411267008 |

**Notes:** Two EM roles at Anthropic — inference infra and scheduler/fleet efficiency. Both sit at the heart of LLM serving reliability and performance. Strong alignment with Patrick's background in distributed systems, k8s/Argo orchestration, and observability. Anthropic is a dream company. **Recommend prioritizing evaluation.**

### Zipline (Remote US)

| # | Role | Location | URL |
|---|------|----------|-----|
| 3 | Staff Software Engineer, Healthcare — Customer Experience | Remote US / EMEA | https://www.zipline.com/open-roles?gh_jid=7983305003 |
| 4 | Staff Software Engineer, Healthcare — Systems & Integrations | Remote US / EMEA | https://www.zipline.com/open-roles?gh_jid=7983316003 |

**Notes:** New healthcare vertical at Zipline (drone delivery). Both are Staff-level, remote US. Domain is customer experience and systems integration rather than core platform/ML infra. Evaluate for fit before prioritizing.

---

## API Status

| Company | Status | Note |
|---------|--------|------|
| Anduril | ⚠️ Timeout | Retry recommended |
| PolyAI | ❌ Fetch failed | EU subdomain (`boards-api.eu.greenhouse.io`) unreachable |
| Parloa | ❌ Fetch failed | EU subdomain unreachable |
| Temporal | ❌ 404 | Likely ATS migration away from Greenhouse |
| Black Forest Labs | ❌ 404 | Likely ATS migration |
| ClickHouse | ❌ 404 | Was working 2026-08-31 — investigate |
| Aurora Innovation | ❌ 404 | Likely ATS migration |

**Action items:**
- Update `portals.yml` for ClickHouse, Temporal, Black Forest Labs, Aurora if they've migrated ATS
- Fix EU Greenhouse subdomain fetch (may need HTTPS proxy config)
- Retry Anduril in next full scan

---

## Stats

| Metric | Count |
|--------|-------|
| Total companies | 41 |
| APIs succeeded | 34 |
| APIs failed | 7 |
| Jobs fetched | ~5,500+ |
| Skipped (title) | 4,619 |
| Skipped (location) | 562 |
| Skipped (dedup) | 363 |
| New matches | **4** |
