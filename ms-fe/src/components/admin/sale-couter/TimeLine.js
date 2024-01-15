import {
  Badge,
  Button,
  Carousel,
  Col,
  Divider,
  Input,
  InputNumber,
  Row,
  Space,
  Spin,
  Table,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import {
  FaClock,
  FaRegCheckCircle,
  FaRegFileAlt,
  FaRocket,
  FaTimes,
  FaTruck,
} from "react-icons/fa";
import styles from "./TimeLine.module.css";
import ModalConfirm from "./ModalConfirm";
import SpanBorder from "./SpanBorder";
import ModalDetail from "./ModalDetail";
import axios from "axios";
import { useParams } from "react-router-dom";
import numeral from "numeral";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAuthToken, getToken } from "../../../service/Token";
import ModalBillInfoDisplay from "../../element/bill-info/ModalBillInfoDisplay";
import ModalProduct from "./ModalProduct";
import EditAddress from "../../element/edit-address/EditAddress";
import InputCallAPI from "../../element/InputCallAPI";
import moment from "moment";

const BillTimeLine = (addId) => {
  const [isModalConfirm, setIsModalConfirm] = useState(false);
  const [isModalDetail, setIsModalDetail] = useState(false);
  const [timelines, setTimelines] = useState([]);
  const [action, setAction] = useState(null);
  const [timelinePoduct, setTimelinesPoduct] = useState([]);
  const [billInfo, setBillInfo] = useState({});
  const [isOpenModalProduct, setIsOpenModalProduct] = useState(false);
  const { billId } = useParams();
  const [render, setRender] = useState(null);
  const token = getAuthToken(true);
  const [open, setOpen] = useState(false);
  const [openModalDN, setOpenModalDN] = useState(false);
  const [timlinesDisplay, setTimlneDisplay] = useState([]);
  const [pdCode, setPdCode] = useState(null);
  const [bdId, setBdId] = useState(null);
  const [noteTimeline, setNoteTimeline] = useState(null);
  const [timelineId, setTimelineId] = useState(null);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantityProduct] = useState(1);

  const handleOpen = () => {
    console.log(true);
    setOpen(true);
  };

  const handleCan = () => {
    setOpen(false);
  };

  // tạo mới timeline
  const handleCreateTimeline = async (note, status, id, paymentInDelivery) => {
    setLoading(true);
    const data = await token;
    const values = {
      timelineId: id,
      note: note,
      status: status,
      createdBy: data?.username + "_" + data?.fullName,
      paymentInDelivery: paymentInDelivery === "Unpaid" ? true : false,
    };
    await axios
      .post(`http://localhost:8080/api/admin/timeline/${billId}`, values, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setTimelines([...timelines, response.data]);
      })
      .catch((error) => {
        console.log("Data: ", error);
        const status = error.response?.status;
        const dataError = error?.response?.data;

        if (
          dataError?.message.includes(
            "Chỉ hủy hóa đơn khi đơn đang chờ xác nhận."
          )
        ) {
          notification.error({
            message: "Thông báo",
            description: "Chỉ hủy hóa đơn khi đơn hàng đang chờ xác nhận",
          });
        }
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    setRender(Math.random());
  };

  const handleUpdateBillStatus = async (status, price, timelineStatus) => {
    setLoading(true);
    await axios
      .put(
        `http://localhost:8080/api/admin/bill`,
        {
          id: billId,
          status: status,
          amountPaid: price,
          timelineStatus: timelineStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setRender(response.data.amountPaid);
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
  };

  const showModalConfirm = () => {
    setIsModalConfirm(true);
  };

  const handleRollback = (note) => {
    let paymentInDelivery = null;
    if (billInfo?.lstPaymentDetail.length > 0) {
      if (billInfo?.lstPaymentDetail?.length === 1) {
        paymentInDelivery = billInfo?.lstPaymentDetail[0].status === "Paid";
      }

      if (billInfo?.lstPaymentDetail?.length === 2) {
        paymentInDelivery =
          billInfo?.lstPaymentDetail[0].status === "Paid" &&
          billInfo?.lstPaymentDetail[1].status === "Paid";
      }
    }
    handleCreateTimeline(
      noteTimeline,
      `2Cancel`,
      timelineId,
      paymentInDelivery
    );
    setTimeout(() => {
      handleCreateTimeline(note, `Rollback`, null, paymentInDelivery);
    }, 1000);
    setIsModalConfirm(false);
  };

  const handleCancelConfirm = () => {
    setIsModalConfirm(false);
  };

  const handleOkConFirm = (note) => {
    setLoading(true);
    // loại bỏ status Update
    const includesStatus = [
      "Update",
      "Delete",
      "2Cancel",
      "Rollback",
      "Cancel",
    ];
    const newTimelines = timelines.filter(
      (e) => !includesStatus.includes(e.status)
    );
    const timelinesSortDate = newTimelines.sort((a, b) => {
      const dateA = new Date(a.createdDate).toISOString();
      const dateB = new Date(b.createdDate).toISOString();

      if (dateA > dateB) return -1;
      if (dateA < dateB) return 1;
      return 0;
    });

    let timelineStatus = "";
    switch (action) {
      case "confirm":
        let numberStatus = Number(timelinesSortDate[0].status);
        timelineStatus = numberStatus + 1;
        break;
      case "cancel":
        timelineStatus = "0";
        break;
      case "Delete":
        timelineStatus = "Delete";
        break;
      case "rollback":
        timelineStatus = "Rollback";
        break;
      case "2Cancel":
        timelineStatus = "2Cancel";
        break;
      default:
        break;
    }

    let billStatus = "";
    let statusTimeline = String(Number(timelinesSortDate[0].status) + 1);
    if (billInfo.symbol === "Shipping") {
      if (action === "cancel" || action === "0") {
        billStatus = "Cancel";
      }
      switch (statusTimeline) {
        case "1":
          billStatus = "wait_for_confirm";
          break;
        case "2":
          billStatus = "wait_for_delivery";
          break;
        case "3":
          billStatus = "delivering";
          break;
        case "4":
          billStatus = "Complete";
          break;
        default:
          break;
      }
    } else {
      if (statusTimeline === "1") {
        billStatus = "wait_for_confirm";
      } else {
        billStatus = "Complete";
      }
    }
    handleCreateTimeline(note, timelineStatus, null);
    handleUpdateBillStatus(billStatus, billInfo?.amountPaid, statusTimeline);
    setIsModalConfirm(false);
  };

  const showModalDetail = () => {
    setIsModalDetail(true);
  };

  const handleOkDetail = () => {
    setIsModalDetail(false);
  };
  const getTimeline = async () => {
    await axios
      .get(`http://localhost:8080/api/admin/timeline/${billId}`, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        if (response.data) {
          var timelinesPush = [];
          for (let index = 0; index < response.data.length; index++) {
            if (!isNaN(response.data[index]?.status)) {
              timelinesPush.push(response.data[index]);
            }
          }
          setTimlneDisplay(timelinesPush);
          setTimelines(response.data);
          return true;
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
  };

  const getProduct = async () => {
    await axios
      .get(`http://localhost:8080/api/admin/timeline/${billId}/product`, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setTimelinesPoduct(response?.data);
        return true;
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
  };

  const getInfo = async () => {
    await axios
      .get(`http://localhost:8080/api/admin/timeline/${billId}/info`, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setBillInfo(response?.data);
        setShippingPrice(numeral(response?.data?.shipPrice));
        setLoading(false)
        return true;
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
  };
  useEffect(() => {
    const isTimeline = getTimeline();
    const isProduct = getProduct();
    const isInfo = getInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billId, render, isModalConfirm, loading]);

  const updateQUantityBillDetail = async (record, value, index) => {
    setLoading(true);

    let quantityOld = timelinePoduct[index].quantity;
    if (value - record.quantity > record.productQuantity) {
      notification.warning({
        message: "Thông báo",
        description: "Đã vượt quá số lượng tồn",
        duration: 1,
      });
      setLoading(false);
      return;
    }

    if (Number(value) === Number(record?.quantity)) {
      setLoading(false);
      return;
    }

    await axios
      .post(
        `http://localhost:8080/api/admin/bill-detail/create-bill-detail`,
        {
          billId: record.billId,
          billDetailId: record.billDetailId,
          productDetailId: record.productDetailId,
          quantity: value,
          price: record.productPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        let paymentInDelivery = null;
        if (billInfo?.lstPaymentDetail.length > 0) {
          if (billInfo?.lstPaymentDetail?.length === 1) {
            paymentInDelivery = billInfo?.lstPaymentDetail[0].status === "Paid";
          }

          if (billInfo?.lstPaymentDetail?.length === 2) {
            paymentInDelivery =
              billInfo?.lstPaymentDetail[0].status === "Paid" &&
              billInfo?.lstPaymentDetail[1].status === "Paid";
          }
        }
        notification.success({
          message: "Thông báo",
          description: "Cập nhật thành công",
          duration: 2,
        });
        setLoading(false);
        handleCreateTimeline(
          `Cập nhật sản phẩm: ${record?.productName} |  ${
            Number(value) > Number(quantityOld)
              ? `Tăng ${Math.abs(Number(quantityOld) - Number(value))} số lượng`
              : `Giảm ${Math.abs(Number(quantityOld) - Number(value))} số lượng`
          } `,
          "Update",
          null,
          paymentInDelivery
        );
        setRender(Math.random());
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          message: "Thông báo",
          description: "Đã xảy ra lỗi, vui lòng thử lại",
          duration: 2,
        });
      });
  };

  const handleDeleteBillDetail = async (pdCode, bdID, note) => {
    setLoading(true);
    handleCreateTimeline(note + " | " + pdCode, "Delete", null);
    await axios
      .delete(
        `http://localhost:8080/api/admin/bill-detail?billId=${billId}&billDetailId=${bdID}`,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        notification.success({
          message: "Thông báo",
          description: "Xóa thành thành công!",
          duration: 2,
        });
        setLoading(false);
        setRender(Math.random());
      })
      .catch((err) => {
        console.log("Data: ", err);
        setLoading(false);
      });
    setIsModalConfirm(false);
    setRender(Math.random());
  };

  const columnProduct = [
    {
      title: "#",
      dataIndex: "index",
      key: "stt",
      width: 70,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      key: "productName",
      title: "Sản phẩm",
      width: "50%",
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={4}>
              {record.promotionMethod && record.promotionValue ? (
                <Badge.Ribbon
                  text={`Giảm ${
                    record?.promotionValue
                      ? record.promotionMethod === "%"
                        ? record.promotionValue + " " + record.promotionMethod
                        : record.promotionValue.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })
                      : null
                  }`}
                  color="red"
                >
                  <Carousel autoplay className={styles.slider}>
                    {record?.productImageResponses &&
                      record?.productImageResponses?.map(
                        (productImage, index) => {
                          return (
                            <img
                              key={index}
                              style={{ width: "100px" }}
                              alt="abc"
                              src={productImage?.path}
                            />
                          );
                        }
                      )}
                  </Carousel>
                </Badge.Ribbon>
              ) : (
                <Carousel autoplay className={styles.slider}>
                  {record?.productImageResponses &&
                    record?.productImageResponses?.map(
                      (productImage, index) => {
                        return (
                          <img
                            key={index}
                            style={{ width: "100px" }}
                            alt="abc"
                            src={productImage?.path}
                          />
                        );
                      }
                    )}
                </Carousel>
              )}
            </Col>

            <Col span={20}>
              <div
                className="m-5"
                style={{
                  textAlign: "start",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontWeight: "500" }}>
                  {record?.productName +
                    "-" +
                    record?.productButton +
                    "-" +
                    record?.productMaterial +
                    "-" +
                    record?.productCollar +
                    "-" +
                    record?.productSleeve +
                    "-" +
                    record?.productShirtTail +
                    "-" +
                    record?.productPatternName +
                    "-" +
                    record?.productFormName}
                </span>
                <br />
                <div className={styles.optionColor}>
                  <b>Màu sắc: </b>
                  <span
                    style={{
                      backgroundColor: record?.productColor,
                      marginLeft: "8px",
                    }}
                  ></span>
                  {record?.productColorName}
                </div>
                <br />
                <b>Kích cỡ: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {record?.productSize}
                </span>
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unitType",
      key: "unitType",
      render: () => {
        return "Cái";
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record, index) => {
        let conditionDisable = false;

        if (
          billInfo?.status !== "wait_for_confirm" ||
          billInfo?.lstPaymentDetail[0]?.status === "Paid"
        ) {
          conditionDisable = true;
        }
        return (
          <InputNumber
            min={1}
            max={record >= record?.productQuantity}
            value={record?.quantity}
            onBlur={(e) => {
              if (e?.target?.value > 0) {
                updateQUantityBillDetail(record, e?.target?.value, index);
              } else {
                notification.error({
                  message: "Thông báo",
                  description: "Số lượng không được nhỏ hơn hoặc bằng 0",
                });
              }
            }}
            disabled={conditionDisable}
          />
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "productPrice",
      key: "productPrice",
      render: (price) => {
        return price?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      title: "Thao tác",
      key: "productPrice",
      render: (_, record) => {
        return (
          <>
            <Space size="middle">
              <Button
                icon={<DeleteOutlined />}
                danger
                href="#1"
                key={record.key}
                onClick={() => {
                  setPdCode(record?.productCode);
                  setBdId(record?.billDetailId);
                  setIsModalConfirm(true);
                  setAction("Delete");
                  setQuantityProduct(1);
                }}
                disabled={
                  Number(
                    timlinesDisplay[timlinesDisplay?.length - 1]?.status
                  ) !== 1 || timelinePoduct?.length === 1
                }
              ></Button>
            </Space>
          </>
        );
      },
    },
  ];

  const handleChangeShippingPrice = (value) => {
    setShippingPrice(value);
  };

  return (
    <>
      <Spin size="large" spinning={loading} tip={"Vui lòng chờ"}>
        <section className={styles.background}>
          <div style={{ overflowX: "scroll" }}>
            <div style={{ width: "fit-content" }}>
              {billInfo?.symbol !== "Received" ? (
                <Timeline minEvents={6} placeholder className={styles.timeLine}>
                  {timlinesDisplay &&
                    timlinesDisplay.map((data, index) => (
                      <TimelineEvent
                        key={index}
                        color={
                          data?.status === "0" || data?.status === "-1"
                            ? "#FF0000"
                            : data?.status === "5"
                            ? "#f0ad4e"
                            : "#00cc00"
                        }
                        icon={
                          data?.status === "1"
                            ? FaRegFileAlt
                            : data?.status === "0"
                            ? FaTimes
                            : data?.status === "2"
                            ? FaRegFileAlt
                            : data?.status === "3"
                            ? FaTruck
                            : CheckCircleOutlined
                        }
                        title={
                          data?.status === "0" ? (
                            <h3>Đã hủy</h3>
                          ) : data?.status === "1" ? (
                            <h3>Chờ xác nhận</h3>
                          ) : data?.status === "2" ? (
                            <h3>Chờ giao hàng</h3>
                          ) : data?.status === "3" ? (
                            <h3>
                              Đã đóng gói & <br /> đang được giao
                            </h3>
                          ) : data?.status === "4" ? (
                            <h3>Giao hàng thành công</h3>
                          ) : data?.status === "5" ? (
                            <h3>yêu cầu trả hàng</h3>
                          ) : data?.status === "-1" ? (
                            <h3>Trả hàng thất bại</h3>
                          ) : (
                            <h3>Trả hàng thành công</h3>
                          )
                        }
                        subtitle={data?.createdDate}
                      />
                    ))}
                </Timeline>
              ) : (
                <Timeline minEvents={2} placeholder className={styles.timeLine}>
                  {timlinesDisplay &&
                    timlinesDisplay.map((data, index) => (
                      <TimelineEvent
                        key={index}
                        color={
                          data?.status === "0"
                            ? "#FF0000"
                            : data?.status === "3"
                            ? "#f0ad4e"
                            : "#00cc00"
                        }
                        icon={
                          data?.status === "1"
                            ? FaRegFileAlt
                            : data?.status === "0"
                            ? FaTimes
                            : data?.status === "2"
                            ? FaRegCheckCircle
                            : data?.status === "3"
                            ? FaClock
                            : data?.status === "4"
                            ? FaRocket
                            : null
                        }
                        title={
                          data?.status === "1"
                            ? "Chờ xác nhận"
                            : data?.status === "2"
                            ? "Thanh toán thành công"
                            : data?.status === "0"
                            ? "Đã hủy"
                            : ""
                        }
                        subtitle={data.createdDate}
                      />
                    ))}
                </Timeline>
              )}
            </div>
          </div>
          <div className={styles.btnHeader} style={{ marginTop: 24 }}>
            {billInfo?.symbol !== "Received" &&
              String(timelines[timelines?.length - 1]?.status) !== "4" &&
              String(timelines[timelines?.length - 1]?.status) !== "5" &&
              String(timelines[timelines?.length - 1]?.status) !== "0" &&
              String(timelines[timelines?.length - 1]?.status) !== "6" && (
                <>
                  <Button
                    type="primary"
                    onClick={() => {
                      setAction("confirm");
                      showModalConfirm();
                    }}
                  >
                    Xác nhận
                  </Button>
                </>
              )}
            {billInfo?.billType === "Online" &&
              Number(timelines[timelines?.length - 1]?.status) === 2 && (
                <Button
                  style={{ marginLeft: "10px" }}
                  type="primary"
                  onClick={() => {
                    setNoteTimeline(timelines[timelines?.length - 1]?.note);
                    setTimelineId(timelines[timelines?.length - 1]?.id);
                    setAction("rollback");
                    showModalConfirm();
                  }}
                >
                  Quay trở lại xác nhận
                </Button>
              )}
            {billInfo?.symbol !== "Received" &&
              String(timelines[timelines?.length - 1]?.status) !== "3" &&
              String(timelines[timelines?.length - 1]?.status) !== "4" &&
              String(timelines[timelines?.length - 1]?.status) !== "0" &&
              String(timelines[timelines?.length - 1]?.status) !== "6" && (
                <Button
                  type="primary"
                  danger
                  style={{ margin: "0 10px" }}
                  onClick={() => {
                    setAction("cancel");
                    showModalConfirm();
                  }}
                >
                  Hủy
                </Button>
              )}
            <ModalConfirm
              isModalOpen={isModalConfirm}
              handleCancel={handleCancelConfirm}
              handleOk={(note) =>
                action === "Delete"
                  ? handleDeleteBillDetail(pdCode, bdId, note)
                  : action === "rollback"
                  ? handleRollback(note)
                  : handleOkConFirm(note)
              }
              action={action}
            />
            {timelines?.length >= 2 && (
              <Button
                onClick={handleOpen}
                className={styles.btnPdf}
                type="primary"
              >
                Xuất hóa đơn
              </Button>
            )}
            <ModalBillInfoDisplay
              open={open}
              cancel={handleCan}
              billCode={billInfo?.billCode}
            />
            <Button
              className={styles.btnWarning}
              onClick={() => showModalDetail()}
            >
              Chi tiết
            </Button>
            <div>
              <ModalDetail
                timelineDetail={timelines}
                isModalOpen={isModalDetail}
                handleCancel={handleOkDetail}
                handleOk={handleOkDetail}
                symbol={billInfo?.symbol}
              />
            </div>
          </div>
        </section>

        <section className={styles.background} style={{ marginTop: "20px" }}>
          <Row>
            <Col span={21}>
              <h2>Thông tin đơn hàng</h2>
            </Col>
            {billInfo?.symbol === "Shipping" &&
              Number(timlinesDisplay[timlinesDisplay?.length - 1]?.status) ===
                1 &&
              billInfo?.status === "wait_for_confirm" && (
                <Col span={3}>
                  <Button
                    type="primary"
                    onClick={() => setOpenModalDN(true)}
                    disabled={
                      billInfo?.lstPaymentDetail?.length === 1 ||
                      billInfo?.lstPaymentDetail?.length === 2
                        ? billInfo?.lstPaymentDetail[0].status === "Paid"
                        : false
                    }
                  >
                    Sửa thông tin
                  </Button>
                  {openModalDN && (
                    <EditAddress
                      isModalOpen={openModalDN}
                      handleAddressCancel={() => setOpenModalDN(false)}
                      setRender={setRender}
                      addressId={billInfo?.addressId}
                      billId={billInfo?.billId}
                      totalPrice={billInfo?.totalPrice}
                    />
                  )}
                </Col>
              )}
          </Row>
          <Divider
            className={styles.blackDivider}
            style={{ marginTop: "10px" }}
          />
          <Row>
            <Col span={12}>
              <Row>
                <Col span={12} className={styles.padding}>
                  <span>Mã đơn hàng</span>
                </Col>
                <Col span={12}>
                  <div className={`${styles.elementDiv}`}>
                    <span>{billInfo?.billCode}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={12} className={styles.padding}>
                  <span>Hình thức mua hàng</span>
                </Col>
                <Col span={12}>
                  <div className={`${styles.elementDiv}`}>
                    <span>
                      {billInfo?.billType === "In-Store"
                        ? "Tại quầy"
                        : "Trực tuyến"}
                    </span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={12} className={styles.padding}>
                  <span>Ngày mua hàng</span>
                </Col>
                <Col span={12}>
                  <div className={`${styles.elementDiv}`}>
                    <span>{billInfo?.createdDate}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={12} className={styles.padding}>
                  <span>Mã giao dịch</span>
                </Col>
                <Col span={12}>
                  <div className={`${styles.elementDiv}`}>
                    <span>
                      {billInfo?.transaction || "Không có mã giao dịch"}
                    </span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col span={12} className={styles.padding}>
                  <span>Phương thức thanh toán</span>
                </Col>
                <Col span={12}>
                  <div className={`${styles.elementDiv}`}>
                    <span>
                      {(billInfo?.lstPaymentDetail?.length > 1
                        ? "Tiền mặt + Chuyển khoản"
                        : billInfo?.lstPaymentDetail?.length === 1
                        ? billInfo?.lstPaymentDetail[0].paymentName === "Cash"
                          ? "Tiền mặt"
                          : "Chuyển khoản"
                        : "") || "__"}
                    </span>
                  </div>
                </Col>
              </Row>
              {billInfo?.symbol === "Shipping" && (
                <>
                  <Row>
                    <Col span={12} className={styles.padding}>
                      <span>Hình thức giao hàng </span>
                    </Col>
                    <Col span={12}>
                      <div className={`${styles.elementDiv}`}>
                        <span>{"Giao hàng tại nhà"}</span>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12} className={styles.padding}>
                      <span>Ngày nhận hàng dự kiến</span>
                    </Col>
                    <Col span={12}>
                      <div className={`${styles.elementDiv}`}>
                        <span>
                          {billInfo?.shipDate || "<Không có dữ liệu>"}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </>
              )}
            </Col>
            <Col span={11}>
              <Row>
                <Col span={24}>
                  <Row>
                    <Col span={10} className={styles.padding}>
                      <h6>Tên khách hàng</h6>
                    </Col>
                    <Col span={14}>
                      <div className={`${styles.elementDiv} ${styles.size}`}>
                        <span>
                          {billInfo?.billType !== "In-Store"
                            ? billInfo?.fullName
                              ? billInfo?.fullName
                              : billInfo?.accountName
                            : "Khách hàng mua tại quầy"}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={10} className={styles.padding}>
                      <span>Số điện thoại</span>
                    </Col>
                    <Col span={14}>
                      <div className={`${styles.elementDiv} ${styles.size}`}>
                        <span>
                          {billInfo?.phoneNumber || "Không có dữ liệu"}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={10} className={styles.padding}>
                      <span>Địa chỉ</span>
                    </Col>
                    <Col span={14}>
                      <div className={`${styles.elementDiv} ${styles.size}`}>
                        <span>
                          {billInfo?.ward
                            ? `${billInfo?.addressDetaill},  
                                        ${billInfo?.ward?.substring(
                                          0,
                                          billInfo?.ward?.indexOf("|")
                                        )}, 
                                        ${billInfo?.district?.substring(
                                          0,
                                          billInfo?.district?.indexOf("|")
                                        )}, 
                                        ${billInfo?.city?.substring(
                                          0,
                                          billInfo?.city?.indexOf("|")
                                        )}`
                            : "Không có dữ liệu"}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={10} className={styles.padding}>
                      <span>Số tiền khách trả</span>
                    </Col>
                    <Col span={14}>
                      <div className={`${styles.elementDiv} ${styles.size}`}>
                        <span>
                          {billInfo?.lstPaymentDetail?.length >= 1
                            ? billInfo?.lstPaymentDetail[0]?.status === "Paid"
                              ? billInfo?.lstPaymentDetail[0]?.paymentName ===
                                "Credit Card"
                                ? numeral(
                                    billInfo?.lstPaymentDetail[0]?.price
                                  ).format("0,0") +
                                  " đ " +
                                  "(Chuyển khoản)"
                                : numeral(
                                    billInfo?.lstPaymentDetail[0]?.price
                                  ).format("0,0") +
                                  " đ " +
                                  "(Tiền mặt)"
                              : "Thanh toán khi nhận hàng"
                            : null}
                        </span>
                        {billInfo?.lstPaymentDetail?.length > 1 && (
                          <span> | </span>
                        )}
                        <span>
                          {billInfo?.lstPaymentDetail?.length === 2
                            ? billInfo?.lstPaymentDetail[1]?.paymentName ===
                              "Credit Card"
                              ? numeral(
                                  billInfo?.lstPaymentDetail[1]?.price
                                ).format("0,0") +
                                " đ " +
                                "(Chuyển khoản)"
                              : numeral(
                                  billInfo?.lstPaymentDetail[1]?.price
                                ).format("0,0") +
                                " đ " +
                                "(Tiền mặt)"
                            : null}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={24}>
                  <Row>
                    <Col span={10} className={styles.padding}>
                      <span>Tiền thừa</span>
                    </Col>
                    <Col span={14}>
                      <div className={`${styles.elementDiv} ${styles.size}`}>
                        <span>
                          {billInfo?.lstPaymentDetail?.length === 2 &&
                            (billInfo?.lstPaymentDetail[0]?.price +
                              billInfo?.lstPaymentDetail[1]?.price -
                              billInfo?.amountPaid >
                            0
                              ? billInfo?.lstPaymentDetail[0]?.price +
                                billInfo?.lstPaymentDetail[1]?.price -
                                billInfo?.amountPaid
                              : 0
                            ).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}

                          {billInfo?.lstPaymentDetail?.length === 1 &&
                            (billInfo?.lstPaymentDetail[0]?.price -
                              billInfo?.amountPaid >
                            0
                              ? billInfo?.lstPaymentDetail[0]?.price -
                                billInfo?.amountPaid
                              : "Không có tiền thừa"
                            ).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                        </span>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </section>

        <section className={styles.background} style={{ marginTop: "20px" }}>
          <Row>
            <Col span={21}>
              <h2>Sản phẩm đã mua</h2>
            </Col>
            {billInfo?.symbol === "Shipping" &&
              (timelines[timelines?.length - 1]?.status === "1" ||
                timelines[timelines?.length - 1]?.status === "Update" ||
                timelines[timelines?.length - 1]?.status === "Delete" ||
                timelines[timelines?.length - 1]?.status === "Confirm" ||
                timelines[timelines?.length - 1]?.status === "Rollback") &&
              billInfo?.status !== "Paid" && (
                <Col span={3}>
                  <Button
                    type="primary"
                    onClick={() => setIsOpenModalProduct(true)}
                    disabled={
                      billInfo?.lstPaymentDetail?.length === 1 ||
                      billInfo?.lstPaymentDetail?.length === 2
                        ? billInfo?.lstPaymentDetail[0].status === "Paid"
                        : false
                    }
                  >
                    Thêm sản phẩm
                  </Button>
                  <ModalProduct
                    visible={isOpenModalProduct}
                    onCancel={() => setIsOpenModalProduct(false)}
                    render={setRender}
                    cartId={null}
                    billId={billId}
                    isEditProductTimeLine={true}
                    quantity={quantity}
                    setQuantity={setQuantityProduct}
                  />
                </Col>
              )}
          </Row>
          <Divider
            className={styles.blackDivider}
            style={{ marginTop: "10px" }}
          />
          <Table
            columns={columnProduct}
            dataSource={
              timelinePoduct &&
              timelinePoduct?.map((record, index) => ({
                ...record,
                key: record?.billDetailId,
              }))
            }
            pagination={false}
          />
          <div className={styles.timeLineEnd}>
            <span className={styles.span}>
              <span
                style={{
                  width: "198px",
                  display: "inline-block",
                  color: "#111111",
                  fontWeight: "500",
                }}
              >
                Thành tiền:
              </span>
              <span>{numeral(billInfo?.totalPrice).format("0,0") + "đ"}</span>
            </span>
            <span className={styles.span}>
              <span
                style={{
                  width: "198px",
                  display: "inline-block",
                  color: "#111111",
                  fontWeight: "500",
                }}
              >
                Phí vận chuyển:
              </span>
              <span>
                <InputCallAPI
                  totalPrice={billInfo?.totalPrice}
                  currentValue={numeral(shippingPrice).format("0,0")}
                  onChange={handleChangeShippingPrice}
                  isCallAPI={true}
                  url={
                    "http://localhost:8080/api/admin/delivery-note/updateShippingPrice"
                  }
                  billId={billInfo?.billId}
                  currentPrice={billInfo?.shipPrice}
                  handleCreateTimeline={handleCreateTimeline}
                  billStatus={billInfo?.status}
                  isPaid={
                    billInfo?.lstPaymentDetail?.length > 0 &&
                    billInfo?.lstPaymentDetail?.length === 1
                      ? billInfo?.lstPaymentDetail[0]?.status === "Paid"
                      : billInfo?.lstPaymentDetail?.length === 2
                      ? billInfo?.lstPaymentDetail[0]?.status === "Paid" &&
                        billInfo?.lstPaymentDetail[1]?.status === "Paid"
                      : false
                  }
                />
              </span>
            </span>
            <span className={styles.span}>
              <span
                style={{
                  width: "200px",
                  display: "inline-block",
                  color: "#111111",
                  fontWeight: "500",
                }}
              >
                Giảm giá:
              </span>
              <span>{numeral(billInfo?.priceReduce)?.format("0,0") + "đ"}</span>
            </span>
            <b className={styles.span}>
              <span style={{ width: "200px", display: "inline-block" }}>
                Tổng cộng:{" "}
              </span>
              <span style={{ fontSize: "16px", color: "#FF0000" }}>
                {billInfo?.amountPaid?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </b>
          </div>
        </section>
      </Spin>
    </>
  );
};

export default BillTimeLine;
