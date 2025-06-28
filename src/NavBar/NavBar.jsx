import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../logo.png";
import styles from "./NavBar.module.css";
import { Layout, Menu } from "antd";
const { Header } = Layout;

const NavBar = () => {
  return (
    <Header className={styles.header}>
      <div className={styles.viewpoint}>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={useLocation().pathname === "/about" ? ["2"] : ["1"]}
          items={[
            {
              key: "0",
              className: styles.item_left,
              label: (
                <Link to="/">
                  <img src={logo} alt="logo" className={styles.logo} />
                  <span className={styles.brand}>Movie Posters</span>
                </Link>
              ),
            },
            {
              key: "2",
              className: styles.item_right,
              label: <Link to="/about">About</Link>,
            },
            {
              key: "1",
              className: styles.item_right,
              label: <Link to="/">Posters</Link>,
            },
          ]}
        />
      </div>
    </Header>
  );
};

export default NavBar;
