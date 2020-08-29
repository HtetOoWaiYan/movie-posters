import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, } from "react-router-dom";
import PosterForList from '../PosterForList/PosterForList';
import styles from './PosterList.module.css';
import { Breadcrumb } from 'antd';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const PosterList = props => {
    const { movie_id } = useParams();
    const location = useLocation();
    let isSearch = false;

    const [ movie, setMovie ] = useState([]);
    useEffect(() => {
        if (location.state === undefined) {
            fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`)
            .then(res => res.json())
            .then(json => {
                setMovie(json);
            })
        }
    }, [ location.state, movie_id ]);

    const [ posters, setPosters ] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${API_KEY}&language=en`)
        .then(res => res.json())
        .then(json => {
            setPosters(json.posters);
        })
    }, [ movie_id ]);

    let movieSelected = movie;

    // Breadcrumb routes for manaul URL input
    let routes = [
        {
            path: '/',
            breadcrumbName: 'Home',
        },
        {
            breadcrumbName: `${movie && movie.title} (${movie.release_date && movie.release_date.substring(0, 4)})`,
        },
    ];

    if (location.state !== undefined && location.state.prevURL) {
        /**
         * If the click comes from home page
         * Else if the click comes from SearchView page
         * Else if the click comes from PosterDetail page is in search mode
         * Else if the click comes from PosterDetail page
         */
        if (location.state.prevURL === "/") {
            let movieSelectedArray = props.movies.filter(movie => movie.id === parseInt(movie_id));
            movieSelected = movieSelectedArray[0];

            routes = [
                {
                    path: '/',
                    breadcrumbName: 'Home',
                },
                {
                    breadcrumbName: `${movieSelected && movieSelected.title} (${movieSelected && movieSelected.release_date.substring(0, 4)})`,
                },
            ];
        } else if (location.state.prevURL.substring(1, 7) === "search") {
            isSearch = true;
            movieSelected = location.state.movie;

            routes = [
                {
                    path: `../${location.state.prevURL.substring(1)}`,
                    breadcrumbName: 'Search',
                },
                {
                    breadcrumbName: `${movieSelected.title} (${movieSelected.release_date.substring(0, 4)})`,
                },
            ];
        } else if (location.state.prevSearchURL.substring(1, 7) === "search") {
            isSearch = true;
            movieSelected = location.state.movie;

            routes = [
                {
                    path: `../${location.state.prevSearchURL.substring(1)}`,
                    breadcrumbName: 'Search',
                },
                {
                    breadcrumbName: `${movieSelected.title} (${movieSelected.release_date.substring(0, 4)})`,
                },
            ];
        } else {
            movieSelected = location.state.movie;

            routes = [
                {
                    path: '/',
                    breadcrumbName: 'Home',
                },
                {
                    breadcrumbName: `${movieSelected.title} (${movieSelected.release_date.substring(0, 4)})`,
                },
            ];
        }
    }

    // console.log(poster_id);
    // console.log(location);
    // console.log(movieSelected[0]);

    function itemRender(route, params, routes, paths) {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <Link to={paths.join('/')}>{isSearch ? <SearchOutlined /> : <HomeOutlined />} {route.breadcrumbName}</Link>
        );
    }

    let generated_poster_id = 0;

    return (
        <div>
            <Breadcrumb
                itemRender={itemRender}
                routes={routes}
                className={styles.breadcrumb}
            >
            </Breadcrumb>
            <div className={styles.posters}>
                {posters.map(poster => {
                    return (
                        <PosterForList
                            key={generated_poster_id}
                            poster_id={generated_poster_id++}
                            movie_id={movie_id}
                            movie={movieSelected}
                            poster={poster}
                            prevSearchURL={isSearch ? location.state.prevURL : ""}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default PosterList;
