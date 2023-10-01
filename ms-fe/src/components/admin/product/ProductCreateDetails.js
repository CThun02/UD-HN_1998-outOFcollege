import {
  EyeOutlined,
  PlusOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Button, Col, message, Row, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { displayFrame } from "../animations/animation";
import "../animations/animation.css";
import ProductCreate from "./ProductCreate";
import styles from "./ProductCreateDetails.module.css";
import ProductDetailsTable from "./ProductDetailsTable";

var buttonsCreate = [];
var collarsCreate = [];
var materialsCreate = [];
var sleevesCreate = [];
var shirtTailsCreate = [];
var colorsCreate = [];
var sizesCreate = [];
const ProductCreateDetails = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const currentHref = window.location.href;
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [buttons, setButtons] = useState(null);
  const [collars, setCollars] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [sleeves, setSleeves] = useState(null);
  const [shirtTails, setshirtTails] = useState(null);
  const [productList, setProductList] = useState(null);
  const [render, setRender] = useState(1);
  const [url, setUrl] = useState(
    "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg"
  );
  const [product, setProduct] = useState({
    productId: null,
    productName: "",
    brand: {},
    pattern: {},
    form: {},
    category: {},
    description: "",
  });
  const [productDetail, setProductDetail] = useState({
    productId: null,
    buttonId: " ",
    materialId: " ",
    collarId: " ",
    sleeveId: " ",
    sizeId: " ",
    colorId: " ",
    shirtTailId: " ",
    price: 200000,
    quantity: 1,
  });
  const productDetailUpdate = getProductUpdate();

  //fucntion
  function getProductUpdate() {
    if (currentHref.includes("update-details")) {
      const productDetailParam = searchParams.get("productDetail");
      return JSON.parse(productDetailParam);
    }
  }

  function handleSetProductDetail(field, value) {
    setProductDetail((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }

  useEffect(() => {
    axios
      .get(api + "product")
      .then((res) => {
        setProductList(res.data);
      })
      .catch((err) => {
        console.log(err);
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
      .get(api + "button")
      .then((response) => {
        setButtons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "material")
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "collar")
      .then((response) => {
        setCollars(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "shirt-tail")
      .then((response) => {
        setshirtTails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(api + "sleeve")
      .then((response) => {
        setSleeves(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    if (currentHref.includes("create-details")) {
    } else {
      if (productDetailUpdate !== null && productDetailUpdate !== undefined) {
        axios
          .get(
            api +
              "product/getColorsByIdComPdAndIdPro?productId=" +
              productDetailUpdate.product.id +
              "&buttonId=" +
              productDetailUpdate.button.id +
              "&materialId=" +
              productDetailUpdate.material.id +
              "&shirtTailId=" +
              productDetailUpdate.shirtTail.id +
              "&sleeveId=" +
              productDetailUpdate.sleeve.id +
              "&collarId=" +
              productDetailUpdate.collar.id
          )
          .then((res) => {
            axios
              .get(
                api +
                  "product/getSizesByIdComPdAndIdPro?productId=" +
                  productDetailUpdate.product.id +
                  "&buttonId=" +
                  productDetailUpdate.button.id +
                  "&materialId=" +
                  productDetailUpdate.material.id +
                  "&shirtTailId=" +
                  productDetailUpdate.shirtTail.id +
                  "&sleeveId=" +
                  productDetailUpdate.sleeve.id +
                  "&collarId=" +
                  productDetailUpdate.collar.id +
                  "&colorId=" +
                  res.data[0].id
              )
              .then((response) => {})
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
        setProduct(productDetailUpdate.product);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);
  return (
    <>
      <div className={styles.product}>
        <ProductCreate render={setRender} />
        {contextHolder}
        <Row>
          <Col span={10} className={styles.product__Form}>
            <h2>
              <EyeOutlined /> Sản phẩm
            </h2>
            <br />
            <Row>
              <Col span={8}>
                <div className={styles.product__FormImg}>
                  <img src={url} alt="Avatar" />
                </div>
              </Col>
              <Col span={16}>
                <div className="m-5">
                  <h6>Tên sản phẩm</h6>
                  <Row>
                    <Col span={22}>
                      <div
                        style={{
                          marginRight: "20px",
                        }}
                      >
                        <Select
                          showSearch
                          style={{
                            width: "100%",
                          }}
                          placeholder="Search to Select"
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            (option?.label ?? "").includes(input)
                          }
                          filterSort={(optionA, optionB) =>
                            (optionA?.label ?? "")
                              .toLowerCase()
                              .localeCompare(
                                (optionB?.label ?? "").toLowerCase()
                              )
                          }
                          onChange={(value) => {
                            setProduct(productList[value]);
                            handleSetProductDetail("productId", value);
                          }}
                        >
                          {productList &&
                            productList.map((item, index) => {
                              return (
                                <Select.Option
                                  key={item.id}
                                  label={item.productName}
                                  value={index}
                                >
                                  {item.productName}
                                </Select.Option>
                              );
                            })}
                        </Select>
                      </div>
                    </Col>
                    <Col span={2}>
                      <Button
                        onClick={() => {
                          displayFrame("productCreate", "productCreateFrame");
                        }}
                        className={styles.product_ButtonCreate}
                      >
                        <PlusOutlined />
                      </Button>
                    </Col>
                  </Row>
                </div>
                <Row>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Thương hiệu</h6>
                      <p>{product.brand.brandName || "Brand Name"}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Loại sản phẩm</h6>
                      <p>{product.category.categoryName || "Category Name"}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Họa tiết</h6>
                      <p>{product.pattern.patternName || "Pattern name"}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Dáng áo</h6>
                      <p>{product.form.formName || "Form Name"}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <div className="m-5">
                  <h6>Mô tả</h6>
                  <p>{product.description || "Description"}</p>
                  <hr />
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
                <div className="m-5">
                  <h6>Loại cúc áo</h6>
                  <Select
                    showSearch
                    placeholder="Button"
                    mode="multiple"
                    className={styles.product__createDetailsSelect}
                    onChange={(event, record) => {
                      buttonsCreate = record;
                      setRender(event);
                    }}
                    status={productDetail.buttonId === "" ? "error" : ""}
                  >
                    {buttons &&
                      buttons.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            label={item.buttonName}
                            key={item.id}
                          >
                            {item.buttonName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Chất liệu</h6>
                  <Select
                    showSearch
                    placeholder="Material"
                    mode="multiple"
                    className={styles.product__createDetailsSelect}
                    onChange={(event, record) => {
                      materialsCreate = record;
                      setRender(event);
                    }}
                    status={productDetail.materialId === "" ? "error" : ""}
                  >
                    {materials &&
                      materials.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            label={item.materialName}
                            key={item.id}
                          >
                            {item.materialName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Cổ áo</h6>
                  <Select
                    showSearch
                    placeholder="Collar"
                    mode="multiple"
                    className={styles.product__createDetailsSelect}
                    onChange={(event, record) => {
                      collarsCreate = record;
                      setRender(event);
                    }}
                    status={productDetail.collarId === "" ? "error" : ""}
                  >
                    {collars &&
                      collars.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            key={item.id}
                            label={item.collarTypeName}
                          >
                            {item.collarTypeName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Tay áo</h6>
                  <Select
                    showSearch
                    placeholder="Sleeve"
                    mode="multiple"
                    className={styles.product__createDetailsSelect}
                    onChange={(event, record) => {
                      sleevesCreate = record;
                      setRender(event);
                    }}
                    status={productDetail.sleeveId === "" ? "error" : ""}
                  >
                    {sleeves &&
                      sleeves.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            label={item.sleeveName}
                            key={item.id}
                          >
                            {item.sleeveName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Đuôi áo</h6>
                  <Select
                    showSearch
                    placeholder="Shirt tail"
                    mode="multiple"
                    className={styles.product__createDetailsSelect}
                    onChange={(event, record) => {
                      shirtTailsCreate = record;
                      setRender(event);
                    }}
                    status={productDetail.shirtTailId === "" ? "error" : ""}
                  >
                    {shirtTails &&
                      shirtTails.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            label={item.shirtTailTypeName}
                            key={item.id}
                          >
                            {item.shirtTailTypeName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Kích cỡ</h6>
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder="size"
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
                    onChange={(event, record) => {
                      sizesCreate = record;
                      setRender(event);
                    }}
                    status={productDetail.sizeId === "" ? "error" : ""}
                  >
                    {sizes &&
                      sizes.map((item) => {
                        return (
                          <Select.Option
                            key={item.id}
                            label={item.sizeName}
                            value={item.id}
                          >
                            {item.sizeName}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Màu sắc</h6>
                  <Select
                    showSearch
                    mode="multiple"
                    placeholder="Color"
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
                    onChange={(event, record) => {
                      colorsCreate = record;
                      setRender(event);
                    }}
                    status={productDetail.colorId === "" ? "error" : ""}
                  >
                    {colors &&
                      colors.map((item) => {
                        return (
                          <Select.Option
                            key={item.id}
                            label={item.colorName}
                            value={item.colorCode}
                          >
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
      {product.productId !== null &&
      buttonsCreate.length > 0 &&
      materialsCreate.length > 0 &&
      collarsCreate.length > 0 &&
      shirtTailsCreate.length > 0 &&
      sleevesCreate.length > 0 &&
      colorsCreate.length > 0 &&
      sizesCreate.length > 0 ? (
        <ProductDetailsTable
          product={product}
          buttonsCreate={buttonsCreate}
          materialsCreate={materialsCreate}
          collarsCreate={collarsCreate}
          shirtTailsCreate={shirtTailsCreate}
          sleevesCreate={sleevesCreate}
          colorsCreate={colorsCreate}
          sizesCreate={sizesCreate}
        />
      ) : null}
    </>
  );
};

export default ProductCreateDetails;
