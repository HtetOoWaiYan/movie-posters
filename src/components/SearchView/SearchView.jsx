import { Input } from "antd";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import Meta from "../Meta/Meta.jsx";
import styles from "./SearchView.module.css";
import { searchMoviesFn } from "../../api/movies.js";
import MovieListDisplay from "../MovieListDisplay/MovieListDisplay.jsx";

const { Search } = Input;

const SearchView = () => {
  const { query } = useParams();
  const navigate = useNavigate();

  const [currentSearchQuery, setCurrentSearchQuery] = useState(query);

  const { data: movies, isLoading: loading } = useQuery({
    queryKey: ["movies", currentSearchQuery],
    queryFn: () => searchMoviesFn(currentSearchQuery),
    enabled: !!currentSearchQuery,
  });

  useEffect(() => {
    setCurrentSearchQuery(query);
  }, [query]);

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      navigate(`/`);
      return;
    }
    setCurrentSearchQuery(searchQuery);
    navigate(`/search/${searchQuery}`);
  };

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
          value={currentSearchQuery}
          size="large"
          placeholder={"Search movies"}
          onChange={(e) => setCurrentSearchQuery(e.target.value)}
          onSearch={handleSearch}
          className={styles.search}
        />
      </MovieListDisplay>
    </div>
  );
};

SearchView.displayName = "SearchView";

export default SearchView;
