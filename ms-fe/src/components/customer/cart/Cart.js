import React, { useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { Button, Col, InputNumber, Row, Table, notification } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import numeral from 'numeral'

const Cart = (props) => {
    const [productDetails, setProductDetails] = useState(null)
    const [render, setRender] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(true)

    const columns = [
        {
            key: 'product',
            title: 'Thông tin sản phẩm',
            width: 750,
            render: (_, record) => {
                return (
                    <div>
                        <Row>
                            <Col span={4}>
                                <div style={{}} className="m-5">
                                    <img style={{ width: '100%', height: '100%' }}
                                        src={record.data.images[0].path} alt="Áo Thun Teelab Local Brand Unisex Love Is In The Air TS199"></img>
                                </div>
                            </Col>
                            <Col span={20}>
                                <div
                                    style={{
                                        textAlign: "left",
                                        height: "100%",
                                    }}
                                    className="m-5"
                                >
                                    <span style={{ fontWeight: "500" }}>
                                        {record.data.productName +
                                            "-" +
                                            record.data.buttonName +
                                            "-" +
                                            record.data.brandName +
                                            "-" +
                                            record.data.categoryName +
                                            "-" +
                                            record.data.materialName +
                                            "-" +
                                            record.data.collarTypeName +
                                            "-" +
                                            record.data.sleeveName +
                                            "-" +
                                            record.data.shirtTailTypeName +
                                            "-" +
                                            record.data.patternName +
                                            "-" +
                                            record.data.formName}
                                    </span>
                                    <br />
                                    <div className={styles.optionColor}>
                                        <b>Màu sắc: </b>
                                        <span
                                            style={{
                                                backgroundColor: record.data.colorAndSizeAndQuantity.colors[0].colorCode,
                                                marginLeft: "8px",
                                            }}
                                        ></span>
                                        {record.data.colorAndSizeAndQuantity.colors[0].colorName}
                                    </div>
                                    <br />
                                    <b>Kích cỡ: </b>
                                    <span
                                        style={{
                                            marginLeft: "8px",
                                        }}
                                    >
                                        {record.data.colorAndSizeAndQuantity.sizes[0].sizeName}
                                    </span>
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
            with: 300,
            render: (_, record) => {
                return <div>
                    {numeral(record.data.colorAndSizeAndQuantity.priceProductMin)
                        .format('0,0') + ' đ'}
                </div>
            }
        },
        {
            key: 'quantity',
            title: 'Số lượng',
            width: 100,
            render: (_, record, index) => {
                return (
                    <InputNumber
                        min={1}
                        value={record.quantity}
                        max={record.data.quantity}
                        onChange={(e) => updateQuantity(e, index)}
                    />
                );
            },
        },
        {
            key: 'price_total',
            title: 'Thành tiền',
            render: (_, record) => {
                return <div>
                    {numeral(record.quantity * record.data.colorAndSizeAndQuantity.priceProductMin)
                        .format('0,0') + ' đ'}
                </div>
            }
        },
        {
            key: 'action',
            title: 'Thao tác',
            render: (_, record, index) => {
                return <div>
                    <CloseOutlined style={{ cursor: 'pointer', color: 'red' }}
                        onClick={(e) => deleteProductDetail(e, index)} />
                </div>
            }
        },
    ]

    const updateQuantity = (e, index) => {
        let cart = JSON.parse(localStorage.getItem('user'));
        let productDetail = cart.productDetails;
        if (e > productDetail[index].data.colorAndSizeAndQuantity.quantity) {
            notification.warning({
                message: "Thông báo",
                description: "Vượt quá số lượng tồn",
                duration: 1,
            });
            return;
        }

        productDetail[index].quantity = e;
        cart.productDetails = productDetail;
        localStorage.setItem("user", JSON.stringify(cart));

        setRender(Math.random())
    }

    const deleteProductDetail = (e, index) => {
        e.preventDefault();
        let cart = JSON.parse(localStorage.getItem('user'))
        let productDetails = cart.productDetails;
        if (index >= 0 && index < productDetails?.length) {
            productDetails.splice(index, 1);
            cart.productDetails = productDetails;
            localStorage.setItem('user', JSON.stringify(cart))
            setRender(Math.random())
        }
    }

    const getAllCart = () => {
        let productDetail = JSON.parse(localStorage.getItem('user'));
        setProductDetails(productDetail?.productDetails)
        let totalPrice = 0;
        for (let i = 0; i < productDetail?.productDetails?.length; i++) {
            totalPrice +=
                productDetail.productDetails[i].data.colorAndSizeAndQuantity.priceProductMin *
                productDetail.productDetails[i].quantity
        }
        setTotalPrice(totalPrice)
        setLoading(false)
    }

    const onSelectChange = (selectedKeys) => {
        setSelectedRowKeys(selectedKeys);
    };

    const addSelectedToData = (e) => {
        let newData = []
        selectedRowKeys.forEach((key) => {
            let selectedRow = productDetails.find((row) => row.data.productDetailId === key);
            newData.push(selectedRow);
        });


        localStorage.setItem('checkout', JSON.stringify(newData));
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    useEffect(() => {
        localStorage.removeItem('checkout');
        getAllCart()
    }, [render]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 style={{ padding: '10px 0' }}>Giỏ hàng của bạn</h2>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={
                        productDetails &&
                        productDetails.map((record, index) => ({
                            ...record,
                            key: record.data.productDetailId,
                        }))
                    }
                    loading={loading}
                    pagination={false}
                />
                <Row style={{ marginTop: '20px' }}>
                    <Col span={18}></Col>
                    <Col span={6} style={{ position: 'relative' }}>
                        <span className={styles.left}>Tổng tiền:</span>
                        <span className={styles.right}>{numeral(totalPrice).format('0,0') + 'đ'} </span>
                    </Col>
                    <Col span={18}></Col>
                    <Col span={6} style={{ height: '45px', marginTop: '10px', marginBottom: '10px' }}>
                        <Link to={'/ms-shop/checkout'}>
                            <Button type='primary' className={styles.btn}
                                onClick={(e) => addSelectedToData(e)}
                            >Thanh toán</Button>
                        </Link>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Cart
