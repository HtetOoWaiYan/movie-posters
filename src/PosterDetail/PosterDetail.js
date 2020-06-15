import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import styles from './PosterDetail.module.css';
import { Typography, Button, Radio } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

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
            setMovie(json);
        })
    }, []);

    return (
        <div className={styles.poster_detail}>
            <div className={styles.image_space}>
                <img
                    src={`https://image.tmdb.org/t/p/w1280/${poster.file_path}`}
                    alt="poster"
                    className={styles.poster}
                />
                <Text code>{poster.width} x {poster.height} pixels</Text>
            </div>
            <div className={styles.information}>
                <Title className={styles.title}>
                    {movie.title} ({movie.release_date && movie.release_date.substring(0, 4)})
                </Title>
                <Button
                    icon={<EyeOutlined />}
                    size="middle"
                    href={`https://image.tmdb.org/t/p/w1280/${poster.file_path}`}
                    target="_blank"
                >
                    View in Browser
                </Button>
            </div>
        </div>
    );
}

export default PosterList;
