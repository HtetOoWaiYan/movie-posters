import React from "react";
import { Link } from "react-router-dom";
import styles from './Poster.module.css';

const Poster = props => {
    return (
        <Link to={`/posters/${props.movie.id}`} title={`${props.movie.title} (${props.movie.release_date.substring(0, 4)})`}>
            <img src={`https://image.tmdb.org/t/p/w1280/${props.movie.poster_path}`} alt={props.movie.title} className={styles.poster}/>
        </Link>
    );
}

export default Poster;
