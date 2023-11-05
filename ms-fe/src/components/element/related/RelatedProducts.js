import { Divider } from "antd";
import styles from "./RelatedProducts.module.css";

function RelatedProducts() {
  return (
    <div className={styles.relatedProducts}>
      <div className={styles.content}>
        <Divider plain className={styles.cssText}>
          Sản phẩm liên quan
        </Divider>
      </div>
    </div>
  );
}

export default RelatedProducts;
