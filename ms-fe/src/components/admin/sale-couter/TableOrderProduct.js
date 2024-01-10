import { DeleteOutlined } from "@ant-design/icons";
import styles from "./TableOrderProduct.module.css";
import {
  Badge,
  Button,
  Carousel,
  Col,
  InputNumber,
  Row,
  Space,
  Table,
} from "antd";
import { useEffect } from "react";

function TableOrderProduct({
  productDetails,
  handleDeleteProduct,
  updateQuantity,
  cartId,
  bool,
}) {
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "stt",
      width: 70,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      key: "product",
      datatIndex: "product",
      title: "Sản phẩm",
      width: "50%",
      render: (text, record, index) => {
        return (
          <Row style={{ width: "100%" }}>
            <Col span={6} style={{ height: "100%" }}>
              <div
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                {record?.productDetail?.promotion?.length > 0 &&
                record?.productDetail?.promotion[0]?.promotionValue ? (
                  <Badge.Ribbon
                    text={`Giảm ${
                      record?.productDetail?.promotion[0]?.promotionValue
                        ? record?.productDetail?.promotion[0]
                            ?.promotionMethod === "%"
                          ? record?.productDetail?.promotion[0]
                              ?.promotionValue +
                            " " +
                            record?.productDetail?.promotion[0]?.promotionMethod
                          : record?.productDetail?.promotion[0]?.promotionValue?.toLocaleString(
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
                      {record.productDetail.productImageResponse &&
                        record.productDetail.productImageResponse.map(
                          (item) => {
                            return (
                              <img
                                key={item.id}
                                style={{ width: "100%", marginTop: "10px" }}
                                alt=""
                                src={item.path}
                              />
                            );
                          }
                        )}
                    </Carousel>
                  </Badge.Ribbon>
                ) : (
                  <Carousel style={{ maxWidth: "300px" }} autoplay>
                    {record?.productDetail?.productImageResponse &&
                      record?.productDetail?.productImageResponse.map(
                        (item) => {
                          return (
                            <img
                              key={item.id}
                              style={{ width: "100%", marginTop: "10px" }}
                              alt=""
                              src={item.path}
                            />
                          );
                        }
                      )}
                  </Carousel>
                )}
              </div>
            </Col>
            <Col span={18} style={{ height: "100%" }}>
              <div
                className="m-5"
                style={{
                  textAlign: "start",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontWeight: "500" }}>
                  {record?.productDetail?.product?.productName +
                    "-" +
                    record?.productDetail?.brand?.brandName +
                    "-" +
                    record?.productDetail?.category?.categoryName +
                    "-" +
                    record?.productDetail?.button?.buttonName +
                    "-" +
                    record?.productDetail?.material?.materialName +
                    "-" +
                    record?.productDetail?.collar?.collarTypeName +
                    "-" +
                    record?.productDetail?.sleeve?.sleeveName +
                    "-" +
                    record?.productDetail?.shirtTail?.shirtTailTypeName +
                    "-" +
                    record?.productDetail?.pattern?.patternName +
                    "-" +
                    record?.productDetail?.form?.formName}
                </span>
                <br />
                <div className={styles.optionColor}>
                  <b>Màu sắc: </b>
                  <span
                    style={{
                      backgroundColor: record?.productDetail?.color?.colorCode,
                      marginLeft: "8px",
                    }}
                  ></span>
                  {record?.productDetail?.color?.colorName}
                </div>
                <br />
                <b>Kích cỡ: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {record?.productDetail?.size?.sizeName}
                </span>
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record, index) => {
        return (
          <InputNumber
            min={1}
            max={record?.quantity >= record?.productDetail?.quantity}
            value={record?.quantity}
            onBlur={(event) =>
              updateQuantity(record, index, event.target.value)
            }
          />
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",

      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "center" }}>
            {record?.productDetail?.promotion.length > 0 ? (
              <>
                <span style={{ color: "#ccc" }}>
                  <strike>
                    {record?.productDetail?.price?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strike>
                </span>
                <span> </span>
                <span>
                  {record?.priceReduce?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </>
            ) : (
              <span>
                {record?.productDetail?.price?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            )}
            <br />
            <span>
              {record?.productDetail?.promotionValue
                ? record?.productDetail?.promotionMethod === "%"
                  ? (
                      (record?.productDetail?.price *
                        (100 - Number(record?.productDetail?.promotionValue))) /
                      100
                    )?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })
                  : (
                      record?.productDetail?.price -
                      Number(record?.productDetail?.promotionValue)
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
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record, index) => {
        return (
          <span>
            {(record?.priceReduce * record?.quantity)?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            icon={<DeleteOutlined />}
            danger
            href="#1"
            key={record.key}
            onClick={() => handleDeleteProduct(record, index)}
          ></Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    console.log("productDetails: ", productDetails);
  }, [productDetails, cartId, bool]);

  return (
    <div>
      <Table
        dataSource={
          productDetails &&
          productDetails?.map((record, index) => ({
            ...record,
            key: record.id,
          }))
        }
        columns={columns}
        pagination={false}
      />
    </div>
  );
}

export default TableOrderProduct;
