import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Col, Row } from 'antd';
import { PDFDownloadLink, Image, Document, Page, Text, View, Font } from '@react-pdf/renderer';
import QRCode, { QRCodeSVG } from 'qrcode.react';
import style from './ModalBillInfoe.module.css'

const ModalBillInfoDisplay = ({ open, cancel, billCode }) => {
    const [bill, setBill] = useState(null);
    Font.register({
        family: "Roboto",
        src:
            "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
    });
    const styles = {
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'

        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        vietNam: {
            fontFamily: "Roboto"
        }
    }
    useEffect(() => {
        if (open) {
            axios.get(`http://localhost:8080/api/client/pdf/${billCode}`)
                .then((response) => {
                    setBill(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [billCode, open]);

    const handleOk = () => {
        // Xử lý khi nhấn OK
    };

    const generateQRCodeDataURL = async (text) => {
        try {
            const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${text}&size=200x200`);
            if (!response.ok) {
                throw new Error('Failed to fetch QR Code');
            }
            const qrCodeData = await response.blob();
            return URL.createObjectURL(qrCodeData);
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const generatePDF = () => {
        const qrCodeDataUrl = generateQRCodeDataURL(billCode);
        return (
            <Document>
                <Page>
                    <View style={{ padding: 10, fontSize: '15px' }}>
                        <Text style={{ fontSize: 20, marginBottom: 10, fontFamily: "Roboto", textAlign: 'center' }} >Thông tin đơn hàng: {billCode}</Text>
                        {bill && (
                            <View style={styles.vietNam}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '50%' }}>
                                        <Text>Ngày tạo: {bill.billCreatedAt}</Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text>Quầy: ahihi</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '50%' }}>
                                        <Text>NVBH: {bill.billCreatedBy !== 'Client'
                                            ? bill.billCreatedBy.split("_")[0]
                                            : bill.billCreatedBy}</Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text>Mã đơn hàng: {billCode}</Text>
                                    </View>
                                </View>

                                <Text style={{ margin: '20px 0', fontWeight: 'bold' }}>Danh sách sản phẩm:</Text>
                                <View style={{ display: 'flex', flexDirection: 'column' }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
                                        <View style={{ flex: 3 }}>
                                            <Text style={{ fontWeight: 'bold' }}>Sản phẩm</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontWeight: 'bold' }}>Đơn giá</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontWeight: 'bold' }}>Số lượng</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontWeight: 'bold' }}>Thành tiền</Text>
                                        </View>
                                    </View>
                                    {bill?.lstProductDetail && bill.lstProductDetail.map((item) => (
                                        <View key={item.productDetailId} style={{ display: 'flex', flexDirection: 'row', marginBottom: 5 }}>
                                            <View style={{ flex: 3 }}>
                                                <Text>{item.productName + "-" +
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
                                                    item.productSize}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text>{item.productPrice}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text>{item.quantity}</Text>
                                            </View>
                                            <View style={{ flex: 1 }}>
                                                <Text>{item.quantity * item.productPrice}</Text>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                                <View style={{ flexDirection: 'row', fontFamily: 'Roboto' }}>
                                    <View style={{ flex: 1 }}>
                                        <Text>Tổng giá trị hóa đơn: {bill.totalPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                                        <Text>Tổng tiền thanh toán: {(bill.totalPrice + (bill.shippingFee ?? 0)).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                                        <Text>Tổng tiền khách trả: {bill.amountPaid?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                                        <Text>Tổng tiền trả lại: {(bill.amountPaid - (bill.totalPrice + bill.shippingFee)).toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text>
                                            <Image src={qrCodeDataUrl} style={{ width: 150, height: 150 }} />
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        )}
                    </View>
                </Page>
            </Document>
        );
    };

    return (
        <Modal
            centered
            width={800}
            style={{ fontSize: '10px' }}
            title="Xuất hóa đơn"
            open={open}
            onOk={handleOk}
            onCancel={cancel}
            footer={[
                <PDFDownloadLink
                    key="pdf-download"
                    document={generatePDF()}
                    fileName={`${billCode}.pdf`}
                >
                    {({ loading }) => loading ? 'Đang tạo PDF...' : 'Tải xuống PDF'}
                </PDFDownloadLink >,
            ]}
        >
            <div id="modalContent">
                {bill && (
                    <>
                        <h1 style={{ textAlign: 'center' }}>HOÁ ĐƠN BÁN HÀNG</h1>
                        <div>
                            <div id="modalContent">
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
                                            NVBH: {bill?.billCreatedBy !== 'Client' ? bill?.billCreatedBy.split("_")[0]
                                                : bill?.billCreatedBy}
                                        </Col>
                                    </Row>
                                    <table className={style.none}>
                                        <tr>
                                            <th style={{ width: "50%" }}>Sản phẩm</th>
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
                                        <Col span={6}>{bill?.amountPaid?.toLocaleString("vi-VN", {
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
                        </div>
                    </>
                )}
            </div>
        </Modal >
    );
};

export default ModalBillInfoDisplay;
