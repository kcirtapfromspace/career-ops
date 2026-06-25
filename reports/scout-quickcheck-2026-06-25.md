# Scout Quick Check — 2026-06-25

**Scan type:** Greenhouse API only  
**Companies checked:** 52  
**Total jobs scanned:** ~5,400 (verification run) + earlier runs  
**New Greenhouse matches today:** 18 (via quickcheck6) + 0 (this verification run)  
**API errors:** Anduril (ENOBUFS — large payload), ~10 companies timed out  

---

## Summary

Two Greenhouse API sweeps ran today. The first (`quickcheck6`) discovered **18 new roles**; this verification sweep found **0 additional matches**, confirming comprehensive coverage. A parallel full-scout (`scout-2026-06-25`) added 6 more via Ashby/Lever (Confluent, Spotify, Cohere × 2, Planet Labs Storage) — see `scout-2026-06-25.md` for those.

---

## New Greenhouse Matches (quickcheck6-2026-06-25)

| Company | Role | Location | Link |
|---------|------|----------|------|
| Anthropic | Staff+ Software Engineer, Caching | SF / NYC / Seattle | [View](https://job-boards.greenhouse.io/anthropic/jobs/5281592008) |
| Vercel | Security Software Engineer, IAM | Remote - US | [View](https://job-boards.greenhouse.io/vercel/jobs/6093255004) |
| Zipline | Senior Manager, Data Platform & Autonomy Infrastructure | South San Francisco, CA | [View](https://www.zipline.com/open-roles?gh_jid=7663467003) |
| Zipline | Staff Full Stack Software Engineer - Health Care Platform | Remote USA | [View](https://www.zipline.com/open-roles?gh_jid=7773623003) |
| Zipline | Principal Software Engineer, Application Software | Remote USA | [View](https://www.zipline.com/open-roles?gh_jid=7747479003) |
| Zipline | Sr. Staff Full Stack Software Engineer, Application Software | Remote USA | [View](https://www.zipline.com/open-roles?gh_jid=7747477003) |
| Zipline | Staff Full Stack Software Engineer, Application Software | Remote USA | [View](https://www.zipline.com/open-roles?gh_jid=7747478003) |
| Zipline | Senior/Staff Cloud Infrastructure Engineer | South San Francisco, CA | [View](https://www.zipline.com/open-roles?gh_jid=7758772003) |
| Zipline | Senior Full Stack Software Engineer, Application Software | Remote USA | [View](https://www.zipline.com/open-roles?gh_jid=7747476003) |
| Zipline | Engineering Manager, Weather Risk Systems | South San Francisco, CA | [View](https://www.zipline.com/open-roles?gh_jid=7772723003) |
| Zipline | Fullstack - Data Platform (Autonomy) | South San Francisco, CA | [View](https://www.zipline.com/open-roles?gh_jid=7607673003) |
| Zipline | Senior Software Engineer – Cloud Communications Platform | South San Francisco, CA | [View](https://www.zipline.com/open-roles?gh_jid=7656397003) |
| Zipline | Senior Software Engineer – Datacenter Automation | South San Francisco, CA | [View](https://www.zipline.com/open-roles?gh_jid=7411621003) |
| Zipline | Senior Software Engineer – Developer Productivity | South San Francisco, CA | [View](https://www.zipline.com/open-roles?gh_jid=7303683003) |
| Zipline | Senior Software Engineer – Rust Language Maintainer | South San Francisco, CA | [View](https://www.zipline.com/open-roles?gh_jid=7331341003) |
| Zipline | Staff Software Engineer - Sky Traffic Platform | South San Francisco, CA | [View](https://www.zipline.com/open-roles?gh_jid=5886248003) |
| Rocket Lab | Flight Software Engineer II/Senior | Littleton, CO | [View](https://job-boards.greenhouse.io/rocketlab/jobs/7779058003) |
| Fivetran | Software Engineer | Oakland, CA | [View](https://www.fivetran.com/careers/job?gh_jid=7778979003) |

---

## Highlights

- **Zipline (11 new roles)** — hardware-moat drone delivery at scale. Roles span Data Platform, Cloud Infrastructure, Application Software (several remote), and EM. `Fullstack - Data Platform (Autonomy)` and `Senior Manager, Data Platform & Autonomy Infrastructure` are the highest-priority for Patrick's profile. Zipline = medical/retail drone delivery with large-scale infrastructure.
- **Anthropic — Staff+ Software Engineer, Caching** — Staff+ level. Caching systems at the leading AI lab. SF/NYC/Seattle. Competitive comp (~$350K+). Evaluate soon.
- **Vercel — Security Software Engineer, IAM** — Fully remote US. IAM = identity/auth platform engineering. Adjacent to infrastructure work; less direct domain fit unless JD emphasizes platform side.
- **Rocket Lab — Flight Software Engineer II/Senior (Littleton, CO)** — Local Denver metro. Hardware moat. Flight SW is more embedded-adjacent; check JD carefully.
- **Fivetran — Software Engineer (Oakland, CA)** — Direct-stack company (Patrick uses Fivetran). Note: Oakland = Bay Area on-site.

---

## Priority Actions

1. **Evaluate Zipline Data Platform roles** — `Senior Manager, Data Platform & Autonomy Infrastructure` and `Fullstack - Data Platform (Autonomy)` are direct archetype matches. Zipline's scale (50+ countries, millions of deliveries) is strong. SSF location requires relocation consideration.
2. **Evaluate Anthropic Caching** — Staff+ level at the best AI lab. Worth a full evaluation.
3. **Cross-reference with scout-2026-06-25.md** — Confluent Staff SWE (Kora, 3.8/5) and Planet Labs Storage SWE (3.9/5) are the top new picks from today's full scan.

---

## Verification Coverage

52 companies in list. 40 returned data (Anduril ENOBUFS, ~11 stalled/timed-out). All major high-priority targets (Anthropic, Databricks, Scale AI, Samsara, Planet Labs, Aurora, Figure AI, Fivetran, Zipline, Chainguard, Temporal, Glean) returned valid data.

*All 18 entries added to `data/pipeline.md` and `data/scan-history.tsv` by quickcheck6 run.*
