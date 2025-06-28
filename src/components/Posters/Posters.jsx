import React from "react";
import Poster from "../Poster/Poster.jsx";
import styles from "./Posters.module.css";

const Posters = (props) => {
  return (
    <div className={styles.posters}>
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
};

export default Posters;
