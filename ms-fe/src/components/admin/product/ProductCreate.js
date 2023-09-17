import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Row, Form, Input, Select, Button, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ProductCreate.module.css";
import { closeFrame } from "../animations/animation";
import { isString } from "antd/es/button";
import { isFormInputEmpty } from "./ValidateForm";
import axios from "axios";

const ProductCreate = (props) => {
  const api = "http://localhost:8080/api/admin/product/";
  const [messageApi, contextHolder] = message.useMessage();
  const formRef = useRef();
  const brands = props.brands;
  const categories = props.categories;
  const forms = props.forms;
  const patterns = props.patterns;
  const renderIndex = props.render;
  const [product, setProduct] = useState({
    productName: " ",
    brandId: " ",
    categoryId: " ",
    patternId: " ",
    formId: " ",
    description: " ",
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
        .post(api + "create", product)
        .then((res) => {
          messageApi.loading("Vui lòng chờ!", 2);
          setTimeout(() => {
            messageApi.success("Thêm mới thành công!", 2);
            closeFrame("productCreate", "productCreateFrame");
            formRef.current.resetFields();
            handleSetProduct("productName", " ");
            handleSetProduct("brandId", " ");
            handleSetProduct("categoryId", " ");
            handleSetProduct("patternId", " ");
            handleSetProduct("formId", " ");
            handleSetProduct("description", " ");
            renderIndex(res.data);
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập đầy đủ các trường");
    }
  }

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
          <PlusOutlined /> Thêm sản phẩm
        </h2>
        <br />
        <Row>
          <Col span={24}>
            <Form ref={formRef}>
              <span>Tên sản phẩm</span>
              <Form.Item name="productName">
                <Input
                  placeholder="Product name"
                  onBlur={(event) =>
                    handleSetProduct("productName", event.target.value)
                  }
                  status={product.productName === "" ? "error" : ""}
                ></Input>
              </Form.Item>
              <Row>
                <Col span={12}>
                  <div className={styles.product__createSelect}>
                    <span>Thương hiệu</span>
                    <Form.Item name="brand">
                      <Select
                        onChange={(event) => handleSetProduct("brandId", event)}
                        placeholder="Brand"
                        status={product.brandId === "" ? "error" : ""}
                      >
                        {brands &&
                          brands.map((item) => {
                            return (
                              <Select.Option value={item.id} key={item.id}>
                                {item.brandName}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.product__createSelect}>
                    <span>Loại sản phẩm</span>
                    <Form.Item name="category">
                      <Select
                        onChange={(event) =>
                          handleSetProduct("categoryId", event)
                        }
                        placeholder="Category"
                        status={product.categoryId === "" ? "error" : ""}
                      >
                        {categories &&
                          categories.map((item) => {
                            return (
                              <Select.Option value={item.id} key={item.id}>
                                {item.categoryName}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.product__createSelect}>
                    <span>Hoạt tiết</span>
                    <Form.Item name="pattern">
                      <Select
                        onChange={(event) =>
                          handleSetProduct("patternId", event)
                        }
                        placeholder="Pattern"
                        status={product.patternId === "" ? "error" : ""}
                      >
                        {patterns &&
                          patterns.map((item) => {
                            return (
                              <Select.Option value={item.id} key={item.id}>
                                {item.patternName}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
                <Col span={12}>
                  <div className={styles.product__createSelect}>
                    <span>Dáng áo</span>
                    <Form.Item name="form">
                      <Select
                        onChange={(event) => handleSetProduct("formId", event)}
                        placeholder="form"
                        status={product.formId === "" ? "error" : ""}
                      >
                        {forms &&
                          forms.map((item) => {
                            return (
                              <Select.Option value={item.id} key={item.id}>
                                {item.formName}
                              </Select.Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                  </div>
                </Col>
              </Row>
              <span>Mô tả</span>
              <Form.Item name="description">
                <TextArea
                  placeholder="Description"
                  allowClear
                  onBlur={(event) =>
                    handleSetProduct("description", event.target.value)
                  }
                  status={product.description === "" ? "error" : ""}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className={styles.product__createConfirm}
                  loading={false}
                  onClick={() => {
                    createProduct();
                  }}
                >
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductCreate;
