import React, { createContext, useState, useContext, useCallback } from "react";

const MovieListContext = createContext();

export const useMovieList = () => useContext(MovieListContext);

export const MovieListProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const fetchMoviesBySort = useCallback(
    async (sortType) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${sortType}?api_key=${API_KEY}`,
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies by sort:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY],
  );

  const searchMovies = useCallback(
    async (query) => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error searching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [API_KEY],
  );

  return (
    <MovieListContext.Provider
      value={{ movies, loading, fetchMoviesBySort, searchMovies }}
    >
      {children}
    </MovieListContext.Provider>
  );
};
