import { Link } from "react-router-dom";
import styles from "./LogoFooter.module.css";
import { Col, Row, Space } from "antd";

const logo = "/logo/logo-footer-shop.png";

function LogoFooter() {
  return (
    <div className={styles.logo}>
      <Row>
        <Col span={24}>
          <Link to={"/ms-shop/home"}>
            <img src={logo} alt="logo-shop" className={styles.imageSize} />
          </Link>
        </Col>
      </Row>
      <Row>
        <Col>
          <p className={styles.fontStyle}>
            Sự đơn giản là định nghĩa của thanh lịch.
          </p>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Space direction="vertical" size={10}>
            <Col span={24}>
              <p className={styles.text}>
                Address: 13 P. Trịnh Văn Bô, Xuân Phương, Nam Từ Liêm, Hà Nội
              </p>
            </Col>
            <Col span={24}>
              <p className={styles.text}>Phone: +65 11.188.888</p>
            </Col>
            <Col span={24}>
              <p className={styles.text}>
                Email: menshirts.shop.outofcollege@gmail.com
              </p>
            </Col>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default LogoFooter;
