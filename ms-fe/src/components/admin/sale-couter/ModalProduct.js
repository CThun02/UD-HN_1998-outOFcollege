import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Button, Table } from "antd";
import styles from "./ModalProduct.module.css";
import axios from "axios";
import ProductDetails from "../product/ProductDetails";

const { Option } = Select;

const ModalProduct = ({ visible, onCancel, cartId, render }) => {
  const [data, setData] = useState([]);

  function action(record) {
    var cart = JSON.parse(localStorage.getItem(cartId));
    var productDetails = cart.productDetails;
    var productDetail = record;
    if (productDetails.length > 0) {
      let checkExist = 0;
      for (let i = 0; i < productDetails.length; i++) {
        if (productDetails[i].productDetail.id === productDetail.id) {
          productDetails[i].quantity++;
          checkExist++;
        }
      }
      if (checkExist === 0) {
        productDetails.push({ productDetail: productDetail, quantity: 1 });
      }
    } else {
      productDetails.push({ productDetail: productDetail, quantity: 1 });
    }
    cart.productDetails = productDetails;
    localStorage.setItem(cartId, JSON.stringify(cart));
    render(productDetails);
    onCancel();
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/bill/product")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [cartId]);

  return (
    <>
      <Modal
        title="Tìm kiếm sản phẩm"
        open={visible}
        onCancel={onCancel}
        className={styles.modalSize}
        footer={null}
        width={2000}
      >
        <ProductDetails action={action} />
      </Modal>
    </>
  );
};

export default ModalProduct;
