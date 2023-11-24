import { ReloadOutlined } from "@ant-design/icons";
import { Button, Carousel, Col, Divider, notification, Row, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import SpanBorder from "../sale-couter/SpanBorder";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getToken } from "../../../service/Token";
import styles from "./BillReturn.module.css";
import { useNavigate, useParams } from "react-router-dom";

const BillReturn = () => {
  const { billCode } = useParams();
  const navigate = useNavigate();
  const [billInfo, setBillInfor] = useState(null);

  const columns = [
    {
      key: "#",
      datatIndex: "index",
      title: "#",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      key: "product",
      title: "Sản phẩm",
      width: "50%",
      render: (_, record) => {
        return (
          <Row>
            <Col span={4}>
              <div className="m-5">
                <Carousel style={{ maxWidth: 300 }} autoplay>
                  {record.productImageResponses &&
                    record.productImageResponses.map((item) => {
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
              </div>
            </Col>
            <Col span={20}>
              <div className="m-5" style={{ textAlign: "left" }}>
                <span style={{ fontWeight: 500 }}>
                  {record.productName +
                    "-" +
                    record.productButton +
                    "-" +
                    record.productBrandName +
                    "-" +
                    record.productCateGoryName +
                    "-" +
                    record.productMaterial +
                    "-" +
                    record.productCollar +
                    "-" +
                    record.productSleeve +
                    "-" +
                    record.productShirtTail +
                    "-" +
                    record.productPatternName +
                    "-" +
                    record.productFormName}
                </span>
                <br />
                <div className={styles.optionColor}>
                  <b>Màu sắc: </b>
                  <span
                    style={{
                      backgroundColor: record.productColor,
                      marginLeft: "8px",
                    }}
                  ></span>
                  {record.productColorName}
                </div>
                <b>Kích cỡ: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {record.productSize}
                </span>
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      key: "quantity",
      title: "Số lượng",
      render: (_, record) => {
        return record.quantity;
      },
    },
    {
      key: "total",
      title: "Tổng tiền",
      render: (_, record) => {
        return record.productPrice;
      },
    },
    {
      key: "action",
      title: "Thao tác",
      render: (_, record) => {
        return (
          <Button type="primary" size="large">
            <ReloadOutlined />
          </Button>
        );
      },
    },
  ];
  async function searchBill() {
    await axios
      .get(
        `http://localhost:8080/api/admin/bill/getBillByBillCode?billCode=` +
          billCode,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        var now = new Date();
        var sevenDay = 7 * 24 * 60 * 60 * 1000;
        if (response.data) {
          if (response.data.status !== "Complete") {
            notification.error({
              message: "Thông báo",
              description: "Hóa đơn chưa hoàn thành để thực hiện hoàn trả!",
            });
          } else if (
            now.getTime() - new Date(response.data.completionDate).getTime() >
            sevenDay
          ) {
            notification.error({
              message: "Thông báo",
              description: "Hóa đơn đã vượt quá 7 ngày để hoàn trả!",
            });
          } else {
            return;
          }
          navigate("/api/admin/return");
        } else {
          notification.error({
            message: "Thông báo",
            description: "Không tìm thấy hóa đơn",
          });
          navigate("/api/admin/return");
        }
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
  }

  useEffect(() => {
    if (billCode) {
      searchBill();
      axios
        .get(
          `http://localhost:8080/api/admin/bill/getBillReturnByBillCode?billCode=` +
            billCode,
          {
            headers: {
              Authorization: `Bearer ${getToken(true)}`,
            },
          }
        )
        .then((response) => {
          setBillInfor(response.data);
          console.log(response.data);
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
    }
  }, [billCode]);
  console.log(billInfo);
  return (
    <>
      <div className={styles.billReturn}>
        <h3 style={{ marginBottom: "25px" }}>Thông tin hóa đơn</h3>a
      </div>
      <div style={{ margin: "25px 0" }} className={styles.billReturn}>
        <h3>Thông tin khách hàng</h3>
        <Row style={{ margin: "25px 30px" }}>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Tên khách hàng</span>
              </Col>
              <Col span={16}>
                <span>
                  {billInfo?.fullName !== null
                    ? billInfo?.fullName
                    : billInfo?.customerName}
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Ngày giao hàng</span>
              </Col>
              <Col span={16}>
                <span>{billInfo?.shippingDate}</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Số điện thoại</span>
              </Col>
              <Col span={16}>
                <span>{billInfo?.phoneNumber}</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Ngày nhận hàng</span>
              </Col>
              <Col span={16}>
                <span>{billInfo?.conpletionDate}</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Địa chỉ</span>
              </Col>
              <Col span={16}>
                <span>{billInfo?.address}</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Trạng thái</span>
              </Col>
              <Col span={16}>
                <SpanBorder child={"Thành công"} color={"#1677ff"} />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Ghi chú</span>
              </Col>
              <Col span={16}>
                <span>{billInfo?.note}</span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Loại hóa đơn</span>
              </Col>
              <Col span={16}>
                <SpanBorder
                  child={
                    billInfo?.billType === "Online" ? "Trực tuyến" : "Tại quầy"
                  }
                  color={"#1677ff"}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: "25px" }} className={styles.billReturn}>
        <h3 style={{ marginBottom: "25px" }}>Thông tin đơn hàng</h3>
        <div style={{ textAlign: "end", marginBottom: "10px" }}>
          <Button size="large" type="primary">
            <ReloadOutlined />
            Trả hàng tất cả
          </Button>
        </div>
        <Table
          dataSource={
            billInfo?.billDetails &&
            billInfo?.billDetails.map((record, index) => ({
              ...record,
              key: index,
            }))
          }
          columns={columns}
        />
      </div>
      <Row>
        <Col span={16}>
          <div
            className={`${styles.billReturn} me-5`}
            style={{ height: "100%" }}
          >
            <h3 style={{ marginBottom: "25px" }}>Thông tin trả hàng</h3>
          </div>
        </Col>
        <Col span={8}>
          <div className={`${styles.billReturn} ms-5`}>
            <h3 style={{ marginBottom: "25px" }}>Thông tin thanh toán</h3>
            <Row style={{ margin: "0 15px" }}>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Tổng giá gốc:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>
                  {billInfo?.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Tổng giá trả:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(255, 77, 79)" }}>
                  10.000.000 đ
                </span>
              </Col>
              <Divider />
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Tiền thừa trả khách:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(255, 77, 79)" }}>
                  10.000.000 đ
                </span>
              </Col>
              <Col span={24}>
                <span style={{ fontWeight: 600 }}>
                  Mô tả <span style={{ color: "rgb(255, 77, 79)" }}>*</span>
                </span>
                <TextArea allowClear />
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "100%", margin: "20px 0 " }}
                >
                  <span style={{ fontWeight: 600 }}>Xác nhận trả hàng</span>
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BillReturn;
