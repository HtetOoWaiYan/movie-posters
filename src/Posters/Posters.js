import React from "react";
import Poster from '../Poster/Poster'
import styles from './Posters.module.css';
import { List } from 'antd';

const Posters = props => {
    return (
        <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3, }}
            dataSource={props.movies}
            renderItem={item => (
                <List.Item>
                    <Poster movies={props.movies} />
                </List.Item>
            )}
        />
    );
}

export default Posters;
