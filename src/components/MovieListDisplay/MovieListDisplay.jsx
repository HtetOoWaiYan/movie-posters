import React from "react";
import { Empty, Spin } from "antd";
import Posters from "../Posters/Posters.jsx";
import styles from "./MovieListDisplay.module.css";

const MovieListDisplay = ({ movies, loading, query, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <div></div>
        {children}{" "}
        {/* This will render the specific search/filter input for Home or SearchView */}
      </div>
      {loading ? (
        <Spin size="large" className={styles.spin} />
      ) : (
        <Posters movies={movies} fromSearch={!!query} searchQuery={query} />
      )}
      {movies && movies.length === 0 && !loading ? <Empty /> : ""}
    </div>
  );
};

MovieListDisplay.displayName = "MovieListDisplay";

export default MovieListDisplay;
