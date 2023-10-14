import { useState } from "react";

import styles from "./AddProductInPromotion.module.css";
import { Button, Col, Row, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModalAddProductList from "./ModalAddProductList";

function AddProductInPromotion({
  products,
  setProducts,
  setFieldValue,
  values,
}) {
  // list product
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.addFormProduct}>
      <div className={styles.content}>
        <Space style={{ width: "100%" }} size={16} direction="vertical">
          <Space style={{ width: "100%" }} size={6} direction="vertical">
            <Row>
              <Col span={20}>
                <Space size={12} className={styles.color}>
                  <h2>Sản phẩm khuyến mại</h2>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                {products.length ? (
                  <p>
                    Tổng cộng có <strong>{products.length}</strong> sản phẩm
                  </p>
                ) : (
                  <p className={styles.gray}>
                    Thêm sản phẩm vào chương trình khuyến mại.
                  </p>
                )}
              </Col>
            </Row>
          </Space>

          <Row>
            <ModalAddProductList
              isLoadingModal={modalOpen}
              setIsLoadingModal={setModalOpen}
              products={products}
              setProducts={setProducts}
              setFieldValue={setFieldValue}
              values={values}
            />
          </Row>
        </Space>
      </div>
    </div>
  );
}

export default AddProductInPromotion;
