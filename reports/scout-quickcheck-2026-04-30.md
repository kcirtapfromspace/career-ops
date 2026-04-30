# Scout Quick-Check — 2026-04-30

**Method:** Greenhouse Boards API direct (42 companies)  
**Filter:** Title positive (SWE, Data Eng, Platform, Infra, ML, SRE, EM…) + location (US Remote / Denver / SF / Seattle / Los Gatos / Bend; NYC/Chicago remote-only)  
**Dedup:** 8,028 seen URLs (scan-history.tsv + pipeline.md)

---

## Results

| Company | Total Jobs | New Matches |
|---------|-----------|-------------|
| Anduril | 1,863 | **2** |
| All others (41 companies) | — | 0 |

**Total new matches: 2**

---

## New Entries Added to Pipeline

### Run 1 (morning)
| Company | Title | Location | URL |
|---------|-------|----------|-----|
| Anduril | C++ Mission Software Engineer, Mission Autonomy | Costa Mesa / Seattle / DC | [link](https://boards.greenhouse.io/andurilindustries/jobs/5125189007) |
| Anduril | Rust Software Engineer, Air Vehicle Autonomy | Costa Mesa / Seattle / DC | [link](https://boards.greenhouse.io/andurilindustries/jobs/5125172007) |

**Notes:** Both roles are multi-location including Seattle (accepted). C++ and Rust embedded/autonomy focus — high technical bar. Patrick has strong systems background but these are vehicle-software / mission autonomy roles, less data/platform. Flag for review before applying.

### Run 2 (agent quick-check, 2026-04-30)
| Company | Title | Location | URL |
|---------|-------|----------|-----|
| Anthropic | Staff Infrastructure Engineer, Cluster Infrastructure | SF / NYC / Seattle | [link](https://job-boards.greenhouse.io/anthropic/jobs/5206978008) |
| Chainguard | Principal Software Engineer (Containers) | US Remote | [link](https://job-boards.greenhouse.io/chainguard/jobs/4677727006) |

**Notes:**
- **Anthropic Staff Infra**: Cluster Infrastructure team — likely GPU/compute cluster work. Strong fit for Patrick's platform/infra background. SF or Seattle location.
- **Chainguard Principal SWE (Containers)**: K8s/containers supply chain security. US Remote. Matches Patrick's infra + distributed systems stack.
- Anduril dominates the Greenhouse feed (1,863 listings) — most are Costa Mesa on-site; Seattle-tagged roles are the signal.
- All other 41 companies: no new matches beyond what's already in pipeline.

---

## Script Fixes Applied This Session

- **URL normalization**: `?gh_jid=` query params stripped before dedup — was causing false positives on previously-seen Anduril simulation roles.
- **Location filter**: Removed over-broad `'united states'` accept term — was matching any US city. Now requires `'remote'`, specific city names, or multi-location strings containing accepted cities.
- **Dedup source**: `loadSeenUrls()` now reads URLs from `scan-history.tsv` column 0 (primary) + `pipeline.md` (secondary). Previously only read `pipeline.md`.
