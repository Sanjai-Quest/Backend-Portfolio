import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { AlertCircle, ArrowLeft, Terminal } from "lucide-react";

export const NotFound: React.FC = () => {
  const location = useLocation();
  const { requestId, timestamp } = React.useMemo(() => {
    const hex = Math.random().toString(16).substring(2, 8).toUpperCase();
    return {
      requestId: `REQ-${hex}`,
      timestamp: new Date().toISOString()
    };
  }, [location.pathname]);

  useEffect(() => {
    // Dispatch terminal log event
    const event = new CustomEvent("terminal-log", {
      detail: {
        type: "error",
        message: `[GATEWAY] Route mapping failed: GET ${location.pathname} matches no registered endpoint. Dispatching 404 response.`,
      },
    });
    window.dispatchEvent(event);
  }, [location.pathname]);

  const jsonResponse = {
    timestamp: timestamp,
    status: 404,
    error: "Not Found",
    message: `No handler found in Gateway route tables for GET ${location.pathname}`,
    path: location.pathname,
    requestId: requestId,
    suggestion: "Double-check the method or endpoint path, or return to GET /",
  };

  return (
    <div className="flex flex-col space-y-6 max-w-3xl mx-auto py-8">
      <Helmet>
        <title>404 Not Found — Sanjai L</title>
        <meta name="description" content="This route does not exist in the portfolio. Return to the homepage to find what you're looking for." />
      </Helmet>
      {/* HTTP 404 status display */}
      <div className="flex items-center space-x-4 bg-status-error/10 border border-status-error/30 p-6 rounded-lg">
        <div className="flex items-center justify-center w-12 h-12 bg-status-error/20 rounded-full text-status-error" aria-hidden="true">
          <AlertCircle size={24} />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-2xl font-bold text-status-error">404</span>
            <span className="font-mono text-sm px-2 py-0.5 rounded bg-status-error/20 text-status-error font-semibold">
              NOT FOUND
            </span>
          </div>
          <p className="text-text-secondary text-sm mt-1">
            The API Gateway could not map this request to any active microservice node.
          </p>
          <p className="text-text-muted text-xs mt-1.5 font-sans italic">
            Translation: This page doesn't exist — please check the URL or head back home.
          </p>
        </div>
      </div>

      {/* JSON response box */}
      <div className="bg-bg-secondary border border-border-primary rounded-lg overflow-hidden shadow-xl">
        <div className="flex items-center justify-between bg-card-bg px-4 py-3 border-b border-border-primary">
          <div className="flex items-center space-x-2 text-text-secondary font-mono text-xs">
            <Terminal size={14} className="text-text-muted" />
            <span>Response Payload (application/problem+json)</span>
          </div>
        </div>

        <div className="p-5 font-mono text-xs overflow-x-auto bg-bg-primary text-text-secondary">
          <pre className="leading-5">
            {`{`}
            {"\n"}
            {`  `}
            <span className="text-status-info">"timestamp"</span>:{" "}
            <span className="text-status-success">"{jsonResponse.timestamp}"</span>,{"\n"}
            {`  `}
            <span className="text-status-info">"status"</span>:{" "}
            <span className="text-status-warning">404</span>,{"\n"}
            {`  `}
            <span className="text-status-info">"error"</span>:{" "}
            <span className="text-status-success">"Not Found"</span>,{"\n"}
            {`  `}
            <span className="text-status-info">"message"</span>:{" "}
            <span className="text-status-success">
              "{jsonResponse.message}"
            </span>,{"\n"}
            {`  `}
            <span className="text-status-info">"path"</span>:{" "}
            <span className="text-status-success">"{jsonResponse.path}"</span>,{"\n"}
            {`  `}
            <span className="text-status-info">"requestId"</span>:{" "}
            <span className="text-status-success">"{jsonResponse.requestId}"</span>,{"\n"}
            {`  `}
            <span className="text-status-info">"suggestion"</span>:{" "}
            <span className="text-status-success">
              "{jsonResponse.suggestion}"
            </span>
            {"\n"}
            {`}`}
          </pre>
        </div>
      </div>

      {/* Nav back panel */}
      <div className="flex items-center justify-start">
        <Link
          to="/"
          className="flex items-center space-x-2 bg-border-primary hover:bg-card-hover text-text-primary px-4 py-2 rounded font-mono text-xs font-semibold border border-border-primary transition-all"
        >
          <ArrowLeft size={12} aria-hidden="true" />
          <span>GET / (Go Home)</span>
        </Link>
      </div>
    </div>
  );
};
