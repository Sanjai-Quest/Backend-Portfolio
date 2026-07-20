import React, { useState, useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { ReactFlow, Background, ReactFlowProvider, useReactFlow, type Node, type Edge } from "@xyflow/react";
import { useReducedMotion } from "framer-motion";
import { Database, Server, Send, Layers, AlertTriangle } from "lucide-react";

// Import xyflow styles
import "@xyflow/react/dist/style.css";

// Import custom components
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";
import { StatusBadge } from "../components/StatusBadge";
import { RequestPacket } from "../components/RequestPacket";
import { TerminalLog } from "../components/TerminalLog";
import type { LogItem } from "../components/TerminalLog";
import { BlueprintNode } from "../components/BlueprintNode";

// Custom inline SVG icons for social layout compatibility
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

// Define custom node component wrapper for React Flow topology
const nodeTypes = {
  blueprint: BlueprintNode,
};

type TopologyType = "RUNTIME" | "PLANWIZZ" | "DEVSECWATCH" | "TRINETRA" | "DUNESDAY";

interface CustomTopologyNode {
  id: string;
  data: {
    label: string;
    subtitle?: string;
    status?: string;
    details?: {
      whatIs: string;
      whatFor: string;
    };
  };
}

const TopologyMapPanel: React.FC<{
  activeTab: TopologyType;
  activeNodes: Node[];
  activeEdges: Edge[];
}> = ({ activeTab, activeNodes, activeEdges }) => {
  const { setNodes } = useReactFlow();
  const [selectedNode, setSelectedNode] = useState<CustomTopologyNode | null>(null);

  // Clear selection on tab switch
  useEffect(() => {
    setSelectedNode(null);
  }, [activeTab]);

  return (
    <div className={`border border-border-primary rounded-xl bg-card-bg relative overflow-hidden flex flex-row transition-all duration-300 ${{
        TRINETRA:    "h-[680px]",
        RUNTIME:     "h-[440px]",
        DEVSECWATCH: "h-[440px]",
        PLANWIZZ:    "h-[360px]",
        DUNESDAY:    "h-[360px]",
      }[activeTab]}`}>
      <div className="flex-1 relative h-full">
        <div className="absolute top-2 left-3 font-mono text-[9px] text-text-muted select-none uppercase z-10">
          Topology Map: {activeTab === "RUNTIME" ? "Self System Container" : `${activeTab.toLowerCase()}.internal`}
        </div>
        <ReactFlow
          key={activeTab}
          nodes={activeNodes}
          edges={activeEdges}
          nodeTypes={nodeTypes}
          onSelectionChange={({ nodes }) => {
            if (nodes.length > 0) {
              setSelectedNode(nodes[0] as unknown as CustomTopologyNode);
            } else {
              setSelectedNode(null);
            }
          }}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.2}
          maxZoom={1.5}
          preventScrolling={false}
          nodesDraggable={false}
          nodesConnectable={false}
          zoomOnScroll={false}
          zoomOnDoubleClick={false}
          zoomOnPinch={false}
          panOnScroll={false}
          panOnDrag={false}
        >
          <Background color="var(--color-bg-primary)" gap={16} size={1} />
        </ReactFlow>
      </div>

      {/* Right-hand detailed sidebar popover */}
      {selectedNode && selectedNode.data?.details && (
        <div className="w-72 border-l border-signature/30 bg-bg-primary h-full p-5 z-50 flex flex-col gap-4 text-left font-mono relative select-text overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-border-primary pb-3 gap-2">
            <span className="font-bold text-xs text-signature uppercase tracking-wider leading-tight">
              {selectedNode.data.label}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNode(null);
                setNodes((nodes) =>
                  nodes.map((n) => ({ ...n, selected: false }))
                );
              }}
              className="text-[10px] text-text-muted hover:text-text-primary transition-colors focus:outline-none cursor-pointer shrink-0 mt-0.5"
              title="Close Details"
            >
              [X]
            </button>
          </div>
          {/* What is */}
          <div className="space-y-1">
            <span className="text-[9px] text-signature/80 uppercase font-bold tracking-widest block">What it is</span>
            <p className="text-[11px] text-text-primary leading-relaxed">{selectedNode.data.details.whatIs}</p>
          </div>
          {/* What for */}
          <div className="space-y-1">
            <span className="text-[9px] text-signature/80 uppercase font-bold tracking-widest block">What it does here</span>
            <p className="text-[11px] text-text-secondary leading-relaxed">{selectedNode.data.details.whatFor}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const Architecture: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<TopologyType>("RUNTIME");

  // ==========================================
  const topologyData = useMemo(() => {
    return {
      RUNTIME: {
        nodes: [
          {
            id: "client",
            type: "blueprint",
            data: {
              label: "Client Edge",
              subtitle: "Web Browser",
              details: {
                whatIs: "React and TypeScript single-page application executing inside the browser environment.",
                whatFor: "Serves as the frontend edge, parsing URL paths, managing local UI states, and rendering visual telemetry components."
              }
            },
            position: { x: 280, y: 10 }
          },
          {
            id: "gateway",
            type: "blueprint",
            data: {
              label: "API Gateway",
              subtitle: "gateway.internal",
              status: "Healthy",
              details: {
                whatIs: "An edge proxy routing controller handling incoming client requests.",
                whatFor: "Acts as the unified point of entry, proxying page requests and telemetry payloads downstream to backend hosts."
              }
            },
            position: { x: 280, y: 100 }
          },
          {
            id: "cache",
            type: "blueprint",
            data: {
              label: "Distributed Cache",
              subtitle: "redis.internal",
              status: "Healthy",
              details: {
                whatIs: "An in-memory key-value database buffer powered by Redis.",
                whatFor: "Caches service records and static inventory payloads to bypass PostgreSQL queries and minimize response latency."
              }
            },
            position: { x: 80, y: 190 }
          },
          {
            id: "catalog",
            type: "blueprint",
            data: {
              label: "Service Catalog",
              subtitle: "catalog.internal",
              status: "Healthy",
              details: {
                whatIs: "An administrative service controller managing project configuration metadata.",
                whatFor: "Decouples query routes, keeps registry configurations synced, and triggers message buffers when status changes occur."
              }
            },
            position: { x: 280, y: 190 }
          },
          {
            id: "db",
            type: "blueprint",
            data: {
              label: "PostgreSQL",
              subtitle: "postgres.internal",
              status: "Healthy",
              details: {
                whatIs: "A relational database management storage system.",
                whatFor: "Maintains structured repository records, logs persistent deployment stats, and tracks static metadata records."
              }
            },
            position: { x: 480, y: 190 }
          },
          {
            id: "queue",
            type: "blueprint",
            data: {
              label: "Message Queue",
              subtitle: "rabbitmq.internal",
              status: "Healthy",
              details: {
                whatIs: "A reliable message broker exchange utilizing RabbitMQ.",
                whatFor: "Decouples task scheduling by holding heavy catalog scan jobs until background processing instances can consume them."
              }
            },
            position: { x: 180, y: 290 }
          },
          {
            id: "events",
            type: "blueprint",
            data: {
              label: "Event Pipeline",
              subtitle: "kafka.internal",
              status: "Healthy",
              details: {
                whatIs: "An event broker log distributor powered by Kafka.",
                whatFor: "Publishes high-frequency transaction updates, pipeline telemetry packets, and log streams for the admin views."
              }
            },
            position: { x: 380, y: 290 }
          },
        ],
        edges: [
          { id: "e1", source: "client", target: "gateway", type: "smoothstep", animated: !shouldReduceMotion, style: { stroke: "#5B95F8", strokeWidth: 1.5 } },
          { id: "e2", source: "gateway", target: "cache", type: "smoothstep", style: { stroke: "#21304F", strokeWidth: 1.5 } },
          { id: "e3", source: "gateway", target: "catalog", type: "smoothstep", style: { stroke: "#5B95F8", strokeWidth: 1.5 } },
          { id: "e4", source: "gateway", target: "db", type: "smoothstep", style: { stroke: "#21304F", strokeWidth: 1.5 } },
          { id: "e5", source: "catalog", target: "queue", type: "smoothstep", style: { stroke: "#21304F", strokeDasharray: "4", strokeWidth: 1.5 } },
          { id: "e6", source: "catalog", target: "events", type: "smoothstep", style: { stroke: "#21304F", strokeDasharray: "4", strokeWidth: 1.5 } },
        ],
      },
      PLANWIZZ: {
        nodes: [
          {
            id: "client",
            type: "blueprint",
            data: {
              label: "React Frontend",
              subtitle: "Web UI",
              details: {
                whatIs: "A React browser single-page application interface.",
                whatFor: "Accepts course PDF syllabus uploads and lets students configure schedule constraint requirements."
              }
            },
            position: { x: 280, y: 10 }
          },
          {
            id: "api",
            type: "blueprint",
            data: {
              label: "Spring Boot API",
              subtitle: "planwizz-core",
              status: "Healthy",
              details: {
                whatIs: "The core backend API engine built using Spring Boot.",
                whatFor: "Receives raw document payloads and delegates scheduling constraint calculations to the CSP engine."
              }
            },
            position: { x: 280, y: 100 }
          },
          {
            id: "parser",
            type: "blueprint",
            data: {
              label: "PDF Parser",
              subtitle: "Data Ingestion",
              details: {
                whatIs: "A document scanner extracting text structured elements from PDF files.",
                whatFor: "Parses course curriculum codes, lecture periods, and department names out of raw PDFs."
              }
            },
            position: { x: 140, y: 200 }
          },
          {
            id: "csp",
            type: "blueprint",
            data: {
              label: "CSP Engine",
              subtitle: "Schedule Solver",
              details: {
                whatIs: "A constraint satisfaction solver executing backtracking search heuristics.",
                whatFor: "Processes parsed JSON course records to compute optimized, clash-free timetables matching student preferences."
              }
            },
            position: { x: 420, y: 200 }
          },
        ],
        edges: [
          { id: "e1", source: "client", target: "api", type: "smoothstep", animated: !shouldReduceMotion, style: { stroke: "#5B95F8", strokeWidth: 1.5 } },
          { id: "e2", source: "api", target: "parser", type: "smoothstep", style: { stroke: "#21304F", strokeWidth: 1.5 } },
          { id: "e3", source: "api", target: "csp", type: "smoothstep", style: { stroke: "#5B95F8", strokeWidth: 1.5 } },
        ],
      },
      DEVSECWATCH: {
        nodes: [
          {
            id: "client",
            type: "blueprint",
            data: {
              label: "Vite Client",
              subtitle: "Browser UI",
              details: {
                whatIs: "A React single-page frontend leveraging TypeScript.",
                whatFor: "Maintains active WebSocket links to show code scanning logs and AI vulnerability summaries live."
              }
            },
            position: { x: 280, y: 10 }
          },
          {
            id: "api",
            type: "blueprint",
            data: {
              label: "Gateway API",
              subtitle: "devsecwatch-core",
              status: "Healthy",
              details: {
                whatIs: "A Spring Boot API Gateway microservice running on port 8080.",
                whatFor: "Provides secure endpoint authentication, validates scan tokens, and publishes requests to RabbitMQ."
              }
            },
            position: { x: 280, y: 100 }
          },
          {
            id: "redis",
            type: "blueprint",
            data: {
              label: "Redis Cache",
              subtitle: "Scan Cache",
              details: {
                whatIs: "An in-memory Redis caching node running on port 6379.",
                whatFor: "Stores rate-limiting metrics and scan report summaries to bypass heavy compilation checks on recurring scans."
              }
            },
            position: { x: 80, y: 190 }
          },
          {
            id: "rabbitmq",
            type: "blueprint",
            data: {
              label: "RabbitMQ",
              subtitle: "Broker Exchange",
              status: "Healthy",
              details: {
                whatIs: "An asynchronous message broker exchange handling scan queues on port 5672.",
                whatFor: "Orchestrates scan-jobs and scan-cancellation channels, buffering jobs so the Gateway is not blocked."
              }
            },
            position: { x: 280, y: 190 }
          },
          {
            id: "postgres",
            type: "blueprint",
            data: {
              label: "PostgreSQL",
              subtitle: "Scan Database",
              details: {
                whatIs: "A relational database storage engine running on port 5433.",
                whatFor: "Holds persistent user accounts, repository registration details, and permanent vulnerability scan reports."
              }
            },
            position: { x: 480, y: 190 }
          },
          {
            id: "semgrep",
            type: "blueprint",
            data: {
              label: "Semgrep Worker",
              subtitle: "Code Scanner",
              details: {
                whatIs: "A Spring Boot scanning microservice worker running on port 8081.",
                whatFor: "Pulls scan jobs, clones repository files, runs Semgrep scanning rules, and persists vulnerabilities found."
              }
            },
            position: { x: 280, y: 280 }
          },
          {
            id: "groq",
            type: "blueprint",
            data: {
              label: "Groq AI Agent",
              subtitle: "Explain Findings",
              details: {
                whatIs: "A FastAPI Python service wrapper running on port 8000.",
                whatFor: "Interfaces with Groq's Llama model to summarize vulnerabilities and provide developers with clean fixes."
              }
            },
            position: { x: 480, y: 280 }
          },
        ],
        edges: [
          { id: "e1", source: "client", target: "api", type: "smoothstep", animated: !shouldReduceMotion, style: { stroke: "#5B95F8", strokeWidth: 1.5 } },
          { id: "e2", source: "api", target: "redis", type: "smoothstep", style: { stroke: "#7B8FA6", strokeWidth: 1.5 } },
          { id: "e3", source: "api", target: "rabbitmq", type: "smoothstep", style: { stroke: "#FF7A45", strokeWidth: 1.5 } },
          { id: "e4", source: "api", target: "postgres", type: "smoothstep", style: { stroke: "#7B8FA6", strokeWidth: 1.5 } },
          { id: "e5", source: "rabbitmq", target: "semgrep", type: "smoothstep", animated: !shouldReduceMotion, style: { stroke: "#5B95F8", strokeWidth: 1.5 } },
          { id: "e6", source: "semgrep", target: "groq", type: "smoothstep", style: { stroke: "#7B8FA6", strokeWidth: 1.5 } },
          { id: "e7", source: "semgrep", target: "redis", type: "smoothstep", style: { stroke: "#7B8FA6", strokeDasharray: "4", strokeWidth: 1.2 } },
          { id: "e8", source: "semgrep", target: "postgres", type: "smoothstep", style: { stroke: "#7B8FA6", strokeDasharray: "4", strokeWidth: 1.2 } },
        ],
      },
      TRINETRA: {
        nodes: [
          {
            id: "portal",
            type: "blueprint",
            data: {
              label: "Customer Portal",
              subtitle: "Claims Intake UI",
              details: {
                whatIs: "A retail checkout application interface.",
                whatFor: "Submits purchase data and return requests to Traefik for fraud validation processing."
              }
            },
            position: { x: 100, y: 10 }
          },
          {
            id: "dashboard",
            type: "blueprint",
            data: {
              label: "Admin Dashboard",
              subtitle: "D3.js Risk Console",
              details: {
                whatIs: "An administrative visual monitoring application.",
                whatFor: "Renders active fraud rings and maps suspicious transaction clusters using a D3.js console."
              }
            },
            position: { x: 460, y: 10 }
          },
          {
            id: "gateway",
            type: "blueprint",
            data: {
              label: "API Gateway (Traefik)",
              subtitle: "Edge Routing Proxy",
              status: "Healthy",
              details: {
                whatIs: "A reverse proxy and request router powered by Traefik.",
                whatFor: "Acts as the single external gateway entry point routing return traffic downstream."
              }
            },
            position: { x: 280, y: 100 }
          },
          {
            id: "return-api",
            type: "blueprint",
            data: {
              label: "Return API",
              subtitle: "Spring Boot State Machine",
              details: {
                whatIs: "A return management state machine built using Spring Boot.",
                whatFor: "Tracks claim lifecycles and publishes transaction events downstream to the Redpanda queue."
              }
            },
            position: { x: 80, y: 190 }
          },
          {
            id: "fraud-engine",
            type: "blueprint",
            data: {
              label: "Fraud Engine",
              subtitle: "FastAPI / 6 Detectors",
              details: {
                whatIs: "A Python fraud evaluation backend built in FastAPI.",
                whatFor: "Runs image EXIF metadata checks, error level analysis (ELA), and behavior checks on incoming return details."
              }
            },
            position: { x: 280, y: 190 }
          },
          {
            id: "graph-service",
            type: "blueprint",
            data: {
              label: "Graph Service",
              subtitle: "FastAPI / NetworkX",
              details: {
                whatIs: "A network graph analytics engine utilizing NetworkX.",
                whatFor: "Analyzes merchant transactions to spot ring returns and suspect circular account paths."
              }
            },
            position: { x: 480, y: 190 }
          },
          {
            id: "event-stream",
            type: "blueprint",
            data: {
              label: "Event Stream (Redpanda)",
              subtitle: "Kafka-Compatible Broker",
              status: "Healthy",
              details: {
                whatIs: "A high-performance event streaming message queue.",
                whatFor: "Streams raw claim events to background Celery workers for parallel processing."
              }
            },
            position: { x: 280, y: 280 }
          },
          {
            id: "workers",
            type: "blueprint",
            data: {
              label: "5 Fraud Workers (Celery)",
              subtitle: "Parallel Ingestion",
              details: {
                whatIs: "Concurrent task processors managed via Celery.",
                whatFor: "Ingest event messages and execute heavy image scanning, receipt checks, and behavioral analysis tasks in parallel."
              }
            },
            position: { x: 280, y: 370 }
          },
          {
            id: "aggregator",
            type: "blueprint",
            data: {
              label: "Score Aggregator",
              subtitle: "0 - 100 Risk Engine",
              details: {
                whatIs: "An analytical scoring module combining security metrics.",
                whatFor: "Merges inputs from fraud models and graph checkers to yield a consolidated risk value."
              }
            },
            position: { x: 280, y: 460 }
          },
          {
            id: "redis",
            type: "blueprint",
            data: {
              label: "Redis (results)",
              subtitle: "Temporary Cache Store",
              details: {
                whatIs: "An in-memory key-value database buffer.",
                whatFor: "Caches calculated fraud check outputs for instant retrieval by dashboard consoles."
              }
            },
            position: { x: 100, y: 550 }
          },
          {
            id: "postgres",
            type: "blueprint",
            data: {
              label: "PostgreSQL (persistent)",
              subtitle: "Immutable Audit Logs",
              details: {
                whatIs: "A persistent relational database management system.",
                whatFor: "Stores historic return invoices and audit trails required under DPDPA privacy compliance guidelines."
              }
            },
            position: { x: 460, y: 550 }
          },
          {
            id: "monitoring",
            type: "blueprint",
            data: {
              label: "Prometheus + Grafana",
              subtitle: "Observability Badge",
              details: {
                whatIs: "An independent metrics dashboard pipeline.",
                whatFor: "Tracks broker processing latency and monitors cluster performance without blocking event transactions."
              }
            },
            position: { x: 500, y: 280 }
          },
        ],
        edges: [
          { id: "e1", source: "portal", target: "gateway", type: "smoothstep", animated: !shouldReduceMotion, style: { stroke: "#7B8FA6", strokeWidth: 1.5 } },
          { id: "e2", source: "dashboard", target: "gateway", type: "smoothstep", animated: !shouldReduceMotion, style: { stroke: "#7B8FA6", strokeWidth: 1.5 } },
          { id: "e3", source: "gateway", target: "return-api", type: "smoothstep", style: { stroke: "#FF7A45", strokeWidth: 1.5 } },
          { id: "e4", source: "gateway", target: "fraud-engine", type: "smoothstep", style: { stroke: "#FF7A45", strokeWidth: 1.5 } },
          { id: "e5", source: "gateway", target: "graph-service", type: "smoothstep", style: { stroke: "#FF7A45", strokeWidth: 1.5 } },
          { id: "e6", source: "return-api", target: "event-stream", type: "smoothstep", style: { stroke: "#7B8FA6", strokeWidth: 1.5 } },
          { id: "e7", source: "fraud-engine", target: "event-stream", type: "smoothstep", style: { stroke: "#7B8FA6", strokeWidth: 1.5 } },
          { id: "e8", source: "graph-service", target: "event-stream", type: "smoothstep", style: { stroke: "#7B8FA6", strokeWidth: 1.5 } },
          { id: "e9", source: "event-stream", target: "workers", type: "smoothstep", animated: !shouldReduceMotion, style: { stroke: "#5B95F8", strokeWidth: 1.5 } },
          { id: "e10", source: "workers", target: "aggregator", type: "smoothstep", animated: !shouldReduceMotion, style: { stroke: "#5B95F8", strokeWidth: 1.5 } },
          { id: "e11", source: "aggregator", target: "redis", type: "smoothstep", style: { stroke: "#FF7A45", strokeWidth: 1.5 } },
          { id: "e12", source: "aggregator", target: "postgres", type: "smoothstep", style: { stroke: "#FF7A45", strokeWidth: 1.5 } },
          { id: "e13", source: "monitoring", target: "event-stream", type: "smoothstep", style: { stroke: "#EF4444", strokeDasharray: "4", strokeWidth: 1.2 } },
        ],
      },
      DUNESDAY: {
        nodes: [
          {
            id: "client",
            type: "blueprint",
            data: {
              label: "React SPA",
              subtitle: "Tweaks & Predictor UI",
              details: {
                whatIs: "A browser-based client application powered by React and Recharts.",
                whatFor: "Provides interactive parameter sliders (budget, cast) and sends predictions down to the FastAPI server."
              }
            },
            position: { x: 280, y: 10 }
          },
          {
            id: "api",
            type: "blueprint",
            data: {
              label: "FastAPI API",
              subtitle: "dunesday-service",
              status: "Healthy",
              details: {
                whatIs: "A high-performance Python web framework API.",
                whatFor: "Serves prediction request interfaces and routes attributes directly to the box-office models."
              }
            },
            position: { x: 280, y: 110 }
          },
          {
            id: "model",
            type: "blueprint",
            data: {
              label: "XGBoost Model",
              subtitle: "SHAP Explainable AI",
              details: {
                whatIs: "An ensemble ML model and SHAP feature importance processor.",
                whatFor: "Runs box-office calculations using XGBoost and computes explainable SHAP values in response to client inputs."
              }
            },
            position: { x: 280, y: 210 }
          },
        ],
        edges: [
          { id: "e1", source: "client", target: "api", type: "smoothstep", animated: !shouldReduceMotion, style: { stroke: "#5B95F8", strokeWidth: 1.5 } },
          { id: "e2", source: "api", target: "model", type: "smoothstep", style: { stroke: "#21304F", strokeWidth: 1.5 } },
        ],
      },
    };
  }, [shouldReduceMotion]);

  // ==========================================
  // 2. CACHE HIT/MISS SIMULATION
  // ==========================================
  const [cacheState, setCacheState] = useState<"IDLE" | "MISS_RUNNING" | "HIT_RUNNING">("IDLE");
  const [cacheResult, setCacheResult] = useState<"IDLE" | "MISS" | "HIT">("IDLE");
  const [cacheLogs, setCacheLogs] = useState<string>("SYSTEM_IDLE: Awaiting cache request check.");
  const [cacheLatency, setCacheLatency] = useState<number | null>(null);
  const [cacheActiveNode, setCacheActiveNode] = useState<"NONE" | "CLIENT" | "REDIS" | "DB">("NONE");

  // Client -> Cache coordinates
  const cacheClientRef = useRef<HTMLDivElement>(null);
  const cacheRedisRef = useRef<HTMLDivElement>(null);
  const cacheDbRef = useRef<HTMLDivElement>(null);

  const [coordsClient, setCoordsClient] = useState({ x: 0, y: 0 });
  const [coordsRedis, setCoordsRedis] = useState({ x: 0, y: 0 });
  const [coordsDb, setCoordsDb] = useState({ x: 0, y: 0 });

  // Anim stage refs for packet flow mapping
  const [cacheAnimStage, setCacheAnimStage] = useState<"NONE" | "CLIENT_TO_REDIS" | "REDIS_TO_DB" | "DB_TO_REDIS" | "REDIS_TO_CLIENT">("NONE");

  const updateCacheCoords = () => {
    if (cacheClientRef.current && cacheRedisRef.current && cacheDbRef.current) {
      const cRect = cacheClientRef.current.getBoundingClientRect();
      const rRect = cacheRedisRef.current.getBoundingClientRect();
      const dRect = cacheDbRef.current.getBoundingClientRect();
      const parentRect = cacheClientRef.current.parentElement?.getBoundingClientRect() || { left: 0, top: 0 };

      setCoordsClient({
        x: cRect.left - parentRect.left + cRect.width / 2,
        y: cRect.top - parentRect.top + cRect.height / 2,
      });
      setCoordsRedis({
        x: rRect.left - parentRect.left + rRect.width / 2,
        y: rRect.top - parentRect.top + rRect.height / 2,
      });
      setCoordsDb({
        x: dRect.left - parentRect.left + dRect.width / 2,
        y: dRect.top - parentRect.top + dRect.height / 2,
      });
    }
  };

  useEffect(() => {
    updateCacheCoords();
    const timer = setTimeout(updateCacheCoords, 200);
    window.addEventListener("resize", updateCacheCoords);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateCacheCoords);
    };
  }, []);

  const triggerCacheRequest = (type: "MISS" | "HIT") => {
    if (cacheState !== "IDLE") return;
    setCacheResult("IDLE");

    if (shouldReduceMotion) {
      if (type === "MISS") {
        setCacheResult("MISS");
        setCacheLatency(1200);
        setCacheLogs("Cache Miss. Read from postgres.internal. Stored records in memory.");
      } else {
        setCacheResult("HIT");
        setCacheLatency(80);
        setCacheLogs("Cache Hit. Read directly from redis.internal fast memory.");
      }
      return;
    }

    if (type === "MISS") {
      setCacheState("MISS_RUNNING");
      setCacheActiveNode("CLIENT");
      setCacheLogs("Initializing client request payload...");
      setTimeout(() => {
        setCacheActiveNode("NONE");
        setCacheLogs("Request sent. Querying redis.internal memory...");
        setCacheAnimStage("CLIENT_TO_REDIS");
      }, 800);
    } else {
      setCacheState("HIT_RUNNING");
      setCacheActiveNode("CLIENT");
      setCacheLogs("Initializing client request payload...");
      setTimeout(() => {
        setCacheActiveNode("NONE");
        setCacheLogs("Request sent. Querying redis.internal memory...");
        setCacheAnimStage("CLIENT_TO_REDIS");
      }, 800);
    }
  };

  const handleCacheAnimComplete = () => {
    if (cacheState === "HIT_RUNNING") {
      if (cacheAnimStage === "CLIENT_TO_REDIS") {
        setCacheAnimStage("NONE");
        setCacheActiveNode("REDIS");
        setCacheResult("HIT");
        setCacheLatency(80);
        setCacheLogs("Cache Hit! Fetched directly from fast memory (redis.internal).");
        setTimeout(() => {
          setCacheActiveNode("NONE");
          setCacheLogs("Returning response to client gateway...");
          setCacheAnimStage("REDIS_TO_CLIENT");
        }, 1000);
      } else if (cacheAnimStage === "REDIS_TO_CLIENT") {
        setCacheAnimStage("NONE");
        setCacheActiveNode("CLIENT");
        setCacheLogs("Client received data successfully from fast-path cache.");
        setTimeout(() => {
          setCacheActiveNode("NONE");
          setCacheState("IDLE");
        }, 800);
      }
    } else if (cacheState === "MISS_RUNNING") {
      if (cacheAnimStage === "CLIENT_TO_REDIS") {
        setCacheAnimStage("NONE");
        setCacheActiveNode("REDIS");
        setCacheLogs("Cache Miss! Redis reports record not found. Hold to request DB...");
        setTimeout(() => {
          setCacheActiveNode("NONE");
          setCacheLogs("Proxying query downstream to postgres.internal database...");
          setCacheAnimStage("REDIS_TO_DB");
        }, 1000);
      } else if (cacheAnimStage === "REDIS_TO_DB") {
        setCacheAnimStage("NONE");
        setCacheActiveNode("DB");
        setCacheLogs("Database querying PostgreSQL tables (simulating disk latency)...");
        setTimeout(() => {
          setCacheActiveNode("NONE");
          setCacheLogs("Data resolved. Writing key updates back to redis.internal...");
          setCacheAnimStage("DB_TO_REDIS");
        }, 1500);
      } else if (cacheAnimStage === "DB_TO_REDIS") {
        setCacheAnimStage("NONE");
        setCacheActiveNode("REDIS");
        setCacheResult("MISS");
        setCacheLatency(1200);
        setCacheLogs("Data cached in Redis. Returning resolved records to client.");
        setTimeout(() => {
          setCacheActiveNode("NONE");
          setCacheLogs("Sending final payload back to Client...");
          setCacheAnimStage("REDIS_TO_CLIENT");
        }, 1000);
      } else if (cacheAnimStage === "REDIS_TO_CLIENT") {
        setCacheAnimStage("NONE");
        setCacheActiveNode("CLIENT");
        setCacheLogs("Client received data successfully from slow-path database query.");
        setTimeout(() => {
          setCacheActiveNode("NONE");
          setCacheState("IDLE");
        }, 800);
      }
    }
  };

  // ==========================================
  // 3. EVENT PIPELINE SIMULATION (Kafka)
  // ==========================================
  interface PartitionMessage {
    id: string;
    text: string;
  }

  const [kafkaLogs, setKafkaLogs] = useState<LogItem[]>([]);
  const [kafkaActive, setKafkaActive] = useState(false);
  const [kafkaStep, setKafkaStep] = useState<"IDLE" | "PUBLISHING" | "ROUTED" | "CONSUMED" | "DL_REPUBLISHING">("IDLE");
  const [kafkaActiveNode, setKafkaActiveNode] = useState<"NONE" | "PRODUCER" | "PARTITIONS" | "CONSUMER" | "DL_TOPIC">("NONE");
  const [kafkaIsFailing, setKafkaIsFailing] = useState(false);

  // Offset counters per partition
  const [offsets, setOffsets] = useState<number[]>([0, 0, 0]);
  const [dlOffsets, setDlOffsets] = useState<number>(0);
  const [activePartition, setActivePartition] = useState<number | null>(null);
  const [msgCounter, setMsgCounter] = useState(0);

  // visual buffer blocks inside lanes
  const [partitionMsgs, setPartitionMsgs] = useState<PartitionMessage[][]>([[], [], []]);
  const [dlPartitionMsgs, setDlPartitionMsgs] = useState<PartitionMessage[]>([]);

  const kafkaPubRef = useRef<HTMLDivElement>(null);
  const kafkaBrokerRef = useRef<HTMLDivElement>(null);
  const kafkaConsumerRef = useRef<HTMLDivElement>(null);
  const kafkaDlRef = useRef<HTMLDivElement>(null);

  const [coordsKafkaPub, setCoordsKafkaPub] = useState({ x: 0, y: 0 });
  const [coordsKafkaBroker, setCoordsKafkaBroker] = useState({ x: 0, y: 0 });
  const [coordsKafkaConsumer, setCoordsKafkaConsumer] = useState({ x: 0, y: 0 });
  const [coordsKafkaDl, setCoordsKafkaDl] = useState({ x: 0, y: 0 });

  const updateKafkaCoords = () => {
    if (kafkaPubRef.current && kafkaBrokerRef.current && kafkaConsumerRef.current && kafkaDlRef.current) {
      const pRect = kafkaPubRef.current.getBoundingClientRect();
      const bRect = kafkaBrokerRef.current.getBoundingClientRect();
      const cRect = kafkaConsumerRef.current.getBoundingClientRect();
      const dRect = kafkaDlRef.current.getBoundingClientRect();
      const parentRect = kafkaPubRef.current.parentElement?.getBoundingClientRect() || { left: 0, top: 0 };

      setCoordsKafkaPub({
        x: pRect.left - parentRect.left + pRect.width / 2,
        y: pRect.top - parentRect.top + pRect.height / 2,
      });
      setCoordsKafkaBroker({
        x: bRect.left - parentRect.left + bRect.width / 2,
        y: bRect.top - parentRect.top + bRect.height / 2,
      });
      setCoordsKafkaConsumer({
        x: cRect.left - parentRect.left + cRect.width / 2,
        y: cRect.top - parentRect.top + cRect.height / 2,
      });
      setCoordsKafkaDl({
        x: dRect.left - parentRect.left + dRect.width / 2,
        y: dRect.top - parentRect.top + dRect.height / 2,
      });
    }
  };

  useEffect(() => {
    updateKafkaCoords();
    const timer = setTimeout(updateKafkaCoords, 200);
    window.addEventListener("resize", updateKafkaCoords);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateKafkaCoords);
    };
  }, []);

  const triggerKafkaPublish = (failing = false) => {
    if (kafkaActive) return;
    setKafkaIsFailing(failing);
    const time = () => new Date().toLocaleTimeString();
    
    // Choose partition round-robin based on message counter
    const pIdx = msgCounter % 3;
    const currentCounter = msgCounter + 1;
    const nextOffset = offsets[pIdx] + 1;

    if (shouldReduceMotion) {
      if (failing) {
        const nextDlOffset = dlOffsets + 1;
        setDlOffsets(nextDlOffset);
        setDlPartitionMsgs((prev) => [...prev, { id: `MSG-${currentCounter}`, text: `evt.err_${currentCounter}` }]);
        setKafkaLogs([
          { timestamp: time(), level: "INFO", message: `[producer] Broadcast bad event OrderCreated_${currentCounter}` },
          { timestamp: time(), level: "INFO", message: `[broker] Routed event to Partition ${pIdx}. Committed offset: ${nextOffset}.` },
          { timestamp: time(), level: "ERROR", message: `[consumer-group-A] Failed to process event MSG-${currentCounter}. Retries exhausted.` },
          { timestamp: time(), level: "INFO", message: `[consumer-group-A] Republishing to Dead-Letter Topic (offset ${nextDlOffset}).` },
        ]);
      } else {
        setOffsets((prev) => prev.map((val, idx) => (idx === pIdx ? nextOffset : val)));
        setPartitionMsgs((prev) =>
          prev.map((lane, idx) =>
            idx === pIdx
              ? [...lane, { id: `MSG-${currentCounter}`, text: `evt.tx_${currentCounter}` }]
              : lane
          )
        );
        setKafkaLogs([
          { timestamp: time(), level: "INFO", message: `[producer] Broadcast event OrderCreated_${currentCounter}` },
          { timestamp: time(), level: "INFO", message: `[broker] Routed event to Partition ${pIdx}. Committed offset: ${nextOffset}.` },
          { timestamp: time(), level: "INFO", message: `[consumer-group-A] Ingested message from Partition ${pIdx} at offset ${nextOffset}.` },
        ]);
      }
      setMsgCounter(currentCounter);
      return;
    }

    setKafkaActive(true);
    setMsgCounter(currentCounter);
    setActivePartition(pIdx);
    setKafkaActiveNode("PRODUCER");
    setKafkaStep("PUBLISHING");
    setKafkaLogs([
      { timestamp: time(), level: "INFO", message: `[producer] Dispatching event OrderCreated_${currentCounter}...` },
    ]);
    setTimeout(() => {
      setKafkaActiveNode("NONE");
    }, 800);
  };

  const handleKafkaPublishComplete = () => {
    const time = () => new Date().toLocaleTimeString();
    if (kafkaStep === "PUBLISHING" && activePartition !== null) {
      const targetLane = activePartition;
      const nextOffset = offsets[targetLane] + 1;
      
      // Append message block visually to lane
      setPartitionMsgs((prev) =>
        prev.map((lane, idx) =>
          idx === targetLane
            ? [...lane, { id: `MSG-${msgCounter}`, text: kafkaIsFailing ? `evt.err_${msgCounter}` : `evt.tx_${msgCounter}` }]
            : lane
        )
      );
      setKafkaLogs((prev) => [
        ...prev,
        { timestamp: time(), level: "INFO", message: `[broker] Event locked. Assigned Partition ${targetLane}, Offset ${nextOffset}.` },
      ]);
      setKafkaStep("ROUTED");
      setKafkaActiveNode("PARTITIONS");

      // Short delay, then pull to consumer
      setTimeout(() => {
        setKafkaActiveNode("NONE");
        setKafkaStep("CONSUMED");
      }, 1200);
    } else if (kafkaStep === "CONSUMED" && activePartition !== null) {
      const targetLane = activePartition;
      const nextOffset = offsets[targetLane] + 1;

      setKafkaActiveNode("CONSUMER");
      
      if (!kafkaIsFailing) {
        // Pop message block and increment offset
        setPartitionMsgs((prev) =>
          prev.map((lane, idx) => (idx === targetLane ? lane.filter((m) => m.id !== `MSG-${msgCounter}`) : lane))
        );
        setOffsets((prev) => prev.map((val, idx) => (idx === targetLane ? nextOffset : val)));
        
        setKafkaLogs((prev) => [
          ...prev,
          { timestamp: time(), level: "INFO", message: `[consumer-group-A] Consumer read message from Partition ${targetLane} at offset ${nextOffset}.` },
        ]);
        setTimeout(() => {
          setKafkaStep("IDLE");
          setKafkaActiveNode("NONE");
          setKafkaActive(false);
        }, 1200);
      } else {
        setKafkaLogs((prev) => [
          ...prev,
          { timestamp: time(), level: "ERROR", message: `[consumer-group-A] Ingestion failure on event MSG-${msgCounter}. DB connection timeout.` },
        ]);
        setTimeout(() => {
          setKafkaLogs((prev) => [
            ...prev,
            { timestamp: time(), level: "ERROR", message: `[consumer-group-A] Max retries exhausted. Republishing event to Dead-Letter Topic.` },
          ]);
          setPartitionMsgs((prev) =>
            prev.map((lane, idx) => (idx === targetLane ? lane.filter((m) => m.id !== `MSG-${msgCounter}`) : lane))
          );
          setOffsets((prev) => prev.map((val, idx) => (idx === targetLane ? nextOffset : val)));
          setKafkaActiveNode("NONE");
          setKafkaStep("DL_REPUBLISHING");
        }, 1200);
      }
    } else if (kafkaStep === "DL_REPUBLISHING") {
      const nextDlOffset = dlOffsets + 1;
      setDlOffsets(nextDlOffset);
      setDlPartitionMsgs((prev) => [...prev, { id: `MSG-${msgCounter}`, text: `evt.err_${msgCounter}` }]);
      setKafkaLogs((prev) => [
        ...prev,
        { timestamp: time(), level: "INFO", message: `[dead-letter-topic] Event committed to dead_letter_topic-0. Offset: ${nextDlOffset}.` },
      ]);
      setKafkaActiveNode("DL_TOPIC");
      setKafkaStep("IDLE");
      setTimeout(() => {
        setKafkaActiveNode("NONE");
        setKafkaActive(false);
      }, 1200);
    }
  };

  // ==========================================
  // 4. QUEUE PROCESSING SIMULATION (RabbitMQ)
  // ==========================================
  interface RabbitTask {
    id: string;
    payload: string;
    stage: "PUBLISHING" | "EXCHANGE_ROUTING" | "PROCESSING" | "DLQ_ROUTING" | "ACK_DISPATCH" | "COMPLETED";
    queue?: "NOTIFICATION" | "SHIPPING";
  }

  const [rabbitLogs, setRabbitLogs] = useState<LogItem[]>([]);
  const [rabbitActive, setRabbitActive] = useState(false);
  const [rabbitTasks, setRabbitTasks] = useState<RabbitTask[]>([]);
  const [rabbitCounter, setRabbitCounter] = useState(0);
  const [rabbitActiveNode, setRabbitActiveNode] = useState<"NONE" | "PRODUCER" | "EXCHANGE" | "QUEUES" | "WORKERS" | "DLQ">("NONE");
  const [rabbitIsFailing, setRabbitIsFailing] = useState(false);
  const [dlqTasks, setDlqTasks] = useState<PartitionMessage[]>([]);

  const rabbitPubRef = useRef<HTMLDivElement>(null);
  const rabbitExchangeRef = useRef<HTMLDivElement>(null);
  const rabbitQueueNotifRef = useRef<HTMLDivElement>(null);
  const rabbitQueueShipRef = useRef<HTMLDivElement>(null);
  const rabbitQueueDlRef = useRef<HTMLDivElement>(null);
  const rabbitWorkerNotifRef = useRef<HTMLDivElement>(null);
  const rabbitWorkerShipRef = useRef<HTMLDivElement>(null);
  const rabbitContainerRef = useRef<HTMLDivElement>(null);

  const [coordsRProd, setCoordsRProd] = useState({ x: 0, y: 0 });
  const [coordsRExch, setCoordsRExch] = useState({ x: 0, y: 0 });
  const [coordsRQNotif, setCoordsRQNotif] = useState({ x: 0, y: 0 });
  const [coordsRQShip, setCoordsRQShip] = useState({ x: 0, y: 0 });
  const [coordsRQDl, setCoordsRQDl] = useState({ x: 0, y: 0 });
  const [coordsRWNotif, setCoordsRWNotif] = useState({ x: 0, y: 0 });
  const [coordsRWShip, setCoordsRWShip] = useState({ x: 0, y: 0 });

  const updateRabbitCoords = () => {
    if (
      rabbitPubRef.current &&
      rabbitExchangeRef.current &&
      rabbitQueueNotifRef.current &&
      rabbitQueueShipRef.current &&
      rabbitQueueDlRef.current &&
      rabbitWorkerNotifRef.current &&
      rabbitWorkerShipRef.current
    ) {
      const pRect = rabbitPubRef.current.getBoundingClientRect();
      const exRect = rabbitExchangeRef.current.getBoundingClientRect();
      const qnRect = rabbitQueueNotifRef.current.getBoundingClientRect();
      const qsRect = rabbitQueueShipRef.current.getBoundingClientRect();
      const qdRect = rabbitQueueDlRef.current.getBoundingClientRect();
      const wnRect = rabbitWorkerNotifRef.current.getBoundingClientRect();
      const wsRect = rabbitWorkerShipRef.current.getBoundingClientRect();
      const parentRect = rabbitContainerRef.current?.getBoundingClientRect() || { left: 0, top: 0 };

      setCoordsRProd({ x: pRect.left - parentRect.left + pRect.width / 2, y: pRect.top - parentRect.top + pRect.height / 2 });
      setCoordsRExch({ x: exRect.left - parentRect.left + exRect.width / 2, y: exRect.top - parentRect.top + exRect.height / 2 });
      setCoordsRQNotif({ x: qnRect.left - parentRect.left + qnRect.width / 2, y: qnRect.top - parentRect.top + qnRect.height / 2 });
      setCoordsRQShip({ x: qsRect.left - parentRect.left + qsRect.width / 2, y: qsRect.top - parentRect.top + qsRect.height / 2 });
      setCoordsRQDl({ x: qdRect.left - parentRect.left + qdRect.width / 2, y: qdRect.top - parentRect.top + qdRect.height / 2 });
      setCoordsRWNotif({ x: wnRect.left - parentRect.left + wnRect.width / 2, y: wnRect.top - parentRect.top + wnRect.height / 2 });
      setCoordsRWShip({ x: wsRect.left - parentRect.left + wsRect.width / 2, y: wsRect.top - parentRect.top + wsRect.height / 2 });
    }
  };

  useEffect(() => {
    updateRabbitCoords();
    const timer = setTimeout(updateRabbitCoords, 200);
    window.addEventListener("resize", updateRabbitCoords);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateRabbitCoords);
    };
  }, []);

  const triggerRabbitTask = (failing = false) => {
    if (rabbitActive) return;
    setRabbitIsFailing(failing);
    const time = () => new Date().toLocaleTimeString();
    const nextCounter = rabbitCounter + 1;

    if (shouldReduceMotion) {
      if (failing) {
        setDlqTasks((prev) => [...prev, { id: `Task-${nextCounter}`, text: `task_${nextCounter}` }]);
        setRabbitLogs([
          { timestamp: time(), level: "INFO", message: `[producer] Published failing payload (Task-${nextCounter})` },
          { timestamp: time(), level: "INFO", message: `[exchange] Routing fanout payload to notifications_queue & shipping_queue` },
          { timestamp: time(), level: "ERROR", message: `[worker-notification] Processing failed. Emitting NACK (requeue=false).` },
          { timestamp: time(), level: "INFO", message: `[worker-shipping] Processed Job. Dispatched ACK.` },
          { timestamp: time(), level: "WARN", message: `[rabbitmq] Dead-letter exchange routed Task-${nextCounter} to DLQ.` },
        ]);
      } else {
        setRabbitLogs([
          { timestamp: time(), level: "INFO", message: `[producer] Published Job payload (Task-${nextCounter}) to Exchange` },
          { timestamp: time(), level: "INFO", message: `[exchange] Routing fanout payload to notifications_queue & shipping_queue` },
          { timestamp: time(), level: "INFO", message: `[worker-notification] Processed Job. Dispatched ACK.` },
          { timestamp: time(), level: "INFO", message: `[worker-shipping] Processed Job. Dispatched ACK.` },
          { timestamp: time(), level: "INFO", message: `[rabbitmq] Completed transactions confirmed. Queue flushed.` },
        ]);
      }
      setRabbitCounter(nextCounter);
      return;
    }

    setRabbitActive(true);
    setRabbitCounter(nextCounter);
    setRabbitActiveNode("PRODUCER");
    setRabbitLogs([
      { timestamp: time(), level: "INFO", message: `[producer] Publishing Job Payload (Task-${nextCounter}) to Exchange...` },
    ]);

    // Setup active tracking state
    const newTask: RabbitTask = {
      id: `Task-${nextCounter}`,
      payload: `task_${nextCounter}_payload`,
      stage: "PUBLISHING",
    };
    setRabbitTasks([newTask]);
    setTimeout(() => {
      setRabbitActiveNode("NONE");
    }, 800);
  };

  // Manage RabbitMQ Animation pipeline phases
  const handleRabbitAnimComplete = (stage: string) => {
    const time = () => new Date().toLocaleTimeString();
    if (stage === "PUBLISHING") {
      setRabbitActiveNode("EXCHANGE");
      setRabbitLogs((prev) => [
        ...prev,
        { timestamp: time(), level: "INFO", message: `[exchange] Accepted payload. Fan-out routing to notifications_queue & shipping_queue...` },
      ]);
      setTimeout(() => {
        setRabbitActiveNode("NONE");
        setRabbitTasks((prev) => prev.map((t) => ({ ...t, stage: "EXCHANGE_ROUTING" })));
      }, 1000);
    } else if (stage === "EXCHANGE_ROUTING") {
      setRabbitActiveNode("QUEUES");
      setRabbitLogs((prev) => [
        ...prev,
        { timestamp: time(), level: "INFO", message: `[worker-notification] Pulling from notifications_queue. Ingestion active.` },
        { timestamp: time(), level: "INFO", message: `[worker-shipping] Pulling from shipping_queue. Ingestion active.` },
      ]);
      setTimeout(() => {
        setRabbitActiveNode("NONE");
        setRabbitTasks((prev) => prev.map((t) => ({ ...t, stage: "PROCESSING" })));
      }, 1200);
    } else if (stage === "PROCESSING") {
      setRabbitActiveNode("WORKERS");
      if (!rabbitIsFailing) {
        setRabbitLogs((prev) => [
          ...prev,
          { timestamp: time(), level: "INFO", message: `[worker-notification] Processed payload. Dispatching transaction ACK.` },
          { timestamp: time(), level: "INFO", message: `[worker-shipping] Processed payload. Dispatching transaction ACK.` },
        ]);
        setTimeout(() => {
          setRabbitActiveNode("NONE");
          setRabbitTasks((prev) => prev.map((t) => ({ ...t, stage: "ACK_DISPATCH" })));
        }, 1500);
      } else {
        setRabbitLogs((prev) => [
          ...prev,
          { timestamp: time(), level: "ERROR", message: `[worker-notification] Job execution exception. Rejecting task.` },
          { timestamp: time(), level: "INFO", message: `[worker-shipping] Processed payload. Dispatching transaction ACK.` },
        ]);
        setTimeout(() => {
          setRabbitLogs((prev) => [
            ...prev,
            { timestamp: time(), level: "WARN", message: `[rabbitmq] NACK (requeue=false) detected. Redirecting to DLQ exchange...` },
          ]);
          setRabbitActiveNode("NONE");
          setRabbitTasks((prev) => prev.map((t) => ({ ...t, stage: "DLQ_ROUTING" })));
        }, 1500);
      }
    } else if (stage === "DLQ_ROUTING") {
      setRabbitActiveNode("DLQ");
      setDlqTasks((prev) => [...prev, { id: `Task-${rabbitCounter}`, text: `task_${rabbitCounter}` }]);
      setRabbitLogs((prev) => [
        ...prev,
        { timestamp: time(), level: "WARN", message: `[rabbitmq] Task-${rabbitCounter} committed to dead_letter_queue buffer.` },
      ]);
      setTimeout(() => {
        setRabbitActiveNode("NONE");
        setRabbitTasks([]);
        setRabbitActive(false);
      }, 1200);
    } else if (stage === "ACK_DISPATCH") {
      setRabbitLogs((prev) => [
        ...prev,
        { timestamp: time(), level: "INFO", message: `[rabbitmq] ACKs validated. Finished jobs flushed from storage buffers.` },
      ]);
      setRabbitTasks([]);
      setRabbitActive(false);
    }
  };

  // Node & Edge selection for react-flow topology graphs
  const activeNodes = useMemo(() => topologyData[activeTab].nodes, [activeTab, topologyData]);
  const activeEdges = useMemo(() => topologyData[activeTab].edges, [activeTab, topologyData]);


  return (
    <div className="space-y-12">
      <Helmet>
        <title>Architecture — Sanjai L</title>
        <meta
          name="description"
          content="Simulated backend architecture showcases by Sanjai L: Redis cache hit/miss, Kafka event pipeline partitions, RabbitMQ task queue mechanics, and per-project topology diagrams."
        />
      </Helmet>
      {/* Page Header */}
      <section className="bg-section-dark bg-blueprint-grid border border-border-primary rounded-xl p-8 md:p-12 relative overflow-hidden text-left">
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-signature rounded-tl-[3px] opacity-75"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-signature rounded-tr-[3px] opacity-75"></div>

        <div className="space-y-3 z-10 relative">
          <div className="flex items-center space-x-2 select-none">
            <span className="font-mono text-[9px] font-bold text-status-info bg-status-info/5 border border-status-info/30 px-2 py-0.5 rounded uppercase tracking-wider">
              200 OK
            </span>
            <span className="font-mono text-xs text-text-secondary">
              GET /architecture (topology_visualization)
            </span>
          </div>
          <h1 className="font-mono text-xl md:text-3xl font-bold tracking-tight text-text-primary uppercase leading-tight">
            Topology &amp; Observability
          </h1>
          <p className="text-text-muted text-xs font-mono max-w-xl">
            CONCEPTUAL NODE SIMULATION — ALL DEMOS RUN FAKE CLIENT SIDE STATES
          </p>
        </div>
      </section>

      {/* 1. SYSTEM TOPOLOGY DIAGRAM SWITCHER */}
      <section className="space-y-4">
        <SectionHeader title="System Topology Diagram" eyebrow="GET /topology" />
        
        {/* Schematic Tab Switcher per DESIGN.md */}
        <div className="flex flex-wrap border-b border-border-primary/60 font-mono text-[10px] md:text-xs">
          {(["RUNTIME", "PLANWIZZ", "DEVSECWATCH", "TRINETRA", "DUNESDAY"] as TopologyType[]).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-4 py-2 border-t border-l border-r -mb-px transition-all select-none uppercase font-bold tracking-wider ${
                  isActive
                    ? "bg-bg-primary text-signature border-border-primary font-bold border-b border-b-bg-primary"
                    : "text-text-muted border-transparent hover:text-text-secondary hover:bg-card-bg/20"
                }`}
              >
                <span>{tab === "RUNTIME" ? "[Runtime Shell]" : `[${tab}]`}</span>
                {isActive && (
                  <span className="absolute top-0 left-0 right-0 h-[2px] bg-signature"></span>
                )}
              </button>
            );
          })}
        </div>

        <ReactFlowProvider>
          <TopologyMapPanel activeTab={activeTab} activeNodes={activeNodes} activeEdges={activeEdges} />
        </ReactFlowProvider>
        
        <div className="bg-card-bg border border-border-primary/40 p-4 rounded-lg text-xs text-text-muted leading-relaxed font-mono select-none">
          <strong>Translation:</strong> This diagram maps the microservice hosts configured across our cluster. {activeTab === "TRINETRA" ? "This topology remains high-level, outlining simple transactional ingestion and intelligence boundaries." : activeTab === "DUNESDAY" ? "Shows the FastAPI prediction service querying XGBoost ML models and returning SHAP explainability matrices." : activeTab === "PLANWIZZ" ? "Shows PDF inputs running to the Spring API service, solved via CSP schedule constraints." : "Shows scanning jobs queueing asynchronously in RabbitMQ, with cache nodes buffering metadata queries."}
        </div>
      </section>

      {/* 2. CACHE HIT/MISS DEMO */}
      <section className="space-y-4 text-left">
        <SectionHeader title="Caching Simulation" eyebrow="SIMULATE /cache" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls & Metrics */}
          <div className="lg:col-span-1 border border-border-primary rounded-xl p-5 bg-card-bg relative flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-signature"></div>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-signature"></div>

            <div className="space-y-4">
              <span className="font-mono text-[9px] text-signature tracking-widest uppercase">
                [caching-policy]
              </span>
              <h4 className="font-mono text-xs font-bold text-text-primary uppercase">
                Distributed Cache Controller
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Demonstrates the performance difference of utilizing Redis memory storage to prevent hitting PostgreSQL disk records repeatedly.
              </p>

              <div className="flex flex-col gap-2.5 pt-2">
                <Button
                  variant="primary"
                  onClick={() => triggerCacheRequest("MISS")}
                  disabled={cacheState !== "IDLE"}
                >
                  Request (Trigger Cache Miss)
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => triggerCacheRequest("HIT")}
                  disabled={cacheState !== "IDLE"}
                >
                  Request (Trigger Cache Hit)
                </Button>
              </div>
            </div>

            <div className="border-t border-border-primary/40 pt-4 mt-6 space-y-2 font-mono text-[10px] text-text-muted">
              <div className="flex justify-between">
                <span>SIM_LATENCY:</span>
                <span className={cacheLatency ? "text-status-success font-semibold" : ""}>
                  {cacheLatency ? `${cacheLatency} ms` : "---"}
                </span>
              </div>
              <div className="flex justify-between">
                <span>RESOLVE_STATE:</span>
                <span className={
                  cacheResult === "HIT" ? "text-status-success font-bold" :
                  cacheResult === "MISS" ? "text-status-warning font-bold" : ""
                }>
                  {cacheResult === "HIT" ? "CACHE_HIT" : cacheResult === "MISS" ? "CACHE_MISS" : "IDLE"}
                </span>
              </div>
              <div className="text-[9px] bg-bg-primary/50 p-2 rounded border border-border-primary/30 mt-1 select-text">
                {cacheLogs}
              </div>
            </div>
          </div>

          {/* Interactive Animation Visual */}
          <div className="lg:col-span-2 border border-border-primary rounded-xl p-6 bg-bg-secondary/15 relative overflow-hidden flex flex-col justify-center min-h-[250px]">
            <div className="absolute top-2 left-3 font-mono text-[9px] text-text-muted select-none">
              CACHE WORKFLOW VISUALIZATION
            </div>

            {shouldReduceMotion ? (
              <div className="space-y-4 font-mono text-xs max-w-lg mx-auto py-4">
                <div className="border border-border-primary/60 p-3 rounded bg-card-bg/60">
                  <span className="text-status-warning font-bold">[PATH A] CACHE MISS (1200ms delay)</span>
                  <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                    Client Request &rarr; Redis Lookup (Not Found) &rarr; Database Queries PostgreSQL &rarr; Redis Cache Update &rarr; Response returned to Client.
                  </p>
                </div>
                <div className="border border-border-primary/60 p-3 rounded bg-card-bg/60">
                  <span className="text-status-success font-bold">[PATH B] CACHE HIT (80ms delay)</span>
                  <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                    Client Request &rarr; Redis Lookup (Records Found) &rarr; Fast response returned directly to Client.
                  </p>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col md:flex-row justify-around items-center gap-8 py-8 relative">
                <div
                  ref={cacheClientRef}
                  className={`w-24 px-2 py-3 bg-card-bg border text-center font-mono text-[10px] rounded uppercase z-10 transition-colors duration-300 ${
                    cacheActiveNode === "CLIENT" ? "border-status-info bg-status-info/10 text-status-info" : "border-border-primary text-text-primary"
                  }`}
                >
                  Client Gateway
                </div>

                <div
                  ref={cacheRedisRef}
                  className={`w-24 px-2 py-3 bg-card-bg border text-center font-mono text-[10px] rounded uppercase z-10 flex flex-col items-center gap-1 transition-colors duration-300 ${
                    cacheActiveNode === "REDIS" ? "border-status-info bg-status-info/10 text-status-info" : "border-border-primary text-text-primary"
                  }`}
                >
                  <Server className="w-3.5 h-3.5 text-status-async" />
                  <span>Redis Cache</span>
                  <StatusBadge status="Online" />
                </div>

                <div
                  ref={cacheDbRef}
                  className={`w-24 px-2 py-3 bg-card-bg border text-center font-mono text-[10px] rounded uppercase z-10 flex flex-col items-center gap-1 transition-colors duration-300 ${
                    cacheActiveNode === "DB" ? "border-status-info bg-status-info/10 text-status-info" : "border-border-primary text-text-primary"
                  }`}
                >
                  <Database className="w-3.5 h-3.5 text-status-success" />
                  <span>PostgreSQL</span>
                  <StatusBadge status="Online" />
                </div>

                {cacheAnimStage === "CLIENT_TO_REDIS" && (
                  <RequestPacket
                    startCoords={coordsClient}
                    endCoords={coordsRedis}
                    trigger={true}
                    duration={1.2}
                    onComplete={handleCacheAnimComplete}
                  />
                )}
                {cacheAnimStage === "REDIS_TO_DB" && (
                  <RequestPacket
                    startCoords={coordsRedis}
                    endCoords={coordsDb}
                    trigger={true}
                    duration={1.2}
                    onComplete={handleCacheAnimComplete}
                  />
                )}
                {cacheAnimStage === "DB_TO_REDIS" && (
                  <RequestPacket
                    startCoords={coordsDb}
                    endCoords={coordsRedis}
                    trigger={true}
                    duration={1.2}
                    onComplete={handleCacheAnimComplete}
                  />
                )}
                {cacheAnimStage === "REDIS_TO_CLIENT" && (
                  <RequestPacket
                    startCoords={coordsRedis}
                    endCoords={coordsClient}
                    trigger={true}
                    duration={1.2}
                    onComplete={handleCacheAnimComplete}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Translation Caption */}
        <div className="bg-card-bg border border-border-primary/40 p-4 rounded-lg text-xs text-text-muted leading-relaxed font-mono select-none">
          <strong>Translation:</strong> A cache miss means the data wasn't stored in memory yet, so the system had to fetch it from the database—that's the slow path you just saw. A cache hit means it was already stored in fast memory, returning the response instantly.
        </div>
      </section>

      {/* 3. DEEPENED KAFKA EVENT PIPELINE DEMO */}
      <section className="space-y-4 text-left">
        <SectionHeader title="Event Driven Architecture" eyebrow="SIMULATE /events" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Card */}
          <div className="lg:col-span-1 border border-border-primary rounded-xl p-5 bg-card-bg relative flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-signature"></div>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-signature"></div>

            <div className="space-y-4">
              <span className="font-mono text-[9px] text-signature tracking-widest uppercase">
                [kafka-broker-lanes]
              </span>
              <h4 className="font-mono text-xs font-bold text-text-primary uppercase">
                Kafka Topic Broker Center
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Demonstrates partition-based routing. Messages route round-robin to partition lanes, incrementing offsets as the Consumer group consumes.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="primary"
                  onClick={() => triggerKafkaPublish(false)}
                  disabled={kafkaActive}
                  className="w-full"
                >
                  Publish event (Success)
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => triggerKafkaPublish(true)}
                  disabled={kafkaActive}
                  className="w-full"
                >
                  Publish bad event (Dead-Letter Topic)
                </Button>
              </div>
            </div>

            <div className="h-[140px] mt-6 pt-4 border-t border-border-primary/40 flex flex-col">
              <span className="font-mono text-[9px] text-text-muted mb-1 block uppercase">Partition Telemetry Logs</span>
              <div className="flex-1 min-h-[100px]">
                <TerminalLog logs={kafkaLogs} maxHeight="100px" />
              </div>
            </div>
          </div>

          {/* Broadcast Visual Representation with 3 Partition lanes & DLQ Topic */}
          <div className="lg:col-span-2 border border-border-primary rounded-xl p-6 bg-card-bg relative overflow-hidden flex flex-col justify-center min-h-[280px]">
            <div className="absolute top-2 left-3 font-mono text-[9px] text-text-muted select-none">
              KAFKA TOPIC DISPATCH: ORDER_CREATED
            </div>

            {shouldReduceMotion ? (
              <div className="font-mono text-xs max-w-lg mx-auto py-4 space-y-3">
                <div className="border border-border-primary/60 p-2.5 rounded bg-card-bg/60 text-[11px] leading-relaxed">
                  <span className="text-status-info font-bold uppercase tracking-wider block">Kafka Partition Ingestion Mapping</span>
                  <div className="flex justify-between border-b border-border-primary/40 py-1 mt-1">
                    <span>Partition 0:</span>
                    <span className="text-text-secondary">Messages round-robin 1 &amp; 4 (Offset: {offsets[0]})</span>
                  </div>
                  <div className="flex justify-between border-b border-border-primary/40 py-1">
                    <span>Partition 1:</span>
                    <span className="text-text-secondary">Messages round-robin 2 &amp; 5 (Offset: {offsets[1]})</span>
                  </div>
                  <div className="flex justify-between border-b border-border-primary/40 py-1">
                    <span>Partition 2:</span>
                    <span className="text-text-secondary">Messages round-robin 3 &amp; 6 (Offset: {offsets[2]})</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Dead-Letter Topic (dead_letter_topic-0):</span>
                    <span className="text-status-error font-bold">Failed Messages (Offset: {dlOffsets})</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 py-6 relative">
                {/* 1. Producer */}
                <div
                  ref={kafkaPubRef}
                  className={`w-24 px-2 py-3 bg-card-bg border text-center font-mono text-[10px] rounded uppercase z-10 flex flex-col items-center gap-1 shrink-0 transition-colors duration-300 ${
                    kafkaActiveNode === "PRODUCER" ? "border-status-info bg-status-info/10 text-status-info" : "border-border-primary text-text-primary"
                  }`}
                >
                  <Send className="w-3.5 h-3.5 text-status-info" />
                  <span>Order Service</span>
                </div>

                {/* 2. Kafka Topic Broker container with 3 lanes & Dead-Letter Topic */}
                <div className="flex-1 w-full flex flex-col gap-3 max-w-[280px]">
                  <div
                    ref={kafkaBrokerRef}
                    className={`bg-card-bg/80 border p-3 rounded flex flex-col space-y-2 relative transition-colors duration-300 ${
                      kafkaActiveNode === "PARTITIONS" ? "border-status-info bg-status-info/10 text-status-info" : "border-border-primary text-text-primary"
                    }`}
                  >
                    <span className="font-mono text-[8px] text-text-muted uppercase tracking-wider text-center select-none block mb-1">
                      KAFKA TOPIC PARTITIONS
                    </span>
                    {[0, 1, 2].map((idx) => {
                      const isActive = activePartition === idx && (kafkaStep === "ROUTED" || kafkaStep === "CONSUMED");
                      return (
                        <div
                          key={idx}
                          className={`border p-2 rounded flex flex-col items-center justify-between font-mono text-[9px] relative transition-all duration-200 ${
                            isActive
                              ? "border-status-info bg-status-info/5"
                              : "border-border-primary/50 bg-bg-primary/20"
                          }`}
                        >
                          <div className="flex justify-between w-full select-none">
                            <span className="font-semibold text-text-secondary">P_{idx}</span>
                            <span className="text-text-muted">Offset: {offsets[idx]}</span>
                          </div>
                          {/* Buffered Message blocks inside lanes */}
                          <div className="flex gap-1.5 mt-1.5 w-full justify-start overflow-hidden min-h-[16px]">
                            {partitionMsgs[idx].map((msg) => (
                              <div
                                key={msg.id}
                                className="px-1 py-0.5 bg-status-info/10 border border-status-info/30 rounded text-[8px] text-status-info font-bold select-none"
                              >
                                {msg.text}
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Kafka Dead Letter Topic Node */}
                  <div
                    ref={kafkaDlRef}
                    className={`bg-card-bg/80 border p-2.5 rounded flex flex-col relative transition-colors duration-300 ${
                      kafkaActiveNode === "DL_TOPIC" ? "border-status-error bg-status-error/10 text-status-error" : "border-border-primary text-text-primary"
                    }`}
                  >
                    <div className="flex justify-between items-center font-mono text-[9px] w-full select-none">
                      <span className="font-bold text-status-error uppercase flex items-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        DEAD_LETTER_TOPIC
                      </span>
                      <span className="text-text-muted">Offset: {dlOffsets}</span>
                    </div>
                    {/* Visual buffer blocks for DL topic partition */}
                    <div className="flex gap-1.5 mt-1.5 w-full justify-start overflow-hidden min-h-[16px]">
                      {dlPartitionMsgs.map((msg) => (
                        <div
                          key={msg.id}
                          className="px-1 py-0.5 bg-status-error/10 border border-status-error/30 rounded text-[8px] text-status-error font-bold select-none"
                        >
                          {msg.text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Consumer Group */}
                <div
                  ref={kafkaConsumerRef}
                  className={`w-24 px-2 py-3 bg-card-bg border text-center font-mono text-[10px] rounded uppercase z-10 flex flex-col items-center gap-1 shrink-0 transition-colors duration-300 ${
                    kafkaActiveNode === "CONSUMER" ? "border-status-info bg-status-info/10 text-status-info" : "border-border-primary text-text-primary"
                  }`}
                >
                  <Database className="w-3.5 h-3.5 text-status-async animate-pulse" />
                  <span>Consumer Group</span>
                  <span className="text-[7px] text-text-muted">Subscribers</span>
                </div>

                {/* Event Packets Anim */}
                {kafkaStep === "PUBLISHING" && (
                  <RequestPacket
                    startCoords={coordsKafkaPub}
                    endCoords={coordsKafkaBroker}
                    trigger={true}
                    duration={1.2}
                    onComplete={handleKafkaPublishComplete}
                  />
                )}
                {kafkaStep === "CONSUMED" && (
                  <RequestPacket
                    startCoords={coordsKafkaBroker}
                    endCoords={coordsKafkaConsumer}
                    trigger={true}
                    duration={1.2}
                    onComplete={handleKafkaPublishComplete}
                    color="bg-status-async"
                  />
                )}
                {kafkaStep === "DL_REPUBLISHING" && (
                  <RequestPacket
                    startCoords={coordsKafkaConsumer}
                    endCoords={coordsKafkaDl}
                    trigger={true}
                    duration={1.2}
                    onComplete={handleKafkaPublishComplete}
                    color="bg-status-error"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Translation Caption */}
        <div className="bg-bg-secondary/40 border border-border-primary/50 p-4 rounded-lg text-xs text-text-muted leading-relaxed font-mono select-none">
          <strong>Translation:</strong> Kafka splits a topic into partitions so multiple consumers can read in parallel. Kafka doesn't have a built-in dead-letter queue like RabbitMQ — instead, failed events are commonly republished to a separate dead-letter topic so they can be inspected or retried later.
        </div>
      </section>

      {/* 4. DEEPENED RABBITMQ QUEUE PROMPTS */}
      <section className="space-y-4 text-left">
        <SectionHeader title="Message Queue Buffering" eyebrow="SIMULATE /queue" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Card */}
          <div className="lg:col-span-1 border border-border-primary rounded-xl p-5 bg-card-bg relative flex flex-col justify-between">
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-signature"></div>
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-signature"></div>

            <div className="space-y-4">
              <span className="font-mono text-[9px] text-signature tracking-widest uppercase">
                [rabbitmq-exchanges]
              </span>
              <h4 className="font-mono text-xs font-bold text-text-primary uppercase">
                RabbitMQ Exchange Center
              </h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Demonstrates dynamic exchange fan-out. Tasks route to multi-queues asynchronously, workers process, and dispatch ACK updates.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  variant="primary"
                  onClick={() => triggerRabbitTask(false)}
                  disabled={rabbitActive}
                  className="w-full"
                >
                  Publish task (Success)
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => triggerRabbitTask(true)}
                  disabled={rabbitActive}
                  className="w-full"
                >
                  Publish task (Fail &amp; DLQ)
                </Button>
              </div>
            </div>

            <div className="h-[140px] mt-6 pt-4 border-t border-border-primary/40 flex flex-col">
              <span className="font-mono text-[9px] text-text-muted mb-1 block uppercase">Exchange Telemetry Logs</span>
              <div className="flex-1 min-h-[100px]">
                <TerminalLog logs={rabbitLogs} maxHeight="100px" />
              </div>
            </div>
          </div>

          {/* Interactive exchange-queue graph visual */}
          <div className="lg:col-span-2 border border-border-primary rounded-xl p-6 bg-card-bg relative overflow-hidden flex flex-col justify-center min-h-[280px]">
            <div className="absolute top-2 left-3 font-mono text-[9px] text-text-muted select-none">
              RABBITMQ ROUTING GRAPH: EXCHANGE FAN-OUT
            </div>

            {shouldReduceMotion ? (
              <div className="font-mono text-xs max-w-lg mx-auto py-4 space-y-3">
                <div className="border border-border-primary/60 p-3 rounded bg-card-bg/60">
                  <span className="text-status-mutation font-bold">1. Fan-out Exchange Ingestion</span>
                  <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                    Producer pushes job data payloads directly into a fan-out exchange.
                  </p>
                </div>
                <div className="border border-border-primary/60 p-3 rounded bg-card-bg/60">
                  <span className="text-status-info font-bold">2. Dual Queue Routing with Worker ACKs</span>
                  <p className="text-[11px] text-text-muted mt-1 leading-relaxed">
                    The exchange duplicates and routes payloads in parallel to both `notifications_queue` and `shipping_queue` buffers. Active workers process task lists and emit ACKs back to flush queue registers.
                  </p>
                </div>
                <div className="border border-border-primary/60 p-3 rounded bg-card-bg/80 flex flex-col space-y-2 text-left">
                  <span className="font-mono text-[8px] text-text-muted uppercase tracking-wider text-center select-none block mb-1">
                    RABBITMQ QUEUES
                  </span>
                  <div className="flex justify-between border-b border-border-primary/20 py-1">
                    <span>notif_queue:</span>
                    <span className="text-text-secondary">Worker A processes tasks (Active tasks in buffer)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>ship_queue:</span>
                    <span className="text-text-secondary">Worker B processes tasks (Active tasks in buffer)</span>
                  </div>
                </div>
                <div className="border border-border-primary/60 p-2.5 rounded bg-card-bg/60 text-[11px] leading-relaxed text-left">
                  <div className="flex justify-between py-1 items-center">
                    <span className="font-bold text-status-error uppercase flex items-center gap-1">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      dead_letter_queue
                    </span>
                    <span className="text-status-error font-bold">Failed Tasks (Buffer count: {dlqTasks.length})</span>
                  </div>
                </div>
              </div>
            ) : (
              <div ref={rabbitContainerRef} className="w-full flex flex-col md:flex-row justify-center items-center gap-8 py-6 relative">
                
                {/* 1. Producer & Exchange Column */}
                <div className="flex flex-row md:flex-col gap-6 justify-center items-center shrink-0">
                  <div
                    ref={rabbitPubRef}
                    className={`w-20 px-1 py-3 bg-card-bg border text-center font-mono text-[9px] rounded uppercase z-10 transition-colors duration-300 ${
                      rabbitActiveNode === "PRODUCER" ? "border-status-info bg-status-info/10 text-status-info" : "border-border-primary text-text-primary"
                    }`}
                  >
                    Producer
                  </div>

                  <div
                    ref={rabbitExchangeRef}
                    className={`w-24 px-1.5 py-3 bg-card-bg border text-center font-mono text-[9px] rounded uppercase z-10 flex flex-col items-center gap-1 transition-colors duration-300 ${
                      rabbitActiveNode === "EXCHANGE" ? "border-status-mutation bg-status-mutation/10 text-status-mutation" : "border-border-primary text-text-primary"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-status-mutation" />
                    <span>Exchange</span>
                  </div>
                </div>

                {/* 2. Parallel Queues & Consumers + Dead-Letter Queue container */}
                <div className="flex-1 w-full flex flex-col gap-3 max-w-[280px]">
                  {/* RabbitMQ Queues Container */}
                  <div
                    className={`bg-card-bg/80 border p-3 rounded flex flex-col space-y-2 relative transition-colors duration-300 ${
                      rabbitActiveNode === "QUEUES" || rabbitActiveNode === "WORKERS"
                        ? "border-status-info bg-status-info/10 text-status-info"
                        : "border-border-primary text-text-primary"
                    }`}
                  >
                    <span className="font-mono text-[8px] text-text-muted uppercase tracking-wider text-center select-none block mb-1">
                      RABBITMQ QUEUES
                    </span>

                    {/* Row A: notif_queue */}
                    <div
                      ref={rabbitQueueNotifRef}
                      className={`border p-2 rounded flex flex-col items-center justify-between font-mono text-[9px] relative transition-all duration-200 ${
                        rabbitActiveNode === "QUEUES" || (rabbitActiveNode === "WORKERS" && rabbitTasks[0]?.stage === "PROCESSING")
                          ? "border-status-info bg-status-info/5"
                          : "border-border-primary/50 bg-bg-primary/20"
                      }`}
                    >
                      <div className="flex justify-between w-full select-none items-center">
                        <span className="font-semibold text-text-secondary uppercase">notif_queue</span>
                        <div
                          ref={rabbitWorkerNotifRef}
                          className={`px-1.5 py-0.5 border rounded text-[7px] font-bold uppercase select-none transition-colors duration-300 ${
                            rabbitActiveNode === "WORKERS" && rabbitTasks[0]?.stage === "PROCESSING"
                              ? rabbitIsFailing
                                ? "border-status-error bg-status-error/20 text-status-error bg-status-error/5"
                                : "border-status-info bg-status-info/20 text-status-info bg-status-info/5"
                              : "border-border-primary text-text-muted bg-card-bg/40"
                          }`}
                        >
                          Worker A
                        </div>
                      </div>
                      {/* Buffered task blocks inside lanes */}
                      <div className="flex gap-1 mt-1.5 w-full justify-start overflow-hidden min-h-[16px] items-center">
                        {rabbitTasks.filter((t) => t.stage === "EXCHANGE_ROUTING" || t.stage === "PROCESSING").map((t) => (
                          <div key={t.id} className="w-2.5 h-2.5 rounded-sm bg-status-mutation animate-pulse shrink-0"></div>
                        ))}
                      </div>
                    </div>

                    {/* Row B: ship_queue */}
                    <div
                      ref={rabbitQueueShipRef}
                      className={`border p-2 rounded flex flex-col items-center justify-between font-mono text-[9px] relative transition-all duration-200 ${
                        rabbitActiveNode === "QUEUES" || (rabbitActiveNode === "WORKERS" && rabbitTasks[0]?.stage === "PROCESSING")
                          ? "border-status-info bg-status-info/5"
                          : "border-border-primary/50 bg-bg-primary/20"
                      }`}
                    >
                      <div className="flex justify-between w-full select-none items-center">
                        <span className="font-semibold text-text-secondary uppercase">ship_queue</span>
                        <div
                          ref={rabbitWorkerShipRef}
                          className={`px-1.5 py-0.5 border rounded text-[7px] font-bold uppercase select-none transition-colors duration-300 ${
                            rabbitActiveNode === "WORKERS" && rabbitTasks[0]?.stage === "PROCESSING"
                              ? "border-status-info bg-status-info/20 text-status-info bg-status-info/5"
                              : "border-border-primary text-text-muted bg-card-bg/40"
                          }`}
                        >
                          Worker B
                        </div>
                      </div>
                      {/* Buffered task blocks inside lanes */}
                      <div className="flex gap-1 mt-1.5 w-full justify-start overflow-hidden min-h-[16px] items-center">
                        {rabbitTasks.filter((t) => t.stage === "EXCHANGE_ROUTING" || t.stage === "PROCESSING").map((t) => (
                          <div key={t.id} className="w-2.5 h-2.5 rounded-sm bg-status-mutation shrink-0"></div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RabbitMQ Dead Letter Queue Node */}
                  <div
                    ref={rabbitQueueDlRef}
                    className={`bg-card-bg/80 border p-2.5 rounded flex flex-col relative transition-colors duration-300 ${
                      rabbitActiveNode === "DLQ" ? "border-status-error bg-status-error/10 text-status-error" : "border-border-primary text-text-primary"
                    }`}
                  >
                    <div className="flex justify-between items-center font-mono text-[9px] w-full select-none">
                      <span className="font-bold text-status-error uppercase flex items-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        dead_letter_queue
                      </span>
                    </div>
                    {/* Visual buffer blocks for DLQ */}
                    <div className="flex gap-1 mt-1.5 w-full justify-start overflow-hidden min-h-[16px] items-center">
                      {dlqTasks.map((t) => (
                        <div key={t.id} className="w-2.5 h-2.5 rounded-sm bg-status-error shrink-0 animate-pulse"></div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rabbit Animation Packets */}
                {rabbitTasks[0]?.stage === "PUBLISHING" && (
                  <RequestPacket
                    startCoords={coordsRProd}
                    endCoords={coordsRExch}
                    trigger={true}
                    duration={1.2}
                    onComplete={() => handleRabbitAnimComplete("PUBLISHING")}
                  />
                )}
                {rabbitTasks[0]?.stage === "EXCHANGE_ROUTING" && (
                  <>
                    <RequestPacket
                      startCoords={coordsRExch}
                      endCoords={coordsRQNotif}
                      trigger={true}
                      duration={1.2}
                      onComplete={() => handleRabbitAnimComplete("EXCHANGE_ROUTING")}
                      color="bg-status-mutation"
                    />
                    <RequestPacket
                      startCoords={coordsRExch}
                      endCoords={coordsRQShip}
                      trigger={true}
                      duration={1.2}
                      color="bg-status-mutation"
                    />
                  </>
                )}
                {rabbitTasks[0]?.stage === "PROCESSING" && (
                  <>
                    <RequestPacket
                      startCoords={coordsRQNotif}
                      endCoords={coordsRWNotif}
                      trigger={true}
                      duration={1.2}
                      onComplete={() => handleRabbitAnimComplete("PROCESSING")}
                      color="bg-status-info"
                    />
                    <RequestPacket
                      startCoords={coordsRQShip}
                      endCoords={coordsRWShip}
                      trigger={true}
                      duration={1.2}
                      color="bg-status-info"
                    />
                  </>
                )}
                {rabbitTasks[0]?.stage === "DLQ_ROUTING" && (
                  <RequestPacket
                    startCoords={coordsRWNotif}
                    endCoords={coordsRQDl}
                    trigger={true}
                    duration={1.2}
                    onComplete={() => handleRabbitAnimComplete("DLQ_ROUTING")}
                    color="bg-status-error"
                  />
                )}
                {rabbitTasks[0]?.stage === "ACK_DISPATCH" && (
                  <>
                    <RequestPacket
                      startCoords={coordsRWNotif}
                      endCoords={coordsRQNotif}
                      trigger={true}
                      duration={1.2}
                      onComplete={() => handleRabbitAnimComplete("ACK_DISPATCH")}
                      color="bg-status-success"
                    />
                    <RequestPacket
                      startCoords={coordsRWShip}
                      endCoords={coordsRQShip}
                      trigger={true}
                      duration={1.2}
                      color="bg-status-success"
                    />
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Translation Caption */}
        <div className="bg-card-bg border border-border-primary/40 p-4 rounded-lg text-xs text-text-muted leading-relaxed font-mono select-none">
          <strong>Translation:</strong> An exchange decides which queue a message goes to. When a worker can't process a message even after retrying, it goes to a dead-letter queue instead of vanishing — so nothing gets silently lost.
        </div>
      </section>

      {/* Observability disclaimer */}
      <section className="bg-section-dark border border-border-primary rounded-lg p-6 relative">
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-signature"></div>
        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-signature"></div>

        <div className="flex items-start space-x-3 text-left">
          <GithubIcon className="text-status-info shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-mono text-[9px] text-signature tracking-widest uppercase">
              [react-flow-licensing]
            </span>
            <h4 className="font-mono text-xs font-bold text-text-primary uppercase">
              Attribution License Information
            </h4>
            <p className="text-xs text-text-secondary leading-relaxed">
              This observability dashboard renders topology nodes leveraging xyflow React Flow components. Attributions and watermarks remain in compliance with React Flow's open-source developer terms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
