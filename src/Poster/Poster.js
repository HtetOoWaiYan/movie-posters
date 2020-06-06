import React from "react";
import styles from './Poster.module.css';

const Poster = props => {
    return (
        <a href={`https://image.tmdb.org/t/p/w1280/${props.movie.poster_path}`} >
            <img src={`https://image.tmdb.org/t/p/w1280/${props.movie.poster_path}`} className={styles.poster}/>
        </a>
    );
}

export default Poster;
