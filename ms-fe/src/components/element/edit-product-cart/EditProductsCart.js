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
import styles from "../../admin/product/ProductDetails.module.css";
import { getAuthToken, getToken } from "../../../service/Token";

const EditProductsCart = ({open, onCancel, render, billCode, setLoadingButtonTimeline, renderTimeline}) => {
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
  const [error, setError] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);

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
                      record?.promotion[0].promotionValue
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
                    <Carousel style={{ maxWidth: "300px" }} autoplay>
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
                  <Carousel style={{ maxWidth: "300px" }} autoplay>
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
        return record.quantity <= 0 ? (
          <span style={{ color: "#ccc" }}>Hết hàng</span>
        ) : (
          record.quantity
        );
      },
    },
    {
      key: "price",
      dataIndex: "price",
      title: "Giá",
      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "center" }}>
            {record.promotion.length !== 0 ? (
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
      render: (text, record, index) => (
        <>
          <Modal
            title="Số lượng mua"
            centered
            open={modalSetQuantity[index]}
            onCancel={() => handleCancelModalQuantity(index)}
            footer={null}
          >
            <Row>
              <Col span={8}>
                <div
                  style={{
                    marginTop: "10px",
                    marginRight: "10px",
                  }}
                >
                  {record.promotion.length !== 0 ? (
                    <Badge.Ribbon
                      text={`Giảm ${
                        record?.promotion[0].promotionValue
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
                      <Carousel style={{ maxWidth: "300px" }} autoplay>
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
                    <Carousel style={{ maxWidth: "300px" }} autoplay>
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
              <Col span={16}>
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
                <br/>
                <b>Số lượng: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {record.quantity}
                </span>
                <br/>
                <b>Đơn giá: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
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
                    : record.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                </span>
                <br/>
                <b>thành tiền: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {((record.promotion.length !== 0
                    ? record.promotion[0].promotionMethod === "%"
                      ?(record.price *
                            (100 - Number(record.promotion[0].promotionValue))) /
                          100
                          :
                          record.price - Number(record.promotion[0].promotionValue)
                        : record.price)*quantity).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                </span>
              </div>
              </Col>
            </Row>
            <Input
              type={"number"}
              value={quantity}
              onChange={(event) => handleChangeQuantity(event.target.value, record)}
              onBlur={(event)=>{
                if(error!==""){
                  setQuantiy(1);
                }else{
                  setQuantiy(event.target.value)
                }
                setError("")
              }
              }
            />
            <span style={{color:"red"}}>{error}</span>
            <div style={{ marginTop: "12px", textAlign: "center" }}>
              <Button
                type="primary"
                size="large"
                disabled={error !== ""}
                onClick={() => { addToBill(record, index)}}
                loading={loadingButton}
              >
                Xác nhận
              </Button>
            </div>
          </Modal>
          {record.quantity <= 0 ? (
            <span style={{ color: "#ccc" }}>Hết hàng</span>
          ) : record.status === "INACTIVE" ? (
            <span style={{ color: "#ccc" }}>Ngưng kinh doanh</span>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                handleShowModalQuantity(index);
              }}
              loading={loadingButton}
            >
              Chọn
            </Button>
          )}
        </>
      ),
    },
  ];
  //functions

  function handleChangeQuantity(quantity, record) {
    const price = record?.promotion?.length !== 0
      ? record.promotion[0].promotionMethod === "%"
        ? (record.price *
              (100 - Number(record.promotion[0].promotionValue))) /
            100
        : 
        record.price - Number(record.promotion[0].promotionValue)
      : record.price
    if(quantity<=100){
      setQuantiy(quantity)
    }
    if(quantity > record.quantity){
      setError("Số lượng tồn không đủ")
    }else if(quantity<=0){
      setError("Số lượng mua lớn hơn phải lớn hơn 0")
    }else if(quantity * price > 10000000){
      setError("Vui lòng liên hệ cửa hàng để mua nhiều sản phẩm  có giá trị lớn hơn 10.000.000đ")
    }else{
      setError("")
    }
  }

  const handleShowModalQuantity = (index) => {
    const visible = [...modalSetQuantity];
    visible[index] = true;
    setModalSetQuantity(visible);
  };

  const handleCancelModalQuantity = (index) => {
    const visible = [...modalSetQuantity];
    visible[index] = false;
    setModalSetQuantity(visible);
  };

  const addToBill = (productDetail, index)=>{
    setLoadingButton(true);
    setLoadingButtonTimeline(true)
    const price = productDetail.promotion.length !== 0
      ? productDetail.promotion[0].promotionMethod === "%"
        ? (productDetail.price *
              (100 - Number(productDetail.promotion[0].promotionValue))) /
            100
        : 
        productDetail.price - Number(productDetail.promotion[0].promotionValue)
      : productDetail.price
    axios.post("http://localhost:8080/api/client/addToBill/"+billCode, {
      id: productDetail?.id,
      quantity:quantity,
      price: price,
    }).then(res=>{
      notification.success({message:"Thông báo", description:"Thêm mới sản phẩm  thành công!"})
      render(Math.random)
      handleCancelModalQuantity(index);
      setLoadingButton(false)
      setLoadingButtonTimeline(false);
      setRenderThis(Math.random)
    }).catch((error)=>{
        notification.error({
          message:"Thông báo",
          description:error?.response?.data?.message,
        })
        setLoadingButton(false)
        setLoadingButtonTimeline(false);
    })
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
          price[1],
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setProductDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        
        const status = error?.response?.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        
      });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  useEffect(() => {
    filter();
    axios
      .get(api + "brand", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((res) => {
        setBrands(res.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "category", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "product/getproductfilterByCom", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "size", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setSizes(response.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "color", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "button", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setButtons(response.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "material", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setMaterials(response.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "collar", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setCollars(response.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "pattern", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setPatterns(response.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "form", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setForms(response.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "shirt-tail", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setshirtTails(response.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    axios
      .get(api + "sleeve", {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setSleeves(response.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    renderTimeline,
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
    <Modal
        title="Tìm kiếm sản phẩm"
        style={{ top: "10px" }}
        centered
        open={open}
        onCancel={
          onCancel
        }
        footer={null}
        width={"75%"}
      >
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
    </Modal>
  );
};

export default EditProductsCart;
