import { Col, Row } from "antd";
import HeaderLeft from "../header/left/HeaderLeft";
import HeaderRight from "../header/right/HeaderRight";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header}>
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
