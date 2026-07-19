# Site Content

Source of truth for real page copy.

---

## Home — Featured Projects

### PlanWizz

An intelligent timetable generation platform that transforms raw university enrollment PDFs into optimized, clash-free academic schedules.

Built around a Constraint Satisfaction Problem (CSP) solving engine, PlanWizz combines PDF parsing, scheduling algorithms, and a responsive web interface to automate one of the most time-consuming tasks for students.

**Highlights**
- Constraint Satisfaction Problem (CSP) based scheduling engine
- Automatic PDF parsing for enrollment data
- Clash-free timetable generation
- Support for hard constraints and user preferences
- Searchable course selection
- Responsive React interface
- Production-ready Spring Boot backend architecture

**Tech stack:** Spring Boot, Java, React, Vite, Tailwind CSS, PDF Processing, CSP Algorithms, Render.

**Live demo:** https://planwizz-frontend-2x1o.onrender.com/
*(hosted on a free tier that sleeps when idle — first load may take 20–50s to wake up; show a "waking up the demo…" note next to this link rather than a bare href.)*

### DevSecWatch

An AI-powered security vulnerability analysis platform built using a distributed backend architecture.
GitHub: https://github.com/Sanjai-Quest/DevSecWatch

**Architecture Details**
- Frontend: React + TypeScript (Vite), communicating via REST (JWT Auth) and STOMP over WebSocket for real-time live updates.
- Backend API: Spring Boot 3.2.1 (port 8080) — publishes scan jobs to RabbitMQ, reads/writes PostgreSQL, and handles Redis caching and rate-limiting.
- RabbitMQ 3 (port 5672): three queues — scan-jobs, ai-enrichment, and scan-cancellation.
- Worker Service: Spring Boot 3.2.1 (port 8081), scaling between 1–3 instances. Consumes queued jobs, clones target repositories via GitHub HTTPS (OAuth2), checks the Redis cache, persists scan reports to PostgreSQL, and calls the Python AI Service.
- AI Service: FastAPI + Python (port 8000) — queries Groq's Llama-3.3-70b (2–5s latency) with fallback lookup to OSV/NVD CVE databases.
- Data Layer: PostgreSQL 15 (port 5433), Redis 7 (port 6379).

**Highlights**
- Spring Boot microservices
- AI-assisted vulnerability explanation
- Asynchronous processing
- Redis caching
- RabbitMQ messaging
- PostgreSQL persistence
- RESTful APIs
- Security-focused architecture

**Tech stack:** Spring Boot, RabbitMQ, PostgreSQL, Redis, FastAPI, Groq LLM, OSV/NVD, WebSocket/STOMP, OAuth2.

### TriNetra AI

A multilayered fraud detection system developed for retail environments to identify suspicious purchasing behaviour using AI-driven analysis. Built during HackHustle 2.0 — 🥈 Second Prize.
GitHub: https://github.com/Sanjai-Quest/TriNetra-AI

**Architecture Details**
- Customer Portal submits return claims to a Spring Boot Return API (claims submission + state machine).
- Events flow through Redpanda (Kafka-API-compatible) to three independent consumers: a FastAPI fraud engine, a NetworkX-based graph service (fraud-ring detection), and Celery workers (image, receipt, and carrier processing).
- The Fraud Engine executes six parallel detectors: ELA, EXIF, pHash, CLIP, OCR, and Behavior.
- Fraud Engine and Graph Service outputs feed a tier-based score engine (0–100 score).
- Admin Dashboard visualizes risk clusters using a D3.js ring graph.
- DPDPA Compliance Layer manages consent, immutable audit logs, enforces 24-month retention, and explicitly does not auto-block based on fraud score alone.

**Highlights**
- Fraud detection workflow
- AI-assisted decision support
- Backend-driven architecture
- Retail-focused analytics
- Team collaboration

**Tech stack:** Spring Boot, Kafka (Redpanda), FastAPI, NetworkX, Celery, D3.js, DPDPA compliance.

### CineScope

A Spring Boot project demonstrating relational dataset ingestion and handling via MySQL — the simpler, foundational counterpart to DevSecWatch/TriNetra AI's distributed-systems complexity.
GitHub: https://github.com/Sanjai-Quest/CineScope

**Highlights**
- Relational dataset ingestion
- JPA / Hibernate ORM mapping
- Foundational Spring Boot setup

**Tech stack:** Spring Boot, MySQL, JPA/Hibernate.

### DunesDay Prediction System

A full-stack AI application to predict movie box office performance (Opening Weekend and Total Gross) and compare two movies side by side.

**Highlights**
- Dual prediction: Opening Weekend and Total Revenue, using XGBoost
- Side-by-side comparison of two movies
- Explainable AI — surfaces the top 5 SHAP features driving each prediction
- Interactive "tweak" controls (budget, star power via crew) with instant re-prediction
- Dark-mode, glassmorphism UI

**Tech stack:** Python (XGBoost, Scikit-Learn, SHAP), FastAPI, React, Vite, Tailwind CSS, Recharts.

**Model performance:** Total Revenue R² ~0.87; Opening Weekend R² ~0.84 (these are simulated/refined targets documented by the project, not fully validated benchmark figures).

**Live demo:** https://dunesday-frontend-sm6b.onrender.com/
**Repo:** https://github.com/Sanjai-Quest/DunesDay_Pred

*(Hosted on Render's free tier — frontend and FastAPI backend may take 20–50s to wake on first load. Show a "waking up the demo…" note next to the live link.)*

---

## Current Engineering Focus

- Distributed Systems
- Event-Driven Architecture
- Microservices
- Backend Performance
- Caching Strategies
- System Design
- Production-grade Spring Boot applications
- Building interactive products that explain backend engineering concepts

---

## About Backend Runtime (this site)

Backend Runtime is my personal portfolio and engineering showcase. It is designed to feel like a backend system instead of a traditional portfolio website.

Rather than presenting projects as static cards, this portfolio demonstrates how modern backend systems behave when users interact with them. Every page, animation, and interaction is designed to teach backend engineering concepts while introducing me as an engineer.

I don't want visitors to only see what I've built. I want them to understand how I think.

**How this site is actually built:**

Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router.

There is no real backend service behind this site. Caching, event publishing, and queue processing are represented visually — through animation and simulated data — to teach the concepts, not to run real infrastructure for a portfolio page. The one genuinely real server-side call on the whole site is the contact form.

If you want to see these concepts running for real, that's what DevSecWatch (Redis, RabbitMQ, PostgreSQL, Spring Boot microservices) and the task-queue / saga-detector projects are for.

---

## About Me

Hi, I'm Sanjai L, a Java Backend Developer passionate about building production-inspired backend systems.

I enjoy designing software that is simple for users but thoughtfully engineered behind the scenes.

**Primary interests:**
- Java
- Spring Boot
- Distributed Systems
- Event-Driven Architecture
- Microservices
- Caching
- Messaging Systems
- REST APIs
- PostgreSQL
- Redis

I believe understanding a technology is valuable. Building with it proves understanding. I don't stop after understanding a concept — I build it.

---

## What Makes This Portfolio Different

This is not a traditional portfolio. Instead of navigating between ordinary pages, visitors experience concepts commonly found in modern backend systems:

- API Gateway–inspired navigation
- Service-based page architecture
- Request flow visualization
- Cache hit and cache miss demonstrations
- Event publishing simulations
- Queue processing concepts
- Interactive architecture explanations
- Production-inspired backend storytelling

The objective is to make backend engineering understandable through interaction.

---

## Engineering Philosophy

- Architecture before implementation
- Simplicity over unnecessary complexity
- Performance before visual effects
- Backend concepts through interaction
- Reusable components over duplicated code
- Production-inspired thinking
- Build first. Explain through the product.

---

## Current Focus (Projects page summary)

I am continuously improving my knowledge in:
- Distributed Systems
- Event-Driven Architecture
- Backend Performance
- Production-grade System Design
- Microservices Communication

## Experience

### Retech Solutions Pvt. Ltd. — Software Engineering Intern
Dec 2024 – Jan 2025 · Remote, India

- Delivered a Java REST API feature independently on a live production SaaS platform, collaborating cross-functionally with senior engineers across the full Agile development lifecycle to ensure on-time delivery.
- Optimized API response time by 38% by architecting and implementing a Redis caching layer, owned end-to-end from design through deployment (the cache hit/miss simulation on this site's Architecture page is inspired by this real latency improvement).
- Sustained unit test coverage above 85% using JUnit 5 and diagnosed/resolved 3 production defects, applying peer code review feedback to harden bug-free release quality.

---

## Connect

- Email: sanjaioff@gmail.com
- GitHub: https://github.com/Sanjai-Quest
- LinkedIn: https://www.linkedin.com/in/sanjai-l

---

## Personal Mission

Every technology I learn eventually becomes part of a real project. Because I believe understanding a technology is valuable. Building with it proves understanding.
