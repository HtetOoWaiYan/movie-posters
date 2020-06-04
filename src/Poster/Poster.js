import React from "react";
import styles from './Poster.module.css';

const Poster = props => {
    return (
        <a href="" >
            <img src="https://image.tmdb.org/t/p/original/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg" className={styles.poster}/>
        </a>
    );
}

export default Poster;
