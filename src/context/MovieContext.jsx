import React, { createContext, useState, useContext, useCallback } from "react";

const MovieContext = createContext();

export const useMovie = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movie, setMovie] = useState(null);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const fetchMovie = useCallback(
    async (movieId) => {
      if (!movieId) {
        setMovie(null);
        return;
      }
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`,
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setMovie(null);
      }
    },
    [API_KEY],
  );

  return (
    <MovieContext.Provider value={{ movie, setMovie, fetchMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
