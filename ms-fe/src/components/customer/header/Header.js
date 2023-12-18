import { Col, Row } from "antd";
import HeaderLeft from "../header/left/HeaderLeft";
import HeaderRight from "../header/right/HeaderRight";
import styles from "./Header.module.css";
import { useEffect, useState } from "react";
import HeaderCenter from "./center/HeaderCenter";

function Header({ render, setRenderHeader }) {
  const [selectedTab, setSelectedTab] = useState("");
  const href = window.location.href;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  useEffect(() => {
    if (
      href.includes("home") ||
      selectedTab === "" ||
      href.includes("shopping") ||
      href.includes("follow-order") ||
      href.includes("about") ||
      href.includes("contact") ||
      href.includes("cart") ||
      href.includes("checkout") ||
      href.includes("bill")
    ) {
      if (href.includes("home") || selectedTab === "") {
        setSelectedTab("home");
      }

      if (href.includes("shopping")) {
        setSelectedTab("shop");
      }

      if (href.includes("follow-order")) {
        setSelectedTab("flowOder");
      }

      if (href.includes("about")) {
        setSelectedTab("inducere");
      }

      if (href.includes("contact")) {
        setSelectedTab("contact");
      }

      if (href.includes("cart") || href.includes("checkout")) {
        setSelectedTab("cart");
      }

      if (href.includes("bill")) {
        setSelectedTab("flowOder");
      }
    } else {
      setSelectedTab("home");
    }
  }, [href]);

  return (
    <div
      className={`${checkTop > 0 ? styles.header : ""} ${
        visible ? styles.visible : styles.hidden
      } ${styles.background} `}
    >
      <div className={styles.paddingTopAndBottom}>
        <div className={styles.paddingLeftAndRight}>
          <Row className={styles.margin}>
            <Col span={6}>
              <HeaderLeft setSelectedTab={setSelectedTab} />
            </Col>
            <Col span={12}>
              <HeaderCenter
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
              />
            </Col>
            <Col span={6}>
              <HeaderRight
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                render={render}
                setRenderHeader={setRenderHeader}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Header;
