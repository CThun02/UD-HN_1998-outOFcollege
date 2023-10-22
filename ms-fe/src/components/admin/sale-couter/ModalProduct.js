import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Button, Table } from "antd";
import styles from "./ModalProduct.module.css";
import ProductDetails from "../product/ProductDetails";
import { now } from "moment";

const ModalProduct = ({ visible, onCancel, cartId, render }) => {
  const [renderThis, setRenderThis] = useState(null);
  var cart = JSON.parse(localStorage.getItem(cartId));
  let productDetailsCreate = cart.productDetails;
  function action() {
    cart = {
      productDetails: productDetailsCreate,
      timeStart: now(),
      account: cart.account,
    };
    localStorage.setItem(cartId, JSON.stringify(cart));
  }

  return (
    <>
      <Modal
        title="Tìm kiếm sản phẩm"
        key={cartId}
        open={visible}
        onCancel={() => {
          onCancel();
          render(Math.random());
        }}
        className={styles.modalSize}
        footer={null}
        width={2000}
      >
        <ProductDetails
          action={action}
          productDetailsCreate={productDetailsCreate}
        />
      </Modal>
    </>
  );
};

export default ModalProduct;
