import React from "react";
import styles from './Poster.module.css';

const Poster = props => {
    return (
        <a href="" >
            <img src="https://image.tmdb.org/t/p/w1280/jPNShaWZMpVF0iQ7j1dvTuZLD20.jpg" className={styles.poster}/>
        </a>
    );
}

export default Poster;
