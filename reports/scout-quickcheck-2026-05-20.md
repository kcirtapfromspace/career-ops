# Scout Quick-Check — 2026-05-20

**Type:** Greenhouse API-only scan (no WebSearch)
**Companies checked:** 47 (all `api:` + `enabled: true` from portals.yml)
**Total jobs scanned:** 5,434
**New matches (post-dedup):** 4
**Scan duration:** ~60s

---

## New Matches

### 1. Chainguard — Senior Software Engineer (Guarded OS)
- **URL:** https://job-boards.greenhouse.io/chainguard/jobs/4679658006
- **Location:** United States — Remote
- **Why relevant:** K8s/containers security stack. Chainguard builds hardened OS images; this role is infra-adjacent. Full remote US.

### 2. Aurora Innovation — Senior Staff Software Engineer (Security)
- **URL:** https://aurora.tech/jobs/8557492002?gh_jid=8557492002
- **Location:** Seattle, Washington
- **Why relevant:** Senior Staff level at a self-driving truck company with a Denver office. Security eng at autonomous vehicle scale. Patrick's distributed systems background applicable.

### 3. Aurora Innovation — Software Engineer II (Security)
- **URL:** https://aurora.tech/jobs/8557484002?gh_jid=8557484002
- **Location:** Seattle, Washington
- **Why relevant:** Same team as above, lower level. Likely IC2 — may be underleveled for Patrick. Flag for review.

### 4. Zipline — Staff Full Stack Software Engineer, Application Software
- **URL:** https://www.zipline.com/careers?gh_jid=7741834003
- **Location:** South San Francisco, California
- **Why relevant:** Staff-level at a drone delivery company with hardware moat (medical + retail). Application software team. On-site in South SF.

---

## API Errors / Skipped

None — all 47 endpoints responded successfully.

---

## Pipeline Status

All 4 new URLs added to:
- `data/pipeline.md` → `### Quick-Check Scan (2026-05-20)`
- `data/scan-history.tsv` → dedup logged

**Next step:** Evaluate top matches with `/career-ops oferta` before applying.

---

## Second Scan — 2026-05-20 (scout agent)

**Companies checked:** 42 · **New matches (post-dedup):** 8

### 5. Anthropic — Research Engineer, Economic Research Data Platform
- **URL:** https://job-boards.greenhouse.io/anthropic/jobs/5071132008
- **Location:** San Francisco, CA
- **Why relevant:** "Data Platform" in title. Research engineering at Anthropic focused on economic impact studies. SF-based. Strong signal if Patrick wants to stay in AI infra/data platform work at a top lab.

### 6. Helsing — Finance Data Engineer
- **URL:** https://helsing.ai/jobs/4871604101?gh_jid=4871604101
- **Location:** Munich, Germany
- **Why relevant:** Data Engineer at a defense AI unicorn (100+ roles, ML & FDE). EU location — relevant if DACH is in scope.

### 7. Scandit — Engineering Manager, Platform
- **URL:** https://www.scandit.com/careers/job-description/?gh_jid=7563160
- **Location:** Germany (Zurich CH parent, Germany office)
- **Why relevant:** EM for platform at a computer vision / smart data capture company. EU/DACH scope.

### 8. Aurora Innovation — Senior Staff Software Engineer (Security) ⚠️ possible dupe
- **URL:** https://aurora.tech/jobs/8555472002?gh_jid=8555472002
- **Location:** Mountain View, California
- **Note:** Different Greenhouse job ID from the Seattle-based Senior Staff Security role found in scan 1 (8557492002). May be the same role reposted for a different office, or a separate headcount. Flag for manual review before applying.

### 9. Aurora Innovation — Software Engineer II (Security) ⚠️ likely underleveled
- **URL:** https://aurora.tech/jobs/8555225002?gh_jid=8555225002
- **Location:** Mountain View, California
- **Note:** IC2 level. Probably underleveled for Patrick. Captured for completeness.

### 10. Wayve — Application Software Engineer (Germany) ⚠️ relocation
- **URL:** https://wayve.firststage.co/jobs?gh_jid=8431122002
- **Location:** Germany → **Relocation to Tokyo required on two of these postings**
- **Note:** Three Wayve roles surfaced (8431122002, 8460271002, 8478640002). Two explicitly require relocation to Tokyo — likely rejects. The base role may be Germany-remote but verify before queueing.

---

## Running Totals (2026-05-20)

| Scan | Matches | Notable |
|------|---------|---------|
| Scan 1 (automated) | 4 | Chainguard Remote, Aurora Seattle, Zipline SF |
| Scan 2 (scout agent) | 8 | Anthropic SF data platform, Helsing Munich, Scandit EM |
| **Total new today** | **12** | After dedup against 1,875-entry history |
