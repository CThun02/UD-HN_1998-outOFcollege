import React from 'react'
import styles from './Cart.module.css'
import { Button, Col, InputNumber, Row, Table } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'


const Cart = () => {

    const columns = [
        {
            key: 'product',
            title: 'Thông tin sản phẩm',
            render: () => {
                return (
                    <div>
                        <Row>
                            <Col span={4}>
                                <div style={{ width: '110px', height: '100px' }}>
                                    <img style={{ width: '100%', height: '100%' }} src="https://bizweb.dktcdn.net/thumb/compact/100/415/697/products/1-26653769-bf15-498a-bfec-cfe0f350a14c.jpg" alt="Áo Thun Teelab Local Brand Unisex Love Is In The Air TS199"></img>
                                </div>
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
                                        Áo Thun Teelab Local Brand Unisex Love Is In The Air TS199
                                    </span>
                                    <br />
                                    Kem / M
                                </div>
                            </Col>
                        </Row>
                    </div >
                )
            }
        },
        {
            key: 'price',
            title: 'Đơn giá',
            render: () => {
                return <div>
                    500
                </div>
            }
        },
        {
            key: 'quantity',
            title: 'Số lượng',
            width: 200,
            render: () => {
                return (
                    <InputNumber
                        min={1}
                        max={5}
                    />
                );
            },
        },
        {
            key: 'price_total',
            title: 'Thành tiền',
            render: () => {
                return <div>
                    1000
                </div>
            }
        },
        {
            key: 'action',
            title: 'Thao tác',
            render: () => {
                return <div>
                    <CloseOutlined style={{ cursor: 'pointer' }} />
                </div>
            }
        },
    ]

    const dataSource = [
        {
            key: '1'
        },
        {
            key: '2'
        },
        {
            key: '3'
        }
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 style={{ padding: '10px 0' }}>Giỏ hàng của bạn</h2>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
                <Row style={{ marginTop: '20px' }}>
                    <Col span={18}></Col>
                    <Col span={6} style={{ position: 'relative' }}>
                        <span className={styles.left}>Tổng tiền:</span>
                        <span className={styles.right}>1.000.000</span>
                    </Col>
                    <Col span={18}></Col>
                    <Col span={6} style={{ height: '45px', marginTop: '10px', marginBottom: '10px' }}>
                        <Link to={'/ms-shop/checkout'}>
                            <Button type='primary' className={styles.btn}>Thanh toán</Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Cart
