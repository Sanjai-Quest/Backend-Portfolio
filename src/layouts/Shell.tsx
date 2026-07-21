import React, { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Send, 
  Network, 
  Database, 
  Cpu, 
  Layers, 
  AlertCircle
} from "lucide-react";
import { Footer } from "../components/Footer";
import { EndpointChip } from "../components/EndpointChip";

// Define our endpoints mapping for nav and layout
const ROUTES_MAP = [
  { path: "/", method: "GET", name: "Gateway", icon: Network, service: "gateway-service", host: "edge-proxy-01" },
  { path: "/about", method: "GET", name: "Identity", icon: Cpu, service: "identity-service", host: "cluster-node-04" },
  { path: "/projects", method: "GET", name: "Catalog", icon: Database, service: "catalog-service", host: "cluster-node-04" },
  { path: "/architecture", method: "GET", name: "Topology", icon: Layers, service: "topology-visualization-service", host: "cluster-node-04" },
  { path: "/contact", method: "POST", name: "Messaging", icon: Send, service: "messaging-service", host: "cluster-node-04" },
];

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const currentRouteInfo = useMemo(() => {
    return ROUTES_MAP.find(r => r.path === location.pathname) || {
      path: location.pathname,
      method: "GET",
      name: "Unknown",
      icon: AlertCircle,
      service: "unknown",
      host: "unknown"
    };
  }, [location.pathname]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-bg-primary text-text-primary font-sans select-none">
      
      {/* Skip-to-content link — visible on focus, off-screen when not focused */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-bg-secondary focus:text-text-primary focus:border focus:border-status-info focus:px-4 focus:py-2 focus:rounded focus:font-mono focus:text-xs focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* 1. Header (Height: 72px) */}
      <header className="h-[72px] shrink-0 border-b border-white/[.06] bg-chrome-bg px-4 md:px-6 flex items-center justify-between">
        
        {/* Logo and metadata */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2" aria-label="Sanjai L — Go to homepage">
            <div className="w-8 h-8 rounded bg-status-info flex items-center justify-center text-bg-primary font-mono font-bold text-sm" aria-hidden="true">
              LB
            </div>
            <div>
              <span className="font-mono text-sm font-bold tracking-tight text-text-primary">
                sanjai.dev
              </span>
              <span className="block text-[10px] font-mono text-text-muted">
                v1.0.0-foundation
              </span>
            </div>
          </Link>
          <div 
            title={`Active route path showing the HTTP method (${currentRouteInfo.method}) and endpoint URL (${location.pathname})`}
            className="hidden sm:flex items-center space-x-1.5 font-mono text-xs text-text-muted border-l border-border-primary/60 pl-4"
            aria-hidden="true"
          >
            <span className="text-status-success font-semibold">{currentRouteInfo.method}</span>
            <span>{location.pathname}</span>
          </div>
        </div>

        {/* Navigation - HTTP Request Lines */}
        <nav aria-label="Main navigation" className="flex flex-wrap justify-end gap-0.5 md:gap-1">
          {ROUTES_MAP.map((route) => {
            const isActive = location.pathname === route.path;
            return (
              <Link
                key={route.path}
                to={route.path}
                title={`View ${route.name} page (routes via ${route.method} method to ${route.service})`}
                aria-label={`View ${route.name} page`}
                aria-current={isActive ? "page" : undefined}
                className="contents"
              >
                <EndpointChip
                  method={route.method}
                  path={route.path}
                  label={route.name}
                  isActive={isActive}
                />
              </Link>
            );
          })}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download resume, opens PDF in new tab"
            title="Download resume PDF"
            className="contents"
          >
            <EndpointChip method="GET" path="/resume.pdf" label="Resume" />
          </a>
        </nav>
      </header>

      {/* Main Workspace Frame */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Center Workspace (Main active route content) */}
        <main id="main-content" tabIndex={-1} className="flex-1 overflow-y-auto bg-bg-primary p-4 md:p-6 lg:p-10">
          <div className="max-w-[1400px] mx-auto min-h-[calc(100%-80px)]">
            {children}
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
