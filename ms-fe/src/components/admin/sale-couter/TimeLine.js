import { Button, Carousel, Col, Divider, Row, Table, notification } from "antd";
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
import moment from "moment";
import numeral from "numeral";
import { CheckCircleOutlined } from "@ant-design/icons";
import { getAuthToken, getToken } from "../../../service/Token";
import ModalBillInfoDisplay from "../../element/bill-info/ModalBillInfoDisplay";
import ModalProduct from "./ModalProduct";

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

    // tạo mới timeline
    const handleCreateTimeline = async (note, stauts) => {
        const data = await token;
        const values = {
            note: note,
            status: stauts,
            createdBy: data?.username + "_" + data?.fullName,
        };
        await axios
            .post(`http://localhost:8080/api/admin/timeline/${billId}`, values, {
                headers: {
                    Authorization: `Bearer ${getToken(true)}`,
                },
            })
            .then((response) => {
                setTimelines([...timelines, response.data]);
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
            });
    };

    const handleUpdateBillStatus = (status, price) => {
        axios
            .put(
                `http://localhost:8080/api/admin/bill/${billId}`,
                {
                    status: status,
                    amountPaid: price,
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

    const handleUpdateBillDetailStatus = (request, status) => {
        axios
            .put(
                `http://localhost:8080/api/admin/bill/billDetail/change-status?status=` +
                status,
                request,

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

    const handleCancelConfirm = () => {
        setIsModalConfirm(false);
    };
    console.log(billInfo)
    const handleOkConFirm = (note) => {
        handleCreateTimeline(note, action === "cancel" ? "0" : null);
        // if (
        // billInfo.symbol === "Shipping" &&
        // timelines.length === 3 &&
        // billInfo.status !== "Paid"
        // ) {
        handleUpdateBillStatus(
            action === "cancel"
                ? "Cancel"
                : (billInfo.symbol === "Received" &&
                    timelines[timelines.length - 1] === "2" &&
                    action !== "cancel") ||
                    (billInfo.symbol === "Shipping" &&
                        timelines[timelines.length - 1].status === "3"
                        && action !== "cancel")
                    ? "Complete"
                    : billInfo.symbol === "Shipping" && billInfo.status === "Paid"
                        ? "Paid" : 'Unpaid',
            action === "cancel" ? 0 : (billInfo.symbol === "Received" &&
                timelines[timelines.length - 1] === "2" &&
                action !== "cancel") ||
                (billInfo.symbol === "Shipping" &&
                    timelines[timelines.length - 1].status === "3"
                    && action !== "cancel")
                ? billInfo.totalPrice + billInfo?.shipPrice - billInfo.priceReduce
                : billInfo.symbol === "Shipping" && billInfo.status === "Paid"
                    ? billInfo.totalPrice + billInfo?.shipPrice - billInfo.priceReduce
                    : 0
        );
        // }
        setIsModalConfirm(false);
    };
    const showModalDetail = () => {
        setIsModalDetail(true);
    };

    const handleOkDetail = () => {
        setIsModalDetail(false);
    };

    // const handleOpenModalProduct = () => {
    //     setIsOpenModalProduct(true)
    // }

    // const handleCancelModaleProduct = () => {
    //     setIsOpenModalProduct(false)
    // }

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/admin/timeline/${billId}`, {
                headers: {
                    Authorization: `Bearer ${getToken(true)}`,
                },
            })
            .then((response) => {
                setTimelines(response.data);
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
        axios
            .get(`http://localhost:8080/api/admin/timeline/${billId}/product`, {
                headers: {
                    Authorization: `Bearer ${getToken(true)}`,
                },
            })
            .then((response) => {
                setTimelinesPoduct(response.data);
            })
            .catch((error) => {
                console.log(error);
                const status = error.response.status;
                if (status === 403) {
                    notification.error({
                        message: "Thông báo",
                        description: "Bạn không có quyền truy cập!",
                    });
                }
            });
        axios
            .get(`http://localhost:8080/api/admin/timeline/${billId}/info`, {
                headers: {
                    Authorization: `Bearer ${getToken(true)}`,
                },
            })
            .then((response) => {
                console.log(response)
                setBillInfo(response.data);
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
    }, [billId, render]);

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
                            <Carousel autoplay className={styles.slider}>
                                {record.productImageResponses &&
                                    record.productImageResponses.map((productImage, index) => {
                                        return (
                                            <img
                                                key={index}
                                                style={{ width: "100px" }}
                                                alt="abc"
                                                src={productImage.path}
                                            />
                                        );
                                    })}
                            </Carousel>
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
                                    {record.productName +
                                        "-" +
                                        record.productButton +
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
                                <br />
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
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
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
    ];

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        console.log(true)
        setOpen(true)
    }

    const handleCan = () => {
        setOpen(false)
    }

    return (
        <>
            <ModalBillInfoDisplay open={open} cancel={handleCan} billCode={billInfo.billCode} />
            <section className={styles.background}>
                <div style={{ overflowX: "scroll" }}>
                    <div style={{ width: "fit-content" }}>
                        {billInfo?.symbol !== "Received" ? (
                            <Timeline minEvents={6} placeholder className={styles.timeLine}>
                                {timelines &&
                                    timelines.map((data) => (
                                        <TimelineEvent
                                            color={data.status === "0" ? "#FF0000" : "#00cc00"}
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
                                                ) : (
                                                    <h3>Giao hàng thành công</h3>
                                                )
                                            }
                                            subtitle={data.createdDate}
                                        />
                                    ))}
                            </Timeline>
                        ) : (
                            <Timeline minEvents={2} placeholder className={styles.timeLine}>
                                {timelines &&
                                    timelines.map((data) => (
                                        <TimelineEvent
                                            color={
                                                data.status === "0"
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
                                                data.status === "1"
                                                    ? "Chờ xác nhận"
                                                    : data.status === "2"
                                                        ? "Thanh toán thành công"
                                                        : data.status === "0"
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
                    {billInfo?.symbol === "Received" &&
                        timelines.length !== 2 &&
                        timelines.length !== 4 && (
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
                            </>
                        )}
                    {billInfo?.symbol !== "Received" &&
                        timelines.length !== 4 &&
                        timelines.length !== 5 &&
                        timelines[timelines.length - 1]?.status !== "0" && (
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
                    {billInfo?.symbol !== "Received" &&
                        timelines.length !== 3 &&
                        timelines.length !== 4 &&
                        timelines[timelines.length - 1]?.status !== "0" && (
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
                        handleOk={handleOkConFirm}
                    />

                    {timelines.length === 2 && <Button onClick={handleOpen}
                        className={styles.btnPdf}
                        type="primary">
                        Xuất hóa đơn
                    </Button>}
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
                            symbol={billInfo.symbol}
                        />
                    </div>
                </div>
            </section>

            <section className={styles.background} style={{ marginTop: "20px" }}>
                <Row>
                    <Col span={12}>
                        <h2>Thông tin đơn hàng</h2>
                    </Col>
                </Row>
                <Divider
                    className={styles.blackDivider}
                    style={{ marginTop: "10px" }}
                />
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <span>Mã đơn hàng</span>
                            </Col>
                            <Col span={12}>
                                <SpanBorder child={billInfo.billCode} color={"#1677ff"} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span>Hình thức mua hàng</span>
                            </Col>
                            <Col span={12}>
                                <SpanBorder
                                    child={
                                        billInfo.billType === "In-store" ? "Tại quầy" : "Trực tuyến"
                                    }
                                    color={"#1677ff"}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span>Ngày mua hàng</span>
                            </Col>
                            <Col span={12}>
                                <SpanBorder child={billInfo.createdDate} color={"#1677ff"} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span>Mã giao dịch</span>
                            </Col>
                            <Col span={12}>
                                <SpanBorder
                                    child={billInfo?.transaction || "__"}
                                    color={"#1677ff"}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span>Phương thức thanh toán</span>
                            </Col>
                            <Col span={12}>
                                <SpanBorder
                                    child={billInfo?.paymentName || "__"}
                                    color={"#1677ff"}
                                />
                            </Col>
                        </Row>
                        {billInfo.symbol === "Shipping" && (
                            <>
                                <Row>
                                    <Col span={12}>
                                        <span>Hình thức giao hàng </span>
                                    </Col>
                                    <Col span={12}>
                                        <SpanBorder child={"Giao hàng tại nhà"} color={"gray"} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <span>Ngày nhận hàng dự kiến</span>
                                    </Col>
                                    <Col span={12}>
                                        <span>
                                            {moment(billInfo?.shipDate).format("DD/MM/YYYY") || "__"}
                                        </span>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Col>
                    <Col span={11}>
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={10}>
                                        <h6>Tên khách hàng</h6>
                                    </Col>
                                    <Col span={14}>
                                        <span>{billInfo.fullName || "khách lẻ"}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={10}>
                                        <span>Số diện thoại</span>
                                    </Col>
                                    <Col span={14}>
                                        <span>{billInfo.phoneNumber || "__"}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={10}>
                                        <span>Địa chỉ</span>
                                    </Col>
                                    <Col span={14}>
                                        <span>
                                            {billInfo?.address?.replace(/[0-9|-]/g, "") || "__"}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={10}>
                                        <span>Số tiền khách trả</span>
                                    </Col>
                                    <Col span={14}>
                                        <span>
                                            {numeral(billInfo.amountPaid).format("0,0") + "đ"}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={10}>
                                        <span>Tiền thừa</span>
                                    </Col>
                                    <Col span={14}>
                                        <span>
                                            {billInfo?.amountPaid +
                                                billInfo?.priceReduce -
                                                billInfo.shipPrice -
                                                billInfo.totalPrice <=
                                                0
                                                ? "__"
                                                : billInfo?.amountPaid +
                                                billInfo?.priceReduce -
                                                billInfo.shipPrice -
                                                billInfo.totalPrice}
                                        </span>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </section>

            {/* <section className={styles.background} style={{ marginTop: '20px' }}>
                <Row>
                    <Col span={12}>
                        <h2>Lịch sử thanh toán</h2>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button type='primary'>Thanh toán</Button>
                    </Col>
                </Row>
                <Divider className={styles.blackDivider} style={{ marginTop: '10px' }} />
                <Table columns={columns} dataSource={[timelines[0]]} pagination={false} />
            </section> */}

            <section className={styles.background} style={{ marginTop: "20px" }}>
                <Row>
                    <Col span={21}>
                        <h2>Sản phẩm đã mua</h2>
                    </Col>
                    <Col span={3}>
                        <Button type="primary" onClick={() => setIsOpenModalProduct(true)}>
                            Thêm sản phẩm
                        </Button>
                        <ModalProduct
                            visible={isOpenModalProduct}
                            onCancel={() => setIsOpenModalProduct(false)}
                            render={setRender}
                            cartId={null}
                            billId={billId}
                        />
                    </Col>
                </Row>
                <Divider
                    className={styles.blackDivider}
                    style={{ marginTop: "10px" }}
                />
                <Table
                    columns={columnProduct}
                    dataSource={
                        timelinePoduct &&
                        timelinePoduct.map((record, index) => ({
                            ...record,
                            key: record.billDetailId,
                        }))
                    }
                    pagination={false}
                />
                <div className={styles.timeLineEnd}>
                    <span className={styles.span}>
                        <span style={{ width: "198px", display: "inline-block" }}>
                            Thành tiền:
                        </span>
                        <span>{numeral(billInfo.totalPrice).format("0,0") + "đ"}</span>
                    </span>
                    <span className={styles.span}>
                        <span style={{ width: "198px", display: "inline-block" }}>
                            Giá vận chuyển:
                        </span>
                        <span>{numeral(billInfo.shipPrice).format("0,0") + "đ"}</span>
                    </span>
                    <span className={styles.span}>
                        <span style={{ width: "200px", display: "inline-block" }}>
                            Giảm giá:
                        </span>
                        <span>{numeral(billInfo.priceReduce)?.format("0,0") + "đ"}</span>
                    </span>
                    {billInfo.symbol === "Online" && (
                        <>
                            <span className={styles.span}>
                                <span style={{ width: "200px", display: "inline-block" }}>
                                    Phí vận chuyển:
                                </span>
                                <span>{numeral(billInfo.shipPrice)?.format("0,0") + "đ"}</span>
                            </span>
                        </>
                    )}
                    <b className={styles.span}>
                        <span style={{ width: "200px", display: "inline-block" }}>
                            Tổng cộng:{" "}
                        </span>
                        <span style={{ fontSize: "16px", color: "#FF0000" }}>
                            {numeral(
                                billInfo.totalPrice + billInfo?.shipPrice - billInfo.priceReduce
                            ).format(0, 0) + "đ"}
                        </span>
                    </b>
                </div>
            </section>
        </>
    );
};

export default BillTimeLine;
