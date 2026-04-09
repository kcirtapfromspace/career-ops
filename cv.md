# Patrick Deutsch

**patrickdeutsch@gmail.com** | **(570) 778-7336** | **Denver, CO**
[LinkedIn](https://linkedin.com/in/patrickdeutsch) | [GitHub](https://github.com/kcirtapfromspace) | [kcirtap.io](https://kcirtap.io/)

---

## Summary

Staff engineer with 10+ years building backend and platform systems in high-accountability environments. Focus: reliable services, clear operational signals, and code paths that are easy to reason about when incidents happen. Expert in distributed systems, Kubernetes-native workflow orchestration, and real-time streaming pipelines. Proven track record delivering mission-critical systems serving 100M+ users across federal agencies and enterprise SaaS.

---

## Technical Skills

**Backend Engineering:** Rust, Go, Python, SQL, FastAPI, Axum, API Design

**Platform:** Kubernetes, Docker, Helm, Terraform, CloudFormation, GitHub Actions, CI/CD

**Data & Messaging:** Kafka, Kinesis, Debezium CDC, PostgreSQL, Redshift, DuckDB, dbt, Apache Spark, Parquet, Iceberg

**Orchestration:** Argo Workflows, Airflow, AWS Step Functions

**Ops & Observability:** Datadog, OpenTelemetry, Prometheus, Grafana, New Relic, Splunk, Incident Response

**Security & Compliance:** RBAC, KMS, Okta SSO, OAuth/OIDC, Vault, PCI, FedRAMP, GDPR

---

## Scale & Impact

- Architected platforms serving **100M+ end users** across federal agencies (VA, HHS, CMS)
- Led data migrations processing **100K+ employee records** with zero downtime
- Built observability systems standardizing practices across **40+ engineering teams**
- Reduced infrastructure costs by **30-50%** through optimization and modern architectures
- Designed Kubernetes workflow orchestration handling large-scale parallel data processing

---

## Professional Experience

### Staff Data Architect | Ad Hoc LLC | Remote | Jan 2022 - Apr 2025

Architect and deliver data platforms for federal and state agencies impacting 100M+ individuals. Lead cross-functional teams to build high-reliability systems with emphasis on observability, data governance, and scalable architecture.

**VA.gov Watchtower Observability Platform**
- Architected unified observability platform for VA.gov serving 18M+ veterans, aggregating alerts from Datadog, GitHub, Slack, and PagerDuty into centralized incident management dashboard
- Designed multi-source ETL pipeline (Python, Parquet, DuckDB) with quarterly data consolidation and Brotli compression, enabling historical trend analysis across 40+ product teams
- Led team of 4 engineers (90% IC contribution) to deliver platform that became VA's standard for DORA metrics and Four Golden Signals implementation
- Built curated data product architecture enabling SQL-based analytics on incident patterns, reducing mean-time-to-detection for cross-system architectural issues

**State of Colorado Payroll Modernization**
- Led mission-critical payroll data migration for Colorado state government, processing 100K+ employee records from legacy mainframe to AWS-native architecture
- Designed idempotent ELT pipelines using dbt, DuckDB, and Redshift with sub-hour refresh latency (down from batch-weekly on mainframe)
- Architected secure data enclave using AWS Step Functions, Fargate, and Terraform, achieving 30% cloud cost reduction through AWS Well-Architected optimization
- Built reconciliation layer mapping 30+ years of legacy schema changes to modern data contracts

**HHS Head Start Semantic Deduplication**
- Built semantic deduplication system for HHS Head Start program ($15.8B federal program, 800K+ children served) using BERT sentence transformers to identify contextual duplicates in free-form submissions
- Achieved sub-200ms inference latency within Cloud Foundry's 2GB memory ceiling through lazy model loading and batch vectorization
- Eliminated duplicate records caused by spelling variations, improving reporting accuracy and enabling real-time goal suggestions for 250K+ program staff
- Deployed production NLP pipeline (FastAPI, SpaCy, AWS Comprehend) in highly constrained environment with optimized PyTorch model serving

**Maximus eCR Public Health Pipeline**
- Built scalable real-time eCR ingestion pipeline (HL7, FHIR, AIMS) processing 50K+ events/day at sub-second latency for public health data
- Integrated NLP (AWS Comprehend Medical) and identity resolution (Verato) to automate data handling and reduce duplication
- Deployed modular rules registry (AWS Lambda, DynamoDB, S3) enabling flexible, condition-specific workflows with incremental updates

---

### Senior Data Infrastructure Engineer | Workiva | Remote | Jan 2019 - Jan 2022

Built enterprise data platform infrastructure for SaaS financial reporting products. Led adoption of Kubernetes-native workflow orchestration and Data Mesh architecture.

**Argo Workflows Data Pipeline Platform**
- Architected enterprise data pipeline platform using Argo Workflows on Kubernetes, enabling large-scale parallel data processing for Data Management & Analytics team
- Designed production infrastructure via CloudFormation including Aurora PostgreSQL (multi-AZ), S3 artifact storage with KMS encryption, and Okta SSO integration
- Implemented Helm charts for multi-cluster deployment with Prometheus metrics scraping and New Relic observability
- Reduced pipeline deployment time from days to hours through standardized workflow templates and self-service automation

**Data Mesh & Lake Formation Architecture**
- Pioneered Data Mesh architecture using AWS Lake Formation with cell-level tag-based RBAC, enabling 200+ analysts to access domain-specific data products while maintaining strict governance
- Engineered Python-based ETL and Reverse ETL workflows integrating data into Workiva SaaS products and external financial services
- Automated infrastructure provisioning via Terraform, CloudFormation, and Go-based end-to-end testing
- Implemented Apache Hudi proof-of-concept for Change Data Capture, laying foundation for real-time analytics

**Infrastructure Optimization**
- Drove adoption of Splunk SmartStore, reducing monthly costs by 50% and boosting query performance by 20%
- Enhanced accessibility for Data Analysts and Scientists with self-service data pipelines maintaining strict compliance requirements
- Established data quality practices using Great Expectations and schema validation

---

### IT Infrastructure Analyst | Vail Resorts | Broomfield, CO | Jan 2015 - Jan 2019

Provided operational support for mission-critical, public-facing eCommerce platform generating $300M annually. Served as Enterprise Splunk Administrator.

- Managed infrastructure for enterprise-scale eCommerce including Microsoft OS (IIS, ASP, .NET), MSSQL, F5 Load Balancers, J2EE, and VMware clusters
- Built real-time operational monitoring and alerting using Splunk, enhancing visibility across distributed systems
- Remediated legacy TLS protocols, championed HTTPS migrations, and maintained PCI compliance through large-scale server migrations
- Ensured platform scalability during peak seasons handling millions of concurrent users

---

### IT Support Technician | Amazon | Pennsylvania | Jan 2010 - Jan 2014

Managed IT operations for 800K sqft fulfillment center, progressing from technician to interim project manager.

- Served as Interim IT Project Manager for $5M building expansion, launching fulfillment center on schedule
- Led facility-wide wireless audit/remediation and installed 1,000+ camera surveillance system, overseeing 100 switches and 50 servers
- Managed daily IT operations, network troubleshooting, and telecom systems while mentoring junior technicians
- Developed root cause analysis processes that reduced recurring incidents

---

## Technical Projects

**Sudoku Engine (Rust, iOS, TUI, WASM)**
- Cross-platform Sudoku engine in Rust with iOS, terminal UI, and WASM interfaces
- Organized as shared core crates plus platform-specific front ends to keep gameplay logic portable
- Includes iOS publishing automation docs and CI-oriented release workflow notes

**offleash (Multi-Tenant Booking Platform)**
- Rust/Axum backend with PostgreSQL/SQLx and JWT auth for multi-tenant booking
- Availability engine accounts for travel time and uses transaction/advisory locking to prevent double-booking
- Developer workflow supports Docker Compose, Tilt + k3d, and reproducible environments via Devbox/devenv

**off-quant (Local LLM Tooling)**
- Rust local-LLM toolchain with interactive CLI ("quant"), one-shot ask flows, and context injection
- Native macOS Ollama integration plus menu bar controls (OllamaBar) for model/service management

**Modern Data Stack Demo** | [github.com/kcirtapfromspace/database_thing](https://github.com/kcirtapfromspace/database_thing)
- Built complete CDC lakehouse architecture: PostgreSQL -> Debezium -> Kafka -> Parquet -> dbt/DuckDB -> Evidence.dev
- Implemented data quality validation using Great Expectations and Deequ
- Orchestrated pipelines with Argo Workflows on local Kubernetes (Kind + Tilt)

---

## Education

**Bachelor of Science, Information Sciences and Technology**
The Pennsylvania State University | 2016

---

## Certifications

- AWS Certified Solutions Architect - Associate (2019)
- AWS Certified Data Analytics - Specialty (2023)
