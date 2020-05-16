import React, { useState, useEffect } from 'react';
import Posters from './Posters/Posters'
import './App.css';
import styles from './App.module.css';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

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
            <Header>
                <div className={styles.viewpoint}>
                    <div className="logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="2" style={{ float: 'right' }}>About</Menu.Item>
                        <Menu.Item key="1" style={{ float: 'right' }}>Posters</Menu.Item>
                    </Menu>
                </div>
            </Header>
            <Content className={styles.content}>
                <div className={styles.viewpoint}>
                    <Posters movies={movies} />
                    <div className="site-layout-content">Content</div>
                </div>
            </Content>
            <Footer className={styles.footer}>
                Movie data from <a href="https://themoviedb.com">TMDb</a>
            </Footer>
        </Layout>
    )
}

export default App;
