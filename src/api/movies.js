const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const fetchMovieById = async (movieId) => {
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

export const getMoviesBySort = async (sortType) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${sortType}?api_key=${API_KEY}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.results;
};

export const searchMoviesFn = async (query) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data.results;
};
