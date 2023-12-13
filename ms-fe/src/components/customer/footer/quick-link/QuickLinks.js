import { Col, Row, Space } from "antd";
import styles from "./QuickLinks.module.css";
import { Link } from "react-router-dom";

function QuickLinks() {
  return (
    <div>
      <Row>
        <Col span={24}>
          <h4 className={styles.fontWeight}>Đường dẫn nhanh</h4>
        </Col>
      </Row>
      <Row className={styles.rowMargin}>
        <Col xs={24} xl={12}>
          <Space direction="vertical" size={10}>
            <Col span={24}>
              <Link className={styles.hyperLink}>Trang chủ</Link>
            </Col>
            <Col span={24}>
              <Link className={styles.hyperLink}>Cửa hàng</Link>
            </Col>
            <Col span={24}>
              <Link className={styles.hyperLink}>Giỏ hàng</Link>
            </Col>
            <Col span={24}>
              <Link className={styles.hyperLink}>Thanh toán</Link>
            </Col>
            <Col span={24}>
              <Link className={styles.hyperLink}>Giới thiệu</Link>
            </Col>
            <Col span={24}>
              <Link className={styles.hyperLink}>Liên lạc</Link>
            </Col>
          </Space>
        </Col>
        <Col xs={24} xl={12}>
          <Space direction="vertical" size={10}>
            <Col span={24}>
              <Link className={styles.hyperLink}>Chính sách bảo mật</Link>
            </Col>
            <Col span={24}>
              <Link className={styles.hyperLink}>Chi tiết vận chuyển</Link>
            </Col>
            <Col span={24}>
              <Link className={styles.hyperLink}>Mã giảm giá</Link>
            </Col>
            <Col span={24}>
              <Link className={styles.hyperLink}>Điều khoản</Link>
            </Col>
          </Space>
        </Col>
      </Row>
    </div>
  );
}

export default QuickLinks;
