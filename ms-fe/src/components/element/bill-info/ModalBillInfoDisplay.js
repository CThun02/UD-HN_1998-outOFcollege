import { Col, Modal, Row } from 'antd'
import React from 'react'
import style from './ModalBillInfoe.module.css'
import { useEffect } from 'react'
import axios from 'axios'
import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'

const ModalBillInfoDisplay = ({ open, cancel, billCode }) => {

    const [bill, setBill] = useState(null)

    useEffect(() => {

        console.log(billCode)
        axios.get(`http://localhost:8080/api/client/pdf/${billCode}`)
            .then((response) => {
                setBill(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [billCode])

    const handleOk = () => {
        console.log(`uws uwws`)
    }

    return (
        <>
            <Modal centered width={500} title="Xuất hóa đơn" open={open} onOk={handleOk} onCancel={cancel}>
                <h1 style={{ textAlign: 'center' }}>HÓA ĐƠN BÁN HÀNG</h1>
                <div>
                    <Row>
                        <Col span={12}>
                            Ngày bán: {bill?.billCreatedAt}
                        </Col>
                        <Col span={12}>
                            Quầy: ahihi
                        </Col>
                        <Col span={12}>
                            HD: {billCode}
                        </Col>
                        <Col span={12}>
                            NVBH: {bill?.billCreatedBy}
                        </Col>
                    </Row>
                    <table className={style.none}>
                        <tr>
                            <th style={{ width: "50%" }}>Mặt hàng</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                        </tr>
                        <tbody>
                            {bill?.lstProductDetail && bill.lstProductDetail.map((item) => {
                                return (
                                    <tr key={item.productDetailId}>
                                        <td className={style.textLeft}> {item.productName +
                                            "-" +
                                            item.productButton +
                                            "-" +
                                            item.productMaterial +
                                            "-" +
                                            item.productCollar +
                                            "-" +
                                            item.productSleeve +
                                            "-" +
                                            item.productShirtTail +
                                            "-" +
                                            item.productPatternName +
                                            "-" +
                                            item.productPatternName
                                            + "-" +
                                            item.productBrandName + '-' + item.productCateGoryName + "-" +
                                            item.productColorName +
                                            "-" +
                                            item.productSize}</td>
                                        <td>{item.productPrice}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.quantity * item.productPrice}</td>
                                    </tr>)
                            })}
                        </tbody>
                    </table>
                    -------------------------------------------------------------
                    <Row>
                        <Col span={18}>TỔNG GIÁ TRỊ HÓA ĐƠN</Col>
                        <Col span={6}>63631</Col>
                        <Col span={18}>TỔNG TIỀN THANH TOÁN</Col>
                        <Col span={6}>63631</Col>
                        <Col span={18}>TỔNG TIỀN KHÁCH TRẢ</Col>
                        <Col span={6}>63631</Col>
                        <Col span={18}>TỔNG TIỀN TRẢ LẠI</Col>
                        <Col span={6}>0</Col>
                    </Row>
                    <QRCodeSVG width={"100%"} value={billCode + ""} />
                </div>
            </Modal>
        </>
    )
}

export default ModalBillInfoDisplay
