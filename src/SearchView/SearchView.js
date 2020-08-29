import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation, } from "react-router-dom";
import Posters from '../Posters/Posters';
import styles from './SearchView.module.css';
import { Input, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const SearchView = props => {
    const history = useHistory();
    const location = useLocation();
    const { query } = useParams();

    const [ value, setValue ] = useState(query);
    const [ urlSwitch, setURLSwitch ] = useState(false);

    const handleSearch = query => {
        history.push(`/search/${query}`, { prevURL: location.pathname });
    }

    useEffect(() => {
        if (location.state !== undefined && location.pathname !== location.state.prevURL) {
            setValue(query);
            setURLSwitch(true);
        }
    }, [ location, query ]);

    const [ movies, setMovies ] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&include_adult=false`)
        .then(res => res.json())
        .then(json => {
            setMovies(json.results);
        })
    }, [ query ]);

    // console.log(`value: ${value}`);
    // console.log(`query: ${query}`);
    // console.log(`urlSwitch: ${urlSwitch}`);

    return (
        <div>
            <div className={styles.inputs}>
                <div></div>
                <Search
                    enterButton
                    value={urlSwitch ? query : value}
                    size="large"
                    placeholder={"Search movies"}
                    onClick={() => setURLSwitch(false)}
                    onChange={e => setValue(e.target.value)}
                    onSearch={query => handleSearch(query)}
                    className={styles.search}
                />
            </div>
            <Posters movies={movies} />
        </div>
    )
}

export default SearchView;
