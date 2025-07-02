import React from "react";
import { Breadcrumb, Empty, Spin } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";

import styles from "./PosterList.module.css";
import { fetchMovieById } from "../../api/movies.js";
import { fetchPostersById } from "../../api/posters.js";
import PosterForList from "../PosterForList/PosterForList.jsx";
import useBreadcrumbItems from "../../hooks/useBreadcrumbItems";

const PosterList = React.memo(() => {
  const location = useLocation();
  const { movie_id } = useParams();

  const { data: movie, isLoading: isLoadingMovie } = useQuery({
    queryKey: ["movie", movie_id],
    queryFn: () => fetchMovieById(movie_id),
    enabled: !!movie_id,
  });

  const { data: posters, isLoading: isLoadingPosters } = useQuery({
    queryKey: ["posters", movie_id],
    queryFn: () => fetchPostersById(movie_id),
    enabled: !!movie_id,
  });

  const loading = isLoadingMovie || isLoadingPosters;

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
