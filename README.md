# GET /portfolio HTTP/1.1
Status: 200 OK
Content-Type: text/markdown

An engineer whose portfolio behaves like a system, drawn the way that system's own architecture diagrams would be drawn.

[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=FFDF00)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![React Flow](https://img.shields.io/badge/React_Flow-FF007F?style=flat)](https://reactflow.dev/)
[![EmailJS](https://img.shields.io/badge/EmailJS-orange?style=flat)](https://www.emailjs.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)

---

### 🚀 [Live Demo (sanjai.dev)](https://sanjai.dev/)

<!-- SCREENSHOT: homepage hero -->
*(Placeholder: A real screenshot of the homepage hero section showing the profile photo and telemetry log stream still needs to be added manually here)*

---

## 💻 What This Is & What Makes It Different

**Backend Runtime** is a personal portfolio and engineering showcase designed to feel like a live, operating system instead of a traditional website. Rather than presenting static lists, the navigation, animations, and interactive visuals demonstrate how modern backend systems process data when users interact with them.

> [!IMPORTANT]
> **Architecture & Honesty Caveat**: This is a **frontend-only** website built using React, TypeScript, and Vite. The Redis caching latencies, RabbitMQ queues, and Kafka pipelines are **simulated, client-side demonstrations** of backend concepts. This was a deliberate design choice: it allows the site to be hosted 100% free-tier with zero cold starts, zero database maintenance overhead, and instant page response times, while still educating visitors on complex distributed systems architectures.
>
> If you want to see these backend technologies running in production for real, explore the source repositories of **DevSecWatch** (Redis/RabbitMQ/FastAPI/Postgres microservices) and **TriNetra AI** (Redpanda/FastAPI/NetworkX graph analysis) linked in the showcase below.

---

## 🛠️ Features

- **API Gateway Navigation**: Site routes are treated as network calls (e.g. `GET /projects`), visualization packets travel to simulated endpoints, and live mock proxy router logs stream at the bottom of the home screen.
- **System Capabilities Grid**: Explains core backend engineering proficiencies (Microservices, Event-Driven Architecture, Caching, etc.) as themed cluster service nodes.
- **Interactive Architecture Demos**:
  - **Redis Cache Simulation**: Side-by-side visual walkthrough of a **Cache Hit** (retrieval from memory at ~2ms latency) versus a **Cache Miss** (database query fallback resulting in a ~180ms latency write-back).
  - **Kafka Event Pipeline**: Multi-partition topic simulation demonstrating asynchronous event publishing, partition keys, consumer offsets, and dead-letter routing to a separate Dead-Letter Topic (DLT).
  - **RabbitMQ Task Queue**: Demonstrates task fan-out distribution from exchanges to target task queues with dead-letter queue (DLQ) publishing on processing failures.
- **Interactive Projects Gallery**: Highlighted spec sheet and layout visualization connected with live schema lines.
- **Client-Side Contact Endpoint**: A secure, client-side contact form powered by EmailJS client SDK with rate-limiting, field validations, and anti-spam honeypot traps.

---

## 📸 Screenshots

### Home Dashboard
<!-- SCREENSHOT: home_dashboard -->
*(Placeholder: Home page hero, capability cards, and Edge Proxy/Gateway logs)*

### Projects Node View
<!-- SCREENSHOT: projects_node_view -->
*(Placeholder: Projects page showcasing the node architecture connection lines)*

### Live Architecture Demos
<!-- SCREENSHOT: architecture_demos -->
*(Placeholder: Architecture page showing the interactive React Flow topology maps)*

### Secure Contact Console
<!-- SCREENSHOT: contact_console -->
*(Placeholder: Contact form showing validated request header states)*

---

## ⚙️ Tech Stack

| Technology | Layer / Purpose | Details |
| :--- | :--- | :--- |
| **React 19** | Core UI | Component-driven architecture |
| **TypeScript** | Type Safety | Robust types for system simulation payloads |
| **Vite 8** | Build Tooling | Lightning-fast HMR and bundle compilation |
| **Tailwind CSS v4** | Layout / Tokens | Modern utility-first CSS utilizing custom design tokens |
| **Framer Motion** | Micro-Animations | Interactive request packets, progress indicators, and transitions |
| **React Flow** | Topology Diagrams | Nodes, handles, and custom edges for live architectures |
| **EmailJS SDK** | Contact API | Direct client-side secure email transmission |
| **React Helmet Async** | SEO | Dynamic header metadata injection |

---

## 📂 Real Projects Showcase

Detailed specifications of real backend projects featured on the site:

### 1. [PlanWizz](https://planwizz-frontend-2x1o.onrender.com/)
- **Description**: An intelligent timetable generation platform that parses university enrollment PDFs and outputs clash-free student schedules using Constraint Satisfaction Problem (CSP) algorithms.
- **Tech Stack**: Spring Boot, Java, React, Vite, Tailwind CSS, PDF Processing, CSP Algorithms, Render.
- **Note**: Hosted on a free tier that sleeps when idle — first load may take 20–50s to wake up.

### 2. [DevSecWatch](https://github.com/Sanjai-Quest/DevSecWatch)
- **Description**: An AI-powered repository vulnerability scanner built on a distributed microservices architecture. A Spring Boot API publishes scan jobs to RabbitMQ, which are processed by dynamically scaling workers that clone code, fetch CVE records via FastAPI from OSV databases, and generate LLM summaries.
- **Tech Stack**: Spring Boot, RabbitMQ, PostgreSQL, Redis, FastAPI, Groq LLM, OSV/NVD, WebSockets.

### 3. [TriNetra AI](https://github.com/Sanjai-Quest/TriNetra-AI)
- **Description**: A multi-layered retail fraud detection pipeline that won **Second Prize (🥈)** at HackHustle 2.0. Claims flow through a Redpanda (Kafka) pipeline to run parallel behavior scoring models, image fraud checks, and graph-based fraud-ring identification, fully adhering to DPDPA compliance.
- **Tech Stack**: Spring Boot, Kafka (Redpanda), FastAPI, NetworkX, Celery, D3.js, DPDPA Compliance.

### 4. [CineScope](https://github.com/Sanjai-Quest/CineScope)
- **Description**: A Spring Boot application focusing on relational database ingestion, ORM mappings, and database queries.
- **Tech Stack**: Spring Boot, MySQL, JPA/Hibernate.

### 5. [DunesDay Prediction System](https://github.com/Sanjai-Quest/DunesDay_Pred)
- **Description**: A machine learning platform predicting box office performance (Opening Weekend and Total Revenue) with side-by-side movie comparison and explainable AI metrics explaining SHAP impact features.
- **Tech Stack**: Python (XGBoost, Scikit-Learn, SHAP), FastAPI, React, Vite, Tailwind CSS, Recharts.
- **Demo**: [Live Demo](https://dunesday-frontend-sm6b.onrender.com/) *(Hosted on Render's free tier — may take 20–50s to wake on first load).*

---

## 🚀 Getting Started

To run Backend Runtime locally on your system:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (Node 18+ is recommended).

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sanjai-Quest/Backend-Portfolio.git
   cd Backend-Portfolio
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your EmailJS API keys:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
   *(Refer to `.env.example` for details)*

4. **Launch Local Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

---

## 📦 Deployment

The application is deployed on **Vercel**. 

- **Live URL**: [sanjai.dev](https://sanjai.dev/)
- The project is configured as a Single Page Application (SPA), routing all path targets directly back to `index.html` to prevent routing errors.
- Refer to [deploy-production.md](file:///c:/Users/LENOVO/Downloads/Sanjai_Portfolio/docs/prompts/deploy-production.md) in the `docs` folder for deployment procedures.

---

## 🎨 Design Principles

The design of Backend Runtime prioritizes:
- **Simplicity over Unnecessary Complexity**: Direct frontend simulations instead of overhead heavy microservices infrastructure.
- **Free-Tier Deployability**: Highly interactive systems storytelling with zero runtime cost.
- **Zero Cold Start**: Using static client compilation so recruiters don't experience initial loads or API timeouts.
- Read [PROJECT_PRINCIPLES.md](file:///c:/Users/LENOVO/Downloads/Sanjai_Portfolio/docs/PROJECT_PRINCIPLES.md) for the complete engineering philosophy behind this site.

---

## 🤝 Connect

- **Portfolio**: [sanjai.dev](https://sanjai.dev/contact)
- **LinkedIn**: [Sanjai L](https://www.linkedin.com/in/sanjai-l)
- **GitHub**: [@Sanjai-Quest](https://github.com/Sanjai-Quest)
- **Email**: [sanjaioff@gmail.com](mailto:sanjaioff@gmail.com)

---

> [!NOTE]
> **License**: This project does not contain a license file. Please reach out to Sanjai L before copying or redistributing.
