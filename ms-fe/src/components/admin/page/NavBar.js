import { Breadcrumb, Button, Popover, Space } from "antd";
import React from "react";
import styles from "./NavBar.module.css";
import {
  BellOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import { clearAuthToken, getAuthToken } from "../../../service/Token";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState("");
  const content = (
    <div style={{ width: "100px" }}>
      <p>
        <Link
          onClick={() => {
            clearAuthToken();
            setUser("");
          }}
          className={styles.link}
        >
          Đăng xuất
        </Link>
      </p>
    </div>
  );

  useEffect(() => {
    return () =>
      getAuthToken()
        .then((data) => {
          setUser(data?.fullName);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

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
            {user && (
              <>
                <span>Xin chào,</span>

                <Popover
                  content={content}
                  placement="bottomLeft"
                  trigger="hover"
                >
                  <strong>{user}</strong>
                </Popover>
              </>
            )}
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
