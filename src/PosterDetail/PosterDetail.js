import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation, } from "react-router-dom";
import styles from './PosterDetail.module.css';
import { Breadcrumb, Button, Popover, Typography } from 'antd';
import {
    EyeOutlined,
    HomeOutlined,
    PictureOutlined,
    QuestionCircleOutlined,
    SearchOutlined
} from '@ant-design/icons';
const { Text, Title } = Typography;

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const PosterDetail = props => {
    const { movie_id, poster_id } = useParams();
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
        if (location.state === undefined) {
            fetch(`https://api.themoviedb.org/3/movie/${movie_id}/images?api_key=${API_KEY}&language=en`)
            .then(res => res.json())
            .then(json => {
                setPosters(json.posters);
            })
        }
    }, [ location.state, movie_id ]);

    let poster = [];
    let routes = [];
    let movieSelected = [];

    // If it is a manually entered URL
    if (location.state === undefined) {
        movieSelected = movie;

        const posterSelected = posters.filter((poster, i) => {
            return i === parseInt(poster_id);
        })

        if (posterSelected !== undefined && posterSelected.length !== 0) {
            poster = posterSelected[0];
        }

        routes = [
            {
                path: '/',
                breadcrumbName: 'Home',
            },
            {
                path: `../${movie_id}`,
                breadcrumbName: `${movie && movie.title} (${movie.release_date && movie.release_date.substring(0, 4)})`,
            },
            {
                breadcrumbName: <PictureOutlined />,
            },
        ];
    }

    if (location.state !== undefined) {
        poster = location.state.poster;
        movieSelected = location.state.movie;

        // If the click comes from PosterList is in search mode
        if (location.state.prevSearchURL !== "") {
            isSearch = true;

            routes = [
                {
                    path: `../../${location.state.prevSearchURL.substring(1)}`,
                    breadcrumbName: 'Search',
                },
                {
                    path: `../${movie_id}`,
                    breadcrumbName: `${movieSelected.title} (${movieSelected.release_date && movieSelected.release_date.substring(0, 4)})`,
                },
                {
                    breadcrumbName: <PictureOutlined />,
                },
            ];
        } else {
            routes = [
                {
                    path: '/',
                    breadcrumbName: 'Home',
                },
                {
                    path: `../${movie_id}`,
                    breadcrumbName: `${movieSelected.title} (${movieSelected.release_date && movieSelected.release_date.substring(0, 4)})`,
                },
                {
                    breadcrumbName: <PictureOutlined />,
                },
            ];
        }
    }

    // For download-information button
    const content = (
        <p>
            Due to <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy">same-origin policy</a>,<br/>
            a download button cannot be included<br/>
            as the data comes from TMDb API.
        </p>
    );

    // console.log(location);

    function itemRender(route, params, routes, paths) {
        const home = routes.indexOf(route) === 0;
        const last = routes.indexOf(route) === routes.length - 1;
        if (home) {
            return <Link to={paths.join('/')}>{isSearch ? <SearchOutlined /> : <HomeOutlined />} {route.breadcrumbName}</Link>
        }
        if (last) {
            return <span>{route.breadcrumbName}</span>;
        } else {
            return <Link
                to={{
                    pathname: `../${movie_id}`,
                    state: {
                        prevURL: location.pathname,
                        prevSearchURL: location.state.prevSearchURL,
                        movie: movieSelected
                    }
                }}
            >{route.breadcrumbName}</Link>;
        }
    }

    return (
        <div>
            <Breadcrumb
                itemRender={itemRender}
                routes={routes}
                className={styles.breadcrumb}
            ></Breadcrumb>
            <div className={styles.poster_detail}>
                <div className={styles.image_space}>
                    <img
                        src={`https://image.tmdb.org/t/p/w1280/${poster.file_path}`}
                        alt="poster"
                        className={styles.poster}
                    />
                    <Text
                        code
                        className={styles.image_size}
                    >{poster.width} x {poster.height} pixels</Text>
                </div>
                <div className={styles.information}>
                    <Title className={styles.title}>
                        {movieSelected && movieSelected.title} ({movieSelected.release_date && movieSelected.release_date.substring(0, 4)})
                    </Title>
                    <div>
                        <Button
                            icon={<EyeOutlined />}
                            size="middle"
                            href={`https://image.tmdb.org/t/p/w1280/${poster.file_path}`}
                            target="_blank"
                        >
                            View in Browser
                        </Button>
                        <Popover placement="top" content={content}>
                            <Button type="link">
                                <QuestionCircleOutlined />
                            </Button>
                        </Popover>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PosterDetail;
