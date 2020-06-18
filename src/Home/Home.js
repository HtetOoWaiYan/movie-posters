import React from 'react';
import Posters from '../Posters/Posters';
import styles from './Home.module.css';
import { Input } from 'antd';
const { Search } = Input;

const Home = props => {
    return (
        <div>
            <Search
                enterButton
                size="large"
                placeholder="Search movies"
                onSearch={value => console.log(value)}
                className={styles.search}
            />
            <Posters movies={props.movies} />
        </div>
    )
}

export default Home;
