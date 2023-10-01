import { Button, Col, Divider, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { FaBug, FaRegCheckCircle, FaRegFileAlt } from 'react-icons/fa';
import styles from './TimeLine.module.css'
import ModalConfirm from './ModalConfirm';
import SpanBorder from './SpanBorder';
import ModalDetail from './ModalDetail';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment/moment';

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
            dataIndex: 'price',
            key: 'price',
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
    const [action, setAction] = useState(null)
    const { billId } = useParams();

    // tạo mới timeline
    const handleCreateTimeline = async (note, stauts) => {
        const values = { note: note, status: stauts };
        await axios.post(`http://localhost:8080/api/admin/bill/${billId}/timelines`,
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
        axios.get(`http://localhost:8080/api/admin/bill/${billId}/timeline`)
            .then((response) => {
                setTimelines(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [billId])

    const columnProduct = [
        {
            title: 'STT',
            key: 'index',
            render: (_, record, index) => index + 1
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
        },
    ]

    return (
        <>
            <section className={styles.background}>
                <div style={{ overflowX: 'scroll' }}>
                    <div style={{ width: 'fit-content' }}>
                        <Timeline minEvents={6} placeholder className={styles.timeLine}>
                            {timelines && timelines.map((data) => (
                                <TimelineEvent
                                    color={data.status === '0' ? '#9c2919' : '#00cc00'}
                                    icon={data.status === '1' ? (
                                        FaRegFileAlt
                                    ) : data.status === '0' ? (
                                        FaBug
                                    ) : (
                                        FaRegCheckCircle
                                    )}
                                    title={data.status === '1' ? 'Tạo hóa đơn' : data.status === '2' ? 'Thanh toán thành công' : data.status === '0' ? 'Đã hủy' : ''}
                                    subtitle={moment(data.createdDate)
                                        .format("DD/MM/YYYY HH:MM")}
                                />
                            ))}
                        </Timeline>
                    </div>
                </div>
                <div className={styles.btnHeader} style={{ marginTop: 24 }}>
                    {(timelines.length !== 2) && (
                        <Button
                            type="primary"
                            onClick={() => {
                                setAction('confirm');
                                showModalConfirm()
                            }}>
                            Xác nhận
                        </Button>
                    )}
                    {(timelines.length !== 2) && (
                        <Button type='primary'
                            danger
                            style={{ margin: '0 10px' }}
                            onClick={() => {
                                setAction('cancel');
                                showModalConfirm()
                            }}
                        > Hủy</Button>
                    )}
                    {console.log(action)}
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
                        <ModalDetail timelineDetail={timelines} isModalOpen={isModalDetail} handleCancel={handleOkDetail} handleOk={handleOkDetail} />
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
                                    <SpanBorder child={'HD1100'} color={'#1677ff'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', marginBottom: '20px' }}>
                                    <SpanBorder child={timelines[0]?.billType} color={'#1677ff'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', marginBottom: '20px' }}>
                                    <SpanBorder child={timelines[0]?.billStatus} color={'#00cc00'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '50px' }}>
                                    <SpanBorder child={moment(timelines[0]?.completionDate)
                                        .format('HH:MM  DD/MM/YYYY')} color={'gray'} />

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
                                <span className={styles.span}>{timelines[0]?.fullName || 'khách lẻ'}</span>
                                <span className={styles.span}>{timelines[0]?.phoneNumber || '__'}</span>
                                <span className={styles.span}>{timelines[0]?.email || '__'}</span>
                                <span style={{ fontSize: '16px', display: 'block' }}>{timelines[0]?.address || '__'}</span>
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
                <Table />
                <Row className={styles.timeLineEnd}>
                    <Col span={12}>
                        <span className={styles.span}>Tổng tiền hàng</span>
                        <span className={styles.span}>Giảm giá</span>
                        <span className={styles.span}>Phí vận chuyển</span>
                        <span className={styles.span}>Tổng cộng</span>
                    </Col>
                    <Col span={12}  >
                        <span className={styles.span}>3.000.000đ</span>
                        <span className={styles.span}>0đ</span>
                        <span className={styles.span}>0d</span>
                        <span style={{ fontSize: '16px', display: 'block' }}>3.000.000đ</span>
                    </Col>
                </Row>
            </section>
        </>
    );
};

export default BillTimeLine;