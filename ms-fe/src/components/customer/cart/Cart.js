import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import {
  Badge,
  Button,
  Carousel,
  Col,
  InputNumber,
  Row,
  Table,
  notification,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../../service/Token";
import axios from "axios";

const baseUrl = "http://localhost:8080/api/client";

const Cart = (props) => {
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);
  const [render, setRender] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carts, setCarts] = useState([]);
  const token = getAuthToken();

  const cartAPI = "http://localhost:8080/api/client/cart";

  const columns = [
    {
      key: "product",
      title: "Thông tin sản phẩm",
      render: (_, record, index) => {
        return (
          <div>
            <Row>
              <Col md={6} sm={10} xs={24}>
                <div style={{}} className="m-5">
                  <img
                    style={{ width: "100%", height: "100%" }}
                    src={record?.data[0]?.productImageResponse[0]?.path}
                    alt="Áo Thun Teelab Local Brand Unisex Love Is In The Air TS199"
                  ></img>
                </div>
              </Col>
              <Col md={18} sm={14} xs={24}>
                <div
                  style={{
                    textAlign: "left",
                    height: "100%",
                  }}
                  className="m-5"
                >
                  <span style={{ fontWeight: "500" }}>
                    {record?.data[0]?.product.productName +
                      "-" +
                      record?.data[0]?.button.buttonName +
                      "-" +
                      record?.data[0]?.brand.brandName +
                      "-" +
                      record?.data[0]?.category.categoryName +
                      "-" +
                      record?.data[0]?.material.materialName +
                      "-" +
                      record?.data[0]?.collar.collarTypeName +
                      "-" +
                      record?.data[0]?.sleeve.sleeveName +
                      "-" +
                      record?.data[0]?.shirtTail.shirtTailTypeName +
                      "-" +
                      record?.data[0]?.pattern.patternName +
                      "-" +
                      record?.data[0]?.form.formName}
                  </span>
                  <br />
                  <div className={styles.optionColor}>
                    <b>Màu sắc: </b>
                    <span
                      style={{
                        backgroundColor: record?.data[0]?.color.colorCode,
                        marginLeft: "8px",
                      }}
                    ></span>
                    {record?.data[0]?.color.colorName}
                  </div>
                  <br />
                  <b>Kích cỡ: </b>
                  <span
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    {record?.data[0]?.size.sizeName}
                  </span>
                  <div className={styles.componentsResponsive}>
                    <b>Đơn giá: </b>
                    <span
                      style={{
                        marginLeft: "8px",
                      }}
                    >
                      {(record?.data[0]?.price).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <br />
                    <b>Số lượng: </b>
                    <InputNumber
                      min={1}
                      value={record?.quantity}
                      max={record?.data?.quantity}
                      onChange={(e) => updateQuantity(e, index)}
                    />
                    <br />
                    <b>Thành tiền: </b>
                    <span
                      style={{
                        marginLeft: "8px",
                      }}
                    >
                      {record.data[0].promotion.length > 0 ? (
                        <span style={{ color: "#ccc" }}>
                          <strike>
                            {(
                              record?.data[0]?.price * record?.quantity
                            )?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </strike>
                        </span>
                      ) : (
                        <span>
                          {(
                            record?.data[0]?.price * record?.quantity
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      )}{" "}
                      <span>
                        {record.data[0]?.promotion?.length !== 0
                          ? record?.data[0]?.promotion[0]?.promotionMethod ===
                            "%"
                            ? Number(
                                ((record.data[0].price *
                                  (100 -
                                    Number(
                                      record?.data[0]?.promotion[0]
                                        ?.promotionValue
                                    ))) /
                                  100) *
                                  record.quantity
                              )?.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })
                            : Number(
                                (record?.data[0]?.price -
                                  Number(
                                    record?.data[0]?.promotion[0]
                                      ?.promotionValue
                                  )) *
                                  record?.quantity
                              )?.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })
                          : null}
                      </span>
                    </span>
                    <br />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        );
      },
    },
    {
      key: "price",
      title: "Đơn giá",
      with: "10%",
      responsive: ["xl"],
      render: (_, record) => {
        return (
          <span>
            {(record.data[0]?.price).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        );
      },
    },
    {
      key: "quantity",
      title: "Số lượng",
      width: "10%",
      responsive: ["xl"],
      render: (_, record, index) => {
        return (
          <InputNumber
            min={1}
            value={record?.quantity}
            max={record?.data?.quantity}
            onChange={(e) => updateQuantity(e, index)}
          />
        );
      },
    },
    {
      key: "price_total",
      title: "Thành tiền",
      width: "15%",
      responsive: ["xl"],
      render: (_, record) => {
        return (
          <div style={{ textAlign: "center" }}>
            {record.data[0].promotion.length > 0 ? (
              <span style={{ color: "#ccc" }}>
                <strike>
                  {(record?.data[0]?.price * record?.quantity)?.toLocaleString(
                    "vi-VN",
                    {
                      style: "currency",
                      currency: "VND",
                    }
                  )}
                </strike>
              </span>
            ) : (
              <span>
                {(record?.data[0]?.price * record?.quantity).toLocaleString(
                  "vi-VN",
                  {
                    style: "currency",
                    currency: "VND",
                  }
                )}
              </span>
            )}
            <br />
            <span>
              {record.data[0]?.promotion?.length !== 0
                ? record?.data[0]?.promotion[0]?.promotionMethod === "%"
                  ? Number(
                      ((record.data[0].price *
                        (100 -
                          Number(
                            record?.data[0]?.promotion[0]?.promotionValue
                          ))) /
                        100) *
                        record.quantity
                    )?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : Number(
                      (record?.data[0]?.price -
                        Number(record?.data[0]?.promotion[0]?.promotionValue)) *
                        record?.quantity
                    )?.toLocaleString("vi-VN", {
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
      width: "10%",
      render: (_, record, index) => {
        return (
          <div>
            <CloseOutlined
              style={{ cursor: "pointer", color: "red" }}
              onClick={(e) => deleteProductDetail(e, index)}
            />
          </div>
        );
      },
    },
  ];

  const handleUpdateQuantityApi = (id, value) => {
    axios
      .put(`${cartAPI}?cartDetailId=${id}&quantity=${value}`)
      .then((response) => {
        setRender(response.data);
        props.setRenderHeader(Math.random());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteApi = (id) => {
    console.log("token: ", token);
    console.log("id: ", id);
    getAuthToken().then((data) => {
      if (data?.username) {
        axios
          .get(
            "http://localhost:8080/api/client/deleteCart/" +
              data?.username +
              "/" +
              id
          )
          .then((response) => {
            notification.success({
              message: "Thông báo",
              description: "Xóa thành công thành công!",
              duration: 2,
            });
            setRender(Math.random());
            props.setRenderHeader(Math.random());
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  const columnsAPI = [
    {
      key: "product",
      title: "Thông tin sản phẩm",
      render: (_, record) => {
        return (
          <div>
            <Row>
              <Col md={6} sm={10} xs={24}>
                <div style={{}} className="m-5">
                  {record?.promotion[0] ? (
                    <Badge.Ribbon
                      text={`Giảm ${
                        record?.promotion[0]?.promotionValue
                          ? record?.promotion[0].promotionMethod === "%"
                            ? record.promotion[0].promotionValue +
                              " " +
                              record.promotion[0].promotionMethod
                            : record?.promotion[0].promotionValue.toLocaleString(
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
                          record?.productImageResponse.map((item) => {
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
                        record?.productImageResponse.map((item) => {
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
              <Col md={18} sm={14} xs={24}>
                <div
                  style={{
                    textAlign: "left",
                    height: "100%",
                  }}
                  className="m-5"
                >
                  <span style={{ fontWeight: "500" }}>
                    {record?.cartDetailResponse.productName +
                      "-" +
                      record?.cartDetailResponse.button.buttonName +
                      "-" +
                      record?.cartDetailResponse.brand.brandName +
                      "-" +
                      record?.cartDetailResponse.category.categoryName +
                      "-" +
                      record?.cartDetailResponse.material.materialName +
                      "-" +
                      record?.cartDetailResponse.collarType.collarTypeName +
                      "-" +
                      record?.cartDetailResponse.sleeveType.sleeveName +
                      "-" +
                      record?.cartDetailResponse.shirtTailType
                        .shirtTailTypeName +
                      "-" +
                      record?.cartDetailResponse.pattern.patternName +
                      "-" +
                      record?.cartDetailResponse.form.formName}
                  </span>
                  <br />
                  <div className={styles.optionColor}>
                    <b>Màu sắc: </b>
                    <span
                      style={{
                        backgroundColor:
                          record?.cartDetailResponse?.color.colorCode,
                        marginLeft: "8px",
                      }}
                    ></span>
                    {record?.cartDetailResponse.colorName}
                  </div>
                  <br />
                  <b>Kích cỡ: </b>
                  <span
                    style={{
                      marginLeft: "8px",
                    }}
                  >
                    {record?.cartDetailResponse?.size.sizeName}
                  </span>
                  <div className={styles.componentsResponsive}>
                    <b>Đơn giá: </b>
                    <span
                      style={{
                        marginLeft: "8px",
                      }}
                    >
                      {(record?.cartDetailResponse.priceProductDetail).toLocaleString(
                        "vi-VN",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </span>
                    <br />
                    <b>Số lượng: </b>
                    <InputNumber
                      min={1}
                      value={record?.cartDetailResponse?.quantity}
                      max={record?.cartDetailResponse?.quantityProductDetail}
                      onChange={(e) =>
                        handleUpdateQuantityApi(
                          record?.cartDetailResponse?.cartDetailId,
                          e
                        )
                      }
                    />
                    <br />
                    <b>Thành tiền: </b>
                    <span
                      style={{
                        marginLeft: "8px",
                      }}
                    >
                      {record.promotion.length !== 0 ? (
                        <span style={{ color: "#ccc" }}>
                          <strike>
                            {(record?.cartDetailResponse?.priceProductDetail *
                            record?.cartDetailResponse?.quantity
                              ? record?.cartDetailResponse?.priceProductDetail *
                                record?.cartDetailResponse?.quantity
                              : 0
                            )?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </strike>
                        </span>
                      ) : (
                        <span>
                          {Number(
                            record?.cartDetailResponse?.priceProductDetail *
                              record?.cartDetailResponse?.quantity >
                              0
                              ? record?.cartDetailResponse?.priceProductDetail *
                                  record?.cartDetailResponse?.quantity
                              : 0
                          )?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      )}{" "}
                      <span>
                        {record.promotion.length !== 0
                          ? record?.promotion[0]?.promotionMethod === "%"
                            ? (((record.cartDetailResponse.priceProductDetail *
                                (100 -
                                  Number(
                                    record?.promotion[0].promotionValue
                                  ))) /
                                100) *
                                record?.cartDetailResponse?.quantity >
                              0
                                ? ((record.cartDetailResponse
                                    .priceProductDetail *
                                    (100 -
                                      Number(
                                        record?.promotion[0].promotionValue
                                      ))) /
                                    100) *
                                  record?.cartDetailResponse?.quantity
                                : 0
                              )?.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })
                            : Number(
                                (record?.cartDetailResponse
                                  ?.priceProductDetail -
                                  Number(
                                    record?.promotion[0]?.promotionValue
                                  )) *
                                  record?.cartDetailResponse?.quantity >
                                  0
                                  ? (record?.cartDetailResponse
                                      ?.priceProductDetail -
                                      Number(
                                        record?.promotion[0]?.promotionValue
                                      )) *
                                      record?.cartDetailResponse?.quantity
                                  : 0
                              )?.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })
                          : null}
                      </span>
                    </span>
                    <br />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        );
      },
    },
    {
      key: "price",
      title: "Đơn giá",
      with: "15%",
      responsive: ["xl"],
      render: (_, record) => {
        return (
          <div>
            {(record?.cartDetailResponse.priceProductDetail).toLocaleString(
              "vi-VN",
              {
                style: "currency",
                currency: "VND",
              }
            )}
          </div>
        );
      },
    },
    {
      key: "quantity",
      title: "Số lượng",
      responsive: ["xl"],
      render: (_, record, index) => {
        return (
          <InputNumber
            min={1}
            value={record?.cartDetailResponse?.quantity}
            max={record?.cartDetailResponse?.quantityProductDetail}
            onChange={(e) =>
              handleUpdateQuantityApi(
                record?.cartDetailResponse?.cartDetailId,
                e
              )
            }
          />
        );
      },
    },
    {
      key: "price_total",
      title: "Thành tiền",
      width: "15%",
      responsive: ["xl"],
      render: (_, record) => {
        return (
          <div style={{ textAlign: "center" }}>
            {record.promotion.length !== 0 ? (
              <span style={{ color: "#ccc" }}>
                <strike>
                  {Number(
                    record?.cartDetailResponse?.priceProductDetail *
                      record?.cartDetailResponse?.quantity
                      ? record?.cartDetailResponse?.priceProductDetail *
                          record?.cartDetailResponse?.quantity
                      : 0
                  )?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strike>
              </span>
            ) : (
              <span>
                {Number(
                  record?.cartDetailResponse?.priceProductDetail *
                    record?.cartDetailResponse?.quantity >
                    0
                    ? record?.cartDetailResponse?.priceProductDetail *
                        record?.cartDetailResponse?.quantity
                    : 0
                )?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            )}
            <br />
            <span>
              {record.promotion.length !== 0
                ? record?.promotion[0]?.promotionMethod === "%"
                  ? (((record.cartDetailResponse.priceProductDetail *
                      (100 - Number(record?.promotion[0].promotionValue))) /
                      100) *
                      record?.cartDetailResponse?.quantity >
                    0
                      ? ((record.cartDetailResponse.priceProductDetail *
                          (100 - Number(record?.promotion[0].promotionValue))) /
                          100) *
                        record?.cartDetailResponse?.quantity
                      : 0
                    )?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : ((record?.cartDetailResponse?.priceProductDetail -
                      Number(record?.promotion[0]?.promotionValue)) *
                      record?.cartDetailResponse?.quantity >
                    0
                      ? (record?.cartDetailResponse?.priceProductDetail -
                          Number(record?.promotion[0]?.promotionValue)) *
                        record?.cartDetailResponse?.quantity
                      : 0
                    )?.toLocaleString("vi-VN", {
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
      width: "10%",
      render: (_, record, index) => {
        return (
          <div>
            <CloseOutlined
              style={{ cursor: "pointer", color: "red" }}
              onClick={(e) =>
                handleDeleteApi(record.cartDetailResponse.cartDetailId)
              }
            />
          </div>
        );
      },
    },
  ];

  const updateQuantity = (e, index) => {
    let cart = JSON.parse(localStorage.getItem("user"));
    let productDetail = cart.productDetails;
    if (e > productDetail[index]?.data[0]?.quantity) {
      notification.warning({
        message: "Thông báo",
        description: "Vượt quá số lượng tồn",
        duration: 1,
      });
      return true;
    }

    productDetail[index].quantity = e;
    cart.productDetails = productDetail;
    localStorage.setItem("user", JSON.stringify(cart));

    setRender(Math.random());
    props.setRenderHeader(Math.random());
  };

  const deleteProductDetail = (e, index) => {
    e.preventDefault();
    let cart = JSON.parse(localStorage.getItem("user"));
    let productDetails = cart.productDetails;
    if (index >= 0 && index < productDetails?.length) {
      productDetails.splice(index, 1);
      cart.productDetails = productDetails;
      localStorage.setItem("user", JSON.stringify(cart));
      setRender(Math.random());
    }
    props.setRenderHeader(Math.random());
  };

  const getAllCart = () => {
    let productDetail = JSON.parse(localStorage.getItem("user"));
    setProductDetails(productDetail?.productDetails);
    setLoading(false);
    setRender(1);
  };

  const onSelectChange = async (selectedKeys) => {
    try {
      const data = await token;
      let totalPrice = 0;
      if (data) {
        for (let i = 0; i < carts.length; i++) {
          if (
            selectedKeys.includes(carts[i]?.cartDetailResponse?.productDetailId)
          ) {
            let priceReduced = carts[i]?.promotion[0]
              ? (carts[i]?.promotion[0]?.promotionMethod === "vnd"
                  ? carts[i]?.cartDetailResponse?.priceProductDetail -
                    carts[i]?.promotion[0]?.promotionValue
                  : ((100 - carts[i]?.promotion[0]?.promotionValue) / 100) *
                    carts[i]?.cartDetailResponse?.priceProductDetail) *
                carts[i].cartDetailResponse?.quantity
              : carts[i]?.cartDetailResponse?.priceProductDetail *
                carts[i].cartDetailResponse?.quantity;
            totalPrice += priceReduced;
          }
        }
      } else {
        for (let i = 0; i < productDetails.length; i++) {
          const row = productDetails[i];
          if (selectedKeys.includes(row?.data[0]?.id)) {
            console.log();
            let priceReduced = row.data[0].promotion[0]
              ? (row.data[0].promotion[0]?.promotionMethod === "vnd"
                  ? row.data[0].price - row.data[0].promotion[0]?.promotionValue
                  : ((100 - row.data[0].promotion[0]?.promotionValue) / 100) *
                    row.data[0].price) * row.quantity
              : row.data[0].price * row.quantity;
            totalPrice += priceReduced;
          }
        }
      }
      setTotalPrice(totalPrice > 0 ? totalPrice : 0);
      setSelectedRowKeys(selectedKeys);
    } catch (error) {
      console.error("lỗi click sản phẩm thanh toán:", error);
    }
  };

  const addSelectedToData = (e) => {
    console.log("addToCheckout: " + e);

    e.preventDefault();
    let newData = [];
    if (carts.length === 0) {
      selectedRowKeys.forEach((key) => {
        let selectedRow = productDetails.find(
          (row) => row?.data[0]?.id === key
        );
        newData.push(selectedRow);
      });
    } else {
      selectedRowKeys.forEach((key) => {
        let selectedRow = carts.find(
          (row) => row?.cartDetailResponse.productDetailId === key
        );
        newData.push(selectedRow);
      });
    }

    if (newData.length === 0) {
      notification.error({
        message: "Thông báo",
        description: "Bạn chưa chọn sản phẩm",
        duration: 2,
      });
      return;
    } else {
      if (e?.data) {
        newData.map((e) => {
          axios
            .get(baseUrl + "/isCheckQuantity/" + e?.data[0]?.id)
            .catch((err) => {
              notification.error({
                message: "Thông báo",
                description:
                  "Sản phẩm đã bán hết hoặc không tồn tại vui lòng thử lại sau",
                duration: 2,
              });
              return;
            });
        });
      }
    }

    localStorage.setItem("checkout", JSON.stringify(newData));
    navigate("/ms-shop/checkout");
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const getCartAPI = async () => {
    setLoading(false);
    const data = await token;

    if (data) {
      await axios
        .get(`${cartAPI}`, {
          params: {
            username: data?.username,
          },
        })
        .then((response) => {
          setCarts(response.data);
          try {
            if (data) {
              const cart = {
                username: data?.username,
                lstCartDetail: [],
              };
              if (productDetails) {
                for (let i = 0; i < productDetails.length; i++) {
                  if (response.data.length === 0) {
                    cart.lstCartDetail.push({
                      productDetailId: productDetails[i].data[0].id,
                      quantity: productDetails[i]?.quantity,
                    });
                  } else {
                    for (let j = 0; j < response.data.length; j++) {
                      if (
                        Number(productDetails[i].data[0].id) !==
                        Number(
                          response.data[j].cartDetailResponse.productDetailId
                        )
                      ) {
                        cart.lstCartDetail.push({
                          productDetailId: productDetails[i].data[0].id,
                          quantity: productDetails[i]?.quantity,
                        });
                      }
                    }
                  }
                }
                // localStorage.removeItem("user");
              }

              axios.post(`${cartAPI} `, cart);
            }

            localStorage.removeItem("checkout");
          } catch (error) {
            console.log(error);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (token) {
      getCartAPI();
    } else {
      getAllCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 style={{ padding: "10px 5%" }}>Giỏ hàng của bạn</h2>
        <div className={styles.centerTable}>
          <Table
            className={styles.cartUser}
            rowSelection={rowSelection}
            columns={carts && carts.length > 0 ? columnsAPI : columns}
            dataSource={
              carts && carts.length > 0
                ? carts.map((record, index) => ({
                    ...record,
                    key: record.cartDetailResponse.productDetailId,
                  }))
                : productDetails &&
                  productDetails.map((record, index) => ({
                    ...record,
                    key: record?.data[0]?.id,
                  }))
            }
            loading={loading}
            pagination={false}
          />
        </div>
        <Row style={{ marginTop: "20px" }}>
          <Col xs={10} sm={16}></Col>
          <Col xs={14} sm={8} style={{ position: "relative" }}>
            <div style={{ marginRight: "5%" }}>
              <span className={styles.left}>Tổng tiền:</span>
              <span className={styles.right}>
                {totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </span>
            </div>
          </Col>
          <Col xs={10} sm={18}></Col>
          <Col
            xs={14}
            sm={6}
            style={{ height: "45px", marginTop: "10px", marginBottom: "10px" }}
          >
            <div style={{ marginRight: "5%" }}>
              <Button
                type="primary"
                className={styles.btn}
                onClick={(e) => addSelectedToData(e)}
              >
                Thanh toán
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Cart;
