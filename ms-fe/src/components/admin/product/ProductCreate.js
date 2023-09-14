import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Col, Row, Form, Input, Select, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import styles from "./ProductCreate.module.css";

const ProductCreate = (props) => {
  const brands = props.brands;
  const categories = props.categories;
  const forms = props.forms;
  const patterns = props.patterns;

  return (
    <div className={styles.productCreate}>
      <div className={styles.productCreate__frame}>
        <div className={styles.productCreate__close}>
          <Button>
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
                <Input placeholder="Product name"></Input>
              </Form.Item>
              <Row>
                <Col span={12}>
                  <div className={styles.productCreate__select}>
                    <span>Thương hiệu</span>
                    <Form.Item name="brand">
                      <Select placeholder="Thương hiệu">
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
                  <div className={styles.productCreate__select}>
                    <span>Loại sản phẩm</span>
                    <Form.Item name="category">
                      <Select placeholder="Loại sản phẩm">
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
                  <div className={styles.productCreate__select}>
                    <span>Hoạt tiết</span>
                    <Form.Item name="pattern">
                      <Select placeholder="Họa tiết">
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
                  <div className={styles.productCreate__select}>
                    <span>Dáng áo</span>
                    <Form.Item name="form">
                      <Select placeholder="Dáng áo">
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
                <TextArea placeholder="Description" allowClear />
              </Form.Item>
              <Form.Item>
                <Button
                  className={styles.productCreate__confirm}
                  loading={false}
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
