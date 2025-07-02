import React, { createContext, useContext } from "react";

const MovieContext = createContext();

export const useMovie = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const fetchMovieById = async (movieId) => {
    if (!movieId) {
      return null;
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  return (
    <MovieContext.Provider value={{ fetchMovieById }}>
      {children}
    </MovieContext.Provider>
  );
};
