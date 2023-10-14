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

const BillTimeLine = (addId) => {

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
        axios.get(`http://localhost:8080/api/admin/timeline/${billId}/info`,
            {
                params: {
                    addId: addId,
                }
            })
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
            width: 500,
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
                        <Col span={12}>
                            <div style={{ textAlign: "left", marginLeft: 20 }}>
                                <h6 >
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
    ]
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
                                                ? 'Chờ xác nhận'
                                                : data.status === '2'
                                                    ? 'Đã xác nhận'
                                                    : data.status === '3'
                                                        ? 'Đã đóng gói & đang được giao' : 'Giao hàng thành công'}
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
                                        title={data.status === '1' ? 'Chờ xác nhận' : data.status === '2' ? 'Thanh toán thành công' : data.status === '0' ? 'Đã hủy' : ''}
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
                                <span className={styles.span}>HÌnh thức thanh toán</span>
                                <span className={styles.span}>Ngày đặt hàng</span>
                                <span className={styles.span}>Phương thức thanh toán</span>
                                <span className={styles.span}>Hình thức giao hàng </span>
                                <span style={{ fontSize: '16px', display: 'block' }}>Ngày nhận hàng dự kiến</span>
                            </Col>
                            <Col span={12}>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', margin: '20px 0 20px 0' }}>
                                    <SpanBorder child={billInfo.billCode} color={'#1677ff'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', margin: '20px 0 20px 0' }}>
                                    <SpanBorder child={billInfo.billType} color={'#1677ff'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', marginBottom: '20px' }}>
                                    <SpanBorder child={moment(billInfo.createdDate).format('HH:MM  DD/MM/YYYY')} color={'#1677ff'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', marginBottom: '20px' }}>
                                    <SpanBorder child={'Thanh toán khi nhận hàng'} color={'#1677ff'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '50px' }}>
                                    {billInfo.billType === "Online" && (
                                        <SpanBorder child={'Giao hàng tại nhà'} color={'gray'} />
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
                <div className={styles.timeLineEnd}>
                    <span className={styles.span} >
                        <span style={{ width: '198px', display: 'inline-block' }}>
                            Thành tiền:
                        </span>
                        <span>
                            {timelines[0]?.totalPrice.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })}
                        </span>
                    </span>
                    <span className={styles.span}>
                        <span style={{ width: '200px', display: 'inline-block' }}>
                            Giảm giá:
                        </span>
                        <span >
                            0đ
                        </span>
                    </span>
                    <span className={styles.span}>
                        <span style={{ width: '200px', display: 'inline-block' }}>
                            Phí vận chuyển:
                        </span>
                        <span >
                            0đ
                        </span>
                    </span>
                    <b className={styles.span} >
                        <span style={{ width: '200px', display: 'inline-block' }}>Tổng cộng: </span>
                        <span style={{ fontSize: '16px', color: '#FF0000' }}>{timelines[0]?.totalPrice
                            .toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                            })}</span></b>
                </div>
            </section >
        </>
    );
};

export default BillTimeLine;