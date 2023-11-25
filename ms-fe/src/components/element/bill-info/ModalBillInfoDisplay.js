import { Col, Modal, Row } from 'antd'
import React from 'react'
import style from './ModalBillInfoe.module.css'
import { useEffect } from 'react'
import axios from 'axios'
import { QRCodeSVG } from 'qrcode.react'
import { useState } from 'react'
import jsPDF from 'jspdf';
import { saveAs } from 'file-saver';

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
        // Lấy kích thước của modal
        const modalContent = document.getElementById('modalContent');
        const width = modalContent.clientWidth;
        const height = modalContent.clientHeight;

        const doc = new jsPDF({
            orientation: width > height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [width, height],
        });

        // Tiếp tục với việc tạo và lưu file PDF
        doc.html(modalContent, {
            callback: function (pdf) {
                pdf.save(`${billCode}.pdf`);
            },
        });
    }

    return (
        <>
            <Modal centered width={500} style={{ fontSize: '10px' }} title="Xuất hóa đơn" open={open} onOk={handleOk} onCancel={cancel}>
                <div id="modalContent">
                    <h1 style={{ textAlign: 'center' }}>HOA DON BAN HANG</h1>
                    <div>
                        <Row>
                            <Col span={12}>
                                Ngay ban: {bill?.billCreatedAt}
                            </Col>
                            <Col span={12}>
                                Quay: ahihi
                            </Col>
                            <Col span={12}>
                                HD: {billCode}
                            </Col>
                            <Col span={12}>
                                NVBH: {bill?.billCreatedBy !== 'Client' ? bill?.billCreatedBy.split("_")[0]
                                    : bill?.billCreatedBy}
                            </Col>
                        </Row>
                        <table className={style.none}>
                            <tr>
                                <th style={{ width: "50%" }}>Mat hang</th>
                                <th>Đon gia</th>
                                <th>So luong</th>
                                <th>Thanh tien</th>
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
                        ---------------------------------------------------------
                        <Row>
                            <Col span={18}>THONG GIA TRI HOA DON</Col>
                            <Col span={6}>{bill?.totalPrice.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}</Col>
                            <Col span={18}>TONG TIEN THANH TOAN</Col>
                            <Col span={6}>{(bill?.totalPrice + (bill?.shippingFee ?? 0)).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}</Col>
                            <Col span={18}>TONG TIEN KHACH TRA</Col>
                            <Col span={6}>{bill?.amountPaid.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}</Col>
                            <Col span={18}>TONG TIEN TRA LAI</Col>
                            <Col span={6}>{(bill?.amountPaid - (bill?.totalPrice + bill?.shippingFee)).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}</Col>
                        </Row>
                        <QRCodeSVG width={"100%"} value={billCode + ""} />
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalBillInfoDisplay
