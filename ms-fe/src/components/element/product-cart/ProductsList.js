import { Card, Col } from "antd";
import styles from "./ProductsList.module.css";

function ProductsList({ data }) {
  return (
    <Col span={6} className={styles.centerd}>
      <Card
        className={styles.width}
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            className={styles.image}
            alt="product"
            src="https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/products%2FShirt%20A%2FOrange%2F1697979036874Shirt_A2122124?alt=media&token=59b6e0ac-ebe7-4bc1-b02e-708ce3c212e0"
          />
        }
      >
        <div className={styles.size}>
          <p className={styles.centerd}>Category</p>
          <h2 className={styles.centerd}>Name product</h2>
          <p className={styles.centerd}>
            <i>star</i>
          </p>
          <p className={styles.centerd}>
            <bdi>$50</bdi>
          </p>
        </div>
      </Card>
    </Col>
  );
}

export default ProductsList;
