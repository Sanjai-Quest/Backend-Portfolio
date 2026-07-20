import React, { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ServiceCard } from "../components/ServiceCard";
import { SectionHeader } from "../components/SectionHeader";
import { InfoCard } from "../components/InfoCard";
import { Terminal, Database, Server } from "lucide-react";
import { useReducedMotion } from "framer-motion";

// Static SVG component for DevSecWatch Architecture Diagram
const DevSecWatchDiagram: React.FC<{ descriptionId: string }> = ({ descriptionId }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 600 340"
    role="img"
    aria-describedby={descriptionId}
    className="max-w-[600px] mx-auto text-text-primary"
  >
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7B8FA6" />
      </marker>
    </defs>
    
    {/* Tier 1: Client */}
    <rect x="240" y="15" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#7B8FA6" strokeWidth="1.5" />
    <text x="300" y="35" textAnchor="middle" fill="#A6B0BF" fontSize="9" fontFamily="monospace" fontWeight="bold">VITE CLIENT</text>
    <text x="300" y="47" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Browser UI</text>

    {/* Tier 2: Gateway */}
    <rect x="240" y="75" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#FF7A45" strokeWidth="1.5" />
    <text x="300" y="93" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">GATEWAY API</text>
    <text x="300" y="105" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Spring Boot:8080</text>

    {/* Tier 3: Data & Messaging */}
    <rect x="60" y="135" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#21304F" strokeWidth="1.5" />
    <text x="120" y="153" textAnchor="middle" fill="#A6B0BF" fontSize="9" fontFamily="monospace" fontWeight="bold">REDIS 7</text>
    <text x="120" y="165" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Cache:6379</text>

    <rect x="240" y="135" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#21304F" strokeWidth="1.5" />
    <text x="300" y="153" textAnchor="middle" fill="#A6B0BF" fontSize="9" fontFamily="monospace" fontWeight="bold">POSTGRESQL 15</text>
    <text x="300" y="165" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Database:5433</text>

    <rect x="420" y="135" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#5B95F8" strokeWidth="1.5" />
    <text x="480" y="153" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">RABBITMQ 3</text>
    <text x="480" y="165" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Broker:5672</text>

    {/* Tier 4: Processing */}
    <rect x="420" y="205" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#9D74F7" strokeWidth="1.5" />
    <text x="480" y="223" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">WORKER SERVICE</text>
    <text x="480" y="235" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Spring Boot:8081</text>

    {/* Tier 5: Integration */}
    <rect x="240" y="265" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#22C55E" strokeWidth="1.5" />
    <text x="300" y="283" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">AI SERVICE</text>
    <text x="300" y="295" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">FastAPI:8000</text>

    {/* External Integration (Tier 5 external target) */}
    <rect x="60" y="265" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3,3" />
    <text x="120" y="288" textAnchor="middle" fill="#7B8FA6" fontSize="9" fontFamily="monospace" fontWeight="bold">GROQ / OSV API</text>

    {/* Orthogonal Connections (Zero Crossovers) */}
    {/* Client -> Gateway (Sync Call) */}
    <path d="M 300 55 V 75" stroke="#7B8FA6" strokeWidth="1.2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
    
    {/* Gateway -> Cache (Sync Call) */}
    <path d="M 240 95 H 120 V 135" stroke="#7B8FA6" strokeWidth="1.2" markerEnd="url(#arrow)" />
    
    {/* Gateway -> DB (Sync Call) */}
    <path d="M 300 115 V 135" stroke="#7B8FA6" strokeWidth="1.2" markerEnd="url(#arrow)" />
    
    {/* Gateway -> Broker (Async Publish) */}
    <path d="M 360 95 H 480 V 135" stroke="#FF7A45" strokeWidth="1.2" markerEnd="url(#arrow)" />

    {/* Broker -> Worker (Async Consume) */}
    <path d="M 480 175 V 205" stroke="#5B95F8" strokeWidth="1.2" markerEnd="url(#arrow)" />

    {/* Worker -> DB (Sync SQL) */}
    <path d="M 420 220 H 300 V 175" stroke="#7B8FA6" strokeWidth="1.2" markerEnd="url(#arrow)" />

    {/* Worker -> Cache (Sync Query - routed below DB to prevent crossovers) */}
    <path d="M 480 245 V 255 H 120 V 175" stroke="#7B8FA6" strokeWidth="1.2" markerEnd="url(#arrow)" />

    {/* Worker -> AI Service (Sync API Call) */}
    <path d="M 420 225 H 380 V 285 H 360" stroke="#9D74F7" strokeWidth="1.2" markerEnd="url(#arrow)" />

    {/* AI Service -> External API (Third-party Dotted Call) */}
    <path d="M 240 285 H 180" stroke="#EF4444" strokeWidth="1" strokeDasharray="2,2" markerEnd="url(#arrow)" />

    {/* Legend */}
    <g transform="translate(15, 322)" font-family="monospace" font-size="7" fill="#7B8FA6">
      <line x1="0" y1="3" x2="20" y2="3" stroke="#7B8FA6" strokeWidth="1.2" />
      <text x="25" y="6">solid = sync call</text>
      
      <line x1="120" y1="3" x2="140" y2="3" stroke="#FF7A45" strokeWidth="1.2" />
      <text x="145" y="6">orange = async publish</text>

      <line x1="260" y1="3" x2="280" y2="3" stroke="#5B95F8" strokeWidth="1.2" />
      <text x="285" y="6">blue = async consume</text>
      
      <line x1="390" y1="3" x2="410" y2="3" stroke="#EF4444" strokeWidth="1" strokeDasharray="2,2" />
      <text x="415" y="6">dashed = external API</text>
    </g>
  </svg>
);

// Static SVG component for TriNetra AI Architecture Diagram
const TriNetraDiagram: React.FC<{ descriptionId: string }> = ({ descriptionId }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 600 380"
    role="img"
    aria-describedby={descriptionId}
    className="max-w-[600px] mx-auto text-text-primary"
  >
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7B8FA6" />
      </marker>
    </defs>

    {/* Tier 1: Client */}
    <rect x="240" y="15" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#7B8FA6" strokeWidth="1.5" />
    <text x="300" y="35" textAnchor="middle" fill="#A6B0BF" fontSize="9" fontFamily="monospace" fontWeight="bold">CUSTOMER PORTAL</text>
    <text x="300" y="47" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Web / App Claim Input</text>

    {/* Tier 2: Entry & Compliance */}
    <rect x="240" y="75" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#FF7A45" strokeWidth="1.5" />
    <text x="300" y="93" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">RETURN API</text>
    <text x="300" y="105" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Spring Boot Entry</text>

    <rect x="420" y="75" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#EF4444" strokeWidth="1.5" />
    <text x="480" y="93" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">DPDPA ENGINE</text>
    <text x="480" y="105" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Consent &amp; Audit</text>

    {/* Tier 3: Broker */}
    <rect x="240" y="135" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#5B95F8" strokeWidth="1.5" />
    <text x="300" y="153" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">REDPANDA BROKER</text>
    <text x="300" y="165" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Kafka Broker</text>

    {/* Tier 4: Processing Services */}
    <rect x="60" y="195" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#22C55E" strokeWidth="1.5" />
    <text x="120" y="213" textAnchor="middle" fill="#F5F7FA" fontSize="8" fontFamily="monospace" fontWeight="bold">FASTAPI FRAUD ENG</text>
    <text x="120" y="225" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">6 Detectors (phash, ela)</text>

    <rect x="240" y="195" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#9D74F7" strokeWidth="1.5" />
    <text x="300" y="213" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">GRAPH SERVICE</text>
    <text x="300" y="225" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">NetworkX Ring Check</text>

    <rect x="420" y="195" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#A6B0BF" strokeWidth="1.5" />
    <text x="480" y="213" textAnchor="middle" fill="#A6B0BF" fontSize="9" fontFamily="monospace" fontWeight="bold">CELERY WORKERS</text>
    <text x="480" y="225" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Parallel Task Pipeline</text>

    {/* Tier 5: Scoring */}
    <rect x="240" y="255" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#FF7A45" strokeWidth="1.5" />
    <text x="300" y="273" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">SCORE ENGINE</text>
    <text x="300" y="285" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">0-100 Risk Tier</text>

    {/* Tier 6: UI Console */}
    <rect x="240" y="315" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#21304F" strokeWidth="1.5" />
    <text x="300" y="333" textAnchor="middle" fill="#A6B0BF" fontSize="9" fontFamily="monospace" fontWeight="bold">D3.JS CONSOLE</text>
    <text x="300" y="345" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Risk Viz Dashboard</text>

    {/* Orthogonal Connectors (Zero Crossovers) */}
    {/* Tier 1 Client -> Tier 2 Entry */}
    <path d="M 300 55 V 75" stroke="#7B8FA6" strokeWidth="1.2" markerEnd="url(#arrow)" />
    
    {/* Tier 2 Entry <-> Tier 2 Compliance (Dashed DPDPA Link) */}
    <path d="M 360 95 H 420" stroke="#EF4444" strokeWidth="1.2" strokeDasharray="2,2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />

    {/* Tier 2 Entry -> Tier 3 Broker (Async Event Publish) */}
    <path d="M 300 115 V 135" stroke="#FF7A45" strokeWidth="1.2" markerEnd="url(#arrow)" />

    {/* Tier 3 Broker -> Tier 4 Processing (Async Event Ingestion) */}
    <path d="M 240 155 H 120 V 195" stroke="#5B95F8" strokeWidth="1.2" markerEnd="url(#arrow)" />
    <path d="M 300 175 V 195" stroke="#5B95F8" strokeWidth="1.2" markerEnd="url(#arrow)" />
    <path d="M 360 155 H 480 V 195" stroke="#5B95F8" strokeWidth="1.2" markerEnd="url(#arrow)" />

    {/* Tier 4 Processing -> Tier 5 Scoring */}
    <path d="M 120 235 V 275 H 240" stroke="#7B8FA6" strokeWidth="1.2" markerEnd="url(#arrow)" />
    <path d="M 300 235 V 255" stroke="#9D74F7" strokeWidth="1.2" markerEnd="url(#arrow)" />
    <path d="M 480 235 V 275 H 360" stroke="#7B8FA6" strokeWidth="1.2" markerEnd="url(#arrow)" />

    {/* Tier 5 Scoring -> Tier 6 UI Console */}
    <path d="M 300 295 V 315" stroke="#FF7A45" strokeWidth="1.2" markerEnd="url(#arrow)" />

    {/* Legend */}
    <g transform="translate(15, 362)" font-family="monospace" font-size="7" fill="#7B8FA6">
      <line x1="0" y1="3" x2="20" y2="3" stroke="#7B8FA6" strokeWidth="1.2" />
      <text x="25" y="6">solid = sync call</text>
      
      <line x1="120" y1="3" x2="140" y2="3" stroke="#FF7A45" strokeWidth="1.2" />
      <text x="145" y="6">orange = flow trigger</text>

      <line x1="260" y1="3" x2="280" y2="3" stroke="#5B95F8" strokeWidth="1.2" />
      <text x="285" y="6">blue = event ingest</text>
      
      <line x1="390" y1="3" x2="410" y2="3" stroke="#EF4444" strokeWidth="1" strokeDasharray="2,2" />
      <text x="415" y="6">dashed = compliance check</text>
    </g>
  </svg>
);

// Static SVG component for PlanWizz Architecture Diagram
const PlanWizzDiagram: React.FC<{ descriptionId: string }> = ({ descriptionId }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 600 240"
    role="img"
    aria-describedby={descriptionId}
    className="max-w-[600px] mx-auto text-text-primary"
  >
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7B8FA6" />
      </marker>
    </defs>

    {/* Tier 1: Client */}
    <rect x="240" y="15" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#7B8FA6" strokeWidth="1.5" />
    <text x="300" y="35" textAnchor="middle" fill="#A6B0BF" fontSize="9" fontFamily="monospace" fontWeight="bold">REACT FRONTEND</text>
    <text x="300" y="47" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Schedule Planner UI</text>

    {/* Tier 2: Core API */}
    <rect x="240" y="85" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#FF7A45" strokeWidth="1.5" />
    <text x="300" y="103" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">SPRING BOOT API</text>
    <text x="300" y="115" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">planwizz-core</text>

    {/* Tier 3: Ingestion & Engine Solvers */}
    <rect x="100" y="155" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#9D74F7" strokeWidth="1.5" />
    <text x="160" y="173" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">PDF PARSER</text>
    <text x="160" y="185" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Data Ingest Node</text>

    <rect x="380" y="155" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#22C55E" strokeWidth="1.5" />
    <text x="440" y="173" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">CSP ENGINE</text>
    <text x="440" y="185" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Constraint Solver</text>

    {/* Orthogonal Connectors */}
    {/* Tier 1 -> Tier 2 */}
    <path d="M 300 55 V 85" stroke="#7B8FA6" strokeWidth="1.2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
    
    {/* Tier 2 -> Tier 3 */}
    <path d="M 240 105 H 160 V 155" stroke="#FF7A45" strokeWidth="1.2" markerEnd="url(#arrow)" />
    <path d="M 360 105 H 440 V 155" stroke="#FF7A45" strokeWidth="1.2" markerEnd="url(#arrow)" />

    {/* Legend */}
    <g transform="translate(15, 222)" font-family="monospace" font-size="7" fill="#7B8FA6">
      <line x1="0" y1="3" x2="20" y2="3" stroke="#7B8FA6" strokeWidth="1.2" />
      <text x="25" y="6">solid = sync call</text>
      
      <line x1="120" y1="3" x2="140" y2="3" stroke="#FF7A45" strokeWidth="1.2" />
      <text x="145" y="6">orange = solver delegate</text>
    </g>
  </svg>
);

// Static SVG component for DunesDay Architecture Diagram
const DunesDayDiagram: React.FC<{ descriptionId: string }> = ({ descriptionId }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 600 240"
    role="img"
    aria-describedby={descriptionId}
    className="max-w-[600px] mx-auto text-text-primary"
  >
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#7B8FA6" />
      </marker>
    </defs>

    {/* Tier 1: Client */}
    <rect x="240" y="15" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#7B8FA6" strokeWidth="1.5" />
    <text x="300" y="35" textAnchor="middle" fill="#A6B0BF" fontSize="9" fontFamily="monospace" fontWeight="bold">REACT SPA</text>
    <text x="300" y="47" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">Tweaks &amp; Predictor UI</text>

    {/* Tier 2: API Entry */}
    <rect x="240" y="85" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#FF7A45" strokeWidth="1.5" />
    <text x="300" y="103" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">FASTAPI API</text>
    <text x="300" y="115" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">dunesday-service</text>

    {/* Tier 3: Model and Explainer */}
    <rect x="240" y="155" width="120" height="40" rx="4" fill="#0B0F1A" stroke="#22C55E" strokeWidth="1.5" />
    <text x="300" y="173" textAnchor="middle" fill="#F5F7FA" fontSize="9" fontFamily="monospace" fontWeight="bold">XGBOOST MODEL</text>
    <text x="300" y="185" textAnchor="middle" fill="#7B8FA6" fontSize="7" fontFamily="monospace">SHAP Explainable AI</text>

    {/* Connectors */}
    {/* Tier 1 -> Tier 2 */}
    <path d="M 300 55 V 85" stroke="#7B8FA6" strokeWidth="1.2" markerEnd="url(#arrow)" markerStart="url(#arrow)" />
    
    {/* Tier 2 -> Tier 3 */}
    <path d="M 300 125 V 155" stroke="#FF7A45" strokeWidth="1.2" markerEnd="url(#arrow)" />

    {/* Legend */}
    <g transform="translate(15, 222)" font-family="monospace" font-size="7" fill="#7B8FA6">
      <line x1="0" y1="3" x2="20" y2="3" stroke="#7B8FA6" strokeWidth="1.2" />
      <text x="25" y="6">solid = sync call</text>
      
      <line x1="120" y1="3" x2="140" y2="3" stroke="#FF7A45" strokeWidth="1.2" />
      <text x="145" y="6">orange = model query</text>
    </g>
  </svg>
);

export const Projects: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeProjectId, setActiveProjectId] = useState<string>("cinescope");

  // Smooth scroll to target hash on load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const planwizzHighlights = useMemo(
    () => [
      "Constraint Satisfaction Problem (CSP) based scheduling engine",
      "Automatic PDF parsing for enrollment data",
      "Clash-free timetable generation",
      "Support for hard constraints and user preferences",
      "Searchable course selection",
      "Responsive React interface",
      "Production-ready Spring Boot backend architecture",
    ],
    []
  );

  const devsecwatchHighlights = useMemo(
    () => [
      "Microservices architecture with API gateway proxy and background job delegation",
      "Asynchronous repository cloning and vulnerability scanning workflow",
      "RabbitMQ task coordination across scan, AI enrichment, and cancellation queues",
      "Python AI agent enricher powered by Groq's Llama-3.3-70b",
      "Upstash Redis caching layer preventing duplicate scanner API requests",
      "PostgreSQL Neon persistence of compiled scan reports",
      "RESTful API endpoints secured by JWT authentication",
      "WebSocket/STOMP gateway publishing live process updates to clients",
    ],
    []
  );

  const trinetraHighlights = useMemo(
    () => [
      "Multilayered transaction analyzer identifying retail purchasing fraud",
      "State-machine return claims manager integrated with Spring Boot APIs",
      "Redpanda Kafka-API messaging broker broadcasting events to parallel subscribers",
      "AI fraud engine running parallel EXIF, ELA, pHash, CLIP, and OCR detectors",
      "Graph database engine mapping fraud-ring connections using NetworkX",
      "Asynchronous tasks worker pipeline using Celery and Python workers",
      "Tiered scoring engine outputting unified risk indicators (0–100)",
      "DPDPA compliance layer enforcing data retention and manual review rules",
    ],
    []
  );

  const cinescopeHighlights = useMemo(
    () => [
      "Ingestion framework parsing large relational media datasets",
      "Entity relationship design mapping movies, genres, and directors",
      "JPA / Hibernate object-relational mapping logic",
      "Foundational single-node architecture optimized for relational queries",
      "MySQL transactional persistence with optimized indexing",
    ],
    []
  );

  const dunesdayHighlights = useMemo(
    () => [
      "Dual prediction: Opening Weekend and Total Revenue, using XGBoost",
      "Side-by-side comparison of two movies",
      "Explainable AI — surfaces the top 5 SHAP features driving each prediction",
      "Interactive \"tweak\" controls (budget, star power via crew) with instant re-prediction",
      "Dark-mode, glassmorphism UI",
    ],
    []
  );

  // Consolidated Projects Metadata list representing the sequence flow
  const projectsList = useMemo(() => [
    {
      id: "cinescope",
      title: "CineScope",
      description: "A Spring Boot project demonstrating relational dataset ingestion and handling via MySQL — the simpler, foundational counterpart.",
      tech: ["Spring Boot", "MySQL", "JPA/Hibernate"],
      highlights: cinescopeHighlights,
      hasDiagram: false,
      specs: [
        { label: "PRIMARY_DATABASE", value: "MySQL (Local/RDS)" },
        { label: "ORM_PROVIDER", value: "Hibernate JPA" },
        { label: "ARCHITECTURE", value: "Monolithic relational service" },
        { label: "LATENCY_RATING", value: "15 ms (Simulated)" }
      ],
      repoLink: "https://github.com/Sanjai-Quest/CineScope"
    },
    {
      id: "dunesday",
      title: "DunesDay",
      description: "A full-stack AI application to predict movie box office performance (Opening Weekend and Total Gross) and compare two movies side by side.",
      tech: ["XGBoost", "FastAPI", "React", "SHAP", "Recharts"],
      highlights: dunesdayHighlights,
      hasDiagram: true,
      altText: "Architecture diagram of DunesDay. A React Frontend (UI) communicates via REST with a FastAPI Backend, which runs prediction requests through an XGBoost model and calculates SHAP explainability values.",
      specs: [
        { label: "INTELLIGENCE_MODEL", value: "XGBoost (Scikit-Learn)" },
        { label: "EXPLAINABILITY", value: "SHAP Feature Analysis" },
        { label: "ARCHITECTURE", value: "FastAPI + React SPA" },
        { label: "DEPLOY_ENVIRONMENT", value: "Render PaaS" },
        { label: "MODEL_R2_TOTAL", value: "~0.87 (simulated)" },
        { label: "MODEL_R2_OPENING", value: "~0.84 (simulated)" }
      ],
      warning: "waking up the demo... The frontend and FastAPI backend are hosted on Render's free tier. The first request may take 20–50s to wake up the service instance from sleep. Note: R² figures are simulated/refined targets.",
      link: "https://dunesday-frontend-sm6b.onrender.com/",
      repoLink: "https://github.com/Sanjai-Quest/DunesDay_Pred"
    },
    {
      id: "devsecwatch",
      title: "DevSecWatch",
      description: "An AI-powered security vulnerability analysis platform built using a distributed microservices architecture.",
      tech: ["Spring Boot", "RabbitMQ", "PostgreSQL", "Redis", "FastAPI", "Groq LLM", "WebSocket", "OAuth2"],
      highlights: devsecwatchHighlights,
      hasDiagram: true,
      altText: "Architecture diagram of DevSecWatch. A React frontend communicates via REST and WebSockets to a Spring Boot API gateway. The API gateway delegates scan jobs to a RabbitMQ broker with three queues: scan-jobs, ai-enrichment, and scan-cancellation. Spring Boot worker services consume the scan jobs, clone GitHub repos, query a Redis cache, persist scan reports to PostgreSQL, and call a FastAPI Python AI Service. The AI Service queries the Groq Llama-3.3 LLM or falls back to the OSV/NVD vulnerabilities databases.",
      specs: [
        { label: "PRIMARY_DATABASE", value: "PostgreSQL (Neon)" },
        { label: "MESSAGE_QUEUE", value: "RabbitMQ (CloudAMPQ)" },
        { label: "CACHE_STORE", value: "Redis (Upstash)" },
        { label: "ARCHITECTURE", value: "Spring Microservices" },
        { label: "DEPLOY_ENVIRONMENT", value: "Docker Containers" },
        { label: "LATENCY_RATING", value: "47 ms (Simulated)" }
      ],
      repoLink: "https://github.com/Sanjai-Quest/DevSecWatch"
    },
    {
      id: "planwizz",
      title: "PlanWizz",
      description: "An intelligent timetable generation platform that transforms raw university enrollment PDFs into optimized, clash-free academic schedules.",
      tech: ["Spring Boot", "Java", "React", "Tailwind CSS", "PDF Processing", "CSP Algorithms"],
      highlights: planwizzHighlights,
      hasDiagram: true,
      altText: "Architecture diagram of PlanWizz. A React Frontend (UI) communicates via REST with a Spring Boot API core, which routes solving constraints to a CSP engine and parses raw documents with a PDF Parser.",
      specs: [
        { label: "PRIMARY_DATABASE", value: "In-Memory Store" },
        { label: "ARCHITECTURE", value: "Monolith Architecture" },
        { label: "DEPLOY_ENVIRONMENT", value: "Render PaaS" },
        { label: "LATENCY_RATING", value: "12 ms" }
      ],
      warning: "waking up the demo... This service is hosted on a free-tier plan. The first request may take 20–50s to wake up the service instance from sleep.",
      link: "https://planwizz-frontend-2x1o.onrender.com/",
      repoLink: "https://github.com/Sanjai-Quest"
    },
    {
      id: "trinetra",
      title: "TriNetra AI",
      description: "A multilayered fraud detection system developed for retail environments to identify suspicious purchasing behaviour.",
      tech: ["Spring Boot", "Kafka (Redpanda)", "FastAPI", "NetworkX", "Celery", "D3.js", "DPDPA compliance"],
      highlights: trinetraHighlights,
      hasDiagram: true,
      altText: "Architecture diagram of TriNetra AI return fraud detection. Customer portals submit return claim claims to a Spring Boot Return API state machine. Events are published to a Redpanda Kafka-API broker. Three parallel consumers ingest these events: a FastAPI fraud engine with six parallel detectors (ELA, EXIF, pHash, CLIP, OCR, Behavior), a NetworkX graph analysis service mapping fraud rings, and Celery background workers. The fraud engine and graph outputs feed a tier-based score engine (0 to 100). The scores feed a D3.js ring graph admin dashboard. A DPDPA compliance layer manages consent, logs, and data retention.",
      specs: [
        { label: "PRIMARY_DATABASE", value: "PostgreSQL" },
        { label: "INTELLIGENCE_MODEL", value: "AI-driven Purchasing Analysis" },
        { label: "RECOGNITION", value: "🥈 HackHustle 2.0 2nd Prize" },
        { label: "ARCHITECTURE", value: "Event Broker Interface" },
        { label: "TEAM_COLLABORATION", value: "Multi-tier Security Ops" },
        { label: "LATENCY_RATING", value: "35 ms (Simulated)" }
      ],
      repoLink: "https://github.com/Sanjai-Quest/TriNetra-AI"
    }
  ], [planwizzHighlights, devsecwatchHighlights, trinetraHighlights, cinescopeHighlights, dunesdayHighlights]);

  const activeProject = useMemo(() => {
    return projectsList.find((p) => p.id === activeProjectId) || projectsList[0];
  }, [activeProjectId, projectsList]);

  return (
    <div className="space-y-12">
      <Helmet>
        <title>Projects — Sanjai L</title>
        <meta
          name="description"
          content="Real backend engineering projects by Sanjai L: PlanWizz (CSP scheduling), DevSecWatch (vulnerability scanning microservices), TriNetra AI (fraud detection), DunesDay (XGBoost box-office prediction), CineScope (Spring Boot / MySQL)."
        />
        <meta property="og:title" content="Projects — Sanjai L" />
        <meta
          property="og:description"
          content="Backend engineering projects: PlanWizz, DevSecWatch, TriNetra AI, DunesDay, CineScope. Spring Boot, RabbitMQ, Redis, Python, XGBoost, FastAPI."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sanjai.dev/projects" />
      </Helmet>

      {/* Scoped CSS Keyframes for decorative traveling dot along connector line */}
      <style>{`
        @keyframes travel-horizontal {
          0% { left: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes travel-vertical {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

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
              GET /projects (catalog_service_fetch)
            </span>
          </div>
          <h1 className="font-mono text-xl md:text-3xl font-bold tracking-tight text-text-primary uppercase">
            Service Inventory — Catalog
          </h1>
          <p className="text-text-muted text-xs font-mono max-w-xl">
            RESOLVING REGISTERED CLUSTER SERVICES: 5 STACK NODES ONLINE
          </p>
        </div>
      </section>

      {/* 2. Interactive Pipeline Flow Sequence */}
      <section className="space-y-6 relative">
        <SectionHeader title="Active Deployment Pipeline" eyebrow="GET /pipeline_topology" />
        
        <div className="relative py-8 my-4">
          {/* Connector Line - Runs through the vertical/horizontal center of the cards */}
          <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-border-primary/40 -translate-y-1/2 z-0 hidden lg:block" aria-hidden="true">
            {!shouldReduceMotion && (
              <div
                className="absolute top-0 bottom-0 w-3 bg-signature rounded-full blur-[2px]"
                style={{ animation: "travel-horizontal 8s linear infinite" }}
              />
            )}
          </div>
          <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-border-primary/40 -translate-x-1/2 z-0 lg:hidden" aria-hidden="true">
            {!shouldReduceMotion && (
              <div
                className="absolute left-0 right-0 h-3 bg-signature rounded-full blur-[2px]"
                style={{ animation: "travel-vertical 8s linear infinite" }}
              />
            )}
          </div>

          {/* Cards Grid representing sequence */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
            {projectsList.map((project) => {
              const isActive = activeProjectId === project.id;
              return (
                <div
                  key={project.id}
                  onClick={() => setActiveProjectId(project.id)}
                  className={`transition-all duration-300 rounded-lg cursor-pointer ${
                    isActive ? "ring-2 ring-signature shadow-glow-hover" : "opacity-80 hover:opacity-100 hover:scale-[1.01] hover:shadow-glow-hover"
                  }`}
                >
                  <ServiceCard
                    title={project.title}
                    description={project.description}
                    tech={project.tech}
                    status={isActive ? "Active" : "Online"}
                    onInspect={() => setActiveProjectId(project.id)}
                    inspectLabel={isActive ? "Inspecting Node" : "Inspect Node"}
                    link={project.link}
                    repoLink={project.repoLink}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Detailed Inspection Panel */}
      <section className="space-y-4">
        <div className="border border-border-primary rounded-xl p-6 md:p-8 bg-section-dark relative text-left">
          {/* Schematic brackets adjusted to wrap perfectly around rounded-xl border */}
          <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-signature rounded-tl-xl opacity-75"></div>
          <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-signature rounded-tr-xl opacity-75"></div>
          <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-signature rounded-bl-xl opacity-75"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-signature rounded-br-xl opacity-75"></div>

          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border-primary/30 pb-4">
              <div>
                <span className="font-mono text-[9px] text-signature tracking-widest uppercase mb-1 block">
                  [active-pipeline-inspect]
                </span>
                <h2 className="font-mono text-base md:text-lg font-bold text-text-primary uppercase tracking-tight">
                  {activeProject.title} — Microservice Specifications
                </h2>
              </div>
              <div className="flex items-center space-x-2 mt-2 md:mt-0 select-none">
                {activeProject.link && (
                  <a
                    href={activeProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] font-bold text-status-success hover:underline flex items-center gap-1.5 border border-status-success/30 bg-status-success/5 px-2.5 py-1.5 rounded transition-all"
                  >
                    <span>Launch Live Demo</span>
                  </a>
                )}
                {activeProject.repoLink && (
                  <a
                    href={activeProject.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] font-bold text-status-info hover:underline flex items-center gap-1.5 border border-status-info/30 bg-status-info/5 px-2.5 py-1.5 rounded transition-all"
                  >
                    <span>View GitHub Repo</span>
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left & Center: Highlights and Diagrams */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-status-info" />
                    <span>Deployment Metrics &amp; Highlights</span>
                  </h4>
                  <ul className="text-xs text-text-secondary space-y-2 list-disc list-inside pl-1 leading-relaxed">
                    {activeProject.highlights.map((highlight, idx) => (
                      <li key={idx} className="marker:text-signature">{highlight}</li>
                    ))}
                  </ul>
                </div>

                {/* Conditionally render static SVG diagrams */}
                {activeProject.hasDiagram && (
                  <div className="pt-6 border-t border-border-primary/30 space-y-3">
                    <h4 className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <Server className="w-3.5 h-3.5 text-status-async" />
                      <span>Cluster Service Architecture Diagram</span>
                    </h4>
                    <div className="border border-border-primary/50 bg-card-bg p-4 rounded-lg overflow-x-auto relative">
                      <div className="absolute top-2 left-3 font-mono text-[8px] text-text-muted uppercase select-none">
                        Schematic Visualization (Static SVG - Zero Bundle Weight)
                      </div>
                      <div className="pt-3">
                        {activeProject.id === "devsecwatch" ? (
                          <DevSecWatchDiagram descriptionId="ds-desc" />
                        ) : activeProject.id === "trinetra" ? (
                          <TriNetraDiagram descriptionId="tn-desc" />
                        ) : activeProject.id === "planwizz" ? (
                          <PlanWizzDiagram descriptionId="pw-desc" />
                        ) : (
                          <DunesDayDiagram descriptionId="dd-desc" />
                        )}
                      </div>
                      <div id={
                        activeProject.id === "devsecwatch" ? "ds-desc" :
                        activeProject.id === "trinetra" ? "tn-desc" :
                        activeProject.id === "planwizz" ? "pw-desc" : "dd-desc"
                      } className="sr-only">
                        {activeProject.altText}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right: Specifications and Warning Block */}
              <div className="lg:col-span-1 space-y-6">
                <div className="space-y-2">
                  <h4 className="font-mono text-xs font-bold text-text-primary uppercase tracking-wider flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-status-mutation" />
                    <span>Container Metadata Specs</span>
                  </h4>
                  <div className="text-[11px] font-mono space-y-2 bg-card-bg border border-border-primary/40 p-4 rounded-lg text-text-muted">
                    {activeProject.specs.map((spec, idx) => (
                      <div key={idx} className="flex justify-between border-b border-border-primary/20 pb-1.5 last:border-b-0 last:pb-0">
                        <span className="uppercase">{spec.label}:</span>
                        <span className="text-text-secondary">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {activeProject.warning && (
                  <div className="bg-status-warning/5 border border-status-warning/30 rounded p-4 text-[10px] md:text-[11px] text-status-warning leading-relaxed font-mono">
                    <strong>[Free-Tier Cluster Notice]</strong>
                    <p className="mt-1">{activeProject.warning}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Global Inventory Disclaimer */}
      <section className="text-left">
        <InfoCard title="Cluster Service Architecture Notice" icon={Server}>
          <p className="text-xs text-text-secondary leading-relaxed">
            These cataloged microservices operate inside independent runtimes separate from this portfolio web app. Caching latencies and response events simulated across this UI catalog demonstrate integration and data configurations. Refer to the GitHub links to check code implementations.
          </p>
        </InfoCard>
      </section>
    </div>
  );
};
