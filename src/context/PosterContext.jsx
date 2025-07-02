import React, { createContext, useContext } from "react";

const PosterContext = createContext();

export const usePosters = () => useContext(PosterContext);

export const PosterProvider = ({ children }) => {
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const fetchPostersById = async (movieId) => {
    if (!movieId) {
      return null;
    }
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}&language=en`,
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.posters;
  };

  return (
    <PosterContext.Provider value={{ fetchPostersById }}>
      {children}
    </PosterContext.Provider>
  );
};
