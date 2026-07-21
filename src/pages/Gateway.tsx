import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Mail, ArrowRight, Download } from "lucide-react";
import { Button } from "../components/Button";

// Import custom components
import { StatusBadge } from "../components/StatusBadge";
import { SectionHeader } from "../components/SectionHeader";
import { TechBadge } from "../components/TechBadge";
import { RequestPacket } from "../components/RequestPacket";
import { TerminalLog } from "../components/TerminalLog";
import type { LogItem } from "../components/TerminalLog";

// Custom inline SVG icons for robust module compatibility
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Gateway: React.FC = () => {
  const navigate = useNavigate();
  const [packetTrigger, setPacketTrigger] = useState(false);
  const [logs, setLogs] = useState<LogItem[]>([]);

  // Initialize logs on client mount to avoid ssr/diff timestamp mismatches
  useEffect(() => {
    setLogs([
      { timestamp: new Date().toLocaleTimeString(), level: "INFO", message: "Gateway routing initialized." },
      { timestamp: new Date().toLocaleTimeString(), level: "INFO", message: "Edge node proxy responding on GET /" },
    ]);
  }, []);

  // Coordinates for request packet animation
  const sourceRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const [startCoords, setStartCoords] = useState({ x: 0, y: 0 });
  const [endCoords, setEndCoords] = useState({ x: 0, y: 0 });

  const updateCoordinates = () => {
    if (sourceRef.current && targetRef.current) {
      const sourceRect = sourceRef.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();
      const parentRect = heroSectionRef.current?.getBoundingClientRect() || { left: 0, top: 0 };

      setStartCoords({
        x: sourceRect.left - parentRect.left + sourceRect.width / 2,
        y: sourceRect.top - parentRect.top + sourceRect.height / 2,
      });
      setEndCoords({
        x: targetRect.left - parentRect.left + targetRect.width / 2,
        y: targetRect.top - parentRect.top + targetRect.height / 2,
      });
    }
  };

  useEffect(() => {
    updateCoordinates();
    // Delay slightly to ensure fonts and layouts are stable
    const timer = setTimeout(updateCoordinates, 200);
    window.addEventListener("resize", updateCoordinates);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateCoordinates);
    };
  }, []);

  const handleSendPacket = () => {
    if (packetTrigger) return;
    setLogs((prev) => [
      ...prev,
      {
        timestamp: new Date().toLocaleTimeString(),
        level: "INFO",
        message: `[edge-proxy] Request dispatched: Method=GET Path=/`,
      },
    ]);
    setPacketTrigger(true);
  };

  const handlePacketComplete = () => {
    setPacketTrigger(false);
    setLogs((prev) => [
      ...prev,
      {
        timestamp: new Date().toLocaleTimeString(),
        level: "INFO",
        message: `[gateway-router] Destination reached. Status: 200 OK`,
      },
    ]);
  };

  // Hover logs trigger
  const handleCardHover = (projectName: string) => {
    setLogs((prev) => {
      // Avoid duplicate spamming logs by checking latest log message
      const lastLog = prev[prev.length - 1];
      const targetMsg = `[resolver] Inspecting microservice node metadata: ${projectName.toLowerCase()}.internal`;
      if (lastLog && lastLog.message === targetMsg) return prev;
      return [
        ...prev,
        {
          timestamp: new Date().toLocaleTimeString(),
          level: "INFO",
          message: targetMsg,
        },
      ];
    });
  };

  // Tech items
  const engineeringFocus = useMemo(
    () => [
      "Distributed Systems",
      "Event-Driven Architecture",
      "Microservices",
      "Backend Performance",
      "Caching Strategies",
      "System Design",
      "Production-grade Spring Boot applications",
      "Building interactive products that explain backend engineering concepts",
    ],
    []
  );

  // Capabilities items
  const capabilities = useMemo(
    () => [
      { name: "Java", description: "Building reliable backend services with strong typing and JVM performance in mind.", status: "READY" },
      { name: "Spring Boot", description: "Production-grade REST APIs and layered service architecture across every real project in this portfolio.", status: "ACTIVE" },
      { name: "Distributed Systems", description: "Designing services that communicate asynchronously across process boundaries instead of sharing memory.", status: "HEALTHY" },
      { name: "Event-Driven Architecture", description: "Modeling systems around events and asynchronous message flow rather than tight coupling.", status: "OPERATIONAL" },
      { name: "Caching", description: "Applying Redis to cut redundant reads and reduce API response time.", status: "READY" },
      { name: "Messaging", description: "Using RabbitMQ and Kafka-compatible brokers to decouple producers from consumers and absorb load spikes.", status: "ACTIVE" },
      { name: "System Design", description: "Breaking a single monolith's worth of responsibility into services that scale and fail independently.", status: "HEALTHY" },
      { name: "Microservices", description: "Splitting a system into independently deployable services connected through queues and APIs.", status: "OPERATIONAL" },
    ],
    []
  );

  return (
    <div className="space-y-12">
      <Helmet>
        <title>Sanjai L — Backend Engineer</title>
        <meta
          name="description"
          content="Portfolio of Sanjai L, a backend engineer specialising in distributed systems, event-driven architecture and microservices. Explore projects: PlanWizz, DevSecWatch, TriNetra AI, DunesDay."
        />
        <meta property="og:title" content="Sanjai L — Backend Engineer" />
        <meta
          property="og:description"
          content="Backend engineer building distributed systems, event pipelines, and microservices. Explore real projects including PlanWizz, DevSecWatch, TriNetra AI, and DunesDay."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sanjai.dev/" />
      </Helmet>
      {/* 1. Hero Block with Grid Pattern */}
      <section ref={heroSectionRef} className="bg-section-light bg-blueprint-grid border border-white/[.10] rounded-xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8 min-h-[300px]">
        <div className="space-y-4 max-w-2xl text-left z-10">
          <div className="flex items-center space-x-2 select-none">
            <span className="font-mono text-[9px] md:text-[10px] font-bold text-status-success bg-status-success/5 border border-status-success/30 px-2 py-0.5 rounded uppercase tracking-wider">
              200 OK
            </span>
            <span className="font-mono text-xs text-text-secondary select-none">
              GET / (gateway_health_check)
            </span>
          </div>
          <h1 className="font-serif text-xl md:text-3xl font-bold tracking-tight text-text-primary uppercase leading-tight">
            Sanjai L — System Architect
          </h1>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed font-sans max-w-xl">
            An engineer whose portfolio behaves like a system, drawn the way that system's own architecture diagrams would be drawn.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
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
            <div
              ref={sourceRef}
              onClick={handleSendPacket}
              className="cursor-pointer font-mono text-xs font-bold text-status-info hover:text-status-info/80 border border-status-info/30 hover:border-status-info/50 bg-status-info/5 px-3 py-1.5 rounded transition-all select-none flex items-center gap-1.5"
            >
              <span>[client-request-trigger]</span>
              <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </div>
            <div
              ref={targetRef}
              className="font-mono text-xs text-text-muted bg-card-bg/40 border border-border-primary/50 px-3 py-1.5 rounded select-none"
            >
              <span>gateway_endpoint</span>
            </div>
          </div>
        </div>



        {/* Floating animated request lines mapping */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <RequestPacket
            startCoords={startCoords}
            endCoords={endCoords}
            trigger={packetTrigger}
            onComplete={handlePacketComplete}
          />
        </div>
      </section>

      {/* 2. System Capabilities Grid */}
      <section className="bg-section-dark rounded-xl p-6 space-y-6">
        <SectionHeader title="System Capabilities" eyebrow="GET /capabilities" badgeText="Healthy" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.name}
              onMouseEnter={() => handleCardHover(cap.name)}
              className="relative bg-card-bg border border-border-primary hover:border-signature/40 hover:bg-card-hover p-5 rounded-lg transition-all duration-200 group flex flex-col justify-between h-full min-h-[120px] hover:shadow-glow-hover"
            >
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-border-primary/60 group-hover:border-signature transition-colors duration-200"></div>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-border-primary/60 group-hover:border-signature transition-colors duration-200"></div>
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-border-primary/60 group-hover:border-signature transition-colors duration-200"></div>
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-border-primary/60 group-hover:border-signature transition-colors duration-200"></div>
 
              <div className="space-y-2">
                <div className="flex justify-between items-center gap-2">
                  <h3 className="text-xs font-bold font-mono tracking-tight text-text-primary group-hover:text-signature transition-colors duration-150 uppercase">
                    {cap.name}
                  </h3>
                  <StatusBadge status={cap.status} showDot={true} pulse={cap.status === "ACTIVE" || cap.status === "HEALTHY"} />
                </div>
                <p className="text-text-muted text-[11px] leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          ))}
        </div>
 
        <div className="flex flex-col items-center justify-center pt-4 space-y-1 select-none">
          <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest">
            EXPLORE IMPLEMENTATIONS
          </span>
          <button
            onClick={() => navigate("/projects")}
            className="font-mono text-xs font-bold text-status-info border border-status-info/30 bg-status-info/5 px-4 py-2.5 rounded hover:bg-status-info/10 transition-all flex items-center gap-2 group focus:outline-none focus:ring-1 focus:ring-status-info/50"
            aria-label="Navigate to all projects inventory"
          >
            <span>GET /projects</span>
            <span className="text-text-muted font-normal text-[10px] group-hover:text-status-info transition-colors">(view_all_services)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>
 
      {/* 3. Focus & System Logs Split */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Engineering Focus Box */}
        <div className="border border-border-primary bg-card-bg p-6 rounded-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-signature"></div>
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-signature"></div>
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-signature"></div>
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-signature"></div>
          
          <div>
            <SectionHeader title="Engineering Focus" eyebrow="METADATA" />
            <div className="flex flex-wrap gap-2 mt-4">
              {engineeringFocus.map((focus) => (
                <TechBadge key={focus} name={focus} />
              ))}
            </div>
          </div>
        </div>
 
        {/* Simulated Telemetry Terminal Log */}
        <div className="flex flex-col h-[280px] lg:h-auto">
          <SectionHeader title="Telemetry Stream" eyebrow="STREAM" />
          <div className="flex-1 min-h-[200px]">
            <TerminalLog logs={logs} />
          </div>
        </div>
      </section>
 
      {/* 4. Connect Block */}
      <section className="bg-section-dark border border-border-primary rounded-lg p-6 relative">
        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-signature"></div>
        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-signature"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <span className="font-mono text-[9px] text-signature select-none uppercase tracking-wider">
              [connect-handshake]
            </span>
            <h3 className="font-mono text-sm font-bold text-text-primary uppercase tracking-tight">
              Establish Connection
            </h3>
          </div>
          <div className="flex flex-wrap gap-4 font-mono text-xs">
            <a
              href="mailto:sanjaioff@gmail.com"
              title="Send email to sanjaioff@gmail.com"
              className="flex items-center space-x-1.5 text-text-secondary hover:text-status-info transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-status-info shrink-0" />
              <span>sanjaioff@gmail.com</span>
            </a>
            <a
              href="https://github.com/Sanjai-Quest"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Sanjai's GitHub Profile"
              className="flex items-center space-x-1.5 text-text-secondary hover:text-status-info transition-colors"
            >
              <GithubIcon className="text-status-info shrink-0" />
              <span>github.com/Sanjai-Quest</span>
            </a>
            <a
              href="https://www.linkedin.com/in/sanjai-l"
              target="_blank"
              rel="noopener noreferrer"
              title="Open Sanjai's LinkedIn Profile"
              className="flex items-center space-x-1.5 text-text-secondary hover:text-status-info transition-colors"
            >
              <LinkedinIcon className="text-status-info shrink-0" />
              <span>linkedin.com/in/sanjai-l</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
