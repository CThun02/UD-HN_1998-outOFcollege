import { Col, Row } from "antd";
import styles from "./HeaderLeft.module.css";
import { Link } from "react-router-dom";

const logo = "/logo/logo-shop.png";

function HeaderLeft({ setSelectedTab }) {
  return (
    <div>
      <Row className={styles.margin}>
        <Col span={24}>
          <div className={styles.logo}>
            <Link to={"/ms-shop/home"} onClick={() => setSelectedTab("home")}>
              <img src={logo} alt="logo-shop" className={styles.imageSize} />
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HeaderLeft;
