import { Button, Col, Row, Space } from "antd";
import styles from "./FollowingOrderContent.module.css";

const image = "/products/shirt-men.jpg";

function FollowingOrderContent() {
  return (
    <div className={styles.content}>
      <div className={styles.width}>
        <div className={styles.followingContent}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <div style={{ borderBottom: "1px solid #ccc", padding: "5px 0" }}>
              <span
                style={{
                  fontSize: "1.25rem",
                  color: "#ee4d2d",
                  textTransform: "uppercase",
                }}
              >
                Chờ giao hàng
              </span>
            </div>
            <Row style={{ margin: 0 }}>
              <Col span={3}>
                <img src={image} alt="products" style={{ width: "100px" }} />
              </Col>
              <Col span={18}>
                <Space style={{ width: "100%" }} size={8} direction="vertical">
                  <span className={`${styles.textColor} ${styles.textSize}`}>
                    [Vải thái cao cấp, mềm mịn, thoáng mát, in tên số theo yêu
                    cầu] Bộ Quần Áo bóng đá, đá bóng, đá banh, áo thun PSG
                  </span>

                  <span>Kem/L</span>
                  <span className={styles.textColor}>x1</span>
                </Space>
              </Col>
              <Col
                span={3}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <span style={{ fontSize: "1.25rem", color: "#ee4d2d" }}>
                  178.000đ
                </span>
              </Col>
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                borderTop: "1px solid #ccc",
                padding: "10px 0",
              }}
            >
              <Button type="primary" style={{ marginRight: "20px" }}>
                Mua lại
              </Button>
              <span>Thành tiền 178.000đ</span>
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default FollowingOrderContent;
