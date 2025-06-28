import { Empty, Input, Select, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./Home.module.css";
import Posters from "../Posters/Posters.jsx";
import { useMovieList } from "../../context/MovieListContext.jsx";
import Meta from "../Meta/Meta.jsx";

const { Search } = Input;
const { Option } = Select;

const Home = () => {
  const { sort } = useParams();
  const navigate = useNavigate();
  const { movies, loading, fetchMoviesBySort } = useMovieList();

  const [value, setValue] = useState(sort ? sort : "popular");

  useEffect(() => {
    fetchMoviesBySort(value);
  }, [value, fetchMoviesBySort]);

  const handleSearch = (query) => navigate(`/search/${query}`);

  function handleChange(value) {
    setValue(value);
    navigate(`/by/${value}`);
  }

  return (
    <div>
      <Meta
        title="Movie Posters | Search and download movie posters"
        description="A website to search, view and download movie posters."
        image="/logo512.png"
      />
      <div className={styles.inputs}>
        <div></div>
        <Search
          enterButton
          size="large"
          placeholder="Search movies"
          onSearch={(query) => handleSearch(query)}
          className={styles.search}
        />
        <Select
          value={value}
          defaultValue="lucy"
          onChange={handleChange}
          className={styles.select}
        >
          <Option value="popular">Popular</Option>
          <Option value="top_rated">Top-rated</Option>
          <Option value="now_playing">Now Playing</Option>
          <Option value="upcoming">Upcoming</Option>
        </Select>
      </div>
      {loading ? (
        <Spin size="large" className={styles.spin} />
      ) : (
        <Posters movies={movies} />
      )}
      {movies.length === 0 && !loading ? <Empty /> : ""}
    </div>
  );
};

export default Home;
