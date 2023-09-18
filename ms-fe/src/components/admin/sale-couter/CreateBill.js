import React, { useEffect, useState } from 'react'
import styles from './CreateBill.module.css'
import { Link } from 'react-router-dom'
import { Button, Col, Divider, Input, Row, Space, Switch, Table, Tag } from 'antd'
import ModalProduct from './ModalProduct'
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import axios from 'axios'
const CreateBill = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [deliveryEnabled, setDeliveryEnabled] = useState(false);
    const [data, setData] = useState([])
    const handleDeliveryToggle = (checked) => {
        setDeliveryEnabled(checked);
    };
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api/admin/cart')
            .then(response => {
                setData(response.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'imgDefault',
            key: 'imgDefault',
            render: (_, record) => (
                <Row>
                    <Col span={12}>
                        <img src={null} alt="Ảnh" />
                    </Col>
                    <Col span={12} className={styles.product} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                        <h2>{record.productName}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', color: 'red' }}>
                            <span>{record.price}</span>
                            <span style={{ marginLeft: '4px' }}>d</span>
                        </div>
                        <span>size: {record.sizeName}</span>
                        <span>color: {record.colorName}</span>
                    </Col>
                </Row>
            )
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Tổng số tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (_, record) => record.price * record.quantity,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        className={styles.btnDelete}
                        href='#1'
                    ></Button>
                </Space>
            ),
        },
    ];

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
                <Table columns={columns} dataSource={data} pagination={false} />
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
                                <h5>Tổng số tiền</h5>
                            </Col>
                            <Col div={12}>
                                <div>3.000.000</div>
                                <div>0</div>
                                <h5 style={{ color: 'red' }}>3.000.000</h5>
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
