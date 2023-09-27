import { Button, Col, Divider, message, Row, Steps, Table, Tag } from 'antd';
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import styles from './TimeLine.module.css'

const Timeline = () => {
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

    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
        icon: item.icon,
    }));

    return (
        <>
            <section className={styles.background}>
                <Steps current={current} items={items} />
                <div style={{ marginTop: 24 }}>
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Xác nhận
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    <Button type='primary' danger style={{ margin: '0 10px' }}>Hủy</Button>
                    <Button className={styles.btnWarning} >Chi tiết</Button>
                </div>
            </section>

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
                                    <Tag color="magenta" style={{ fontSize: '16px', flex: '1' }}>
                                        HD123121
                                    </Tag>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', marginBottom: '10px' }}>
                                    <Tag color="magenta" style={{ fontSize: '16px', flex: '1' }}>
                                        Giao hàng
                                    </Tag>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px', marginBottom: '10px' }}>
                                    <Tag color="magenta" style={{ fontSize: '16px', flex: '1' }}>
                                        Đang giao
                                    </Tag>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', width: '10px' }}>
                                    <Tag color="processing" style={{ fontSize: '16px', flex: '1' }}>
                                        25/09/2023
                                    </Tag>
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

export default Timeline;