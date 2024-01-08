import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Col, Row, Space } from "antd";
import {
  PDFDownloadLink,
  Image,
  Document,
  Page,
  Text,
  View,
  Font,
} from "@react-pdf/renderer";
import { QRCodeSVG } from "qrcode.react";
import style from "./ModalBillInfoe.module.css";
import numeral from "numeral";
import moment from "moment";

const logo = "/logo/logo-shop.png";

const ModalBillInfoDisplay = ({ open, cancel, billCode }) => {
  const [bill, setBill] = useState(null);
  Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
  });
  const styles = {
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    vietNam: {
      fontFamily: "Roboto",
    },
  };
  useEffect(() => {
    if (open) {
      axios
        .get(`http://localhost:8080/api/client/pdf/${billCode}`)
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
    if (text) {
      try {
        const response = await fetch(
          `https://api.qrserver.com/v1/create-qr-code/?data=${text}&size=200x200`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch QR Code");
        }
        const qrCodeData = await response.blob();
        return URL.createObjectURL(qrCodeData);
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  };

  const generatePDF = () => {
    const qrCodeDataUrl = generateQRCodeDataURL(billCode);
    return (
      <Document>
        <Page>
          <View style={{ padding: 10, fontSize: "15px" }}>
            <Text
              style={{
                fontSize: 20,
                marginBottom: 10,
                fontFamily: "Roboto",
                textAlign: "center",
              }}
            >
              Thông tin đơn hàng: {billCode}
            </Text>
            {bill && (
              <View style={styles.vietNam}>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <Text>Ngày tạo: {bill?.billCreatedAt}</Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text>Quầy: ahihi</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ width: "50%" }}>
                    <Text>
                      Nhân viên bán hàng:{" "}
                      {bill?.billCreatedBy !== "Client"
                        ? bill?.billUpdateBy.split("_")[0]
                        : bill?.billUpdateBy}
                    </Text>
                  </View>
                  <View style={{ width: "50%" }}>
                    <Text>Mã đơn hàng: {billCode}</Text>
                  </View>
                </View>

                <Text style={{ margin: "20px 0", fontWeight: "bold" }}>
                  Danh sách sản phẩm:
                </Text>
                <View style={{ display: "flex", flexDirection: "column" }}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 5,
                    }}
                  >
                    <View style={{ flex: 3 }}>
                      <Text style={{ fontWeight: "bold" }}>Sản phẩm</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "bold" }}>Đơn giá</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "bold" }}>Số lượng</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "bold" }}>Thành tiền</Text>
                    </View>
                  </View>
                  {bill?.lstProductDetail &&
                    bill?.lstProductDetail.map((item) => (
                      <View
                        key={item?.productDetailId}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginBottom: 5,
                        }}
                      >
                        <View style={{ flex: 3 }}>
                          <Text>
                            {item?.productName +
                              "-" +
                              item?.productButton +
                              "-" +
                              item?.productMaterial +
                              "-" +
                              item?.productCollar +
                              "-" +
                              item?.productSleeve +
                              "-" +
                              item?.productShirtTail +
                              "-" +
                              item?.productPatternName +
                              "-" +
                              item?.productPatternName +
                              "-" +
                              item?.productBrandName +
                              "-" +
                              item?.productCateGoryName +
                              "-" +
                              item?.productColorName +
                              "-" +
                              item?.productSize}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text>
                            {item?.productPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text>{item?.quantity}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text>
                            {Number(
                              item?.quantity * item?.productPrice
                            )?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
                <View style={{ flexDirection: "row", fontFamily: "Roboto" }}>
                  <View style={{ flex: 1 }}>
                    <Text>
                      Thành tiền:{" "}
                      {bill?.totalPrice.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                    <Text>
                      Giá vận chuyển:{" "}
                      {(bill?.shippingFee ?? 0).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                    <Text>
                      Giảm giá:{" "}
                      {bill?.amountPaid?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                    <Text>
                      Tổng cộng:{" "}
                      {(
                        bill?.amountPaid -
                        (bill?.priceReduce + bill?.shippingFee)
                      ).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text>
                      <Image
                        src={qrCodeDataUrl}
                        style={{ width: 150, height: 150 }}
                      />
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
      style={{ fontSize: "10px" }}
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
          {({ loading }) => (loading ? "Đang tạo PDF..." : "Tải xuống PDF")}
        </PDFDownloadLink>,
      ]}
    >
      <div id="modalContent">
        {bill && (
          <div>
            <h1 style={{ textAlign: "center" }}>HOÁ ĐƠN BÁN HÀNG</h1>
            <div className={style.logo}>
              <Space direction="vertical">
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img src={logo} alt="logo-shop" className={style.imageSize} />
                </div>
                <div>
                  <p style={{ fontSize: "16px" }}>
                    <span>
                      Ngày{" "}
                      <strong>{`${moment(
                        bill?.billCreatedAt,
                        "DD/MM/YYYY HH:mm"
                      ).date()}`}</strong>
                      tháng{" "}
                      <strong>{`${moment(
                        bill?.billCreatedAt,
                        "DD/MM/YYYY HH:mm"
                      ).month()}`}</strong>{" "}
                      năm{" "}
                      <strong>{`${moment(
                        bill?.billCreatedAt,
                        "DD/MM/YYYY HH:mm"
                      ).year()}`}</strong>
                    </span>
                  </p>
                </div>
              </Space>
            </div>
            <div>
              <div id="modalContent">
                <div>
                  <div className={style.billInformation}>
                    <div className={style.sideSellInfor}>
                      <div className={style.title}>
                        <Space direction="vertical" size={14}>
                          <span>Đơn vị bán hàng </span>
                          <span>Địa chỉ </span>
                          <span>Số điện thoại </span>
                          <span>Số tài khoản </span>
                        </Space>
                      </div>
                      <div className={style.content}>
                        <Space direction="vertical" size={14}>
                          <span className={style.spacing}>
                            :{" "}
                            <span className={style.cssText}>
                              Cửa hàng bán áo sơ mi nam outOfCollege
                            </span>
                          </span>
                          <span className={style.spacing}>
                            :{" "}
                            <span className={style.cssText}>
                              Tòa nhà FPT Polytechnic, đường Trịnh Văn Bô,
                              Phương Canh, Nam Từ Liêm, Hà Nội
                            </span>
                          </span>
                          <span className={style.spacing}>
                            : <span className={style.cssText}>0988866377</span>
                          </span>
                          <div>
                            <span>: </span>
                            <div
                              className={style.borderBottom}
                              style={{
                                display: "inline-block",
                                width: "98%",
                              }}
                            ></div>
                          </div>
                        </Space>
                      </div>
                    </div>
                  </div>
                  <div
                    className={style.customBr}
                    style={{
                      display: "inline-block",
                      width: "98%",
                    }}
                  ></div>
                  <div>
                    <div className={style.sideBuy}>
                      <div className={style.title}>
                        <Space direction="vertical" size={14}>
                          <span>Họ tên người mua hàng </span>
                          <span>Địa chỉ </span>
                          <span>Số điện thoại </span>
                          <span>Hình thức thanh toán </span>
                        </Space>
                      </div>

                      <div className={style.content}>
                        <Space direction="vertical" size={14}>
                          <span className={style.spacing}>
                            :{" "}
                            <span className={style.cssText}>
                              {bill?.billCreatedBy
                                ? bill?.billCreatedBy === "CLIENT"
                                  ? "Khách lẻ"
                                  : bill?.billCreatedBy
                                : null}
                            </span>
                          </span>
                          <span className={style.spacing}>
                            :{" "}
                            <span className={style.cssText}>
                              {bill?.deliveryNote
                                ? bill?.deliveryNote?.ward +
                                  ", " +
                                  bill?.deliveryNote?.district +
                                  ", " +
                                  bill?.deliveryNote?.city
                                : null}
                            </span>
                          </span>
                          <span className={style.spacing}>
                            :{" "}
                            <span className={style.cssText}>
                              {bill?.deliveryNote
                                ? bill?.deliveryNote?.phoneNumber
                                : null}
                            </span>
                          </span>
                          <span>
                            :{" "}
                            <span className={style.cssText}>
                              {bill?.lstPaymentDetail?.length === 1
                                ? bill?.lstPaymentDetail[0]?.paymentName ===
                                  "Cash"
                                  ? "Tiền mặt"
                                  : "Chuyển khoản"
                                : bill?.lstPaymentDetail?.length === 2
                                ? "Chuyển khoản, tiền mặt"
                                : null}
                            </span>
                          </span>
                        </Space>
                      </div>
                    </div>
                  </div>
                  <table className={style.none}>
                    <tr>
                      <th style={{ width: "50%" }}>Sản phẩm</th>
                      <th>Đơn vị tính</th>
                      <th>Đơn giá</th>
                      <th>Số lượng</th>
                      <th>Thành tiền</th>
                    </tr>
                    <tbody>
                      {bill?.lstProductDetail &&
                        bill?.lstProductDetail.map((item) => {
                          return (
                            <tr
                              key={item?.productDetailId}
                              className={style.padding}
                            >
                              <td className={style.textLeft}>
                                {" "}
                                {item?.productName +
                                  "-" +
                                  item?.productButton +
                                  "-" +
                                  item?.productMaterial +
                                  "-" +
                                  item?.productCollar +
                                  "-" +
                                  item?.productSleeve +
                                  "-" +
                                  item?.productShirtTail +
                                  "-" +
                                  item?.productPatternName +
                                  "-" +
                                  item?.productPatternName +
                                  "-" +
                                  item?.productBrandName +
                                  "-" +
                                  item?.productCateGoryName +
                                  "-" +
                                  item?.productColorName +
                                  "-" +
                                  item?.productSize}
                              </td>
                              <td>Cái</td>
                              <td>
                                <span className={style.cssText}>
                                  {item?.productPrice?.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </span>
                              </td>
                              <td>
                                <span className={style.cssText}>
                                  {numeral(item?.quantity).format("0,0")}
                                </span>
                              </td>
                              <td>
                                <span className={style.cssText}>
                                  {(
                                    item?.quantity * item?.productPrice
                                  )?.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <div className={style.br}></div>

                  <div className={style.flexEnd}>
                    <div className={style.title}>
                      <Space
                        direction="vertical"
                        size={16}
                        style={{ width: "100%" }}
                      >
                        <span>Thành tiền</span>
                        <span>Giá vận chuyển</span>
                        <span>Giảm giá</span>
                        <span>Tổng thanh toán</span>
                      </Space>
                    </div>
                    <div className={style.content}>
                      <Space
                        direction="vertical"
                        size={16}
                        style={{ width: "100%" }}
                      >
                        <span className={`${style.span} ${style.cssText}`}>
                          {bill?.totalPrice.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                        <span className={`${style.span} ${style.cssText}`}>
                          {(bill?.shippingFee ?? 0).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                        <span className={`${style.span} ${style.cssText}`}>
                          {bill?.voucherPrice?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                        <span className={`${style.span} ${style.cssText}`}>
                          {(bill?.priceReduce === bill.voucherPrice
                            ? bill?.shipPrice
                            : bill?.priceReduce + bill?.shippingFee
                          ).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </Space>
                    </div>
                  </div>
                </div>
                <QRCodeSVG width={"100%"} value={billCode + ""} />
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ModalBillInfoDisplay;
