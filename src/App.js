import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import NavBar from './NavBar/NavBar'
import Posters from './Posters/Posters'
import About from './About/About'
import PosterList from './PosterList/PosterList'
import './App.css';
import styles from './App.module.css';
import { Layout, Input } from 'antd';
const { Content, Footer } = Layout;
const { Search } = Input;

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const App = props => {
    const [ movies, setMovies ] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(json => {
            setMovies(json.results);
        })
    }, []);

    return (
        <Layout className="layout">
            <Router>
                <NavBar />
                <Content style={{ paddingTop: '60px' }}>
                    <div className={styles.viewpoint}>
                        <Switch>
                            <Route exact path="/">
                                <Search
                                    placeholder="Search movies"
                                    enterButton
                                    size="large"
                                    onSearch={value => console.log(value)}
                                    className={styles.search}
                                />
                                <Posters movies={movies} />
                            </Route>
                            <Route exact path="/about">
                                <About />
                            </Route>
                            <Route path="/posters/:movie_id">
                                <PosterList />
                            </Route>
                        </Switch>
                    </div>
                </Content>
                <Footer className={styles.footer}>
                    Movie data from <a href="https://themoviedb.com">TMDb</a><br/>
                    Icons made by <a href="https://www.flaticon.com/authors/nhor-phai">Nhor Phai</a> from <a href="https://www.flaticon.com/">flaticon</a>
                </Footer>
            </Router>
        </Layout>
    )
}

export default App;
