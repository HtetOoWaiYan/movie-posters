import React from "react";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  PictureOutlined,
} from "@ant-design/icons";

const useBreadcrumbItems = (movieSelected, movie_id, poster_id, location) => {
  const fromSearch = location.state?.fromSearch || false;
  const searchQuery = location.state?.searchQuery || "";

  const breadcrumbItems = [];
  if (fromSearch) {
    breadcrumbItems.push({
      title: (
        <Link to={`/search/${searchQuery}`} style={{ display: "flex" }}>
          <SearchOutlined style={{ marginRight: 5 }} />
          <span>Search: {searchQuery}</span>
        </Link>
      ),
    });
  } else {
    breadcrumbItems.push({
      title: (
        <Link to="/" style={{ display: "flex" }}>
          <HomeOutlined style={{ marginRight: 5 }} />
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

  if (poster_id !== undefined) {
    breadcrumbItems.push({
      title: <PictureOutlined />,
    });
  }

  return { breadcrumbItems, fromSearch, searchQuery };
};

export default useBreadcrumbItems;
