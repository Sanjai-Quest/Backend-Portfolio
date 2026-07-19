import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Terminal, AlertTriangle, RefreshCw } from "lucide-react";

interface NotImplementedPageProps {
  method?: string;
  serviceName: string;
}

export const NotImplementedPage: React.FC<NotImplementedPageProps> = ({
  method = "GET",
  serviceName,
}) => {
  const location = useLocation();
  const { requestId, timestamp } = React.useMemo(() => {
    const hex = Math.random().toString(16).substring(2, 8).toUpperCase();
    return {
      requestId: `REQ-${hex}`,
      timestamp: new Date().toISOString()
    };
  }, [location.pathname]);

  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    // Push event to custom terminal event
    const event = new CustomEvent("terminal-log", {
      detail: {
        type: "warn",
        message: `[GATEWAY] Retrying connection to '${method} ${location.pathname}' via proxy...`,
      },
    });
    window.dispatchEvent(event);

    setTimeout(() => {
      setIsRetrying(false);
      const failEvent = new CustomEvent("terminal-log", {
        detail: {
          type: "error",
          message: `[GATEWAY] Connection timeout. service '${serviceName}' at host 'cluster-node-04' failed healthcheck. Status: 501 Not Implemented.`,
        },
      });
      window.dispatchEvent(failEvent);
    }, 1000);
  };

  const jsonResponse = {
    timestamp: timestamp,
    status: 501,
    error: "Not Implemented",
    message: `Service '${serviceName}' is registered but the backend processor is not online yet.`,
    path: location.pathname,
    requestId: requestId,
    host: "cluster-node-04",
    tier: "free-tier-micro",
  };

  return (
    <div className="flex flex-col space-y-6 max-w-3xl mx-auto py-8">
      {/* HTTP Status Code Display */}
      <div className="flex items-center space-x-4 bg-status-error/10 border border-status-error/30 p-6 rounded-lg">
        <div className="flex items-center justify-center w-12 h-12 bg-status-error/20 rounded-full text-status-error">
          <AlertTriangle size={24} />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-mono text-2xl font-bold text-status-error">501</span>
            <span className="font-mono text-sm px-2 py-0.5 rounded bg-status-error/20 text-status-error font-semibold">
              NOT IMPLEMENTED
            </span>
          </div>
          <p className="text-text-secondary text-sm mt-1">
            The API Gateway successfully routed the request, but the downstream microservice is currently offline.
          </p>
          <p className="text-text-muted text-xs mt-1.5 font-sans italic">
            Translation: This page isn't built yet — check back soon.
          </p>
        </div>
      </div>

      {/* Response Details Card */}
      <div className="bg-bg-secondary border border-border-primary rounded-lg overflow-hidden shadow-xl">
        <div className="flex items-center justify-between bg-card-bg px-4 py-3 border-b border-border-primary">
          <div className="flex items-center space-x-2 text-text-secondary font-mono text-xs">
            <Terminal size={14} className="text-text-muted" />
            <span>Response Payload (application/problem+json)</span>
          </div>
          <div className="flex items-center space-x-1 font-mono text-xs text-text-muted">
            <span>Size: ~342 bytes</span>
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
            <span className="text-status-warning">501</span>,{"\n"}
            {`  `}
            <span className="text-status-info">"error"</span>:{" "}
            <span className="text-status-success">"Not Implemented"</span>,{"\n"}
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
            <span className="text-status-info">"host"</span>:{" "}
            <span className="text-status-success">"{jsonResponse.host}"</span>,{"\n"}
            {`  `}
            <span className="text-status-info">"tier"</span>:{" "}
            <span className="text-status-success">"{jsonResponse.tier}"</span>
            {"\n"}
            {`}`}
          </pre>
        </div>
      </div>

      {/* Control panel */}
      <div className="flex items-center justify-between p-4 bg-card-bg/50 border border-border-primary/50 rounded-lg">
        <span className="text-xs text-text-muted font-mono">
          Gateway Proxy Node: v1.0.0-reactive
        </span>
        <button
          onClick={handleRetry}
          disabled={isRetrying}
          className="flex items-center space-x-2 bg-border-primary hover:bg-card-hover text-text-primary px-4 py-2 rounded font-mono text-xs font-semibold border border-border-primary transition-all disabled:opacity-50"
        >
          <RefreshCw size={12} className={isRetrying ? "animate-spin" : ""} />
          <span>{isRetrying ? "Connecting..." : "Ping Service"}</span>
        </button>
      </div>
    </div>
  );
};
