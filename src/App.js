import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Posters from './Posters/Posters'
import About from './About/About'
import './App.css';
import styles from './App.module.css';
import { Layout, Menu, Input } from 'antd';
const { Header, Content, Footer } = Layout;
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
                <Header style={{ padding: '0' }}>
                    <div className={styles.viewpoint}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                            <Menu.Item key="1" style={{ float: 'left', background: 'none' }}>
                                <Link to="/">
                                    <img src="logo.png" className={styles.logo} />
                                    <span className={styles.brand}>Movie Posters</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="2" style={{ float: 'right' }}>
                                <Link to="/about">About</Link>
                            </Menu.Item>
                            <Menu.Item key="1" style={{ float: 'right' }}>
                                <Link to="/">Posters</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </Header>
                <Content>
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
                        </Switch>
                    </div>
                </Content>
                <Footer className={styles.footer}>
                    Movie data from <a href="https://themoviedb.com">TMDb</a><br/>
                    Icons made by <a href="https://www.flaticon.com/authors/nhor-phai" title="Nhor Phai">Nhor Phai</a> from <a href="https://www.flaticon.com/" title="Flaticon"> flaticon</a>
                </Footer>
            </Router>
        </Layout>
    )
}

export default App;
