import { Col, Row } from "antd";
import styles from "./BestSellingProduct.module.css";
import ProductsList from "../../../element/product-cart/ProductsList";

function BestSellingAndNewProduct({ arrays, title }) {
  return (
    <div className={styles.padding}>
      <div>
        <div className={styles.title}>
          <h2>{title}</h2>
        </div>
        <div className={styles.margin}>
          <div className={styles.image}>
            <img
              src="https://websitedemos.net/organic-shop-02/wp-content/uploads/sites/465/2019/07/logo-leaf-new.png"
              alt="tree"
            />
          </div>
        </div>
      </div>

      <div className={styles.products}>
        <div className={styles.spacing}>
          <Row>
            <ProductsList />
            <ProductsList />
            <ProductsList />
            <ProductsList />
          </Row>
        </div>
      </div>
    </div>
  );
}

export default BestSellingAndNewProduct;
