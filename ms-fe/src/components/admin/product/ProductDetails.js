import {
  Badge,
  Button,
  Carousel,
  Col,
  notification,
  Row,
  Select,
  Slider,
  Table,
} from "antd";
import Input from "antd/es/input/Input";
import Modal from "antd/es/modal/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ProductDetails.module.css";

const ProductDetails = (props) => {
  const api = "http://localhost:8080/api/admin/";
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [button, setButton] = useState("");
  const [collar, setCollar] = useState("");
  const [material, setMaterial] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [shirtTail, setshirtTail] = useState("");
  const [form, setForm] = useState("");
  const [pattern, setPattern] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState(["", ""]);
  const [sizes, setSizes] = useState(null);
  const [brands, setBrands] = useState(null);
  const [categories, setCategories] = useState(null);
  const [colors, setColors] = useState(null);
  const [buttons, setButtons] = useState(null);
  const [collars, setCollars] = useState(null);
  const [materials, setMaterials] = useState(null);
  const [sleeves, setSleeves] = useState(null);
  const [shirtTails, setshirtTails] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [renderThis, setRenderThis] = useState(null);
  const [patterns, setPatterns] = useState(null);
  const [forms, setForms] = useState(null);
  const [maxPrice, setMaxPrice] = useState(600000);
  const [modalSetQuantity, setModalSetQuantity] = useState([]);
  const [quantity, setQuantiy] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const columns = [
    {
      key: "stt",
      dataIndex: "index",
      title: "#",
      width: 70,
      render: (text, record, index) => {
        return (
          <span id={record.id}>
            {(currentPage - 1) * pageSize + (index + 1)}
          </span>
        );
      },
    },
    {
      key: "productCode",
      dataIndex: "productCode",
      title: "Mã",
      width: 150,
      render: (text, record, index) => {
        return record.product.productCode;
      },
    },
    {
      key: "productName",
      dataIndex: "productName",
      title: "Sản phẩm",
      width: "50%",
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={6}>
              <div
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                {record.promotion.length !== 0 ? (
                  <Badge.Ribbon
                    text={`Giảm ${
                      record.promotion[0].promotionValue
                        ? record.promotion[0].promotionMethod === "%"
                          ? record.promotion[0].promotionValue +
                            " " +
                            record.promotion[0].promotionMethod
                          : record.promotion[0].promotionValue.toLocaleString(
                              "vi-VN",
                              {
                                style: "currency",
                                currency: "VND",
                              }
                            )
                        : null
                    }`}
                    color="red"
                  >
                    <Carousel autoplay>
                      {record.productImageResponse &&
                        record.productImageResponse.map((item) => {
                          return (
                            <img
                              key={item.id}
                              style={{ width: "100%", marginTop: "10px" }}
                              alt=""
                              src={item.path}
                            />
                          );
                        })}
                    </Carousel>
                  </Badge.Ribbon>
                ) : (
                  <Carousel autoplay>
                    {record.productImageResponse &&
                      record.productImageResponse.map((item) => {
                        return (
                          <img
                            key={item.id}
                            style={{ width: "100%", marginTop: "10px" }}
                            alt=""
                            src={item.path}
                          />
                        );
                      })}
                  </Carousel>
                )}
              </div>
            </Col>
            <Col span={18}>
              <div
                className="m-5"
                style={{
                  textAlign: "start",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontWeight: "500" }}>
                  {record.product.productName +
                    "-" +
                    record.brand.brandName +
                    "-" +
                    record.category.categoryName +
                    "-" +
                    record.button.buttonName +
                    "-" +
                    record.material.materialName +
                    "-" +
                    record.collar.collarTypeName +
                    "-" +
                    record.sleeve.sleeveName +
                    "-" +
                    record.shirtTail.shirtTailTypeName +
                    "-" +
                    record.pattern.patternName +
                    "-" +
                    record.form.formName}
                </span>
                <br />
                <div className={styles.optionColor}>
                  <b>Màu sắc: </b>
                  <span
                    style={{
                      backgroundColor: record.color.colorCode,
                      marginLeft: "8px",
                    }}
                  ></span>
                  {record.color.colorName}
                </div>
                <b>Kích cỡ: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {record.size.sizeName}
                </span>
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      key: "quantity",
      dataIndex: "quantity",
      title: "Số lượng",
      width: 110,
      render: (text, record, index) => {
        return record.quantity;
      },
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Giá",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "center" }}>
            {record.promotion ? (
              <span style={{ color: "#ccc" }}>
                <strike>
                  {record.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strike>
              </span>
            ) : (
              <span>
                {record.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            )}
            <br />
            <span>
              {record.promotion.length !== 0
                ? record.promotion[0].promotionMethod === "%"
                  ? (
                      (record.price *
                        (100 - Number(record.promotion[0].promotionValue))) /
                      100
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : (
                      record.price - Number(record.promotion[0].promotionValue)
                    ).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                : null}
            </span>
          </div>
        );
      },
    },
    {
      key: "action",
      title: "Thao tác",
      dataIndex: "id",
      fixed: "right",
      width: 100,
      render: (text, record, index) => (
        <>
          <Modal
            title="Số lượng mua"
            centered
            open={modalSetQuantity[index]}
            onOk={() => {
              addProductDetail(record);
            }}
            onCancel={() => handleCancelModalQuantity(index)}
            footer={null}
          >
            <Input
              defaultValue={1}
              onChange={(event) => handleChangeQuantity(event.target.value)}
            />
            <div style={{ marginTop: "12px", textAlign: "center" }}>
              <Button
                type="primary"
                onClick={() => {
                  addProductDetail(record, index);
                }}
              >
                Xác nhận
              </Button>
            </div>
          </Modal>
          <Button
            type="primary"
            onClick={() => {
              handleShowModalModalQuantity(index);
            }}
          >
            Chọn
          </Button>
        </>
      ),
    },
  ];
  //functions

  function handleChangeQuantity(quantity) {
    setQuantiy(quantity);
  }

  const handleShowModalModalQuantity = (index) => {
    const visible = [...modalSetQuantity];
    visible[index] = true;
    setModalSetQuantity(visible);
  };

  const handleCancelModalQuantity = (index) => {
    const visible = [...modalSetQuantity];
    visible[index] = false;
    setModalSetQuantity(visible);
  };

  function addProductDetail(record, index) {
    var indexExist = -1;
    var productDetailCreate = {
      productDetail: {},
      quantity: quantity,
      priceReduce: 0,
    };
    for (let i = 0; i < props.productDetailsCreate.length; i++) {
      if (props.productDetailsCreate[i].productDetail.id === record.id) {
        indexExist = i;
        break;
      }
    }
    if (indexExist !== -1) {
      productDetailCreate.quantity =
        Number(quantity) +
        Number(props.productDetailsCreate[indexExist].quantity);
      props.productDetailsCreate?.splice(indexExist, 1);
    }
    if (
      productDetailCreate.quantity > record.quantity ||
      productDetailCreate.quantity > 100
    ) {
      notification.error({
        message: "Thông báo",
        description: `Số lượng sản phẩm ${
          productDetailCreate.quantity > 100
            ? "thêm tối đa 100"
            : "tồn không đủ"
        }`,
      });
    } else {
      productDetailCreate.productDetail = record;
      productDetailCreate.priceReduce = record.promotion[0].promotionValue
        ? record.promotion[0].promotionMethod === "%"
          ? (record.price *
              (100 - Number(record.promotion[0].promotionValue))) /
            100
          : record.price - Number(record.promotion[0].promotionValue)
        : record.price;
      props.productDetailsCreate?.push(productDetailCreate);
      notification.success({
        message: "Thông báo",
        description: "Thêm sản phẩm vào giỏ hàng thành công!",
      });
      handleCancelModalQuantity(index);
      props.action();
    }
  }

  function filter() {
    setLoading(true);
    axios
      .get(
        api +
          "bill/filterProductDetailSellByIdCom?productId=" +
          product +
          "&brandId=" +
          brand +
          "&categoryId=" +
          category +
          "&buttonId=" +
          button +
          "&materialId=" +
          material +
          "&shirtTailId=" +
          shirtTail +
          "&sleeveId=" +
          sleeve +
          "&collarId=" +
          collar +
          "&colorId=" +
          color +
          "&sizeId=" +
          size +
          "&patternId=" +
          pattern +
          "&formId=" +
          form +
          "&minPrice=" +
          price[0] +
          "&maxPrice=" +
          price[1]
      )
      .then((response) => {
        setProductDetails(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  useEffect(() => {
    filter();
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
    axios
      .get(api + "product/getproductfilterByCom")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.render,
    renderThis,
    maxPrice,
    product,
    brand,
    button,
    category,
    material,
    collar,
    sleeve,
    pattern,
    shirtTail,
    form,
    color,
    size,
  ]);

  return (
    <>
      <div className={styles.productDetails}>
        <Row className={styles.productDetails__filter}>
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Sản phẩm
              </span>
              <Select
                showSearch
                maxTagCount={"responsive"}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                bordered={false}
                onChange={(event) => {
                  setProduct(event);
                }}
                defaultValue={""}
                style={{ borderBottom: "1px solid black", width: "100%" }}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
                </Select.Option>
                {products &&
                  products.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.productName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Nút áo
              </span>
              <Select
                showSearch
                maxTagCount={"responsive"}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                bordered={false}
                onChange={(event) => {
                  setButton(event);
                }}
                defaultValue={""}
                style={{ borderBottom: "1px solid black", width: "100%" }}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
                </Select.Option>
                {buttons &&
                  buttons.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.buttonName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Thương hiệu
              </span>
              <Select
                showSearch
                onChange={(event) => setBrand(event)}
                placeholder="Brand"
                bordered={false}
                style={{ borderBottom: "1px solid black", width: "100%" }}
                defaultValue={""}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
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
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Loại sản phẩm
              </span>
              <Select
                showSearch
                bordered={false}
                onChange={(event) => setCategory(event)}
                placeholder="Category"
                style={{ borderBottom: "1px solid black", width: "100%" }}
                defaultValue={""}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
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
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Chất liệu
              </span>
              <Select
                showSearch
                maxTagCount={"responsive"}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                bordered={false}
                onChange={(event) => {
                  setMaterial(event);
                }}
                defaultValue={""}
                style={{ borderBottom: "1px solid black", width: "100%" }}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
                </Select.Option>
                {materials &&
                  materials.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.materialName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Cổ áo
              </span>
              <Select
                showSearch
                maxTagCount={"responsive"}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                bordered={false}
                onChange={(event) => {
                  setCollar(event);
                }}
                defaultValue={""}
                style={{ borderBottom: "1px solid black", width: "100%" }}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
                </Select.Option>
                {collars &&
                  collars.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.collarTypeName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Tay áo
              </span>
              <Select
                showSearch
                maxTagCount={"responsive"}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                bordered={false}
                onChange={(event) => {
                  setSleeve(event);
                }}
                defaultValue={""}
                style={{ borderBottom: "1px solid black", width: "100%" }}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
                </Select.Option>
                {sleeves &&
                  sleeves.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.sleeveName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Họa tiết
              </span>
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                bordered={false}
                onChange={(event) => {
                  setPattern(event);
                }}
                defaultValue={""}
                style={{ borderBottom: "1px solid black", width: "100%" }}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
                </Select.Option>
                {patterns &&
                  patterns.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.patternName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Đuôi áo
              </span>
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                bordered={false}
                onChange={(event) => {
                  setshirtTail(event);
                }}
                defaultValue={""}
                style={{ borderBottom: "1px solid black", width: "100%" }}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
                </Select.Option>
                {shirtTails &&
                  shirtTails.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.shirtTailTypeName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Dáng áo
              </span>
              <Select
                showSearch
                maxTagCount={"responsive"}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                bordered={false}
                onChange={(event) => {
                  setForm(event);
                }}
                defaultValue={""}
                style={{ borderBottom: "1px solid black", width: "100%" }}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
                </Select.Option>
                {forms &&
                  forms.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.formName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Màu sắc
              </span>
              <Select
                maxTagCount={"responsive"}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                bordered={false}
                onChange={(event) => {
                  setColor(event);
                }}
                defaultValue={""}
                style={{ borderBottom: "1px solid black", width: "100%" }}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
                </Select.Option>
                {colors &&
                  colors.map((item) => {
                    return (
                      <Select.Option value={item.id} key={item.id}>
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
          <Col span={4}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Kích cỡ
              </span>
              <Select
                showSearch
                maxTagCount={"responsive"}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                bordered={false}
                onChange={(event) => {
                  setSize(event);
                }}
                defaultValue={""}
                style={{ borderBottom: "1px solid black", width: "100%" }}
              >
                <Select.Option key={"ALL"} value={""}>
                  Tất cả
                </Select.Option>
                {sizes &&
                  sizes.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.sizeName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </div>
          </Col>
          <Col span={24}>
            <div style={{ margin: "0 8px 12px 8px" }}>
              <span
                style={{
                  fontWeight: "500",
                  display: "block",
                  textAlign: "center",
                }}
              >
                Khoảng giá
              </span>
              <Slider
                min={0}
                max={maxPrice}
                value={price}
                onChange={(event) => {
                  setPrice(event);
                }}
                onAfterChange={() => setRenderThis(Math.random())}
                range
              />
            </div>
          </Col>
        </Row>
        <div>
          <Table
            pagination={{
              showSizeChanger: true,
              pageSizeOptions: [5, 10, 15, 20],
              defaultPageSize: 5,
              showLessItems: true,
              style: { marginRight: "10px" },
              onChange: (currentPage, pageSize) => {
                setCurrentPage(currentPage);
                setPageSize(pageSize);
              },
            }}
            scroll={{ y: 360 }}
            columns={columns}
            dataSource={
              productDetails &&
              productDetails.map((record, index) => ({
                ...record,
                key: record.id,
              }))
            }
            loading={loading}
          />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
