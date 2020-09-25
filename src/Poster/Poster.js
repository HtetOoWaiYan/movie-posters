import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './Poster.module.css';

const Poster = props => {
    const location = useLocation();

    return (
        <div>
            <Link
                to={{
                    pathname: `/posters/${props.movie.id}`,
                    state: { prevURL: location.pathname, movie: props.movie }
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
}

export default Poster;
