import { Button, Col, Divider, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { FaRegCheckCircle, FaRegFileAlt, FaTimes, FaTruck } from 'react-icons/fa';
import styles from './TimeLine.module.css'
import ModalConfirm from './ModalConfirm';
import SpanBorder from './SpanBorder';
import ModalDetail from './ModalDetail';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';
import { CheckCircleOutlined } from '@ant-design/icons';

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

    const handleUpdateBillStatus = (status) => {
        axios.put(`http://localhost:8080/api/admin/bill/${billId}`, {
            status: status
        })
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const showModalConfirm = () => {
        setIsModalConfirm(true);
    };

    const handleCancelConfirm = () => {
        setIsModalConfirm(false)
    }

    const handleOkConFirm = (note) => {
        handleCreateTimeline(note, action === 'cancel' ? '0' : null);
        if (billInfo.symbol === 'Shipping' && timelines.length === 3 && billInfo.status !== 'Paid') {
            handleUpdateBillStatus(action === 'cancel' ? 'cancel' : 'paid');
        }
        setIsModalConfirm(false);
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
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [billId])

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
                        {billInfo?.symbol !== 'Received' ? (
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
                                            CheckCircleOutlined
                                        )}
                                        title={data.status === '0' ? 'Đã hủy'
                                            : data.status === '1'
                                                ? 'Chờ xác nhận'
                                                : data.status === '2'
                                                    ? 'Đã xác nhận'
                                                    : data.status === '3'
                                                        ? 'Đã đóng gói & đang được giao' : 'Giao hàng thành công'}
                                        subtitle={moment(data.createdDate)
                                            .format("HH:mm:ss DD/MM/YYYY")}
                                    />
                                ))}
                            </Timeline>
                        ) : (
                            <Timeline minEvents={2} placeholder className={styles.timeLine}>
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
                                            .format("HH:mm:ss DD/MM/YYYY")}
                                    />
                                ))}
                            </Timeline>
                        )}
                    </div>
                </div>
                <div className={styles.btnHeader} style={{ marginTop: 24 }}>
                    {billInfo?.symbol === 'Received' && timelines.length !== 2 && (
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
                    {billInfo?.symbol !== 'Received' && (timelines.length !== 4 && timelines.length !== 5) && timelines[timelines.length - 1]?.status !== '0' && (
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
                        <ModalDetail timelineDetail={timelines} isModalOpen={isModalDetail} handleCancel={handleOkDetail} handleOk={handleOkDetail} symbol={billInfo.symbol} />
                    </div>
                </div>
            </section >

            <section className={styles.background} style={{ marginTop: '20px' }}>
                <Row>
                    <Col span={12}>
                        <h2>Thông tin đơn hàng</h2>
                    </Col>
                </Row>
                <Divider className={styles.blackDivider} style={{ marginTop: '10px' }} />
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <span >Mã đơn hàng</span>
                            </Col>
                            <Col span={12}>
                                <SpanBorder child={billInfo.billCode} color={'#1677ff'} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span >Hình thức mùa hàng</span>
                            </Col>
                            <Col span={12}>
                                <SpanBorder child={billInfo.symbol} color={'#1677ff'} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span >Ngày mua hàng</span>
                            </Col>
                            <Col span={12}>
                                <SpanBorder child={moment(billInfo.createdDate).format('HH:mm:ss  DD/MM/YYYY')} color={'#1677ff'} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span >Mã giao dịch</span>
                            </Col>
                            <Col span={12}>
                                <SpanBorder child={billInfo?.transaction || '__'} color={'#1677ff'} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span >Phương thức thanh toán</span>
                            </Col>
                            <Col span={12}>
                                <SpanBorder child={billInfo?.paymentName || '__'} color={'#1677ff'} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span  >Hình thức giao hàng </span>
                            </Col>
                            <Col span={12}>
                                <SpanBorder child={'Giao hàng tại nhà'} color={'gray'} />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <span >
                                    Ngày nhận hàng dự kiến
                                </span>
                            </Col>
                            <Col span={12}>
                                <span >
                                    {moment(billInfo?.shipDate).format('DD/MM/YYYY') || '__'}
                                </span>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={11}>
                        <Row>
                            <Col span={24}>
                                <Row>
                                    <Col span={10}>
                                        <h6>Tên khách hàng</h6>
                                    </Col>
                                    <Col span={14}>
                                        <span >{billInfo.fullName || 'khách lẻ'}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={10}>
                                        <span >Số diện thoại</span>
                                    </Col>
                                    <Col span={14}>
                                        <span >{billInfo.phoneNumber || '__'}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={10}>
                                        <span >Địa chỉ</span>
                                    </Col>
                                    <Col span={14}>
                                        <span >{billInfo?.address?.replace(/[0-9|-]/g, "") || '__'}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={10}>
                                        <span  >Số tiền khách trả</span>
                                    </Col>
                                    <Col span={14}>
                                        <span >{billInfo.amountPaid || '__'}</span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <Row>
                                    <Col span={10}>
                                        <span >Tiền thừa</span>
                                    </Col>
                                    <Col span={14}>
                                        <span >
                                            {(billInfo?.amountPaid + billInfo?.priceReduce - billInfo.shipPrice - billInfo.totalPrice
                                            ) || '0đ'}
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

            <section className={styles.background} style={{ marginTop: '20px' }}>
                <Row>
                    <Col span={12}>
                        <h2>Sản phẩm đã mua</h2>
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
                            {numeral(billInfo.totalPrice).format('0,0') + 'đ'}
                        </span>
                    </span>
                    <span className={styles.span}>
                        <span style={{ width: '200px', display: 'inline-block' }}>
                            Giảm giá:
                        </span>
                        <span >
                            {numeral(billInfo.priceReduce)?.format('0,0') + 'đ'}
                        </span>
                    </span>
                    {billInfo.symbol === 'Online' && <>
                        <span className={styles.span}>
                            <span style={{ width: '200px', display: 'inline-block' }}>
                                Phí vận chuyển:
                            </span>
                            <span >
                                {numeral(billInfo.shipPrice)?.format('0,0') + 'đ'}
                            </span>
                        </span></>}
                    <b className={styles.span} >
                        <span style={{ width: '200px', display: 'inline-block' }}>Tổng cộng: </span>
                        <span style={{ fontSize: '16px', color: '#FF0000' }}>{
                            numeral(billInfo.totalPrice + billInfo?.shipPrice - billInfo.priceReduce).format(0, 0) + 'đ'}</span></b>
                </div>
            </section >
        </>
    );
};

export default BillTimeLine;