import React, { createContext, useContext } from "react";

const MovieListContext = createContext();

export const useMovieList = () => useContext(MovieListContext);

export const MovieListProvider = ({ children }) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const getMoviesBySort = async (sortType) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${sortType}?api_key=${API_KEY}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  };

  const searchMoviesFn = async (query) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.results;
  };

  return (
    <MovieListContext.Provider
      value={{ getMoviesBySort, searchMoviesFn }}
    >
      {children}
    </MovieListContext.Provider>
  );
};
