import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, } from "react-router-dom";
import PosterForList from '../PosterForList/PosterForList';
import styles from './PosterList.module.css';
import { Breadcrumb, Empty } from 'antd';
import { HomeOutlined, SearchOutlined } from '@ant-design/icons';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const PosterList = props => {
    const { movie_id } = useParams();
    const location = useLocation();

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

    let movieSelected = movie;
    let isSearch = false;
    let prevSearchURL = "";

    if (location.state !== undefined && location.state.prevURL) {
        movieSelected = location.state.movie;

        let routePath = "";
        let routeBreadcrumbName = "";

        /**
         * If the click comes from home page
         * Else if the click comes from SearchView page
         * Else if the click comes from PosterDetail page is in search mode
         * Else if the click comes from PosterDetail page
         */
        if (location.state.prevURL === "/") {
            routePath = `../${location.state.prevURL.substring(1)}`;
            routeBreadcrumbName = 'Home';

        } else if (location.state.prevURL.substring(1, 3) === "by") {
            routePath = `../${location.state.prevURL.substring(1)}`;
            routeBreadcrumbName = 'Home';

        } else if (location.state.prevURL.substring(1, 7) === "search") {
            isSearch = true;
            prevSearchURL = location.state.prevURL;

            routePath = `../${location.state.prevURL.substring(1)}`;
            routeBreadcrumbName = 'Search';

        } else if (location.state.prevSearchURL && location.state.prevSearchURL.substring(1, 7) === "search") {
            isSearch = true;
            prevSearchURL = location.state.prevSearchURL;

            routePath = `../${location.state.prevSearchURL.substring(1)}`;
            routeBreadcrumbName = 'Search';

        } else {
            routePath = '/';
            routeBreadcrumbName = 'Home';
        }

        routes = [
            {
                path: routePath,
                breadcrumbName: routeBreadcrumbName,
            },
            {
                breadcrumbName: `${movieSelected.title} (${movieSelected.release_date.substring(0, 4)})`,
            },
        ];
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
            {
                posters.length !== 0
                ? <div className={styles.posters}>
                    {posters.map(poster => {
                        return (
                            <PosterForList
                                key={generated_poster_id}
                                poster_id={generated_poster_id++}
                                movie_id={movie_id}
                                movie={movieSelected}
                                poster={poster}
                                prevSearchURL={prevSearchURL}
                            />
                        )
                    })}
                </div>
                : <Empty />
            }
        </div>
    );
}

export default PosterList;
