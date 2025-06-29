import styles from "./PosterList.module.css";
import { Breadcrumb, Empty, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import useBreadcrumbItems from "../../hooks/useBreadcrumbItems";

import { useMovie } from "../../context/MovieContext.jsx";
import { usePosters } from "../../context/PosterContext.jsx";
import PosterForList from "../PosterForList/PosterForList.jsx";

const PosterList = React.memo(() => {
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

  const { breadcrumbItems, fromSearch, searchQuery } = useBreadcrumbItems(
    movie,
    movie_id,
    undefined,
    location,
  );

  return (
    <div>
      <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
      <div className={styles.posters}>
        {posters && posters.length > 0 ? (
          posters.map((poster, i) => (
            <PosterForList
              key={poster.file_path}
              poster={poster}
              movie={movie}
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
});

PosterList.displayName = "PosterList";

export default PosterList;
