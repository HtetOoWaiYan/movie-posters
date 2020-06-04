import React from "react";
import Poster from '../Poster/Poster'
import styles from './Posters.module.css';
import { List } from 'antd';

const Posters = props => {
    return (
        <div className={styles.poster_list}>
            {props.movies.map(movie => {
                return <Poster movie={movie} />
            })}
        </div>
    );
}

export default Posters;
