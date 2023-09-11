import ProductAdminForm from "./ProductAdminForm";
import ProductSizeColorAdminTable from "./ProductSizeColorAdminTable";
import ProductAdminImage from "./ProductAdminImage";
import styles from "./ProductAdmin.module.css";

function ProductAdminUpdate() {
  return (
    <div className={styles.product}>
      <ProductAdminForm ModuleName={"Chỉnh sửa sản phẩm"}></ProductAdminForm>
      <ProductSizeColorAdminTable></ProductSizeColorAdminTable>
      <ProductAdminImage></ProductAdminImage>
    </div>
  );
}

export default ProductAdminUpdate;
