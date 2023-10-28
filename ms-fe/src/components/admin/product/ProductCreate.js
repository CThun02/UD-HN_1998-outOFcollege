import {
  CheckCircleTwoTone,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Col,
  Row,
  Input,
  Button,
  message,
  notification,
  Popconfirm,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import styles from "./ProductCreate.module.css";
import { closeFrame } from "../animations/animation";
import { isString } from "antd/es/button";
import { isFormInputEmpty } from "./ValidateForm";
import axios from "axios";

const ProductCreate = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const renderIndex = props.render;
  const [product, setProduct] = useState({
    id: "1",
    productCode: "1",
    productName: " ",
    brandId: " ",
    categoryId: " ",
    description: " ",
    status: "ACTIVE",
  });
  //function

  function handleSetProduct(field, value) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }

  function createProduct() {
    for (let key in product) {
      if (isString(product[key])) {
        if (product[key].trim() === "") {
          handleSetProduct(key, product[key].trim());
        }
      }
    }
    let check = isFormInputEmpty(product);
    if (!check) {
      axios
        .post(api + "product/create", product)
        .then((res) => {
          messageApi.loading("Vui lòng chờ!", 2);
          setTimeout(() => {
            handleSetProduct("productName", " ");
            handleSetProduct("description", " ");
            renderIndex(res.data);
            notification.open({
              message: "Notification",
              description: "Thêm mới sản phẩm thành công",
              icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            });
            closeFrame("productCreate", "productCreateFrame");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập đầy đủ các trường");
    }
  }

  useEffect(() => {}, []);

  return (
    <div id="productCreate" className={`${styles.product__create} d-none`}>
      {contextHolder}
      <div id="productCreateFrame" className={styles.product__createFrame}>
        <div className={styles.product__createClose}>
          <Button
            onClick={() => closeFrame("productCreate", "productCreateFrame")}
          >
            <CloseOutlined />
          </Button>
        </div>
        <h2>
          <>
            <PlusOutlined /> Thêm sản phẩm
          </>
        </h2>
        <br />
        <Row>
          <Col span={24}>
            <div className="m-5">
              <span>Tên sản phẩm</span>
              <Input
                placeholder="Product name"
                onChange={(event) =>
                  handleSetProduct("productName", event.target.value)
                }
                value={product.productName}
                status={product.productName === "" ? "error" : ""}
              ></Input>
            </div>
            <div className="m-5">
              <span>Mô tả</span>
              <TextArea
                value={product.description}
                placeholder="Description"
                allowClear
                onChange={(event) =>
                  handleSetProduct("description", event.target.value)
                }
                status={product.description === "" ? "error" : ""}
              />
            </div>
            <br />
            <div style={{ textAlign: "center" }}>
              <Popconfirm
                title="Thêm mới sản phẩm"
                description="Chắc chắn thêm mới sản phẩm!"
                onConfirm={() => createProduct()}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  className={styles.product__createConfirm}
                  loading={false}
                >
                  Xác nhận
                </Button>
              </Popconfirm>
            </div>
            <br />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductCreate;
