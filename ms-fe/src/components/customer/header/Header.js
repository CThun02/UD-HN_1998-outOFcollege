import { Col, Row } from "antd";
import HeaderLeft from "../header/left/HeaderLeft";
import HeaderRight from "../header/right/HeaderRight";
import styles from "./Header.module.css";
import { useEffect, useCallback, useState } from "react";

function Header() {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [checkTop, setCheckTop] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      let moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
      setCheckTop(moving);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div
      className={`${checkTop > 0 ? styles.header : ""} ${
        visible ? styles.visible : styles.hidden
      } ${styles.background} `}
    >
      <div className={styles.paddingTopAndBottom}>
        <div className={styles.paddingLeftAndRight}>
          <Row className={styles.margin}>
            <Col span={12}>
              <HeaderLeft />
            </Col>
            <Col span={12}>
              <HeaderRight />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Header;
