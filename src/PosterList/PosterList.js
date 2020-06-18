import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from "react-router-dom";
import Home from '../Home/Home';
import PosterForList from '../PosterForList/PosterForList';
import PosterDetail from '../PosterDetail/PosterDetail';
import styles from './PosterList.module.css';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

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
    }, [ movie_id ]);

    let poster_id = 0;

    const movieSelected = props.movies.filter(movie => movie.id === parseInt(movie_id));

    // Breadcrumb routes
    const routes = [
        {
            path: '/',
            breadcrumbName: 'Home',
        },
        {
            breadcrumbName: `${movieSelected[0] && movieSelected[0].title} (${movieSelected[0] && movieSelected[0].release_date.substring(0, 4)})`,
        },
    ];

    function itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <Link to={paths.join('/')}><HomeOutlined /> {route.breadcrumbName}</Link>
        );
    }

    return (
        <Router>
            <Switch>
                <Route exact path ="/">
                    <Home movies={props.movies}/>
                </Route>
                <Route exact path="/posters/:movie_id">
                    <Breadcrumb itemRender={itemRender} routes={routes}></Breadcrumb>
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
