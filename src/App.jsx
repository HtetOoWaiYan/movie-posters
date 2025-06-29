import React from "react";
import { Layout } from "antd";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import NavBar from "./components/NavBar/NavBar.jsx";
import PosterList from "./components/PosterList/PosterList.jsx";
import SearchView from "./components/SearchView/SearchView.jsx";
import PosterDetail from "./components/PosterDetail/PosterDetail.jsx";
import { MovieProvider } from "./context/MovieContext.jsx";
import { PosterProvider } from "./context/PosterContext.jsx";
import { MovieListProvider } from "./context/MovieListContext.jsx";

const { Content, Footer } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <Layout className="layout">
        <div className={styles.site}>
          <div className={styles.top_section}>
            <NavBar />
            <Content className={styles.content}>
              <div className={styles.viewpoint}>
                <MovieListProvider>
                  <MovieProvider>
                    <PosterProvider>
                      <Routes>
                        <Route path="/about" element={<About />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/by/:sort" element={<Home />} />
                        <Route path="/search/:query" element={<SearchView />} />
                        <Route
                          path="/posters/:movie_id"
                          element={<PosterList />}
                        />
                        <Route
                          path="/posters/:movie_id/:poster_id"
                          element={<PosterDetail />}
                        />
                      </Routes>
                    </PosterProvider>
                  </MovieProvider>
                </MovieListProvider>
              </div>
            </Content>
          </div>
          <Footer className={styles.footer}>
            Movie data from <a href="https://themoviedb.com">TMDb</a>
            <br />
            Logo made by{" "}
            <a href="https://www.flaticon.com/authors/nhor-phai">
              Nhor Phai
            </a>{" "}
            from <a href="https://www.flaticon.com/">flaticon</a>
          </Footer>
        </div>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
