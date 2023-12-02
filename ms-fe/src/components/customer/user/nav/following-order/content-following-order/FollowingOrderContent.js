import { Button, Carousel, Col, Row, Space } from "antd";
import styles from "./FollowingOrderContent.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../../../../../../service/Token";
import TimelineCustom from "../../../../../element/bill-info/TimelineCustom";
import ModalConfirm from "../../../../../admin/sale-couter/ModalConfirm";
import { useNavigate } from "react-router-dom";
import SockJs from "../../../../../../service/SockJs";

var bills = [];

function FollowingOrderContent({ billCode, status, symbol, count, createdBy }) {
  const navigate = useNavigate();
  const [timelines, setTimelines] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [billId, setBillId] = useState(null);
  const [timelineV1, setTimelineV1] = useState([]);
  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const getTimeline = async (billId) => {
    axios
      .get(`http://localhost:8080/api/client/timeline/${billId}`)
      .then((response) => {
        setTimelineV1(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpen = (e) => {
    console.log(e);
    setBillId(e);
    if (e) {
      getTimeline(e);
    }
    setOpen(true);
  };

  const handleCreateTimeline = async (note) => {
    const data = await token;
    const values = {
      note: note,
      status: "0",
      createdBy: data ? data?.username + "_" + data?.fullName : null,
    };

    await axios
      .post(
        `http://localhost:8080/api/client/create-timeline/${billId}`,
        values
      )
      .then((response) => {
        handleUpdateBillStatus();
        setTimelines([...timelines, response.data]);
        setRender(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdateBillStatus = async () => {
    await axios
      .put(`http://localhost:8080/api/client/change-status-bill`, {
        id: billId,
        status: "Cancel",
        amountPaid: 0,
      })
      .then((response) => {
        setRender(response.data.amountPaid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleCancelBill = (note) => {
    handleCreateTimeline(note);
    setOpenNote(false);
  };

  const cartAPI = "http://localhost:8080/api/client/cart";

  const handleRePurchase = async (id) => {
    const data = await token;

    await axios
      .get(`${cartAPI}`, {
        params: {
          username: data?.username,
        },
      })
      .then((response) => {
        console.log(response.data);
        try {
          const cart = {
            username: data?.username,
            lstCartDetail: [],
          };

          if (response.data) {
            for (let i = 0; i < response.data.length; i++) {
              if (
                Number(id) !==
                Number(response.data[i].cartDetailResponse.productDetailId)
              ) {
                cart.lstCartDetail.push({
                  productDetailId: Number(id),
                  quantity: 1,
                });
              }
            }
          }

          // Kiểm tra xem cart có dữ liệu không
          if (cart.lstCartDetail.length === 0) {
            cart.lstCartDetail.push({
              productDetailId: id,
              quantity: 1,
            });
          }

          axios.post(`${cartAPI}`, cart);
          navigate("/ms-shop/cart");
        } catch (error) {
          console.error(error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const token = getAuthToken();

  const userINfo = () => {
    let code = billCode ? billCode : timelines[0]?.billCode;
    axios
      .get(`http://localhost:8080/api/client/delivery-note/${code}`)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getAll = async () => {
      setLoading(false);
      const data = await token;
      await axios
        .get(
          `http://localhost:8080/api/client/timelineByUser?username=${data?.username ? data?.username : ""
          }&billCode=${billCode}&status=${status}&symbol=${symbol}&count=${count}&createdBy=${createdBy}`
        )
        .then((response) => {
          setTimelines(response.data);
          setLoading(true);
          var billSData = response.data;
          bills = [];
          if (bills.length === 0 && status !== "Complete") {
            console.log("object");
            for (var i = 0; i < billSData.length; i++) {
              var billExists = [];
              billExists.push(billSData[i]);
              let j = i + 1;
              while (j < billSData.length) {
                if (billExists[0].billId === billSData[j].billId) {
                  billExists.push(billSData.splice(j, 1)[0]);
                } else {
                  j++;
                }
              }
              bills.push(billExists);
            }
          }
          let totalPrice = 0;
          for (let i = 0; i < response.data.length; i++) {
            totalPrice += response.data[i].price * response.data[i].quantity;
          }
          setTotalPrice(totalPrice);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    userINfo();
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, render, createdBy, count, symbol, billCode]);

  return (
    <div className={styles.content}>
      <SockJs
        connectTo={"create-timeline-client-topic"}
        setValues={setTimelineV1}
      />
      {loading ? (
        <div className={styles.width}>
          <div className={styles.followingContent}>
            <Space direction="vertical" size={16} style={{ width: "100%" }}>
              <div style={{ borderBottom: "1px solid #ccc", padding: "5px 0" }}>
                <span
                  style={{
                    fontSize: "1.25rem",
                    color: "#ee4d2d",
                    textTransform: "uppercase",
                  }}
                >
                  {status === "" && createdBy === "CLIENT"
                    ? " Chờ giao hàng"
                    : status === "Complete"
                      ? "Hoàn thành"
                      : status === "Cancel"
                        ? "Đã hủy"
                        : status === "" && symbol === "Shipping" && count === 2
                          ? "Đã xác nhận"
                          : status === "" && count === 3
                            ? "Đang giao hàng"
                            : "Tất cả"}
                </span>
              </div>
              {console.log(bills)}
              {bills?.length > 0 && status === ""
                ? bills.map((timelines) => {
                  return (
                    <>
                      {timelines?.map((timeline) => {
                        return (
                          <Row style={{ margin: 0 }}>
                            <Col span={3}>
                              <Carousel
                                style={{ maxWidth: "300px" }}
                                autoplay
                              >
                                {timeline.productImageResponses &&
                                  timeline.productImageResponses.map(
                                    (item) => {
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
                                    }
                                  )}
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
                                            backgroundColor:
                                              timeline.productColor,
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
                      <Col span={24} style={{}}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            borderTop: "1px solid #ccc",
                            padding: "10px 0",
                          }}
                        >
                          <Button
                            style={{ marginRight: 20 }}
                            onClick={() => handleOpen(timelines[0].billId)}
                          >
                            Chi tiết đơn hàng
                          </Button>

                          {createdBy === "CLIENT" && (
                            <Button
                              type="primary"
                              danger
                              style={{
                                marginRight: "20px",
                              }}
                              onClick={() => {
                                setBillId(timelines[0].billId);
                                setOpenNote(true);
                              }}
                            >
                              Hủy
                            </Button>
                          )}
                          {/* <span>Thành tiền: {(timeline.quantity * timeline.productPrice).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}</span> */}
                        </div>
                        <hr />
                      </Col>
                    </>
                  );
                })
                : timelines?.map((timeline) => {
                  return (
                    <Row
                      style={{ padding: 10, borderBottom: "1px solid gray" }}
                    >
                      <Col span={3}>
                        <Carousel style={{ maxWidth: "300px" }} autoplay>
                          {timeline.productImageResponses &&
                            timeline.productImageResponses.map((item) => {
                              return (
                                <img
                                  key={item.id}
                                  style={{ width: "100%", marginTop: "10px" }}
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
                          style={{ fontSize: "1.25rem", color: "#ee4d2d" }}
                        >
                          {(
                            timeline.productPrice * timeline.quantity
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </Col>
                      <Col span={17}></Col>
                      <Col span={7}>
                        <Button
                          style={{ marginRight: 20 }}
                          onClick={() => handleOpen(timeline.billId)}
                        >
                          Chi tiết đơn hàng
                        </Button>
                        <Button
                          type="primary"
                          style={{ marginRight: "20px" }}
                          onClick={() =>
                            handleRePurchase(timeline.productDetailId)
                          }
                        >
                          Mua lại
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
            </Space>
          </div>
        </div>
      ) : (
        <>Đang tải...</>
      )
      }
      <ModalConfirm
        isModalOpen={openNote}
        handleCancel={() => setOpenNote(false)}
        handleOk={handleCancelBill}
      />
      <TimelineCustom
        open={open}
        timelines={timelineV1}
        handleCancel={handleCancel}
        userInfo={userInfo}
      />
    </div >
  );
}

export default FollowingOrderContent;
