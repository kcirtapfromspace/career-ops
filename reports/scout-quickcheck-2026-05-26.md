# Scout Quick-Check — 2026-05-26

**Scan type:** Greenhouse API only (no WebSearch)  
**Previous quick-check:** 2026-05-22  
**Companies scanned:** 42 (all `api: + enabled: true` entries in portals.yml)  
**Total jobs reviewed:** ~4,773  
**New matches:** 6

---

## New Matches (6 jobs)

| # | Company | Role | Location | Priority | URL |
|---|---------|------|----------|----------|-----|
| 1 | Anthropic | Data Engineering Manager, GTM & Marketing | SF / NYC / Seattle | ⭐ High | https://job-boards.greenhouse.io/anthropic/jobs/5229976008 |
| 2 | Anduril | Staff Software Engineer, Production Solutions | Seattle, WA | ⭐ High | https://boards.greenhouse.io/andurilindustries/jobs/5144187007?gh_jid=5144187007 |
| 3 | Samsara | Staff Software Engineer | Remote - CA | ⭐ High | https://www.samsara.com/company/careers/roles/7752678?gh_jid=7752678 |
| 4 | Anduril | Radar Software Engineer | Broomfield / Fort Collins, CO | Mid | https://boards.greenhouse.io/andurilindustries/jobs/5143589007?gh_jid=5143589007 |
| 5 | Anthropic | Technical Program Manager, Data Center Infrastructure | SF / NYC / Seattle | Mid (TPM) | https://job-boards.greenhouse.io/anthropic/jobs/5013743008 |
| 6 | Anduril | Early Career Software Engineer | Broomfield / Costa Mesa / Fort Collins | ⚠️ Skip | https://boards.greenhouse.io/andurilindustries/jobs/4802146007?gh_jid=4802146007 |

All 6 URLs appended to `data/pipeline.md` → `### Quick-Check Scan (2026-05-26)`.

---

## Match Notes

**#1 — Anthropic: Data Engineering Manager, GTM & Marketing**  
Engineering manager for data engineering supporting GTM & Marketing. Direct match for Patrick's profile (data engineering leadership + AI company). SF/NYC/Seattle — SF and Seattle are ACCEPT cities. Strong fit.

**#2 — Anduril: Staff Software Engineer, Production Solutions**  
Staff-level SWE in Production Solutions at Anduril (defense tech dream company). Seattle location = ACCEPT. Production/reliability angle aligns with Patrick's platform background.

**#3 — Samsara: Staff Software Engineer**  
Staff SWE at Samsara (IoT + AI fleet data platform). Remote - CA. Generic title but Staff-level at a data-heavy company with large-scale infrastructure. Worth evaluating.

**#4 — Anduril: Radar Software Engineer**  
Software engineer on radar systems. Denver metro (Broomfield/Fort Collins) — ACCEPT. "Radar" is hardware-adjacent, may or may not match Patrick's background. Borderline but in-scope by title filter.

**#5 — Anthropic: Technical Program Manager, Data Center Infrastructure**  
TPM role, not a pure engineering role. Matched on "manager, data" substring in title. Data center infrastructure at Anthropic is high-value context, but TPM is a different track. Patrick should decide.

**⚠️ #6 — Anduril: Early Career Software Engineer**  
False positive — "Early Career" is not in the negative keyword list (only "Junior" and "Intern" are). This role should be skipped. Logged in pipeline.md for visibility but recommend **SKIP**.

---

## Coverage Notes

- **Dagster:** API returns `[]` (stale slug post-Databricks acquisition).
- **EU companies (Parloa, Speechmatics, Wayve, PhysicsX, Helsing, Black Forest Labs, Isomorphic Labs, N26, Trade Republic, SumUp, GetYourGuide, HelloFresh, Scandit):** All engineering roles in EU offices only, no US/Remote matches.
- **Vercel, Temporal, Arize AI, Chainguard, ClickHouse, Contentful, Databricks, Fivetran, Scale AI, Aurora, Nuro, Zipline, Figure AI, Planet Labs, Rocket Lab:** All title-matching roles already in scan history from prior scans.
- **Hume AI:** Only "Senior Platform Engineer" (NYC in-office — remote-only rule).
- **PolyAI / Parloa / Intercom:** EMEA-only openings.
- **Stability AI, Amplemarket, RunPod, Glean:** No new roles beyond what's already tracked.

---

## Filter Improvement Suggestion

Add `"early career"` to the `NEGATIVE_KEYWORDS` list in `quickcheck-scan.mjs` to prevent recurrence of false positive #6.
