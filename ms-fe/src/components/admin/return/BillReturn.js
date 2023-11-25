import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  Divider,
  notification,
  Row,
  Space,
  Table,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import SpanBorder from "../sale-couter/SpanBorder";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAuthToken, getToken } from "../../../service/Token";
import styles from "./BillReturn.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "antd/es/modal/Modal";
import Input from "antd/es/input/Input";
import {
  FaClock,
  FaRegCheckCircle,
  FaRegFileAlt,
  FaRocket,
  FaTimes,
  FaTruck,
} from "react-icons/fa";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";

var productsReturns = [];

const BillReturn = () => {
  const { billCode } = useParams();
  const navigate = useNavigate();
  const token = getAuthToken(true);

  const [billInfo, setBillInfor] = useState(null);
  const [modalQuantityReturn, setModalQuantityReturn] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [render, setRender] = useState(null);
  const [totalPrice, seTotalPrice] = useState(0);
  const [returned, setReturned] = useState(false);
  const [note, setNote] = useState("");
  const [isConfirm, setIsconfirm] = useState(true);
  const [modalNoteReturn, setModalNoteReturn] = useState(false);

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
          <>
            <Modal
              open={modalQuantityReturn}
              onCancel={() => setModalQuantityReturn(false)}
              centered
              footer={null}
              title={"Nhập số lượng"}
            >
              <Input
                value={quantity}
                type={"number"}
                onChange={(e) => {
                  if (
                    Math.abs(Number(e.target.value)) >
                      Number(record.quantity) ||
                    Number(e.target.value) === 0
                  ) {
                    setQuantity(1);
                  } else {
                    setQuantity(e.target.value);
                  }
                }}
              />
              <div style={{ marginTop: "8px", textAlign: "center" }}>
                {!returned && (
                  <Button
                    onClick={() => {
                      reloadProduct(record);
                    }}
                    type="primary"
                    size="large"
                  >
                    Xác nhận
                  </Button>
                )}
              </div>
            </Modal>
            <Button
              onClick={() => {
                setModalQuantityReturn(true);
              }}
              type="primary"
              size="large"
              disabled={returned !== false}
            >
              <ReloadOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  async function confirmReload(status) {
    const data = await token;
    const values = {
      note: note,
      status: status,
      createdBy: data?.username + "_" + data?.fullName,
    };
    await axios
      .post(
        `http://localhost:8080/api/admin/timeline/${billInfo?.id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setRender(response.data);
        var id = productsReturns.map((item) => item.billDetailId);
        axios
          .put(
            `http://localhost:8080/api/admin/bill/billDetail/change-status?status=${
              status === "5" || status === "3"
                ? "ReturnW"
                : status === "-1"
                ? "ReturnC"
                : "ReturnS"
            }`,
            id,
            {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            }
          )
          .then((response) => {
            setRender(response.data);
          })
          .catch((error) => {
            const status = error.response.status;
            if (status === 403) {
              notification.error({
                message: "Thông báo",
                description: "Bạn không có quyền truy cập!",
              });
            }
            return;
          });
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
    setModalNoteReturn(false);
  }

  function reloadProduct(record) {
    let check = -1;
    for (let index = 0; index < productsReturns.length; index++) {
      if (
        Number(record.billDetailId) ===
        Number(productsReturns[index].billDetailId)
      ) {
        check = index;
        break;
      }
    }
    if (check !== -1) {
      productsReturns[check].quantity = quantity;
    } else {
      record.quantity = quantity;
      productsReturns.push(record);
    }
    notification.success({
      message: "Thông báo",
      description: "Chọn sản phẩm thành công",
    });
    setModalQuantityReturn(false);
  }

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
          for (let index = 0; index < response.data.timeLines.length; index++) {
            if (response.data.timeLines[index].status === "5") {
              setReturned("request");
            }
            if (response.data.timeLines[index].status === "6") {
              setReturned("returned");
            }
            if (response.data.timeLines[index].status === "-1") {
              setReturned("cancel");
            }
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
      let total = 0;
      for (let index = 0; index < productsReturns.length; index++) {
        total +=
          productsReturns[index].productPrice * productsReturns[index].quantity;
      }
      seTotalPrice(total);
    }
  }, [billCode, modalQuantityReturn, render]);
  return (
    <>
      <div className={styles.billReturn}>
        <h3 style={{ marginBottom: "25px" }}>Thông tin hóa đơn</h3>
        <Timeline minEvents={2} placeholder className={styles.timeLine}>
          {billInfo?.symbol !== "Received" ? (
            <Timeline minEvents={6} placeholder className={styles.timeLine}>
              {billInfo?.timeLines &&
                billInfo?.timeLines.map((data) => (
                  <TimelineEvent
                    color={
                      data.status === "0" || data.status === "-1"
                        ? "#FF0000"
                        : data.status === "5"
                        ? "#f0ad4e"
                        : "#00cc00"
                    }
                    icon={
                      data.status === "1"
                        ? FaRegFileAlt
                        : data.status === "0"
                        ? FaTimes
                        : data.status === "2"
                        ? FaRegFileAlt
                        : data.status === "3"
                        ? FaTruck
                        : CheckCircleOutlined
                    }
                    title={
                      data.status === "0" ? (
                        <h3>Đã hủy</h3>
                      ) : data.status === "1" ? (
                        <h3>Chờ xác nhận</h3>
                      ) : data.status === "2" ? (
                        <h3>Đã xác nhận</h3>
                      ) : data.status === "3" ? (
                        <h3>
                          Đã đóng gói & <br /> đang được giao
                        </h3>
                      ) : data.status === "4" ? (
                        <h3>Giao hàng thành công</h3>
                      ) : data.status === "5" ? (
                        <h3>yêu cầu trả hàng</h3>
                      ) : data.status === "-1" ? (
                        <h3>Trả hàng thất bại</h3>
                      ) : (
                        <h3>Trả hàng thành công</h3>
                      )
                    }
                    subtitle={data.createdDate}
                  />
                ))}
            </Timeline>
          ) : (
            <Timeline minEvents={2} placeholder className={styles.timeLine}>
              {billInfo?.timeLines &&
                billInfo?.timeLines.map((data) => (
                  <TimelineEvent
                    color={
                      data.status === "0" || data.status === "-1"
                        ? "#FF0000"
                        : data.status === "3"
                        ? "#f0ad4e"
                        : "#00cc00"
                    }
                    icon={
                      data.status === "1"
                        ? FaRegFileAlt
                        : data.status === "0"
                        ? FaTimes
                        : data.status === "2"
                        ? FaRegCheckCircle
                        : data.status === "3"
                        ? FaClock
                        : data.status === "4"
                        ? FaRocket
                        : null
                    }
                    title={
                      data.status === "1" ? (
                        <h3>Chờ xác nhận</h3>
                      ) : data.status === "2" ? (
                        <h3>Thanh toán thành công</h3>
                      ) : data.status === "0" ? (
                        <h3>Đã hủy</h3>
                      ) : data.status === "3" ? (
                        <h3>yêu cầu trả hàng</h3>
                      ) : data.status === "-1" ? (
                        <h3>Trả hàng thất bại</h3>
                      ) : (
                        <h3>Trả hàng thành công</h3>
                      )
                    }
                    subtitle={data.createdDate}
                  />
                ))}
            </Timeline>
          )}
        </Timeline>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {returned === "request" && (
            <>
              <Space>
                <Modal
                  open={modalNoteReturn}
                  onCancel={() => setModalNoteReturn(false)}
                  centered
                  footer={null}
                  title={"Ghi chú"}
                >
                  <TextArea
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  />
                  <div style={{ marginTop: "8px", textAlign: "center" }}>
                    <Button
                      onClick={() => {
                        confirmReload(
                          !isConfirm
                            ? "-1"
                            : billInfo?.symbol === "Shipping"
                            ? "6"
                            : "4"
                        );
                      }}
                      type="primary"
                      size="large"
                    >
                      Xác nhận
                    </Button>
                  </div>
                </Modal>
                <Button
                  onClick={() => {
                    setIsconfirm(true);
                    setModalNoteReturn(true);
                  }}
                  type="primary"
                  size="large"
                >
                  Xác nhận
                </Button>
                <Button
                  onClick={() => {
                    setIsconfirm(false);
                    setModalNoteReturn(true);
                  }}
                  danger
                  type="primary"
                  size="large"
                >
                  Hủy
                </Button>
              </Space>
            </>
          )}
          <Button type="primary" size="large">
            Chi tiết
          </Button>
        </div>
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
          {returned === false && (
            <Button size="large" type="primary">
              <ReloadOutlined />
              Trả hàng tất cả
            </Button>
          )}
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
            <Row>
              {productsReturns &&
                productsReturns.map((record, index) => {
                  return (
                    <Col span={24}>
                      <Row>
                        <Col span={4}>
                          <div className="m-5">
                            <Carousel style={{ maxWidth: 300 }} autoplay>
                              {record.productImageResponses &&
                                record.productImageResponses.map((item) => {
                                  return (
                                    <img
                                      key={item.id}
                                      style={{
                                        width: "100%",
                                        marginTop: "10px",
                                      }}
                                      alt=""
                                      src={item.path}
                                    />
                                  );
                                })}
                            </Carousel>
                          </div>
                        </Col>
                        <Col span={18}>
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
                            <br />
                            <b>Tổng giá hoàn trả: </b>
                            <span
                              style={{
                                marginLeft: "8px",
                              }}
                            >
                              {(
                                record.productPrice + record.quantity
                              ).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                          </div>
                        </Col>
                        <Col span={2}>
                          <div
                            style={{
                              display: "flex",
                              height: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <CloseCircleOutlined
                              style={{
                                cursor: "pointer",
                                color: "rgb(255, 77, 79)",
                                fontSize: "20px",
                              }}
                              onClick={() => {
                                productsReturns.splice(index, 1);
                                setRender(Math.random());
                                notification.success({
                                  message: "Thông báo",
                                  description: "Xóa thành công",
                                });
                              }}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Divider />
                    </Col>
                  );
                })}
            </Row>
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
                  {totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </Col>
              <Divider />
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Tiền thừa trả khách:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </Col>

              {returned === false && (
                <Col span={24}>
                  <span style={{ fontWeight: 600 }}>
                    Mô tả <span style={{ color: "rgb(255, 77, 79)" }}>*</span>
                  </span>
                  <TextArea allowClear />
                  <Button
                    type="primary"
                    size="large"
                    style={{ width: "100%", margin: "20px 0 " }}
                    disabled={productsReturns.length === 0}
                    onClick={() =>
                      confirmReload(billInfo?.symbol === "Shipping" ? "5" : "3")
                    }
                  >
                    <span style={{ fontWeight: 600 }}>Xác nhận trả hàng</span>
                  </Button>
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BillReturn;
