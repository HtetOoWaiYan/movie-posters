import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { MovieProvider } from "./context/MovieContext.jsx";
import { PosterProvider } from "./context/PosterContext.jsx";
import { MovieListProvider } from "./context/MovieListContext.jsx";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <MovieListProvider>
      <MovieProvider>
        <PosterProvider>
          <App />
        </PosterProvider>
      </MovieProvider>
    </MovieListProvider>
  </React.StrictMode>,
);
