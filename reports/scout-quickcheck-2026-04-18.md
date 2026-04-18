# Scout Quick-Check — 2026-04-18

**Method:** Greenhouse API direct (51 companies with `api:` field)  
**Scope:** Title + location filter applied (US Remote / Denver / SF / Los Gatos / Seattle / Bend)  
**Dedup:** Against scan-history.tsv (6,233 entries pre-scan)

---

## Summary

| Metric | Count |
|--------|-------|
| Companies scanned | 51 |
| API errors (404 / unreachable) | 11 |
| New job postings seen | 5,418 |
| Title+location matches | **4** |

---

## New Matches Added to Pipeline

| Company | Title | Location | URL |
|---------|-------|----------|-----|
| Databricks | Senior Software Engineer - Database Engine Internals | Mountain View, CA | [link](https://databricks.com/company/careers/open-positions/job?gh_jid=6544383002) |
| Databricks | Senior Software Engineer - Database Engine Internals | San Francisco, CA | [link](https://databricks.com/company/careers/open-positions/job?gh_jid=5048461002) |
| Databricks | Staff Software Engineer - Database Engine Internals | Mountain View, CA | [link](https://databricks.com/company/careers/open-positions/job?gh_jid=6544386002) |
| Databricks | Staff Software Engineer - Database Engine Internals | San Francisco, CA | [link](https://databricks.com/company/careers/open-positions/job?gh_jid=5646866002) |

**Note on DB Engine Internals roles:** These are Databricks core infrastructure positions focused on query engine and storage layer internals. Strong Python/Scala/C++ backend focus. Databricks MV/SF only (not remote-first), so relocation/hybrid consideration required.

---

## API Errors (404 — Boards May Have Moved)

These companies returned HTTP 404 — their Greenhouse board slug may have changed or they've migrated ATS:

- Prefect, Neon, Shield AI, Skydio, Hadrian, Hermeus, Joby Aviation, Archer Aviation, Zipline, Confluent, Snowflake

**Recommended action:** Update `portals.yml` API slugs or switch to `scan_method: websearch` for these companies.

---

## Location Filter Note

196 title matches were found across all geographies. The strict US filter (US Remote, Denver, SF, Los Gatos, Seattle, Bend) reduced this to 4. The majority of technical matches were EMEA-only (Intercom London/Berlin, Celonis Madrid/Munich, Scale AI London, GetYourGuide Berlin, N26 Berlin/Barcelona, Trade Republic Berlin/London, SumUp Berlin, Databricks Amsterdam/Berlin/London).

If Patrick is open to EMEA roles, re-run with `--emea` flag or expand location filter in portals.yml.
