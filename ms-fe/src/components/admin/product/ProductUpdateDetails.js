import {
  CheckCircleTwoTone,
  EditOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Select, message, notification } from "antd";
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
  const [render, setRender] = useState(null);
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
  function deleteDetailsProduct(
    buttonId,
    materialId,
    shirtTailId,
    sleeveId,
    collarId,
    colorId,
    sizeId
  ) {
    axios
      .put(
        api +
          "product/updateProductDetailsByCom?productId=" +
          productId +
          "&buttonId=" +
          buttonId +
          "&materialId=" +
          materialId +
          "&shirtTailId=" +
          shirtTailId +
          "&sleeveId=" +
          sleeveId +
          "&collarId=" +
          collarId +
          "&colorId=" +
          colorId +
          "&sizeId=" +
          sizeId +
          "&status=DELETED"
      )
      .then((res) => {
        setRender(Math.random());
        setTimeout(() => {
          notification.open({
            message: "Notification",
            description: "Xóa các chi tiết sản phẩm thành công",
            icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
          });
        }, 2000);
      });
  }
  function updateDetailsProduct(comAdd, value) {
    message.loading("loading!", 2);
    var buttonsCreate = buttonsUpdate,
      collarsCreate = collarsUpdate,
      materialsCreate = materialsUpdate,
      sleevesCreate = sleevesUpdate,
      shirtTailsCreate = shirtTailsUpdate,
      sizesCreate = sizesUpdate,
      colorsCreate = colorsUpdate;
    switch (true) {
      case comAdd.includes("button"):
        buttonsCreate = [];
        if (value.length < buttonsUpdate.length) {
          let buttonId = buttonsUpdate.filter(
            (button) => !value.includes(button)
          );
          deleteDetailsProduct(buttonId, "", "", "", "", "", "");
          return;
        } else if (value.length === buttonsUpdate.length) {
          buttonsCreate = buttonsUpdate;
        } else {
          for (let button of buttonsUpdate) {
            for (let buttonCreate of value) {
              if (button !== buttonCreate) {
                buttonsCreate.push(buttonCreate);
              }
            }
          }
        }
        break;
      case comAdd.includes("collar"):
        collarsCreate = [];
        if (value.length < collarsUpdate.length) {
        } else if (value.length === collarsUpdate.length) {
          collarsCreate = collarsUpdate;
        } else {
          for (let collar of collarsUpdate) {
            for (let collarCreate of value) {
              if (collar !== collarCreate) {
                collarsCreate.push(collarCreate);
              }
            }
          }
        }
        break;
      case comAdd.includes("material"):
        materialsCreate = [];
        if (value.length < materialsUpdate.length) {
        } else if (value.length === materialsUpdate.length) {
          materialsCreate = materialsUpdate;
        } else {
          for (let material of materialsUpdate) {
            for (let materialCreate of value) {
              if (material !== materialCreate) {
                materialsCreate.push(materialCreate);
              }
            }
          }
        }
        break;
      case comAdd.includes("sleeve"):
        sleevesCreate = [];
        if (value.length < sleevesUpdate.length) {
        } else if (value.length === sleevesUpdate.length) {
          sleevesCreate = sleevesUpdate;
        } else {
          for (let sleeve of sleevesUpdate) {
            for (let sleeveCreate of value) {
              if (sleeve !== sleeveCreate) {
                sleevesCreate.push(sleeveCreate);
              }
            }
          }
        }
        break;
      case comAdd.includes("shirtTail"):
        shirtTailsCreate = [];
        if (value.length < shirtTailsUpdate.length) {
        } else if (value.length === shirtTailsUpdate.length) {
          shirtTailsCreate = shirtTailsUpdate;
        } else {
          for (let shirtTail of shirtTailsUpdate) {
            for (let shirtTailCreate of value) {
              if (shirtTail !== shirtTailCreate) {
                shirtTailsCreate.push(shirtTailCreate);
              }
            }
          }
        }
        break;
      case comAdd.includes("size"):
        sizesCreate = [];
        if (value.length < sizesUpdate.length) {
        } else if (value.length === sizesUpdate.length) {
          sizesCreate = sizesUpdate;
        } else {
          for (let size of sizesUpdate) {
            for (let sizeCreate of value) {
              if (size !== sizeCreate) {
                sizesCreate.push(sizeCreate);
              }
            }
          }
        }
        break;
      case comAdd.includes("color"):
        colorsCreate = [];
        if (value.length < colorsUpdate.length) {
        } else if (value.length === colorsUpdate.length) {
          colorsCreate = colorsUpdate;
        } else {
          for (let color of colorsUpdate) {
            for (let colorCreate of value) {
              if (color !== colorCreate) {
                colorsCreate.push(colorCreate);
              }
            }
          }
        }
        break;
      default:
        console.log("error");
        break;
    }
    for (let button of buttonsCreate) {
      for (let collar of collarsCreate) {
        for (let material of materialsCreate) {
          for (let sleeve of sleevesCreate) {
            for (let shirtTail of shirtTailsCreate) {
              for (let size of sizesCreate) {
                for (let color of colorsCreate) {
                  let productDetail = {
                    productId: product.id,
                    buttonId: button,
                    materialId: material,
                    collarId: collar,
                    sleeveId: sleeve,
                    sizeId: size,
                    colorId: color,
                    shirtTailId: shirtTail,
                    status: "ACTIVE",
                    price: 200000,
                    quantity: 1,
                  };
                  axios
                    .post(api + "product/createDetail", productDetail)
                    .then((res) => {})
                    .catch((err) => {
                      message.error("Đã xảy ra lỗi vui lòng thử lại sau!", 2);
                      console.log(err);
                      return;
                    });
                }
              }
            }
          }
        }
      }
    }
    setTimeout(() => {
      notification.open({
        message: "Notification",
        description: "Thêm mới các chi tiết sản phẩm thành công",
        icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
      });
    }, 2000);
    setRender(Math.random());
  }
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
        console.log(response.data);
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
  }, [productId, render]);

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
          <Col span={14} className={styles.product__updateDetails}>
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
                    onChange={(event) => updateDetailsProduct("button", event)}
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
                    onChange={(event) =>
                      updateDetailsProduct("material", event)
                    }
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
                    onChange={(event) => updateDetailsProduct("collar", event)}
                    value={collarsUpdate}
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
                    onChange={(event) => updateDetailsProduct("sleeve", event)}
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
                    onChange={(event) =>
                      updateDetailsProduct("shirtTail", event)
                    }
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
                    onChange={(event) => updateDetailsProduct("size", event)}
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
                    onChange={(event) => updateDetailsProduct("color", event)}
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
