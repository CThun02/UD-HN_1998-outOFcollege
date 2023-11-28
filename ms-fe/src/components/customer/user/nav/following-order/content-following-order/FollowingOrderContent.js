import { Button, Carousel, Col, Row, Space } from "antd";
import styles from "./FollowingOrderContent.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../../../../../../service/Token";
import TimelineCustom from "../../../../../element/bill-info/TimelineCustom";
import ModalConfirm from "../../../../../admin/sale-couter/ModalConfirm";

function FollowingOrderContent({ billCode, status, symbol, count, createdBy }) {
  const [timelines, setTimelines] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const [billId, setBillId] = useState(null)
  const [timelineV1, setTimelineV1] = useState([])
  const [open, setOpen] = useState(false)
  const [render, setRender] = useState(false)
  const [openNote, setOpenNote] = useState([])

  const handleOpen = (e) => {
    console.log(e)
    setBillId(e)
    setOpen(true)
  }

  const handleCreateTimeline = async (note) => {
    const data = await token;
    const values = {
      note: note,
      status: '0',
      createdBy: data ? (data?.username + "_" + data?.fullName) : null,
    };

    await axios
      .post(`http://localhost:8080/api/client/create-timeline/${billId}`, values)
      .then((response) => {
        setTimelines([...timelines, response.data]);
        setRender(response.data);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const handleUpdateBillStatus = async () => {
    await axios
      .put(
        `http://localhost:8080/api/client/change-status-bill/${billId}`,
        {
          status: 'Cancel',
          amountPaid: 0,
        },
      )
      .then((response) => {
        setRender(response.data.amountPaid);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const handleCancel = () => {
    setOpen(false);
  }

  const handleCancelBill = (note) => {
    handleCreateTimeline(note)
    handleUpdateBillStatus()
    setOpenNote([])
  }

  const token = getAuthToken()
  useEffect(() => {
    const getAll = async () => {
      setLoading(false)
      const data = await token
      console.log(`status`, data)
      await axios.get(`http://localhost:8080/api/client/timelineByUser?username=${data?.username}&billCode=${billCode}&status=${status}&symbol=${symbol}&count=${Number(count)}&createdBy=${createdBy}`)
        .then((response) => {
          setTimelines(response.data)
          setLoading(true)
          let totalPrice = 0;
          for (let i = 0; i < response.data.length; i++) {
            totalPrice += response.data[i].price * response.data[i].quantity
            console.log(totalPrice)
          }
          setTotalPrice(totalPrice)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    const getTimeline = async () => {
      axios
        .get(`http://localhost:8080/api/client/timeline/${billId}`)
        .then((response) => {
          setTimelineV1(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error)
        });
    }
    getAll()
    getTimeline()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, billId, render]);

  return (
    <div className={styles.content}>
      {loading ? <div className={styles.width}>
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
                {status === '' ? ' Chờ giao hàng'
                  : status === 'Complete' ? 'Hoàn thành'
                    : status === 'Cancel' ? 'Đã hủy' : status}
              </span>
            </div>
            {timelines?.length > 0 && timelines.map((timeline) =>
              <Row style={{ margin: 0 }}>
                <Col span={3}>
                  <Carousel style={{ maxWidth: "300px" }} autoplay>
                    {timeline.productImageResponses &&
                      timeline.productImageResponses.map(
                        (item) => {
                          return (
                            <img
                              key={item.id}
                              style={{ width: "100%", marginTop: "10px" }}
                              alt="ahihi"
                              src={item.path}
                            />
                          );
                        }
                      )}
                  </Carousel>
                </Col>
                <Col span={18}>
                  <Space Space style={{ width: "100%", marginLeft: "16px" }} size={8} direction="vertical" onClick={() => handleOpen(timeline.billId)}>
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
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <span style={{ fontSize: "1.25rem", color: "#ee4d2d" }}>
                    {(timeline.productPrice * timeline.quantity).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </Col>
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
                    {(status === 'Complete' && count === 4) &&
                      <Button type="primary" style={{ marginRight: "20px" }}>
                        Mua lại
                      </Button>}
                    {(createdBy === 'CLIENT') && <Button type="primary" danger style={{
                      marginRight: "20px",
                    }}
                      onClick={() => {
                        setBillId(timeline.billId);
                        setOpenNote(true)
                      }}
                    >
                      Hủy
                    </Button>}
                    <ModalConfirm isModalOpen={openNote} handleCancel={() => setOpenNote(false)} handleOk={handleCancelBill} />
                    <span>Thành tiền: {(timeline.quantity * timeline.productPrice).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}</span>
                  </div>
                  <hr />
                </Col>
              </Row>
            )}
          </Space>
        </div>
      </div> : <>
        Đang tải...
      </>}
      <TimelineCustom
        open={open}
        timelines={timelineV1}
        handleCancel={handleCancel}
      />
    </div >
  );
}

export default FollowingOrderContent;
