import React from "react";
import logo from "../../logo.png";
import { Layout, Menu } from "antd";
import styles from "./NavBar.module.css";
import { Link, useLocation } from "react-router-dom";

const { Header } = Layout;

const NavBar = React.memo(() => {
  return (
    <Header className={styles.header}>
      <div className={styles.viewpoint}>
        <Menu
          theme="dark"
          mode="horizontal"
          className={styles.menu}
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
              key: "1",
              label: <Link to="/">Posters</Link>,
              style: { marginLeft: "auto" },
            },
            {
              key: "2",
              label: <Link to="/about">About</Link>,
            },
          ]}
        />
      </div>
    </Header>
  );
});

NavBar.displayName = "NavBar";

export default NavBar;
