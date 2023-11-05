import { Col, Row } from "antd";
import styles from "./ComponentDetail.module.css";

function ComponentDetail({ title, content }) {
  return (
    <div className={styles.borderBottom}>
      <Row className={styles.rowCss}>
        <Col span={12}>
          <p className={`${styles.size} `}>{title}</p>
        </Col>
        <Col span={12}>
          <p className={`${styles.size} ${styles.color} ${styles.fontWeight}`}>
            {content}
          </p>
        </Col>
      </Row>
    </div>
  );
}

export default ComponentDetail;
