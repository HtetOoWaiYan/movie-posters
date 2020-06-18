import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import About from './About/About';
import Home from './Home/Home';
import NavBar from './NavBar/NavBar';
import PosterList from './PosterList/PosterList';
import './App.css';
import styles from './App.module.css';
import { Breadcrumb, Layout } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
const { Content, Footer } = Layout;

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const App = props => {
    const [ movies, setMovies ] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
            setMovies(json.results);
        })
    }, []);

    return (
        <Router>
            <Layout className="layout">
                <div className={styles.site}>
                    <div className={styles.top_section}>
                        <NavBar />
                        <Content className={styles.content}>
                            <div className={styles.viewpoint}>
                                <Switch>
                                    <Route exact path="/">
                                        <Home movies={movies} />
                                    </Route>
                                    <Route exact path="/about">
                                        <About />
                                    </Route>
                                    <Route path="/posters/:movie_id">
                                        <PosterList movies={movies}/>
                                    </Route>
                                </Switch>
                            </div>
                        </Content>
                    </div>
                    <Footer className={styles.footer}>
                        Movie data from <a href="https://themoviedb.com">TMDb</a><br/>Logo made by <a href="https://www.flaticon.com/authors/nhor-phai">Nhor Phai</a> from <a href="https://www.flaticon.com/">flaticon</a>
                    </Footer>
                </div>
            </Layout>
        </Router>
    )
}

export default App;
