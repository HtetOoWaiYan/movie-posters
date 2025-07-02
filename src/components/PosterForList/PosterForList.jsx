import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./PosterForList.module.css";

const PosterForList = React.memo((props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={`/posters/${props.movie_id}/${props.poster_id}`}
      state={{
        fromSearch: props.fromSearch,
        searchQuery: props.searchQuery,
      }}
      className={styles.posterForListContainer}
    >
      {!imageLoaded && <div className={styles.skeleton}></div>}
      <img
        src={`https://image.tmdb.org/t/p/w342/${props.poster.file_path}`}
        alt="poster"
        className={`${styles.poster} ${imageLoaded ? styles.loaded : styles.hidden}`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
    </Link>
  );
});

PosterForList.displayName = "PosterForList";

export default PosterForList;
