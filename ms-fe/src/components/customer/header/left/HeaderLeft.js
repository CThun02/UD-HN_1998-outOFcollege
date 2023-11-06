import { Col, Row } from "antd";
import styles from "./HeaderLeft.module.css";
import { Link } from "react-router-dom";

const logo = "/logo/logo-shop.png";

function HeaderLeft() {
  return (
    <div>
      <Row className={styles.margin}>
        <Col span={7}>
          <div className={styles.logo}>
            <Link to={"/ms-shop/home"}>
              <img src={logo} alt="logo-shop" className={styles.imageSize} />
            </Link>
          </div>
        </Col>
        <Col span={16}>
          <div className={styles.lineHeight}>
            <Row className={styles.margin}>
              <Col span={5}>
                <Link to={"/ms-shop/shopping"} className={styles.link}>
                  Tất cả
                </Link>
              </Col>
              <Col span={5}>
                <Link className={styles.link}>Áo sơ mi</Link>
              </Col>
              <Col span={7}>
                <Link className={styles.link}>Áo sơ mi tay ngắn</Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HeaderLeft;
