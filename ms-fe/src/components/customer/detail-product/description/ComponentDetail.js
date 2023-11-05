import { Col, Row } from "antd";
import styles from "./ComponentDetail.module.css";

function ComponentDetail({ title, content }) {
  return (
    <div>
      <Row className={styles.rowCss}>
        <Col span={7}></Col>
        <Col span={5}>
          <p className={`${styles.size} `}>{title}</p>
        </Col>
        <Col span={5}>
          <p className={`${styles.size} ${styles.color} ${styles.fontWeight}`}>
            {content}
          </p>
        </Col>
        <Col span={7}></Col>
      </Row>
    </div>
  );
}

export default ComponentDetail;
