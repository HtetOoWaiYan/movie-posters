import React from "react";
import { Typography } from "antd";
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
      <Title className={styles.title}>/About</Title>
      <Paragraph className={styles.text}>
        Movie Posters is a responsive and user-friendly website for discovering
        and downloading movie posters.
      </Paragraph>

      <Title className={styles.title}>/Purpose</Title>
      <Paragraph className={styles.text}>
        The purpose of making this website is for me to practice{" "}
        <a href="https://reactjs.org/">React</a> and to serve it as my{" "}
        <a href="https://www.edx.org/course/cs50s-introduction-to-computer-science">
          CS50x
        </a>{" "}
        final project.
      </Paragraph>

      <Title className={styles.title}>/Tech used</Title>
      <ul className={styles.text}>
        <li>
          <a href="https://reactjs.org/">React</a>
        </li>
        <li>
          <a href="https://vitejs.dev/">Vite</a>
        </li>
        <li>
          <a href="https://ant.design/">Ant Design</a>
        </li>
        <li>
          <a href="https://www.themoviedb.org/documentation/api">TMDb API</a>
        </li>
      </ul>

      <Title className={styles.title}>
        /Things I learned making this project
      </Title>
      <ul className={styles.text}>
        <li>
          <a href="https://reactrouter.com/web/guides/quick-start">
            React Router
          </a>
        </li>
        <li>
          <a href="https://cssgrid.io/">CSS Grid</a>
        </li>
        <li>
          <a href="https://create-react-app.dev/docs/adding-a-css-modules-stylesheet">
            CSS Modules
          </a>
        </li>
        <li>State management with React Context.</li>
        <li>Modern frontend tooling with Vite.</li>
      </ul>
    </Typography>
  );
});

export default About;
