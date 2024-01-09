import { Button, Carousel, Col, Modal, Row, Space, notification } from "antd";
import React from "react";
import styles from "./Timeline.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { FaRegFileAlt, FaTimes, FaTruck } from "react-icons/fa";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import SockJs from "../../../service/SockJs";
import EditAddress from "../edit-address/EditAddress";
import EditProductsCart from "../edit-product-cart/EditProductsCart";
import EditProductCart from "../edit-product-cart/EditProductCart";

const TimelineByBillCode = () => {
  const { billCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [timelines, setTimelines] = useState([]);
  const [timelineDisplay, setTimelineDisplay] = useState([]);
  const [openEditAddress, setOpenEditAddress] = useState(false);
  const [render, setRender] = useState(null);
  const [openCartEdit, setOpenCartEdit] = useState(false);
  const [openProductEdit, setOpenProductEdit] = useState([]);
  const [loadingButton, setLoadingButton] = useState(false);

  const handleShowModalProductEdit = (index) => {
    const visible = [...openProductEdit];
    visible[index] = true;
    setOpenProductEdit(visible);
  };

  const handleCancelModalProductEdit = (index) => {
    const visible = [...openProductEdit];
    visible[index] = false;
    setOpenProductEdit(visible);
  };

  const deleteBillDetail = (bdId, bId) => {
    setLoadingButton(true);
    Modal.confirm({
      title: "Xác nhận xóa",
      message: "Xác nhận xóa sản phẩm",
      onOk: () => {
        axios
          .delete(
            "http://localhost:8080/api/client/deleteBD?bdId=" +
              bdId +
              "&bId=" +
              bId
          )
          .then((res) => {
            notification.success({
              message: "Thông báo",
              description: "Xóa thành công sản phẩm",
            });
            setRender(Math.random());
            setLoadingButton(false);
          })
          .catch((error) => {
            const message = error?.response?.data?.message;
            notification.error({
              message: "Thông báo",
              description: message,
            });
          });
      },
    });
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/api/client/getTimelineClientByBillCode/${billCode}`
      )
      .then((response) => {
        setLoading(true);
        setTimelines(response.data);
        var timelinesPush = [];
        for (
          let index = 0;
          index < response?.data?.lstTimeline.length;
          index++
        ) {
          if (!isNaN(response?.data?.lstTimeline[index].status)) {
            timelinesPush.push(response.data.lstTimeline[index]);
          }
        }
        setTimelineDisplay(timelinesPush);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [render]);

  return (
    <div className={styles.content} style={{ margin: "100px 0" }}>
      <SockJs
        connectTo={"create-timeline-client-topic"}
        setValues={setTimelineDisplay}
      />
      {loading ? (
        <div className={styles.width}>
          <div className={styles.followingContent}>
            {/* timeline */}
            <div style={{ overflowX: "scroll", height: "50%" }}>
              <div style={{ width: "fit-content" }}>
                <Timeline minEvents={6} placeholder>
                  {timelineDisplay &&
                    timelineDisplay?.map((data) => (
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
                          data.billType === "Online" &&
                          timelines?.timelineCustomInfo ? (
                            <>
                              {data.status === "0" ? (
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
                                <h3>Yêu cầu trả hàng</h3>
                              ) : data.status === "6" ? (
                                <h3>Trả hang thành công</h3>
                              ) : (
                                <h3>.</h3>
                              )}
                            </>
                          ) : (
                            <>
                              {data.status === "0" ? (
                                <h3>Đã hủy</h3>
                              ) : data.status === "1" ? (
                                <h3>Chờ xác nhận</h3>
                              ) : data.status === "2" ? (
                                <h3>Thanh toán thành công</h3>
                              ) : (
                                <h3>.</h3>
                              )}
                            </>
                          )
                        }
                        subtitle={data.createdDate}
                      />
                    ))}
                </Timeline>
              </div>
            </div>
            {/* Thông tin sản phẩm */}
            <EditProductsCart
              billCode={billCode}
              setLoadingButtonTimeline={setLoadingButton}
              renderTimeline={render}
              open={openCartEdit}
              render={setRender}
              onCancel={() => setOpenCartEdit(false)}
            />
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              {console.log(timelines)}
              {timelines?.lstTimeline?.length > 1 ||
              timelines?.timelineCustomInfo?.status === "Paid" ? null : (
                <div style={{ marginBottom: "24px" }}>
                  <Button
                    onClick={() => setOpenCartEdit(true)}
                    loading={loadingButton}
                    className={styles.btnEditCart}
                  >
                    <EditOutlined /> Thêm sản phẩm
                  </Button>
                </div>
              )}
              {timelines?.lstProduct?.map((timeline, index) => {
                return (
                  <Row style={{ margin: 0 }}>
                    <EditProductCart
                      onCancel={() => {
                        handleCancelModalProductEdit(index);
                      }}
                      open={openProductEdit[index]}
                      productDetailId={timeline?.productDetailId}
                      render={setRender}
                      quantityBuy={timeline.quantity}
                      setLoadingButtonTimeline={setLoadingButton}
                      renderTimeline={render}
                      billDetailId={timeline?.billDetailId}
                    />
                    <Col span={3}>
                      <Carousel style={{ maxWidth: "300px" }} autoplay>
                        {timeline.productImageResponses &&
                          timeline.productImageResponses.map((item) => {
                            return (
                              <img
                                key={item.id}
                                style={{
                                  width: "100%",
                                  marginTop: "10px",
                                }}
                                alt="ahihi"
                                src={item.path}
                              />
                            );
                          })}
                      </Carousel>
                    </Col>
                    <Col span={18}>
                      <Space
                        Space
                        style={{ width: "100%", marginLeft: "16px" }}
                        size={8}
                        direction="vertical"
                      >
                        <Row>
                          <Col span={24}>
                            <div
                              className="m-5"
                              style={{
                                textAlign: "start",
                                height: "100%",
                                justifyContent: "center",
                              }}
                            >
                              <span style={{ fontWeight: "500" }}>
                                {timeline.productName +
                                  "-" +
                                  timeline.productBrandName +
                                  "-" +
                                  timeline.productCateGoryName +
                                  "-" +
                                  timeline.productButton +
                                  "-" +
                                  timeline.productMaterial +
                                  "-" +
                                  timeline.productCollar +
                                  "-" +
                                  timeline.productSleeve +
                                  "-" +
                                  timeline.productShirtTail +
                                  "-" +
                                  timeline.productPatternName +
                                  "-" +
                                  timeline.productFormName}
                              </span>
                              <br />
                              <div className={styles.optionColor}>
                                <b>Màu sắc: </b>
                                <span
                                  style={{
                                    backgroundColor: timeline.productColor,
                                    marginLeft: "8px",
                                  }}
                                ></span>
                                {timeline.productColorName}
                              </div>
                              <b>Kích cỡ: </b>
                              <span
                                style={{
                                  marginLeft: "8px",
                                }}
                              >
                                {timeline.productSize}
                              </span>
                              <br />
                              <b>Số lượng: </b>
                              <span
                                style={{
                                  marginLeft: "8px",
                                }}
                              >
                                {timeline.quantity}
                              </span>
                              <br />
                              <b>Đơn giá: </b>
                              <span
                                style={{
                                  marginLeft: "8px",
                                }}
                              >
                                {timeline.productPrice.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </span>
                              <br />
                              <span
                                style={{
                                  fontSize: "1rem",
                                  color: "#ee4d2d",
                                }}
                              >
                                {(
                                  timeline.productPrice * timeline.quantity
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </Space>
                    </Col>
                    <Col
                      span={3}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      {timelines?.lstTimeline?.length > 1 ? null : (
                        <Row>
                          <Col span={12}>
                            <Button
                              loading={loadingButton}
                              onClick={() => handleShowModalProductEdit(index)}
                              className={styles.product_tableButtonCreate}
                            >
                              <EditOutlined />
                            </Button>
                          </Col>
                          <Col span={12}>
                            <Button
                              disabled={timelines?.lstProduct?.length === 1}
                              loading={loadingButton}
                              onClick={() =>
                                deleteBillDetail(
                                  timeline?.billDetailId,
                                  timeline?.billId
                                )
                              }
                              className={styles.product_tableButtonCreate}
                            >
                              <DeleteOutlined />
                            </Button>
                          </Col>
                        </Row>
                      )}
                    </Col>
                  </Row>
                );
              })}
            </Space>
            {/* Thông tin khách hàng */}
            {timelines?.timelineCustomInfo ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 50,
                }}
              >
                <EditAddress
                  isModalOpen={openEditAddress}
                  handleAddressCancel={() => setOpenEditAddress(false)}
                  totalPrice={timelines?.timelineCustomInfo?.totalPrice}
                  addressId={timelines?.timelineCustomInfo?.addressId}
                  setRender={setRender}
                  billId={timelines?.lstTimeline[0]?.billId}
                />
                <div style={{ width: "44%" }}>
                  <h2>Thông tin đơn hàng</h2>
                  <Row>
                    <Col span={22}>
                      <Row>
                        <Col span={8} style={{ fontWeight: 500 }}>
                          Tên khách hàng
                        </Col>
                        <Col span={16}>
                          {timelines?.timelineCustomInfo?.fullName}
                        </Col>
                        <Col span={8} style={{ fontWeight: 500 }}>
                          Số điện thoại
                        </Col>
                        <Col span={16}>
                          {timelines?.timelineCustomInfo?.phoneNumber}
                        </Col>
                        <Col span={8} style={{ fontWeight: 500 }}>
                          Ngày đặt hàng
                        </Col>
                        <Col span={16}>
                          {timelines?.timelineCustomInfo?.orderDate}
                        </Col>
                        <Col span={8} style={{ fontWeight: 500 }}>
                          Ngày nhận hàng
                        </Col>
                        <Col span={16}>
                          {timelines?.timelineCustomInfo?.dateOfReceipt ?? "__"}
                        </Col>
                        <Col span={8} style={{ fontWeight: 500 }}>
                          Địa chỉ
                        </Col>
                        <Col span={16}>
                          {`${timelines?.timelineCustomInfo?.addressDetail} 
                                        ${timelines?.timelineCustomInfo?.ward.substring(
                                          0,
                                          timelines?.timelineCustomInfo?.ward.indexOf(
                                            "|"
                                          )
                                        )} 
                                        ${timelines?.timelineCustomInfo?.district.substring(
                                          0,
                                          timelines?.timelineCustomInfo?.district.indexOf(
                                            "|"
                                          )
                                        )} 
                                        ${timelines?.timelineCustomInfo?.city.substring(
                                          0,
                                          timelines?.timelineCustomInfo?.city.indexOf(
                                            "|"
                                          )
                                        )}`}
                        </Col>
                        <Col span={8} style={{ fontWeight: 500 }}>
                          Ngày nhận hàng dự kiến
                        </Col>
                        <Col span={16}>
                          {timelines?.timelineCustomInfo?.dateShip ?? "__"}
                        </Col>
                        <Col span={24} style={{ marginTop: "20px" }}>
                          <Row>
                            <Col span={18} offset={6}>
                              <h2>Thông tin thanh toán</h2>
                            </Col>
                            <Col
                              style={{ fontWeight: 500 }}
                              span={6}
                              offset={6}
                            >
                              Thành tiền:
                            </Col>
                            <Col span={12}>
                              <p style={{ marginLeft: "25%" }}>
                                {(timelines?.timelineCustomInfo?.totalPrice).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </p>
                            </Col>
                            <Col
                              style={{ fontWeight: 500 }}
                              span={6}
                              offset={6}
                            >
                              Giảm giá:
                            </Col>
                            <Col span={12}>
                              <p style={{ marginLeft: "25%" }}>
                                {timelines?.timelineCustomInfo?.priceReduce?.toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </p>
                            </Col>
                            <Col
                              style={{ fontWeight: 500 }}
                              span={6}
                              offset={6}
                            >
                              Phí vận chuyển:
                            </Col>
                            <Col span={12}>
                              <p style={{ marginLeft: "25%" }}>
                                {(timelines?.timelineCustomInfo?.priceShip).toLocaleString(
                                  "vi-VN",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </p>
                            </Col>
                            <Col
                              span={6}
                              offset={6}
                              style={{
                                fontSize: "1.25rem",
                                fontWeight: "500",
                              }}
                            >
                              Tổng tiền:
                            </Col>
                            <Col
                              span={12}
                              style={{
                                fontSize: "1.25rem",
                                color: "#ee4d2d",
                                fontWeight: "500",
                              }}
                            >
                              <p
                                style={{
                                  marginLeft: "25%",
                                  textAlign: "start",
                                }}
                              >
                                {(
                                  timelines?.timelineCustomInfo?.pricePaid +
                                  timelines?.timelineCustomInfo?.priceShip
                                ).toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    {timelines?.lstTimeline?.length > 1 ? null : (
                      <Col span={2}>
                        <Button
                          loading={loadingButton}
                          onClick={() => setOpenEditAddress(true)}
                          className={styles.product_tableButtonCreate}
                        >
                          <EditOutlined />
                        </Button>
                      </Col>
                    )}
                  </Row>
                </div>
              </div>
            ) : (
              <h3
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: 50,
                }}
              >
                {" "}
                Khách lẻ
              </h3>
            )}
          </div>
        </div>
      ) : (
        <>Đang tải...</>
      )}
    </div>
  );
};

export default TimelineByBillCode;
