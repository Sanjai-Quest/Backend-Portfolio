import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { InfoCard } from "../components/InfoCard";
import { SectionHeader } from "../components/SectionHeader";
import { Timeline } from "../components/Timeline";
import type { TimelineItem } from "../components/Timeline";
import { TechBadge } from "../components/TechBadge";
import { BookOpen, ShieldAlert, Download } from "lucide-react";
import { Button } from "../components/Button";

export const About: React.FC = () => {
  // Timeline milestones representing developer journey
  const milestones: TimelineItem[] = useMemo(
    () => [
      {
        date: "JANUARY 2026",
        title: "DevSecWatch Integration",
        subtitle: "Distributed Vulnerability Analyzer",
        description:
          "Built a vulnerability scanning pipeline using microservices and background job brokers to perform code analytics asynchronously. Integrated AI explaining agents for reporting threat levels.",
        tech: ["RabbitMQ", "Semgrep", "Redis Caching", "Spring Security", "Docker"],
      },
      {
        date: "DECEMBER 2025",
        title: "PlanWizz Engine Design",
        subtitle: "Constraint Satisfaction Problem",
        description:
          "Engineered a constraint-based scheduling processor that parses complex raw enrollment PDFs and automatically compiles conflict-free course combinations. Solved high-dimensional schedule optimization.",
        tech: ["Spring Boot", "CSP Algorithms", "PDF Parsing", "React"],
      },
      {
        date: "MARCH 2026",
        title: "TriNetra AI",
        subtitle: "Hackathon Winner — Return-Fraud Detection",
        description: "Built a multi-signal fraud detection platform for return/refund claims — a six-detector fraud engine (image forensics + behavioral signals), graph-based ring detection with NetworkX, and a DPDPA-compliant consent/audit layer, all fed through a Kafka event backbone. Won 2nd place at Saveetha Engineering College's HackHustle 2.0.",
        tech: ["Kafka", "FastAPI", "NetworkX", "Celery", "DPDPA Compliance"],
        image: "/bio/trinetra-winner.jpg",
        imageAlt: "Sanjai holding the 2nd place runner-up certificate at Saveetha Engineering College's HackHustle 2.0 Hackathon",
      },
      {
        date: "2026",
        title: "Full-Time Placement",
        subtitle: "In Progress",
        description: "Actively interviewing for full-time backend engineering roles. Outcome pending — nothing confirmed yet.",
      },
    ],
    []
  );

  return (
    <div className="space-y-12">
      <Helmet>
        <title>About — Sanjai L</title>
        <meta
          name="description"
          content="About Sanjai L: backend engineer focused on distributed systems, Java, Spring Boot, microservices and event-driven architecture. Engineering timeline, skills, and technology stack."
        />
      </Helmet>
      {/* 1. Header Hero with Blueprint Grid */}
      <section className="bg-section-dark bg-blueprint-grid border border-border-primary rounded-xl p-8 md:p-12 relative overflow-hidden text-left">
        <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-signature rounded-tl-xl opacity-75"></div>
        <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-signature rounded-tr-xl opacity-75"></div>
        <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-signature rounded-bl-xl opacity-75"></div>
        <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-signature rounded-br-xl opacity-75"></div>
        
        <div className="space-y-3 z-10 relative">
          <div className="flex items-center space-x-2 select-none">
            <span className="font-mono text-[9px] font-bold text-status-info bg-status-info/5 border border-status-info/30 px-2 py-0.5 rounded uppercase tracking-wider">
              200 OK
            </span>
            <span className="font-mono text-xs text-text-secondary">
              GET /about (identity_resolution)
            </span>
          </div>
          <h1 className="font-mono text-xl md:text-3xl font-bold tracking-tight text-text-primary uppercase">
            Identity Service — Metadata
          </h1>
          <p className="text-text-muted text-xs font-mono max-w-xl">
            RESOLVING SYSTEM OWNER INFORMATION: SANJAI L
          </p>
          <div className="pt-2">
            <Button
              type="button"
              variant="primary"
              icon={Download}
              className="h-10 px-4"
              aria-label="Download resume, opens PDF in new tab"
              onClick={() => window.open("/resume.pdf", "_blank", "noopener,noreferrer")}
            >
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Main Bio and Skills Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Biography Milestones - Left/Center Column */}
        <div className="lg:col-span-2 space-y-6">
          <SectionHeader title="Biographical Milestones" eyebrow="GET /bio" />
          <div className="bg-card-bg border border-border-primary rounded-xl p-6">
            <Timeline items={milestones} layout="vertical" />
          </div>
        </div>

        {/* Technical Interests - Right Column */}
        <div className="space-y-6">
          <SectionHeader title="System Capabilities" eyebrow="GET /capabilities" />
          <InfoCard title="Primary Interests" icon={BookOpen}>
            <div className="space-y-4">
              <p className="text-xs text-text-secondary leading-relaxed">
                Hi, I'm Sanjai L, a Java Backend Developer passionate about building production-inspired backend systems.
              </p>
              <p className="text-xs text-text-secondary leading-relaxed">
                I enjoy designing software that is simple for users but thoughtfully engineered behind the scenes.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                <TechBadge name="Java" />
                <TechBadge name="Spring Boot" />
                <TechBadge name="Distributed Systems" />
                <TechBadge name="Event-Driven Architecture" />
                <TechBadge name="Microservices" />
                <TechBadge name="Caching" />
                <TechBadge name="Messaging Systems" />
                <TechBadge name="REST APIs" />
                <TechBadge name="PostgreSQL" />
                <TechBadge name="Redis" />
              </div>
              <p className="text-[11px] font-mono text-signature leading-relaxed italic border-t border-border-primary/40 pt-3 mt-2">
                "I believe understanding a technology is valuable. Building with it proves understanding. I don't stop after understanding a concept — I build it."
              </p>
            </div>
          </InfoCard>
        </div>
      </section>

      {/* 3. Professional Experience */}
      <section className="space-y-6">
        <SectionHeader title="Professional Experience" eyebrow="GET /experience" />
        <div className="border border-border-primary rounded-xl p-6 bg-card-bg relative">
          <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-signature rounded-tl-xl opacity-75"></div>
          <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-signature rounded-tr-xl opacity-75"></div>
          <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-signature rounded-bl-xl opacity-75"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-signature rounded-br-xl opacity-75"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border-primary/40 pb-4 mb-4">
            <div className="text-left">
              <h3 className="font-mono text-sm font-bold text-text-primary uppercase tracking-wide">
                Retech Solutions Pvt. Ltd. — Software Engineering Intern
              </h3>
              <p className="text-xs text-text-muted font-mono mt-0.5">
                Dec 2024 – Jan 2025 · Remote, India
              </p>
            </div>
            <div className="flex flex-wrap gap-1 mt-2 md:mt-0">
              <TechBadge name="Java" />
              <TechBadge name="Spring Boot" />
              <TechBadge name="Redis" />
              <TechBadge name="JUnit 5" />
              <TechBadge name="REST APIs" />
            </div>
          </div>

          <ul className="text-xs text-text-secondary space-y-3 list-disc list-inside pl-1 text-left leading-relaxed">
            <li>
              Delivered a Java REST API feature independently on a live production SaaS platform, collaborating cross-functionally with senior engineers across the full Agile lifecycle to ensure on-time delivery.
            </li>
            <li>
              Optimized API response time by 38% by architecting and implementing a Redis caching layer, owned end-to-end from design through deployment (the cache hit/miss simulation on this site's <a href="/architecture" className="text-signature hover:underline">Architecture</a> page is inspired by this real latency improvement).
            </li>
            <li>
              Sustained unit test coverage above 85% using JUnit 5 and diagnosed/resolved 3 production defects, applying peer code review feedback to harden bug-free release quality.
            </li>
          </ul>
        </div>
      </section>

      {/* 4. Mandatory Construction Disclosure */}
      <section className="space-y-6">
        <SectionHeader title="How This Site Is Actually Built" eyebrow="GET /architecture_disclosure" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <InfoCard title="Architecture Transparency Statement" icon={ShieldAlert}>
              <div className="space-y-3 text-xs text-text-secondary leading-relaxed">
                <p>
                  <strong>Frontend Stack:</strong> React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router.
                </p>
                <p>
                  There is <strong>no real backend service</strong> behind this site. Caching, event publishing, and queue processing are represented visually — through animation and simulated data — to teach the concepts, not to run real infrastructure for a portfolio page. The one genuinely real server-side call on the whole site is the contact form.
                </p>
                <p>
                  If you want to see these concepts running for real, that's what DevSecWatch (Redis, RabbitMQ, PostgreSQL, Spring Boot microservices) and the task-queue / saga-detector projects are for.
                </p>
              </div>
            </InfoCard>
          </div>

          {/* Jargon Translation Glossaries */}
          <div>
            <InfoCard title="Jargon Translations" icon={BookOpen}>
              <div className="space-y-3 text-[11px] font-mono leading-relaxed">
                <div>
                  <span className="text-status-info font-bold">CSP:</span>
                  <p className="text-text-muted mt-0.5">
                    Constraint Satisfaction Problem. A mathematical puzzle where variables must follow strict rules (e.g. generating schedules with zero overlaps).
                  </p>
                </div>
                <div className="border-t border-border-primary/40 pt-2">
                  <span className="text-status-async font-bold">Asynchronous Processing:</span>
                  <p className="text-text-muted mt-0.5">
                    Running tasks in the background so the system responds immediately, without making users wait for completion.
                  </p>
                </div>
                <div className="border-t border-border-primary/40 pt-2">
                  <span className="text-status-mutation font-bold">Distributed Systems:</span>
                  <p className="text-text-muted mt-0.5">
                    Multiple backend nodes communicating over networking calls to operate as a single, coordinated system.
                  </p>
                </div>
              </div>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* 5. Personal Mission Closing Quote */}
      <section className="bg-blueprint-grid border border-border-primary rounded-xl p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-signature rounded-tl-[3px] opacity-75"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-signature rounded-br-[3px] opacity-75"></div>
        
        <div className="max-w-2xl mx-auto space-y-4 z-10 relative">
          <span className="font-mono text-[9px] text-signature tracking-widest uppercase">
            [personal-mission-statement]
          </span>
          <p className="font-mono text-sm md:text-base text-text-primary tracking-tight font-bold leading-relaxed italic">
            "Every technology I learn eventually becomes part of a real project. Because I believe understanding a technology is valuable. Building with it proves understanding."
          </p>
        </div>
      </section>
    </div>
  );
};
