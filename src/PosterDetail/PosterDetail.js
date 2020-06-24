import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import styles from './PosterDetail.module.css';
import { Breadcrumb, Button, Popover, Typography } from 'antd';
import {
    EyeOutlined,
    HomeOutlined,
    PictureOutlined,
    QuestionCircleOutlined,
} from '@ant-design/icons';
const { Text, Title } = Typography;

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

    const [ movie, setMovie ] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
            setMovie(prejson => json);
        })
    }, [ movie_id ]);

    // For download-information button
    const content = (
        <p>
            Due to <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy">same-origin policy</a>,<br/>
            a download button cannot be included<br/>
            as the data comes from TMDb API.
        </p>
    );

    // Breadcrumb routes
    const routes = [
        {
            path: '/',
            breadcrumbName: 'Home',
        },
        {
            path: `../../posters/${movie_id}`,
            breadcrumbName: `${movie.title && movie.title} (${movie.release_date && movie.release_date.substring(0, 4)})`,
        },
        {
            breadcrumbName: <PictureOutlined />,
        },
    ];

    function itemRender(route, params, routes, paths) {
        const home = routes.indexOf(route) === 0;
        const last = routes.indexOf(route) === routes.length - 1;
        if (home) {
            return <Link to={paths.join('/')}><HomeOutlined /> {route.breadcrumbName}</Link>
        }
        if (last) {
            return <span>{route.breadcrumbName}</span>;
        } else {
            return <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
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
                        {movie.title} ({movie.release_date && movie.release_date.substring(0, 4)})
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

export default PosterList;
