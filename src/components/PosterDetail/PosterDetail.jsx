import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation } from "react-router-dom";
import { Breadcrumb, Button, Typography, Spin } from "antd";

import Meta from "../Meta/Meta.jsx";
import styles from "./PosterDetail.module.css";
import { fetchMovieById } from "../../api/movies.js";
import { fetchPostersById } from "../../api/posters.js";
import useBreadcrumbItems from "../../hooks/useBreadcrumbItems";

const { Title } = Typography;

const PosterDetail = React.memo(() => {
  const location = useLocation();
  const { movie_id, poster_id } = useParams();

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

  const { breadcrumbItems } = useBreadcrumbItems(
    movie,
    movie_id,
    poster_id,
    location,
  );

  const movieSelected = movie;
  const poster = posters
    ? posters.find((p, i) => i === parseInt(poster_id))
    : null;

  return (
    <div>
      {loading ? (
        <Spin size="large" className={styles.spin} />
      ) : movieSelected && poster ? (
        <>
          <Meta
            title={`${movieSelected.title} (${movieSelected.release_date?.substring(
              0,
              4,
            )}) Poster | Movie Posters`}
            description={`Poster of ${movieSelected.title} (${movieSelected.release_date?.substring(
              0,
              4,
            )})`}
            image={`https://image.tmdb.org/t/p/w342/${poster?.file_path?.startsWith("/") ? poster.file_path.substring(1) : poster.file_path}`}
          />
          <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
          <div className={styles.poster_detail}>
            <img
              src={`https://image.tmdb.org/t/p/w342/${poster?.file_path?.startsWith("/") ? poster.file_path.substring(1) : poster.file_path}`}
              alt="poster"
              className={styles.poster}
            />
            <div className={styles.information}>
              <Title className={styles.title}>
                {movieSelected.title} (
                {movieSelected.release_date?.substring(0, 4)})
              </Title>
              <div>
                <div className={styles.sizeButtonsGrid}>
                  {[
                    {
                      width: 92,
                      label: (
                        <>
                          92 x 138
                          <br />
                          <span className={styles.dimText}>pixels</span>
                        </>
                      ),
                    },
                    {
                      width: 154,
                      label: (
                        <>
                          154 x 231
                          <br />
                          <span className={styles.dimText}>pixels</span>
                        </>
                      ),
                    },
                    {
                      width: 185,
                      label: (
                        <>
                          185 x 277
                          <br />
                          <span className={styles.dimText}>pixels</span>
                        </>
                      ),
                    },
                    {
                      width: 342,
                      label: (
                        <>
                          342 x 513
                          <br />
                          <span className={styles.dimText}>pixels</span>
                        </>
                      ),
                    },
                    {
                      width: 500,
                      label: (
                        <>
                          500 x 750
                          <br />
                          <span className={styles.dimText}>pixels</span>
                        </>
                      ),
                    },
                    {
                      width: 780,
                      label: (
                        <>
                          780 x 1170
                          <br />
                          <span className={styles.dimText}>pixels</span>
                        </>
                      ),
                    },
                    {
                      width: "original",
                      label: (
                        <>
                          Original
                          <br />
                          <span className={styles.dimText}>resolution</span>
                        </>
                      ),
                    },
                  ].map((size) => (
                    <Button
                      key={size.width}
                      className={styles.sizeButton}
                      href={`https://image.tmdb.org/t/p/${size.width === "original" ? "original" : `w${size.width}`}/${poster.file_path?.startsWith("/") ? poster.file_path.substring(1) : poster.file_path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {size.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>Poster not found.</div>
      )}
    </div>
  );
});

PosterDetail.displayName = "PosterDetail";

export default PosterDetail;
