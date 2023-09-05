import ProductAdminForm from "./ProductAdminForm";
import styles from "./ProductAdmin.module.css";

function ProductAdminCreate() {
  return (
    <div className={styles.product}>
      <ProductAdminForm ModuleName={"Thêm mới sản phẩm"}></ProductAdminForm>
    </div>
  );
}

export default ProductAdminCreate;
