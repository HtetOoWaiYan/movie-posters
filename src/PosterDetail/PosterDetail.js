import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styles from './PosterDetail.module.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const PosterList = props => {
    const { movie_id, poster_id } = useParams();

    const posterSelected = props.posters.filter((poster, i) => {
        return i === parseInt(poster_id);
    })

    // Making sure above code doesn't return empty array
    let poster = [];

    if (posterSelected !== undefined && posterSelected.length !== 0) {
        poster = posterSelected[0];
    }

    return (
        <div className={styles.poster_detail}>
            <img
                src={`https://image.tmdb.org/t/p/w1280/${poster.file_path}`}
                alt="poster"
                className={styles.poster}
            />
            <div className={styles.information}>
                <span>{poster.aspect_ratio}</span><br/>
                <span>{poster.height} x {poster.width}</span>
            </div>
        </div>
    );
}

export default PosterList;
