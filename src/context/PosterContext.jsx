import React, { createContext, useState, useContext, useCallback } from "react";

const PosterContext = createContext();

export const usePosters = () => useContext(PosterContext);

export const PosterProvider = ({ children }) => {
  const [posters, setPosters] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const fetchPosters = useCallback(
    async (movieId) => {
      if (!movieId) {
        setPosters(null);
        return;
      }
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}&language=en`,
        );
        const data = await response.json();
        setPosters(data.posters);
      } catch (error) {
        console.error("Error fetching posters:", error);
        setPosters(null);
      }
    },
    [API_KEY],
  );

  return (
    <PosterContext.Provider value={{ posters, setPosters, fetchPosters }}>
      {children}
    </PosterContext.Provider>
  );
};
