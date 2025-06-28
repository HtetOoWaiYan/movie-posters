import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About/About.jsx";
import Home from "./Home/Home.jsx";
import NavBar from "./NavBar/NavBar.jsx";
import PosterDetail from "./PosterDetail/PosterDetail.jsx";
import PosterList from "./PosterList/PosterList.jsx";
import SearchView from "./SearchView/SearchView.jsx";
import "./App.css";
import styles from "./App.module.css";
import { Layout } from "antd";
import { MovieListProvider } from "./context/MovieListContext.jsx";
import { MovieProvider } from "./context/MovieContext.jsx";
import { PosterProvider } from "./context/PosterContext.jsx";
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
