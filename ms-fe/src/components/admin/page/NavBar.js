import { Button, Space } from "antd";
import React from "react";
import styles from "./NavBar.module.css";
import {
  BellOutlined,
  MenuFoldOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Input from "antd/es/input/Input";

const NavBar = () => {
  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.navBar__contentPosition}>
          <Space>
            <Button className={styles.navBar__button}>
              <MenuFoldOutlined />
            </Button>
            <Input
              placeholder="Enter your key words..."
              prefix={<SearchOutlined />}
              className={styles.navBar__input}
            />
          </Space>
          <Space>
            <Button className={styles.navBar__button}>
              <BellOutlined />
            </Button>
            <div className={styles.navBar__avatar}></div>
          </Space>
        </div>
      </div>
    </>
  );
};

export default NavBar;
