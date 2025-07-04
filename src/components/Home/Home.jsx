import { Input, Select } from "antd";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";

import Meta from "../Meta/Meta.jsx";
import styles from "./Home.module.css";
import { getMoviesBySort, searchMoviesFn } from "../../api/movies.js";
import MovieListDisplay from "../MovieListDisplay/MovieListDisplay.jsx";

const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const { sort } = useParams();
  const navigate = useNavigate();

  const [sortType, setSortType] = useState(sort || "popular");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: movies, isLoading: loading } = useQuery({
    queryKey: ["movies", sortType, searchQuery],
    queryFn: () =>
      searchQuery ? searchMoviesFn(searchQuery) : getMoviesBySort(sortType),
  });

  useEffect(() => {
    if (sort) {
      setSortType(sort);
    }
  }, [sort]);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      setSearchQuery("");
      navigate(`/by/${sortType}`);
      return;
    }
    setSearchQuery(query);
    navigate(`/search/${query}`);
  };

  function handleChange(value) {
    setSortType(value);
    setSearchQuery("");
    navigate(`/by/${value}`);
  }

  return (
    <div>
      <Meta
        title="Movie Posters | Search and download movie posters"
        description="A website to search, view and download movie posters."
        image="/logo512.png"
      />
      <MovieListDisplay movies={movies} loading={loading}>
        <Search
          enterButton
          size="large"
          placeholder="Search movies"
          onSearch={handleSearch}
          className={styles.search}
        />
        <Select
          value={sortType}
          defaultValue="popular"
          onChange={handleChange}
          className={styles.select}
        >
          <Option value="popular">Popular</Option>
          <Option value="top_rated">Top-rated</Option>
          <Option value="now_playing">Now Playing</Option>
          <Option value="upcoming">Upcoming</Option>
        </Select>
      </MovieListDisplay>
    </div>
  );
};

Home.displayName = "Home";

export default Home;
