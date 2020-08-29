import React from 'react';
import { useHistory, useLocation } from "react-router-dom";
import Posters from '../Posters/Posters';
import styles from './Home.module.css';
import { Input, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;

const Home = props => {
    const history = useHistory();
    const location = useLocation();

    const handleSearch = query => (
        history.push(`/search/${query}`, { prevURL: location.pathname })
    )

    function handleChange(value) {
        console.log(`selected ${value}`);
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
                    value="top-rated"
                    defaultValue="lucy"
                    onChange={handleChange}
                    className={styles.select}
                >
                    <Option value="top-rated">Top-rated</Option>
                    <Option value="popular">Popular</Option>
                    <Option value="latest">Latest</Option>
                    <Option value="now-playing">Now Playing</Option>
                    <Option value="upcoming">Upcoming</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                </Select>
            </div>
            <Posters movies={props.movies} />
        </div>
    )
}

export default Home;
