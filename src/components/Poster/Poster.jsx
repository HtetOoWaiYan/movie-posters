import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Poster.module.css";

const Poster = React.memo((props) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles.posterContainer}>
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
        {!imageLoaded && <div className={styles.skeleton}></div>}
        <img
          src={`https://image.tmdb.org/t/p/w342/${props.movie.poster_path}`}
          alt={`${props.movie.title} (${props.movie.release_date && props.movie.release_date.substring(0, 4)})`}
          className={`${styles.poster} ${imageLoaded ? styles.loaded : styles.hidden}`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
      </Link>
    </div>
  );
});

Poster.displayName = "Poster";

export default Poster;
