import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useHistory  } from "react-router-dom";
import Posters from '../Posters/Posters';
import styles from './Home.module.css';
import { Empty, Input, Select, Spin } from 'antd';
const { Search } = Input;
const { Option } = Select;

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Home = props => {
    const { sort } = useParams();
    const location = useLocation();
    const history = useHistory();

    const [ value, setValue ] = useState(sort ? sort : "popular");

    const [ loading, setLoading ] = useState(true);
    const [ movies, setMovies ] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${value}?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
            setMovies(json.results);
            setLoading(false);
        })
    }, [ value ]);

    const handleSearch = query => (
        history.push(`/search/${query}`, { prevURL: location.pathname })
    )

    function handleChange(value) {
        setValue(value);
        history.push(`/by/${value}`);
    }

    return (
        <div>
            <div className={styles.inputs}>
                <div></div>
                <Search
                    enterButton
                    size="large"
                    placeholder="Search movies"
                    onSearch={query => handleSearch(query)}
                    className={styles.search}
                />
                <Select
                    value={value}
                    defaultValue="lucy"
                    onChange={handleChange}
                    className={styles.select}
                >
                    <Option value="popular">Popular</Option>
                    <Option value="top_rated">Top-rated</Option>
                    <Option value="now_playing">Now Playing</Option>
                    <Option value="upcoming">Upcoming</Option>
                </Select>
            </div>
            {
                loading
                ? <Spin size="large" tip="Fetching data..." className={styles.spin} />
                : <Posters movies={movies} />
            }
            { movies.length === 0 && !loading ? <Empty /> : "" }
        </div>
    )
}

export default Home;
