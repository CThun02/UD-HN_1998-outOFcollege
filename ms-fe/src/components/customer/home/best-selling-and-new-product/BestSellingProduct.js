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

      <div className={styles.products}>
        <div className={styles.spacing}>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={arrays}
            renderItem={(item) => (
              <List.Item>
                <ProductsList data={item} key={item.productDetailId} />
              </List.Item>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default BestSellingAndNewProduct;
