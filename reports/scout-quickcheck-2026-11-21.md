# Scout Quick-Check — 2026-11-21

**Run type:** Greenhouse API scan (40 companies checked via API)
**Raw matches before location filter:** 118
**After US location filter:** 30 pipeline additions
**API errors:** 4 boards returning 404 (Parloa, Black Forest Labs, Wayve, Clickhouse)

## New Pipeline Additions (30)

### Anthropic (2)

- **[Engineering Manager, Privacy Infrastructure](https://job-boards.greenhouse.io/anthropic/jobs/5490122008)** — San Francisco, CA | New York City, NY
- **[Staff+ Software Engineer, Capacity Engineering](https://job-boards.greenhouse.io/anthropic/jobs/5490979008)** — San Francisco, CA | New York City, NY | Seattle, WA

### Anduril (11) — heavy Denver/CO presence

- **[Chief Software Engineer, Space Ground Systems](https://boards.greenhouse.io/andurilindustries/jobs/5145121007?gh_jid=5145121007)** — Colorado Springs, CO
- **[Forward Deployed Software Engineer, Connected Warfare (Active Clearance)](https://boards.greenhouse.io/andurilindustries/jobs/5283460007?gh_jid=5283460007)** — Colorado Springs, CO
- **[Scientific Software Engineer](https://boards.greenhouse.io/andurilindustries/jobs/5275462007?gh_jid=5275462007)** — Broomfield, CO / Fort Collins, CO
- **[Senior Software Engineer, Battlespace Awareness](https://boards.greenhouse.io/andurilindustries/jobs/5281210007?gh_jid=5281210007)** — Broomfield, CO
- **[Senior Software Engineer, Rust](https://boards.greenhouse.io/andurilindustries/jobs/5281212007?gh_jid=5281212007)** — Broomfield, CO
- **[Software Engineer, Battlespace Awareness](https://boards.greenhouse.io/andurilindustries/jobs/5281214007?gh_jid=5281214007)** — Broomfield, CO
- **[Software Engineer, C++](https://boards.greenhouse.io/andurilindustries/jobs/5275463007?gh_jid=5275463007)** — Broomfield, CO / Fort Collins, CO
- **[Software Engineer, Infrastructure](https://boards.greenhouse.io/andurilindustries/jobs/5281224007?gh_jid=5281224007)** — Broomfield, CO
- **[Software Engineer, Rust](https://boards.greenhouse.io/andurilindustries/jobs/5281216007?gh_jid=5281216007)** — Broomfield, CO

### True Anomaly (1)

- **[Senior Machine Learning Engineer](https://job-boards.greenhouse.io/trueanomalyinc/jobs/5138859007)** — Denver, CO / Long Beach, CA / Washington, DC

### Vercel (1)

- **[Software Engineer, Runtimes](https://job-boards.greenhouse.io/vercel/jobs/6150691004)** — Hybrid - San Francisco

### Stability AI (1)

- **[Staff Software Engineer, Data](https://job-boards.eu.greenhouse.io/stabilityai/jobs/5018185101)** — Remote

### Rocket Lab (7) — Littleton, CO (Denver metro)

- **[Principal Flight Software Engineer](https://job-boards.greenhouse.io/rocketlab/jobs/8204047003)** — Littleton, CO
- **[Senior Flight Software Engineer I](https://job-boards.greenhouse.io/rocketlab/jobs/8084557003)** — Littleton, CO
- **[Senior Flight Software Engineer II](https://job-boards.greenhouse.io/rocketlab/jobs/8204049003)** — Littleton, CO
- **[Senior Ground Software Engineer I](https://job-boards.greenhouse.io/rocketlab/jobs/8200818003)** — Littleton, CO
- **[Senior Network Software Engineer II - Secret Clearance](https://job-boards.greenhouse.io/rocketlab/jobs/7994294003)** — Littleton, CO
- **[Senior Software Engineer I - Digital Engineering](https://job-boards.greenhouse.io/rocketlab/jobs/8202563003)** — Littleton, CO
- **[Senior Software Engineer II - Digital Engineering](https://job-boards.greenhouse.io/rocketlab/jobs/8202565003)** — Littleton, CO

### Nuro (5) — Mountain View, CA

- **[Principal Software Engineer, Performance](https://nuro.ai/careersitem?gh_jid=8384407)** — Mountain View, CA
- **[Senior Software Engineer, Distributed Compute System](https://nuro.ai/careersitem?gh_jid=7896050)** — Mountain View, CA
- **[Senior Software Engineer, Map Platform](https://nuro.ai/careersitem?gh_jid=8324974)** — Mountain View, CA
- **[Senior Software Engineer, Performance](https://nuro.ai/careersitem?gh_jid=8386877)** — Mountain View, CA
- **[Software Engineer, Performance](https://nuro.ai/careersitem?gh_jid=6810051)** — Mountain View, CA

### Databricks (4)

- **[Senior Software Engineer - Access Management](https://databricks.com/company/careers/open-positions/job?gh_jid=8931033002)** — Bellevue, WA (Seattle)
- **[Software Engineer, Infrastructure](https://databricks.com/company/careers/open-positions/job?gh_jid=8829039002)** — Mountain View, CA
- **[Sr. Staff Software Engineer, Agentic Applications](https://databricks.com/company/careers/open-positions/job?gh_jid=8927749002)** — Mountain View, CA
- **[Staff Software Engineer - Threat and Abuse Defense](https://databricks.com/company/careers/open-positions/job?gh_jid=8950673002)** — Mountain View, CA

## API Errors (boards returning 404 — may need ATS migration check)

| Company | URL |
|---------|-----|
| Parloa | https://boards-api.greenhouse.io/v1/boards/parloa/jobs |
| Black Forest Labs | https://boards-api.greenhouse.io/v1/boards/blackforestlabs/jobs |
| Wayve | https://boards-api.greenhouse.io/v1/boards/wayve/jobs |
| Clickhouse | https://boards-api.greenhouse.io/v1/boards/clickhouse/jobs |

> These 4 companies may have migrated away from Greenhouse. Consider disabling their `api:` field and switching to `websearch` or `playwright` scan method.

## Filtered Out (88 — non-US locations or non-engineering roles)

Largest groups: Anduril non-CO roles (Waltham MA, Costa Mesa CA, DC), Fivetran EMEA/India,
Databricks India, Scale AI Kuwait, Rocket Lab Long Beach CA, SumUp/N26/Contentful Europe,
Samsara Canada, Planet Labs Slovenia, Zipline Nigeria/Africa.

---
_Generated by scout-quickcheck on 2026-11-21_
