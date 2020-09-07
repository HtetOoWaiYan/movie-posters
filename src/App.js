import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import About from './About/About';
import Home from './Home/Home';
import NavBar from './NavBar/NavBar';
import PosterDetail from './PosterDetail/PosterDetail';
import PosterList from './PosterList/PosterList';
import SearchView from './SearchView/SearchView';
import './App.css';
import styles from './App.module.css';
import { Layout } from 'antd';
const { Content, Footer } = Layout;

const App = props => {
    return (
        <Router>
            <Layout className="layout">
                <div className={styles.site}>
                    <div className={styles.top_section}>
                        <NavBar />
                        <Content className={styles.content}>
                            <div className={styles.viewpoint}>
                                <Switch>
                                    <Route exact path="/about">
                                        <About />
                                    </Route>
                                    <Route exact path="/">
                                        <Home />
                                    </Route>
                                    <Route exact path="/by/:sort">
                                        <Home />
                                    </Route>
                                    <Route exact path="/search">
                                        <Redirect to="/" />
                                    </Route>
                                    <Route exact path="/search/:query">
                                        <SearchView />
                                    </Route>
                                    <Route exact path="/posters/:movie_id">
                                        <PosterList />
                                    </Route>
                                    <Route exact path="/posters/:movie_id/:poster_id">
                                        <PosterDetail />
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
