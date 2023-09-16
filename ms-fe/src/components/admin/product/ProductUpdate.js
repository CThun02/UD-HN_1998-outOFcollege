import {
  EditOutlined,
  FormOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Select, Space } from "antd";
import Form from "antd/es/form/Form";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import Upload from "antd/es/upload/Upload";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ProductUpdate.module.css";

const ProductUpdate = () => {
  const api = "http://localhost:8080/api/admin/";
  const [brands, setBrands] = useState(null);
  const [categories, setCategories] = useState(null);
  const [patterns, setPatterns] = useState(null);
  const [forms, setForms] = useState(null);
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [buttons, setButtons] = useState(null);
  const [collars, setCollars] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [sleeves, setSleeves] = useState(null);
  const [shirtTails, setshirtTails] = useState(null);
  const [url, setUrl] = useState(
    "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg"
  );
  const [product, setProduct] = useState({
    productName: "",
    brandId: null,
    categoryId: null,
    patternId: null,
    formId: null,
    description: "",
  });

  //fucntion
  function handleSetProduct(field, value) {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }

  function handleUpload(event) {
    if (event.file && event.fileList.length > 1) {
      event.fileList.splice(0, 1);
    }
    if (event.file && event.fileList.length > 0) {
      const uploadedFile = event.fileList[0].originFileObj;

      // Tạo đối tượng FileReader để đọc nội dung của file
      const reader = new FileReader();

      // Định nghĩa hàm xử lý khi FileReader đọc xong file
      reader.onload = () => {
        const newImageUrl = reader.result;

        // Cập nhật state với đường dẫn hình ảnh mới
        setUrl(newImageUrl);
      };

      // Đọc nội dung của file dưới dạng URL
      reader.readAsDataURL(uploadedFile);
    }
  }
  useEffect(() => {
    axios
      .get(api + "brand")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "size")
      .then((response) => {
        setSizes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "color")
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "pattern")
      .then((response) => {
        setPatterns(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "form")
      .then((response) => {
        setForms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div className={styles.product__update}>
        <Row>
          <Col span={10} className={styles.product__updateForm}>
            <h2>
              <FormOutlined /> Sản phẩm
            </h2>
            <br />
            <Row>
              <Col span={8}>
                <div className={styles.product__updateFormImg}>
                  <img src={url} alt="Avatar" />
                  <div className={styles.product__updateFormImgIcon}>
                    <Upload
                      showUploadList={false}
                      multiple={false}
                      onChange={(event) => {
                        handleUpload(event);
                      }}
                    >
                      <EditOutlined />
                    </Upload>
                  </div>
                </div>
              </Col>
              <Col span={16}>
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
                      <div className={styles.product__updateSelect}>
                        <span>Thương hiệu</span>
                        <Form.Item name="brand">
                          <Select
                            showSearch
                            placeholder="Thương hiệu"
                            onChange={(event) =>
                              handleSetProduct("brandId", event)
                            }
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
                      <div className={styles.product__updateSelect}>
                        <span>Loại sản phẩm</span>
                        <Form.Item name="category">
                          <Select
                            showSearch
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
                      <div className={styles.product__updateSelect}>
                        <span>Hoạt tiết</span>
                        <Form.Item name="pattern">
                          <Select
                            showSearch
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
                      <div className={styles.product__updateSelect}>
                        <span>Dáng áo</span>
                        <Form.Item name="form">
                          <Select
                            showSearch
                            placeholder="Dáng áo"
                            onChange={(event) =>
                              handleSetProduct("formId", event)
                            }
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
                </Form>
              </Col>
              <Col span={24}>
                <span>Mô tả</span>
                <TextArea
                  placeholder="Description"
                  allowClear
                  value={product.description}
                  onChange={(event) =>
                    handleSetProduct("description", event.target.value)
                  }
                />
                <br />
                <br />
                <div style={{ textAlign: "end" }}>
                  <Button>Hoàn thành</Button>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={14} className={styles.product__createDetails}>
            <h2>
              <PlusSquareOutlined /> Chi tiết sản phẩm
            </h2>
            <br />

            <Row>
              <Col span={8}>
                <div className="mse-5">
                  <span>Loại cúc áo</span>
                  <br />
                  <Select
                    showSearch
                    placeholder="Cúc áo"
                    className={styles.product__createDetailsSelect}
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
                </div>
              </Col>
              <Col span={8}>
                <div className="mse-5">
                  <span>Kích cỡ</span>
                  <br />
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder="Kích cỡ"
                    optionFilterProp="children"
                    className={styles.product__createDetailsSelect}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                  >
                    {sizes &&
                      sizes.map((item) => {
                        return (
                          <Select.Option key={item.id}>
                            {item.sizeName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="mse-5">
                  <span>Kích cỡ</span>
                  <br />
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder="Màu sắc"
                    optionFilterProp="children"
                    className={styles.product__createDetailsSelect}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                  >
                    {colors &&
                      colors.map((item) => {
                        return (
                          <Select.Option key={item.id}>
                            <div className={styles.optionColor}>
                              <span
                                style={{ backgroundColor: item.colorCode }}
                              ></span>
                              {item.colorName}
                            </div>
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProductUpdate;
