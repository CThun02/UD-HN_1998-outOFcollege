import { Carousel, Col, Row, Space } from "antd";
import React from "react";
import styles from "./Timeline.module.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { FaRegFileAlt, FaTimes, FaTruck } from "react-icons/fa";
import { CheckCircleOutlined } from "@ant-design/icons";
import SockJs from "../../../service/SockJs";

const TimelineByBillCode = () => {
  const { billCode } = useParams();
  const [loading, setLoading] = useState(true);
  const [timelines, setTimelines] = useState([]);
  const [timelineDisplay, setTimelineDisplay] = useState([]);

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
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(timelines);
  }, []);

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
            {console.log(timelineDisplay)}
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
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              {timelines?.lstProduct?.map((timeline) => {
                return (
                  <Row style={{ margin: 0 }}>
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
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1.25rem",
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
                <div style={{ width: "40%" }}>
                  <Row>
                    <Col span={12} style={{ fontWeight: 500 }}>
                      Tên khách hàng
                    </Col>
                    <Col span={12}>
                      {timelines?.timelineCustomInfo?.fullName}
                    </Col>
                    <Col span={12} style={{ fontWeight: 500 }}>
                      Số điện thoại
                    </Col>
                    <Col span={12}>
                      {timelines?.timelineCustomInfo?.phoneNumber}
                    </Col>
                    <Col span={12} style={{ fontWeight: 500 }}>
                      Ngày đặt hàng
                    </Col>
                    <Col span={12}>
                      {timelines?.timelineCustomInfo?.orderDate}
                    </Col>
                    <Col span={12} style={{ fontWeight: 500 }}>
                      Ngày nhận hàng
                    </Col>
                    <Col span={12}>
                      {timelines?.timelineCustomInfo?.dateOfReceipt ?? "__"}
                    </Col>
                    <Col span={12} style={{ fontWeight: 500 }}>
                      Địa chỉ
                    </Col>
                    <Col span={12}>
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
