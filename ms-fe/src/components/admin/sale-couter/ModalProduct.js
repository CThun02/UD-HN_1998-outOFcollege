import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Button, Table } from "antd";
import styles from "./ModalProduct.module.css";
import axios from "axios";
import ProductDetails from "../product/ProductDetails";
import { now } from "moment";

const { Option } = Select;

const ModalProduct = ({ visible, onCancel, cartId, render }) => {
  const [data, setData] = useState([]);
  const [renderThis, setRenderThis] = useState(null);
  var cart = JSON.parse(localStorage.getItem(cartId));
  let productDetailsCreate = cart.productDetails;
  function action() {
    cart = { productDetails: productDetailsCreate, timeStart: now() };
    localStorage.setItem(cartId, JSON.stringify(cart));
    render(productDetailsCreate);
    setRenderThis(productDetailsCreate);
    onCancel();
  }

  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/api/admin/bill/product")
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, [cartId, renderThis]);

  return (
    <>
      <Modal
        title="Tìm kiếm sản phẩm"
        key={cartId}
        open={visible}
        onCancel={() => {
          onCancel();
          setRenderThis(visible);
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
