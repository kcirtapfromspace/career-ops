# Scout Quick Check — 2026-11-21

**Type:** Greenhouse API only  
**Companies checked:** 40  
**Total jobs fetched:** 8,291  
**New pipeline items:** 0  
**Near-misses:** 1  

---

## Summary

Market quiet — 7th consecutive day with no new pipeline additions. All candidate matches were already in scan history from prior runs. One new job discovered but filtered as hardware role.

---

## Dead Boards (404)

- Parloa
- Black Forest Labs
- Wayve
- ClickHouse

(Same as prior checks — these boards appear permanently dead.)

---

## Near-Miss

**True Anomaly — FPGA Engineering Manager**  
- URL: https://job-boards.greenhouse.io/trueanomalyinc/jobs/5281610007  
- Location: Denver, CO; Long Beach, CA  
- Status: Filtered — hardware/FPGA management role, not software/data/platform  
- Logged to scan-history.tsv to prevent future rediscovery  

Note: Job ID 5281610007 is below the previous True Anomaly HWM (5300915007), suggesting this was an older posting missed by HWM-based dedup in earlier scans.

---

## Dedup Note

The quick check script flagged 16 raw matches due to URL format inconsistencies in scan-history.tsv (older entries store URL as column 1; newer entries store date as column 1 with URL in column 5+). Manual grep verification confirmed all 15 non-FPGA matches were already logged in prior runs (Nov 12–20).

---

## Backlog Reminder

Items already in pipeline awaiting Patrick's review:

| Priority | Role | Company | Score | Added |
|----------|------|---------|-------|-------|
| ⭐ | Forward Deployed Engineer (CO-based) | Databricks | 4.5/5 | ~Nov 15 |
| ⭐ | Staff SWE Infrastructure Foundations (Remote-US) | Temporal | 4.3/5 | Nov 9 |
| ⭐ | Staff SWE Builder Platform (Remote-US) | Temporal | 4.2/5 | Nov 9 |
| ⭐ | Senior EM dbt Engine (Denver) | Fivetran | 4.1/5 | Nov 9 |
| ★ | Sr Mgr SWE AI Dev Productivity (Remote-US) | Samsara | 4.0/5 | Nov 14 |
