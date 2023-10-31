import React from 'react'
import styles from './Checkout.module.css'
import { Button, Col, Input, Row, Table } from 'antd'
import FloatingLabels from '../../element/FloatingLabels/FloatingLabels'
import { Link } from 'react-router-dom'

const Checkout = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <Row style={{ paddingTop: '50px' }}>
                    <Col span={14}>
                        <h1 style={{ textAlign: 'center' }}>Checkout</h1>
                        <Row>
                            <Col span={12}>
                                <span style={{ textAlign: 'left' }}>Thông tin đơn hàng</span>
                                <span style={{ textAlign: 'right', marginLeft: '20px' }}>Đăng nhập</span>
                            </Col>
                            <Col span={12}></Col>
                        </Row>
                    </Col>
                    <Col span={10}>
                        <div style={{ border: '1px solid gray', width: 'auto', height: '600px', padding: ' 20px' }}>
                            <h1>Đơn hàng</h1>
                            <hr />
                            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                <table>
                                    <thead>
                                        <tr>
                                            <th className={styles.visuallyHidden}>Ảnh sản phẩm</th>
                                            <th className={styles.visuallyHidden}>Mô tả</th>
                                            <th className={styles.visuallyHidden}>Đơn giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className={styles.productThumbnail}>
                                                    <div className={styles.productThumbnailWrapper}>
                                                        <img src="//bizweb.dktcdn.net/thumb/thumb/100/415/697/products/te9180-64ffkovk-1-yrw5-hinh-mat-truoc-0.jpg?v=1692005106000" alt="" className={styles.productThumbnailImage} />
                                                    </div>
                                                    <span className={styles.productThumbnailQuantity}>1</span>
                                                </div>
                                            </td>
                                            <td className={styles.productDescription}>
                                                <span style={{ display: 'block', textAlign: 'left', fontWeight: '500' }}>
                                                    Áo Thun Baby Tee Teelab Local Brand Scarlett BT01012323123
                                                </span>
                                                <span style={{ display: 'block', textAlign: 'left' }}>
                                                    Kem / S
                                                </span>
                                            </td>
                                            <td >
                                                135.000đ
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className={styles.productThumbnail}>
                                                    <div className={styles.productThumbnailWrapper}>
                                                        <img src="//bizweb.dktcdn.net/thumb/thumb/100/415/697/products/te9180-64ffkovk-1-yrw5-hinh-mat-truoc-0.jpg?v=1692005106000" alt="" className={styles.productThumbnailImage} />
                                                    </div>
                                                    <span className={styles.productThumbnailQuantity}>1</span>
                                                </div>
                                            </td>
                                            <td className={styles.productDescription}>
                                                <span style={{ display: 'block', textAlign: 'left', fontWeight: '500' }}>
                                                    Áo Thun Baby Tee Teelab Local Brand Scarlett BT01012323123
                                                </span>
                                                <span style={{ display: 'block', textAlign: 'left' }}>
                                                    Kem / S
                                                </span>
                                            </td>
                                            <td >
                                                135.000đ
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className={styles.productThumbnail}>
                                                    <div className={styles.productThumbnailWrapper}>
                                                        <img src="//bizweb.dktcdn.net/thumb/thumb/100/415/697/products/te9180-64ffkovk-1-yrw5-hinh-mat-truoc-0.jpg?v=1692005106000" alt="" className={styles.productThumbnailImage} />
                                                    </div>
                                                    <span className={styles.productThumbnailQuantity}>1</span>
                                                </div>
                                            </td>
                                            <td className={styles.productDescription}>
                                                <span style={{ display: 'block', textAlign: 'left', fontWeight: '500' }}>
                                                    Áo Thun Baby Tee Teelab Local Brand Scarlett BT01012323123
                                                </span>
                                                <span style={{ display: 'block', textAlign: 'left' }}>
                                                    Kem / S
                                                </span>
                                            </td>
                                            <td >
                                                135.000đ
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className={styles.productThumbnail}>
                                                    <div className={styles.productThumbnailWrapper}>
                                                        <img src="//bizweb.dktcdn.net/thumb/thumb/100/415/697/products/te9180-64ffkovk-1-yrw5-hinh-mat-truoc-0.jpg?v=1692005106000" alt="" className={styles.productThumbnailImage} />
                                                    </div>
                                                    <span className={styles.productThumbnailQuantity}>1</span>
                                                </div>
                                            </td>
                                            <td className={styles.productDescription}>
                                                <span style={{ display: 'block', textAlign: 'left', fontWeight: '500' }}>
                                                    Áo Thun Baby Tee Teelab Local Brand Scarlett BT01012323123
                                                </span>
                                                <span style={{ display: 'block', textAlign: 'left' }}>
                                                    Kem / S
                                                </span>
                                            </td>
                                            <td >
                                                135.000đ
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className={styles.productThumbnail}>
                                                    <div className={styles.productThumbnailWrapper}>
                                                        <img src="//bizweb.dktcdn.net/thumb/thumb/100/415/697/products/te9180-64ffkovk-1-yrw5-hinh-mat-truoc-0.jpg?v=1692005106000" alt="" className={styles.productThumbnailImage} />
                                                    </div>
                                                    <span className={styles.productThumbnailQuantity}>1</span>
                                                </div>
                                            </td>
                                            <td className={styles.productDescription}>
                                                <span style={{ display: 'block', textAlign: 'left', fontWeight: '500' }}>
                                                    Áo Thun Baby Tee Teelab Local Brand Scarlett BT01012323123
                                                </span>
                                                <span style={{ display: 'block', textAlign: 'left' }}>
                                                    Kem / S
                                                </span>
                                            </td>
                                            <td >
                                                135.000đ
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div style={{ borderTop: '1px solid rgba(175,175,175,.34)', padding: '10px' }}>
                                <Input
                                    size="large"
                                    placeholder='Nhập mã giảm giá'
                                    style={{ width: '300px', marginRight: '20px' }}
                                />
                                <Button type='primary'>Áp dụng</Button>
                            </div>
                            <div style={{ borderTop: '1px solid rgba(175,175,175,.34)', padding: '10px' }}>
                                <table style={{ width: '100%', fontSize: '16px' }} >
                                    <thead>
                                        <tr>
                                            <td><span className={styles.visuallyHidden}>Mô tả</span></td>
                                            <td><span className={styles.visuallyHidden}>Giá tiền</span></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ marginBottom: '100px' }} >
                                            <th className={styles.textLeft}>
                                                Tạm tính
                                            </th>
                                            <td style={{ textAlign: 'right' }}>1.173.000đ</td>
                                        </tr>

                                        <tr  >
                                            <th className={styles.textLeft}>
                                                Phí vận chuyển
                                            </th>
                                            <td style={{ textAlign: 'right' }}>30.000đ</td>
                                        </tr>

                                    </tbody>

                                    <tfoot style={{ borderTop: '100px solid red' }} >
                                        <tr>
                                            <th className={styles.textLeft} style={{ borderTop: '1px solid rgba(175, 175, 175, .34)' }}>
                                                Tổng cộng
                                            </th>
                                            <td style={{ textAlign: 'right', borderTop: '1px solid rgba(175, 175, 175, .34)' }} >30.000đ</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                            <div>
                                <Link to="" style={{ textAlign: 'left' }}> {'< Quay về giỏ hàng'}</Link>
                                <Button type='primary' style={{ width: '100px', height: '40px', marginLeft: '200px' }}>
                                    Đặt hàng
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    )
}

export default Checkout
