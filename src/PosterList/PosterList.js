import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import PosterForList from '../PosterForList/PosterForList'
import styles from './PosterList.module.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const PosterList = props => {
    const { id } = useParams();

    const [ posters, setPosters ] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${API_KEY}&language=en`)
        .then(res => res.json())
        .then(json => {
            setPosters(json.posters);
        })
    }, []);

    let poster_id = 0;

    return (
        <div className={styles.posters}>
            {posters.map(poster => {
                return <PosterForList key={poster_id++} poster={poster} />
            })}
        </div>
    );
}

export default PosterList;
