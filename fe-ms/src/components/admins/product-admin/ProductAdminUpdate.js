import ProductAdminForm from "./ProductAdminForm";
import ProductAdminImage from "./ProductAdminImage";
import ProductSizeColorAdminTable from "./ProductSizeColorAdminTable";

function ProductAdminUpdate() {
  return (
    <div>
      <ProductAdminForm
        ModuleName={"Chỉnh sửa sản phẩm"}
        ModuleActive={"/controller/v1/admin/product"}
      ></ProductAdminForm>
      <ProductSizeColorAdminTable></ProductSizeColorAdminTable>
      <ProductAdminImage></ProductAdminImage>
    </div>
  );
}

export default ProductAdminUpdate;
