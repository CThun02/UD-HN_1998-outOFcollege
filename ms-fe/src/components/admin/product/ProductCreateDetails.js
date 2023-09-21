import { EyeOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { Button, Col, message, Row, Select } from "antd";
import { isString } from "antd/es/button";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./ProductCreateDetails.module.css";
import ProductDetailsTable from "./ProductDetailsTable";
import { isFormInputEmpty } from "./ValidateForm";

const ProductCreateDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const currentHref = window.location.href;
  const api = "http://localhost:8080/api/admin/";
  const [messageApi, contextHolder] = message.useMessage();
  const { productId } = useParams();
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
    brand: {},
    pattern: {},
    form: {},
    category: {},
    description: "",
  });
  const [productDetail, setProductDetail] = useState({
    productId: productId,
    buttonId: " ",
    materialId: " ",
    collarId: " ",
    sleeveId: " ",
    sizeId: " ",
    colorId: " ",
    shirtTailId: " ",
    price: " ",
    quantity: 1,
    descriptionDetail: " ",
  });
  const [colorsCreate, setColorsCreate] = useState([]);
  const [sizesCreate, setSizesCreate] = useState([]);
  const productDetailUpdate = getProductUpdate();
  //fucntion
  function getProductUpdate() {
    if (currentHref.includes("update-details")) {
      const productDetailParam = searchParams.get("productDetail");
      return JSON.parse(productDetailParam);
    }
  }

  function createProductDetail() {
    for (let key in productDetail) {
      if (isString(productDetail[key])) {
        if (productDetail[key].trim() === "") {
          handleSetProductDetail(key, productDetail[key].trim());
        }
      }
    }
    let check = isFormInputEmpty(productDetail);
    if (!check) {
      messageApi.loading("Vui lòng chờ!", 5);
      for (let color of colorsCreate) {
        for (let size of sizesCreate) {
          let productDetailCreate = { ...productDetail };
          productDetailCreate.colorId = color;
          productDetailCreate.sizeId = size;
          axios
            .post(api + "product/createDetail", productDetailCreate)
            .then((response) => {})
            .catch((error) => {
              console.log(error);
            });
        }
      }
      setTimeout(() => {
        messageApi.success("Thêm mới thành công!", 2);
        linkToUpdate();
      }, 5000);
    } else {
      messageApi.error("Vui lòng chọn tất cả các trường!", 5);
    }
  }

  function linkToUpdate() {
    axios
      .get(
        api +
          "product/getProductDetailUpdate?productId=" +
          productId +
          "&buttonId=" +
          productDetail.buttonId +
          "&materialId=" +
          productDetail.materialId +
          "&shirtTailId=" +
          productDetail.shirtTailId +
          "&sleeveId=" +
          productDetail.sleeveId +
          "&collarId=" +
          productDetail.collarId
      )
      .then((res) => {
        setTimeout(() => {
          navigate(
            `/admin/product/update-details?productDetail=${encodeURIComponent(
              JSON.stringify(res.data)
            )}`
          );
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSetProductDetail(field, value) {
    setProductDetail((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  }

  useEffect(() => {
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
      axios
        .get(api + "product/getProductEdit?productId=" + productId)
        .then((response) => {
          setProduct(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setProduct(productDetailUpdate.product);
    }
  }, [productId]);
  return (
    <>
      <div className={styles.product}>
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
                  <p>{product.productName}</p>
                </div>
                <Row>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Thương hiệu</h6>
                      <p>{product.brand.brandName}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Loại sản phẩm</h6>
                      <p>{product.category.categoryName}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Họa tiết</h6>
                      <p>{product.pattern.patternName}</p>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="m-5">
                      <h6>Dáng áo</h6>
                      <p>{product.form.formName}</p>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <div className="m-5">
                  <h6>Mô tả</h6>
                  <p>{product.description}</p>
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
                  {currentHref.includes("create-details") ? (
                    <Select
                      showSearch
                      placeholder="Button"
                      className={styles.product__createDetailsSelect}
                      onChange={(event) => {
                        handleSetProductDetail("buttonId", event);
                      }}
                      status={productDetail.buttonId === "" ? "error" : ""}
                    >
                      {buttons &&
                        buttons.map((item) => {
                          return (
                            <Select.Option value={item.id} key={item.id}>
                              {item.buttonName}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  ) : (
                    productDetailUpdate.button.buttonName
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Chất liệu</h6>
                  {currentHref.includes("create-details") ? (
                    <Select
                      showSearch
                      placeholder="Material"
                      className={styles.product__createDetailsSelect}
                      onChange={(event) => {
                        handleSetProductDetail("materialId", event);
                      }}
                      status={productDetail.materialId === "" ? "error" : ""}
                    >
                      {materials &&
                        materials.map((item) => {
                          return (
                            <Select.Option value={item.id} key={item.id}>
                              {item.materialName}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  ) : (
                    productDetailUpdate.material.materialName
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Cổ áo</h6>
                  {currentHref.includes("create-details") ? (
                    <Select
                      showSearch
                      placeholder="Collar"
                      className={styles.product__createDetailsSelect}
                      onChange={(event) => {
                        handleSetProductDetail("collarId", event);
                      }}
                      status={productDetail.collarId === "" ? "error" : ""}
                    >
                      {collars &&
                        collars.map((item) => {
                          return (
                            <Select.Option value={item.id} key={item.id}>
                              {item.collarTypeName}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  ) : (
                    productDetailUpdate.collar.collarTypeName
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Tay áo</h6>
                  {currentHref.includes("create-details") ? (
                    <Select
                      showSearch
                      placeholder="Sleeve"
                      className={styles.product__createDetailsSelect}
                      onChange={(event) => {
                        handleSetProductDetail("sleeveId", event);
                      }}
                      status={productDetail.sleeveId === "" ? "error" : ""}
                    >
                      {sleeves &&
                        sleeves.map((item) => {
                          return (
                            <Select.Option value={item.id} key={item.id}>
                              {item.sleeveName}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  ) : (
                    productDetailUpdate.sleeve.sleeveName
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Đuôi áo</h6>
                  {currentHref.includes("create-details") ? (
                    <Select
                      showSearch
                      placeholder="Shirt tail"
                      className={styles.product__createDetailsSelect}
                      onChange={(event) => {
                        handleSetProductDetail("shirtTailId", event);
                      }}
                      status={productDetail.shirtTailId === "" ? "error" : ""}
                    >
                      {shirtTails &&
                        shirtTails.map((item) => {
                          return (
                            <Select.Option value={item.id} key={item.id}>
                              {item.shirtTailTypeName}
                            </Select.Option>
                          );
                        })}
                    </Select>
                  ) : (
                    productDetailUpdate.shirtTail.shirtTailTypeName
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Kích cỡ</h6>
                  {currentHref.includes("create-details") ? (
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
                      onChange={(event) => {
                        setSizesCreate(event);
                        handleSetProductDetail("sizeId", event);
                      }}
                      status={productDetail.sizeId === "" ? "error" : ""}
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
                  ) : (
                    productDetailUpdate.material.materialName
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Màu sắc</h6>
                  {currentHref.includes("create-details") ? (
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
                      onChange={(event) => {
                        setColorsCreate(event);
                        handleSetProductDetail("colorId", event);
                      }}
                      status={productDetail.colorId === "" ? "error" : ""}
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
                  ) : (
                    productDetailUpdate.material.materialName
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Giá mặc định</h6>
                  {currentHref.includes("create-details") ? (
                    <Input
                      size="small"
                      placeholder="Default price"
                      onChange={(event) => {
                        handleSetProductDetail("price", event.target.value);
                      }}
                      status={productDetail.price === "" ? "error" : ""}
                    ></Input>
                  ) : (
                    productDetailUpdate.price + " VND"
                  )}
                </div>
              </Col>
              <Col span={24}>
                <div className="m-5">
                  <h6>Mô tả</h6>
                  {currentHref.includes("create-details") ? (
                    <TextArea
                      placeholder="Description"
                      allowClear
                      onChange={(event) => {
                        handleSetProductDetail(
                          "descriptionDetail",
                          event.target.value
                        );
                      }}
                      status={
                        productDetail.descriptionDetail === "" ? "error" : ""
                      }
                    />
                  ) : (
                    productDetailUpdate.descriptionDetail
                  )}

                  <br />
                  <br />
                  {currentHref.includes("create-details") ? (
                    <div style={{ textAlign: "end" }}>
                      <Button onClick={createProductDetail}>Hoàn thành</Button>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      {currentHref.includes("update-details") ? (
        <ProductDetailsTable
          productDetail={productDetailUpdate}
          product={productDetailUpdate.product}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ProductCreateDetails;
