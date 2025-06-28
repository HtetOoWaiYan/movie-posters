import React, { useEffect } from "react";
import styles from "./PosterDetail.module.css";
import { Link, useParams, useLocation } from "react-router-dom";
import { Breadcrumb, Button, Popover, Typography } from "antd";
import {
  EyeOutlined,
  HomeOutlined,
  PictureOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useMovie } from "../../context/MovieContext.jsx";
import { usePosters } from "../../context/PosterContext.jsx";
import Meta from "../Meta/Meta.jsx";

const { Text, Title } = Typography;

const PosterDetail = () => {
  const { movie_id, poster_id } = useParams();
  const location = useLocation();
  const { movie, fetchMovie } = useMovie();
  const { posters, fetchPosters } = usePosters();

  useEffect(() => {
    fetchMovie(movie_id);
    fetchPosters(movie_id);
  }, [movie_id, fetchMovie, fetchPosters]);

  const movieSelected = movie;
  const poster = posters
    ? posters.find((p, i) => i === parseInt(poster_id))
    : null;
  const fromSearch = location.state?.fromSearch || false;
  const searchQuery = location.state?.searchQuery || "";

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

  if (movieSelected && movieSelected.title) {
    breadcrumbItems.push({
      title: (
        <Link
          to={`/posters/${movie_id}`}
          state={{
            fromSearch: fromSearch,
            searchQuery: searchQuery,
          }}
        >
          {movieSelected.title} ({movieSelected.release_date?.substring(0, 4)})
        </Link>
      ),
    });
  } else {
    breadcrumbItems.push({
      title: "Loading Movie...",
    });
  }

  breadcrumbItems.push({
    title: <PictureOutlined />,
  });

  return (
    <div>
      {movieSelected && poster ? (
        <Meta
          title={`${movieSelected.title} (${movieSelected.release_date?.substring(
            0,
            4
          )}) Poster | Movie Posters`}
          description={`Poster of ${movieSelected.title} (${movieSelected.release_date?.substring(
            0,
            4
          )})`}
          image={`https://image.tmdb.org/t/p/w1280/${poster.file_path}`}
        />
      ) : (
        ""
      )}
      <Breadcrumb className={styles.breadcrumb} items={breadcrumbItems} />
      {poster && movieSelected && movieSelected.title ? (
        <div className={styles.poster_detail}>
          <div className={styles.image_space}>
            <img
              src={`https://image.tmdb.org/t/p/w1280/${poster.file_path}`}
              alt="poster"
              className={styles.poster}
            />
            <Text code className={styles.image_size}>
              {poster.width} x {poster.height} pixels
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
                href={`https://image.tmdb.org/t/p/w1280/${poster.file_path}`}
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
      ) : (
        <div>Loading poster details...</div>
      )}
    </div>
  );
};

export default PosterDetail;
