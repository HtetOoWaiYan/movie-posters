import styles from "./PosterList.module.css";
import React, { useState, useEffect } from "react";
import { Breadcrumb, Empty, Spin, Typography } from "antd";
import { Link, useParams, useLocation } from "react-router-dom";
import { HomeOutlined, SearchOutlined } from "@ant-design/icons";

import { useMovie } from "../../context/MovieContext.jsx";
import { usePosters } from "../../context/PosterContext.jsx";
import PosterForList from "../PosterForList/PosterForList.jsx";

const { Title } = Typography;

const PosterList = () => {
  const { movie_id } = useParams();
  const location = useLocation();
  const { movie, fetchMovie } = useMovie();
  const { posters, fetchPosters } = usePosters();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchMovie(movie_id);
      await fetchPosters(movie_id);
      setLoading(false);
    };
    loadData();
  }, [movie_id, fetchMovie, fetchPosters]);

  const movieSelected = movie;
  const fromSearch = location.state?.fromSearch || false;
  const searchQuery = location.state?.searchQuery || "";

  const breadcrumbItems = [];
  if (fromSearch) {
    breadcrumbItems.push({
      title: (
        <Link to={`/search/${searchQuery}`}>
          <SearchOutlined />
          <span>Search: {searchQuery}</span>
        </Link>
      ),
    });
  } else {
    breadcrumbItems.push({
      title: (
        <Link to="/">
          <HomeOutlined />
          <span>Home</span>
        </Link>
      ),
    });
  }

  breadcrumbItems.push({
    title:
      movieSelected && movieSelected.title ? (
        <Link to={`/posters/${movie_id}`}>
          {movieSelected.title} ({movieSelected.release_date?.substring(0, 4)})
        </Link>
      ) : (
        "Loading Movie..."
      ),
  });

  return (
    <div>
      <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
      {movieSelected && movieSelected.title ? (
        <Title className={styles.title}>
          {movieSelected.title} ({movieSelected.release_date?.substring(0, 4)})
        </Title>
      ) : (
        <Title className={styles.title}>Loading Movie...</Title>
      )}
      <div className={styles.posters}>
        {posters && posters.length > 0 ? (
          posters.map((poster, i) => (
            <PosterForList
              key={poster.file_path}
              poster={poster}
              movie={movieSelected}
              movie_id={movie_id}
              poster_id={i}
              fromSearch={fromSearch}
              searchQuery={searchQuery}
            />
          ))
        ) : loading ? (
          <Spin size="large" className={styles.spin} />
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default PosterList;
