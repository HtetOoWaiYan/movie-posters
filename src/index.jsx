import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import App from "./App.jsx";
import { MovieProvider } from "./context/MovieContext.jsx";
import { PosterProvider } from "./context/PosterContext.jsx";
import { MovieListProvider } from "./context/MovieListContext.jsx";

const queryClient = new QueryClient();

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
}

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <QueryClientProvider client={queryClient}>
        <MovieListProvider>
          <MovieProvider>
            <PosterProvider>
              <App />
            </PosterProvider>
          </MovieProvider>
        </MovieListProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
