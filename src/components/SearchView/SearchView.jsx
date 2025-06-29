import { Input } from "antd";
import MovieListDisplay from "../MovieListDisplay/MovieListDisplay.jsx";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./SearchView.module.css";
import { useMovieList } from "../../context/MovieListContext.jsx";
import Meta from "../Meta/Meta.jsx";

const { Search } = Input;

const SearchView = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const { movies, loading, searchMovies } = useMovieList();

  const [value, setValue] = useState(query);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      return;
    }
    navigate(`/search/${searchQuery}`);
  };

  useEffect(() => {
    if (query.trim() === "") {
      return;
    }
    searchMovies(query);
  }, [query, searchMovies]);

  return (
    <div>
      <Meta
        title={`Search results for "${query}" | Movie Posters`}
        description={`Search results for "${query}" on Movie Posters.`}
        image="/logo512.png"
      />
      <MovieListDisplay movies={movies} loading={loading} query={query}>
        <Search
          enterButton
          value={value}
          size="large"
          placeholder={"Search movies"}
          onChange={(e) => setValue(e.target.value)}
          onSearch={(searchQuery) => handleSearch(searchQuery)}
          className={styles.search}
        />
      </MovieListDisplay>
    </div>
  );
};

SearchView.displayName = "SearchView";

export default SearchView;
