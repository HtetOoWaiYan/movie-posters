import React from "react";
import Poster from "../Poster/Poster.jsx";
import styles from "./Posters.module.css";
import Meta from "../Meta/Meta.jsx";

const Posters = React.memo((props) => {
  return (
    <div className={styles.posters}>
      <Meta
        title="Movie Posters | Search and download movie posters"
        description="A website to search, view and download movie posters."
        image="/logo512.png"
      />
      {props.movies.map((movie) => {
        return (
          <Poster
            key={movie.id}
            movie={movie}
            fromSearch={props.fromSearch}
            searchQuery={props.searchQuery}
          />
        );
      })}
    </div>
  );
});

Posters.displayName = "Posters";

export default Posters;
