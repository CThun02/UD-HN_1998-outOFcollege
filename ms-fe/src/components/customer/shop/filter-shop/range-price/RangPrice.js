import { Col, Input, Row, Slider, Space } from "antd";
import styles from "./RangPrice.module.css";

function RangPrice() {
  return (
    <>
      <Space size={10} direction="vertical" style={{ width: "100%" }}>
        <h3 className={`${styles.textSize} ${styles.textColor}`}>Giá tiền</h3>
        <Slider range defaultValue={[20, 50]} className={styles.rangePrice} />
        <Space style={{ width: "100%" }} direction="vertical">
          <Row className={styles.rowSpacing}>
            <Col span={12}>
              <label className={`${styles.textLabel} ${styles.textColor}`}>
                Từ
              </label>
            </Col>
            <Col span={12}>
              <label className={`${styles.textLabel} ${styles.textColor}`}>
                Đến
              </label>
            </Col>
          </Row>
          <Row className={styles.rowSpacing}>
            <Space style={{ width: "100%" }} direction="horizontal" size={2}>
              <Col span={22}>
                <Input className={styles.input} suffix="đ" />
              </Col>
              <Col span={22}>
                <Input className={styles.input} suffix="đ" />
              </Col>
            </Space>
          </Row>
        </Space>
      </Space>
    </>
  );
}

export default RangPrice;
