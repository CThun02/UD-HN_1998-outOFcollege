import { Space } from "antd";
import { Link } from "react-router-dom";

import styles from "./HeaderCenter.module.css";
import { useState } from "react";
import { useEffect } from "react";

function HeaderCenter({selectedTab, setSelectedTab}) {
 

  function handleOnChangeTab(tabName) {
    setSelectedTab(tabName);
  }

  

  return (
    <div className={`${styles.lineHeight} ${styles.flex}`}>
      <div>
        <Space direction="horizontal" style={{ width: "100%" }} size={32}>
          <Link
            to={"/ms-shop/home"}
            className={`${styles.link} ${
              selectedTab === "home" ? styles.active : ""
            }`}
            onClick={() => handleOnChangeTab("home")}
          >
            Trang chủ
          </Link>
          <Link
            to={"/ms-shop/shopping"}
            className={`${styles.link} ${
              selectedTab === "shop" ? styles.active : ""
            }`}
            onClick={() => handleOnChangeTab("shop")}
          >
            Cửa hàng
          </Link>
          <Link
            to={"/ms-shop/follow-order"}
            className={`${styles.link} ${
              selectedTab === "flowOder" ? styles.active : ""
            }`}
            onClick={() => handleOnChangeTab("flowOder")}
          >
            Theo dõi đơn hàng
          </Link>
          <Link
            to={"/ms-shop/about"}
            className={`${styles.link} ${
              selectedTab === "inducere" ? styles.active : ""
            }`}
            onClick={() => handleOnChangeTab("inducere")}
          >
            Giới thiệu
          </Link>
          <Link
            to={"/ms-shop/contact"}
            className={`${styles.link} ${
              selectedTab === "contact" ? styles.active : ""
            }`}
            onClick={() => handleOnChangeTab("contact")}
          >
            Liên hệ
          </Link>
        </Space>
      </div>
    </div>
  );
}

export default HeaderCenter;
