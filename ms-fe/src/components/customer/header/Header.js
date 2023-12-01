import { Col, Row } from "antd";
import HeaderLeft from "../header/left/HeaderLeft";
import HeaderRight from "../header/right/HeaderRight";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import HeaderCenter from "./center/HeaderCenter";

function Header({ render, setRenderHeader }) {
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
  }, [render]);

  return (
    <div
      className={`${checkTop > 0 ? styles.header : ""} ${visible ? styles.visible : styles.hidden
        } ${styles.background} `}
    >
      <div className={styles.paddingTopAndBottom}>
        <div className={styles.paddingLeftAndRight}>
          <Row className={styles.margin}>
            <Col span={6}>
              <HeaderLeft />
            </Col>
            <Col span={12}>
              <HeaderCenter />
            </Col>
            <Col span={6}>
              <HeaderRight render={setRenderHeader} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Header;
