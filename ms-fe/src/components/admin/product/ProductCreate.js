import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Row, Form, Input, Select, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
import styles from "./ProductCreate.module.css";
import { closeFrame } from "../animations/animation";

const ProductCreate = (props) => {
  const brands = props.brands;
  const categories = props.categories;
  const forms = props.forms;
  const patterns = props.patterns;
  const [product, setProduct] = useState({
    productName: "",
    brandId: null,
    categoryId: null,
    patternId: null,
    formId: null,
    description: "",
  });

  //function

  function handleSetProduct(field, value) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }

  function createProduct() {
    console.log(product);
  }

  return (
    <div id="productCreate" className={`${styles.product__create} d-none`}>
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
            <Form>
              <span>Tên sản phẩm</span>
              <Form.Item name="productName">
                <Input
                  placeholder="Product name"
                  onChange={(event) =>
                    handleSetProduct("productName", event.target.value)
                  }
                ></Input>
              </Form.Item>
              <Row>
                <Col span={12}>
                  <div className={styles.product__createSelect}>
                    <span>Thương hiệu</span>
                    <Form.Item name="brand">
                      <Select
                        placeholder="Thương hiệu"
                        onChange={(event) => handleSetProduct("brandId", event)}
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
                        placeholder="Loại sản phẩm"
                        onChange={(event) =>
                          handleSetProduct("categoryId", event)
                        }
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
                        placeholder="Họa tiết"
                        onChange={(event) =>
                          handleSetProduct("patternId", event)
                        }
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
                        placeholder="Dáng áo"
                        onChange={(event) => handleSetProduct("formId", event)}
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
                  onChange={(event) =>
                    handleSetProduct("description", event.target.value)
                  }
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
