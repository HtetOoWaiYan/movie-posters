import React from "react";
import { Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import styles from "./About.module.css";
import Meta from "../Meta/Meta.jsx";

const { Paragraph, Title } = Typography;

const About = React.memo(() => {
  return (
    <Typography className={styles.article}>
      <Meta
        title="About | Movie Posters"
        description="About the Movie Posters website."
        image="/logo512.png"
      />
      <Title className={styles.title}>About</Title>
      <Paragraph className={styles.text}>
        Welcome to Movie Posters, your go-to destination for discovering and
        downloading high-quality movie posters with unparalleled ease.
      </Paragraph>

      <Title className={styles.title}>Purpose</Title>
      <Paragraph className={styles.text}>
        This project was born out of a personal frustration: the struggle to
        find a dedicated, user-friendly platform for movie posters. As someone
        who often needs specific poster images for graphic design or content
        creation, I found existing websites cumbersome, cluttered, and not
        focused on the core need of simply viewing and downloading posters.
      </Paragraph>
      <Paragraph className={styles.text}>
        Movie Posters aims to solve this by offering a clean, minimal, and
        intuitive experience. No more navigating through endless clicks or
        dealing with distracting elements. Here, you get straight to what you
        need: a vast collection of movie posters, readily available for viewing
        and download, designed for efficiency and a seamless user experience.
      </Paragraph>

      <Title className={styles.title}>Source Code</Title>
      <Paragraph className={styles.text}>
        <a
          href="https://github.com/HtetOoWaiYan/movie-posters"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubOutlined
            style={{
              fontSize: "24px",
              verticalAlign: "middle",
              marginRight: "8px",
            }}
          />
          View on GitHub
        </a>
      </Paragraph>
    </Typography>
  );
});

About.displayName = "About";

export default About;
