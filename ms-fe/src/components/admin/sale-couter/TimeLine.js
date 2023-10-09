import { Button, Col, Divider, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { FaBug, FaRegCheckCircle, FaRegFileAlt, FaTimes, FaTruck } from 'react-icons/fa';
import styles from './TimeLine.module.css'
import ModalConfirm from './ModalConfirm';
import SpanBorder from './SpanBorder';
import ModalDetail from './ModalDetail';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';
import { DeleteColumnOutlined, DeleteOutlined } from '@ant-design/icons';

const BillTimeLine = () => {
    const columns = [
        {
            title: 'Mã giao dịch',
            key: 'code',
        },
        {
            title: 'Loại giao dịch',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentName',
            key: 'paymentName',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'billStatus',
            key: 'billStatus',
        },
        {
            title: 'Thời gian',
            dataIndex: 'completionDate',
            key: 'completionDate',
        },
        {
            title: 'Số tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Người xác nhận',
            dataIndex: 'createdBy',
            key: 'createdBy',
        },
    ];
    const [isModalConfirm, setIsModalConfirm] = useState(false);
    const [isModalDetail, setIsModalDetail] = useState(false);
    const [timelines, setTimelines] = useState([]);
    const [action, setAction] = useState(null);
    const [timelinePoduct, setTimelinesPoduct] = useState([]);
    const [billInfo, setBillInfo] = useState({});
    const { billId } = useParams();

    // tạo mới timeline
    const handleCreateTimeline = async (note, stauts) => {
        const values = { note: note, status: stauts };
        await axios.post(`http://localhost:8080/api/admin/timeline/${billId}`,
            values)
            .then((response) => {
                setTimelines([...timelines, response.data])
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const showModalConfirm = () => {
        setIsModalConfirm(true);
    };

    const handleCancelConfirm = () => {
        setIsModalConfirm(false)
    }

    const handleOkConFirm = (note) => {
        handleCreateTimeline(note, action === 'cancel' ? '0' : null);
        setIsModalConfirm(false);
        console.log('ahihi' + action)
    };

    const showModalDetail = () => {
        setIsModalDetail(true);
    };

    const handleOkDetail = () => {
        setIsModalDetail(false);
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/api/admin/timeline/${billId}`)
            .then((response) => {
                setTimelines(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        axios.get(`http://localhost:8080/api/admin/timeline/${billId}/product`)
            .then((response) => {
                setTimelinesPoduct(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
        axios.get(`http://localhost:8080/api/admin/timeline/${billId}/info`)
            .then((response) => {
                setBillInfo(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [billId])

    console.log('d', timelinePoduct?.imgDefault)
    const columnProduct = [
        {
            title: 'Sản phẩm',
            key: 'product',
            render: (_, record, index) => {
                return (
                    <Row>
                        <Col span={6}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "100%",
                                }}
                            >
                                <img
                                    src={record.imgDefault === null ?
                                        "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg"
                                        : record.imgDefault
                                    }
                                    width={"100%"}
                                    alt=""
                                />
                            </div>
                        </Col>
                        <Col span={18}>
                            <h6 className={styles.fixH6}>
                                {record.productName} {" - "}
                                <span className={styles.optionColor}>
                                    <span
                                        style={{
                                            backgroundColor: record.productColor,
                                        }}
                                    ></span>
                                    {record.productColor}
                                </span>
                            </h6>
                            <div style={{ textAlign: "left", marginLeft: 20 }}>
                                <span style={{ fontWeight: 500, marginRight: 20 }}>
                                    Kích cỡ: {record.productSize}
                                </span>
                                <br />
                                <span style={{ fontWeight: 500 }}>
                                    Chất liệu: {record.productMaterial}
                                </span>
                                <br />
                                <span style={{ fontWeight: 500 }}>
                                    Nút áo: {record.productButton}
                                </span>
                                <br />
                                <span style={{ fontWeight: 500 }}>
                                    Cổ áo: {record.productCollar}
                                </span>
                                <br />
                                <span style={{ fontWeight: 500 }}>
                                    Đuôi áo: {record.productShirtTail}
                                </span>
                            </div>
                        </Col>
                    </Row>
                )
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá',
            dataIndex: 'productPrice',
            key: 'productPrice',
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => {
                return <Button
                    icon={<DeleteOutlined />}
                    danger
                ></Button>
            }
        }
    ]
    console.log('bill type', billInfo.billType)
    return (
        <>
            <section className={styles.background}>
                <div style={{ overflowX: 'scroll' }}>
                    <div style={{ width: 'fit-content' }}>
                        {billInfo?.billType === 'Online' ? (
                            <Timeline minEvents={6} placeholder className={styles.timeLine}>
                                {timelines && timelines.map((data) => (
                                    <TimelineEvent
                                        color={data.status === '0' ? '#FF0000' : '#00cc00'}
                                        icon={data.status === '1' ? (
                                            FaRegFileAlt
                                        ) : data.status === '0' ? (
                                            FaTimes
                                        ) : data.status === '2' ? (
                                            FaRegFileAlt
                                        ) : data.status === '3' ? (
                                            FaTruck
                                        ) : (
                                            FaTimes
                                        )}
                                        title={data.status === '0' ? 'Đã hủy'
                                            : data.status === '1'
                                                ? 'Tạo hóa đơn'
                                                : data.status === '2'
                                                    ? 'Xác nhận đặt hàng'
                                                    : data.status === '3'
                                                        ? 'Đã giao cho đơn vị vận chuyển' : 'Giao hàng thành công'}
                                        subtitle={moment(data.createdDate)
                                            .format("DD/MM/YYYY HH:MM")}
                                    />
                                ))}
                            </Timeline>
                        ) : (
                            <Timeline minEvents={6} placeholder className={styles.timeLine}>
                                {timelines && timelines.map((data) => (
                                    <TimelineEvent
                                        color={data.status === '0' ? '#FF0000' : '#00cc00'}
                                        icon={data.status === '1' ? (
                                            FaRegFileAlt
                                        ) : data.status === '0' ? (
                                            FaTimes
                                        ) : (
                                            FaRegCheckCircle
                                        )}
                                        title={data.status === '1' ? 'Tạo hóa đơn' : data.status === '2' ? 'Thanh toán thành công' : data.status === '0' ? 'Đã hủy' : ''}
                                        subtitle={moment(data.createdDate)
                                            .format("DD/MM/YYYY HH:MM")}
                                    />
                                ))}
                            </Timeline>
                        )}
                    </div>
                </div>
                <div className={styles.btnHeader} style={{ marginTop: 24 }}>
                    {billInfo.billType !== 'Online' && timelines.length !== 2 && (
                        <>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setAction('confirm');
                                    showModalConfirm();
                                }}
                            >
                                Xác nhận
                            </Button>
                            <Button
                                type="primary"
                                danger
                                style={{ margin: '0 10px' }}
                                onClick={() => {
                                    setAction('cancel');
                                    showModalConfirm();
                                }}
                            >
                                Hủy
                            </Button>
                        </>
                    )}
                    {console.log('timeline', timelines.length)}
                    {billInfo.billType !== 'In-store' && (timelines.length !== 3 && timelines.length !== 4) && (
                        <>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setAction('confirm');
                                    showModalConfirm();
                                }}
                            >
                                Xác nhận
                            </Button>
                            <Button
                                type="primary"
                                danger
                                style={{ margin: '0 10px' }}
                                onClick={() => {
                                    setAction('cancel');
                                    showModalConfirm();
                                }}
                            >
                                Hủy
                            </Button>
                        </>
                    )}
                    <ModalConfirm
                        isModalOpen={isModalConfirm}
                        handleCancel={handleCancelConfirm}
                        handleOk={handleOkConFirm}
                    />

                    <Button
                        className={styles.btnWarning}
                        onClick={() => showModalDetail()} >
                        Chi tiết
                    </Button>
                    <div >
                        <ModalDetail timelineDetail={timelines} isModalOpen={isModalDetail} handleCancel={handleOkDetail} handleOk={handleOkDetail} billType={billInfo.billType} />
                    </div>
                </div>
            </section >

            <section className={styles.background} style={{ marginTop: '20px' }}>
                <Row>
                    <Col span={12}>
                        <h2>Thông tin đơn hàng</h2>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button type='primary'>Cập nhật</Button>
                    </Col>
                </Row>
                <Divider className={styles.blackDivider} style={{ marginTop: '10px' }} />
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <span className={styles.span}>Mã đơn hàng</span>
                                <span className={styles.span}>Loại đơn hàng</span>
                                <span className={styles.span}>Trạng thái </span>
                                <span style={{ fontSize: '16px', display: 'block' }}>Ngày nhận hàng dự kiến</span>
                            </Col>
                            <Col span={12}>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', margin: '20px 0 20px 0' }}>
                                    <SpanBorder child={billInfo.billCode} color={'#1677ff'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', marginBottom: '20px' }}>
                                    <SpanBorder child={billInfo.billType} color={'#1677ff'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', marginBottom: '20px' }}>
                                    {
                                        billInfo.billType === 'Online' && <SpanBorder
                                            child={timelines[timelines.length - 1]?.status === '0'
                                                ? 'Đã hủy'
                                                : timelines[timelines.length - 1]?.status === '1'
                                                    ? 'Đang chờ'
                                                    : timelines[timelines.length - 1]?.status === '2'
                                                        ? 'Xác nhận thông tin'
                                                        : timelines[timelines.length - 1]?.status === '3'
                                                            ? 'Đã giao cho đơn vị vận chuyển' :
                                                            timelines[timelines.length - 1] === '4' ? 'Giao hàng thành công' : '#'}
                                            color={timelines[timelines.length - 1]?.status === '0' ? '#FF0000' : '#00cc00'} />
                                    }
                                    {
                                        billInfo.billType === 'In-store' && <SpanBorder
                                            child={timelines[timelines.length - 1]?.status === '0'
                                                ? 'Đã hủy'
                                                : timelines[timelines.length - 1]?.status === '1'
                                                    ? 'Đang chờ'
                                                    : timelines[timelines.length - 1]?.status === '2'
                                                        ? 'Thanh toán thành công'
                                                        : '#'}
                                            color={timelines[timelines.length - 1]?.status === '0' ? '#FF0000' : '#00cc00'} />
                                    }
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '50px' }}>
                                    {billInfo.billType === "Online" && (
                                        <SpanBorder child={moment(timelines[0]?.completionDate)
                                            .format('HH:MM  DD/MM/YYYY')} color={'gray'} />
                                    )}
                                    {billInfo.billType !== "Online" && "__"}
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={11}>
                        <Row>
                            <Col span={8}>
                                <span className={styles.span}>Tên khách hàng</span>
                                <span className={styles.span}>Số diện thoại</span>
                                <span className={styles.span}>Email</span>
                                <span className={styles.span}>Địa chỉ</span>
                            </Col>
                            <Col span={12}>
                                <span className={styles.span}>{billInfo.fullName || 'khách lẻ'}</span>
                                <span className={styles.span}>{billInfo.phoneNumber || '__'}</span>
                                <span className={styles.span}>{billInfo.email || '__'}</span>
                                <span style={{ fontSize: '16px', display: 'block' }}>{billInfo.address || '__'}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </section>

            <section className={styles.background} style={{ marginTop: '20px' }}>
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
            </section>

            <section className={styles.background} style={{ marginTop: '20px' }}>
                <Row>
                    <Col span={12}>
                        <h2>Sản phẩm đã mua</h2>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button type='primary'>Thêm sản phẩm</Button>
                    </Col>
                </Row>
                <Divider className={styles.blackDivider} style={{ marginTop: '10px' }} />
                <Table columns={columnProduct}
                    dataSource={timelinePoduct}
                    pagination={false}

                />
                <Row className={styles.timeLineEnd}>
                    <Col span={12}>
                        <span className={styles.span}>Tổng tiền hàng</span>
                        <span className={styles.span}>Giảm giá</span>
                        <span className={styles.span}>Phí vận chuyển</span>
                        <span className={styles.span}>Tổng cộng</span>
                    </Col>
                    <Col span={12}  >
                        <span className={styles.span}>{timelines[0]?.totalPrice}</span>
                        <span className={styles.span}>0đ</span>
                        <span className={styles.span}>0d</span>
                        <span style={{ fontSize: '16px', display: 'block', color: '#FF0000' }}>{timelines[0]?.totalPrice}đ</span>
                    </Col>
                </Row>
            </section>
        </>
    );
};

export default BillTimeLine;