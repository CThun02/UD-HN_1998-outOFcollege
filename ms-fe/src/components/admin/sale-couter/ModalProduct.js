import React from "react";
import { Modal } from "antd";
import styles from "./ModalProduct.module.css";
import ProductDetails from "../product/ProductDetails";
import { now } from "moment";

const ModalProduct = ({ visible, onCancel, cartId, render }) => {
  var cart = JSON.parse(localStorage.getItem(cartId));
  let productDetailsCreate = cart.productDetails;
  function action() {
    cart = {
      productDetails: productDetailsCreate,
      timeStart: now(),
      account: cart.account,
    };
    localStorage.setItem(cartId, JSON.stringify(cart));
    render(productDetailsCreate);
    // setRenderThis(productDetailsCreate);
  }

  return (
    <>
      <Modal
        title="Tìm kiếm sản phẩm"
        key={cartId}
        open={visible}
        onCancel={() => {
          onCancel();
          // setRenderThis(visible);
        }}
        className={styles.modalSize}
        footer={null}
        width={2000}
      >
        <ProductDetails
          action={action}
          productDetailsCreate={productDetailsCreate}
          render={cartId}
        />
      </Modal>
    </>
  );
};

export default ModalProduct;
