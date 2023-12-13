import { Col, List, Row, Space } from "antd";
import styles from "./BestSellingProduct.module.css";
import ProductsList from "../../../element/product-cart/ProductsList";
import SockJs from "../../../../service/SockJs";

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

      <div className={styles.spacing}>
        <Row className={styles.products}>
          {arrays &&
            arrays.map((item) => {
              return (
                <Col xs={12} xl={6}>
                  <ProductsList data={item} key={item.productDetailId} />
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
}

export default BestSellingAndNewProduct;
