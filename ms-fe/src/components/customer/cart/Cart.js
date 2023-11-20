import React, { useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { Button, Col, InputNumber, Row, Table, notification } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import numeral from 'numeral'
import { getAuthToken } from '../../../service/Token'
import axios from 'axios'

const Cart = (props) => {
    const navigate = useNavigate()
    const [productDetails, setProductDetails] = useState(null)
    const [render, setRender] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(true)
    const [carts, setCarts] = useState([])
    const token = getAuthToken();

    const cartAPI = 'http://localhost:8080/api/client/cart';

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
                                        src={record?.data[0]?.productImageResponse[0]?.path} alt="Áo Thun Teelab Local Brand Unisex Love Is In The Air TS199"></img>
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
                                        {record?.data[0]?.product.productName +
                                            "-" +
                                            record?.data[0]?.button.buttonName +
                                            "-" +
                                            record?.data[0]?.brand.brandName +
                                            "-" +
                                            record?.data[0]?.category.categoryName +
                                            "-" +
                                            record?.data[0]?.material.materialName +
                                            "-" +
                                            record?.data[0]?.collar.collarTypeName +
                                            "-" +
                                            record?.data[0]?.sleeve.sleeveName +
                                            "-" +
                                            record?.data[0]?.shirtTail.shirtTailTypeName +
                                            "-" +
                                            record?.data[0]?.pattern.patternName +
                                            "-" +
                                            record?.data[0]?.form.formName}
                                    </span>
                                    <br />
                                    <div className={styles.optionColor}>
                                        <b>Màu sắc: </b>
                                        <span
                                            style={{
                                                backgroundColor: record?.data[0]?.color.colorCode,
                                                marginLeft: "8px",
                                            }}
                                        ></span>
                                        {record?.data[0]?.color.colorName}
                                    </div>
                                    <br />
                                    <b>Kích cỡ: </b>
                                    <span
                                        style={{
                                            marginLeft: "8px",
                                        }}
                                    >
                                        {record?.data[0]?.size.sizeName}
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
                    {numeral(record.data[0]?.price)
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
                    {numeral(record.quantity * record.data[0]?.price)
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

    const handleUpdateQuantityApi = (id, value) => {
        axios.put(`${cartAPI}?cartDetailId=${id}&quantity=${value}`)
            .then((response) => {
                setRender(response.data);
                props.setRenderHeader(Math.random())

            }).catch((error) => {
                console.log(error);
            })
    }

    const handleDeleteApi = (id) => {
        axios.delete(`${cartAPI}?cartDetailId=${id}`)
            .then((response) => {
                console.log(response);
                setRender(Math.random);
                props.setRenderHeader(Math.random())

            }).catch((error) => {
                console.log(error);
            })
    }

    const columnsAPI = [
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
                                        src={record?.productImageResponse[0].path} alt="Áo Thun Teelab Local Brand Unisex Love Is In The Air TS199"></img>
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
                                        {record?.cartDetailResponse.productName +
                                            "-" +
                                            record?.cartDetailResponse.buttonName +
                                            "-" +
                                            record?.cartDetailResponse.brandName +
                                            "-" +
                                            record?.cartDetailResponse.categoryName +
                                            "-" +
                                            record?.cartDetailResponse.materialName +
                                            "-" +
                                            record?.cartDetailResponse.collarName +
                                            "-" +
                                            record?.cartDetailResponse.sleeveName +
                                            "-" +
                                            record?.cartDetailResponse.shirtTailName +
                                            "-" +
                                            record?.cartDetailResponse.patternName +
                                            "-" +
                                            record?.cartDetailResponse.formName}
                                    </span>
                                    <br />
                                    <div className={styles.optionColor}>
                                        <b>Màu sắc: </b>
                                        <span
                                            style={{
                                                backgroundColor: record?.cartDetailResponse.colorCode,
                                                marginLeft: "8px",
                                            }}
                                        ></span>
                                        {record?.cartDetailResponse.colorName}
                                    </div>
                                    <br />
                                    <b>Kích cỡ: </b>
                                    <span
                                        style={{
                                            marginLeft: "8px",
                                        }}
                                    >
                                        {record?.cartDetailResponse.sizeName}
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
                    {numeral(record?.cartDetailResponse.priceProductDetail)
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
                        value={record?.cartDetailResponse.quantity}
                        max={record?.cartDetailResponse.quantityProductDetail}
                        onChange={(e) =>
                            handleUpdateQuantityApi(record.cartDetailResponse.cartDetailId, e)}
                    />
                );
            },
        },
        {
            key: 'price_total',
            title: 'Thành tiền',
            render: (_, record) => {
                return <div>
                    {numeral(record.cartDetailResponse.quantity
                        * record.cartDetailResponse.priceProductDetail)
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
                        onClick={(e) => handleDeleteApi(record.cartDetailResponse.cartDetailId)} />
                </div>
            }
        },
    ]

    const updateQuantity = (e, index) => {
        let cart = JSON.parse(localStorage.getItem('user'));
        let productDetail = cart.productDetails;
        if (e > productDetail[index].data[0].quantity) {
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
        props.setRenderHeader(Math.random())
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
        props.setRenderHeader(Math.random())

    }

    const getAllCart = () => {
        let productDetail = JSON.parse(localStorage.getItem('user'));
        setProductDetails(productDetail?.productDetails)
        setLoading(false)
        setRender(1)
    }

    const onSelectChange = async (selectedKeys) => {
        try {
            const data = await token;
            let totalPrice = 0;
            if (data) {
                for (let i = 0; i < carts.length; i++) {
                    if (selectedKeys.includes(carts[i].cartDetailResponse.productDetailId)) {
                        totalPrice += carts[i].cartDetailResponse.priceProductDetail * carts[i].cartDetailResponse.quantity;
                    }
                }
                setTotalPrice(totalPrice);
            } else {
                for (let i = 0; i < productDetails.length; i++) {
                    const row = productDetails[i];
                    if (selectedKeys.includes(row?.data[0]?.id)) {
                        totalPrice += row.data[0].price * row.quantity;
                    }
                }
                setTotalPrice(totalPrice);
            }

            setSelectedRowKeys(selectedKeys);
        } catch (error) {
            console.error('lỗi click sản phẩm thanh toán:', error);
        }
    };

    const addSelectedToData = (e) => {
        e.preventDefault()
        let newData = []
        if (carts.length === 0) {
            selectedRowKeys.forEach((key) => {
                let selectedRow = productDetails.find((row) => row?.data[0]?.id === key);
                newData.push(selectedRow);
            });
        } else {
            selectedRowKeys.forEach((key) => {
                let selectedRow = carts.find((row) => row?.cartDetailResponse.productDetailId === key);
                newData.push(selectedRow);
            });
            console.log(newData)
        }

        if (newData.length === 0) {
            notification.error({
                message: "Thông báo",
                description: "Bạn chưa chọn sản phẩm",
                duration: 2,
            });
            return;
        }

        localStorage.setItem('checkout', JSON.stringify(newData));
        navigate('/ms-shop/checkout')
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const getCartAPI = (username) => {
        axios.get(`${cartAPI}`, {
            params: {
                username: username
            }
        }).then((response) => {
            setCarts(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await token;
                if (data) {
                    getCartAPI(data?.username);
                    const cart = {
                        username: data?.username,
                        lstCartDetail: [],
                    };

                    if (productDetails) {
                        for (let i = 0; i < productDetails.length; i++) {
                            if (productDetails[i].data[0].id !==
                                carts.cartDetailResponse.productDetailId) {
                                cart.lstCartDetail.push({
                                    productDetailId: productDetails[i].data[0].id,
                                    quantity: productDetails[i].quantity,
                                });
                            }
                        }
                    }

                    const response = await axios.post(`${cartAPI}`, cart);
                    console.log(response.data);
                }

                localStorage.removeItem('checkout');
            } catch (error) {
                console.log(error);
            }
        };
        getAllCart();
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [render]);


    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h2 style={{ padding: '10px 0' }}>Giỏ hàng của bạn</h2>
                <Table
                    rowSelection={rowSelection}
                    columns={carts && carts.length > 0 ? columnsAPI : columns}
                    dataSource={
                        carts && carts.length > 0 ?
                            carts.map((record, index) => ({
                                ...record,
                                key: record.cartDetailResponse.productDetailId
                            })) :
                            (productDetails &&
                                productDetails.map((record, index) => ({
                                    ...record,
                                    key: record?.data[0]?.id,
                                })))
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
                        <Button type='primary' className={styles.btn}
                            onClick={(e) => addSelectedToData(e)}
                        >Thanh toán</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Cart
