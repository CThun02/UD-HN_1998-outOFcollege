import { CopyrightOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <span>
        Copyright <CopyrightOutlined /> 2023 outOFcollege
      </span>{" "}
      <br />
      <span>All rights reserved</span>
    </div>
  );
};

export default Footer;
