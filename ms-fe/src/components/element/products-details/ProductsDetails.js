import { Space } from "antd";
import FilterProductsDetails from "./FilterProductsDetails";
import TablesProductsDetails from "./TablesProductsDetails";
import styles from "./ProductsDetails.module.css";
import { useState } from "react";

function ProductsDetails({
  productsId,
  setProductsDetailsId,
  productsDetailsId,
  values,
  setOnDeleteProductDetailIds,
}) {
  const [productsDetails, setProductsDetails] = useState([]);

  return (
    <div>
      {productsId.length ? (
        <div className={styles.content}>
          <Space style={{ width: "100%" }} direction="vertical" size={12}>
            <FilterProductsDetails
              setProductsDetails={setProductsDetails}
              productsId={productsId}
            />

            <TablesProductsDetails
              productsDetails={productsDetails}
              productsDetailsId={productsDetailsId}
              setProductsDetailsId={setProductsDetailsId}
              values={values}
              setOnDeleteProductDetailIds={setOnDeleteProductDetailIds}
            />
          </Space>
        </div>
      ) : null}
    </div>
  );
}

export default ProductsDetails;
