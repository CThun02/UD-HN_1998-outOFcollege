import { Button, Col, Divider, message, Row, Steps, Table, Tag } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Timeline, TimelineEvent } from '@mailtop/horizontal-timeline';
import { FaBug, FaRegCalendarCheck, FaRegFileAlt } from 'react-icons/fa';
import styles from './TimeLine.module.css'
import ModalConfirm from './ModalConfirm';
import SpanBorder from './SpanBorder';
import ModalDetail from './ModalDetail';

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
    const steps = [
        {
            title: 'Login',
            status: 'finish',
            icon: <UserOutlined />,
        },
        {
            title: 'Verification',
            status: 'finish',
            icon: <SolutionOutlined />,
        },
        {
            title: 'Pay',
            status: 'process',
            icon: <LoadingOutlined />,
        },
        {
            title: 'Done',
            status: 'wait',
            icon: <SmileOutlined />,
        },
        {
            title: 'Done',
            status: 'wait',
            icon: <SmileOutlined />,
        },
        {
            title: 'Done',
            status: 'wait',
            icon: <SmileOutlined />,
        },
    ];



    const [isModalConfirm, setIsModalConfirm] = useState(false);
    const [isModalDetal, setIsModalDetail] = useState(false);

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
    return (
        <>
            <section className={styles.background}>
                <div style={{ overflowX: 'scroll' }}>
                    <div style={{ width: 'fit-content' }}>
                        <Timeline minEvents={6} placeholder className={styles.timeLine}>
                            <TimelineEvent
                                color='#00cc00'
                                icon={FaRegFileAlt}
                                title='Tạo đơn hàng'
                                subtitle='26/03/2019 09:51'
                            />
                            <TimelineEvent
                                color='#87a2c7'
                                icon={FaRegCalendarCheck}
                                title='Agendado'
                                subtitle='26/03/2019 09:51'
                            />
                            <TimelineEvent
                                color='#9c2919'
                                icon={FaBug}
                                title='Erro'
                                subtitle='26/03/2019 09:51'
                            />
                        </Timeline>
                    </div>
                </div>
                <div style={{ marginTop: 24 }}>
                    <Button type="primary" onClick={() => showModalConfirm()}>
                        Xác nhận
                    </Button>
                    <Button type='primary' danger style={{ margin: '0 10px' }}>Hủy</Button>
                    <Button className={styles.btnWarning} onClick={() => showModalDetail()} >Chi tiết</Button>
                    <ModalConfirm isModalOpen={isModalConfirm} handleCancel={handleOkConFirm} handleOk={handleOkConFirm} />
                    <ModalDetail isModalOpen={isModalDetal} handleCancel={handleOkDetail} handleOk={handleOkDetail} />
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