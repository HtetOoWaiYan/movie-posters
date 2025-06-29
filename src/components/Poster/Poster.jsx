import React from "react";
import { Link } from "react-router-dom";
import styles from "./Poster.module.css";

const Poster = React.memo((props) => {
  return (
    <div>
      <Link
        to={{
          pathname: `/posters/${props.movie.id}`,
        }}
        state={{
          fromSearch: props.fromSearch,
          searchQuery: props.searchQuery,
        }}
        title={`${props.movie.title} (${props.movie.release_date && props.movie.release_date.substring(0, 4)})`}
      >
        <img
          src={`https://image.tmdb.org/t/p/w1280/${props.movie.poster_path}`}
          alt={`${props.movie.title} (${props.movie.release_date && props.movie.release_date.substring(0, 4)})`}
          className={styles.poster}
        />
      </Link>
    </div>
  );
});

Poster.displayName = "Poster";

export default Poster;
