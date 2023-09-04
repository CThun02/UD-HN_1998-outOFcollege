import ProductAdminForm from "./ProductAdminForm";

function ProductAdminCreate() {
  return (
    <div>
      <ProductAdminForm
        ModuleName={"Thêm mới sản phẩm"}
        ModuleActive={"/controller/v1/admin/product/update"}
      ></ProductAdminForm>
    </div>
  );
}

export default ProductAdminCreate;
