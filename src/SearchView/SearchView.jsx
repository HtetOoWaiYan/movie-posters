import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Posters from "../Posters/Posters.jsx";
import styles from "./SearchView.module.css";
import { Empty, Input, Spin } from "antd";
import { useMovieList } from "../context/MovieListContext.jsx";

const { Search } = Input;

const SearchView = () => {
  const { query } = useParams();
  const navigate = useNavigate();
  const { movies, loading, searchMovies } = useMovieList();

  const [value, setValue] = useState(query);

  const handleSearch = (searchQuery) => {
    navigate(`/search/${searchQuery}`);
  };

  useEffect(() => {
    searchMovies(query);
  }, [query, searchMovies]);

  return (
    <div>
      <div className={styles.inputs}>
        <div></div>
        <Search
          enterButton
          value={value}
          size="large"
          placeholder={"Search movies"}
          onChange={(e) => setValue(e.target.value)}
          onSearch={(searchQuery) => handleSearch(searchQuery)}
          className={styles.search}
        />
      </div>
      {loading ? (
        <Spin size="large" className={styles.spin} />
      ) : (
        <Posters movies={movies} fromSearch={true} searchQuery={query} />
      )}
      {movies.length === 0 && !loading ? <Empty /> : ""}
    </div>
  );
};

export default SearchView;
