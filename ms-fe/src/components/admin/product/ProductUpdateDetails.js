import { EditOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, Row, Select, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductUpdateDetails.module.css";
import { displayFrame } from "../animations/animation";
import "../animations/animation.css";
import ProductCreate from "./ProductCreate";
import ProductDetailsTable from "./ProductDetailsTable";

const ProductUpdateDetails = () => {
  const api = "http://localhost:8080/api/admin/";
  const { productId } = useParams();
  const [messageApi, contextHolder] = message.useMessage();
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [buttons, setButtons] = useState([]);
  const [collars, setCollars] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [sleeves, setSleeves] = useState([]);
  const [shirtTails, setshirtTails] = useState([]);
  const [sizesUpdate, setSizesUpdate] = useState([]);
  const [colorsUpdate, setColorsUpdate] = useState([]);
  const [buttonsUpdate, setButtonsUpdate] = useState([]);
  const [collarsUpdate, setCollarsUpdate] = useState([]);
  const [materialsUpdate, setMaterialsUpdate] = useState([]);
  const [sleevesUpdate, setSleevesUpdate] = useState([]);
  const [shirtTailsUpdate, setshirtTailsUpdate] = useState([]);
  const [render, setRender] = useState(1);
  var productDetailsDisplay = [];
  const [product, setProduct] = useState({
    productId: null,
    productName: "",
    brand: {},
    pattern: {},
    form: {},
    category: {},
    description: "",
    imgDefault: "",
  });
  const [productDetails, setProductDetails] = useState([]);
  var colorUpdatesDisplay = [];
  //functions
  useEffect(() => {
    axios
      .get(api + "product/getProductEdit?productId=" + productId)
      .then((response) => {
        setProduct(response.data);
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
    axios
      .get(
        api +
          "product/getProductDetailEachComByProductId?productId=" +
          productId +
          "&comsName=size"
      )
      .then((response) => {
        setSizesUpdate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        api +
          "product/getProductDetailEachComByProductId?productId=" +
          productId +
          "&comsName=color"
      )
      .then((response) => {
        setColorsUpdate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        api +
          "product/getProductDetailEachComByProductId?productId=" +
          productId +
          "&comsName=button"
      )
      .then((response) => {
        setButtonsUpdate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        api +
          "product/getProductDetailEachComByProductId?productId=" +
          productId +
          "&comsName=material"
      )
      .then((response) => {
        setMaterialsUpdate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        api +
          "product/getProductDetailEachComByProductId?productId=" +
          productId +
          "&comsName=collar"
      )
      .then((response) => {
        setCollarsUpdate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        api +
          "product/getProductDetailEachComByProductId?productId=" +
          productId +
          "&comsName=shirtTail"
      )
      .then((response) => {
        setshirtTailsUpdate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        api +
          "product/getProductDetailEachComByProductId?productId=" +
          productId +
          "&comsName=sleeve"
      )
      .then((response) => {
        setSleevesUpdate(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        api +
          "product/getProductDetailByProductId?productId=" +
          productId +
          "&status="
      )
      .then((response) => {
        setProductDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [render]);

  return (
    <>
      <div className={styles.productUpdateDetails}>
        <ProductCreate
          render={setRender}
          productId={productId}
          isUpdate={true}
        />
        {contextHolder}
        <Row>
          <Col span={10} className={styles.product__Form}>
            <h2>
              <EditOutlined /> Chỉnh sửa sản phẩm - {product.productCode}
            </h2>
            <br />
            <Row>
              <Col span={8}>
                <div className={styles.productUpdateDetails__imgProduct}>
                  <img
                    src={
                      product.imgDefault ||
                      "https://lh3.googleusercontent.com/EbXw8rOdYxOGdXEFjgNP8lh-YAuUxwhOAe2jhrz3sgqvPeMac6a6tHvT35V6YMbyNvkZL4R_a2hcYBrtfUhLvhf-N2X3OB9cvH4uMw=w1064-v0"
                    }
                    height={240}
                    alt="productimage"
                  />
                </div>
              </Col>
              <Col span={16}>
                <div className="m-5">
                  <h6>Tên sản phẩm</h6>
                  <Row>
                    <Col span={22}>
                      <p>{product.productName}</p>
                    </Col>
                    <Col span={2} style={{ marginBottom: "4px" }}>
                      <Button
                        onClick={() => {
                          displayFrame("productCreate", "productCreateFrame");
                        }}
                        className={styles.product_ButtonUpdate}
                      >
                        <EditOutlined />
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
                    style={{ width: "100%" }}
                    placeholder="Button"
                    mode="multiple"
                    value={buttonsUpdate}
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
                    style={{ width: "100%" }}
                    placeholder="Material"
                    mode="multiple"
                    onChange={(event, record) => {}}
                    value={materialsUpdate}
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
                    style={{ width: "100%" }}
                    placeholder="Collar"
                    mode="multiple"
                    value={collarsUpdate}
                    onChange={(event, record) => {}}
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
                    style={{ width: "100%" }}
                    placeholder="Sleeve"
                    mode="multiple"
                    value={sleevesUpdate}
                    onChange={(event, record) => {}}
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
                    style={{ width: "100%" }}
                    placeholder="Shirt tail"
                    mode="multiple"
                    onChange={(event, record) => {}}
                    value={shirtTailsUpdate}
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
                    style={{ width: "100%" }}
                    mode="multiple"
                    value={sizesUpdate}
                    placeholder="size"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    onChange={(event, record) => {}}
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
                    style={{ width: "100%" }}
                    mode="multiple"
                    placeholder="Color"
                    optionFilterProp="children"
                    value={colorsUpdate}
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    onChange={(event, record) => {}}
                  >
                    {colors &&
                      colors.map((item) => {
                        colorsUpdate.forEach((color) => {
                          if (color === item.id) {
                            colorUpdatesDisplay.push({
                              key: item.id,
                              label: item.colorName,
                              value: item.colorCode,
                            });
                          }
                        });
                        return (
                          <Select.Option
                            key={item.colorCode}
                            label={item.colorName}
                            value={item.id}
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

      {productId !== null &&
      colorUpdatesDisplay.length > 0 &&
      productDetails.length > 0 ? (
        <ProductDetailsTable
          product={product}
          colorsCreate={colorUpdatesDisplay}
          productDetailsUpdate={productDetails}
          productDetails={productDetailsDisplay}
          isUpdate={true}
          render={setRender}
        />
      ) : null}
    </>
  );
};

export default ProductUpdateDetails;
