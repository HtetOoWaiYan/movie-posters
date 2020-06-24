import React from 'react';
import Posters from '../Posters/Posters';
import styles from './Home.module.css';
import { Input, Select } from 'antd';
const { Search } = Input;
const { Option } = Select;

const Home = props => {
    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div>
            <div className={styles.inputs}>
                <div></div>
                <Search
                    enterButton
                    size="large"
                    placeholder="Search movies"
                    onSearch={value => console.log(value)}
                    className={styles.search}
                />
                <Select
                    value="large"
                    defaultValue="lucy"
                    onChange={handleChange}
                    className={styles.select}
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="disabled" disabled>
                        Disabled
                    </Option>
                    <Option value="Yiminghe">yiminghe</Option>
                </Select>
            </div>
            <Posters movies={props.movies} />
        </div>
    )
}

export default Home;
