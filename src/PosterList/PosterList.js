import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import PosterForList from '../PosterForList/PosterForList'
import PosterDetail from '../PosterDetail/PosterDetail'
import styles from './PosterList.module.css';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const PosterList = props => {
    const { movie_id } = useParams();

    const [ posters, setPosters ] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${API_KEY}&language=en`)
        .then(res => res.json())
        .then(json => {
            setPosters(json.posters);
        })
    }, []);

    let poster_id = 0;

    return (
        <Router>
            <Switch>
                <Route exact path="/posters/:movie_id">
                    <div className={styles.posters}>
                        {posters.map(poster => {
                            return (
                                <PosterForList
                                    key={poster_id}
                                    poster_id={poster_id++}
                                    movie_id={movie_id}
                                    poster={poster}
                                />
                            )
                        })}
                    </div>
                </Route>
                <Route exact path="/posters/:movie_id/:poster_id">
                    <PosterDetail posters={posters} />
                </Route>
            </Switch>
        </Router>
    );
}

export default PosterList;
