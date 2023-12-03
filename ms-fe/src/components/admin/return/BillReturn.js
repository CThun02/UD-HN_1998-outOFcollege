import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  Divider,
  notification,
  Row,
  Radio,
  Table,
  Tooltip,
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
import ModalDetail from "../sale-couter/ModalDetail";

var productsReturns = [];
const BillReturn = () => {
  const { billCode } = useParams();
  const navigate = useNavigate();
  const token = getAuthToken(true);

  const [billInfo, setBillInfor] = useState(null);
  const [modalQuantityReturn, setModalQuantityReturn] = useState([false]);
  const [quantity, setQuantity] = useState(1);
  const [render, setRender] = useState(null);
  const [totalPrice, seTotalPrice] = useState(0);
  const [returned, setReturned] = useState(false);
  const [note, setNote] = useState("");
  const [modalDetail, setModalDetail] = useState(false);

  const handleShowModalProduct = (index, value) => {
    const newModalVisible = [...modalQuantityReturn];
    newModalVisible[index] = value;
    setModalQuantityReturn(newModalVisible);
  };

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
        return record.productPrice?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      key: "action",
      title: "Thao tác",
      render: (_, record, index) => {
        return (
          <>
            <Modal
              open={modalQuantityReturn[index]}
              onCancel={() => handleShowModalProduct(index, false)}
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
                {!returned && !record.checkInPromotion && (
                  <Button
                    onClick={() => {
                      reloadProduct(index, record);
                    }}
                    type="primary"
                    size="large"
                  >
                    Xác nhận
                  </Button>
                )}
              </div>
            </Modal>
            <Tooltip
              title={
                record.checkInPromotion
                  ? "Sản phẩm mua trong đợt khuyến mại không thể trả hàng!"
                  : ""
              }
            >
              <Button
                onClick={() => {
                  handleShowModalProduct(index, true);
                }}
                type="primary"
                size="large"
                disabled={returned !== false || record.checkInPromotion}
                icon={
                  record.checkInPromotion ? (
                    <CloseOutlined />
                  ) : (
                    <ReloadOutlined />
                  )
                }
              ></Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  async function confirmReload(status) {
    const data = await token;
    for (let index = Number(status); index <= Number(status) + 1; index++) {
      await axios
        .post(
          `http://localhost:8080/api/admin/timeline/${billInfo?.id}`,
          {
            note: note,
            status: index,
            createdBy: data?.username + "_" + data?.fullName,
          },
          {
            headers: {
              Authorization: `Bearer ${getToken(true)}`,
            },
          }
        )
        .then((response) => { })
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
    for (let index = 0; index < productsReturns.length; index++) {
      const request = {
        productDetailId: productsReturns[index].productDetailId,
        billId: billInfo.id,
        reason: productsReturns[index].reason,
        quantity: productsReturns[index].quantity,
        price: productsReturns[index].productPrice,
      };
      await axios
        .post(`http://localhost:8080/api/admin/product-return`, request, {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        })
        .then((response) => { })
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
    notification.success({
      message: "Thông báo",
      description: "Trả hàng thành công",
    });
    var id = productsReturns.map((item) => item.billDetailId);
    changeStatusBillDetail(id, "ReturnS");
    setRender(Math.random());
    productsReturns = [];
  }

  function changeStatusBillDetail(id, status) {
    axios
      .put(
        `http://localhost:8080/api/admin/bill/billDetail/change-status?status=${status === "5" || status === "3"
          ? "ReturnW"
          : status === "-1"
            ? "ReturnC"
            : status === "ACTIVE"
              ? "ACTIVE"
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
  }

  function reloadProduct(index, record) {
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
    handleShowModalProduct(index, false);
    setQuantity(1);
    setRender(Math.random());
  }

  function deleteIfNoneReturned(index) {
    productsReturns.splice(index, 1);
    setRender(Math.random());
    notification.success({
      message: "Thông báo",
      description: "Xóa thành công",
    });
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
          if (
            response.data.status !== "Complete" ||
            now.getTime() - new Date(response.data.completionDate).getTime() >
            sevenDay
          ) {
            navigate("/api/admin/return");
          } else {
            productsReturns = [];
          }
        } else {
          navigate("/api/admin/return");
        }
      })
      .catch((error) => {
        const status = error.response?.status;
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
          for (
            let index = 0;
            index < response.data.billDetails.length;
            index++
          ) {
            if (
              response.data.billDetails[index].billDetailStatus === "ReturnW"
            ) {
              setReturned("request");
            }
            if (
              response.data.billDetails[index].billDetailStatus === "ReturnS"
            ) {
              setReturned("returned");
            }
            if (
              response.data.billDetails[index].billDetailStatus === "ReturnC"
            ) {
              setReturned("cancel");
            }
          }
          for (
            let index = 0;
            index < response.data.billDetails.length;
            index++
          ) {
            if (
              response.data.billDetails[index].billDetailStatus === "ReturnW" ||
              response.data.billDetails[index].billDetailStatus === "ReturnS"
            ) {
              if (
                !productsReturns.some(
                  (item) =>
                    item.productDetailId ===
                    response.data.billDetails[index].productDetailId
                )
              ) {
                productsReturns.push(response.data.billDetails[index]);
              }
            }
          }
          let total = 0;
          for (let index = 0; index < productsReturns.length; index++) {
            total +=
              productsReturns[index].productPrice *
              productsReturns[index].quantity;
          }
          seTotalPrice(total);
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
  }, [billCode, modalQuantityReturn, render]);
  return (
    <>
      <ModalDetail
        isModalOpen={modalDetail}
        handleCancel={() => setModalDetail(false)}
        timelineDetail={billInfo?.timeLines}
        symbol={billInfo?.symbol}
      />
      <div className={styles.billReturn}>
        <h3 style={{ marginBottom: "25px" }}>Thông tin hóa đơn</h3>
        <div style={{ overflowX: "scroll", height: "50%" }}>
          <div style={{ width: "fit-content" }}>
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
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Button
            type="primary"
            size="large"
            onClick={() => setModalDetail(true)}
          >
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
                    <Col span={24} key={index}>
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
                            <b>Số lượng: </b>
                            <span
                              style={{
                                marginLeft: "8px",
                              }}
                            >
                              {record.quantity}
                            </span>
                            <br />
                            <b>Tổng giá hoàn trả: </b>
                            <span
                              style={{
                                marginLeft: "8px",
                              }}
                            >
                              {(
                                record.productPrice * record.quantity
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
                            {returned === false && (
                              <CloseCircleOutlined
                                style={{
                                  cursor: "pointer",
                                  color: "rgb(255, 77, 79)",
                                  fontSize: "20px",
                                }}
                                onClick={() => deleteIfNoneReturned(index)}
                              />
                            )}
                          </div>
                        </Col>
                        <Col span={24}>
                          {returned === false ? (
                            <Radio.Group
                              name="radiogroup"
                              key={index}
                              defaultValue={
                                productsReturns[index].reason
                                  ? productsReturns[index].reason
                                  : "PRODUCE"
                              }
                              onChange={(e) => {
                                productsReturns[index].reason = e.target.value;
                              }}
                            >
                              <Radio value={"PRODUCE"}>
                                Lỗi do nhà sản xuất
                              </Radio>
                              <Radio value={"OTHER"}>Lý do khác</Radio>
                            </Radio.Group>
                          ) : (
                            <Radio.Group
                              name="radiogroup"
                              key={index}
                              value={
                                productsReturns[index].reason
                                  ? productsReturns[index].reason
                                  : "PRODUCE"
                              }
                            >
                              <Radio value={"PRODUCE"}>
                                Lỗi do nhà sản xuất
                              </Radio>
                              <Radio value={"OTHER"}>Lý do khác</Radio>
                            </Radio.Group>
                          )}
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
              <Col span={24}>
                <span style={{ fontWeight: 600 }}>
                  Mô tả <span style={{ color: "rgb(255, 77, 79)" }}>*</span>
                </span>
                <br />
                {returned === false ? (
                  <div>
                    <TextArea
                      onChange={(e) => {
                        setNote(e.target.value);
                      }}
                      disabled={productsReturns.length === 0}
                      allowClear
                    />
                    <Button
                      type="primary"
                      size="large"
                      style={{ width: "100%", margin: "20px 0 " }}
                      disabled={productsReturns.length === 0}
                      onClick={() =>
                        Modal.confirm({
                          centered: true,
                          title: "Xác nhận trả hàng",
                          content: "Chắc chắn trả hàng?",
                          onOk() {
                            confirmReload(
                              billInfo?.symbol === "Shipping" ? "5" : "3"
                            );
                          },
                        })
                      }
                    >
                      <span style={{ fontWeight: 600 }}>Xác nhận trả hàng</span>
                    </Button>
                  </div>
                ) : (
                  <span>
                    {billInfo?.timeLines[billInfo?.timeLines.length - 1]?.note}
                  </span>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BillReturn;
