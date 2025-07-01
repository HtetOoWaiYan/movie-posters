import React, { Suspense, lazy } from "react";
import { Layout, Spin } from "antd";
import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar.jsx";
const Home = lazy(() => import("./components/Home/Home.jsx"));
const About = lazy(() => import("./components/About/About.jsx"));
const PosterList = lazy(() => import("./components/PosterList/PosterList.jsx"));
const SearchView = lazy(() => import("./components/SearchView/SearchView.jsx"));
const PosterDetail = lazy(
  () => import("./components/PosterDetail/PosterDetail.jsx"),
);

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
                <Suspense
                  fallback={<Spin size="large" className={styles.spin} />}
                >
                  <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/by/:sort" element={<Home />} />
                    <Route path="/search/:query" element={<SearchView />} />
                    <Route path="/posters/:movie_id" element={<PosterList />} />
                    <Route
                      path="/posters/:movie_id/:poster_id"
                      element={<PosterDetail />}
                    />
                  </Routes>
                </Suspense>
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
