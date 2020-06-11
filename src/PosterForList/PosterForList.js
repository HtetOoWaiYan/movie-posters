import React from "react";
import { Link } from "react-router-dom";
import styles from './PosterForList.module.css';

const PosterForList = props => {
    return (
        <Link to={`/posters/${props.movie_id}/${props.poster_id}`}>
            <img
                src={`https://image.tmdb.org/t/p/w1280/${props.poster.file_path}`}
                alt="poster"
                className={styles.poster}
            />
        </Link>
    );
}

export default PosterForList;
