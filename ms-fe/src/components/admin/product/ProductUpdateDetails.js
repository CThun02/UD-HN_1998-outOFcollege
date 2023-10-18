import {
  CheckCircleTwoTone,
  CloseCircleOutlined,
  EditOutlined,
  PlusOutlined,
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
import ProductUpdatesAddCom from "./ProductUpdatesAddCom";

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
  function updateStatusDetailsProduct(
    buttonId,
    materialId,
    shirtTailId,
    sleeveId,
    collarId,
    colorId,
    sizeId,
    status
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
          "&status=" +
          status
      )
      .then((res) => {
        setRender(Math.random());
        setTimeout(() => {
          notification.open({
            message: "Notification",
            description: `${
              status === "ACTIVE" ? "Khôi phục" : "Xóa"
            } các chi tiết sản phẩm thành công`,
            icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
          });
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const checkStatus = (comName, value) => {
    var result = false;
    productDetails.map((item) => {
      if (item[`${comName}`].id === value.id) {
        if (item.status === "ACTIVE") {
          result = true;
        }
      }
    });
    return result;
  };
  function updateDetailsProduct(comAdd, value) {
    message.loading("loading!", 2);
    switch (true) {
      case comAdd.includes("button"):
        let button = buttonsUpdate.filter(
          (buttonUpdate) => !value.includes(buttonUpdate.id)
        );
        let checkButton = checkStatus(comAdd, button[0]);
        if (checkButton) {
          updateStatusDetailsProduct(
            button[0].id,
            "",
            "",
            "",
            "",
            "",
            "",
            "DELETED"
          );
        } else {
          updateStatusDetailsProduct(
            button[0].id,
            "",
            "",
            "",
            "",
            "",
            "",
            "ACTIVE"
          );
        }
        break;
      case comAdd.includes("collar"):
        let collar = collarsUpdate.filter(
          (collarUpdate) => !value.includes(collarUpdate.id)
        );
        let checkCollar = checkStatus(comAdd, collar[0]);
        if (checkCollar) {
          updateStatusDetailsProduct(
            "",
            "",
            "",
            "",
            collar[0].id,
            "",
            "",
            "DELETED"
          );
        } else {
          updateStatusDetailsProduct(
            "",
            "",
            "",
            "",
            collar[0].id,
            "",
            "",
            "ACTIVE"
          );
        }
        break;
      case comAdd.includes("material"):
        let material = materialsUpdate.filter(
          (materialUpdate) => !value.includes(materialUpdate.id)
        );
        let checkMaterial = checkStatus(comAdd, material[0]);
        if (checkMaterial) {
          updateStatusDetailsProduct(
            "",
            material[0].id,
            "",
            "",
            "",
            "",
            "",
            "DELETED"
          );
        } else {
          updateStatusDetailsProduct(
            "",
            material[0].id,
            "",
            "",
            "",
            "",
            "",
            "ACTIVE"
          );
        }
        break;
      case comAdd.includes("sleeve"):
        let sleeve = sleevesUpdate.filter(
          (sleeveUpdate) => !value.includes(sleeveUpdate.id)
        );
        let checkSleeve = checkStatus(comAdd, sleeve[0]);
        if (checkSleeve) {
          updateStatusDetailsProduct(
            "",
            "",
            "",
            sleeve[0].id,
            "",
            "",
            "",
            "DELETED"
          );
        } else {
          updateStatusDetailsProduct(
            "",
            "",
            "",
            sleeve[0].id,
            "",
            "",
            "",
            "ACTIVE"
          );
        }
        break;
      case comAdd.includes("shirtTail"):
        let shirtTail = shirtTailsUpdate.filter(
          (shirtTailUpdate) => !value.includes(shirtTailUpdate.id)
        );
        let checkShirtTail = checkStatus(comAdd, shirtTail[0]);
        if (checkShirtTail) {
          updateStatusDetailsProduct(
            "",
            "",
            shirtTail[0].id,
            "",
            "",
            "",
            "",
            "DELETED"
          );
        } else {
          updateStatusDetailsProduct(
            "",
            "",
            shirtTail[0].id,
            "",
            "",
            "",
            "",
            "ACTIVE"
          );
        }
        break;
      case comAdd.includes("size"):
        let size = sizesUpdate.filter(
          (sizeUpdate) => !value.includes(sizeUpdate.id)
        );
        let checkSize = checkStatus(comAdd, size[0]);
        if (checkSize) {
          updateStatusDetailsProduct(
            "",
            "",
            "",
            "",
            "",
            "",
            size[0].id,
            "DELETED"
          );
        } else {
          updateStatusDetailsProduct(
            "",
            "",
            "",
            "",
            "",
            "",
            size[0].id,
            "ACTIVE"
          );
        }
        break;
      case comAdd.includes("color"):
        let color = colorsUpdate.filter(
          (colorUpdate) => !value.includes(colorUpdate.id)
        );
        let checkColor = checkStatus(comAdd, color[0]);
        if (checkColor) {
          updateStatusDetailsProduct(
            "",
            "",
            "",
            "",
            "",
            color[0].id,
            "",
            "DELETED"
          );
        } else {
          updateStatusDetailsProduct(
            "",
            "",
            "",
            "",
            "",
            color[0].id,
            "",
            "ACTIVE"
          );
        }
        break;
      default:
        console.log("error");
        break;
    }

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
      {contextHolder}
      <div className={styles.productUpdateDetails}>
        <ProductCreate
          render={setRender}
          productId={productId}
          isUpdate={true}
        />
        {sizes.length > 0 ? (
          <ProductUpdatesAddCom
            render={setRender}
            productId={productId}
            buttons={buttons.filter(
              (button) =>
                !buttonsUpdate.find(
                  (buttonUpdate) => button.id === buttonUpdate.id
                )
            )}
            materials={materials.filter(
              (material) =>
                !materialsUpdate.find(
                  (materialUpdate) => material.id === materialUpdate.id
                )
            )}
            sleeves={sleeves.filter(
              (sleeve) =>
                !sleevesUpdate.find(
                  (sleeveUpdate) => sleeve.id === sleeveUpdate.id
                )
            )}
            collars={collars.filter(
              (collar) =>
                !collarsUpdate.find(
                  (collarUpdate) => collar.id === collarUpdate.id
                )
            )}
            shirtTails={shirtTails.filter(
              (shirtTail) =>
                !shirtTailsUpdate.find(
                  (shirtTailUpdate) => shirtTail.id === shirtTailUpdate.id
                )
            )}
            sizes={sizes.filter(
              (size) =>
                !sizesUpdate.find((sizeUpdate) => size.id === sizeUpdate.id)
            )}
            colors={colors.filter(
              (color) =>
                !colorsUpdate.find((colorUpdate) => color.id === colorUpdate.id)
            )}
            isUpdate={true}
          />
        ) : null}
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
                    value={
                      buttonsUpdate && buttonsUpdate.map((item) => item.id)
                    }
                    onChange={(event) => updateDetailsProduct("button", event)}
                  >
                    {buttonsUpdate &&
                      buttonsUpdate.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            label={item.buttonName}
                            key={item.id}
                          >
                            {checkStatus("button", item) ? (
                              item.buttonName
                            ) : (
                              <del>
                                <span style={{ color: "#ccc" }}>
                                  {item.buttonName}
                                </span>
                              </del>
                            )}
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
                    value={
                      materialsUpdate && materialsUpdate.map((item) => item.id)
                    }
                  >
                    {materialsUpdate &&
                      materialsUpdate.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            label={item.materialName}
                            key={item.id}
                          >
                            {checkStatus("material", item) ? (
                              item.materialName
                            ) : (
                              <del>
                                <span style={{ color: "#ccc" }}>
                                  {item.materialName}
                                </span>
                              </del>
                            )}
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
                    value={
                      collarsUpdate && collarsUpdate.map((item) => item.id)
                    }
                  >
                    {collarsUpdate &&
                      collarsUpdate.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            label={item.collarTypeName}
                            key={item.id}
                          >
                            {checkStatus("collar", item) ? (
                              item.collarTypeName
                            ) : (
                              <del>
                                <span style={{ color: "#ccc" }}>
                                  {item.collarTypeName}
                                </span>
                              </del>
                            )}
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
                    value={
                      sleevesUpdate && sleevesUpdate.map((item) => item.id)
                    }
                    onChange={(event) => updateDetailsProduct("sleeve", event)}
                  >
                    {sleevesUpdate &&
                      sleevesUpdate.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            label={item.sleeveName}
                            key={item.id}
                          >
                            {checkStatus("sleeve", item) ? (
                              item.sleeveName
                            ) : (
                              <del>
                                <span style={{ color: "#ccc" }}>
                                  {item.sleeveName}
                                </span>
                              </del>
                            )}
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
                    value={
                      shirtTailsUpdate &&
                      shirtTailsUpdate.map((item) => item.id)
                    }
                  >
                    {shirtTailsUpdate &&
                      shirtTailsUpdate.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            label={item.shirtTailTypeName}
                            key={item.id}
                          >
                            {checkStatus("shirtTail", item) ? (
                              item.shirtTailTypeName
                            ) : (
                              <del>
                                <span style={{ color: "#ccc" }}>
                                  {item.shirtTailTypeName}
                                </span>
                              </del>
                            )}
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
                    value={sizesUpdate && sizesUpdate.map((color) => color.id)}
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
                    {sizesUpdate &&
                      sizesUpdate.map((item) => {
                        return (
                          <Select.Option
                            value={item.id}
                            label={item.sizeName}
                            key={item.id}
                          >
                            {checkStatus("size", item) ? (
                              item.sizeName
                            ) : (
                              <del>
                                <span style={{ color: "#ccc" }}>
                                  {item.sizeName}
                                </span>
                              </del>
                            )}
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
                    value={
                      colorsUpdate && colorsUpdate.map((color) => color.id)
                    }
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
                    {colorsUpdate &&
                      colorsUpdate.map((item) => {
                        colorUpdatesDisplay.push({
                          key: item.id,
                          label: item.colorName,
                          value: item.colorCode,
                        });
                        return (
                          <Select.Option
                            value={item.id}
                            label={item.colorName}
                            key={item.id}
                          >
                            {checkStatus("color", item) ? (
                              <div className={styles.optionColor}>
                                <span
                                  style={{ backgroundColor: item.colorCode }}
                                ></span>
                                {item.colorName}
                              </div>
                            ) : (
                              <div className={styles.optionColor}>
                                <span
                                  style={{
                                    backgroundColor: item.colorCode,
                                    opacity: 0.3,
                                  }}
                                ></span>
                                <del>
                                  <span style={{ color: "#ccc" }}>
                                    {item.colorName}
                                  </span>
                                </del>
                              </div>
                            )}
                          </Select.Option>
                        );
                      })}
                  </Select>
                </div>
              </Col>
              <Col span={16}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "end",
                    height: "100%",
                  }}
                >
                  <Button
                    onClick={() => {
                      displayFrame(
                        "productUpdatesAddCom",
                        "productUpdatesAddComFrame"
                      );
                    }}
                    className={styles.product_ButtonUpdate}
                    style={{ margin: "6px" }}
                  >
                    <PlusOutlined />
                  </Button>
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
