import React, { useState } from 'react'
import styles from './CreateBill.module.css'
import { Link } from 'react-router-dom'
import { Button, Col, Divider, Input, Row, Switch, Table, Tag } from 'antd'
import ModalProduct from './ModalProduct'
import { ShoppingCartOutlined } from '@ant-design/icons'
const CreateBill = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deliveryEnabled, setDeliveryEnabled] = useState(false);

    const handleDeliveryToggle = (checked) => {
        setDeliveryEnabled(checked);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <Link to="/admin/counter-sales">
                        <Button type="primary">Danh sách</Button>
                    </Link>
                </div>
                <Button type="primary" onClick={showModal}>
                    Thêm sản phẩm
                </Button>
                <ModalProduct visible={isModalVisible} onCancel={handleCancel} />
            </div>
            {/* danh sách sản phẩm */}
            <div className={styles.lstProduct}>
                <Table />
            </div>

            {/* chọn tài khoản */}
            <div className={styles.lstAccount}>
                <Row>
                    <Col span={12}>
                        <h4>Tài khoản</h4>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button style={{ color: "blue" }}>Chọn tài khoản</Button>
                    </Col>
                </Row>
                <Divider className={styles.blackDivider} style={{ marginTop: '3px' }} />
                <Row>
                    <Col span={6}>
                        <h6>Tên khách hàng</h6>
                    </Col>
                    <Col span={12}>
                        <Tag color="gray" style={{ borderRadius: "15px", padding: '2px 6px' }}>Khách lẻ</Tag>
                    </Col>
                </Row>
            </div>
            {/* Thông tin thanh toán */}
            <div className={styles.infBill}>
                <h5 style={{ textAlign: "left" }}>Khách hàng </h5>
                <Divider className={styles.blackDivider} style={{ marginTop: '3px' }} />
                <Row>
                    <Col span={15}>

                    </Col>
                    <Col span={9}>
                        <ShoppingCartOutlined style={{ fontSize: '24px', marginBottom: '10px' }} />
                        <span style={{ fontWeight: '700', fontSize: '19px', marginLeft: '10px' }}>Thông tin thanh toán</span>
                        <br />
                        <Switch checked={deliveryEnabled} onChange={handleDeliveryToggle} />
                        <span style={{ marginLeft: "5px" }}>Giao hàng</span>
                        <br />
                        <Input style={{ width: '200px' }}
                            placeholder='Mã giảm giá' />
                        <Button style={{ color: 'blue', marginTop: '10px', marginLeft: '10px' }}
                            className={styles.font}
                        >Chọn mã giảm giá</Button>
                        <Row style={{ marginTop: '10px' }}>
                            <Col span={12}>
                                <div>Tiền hàng</div>
                                <div>Giảm giá</div>
                                <h6>Tổng số tiền</h6>
                            </Col>
                            <Col div={12}>
                                <div>3.000.000</div>
                                <div>0</div>
                                <h6 style={{ color: 'red' }}>3.000.000</h6>
                                <div style={{ marginTop: '30px' }}>
                                    <Button style={{ backgroundColor: '#212121', color: 'white' }}>Xác nhận thanh toán</Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div >
        </div >
    )
}

export default CreateBill
