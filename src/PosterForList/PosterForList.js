import React from "react";
import { Link } from "react-router-dom";
import styles from './PosterForList.module.css';

const PosterForList = props => {
    return (
        <Link to={`/poster${props.poster.file_path}`}>
            <img src={`https://image.tmdb.org/t/p/w1280/${props.poster.file_path}`} className={styles.poster}/>
        </Link>
    );
}

export default PosterForList;
