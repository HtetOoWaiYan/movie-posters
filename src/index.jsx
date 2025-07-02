import "./index.css";
import React from "react";
import { Alert } from "antd";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App.jsx";

const queryClient = new QueryClient();

function ErrorFallback({ error }) {
  return (
    <Alert
      message="Something went wrong"
      description={error.message}
      type="error"
      showIcon
    />
  );
}

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
