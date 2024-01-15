import React, { useState } from "react";
import { Modal, notification } from "antd";
import styles from "./ModalProduct.module.css";
import ProductDetails from "../product/ProductDetails";
import { now } from "moment";
import SockJs from "../../../service/SockJs";

const ModalProduct = ({
  visible,
  onCancel,
  cartId,
  render,
  billId,
  isEditProductTimeLine,
  setBoolean,
  boolean,
  quantity,
  setQuantity,
}) => {
  const [productDetails, setProductDetails] = useState([]);

  var cart = JSON.parse(localStorage.getItem(cartId));
  let productDetailsCreate = cart?.productDetails;

  function action() {
    cart = {
      productDetails: productDetailsCreate,
      timeStart: now(),
      account: cart?.account,
      count: productDetailsCreate.length,
    };
    localStorage.setItem(cartId, JSON.stringify(cart));
    notification.success({
      message: "Thông báo",
      description: "Thêm sản phẩm vào giỏ hàng thành công!",
    });
    setBoolean(!boolean);
  }

  return (
    <>
      <SockJs connectTo={"billOrder-topic"} setValues={setProductDetails} />
      <Modal
        title="Tìm kiếm sản phẩm"
        style={{ top: "10px" }}
        centered
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
          billId={billId}
          productDetails={productDetails}
          setProductDetails={setProductDetails}
          render={render}
          isEditProductTimeLine={isEditProductTimeLine}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </Modal>
    </>
  );
};

export default ModalProduct;
