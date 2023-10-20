import {
  CheckCircleTwoTone,
  CloseOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Col,
  Row,
  Form,
  Input,
  Select,
  Button,
  message,
  Space,
  notification,
  Popconfirm,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ProductCreate.module.css";
import { closeFrame } from "../animations/animation";
import { isString } from "antd/es/button";
import { isFormInputEmpty } from "./ValidateForm";
import axios from "axios";

const ProductCreate = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const [brands, setBrands] = useState([]);
  const [brandCreate, setBrandCreate] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryCreate, setCategoryCreate] = useState("");
  const renderIndex = props.render;
  const isUpdate = props.isUpdate;
  const [render, setRender] = useState(null);
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

  function handleCustomOptionClick(event) {
    event.stopPropagation();
    event.target.focus();
  }

  function createBrand(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (brandCreate.trim() !== "") {
      axios
        .post(api + "brand?brandName=" + brandCreate, null)
        .then((res) => {
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Thương hiệu đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm thương hiệu thành công!", 1);
              setRender(res.data);
            }
            setBrandCreate(" ");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập thương hiệu!", 1);
      }, 1000);
    }
  }

  function createCategory(event) {
    event.stopPropagation();
    messageApi.loading("Đang tải", 1);
    if (categoryCreate.trim() !== "") {
      axios
        .post(api + "category?categoryName=" + categoryCreate, null)
        .then((res) => {
          setTimeout(() => {
            if (res.data === "") {
              messageApi.error("Loại sản phẩm đã tồn tại!", 1);
            } else {
              messageApi.success("Thêm loại sản phẩm thành công!", 1);
              setRender(res.data);
            }
            setCategoryCreate(" ");
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        messageApi.error("Vui lòng nhập loại sản phẩm!", 1);
      }, 1000);
    }
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
            handleSetProduct("brandId", " ");
            handleSetProduct("categoryId", " ");
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

  function updateProduct() {
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
        .put(api + "product/update", product)
        .then((res) => {
          messageApi.loading("Vui lòng chờ!", 2);
          setTimeout(() => {
            notification.open({
              message: "Notification",
              description: "Chỉnh sửa sản phẩm thành công",
              icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            });
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      messageApi.error("Vui lòng nhập đầy đủ các trường");
    }
  }

  useEffect(() => {
    if (isUpdate) {
      axios
        .get(api + "product/getProductEdit?productId=" + props.productId)
        .then((response) => {
          handleSetProduct("id", response.data.id);
          handleSetProduct("productCode", response.data.productCode);
          handleSetProduct("productName", response.data.productName);
          handleSetProduct("brandId", response.data.brand.id);
          handleSetProduct("categoryId", response.data.category.id);
          handleSetProduct("patternId", response.data.pattern.id);
          handleSetProduct("formId", response.data.form.id);
          handleSetProduct("imgDefault", response.data.imgDefault);
          handleSetProduct("description", response.data.description);
        });
    }
    axios
      .get(api + "brand")
      .then((res) => {
        setBrands(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          {!isUpdate ? (
            <>
              <PlusOutlined /> Thêm sản phẩm
            </>
          ) : (
            <>
              <EditOutlined /> Chỉnh sửa sản phẩm
            </>
          )}
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
            <Row>
              <Col span={12}>
                <div className={styles.product__createSelect}>
                  <span>Thương hiệu</span>
                  <br />
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    onChange={(event) => handleSetProduct("brandId", event)}
                    placeholder="Brand"
                    status={product.brandId === "" ? "error" : ""}
                    value={product.brandId}
                  >
                    <Select.Option value={"add"}>
                      <Space.Compact style={{ width: "100%" }}>
                        <Input
                          placeholder="Add new brand"
                          size="small"
                          onClick={(event) => {
                            handleCustomOptionClick(event);
                          }}
                          value={brandCreate}
                          onChange={(event) => {
                            setBrandCreate(event.target.value);
                          }}
                        />
                        <Button
                          onClick={(event) => {
                            createBrand(event);
                          }}
                        >
                          <PlusOutlined />
                        </Button>
                      </Space.Compact>
                    </Select.Option>
                    {brands &&
                      brands.map((item) => {
                        return (
                          <Select.Option value={item.id} key={item.id}>
                            {item.brandName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.product__createSelect}>
                  <span>Loại sản phẩm</span>
                  <br />
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    onChange={(event) => handleSetProduct("categoryId", event)}
                    placeholder="Category"
                    status={product.categoryId === "" ? "error" : ""}
                    value={product.categoryId}
                  >
                    <Select.Option value={"add"}>
                      <Space.Compact style={{ width: "100%" }}>
                        <Input
                          placeholder="Add new category"
                          size="small"
                          onClick={(event) => {
                            handleCustomOptionClick(event);
                          }}
                          value={categoryCreate}
                          onChange={(event) => {
                            setCategoryCreate(event.target.value);
                          }}
                        />
                        <Button
                          onClick={(event) => {
                            createCategory(event);
                          }}
                        >
                          <PlusOutlined />
                        </Button>
                      </Space.Compact>
                    </Select.Option>
                    {categories &&
                      categories.map((item) => {
                        return (
                          <Select.Option value={item.id} key={item.id}>
                            {item.categoryName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
            </Row>
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
                onConfirm={() =>
                  !isUpdate ? createProduct() : updateProduct()
                }
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
