import { Card, Col, Space } from "antd";
import styles from "./ProductsList.module.css";

const image = "/products/shirt-men.jpg";

function ProductsList({ data }) {
  return (
    <Col span={6} className={styles.centerd}>
      <Card
        className={styles.width}
        hoverable
        style={{ width: 270, border: "none" }}
        cover={<img alt="product" src={image} />}
      >
        <div className={styles.size}>
          <Space direction="vertical" size={6} style={{ width: "100%" }}>
            <p className={`${styles.centerd} ${styles.opacity}`}>Category</p>
            <h2 className={`${styles.centerd} ${styles.textH2}`}>
              Name Product
            </h2>
            <p className={styles.centerd}>
              <i>star</i>
            </p>
            <p className={styles.centerd}>
              <bdi className={`${styles.fontWeight} ${styles.bdiSize}`}>
                $50
              </bdi>
            </p>
          </Space>
        </div>
      </Card>
    </Col>
  );
}

export default ProductsList;
