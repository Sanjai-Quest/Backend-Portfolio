import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader2 } from "lucide-react";

// Lazy load route pages to optimize initial bundle size
const Gateway = React.lazy(() => import("../pages/Gateway").then(m => ({ default: m.Gateway })));
const About = React.lazy(() => import("../pages/About").then(m => ({ default: m.About })));
const Projects = React.lazy(() => import("../pages/Projects").then(m => ({ default: m.Projects })));
const Architecture = React.lazy(() => import("../pages/Architecture").then(m => ({ default: m.Architecture })));
const Contact = React.lazy(() => import("../pages/Contact").then(m => ({ default: m.Contact })));
const NotFound = React.lazy(() => import("../pages/NotFound").then(m => ({ default: m.NotFound })));

// Custom loading fallback in the site's monospaced technical theme
const RouteLoadingFallback: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-3 font-mono text-xs text-text-muted">
      <Loader2 className="animate-spin text-status-info" size={24} />
      <span className="animate-pulse">[GATEWAY] downstream-proxy-routing in progress...</span>
    </div>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route path="/" element={<Gateway />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
