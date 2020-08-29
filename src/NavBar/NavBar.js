import React from 'react';
import { Link, useLocation } from "react-router-dom";
import styles from './NavBar.module.css';
import { Layout, Menu } from 'antd';
const { Header } = Layout;

const NavBar = props => {
    const location = useLocation();

    return (
        <Header className={styles.header}>
            <div className={styles.viewpoint}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={location.pathname === '/about' ? ['2'] : ['0', '1']}
                >
                    <Menu.Item key="0" className={styles.item_left}>
                        <Link to="/">
                            <img src={require('../logo.png')} alt="logo" className={styles.logo} />
                            <span className={styles.brand}>Movie Posters</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" className={styles.item_right}>
                        <Link to="/about">About</Link>
                    </Menu.Item>
                    <Menu.Item key="1" className={styles.item_right}>
                        <Link to="/">Posters</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </Header>
    )
}

export default NavBar;
