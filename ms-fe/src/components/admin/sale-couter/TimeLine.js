import { Button, Col, Divider, Row, Table } from 'antd';
import { useEffect, useState } from 'react';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { FaRegFileAlt } from 'react-icons/fa';
import styles from './TimeLine.module.css'
import ModalConfirm from './ModalConfirm';
import SpanBorder from './SpanBorder';
import ModalDetail from './ModalDetail';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
            dataIndex: 'paymentType',
            key: 'paymentType',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'stauts',
        },
        {
            title: 'Thời gian',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Số tiền',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Người xác nhận',
            dataIndex: 'admin',
            key: 'admin',
        },
    ];
    const [isModalConfirm, setIsModalConfirm] = useState(false);
    const [isModalDetail, setIsModalDetail] = useState(false);
    const [timelines, setTimelines] = useState([]);
    const { billId } = useParams();

    const showModalConfirm = () => {
        setIsModalConfirm(true);
    };

    const handleOkConFirm = () => {
        setIsModalConfirm(false);
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
                setTimelines(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    }, [billId])

    const handleCreateTimeline = () => {
        console.log(billId)
    }

    return (
        <>
            <section className={styles.background}>
                <div style={{ overflowX: 'scroll' }}>
                    <div style={{ width: 'fit-content' }}>
                        <Timeline minEvents={6} placeholder className={styles.timeLine}>
                            {timelines && timelines.map((data) => (
                                <TimelineEvent
                                    color='#00cc00'
                                    icon={FaRegFileAlt}
                                    title={data.status}
                                    subtitle={data.createdDate}
                                />
                            ))}
                        </Timeline>
                    </div>
                </div>
                <div style={{ marginTop: 24 }}>
                    <Button type="primary" onClick={() => handleCreateTimeline()}>
                        Xác nhận
                    </Button>
                    <ModalConfirm isModalOpen={isModalConfirm} handleCancel={handleOkConFirm} handleOk={handleOkConFirm} />
                    <Button type='primary' danger style={{ margin: '0 10px' }}>Hủy</Button>
                    <Button
                        className={styles.btnWarning}
                        onClick={() => showModalDetail()} >Chi tiết</Button>

                    <ModalDetail isModalOpen={isModalDetail} handleCancel={handleOkDetail} handleOk={handleOkDetail} />
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
                                <span className={styles.span}>mã đơn hàng</span>
                                <span className={styles.span}>Loại đơn hàng</span>
                                <span className={styles.span}>Trạng thái </span>
                                <span style={{ fontSize: '16px', display: 'block' }}>Ngày nhận hàng dự kiến</span>
                            </Col>
                            <Col span={12}>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', margin: '5px 0 10px 0' }}>
                                    <SpanBorder child={'HD1000'} color={'#1677ff'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', marginBottom: '10px' }}>
                                    <SpanBorder child={'HD1000'} color={'#1677ff'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', marginBottom: '10px' }}>
                                    <SpanBorder child={'HD1000'} color={'#00cc00'} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px' }}>
                                    <SpanBorder child={'HD1000'} color={'gray'} />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={12}>
                                <span className={styles.span}>Tên khách hàng</span>
                                <span className={styles.span}>Số diện thoại</span>
                                <span className={styles.span}>Email</span>
                                <span className={styles.span}>Địa chỉ</span>
                            </Col>
                            <Col span={12}>
                                <span className={styles.span}>Khách lẻ</span>
                                <span className={styles.span}>__</span>
                                <span className={styles.span}>__</span>
                                <span style={{ fontSize: '16px', display: 'block' }}>__</span>
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
                <Table columns={columns} />
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