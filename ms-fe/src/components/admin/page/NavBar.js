import { Breadcrumb, Button, Space } from "antd";
import React from "react";
import styles from "./NavBar.module.css";
import {
  BellOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Input from "antd/es/input/Input";
import Link from "antd/es/typography/Link";

const NavBar = () => {
  return (
    <>
      <div className={styles.navBar}>
        <div className={styles.navBar__contentPosition}>
          <Space>
            <Button className={styles.navBar__button}>
              <MenuFoldOutlined />
            </Button>
            <Breadcrumb
              items={[
                {
                  href: "http://localhost:3000/api/admin",
                  title: <HomeOutlined />,
                },
                {
                  title: (
                    <>
                      <UserOutlined />
                      <span>Application List</span>
                    </>
                  ),
                },
              ]}
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
