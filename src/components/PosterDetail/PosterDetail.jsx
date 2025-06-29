import styles from "./PosterDetail.module.css";
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Breadcrumb, Button, Popover, Typography } from "antd";
import { EyeOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import Meta from "../Meta/Meta.jsx";
import { useMovie } from "../../context/MovieContext.jsx";
import { usePosters } from "../../context/PosterContext.jsx";
import useBreadcrumbItems from "../../hooks/useBreadcrumbItems";

const { Text, Title } = Typography;

const PosterDetail = React.memo(() => {
  const { movie_id, poster_id } = useParams();
  const location = useLocation();
  const { movie, fetchMovie } = useMovie();
  const { posters, fetchPosters } = usePosters();
  const [loading, setLoading] = useState(true);

  // For download-information button
  const content = (
    <p>
      Due to{" "}
      <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy">
        same-origin policy
      </a>
      ,<br />
      a download button cannot be included
      <br />
      as the data comes from TMDb API.
    </p>
  );

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchMovie(movie_id);
      await fetchPosters(movie_id);
      setLoading(false);
    };
    loadData();
  }, [movie_id, fetchMovie, fetchPosters]);

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
        <div>Loading poster details...</div>
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
            image={`https://image.tmdb.org/t/p/w500/${poster?.file_path}`}
          />
          <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
          <div className={styles.poster_detail}>
            <div className={styles.image_space}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${poster?.file_path}`}
                alt="poster"
                className={styles.poster}
              />
              <Text code className={styles.image_size}>
                {poster?.width} x {poster?.height} pixels
              </Text>
            </div>
            <div className={styles.information}>
              <Title className={styles.title}>
                {movieSelected.title} (
                {movieSelected.release_date?.substring(0, 4)})
              </Title>
              <div>
                <Button
                  icon={<EyeOutlined />}
                  size="middle"
                  href={`https://image.tmdb.org/t/p/w500/${poster.file_path}`}
                  target="_blank"
                >
                  View in Browser
                </Button>
                <Popover placement="top" content={content}>
                  <Button type="link">
                    <QuestionCircleOutlined />
                  </Button>
                </Popover>
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
