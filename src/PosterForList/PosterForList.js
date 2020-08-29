import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './PosterForList.module.css';

const PosterForList = props => {
    const location = useLocation();

    return (
        <Link
            to={{
                pathname: `/posters/${props.movie_id}/${props.poster_id}`,
                state: {
                    prevURL: location.pathname,
                    prevSearchURL: props.prevSearchURL,
                    movie: props.movie,
                    poster: props.poster
                }
            }}
        >
            <img
                src={`https://image.tmdb.org/t/p/w1280/${props.poster.file_path}`}
                alt="poster"
                className={styles.poster}
            />
        </Link>
    );
}

export default PosterForList;
