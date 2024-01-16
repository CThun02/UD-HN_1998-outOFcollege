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
  console.log(bill)

  const generatePDF = () => {
    const qrCodeDataUrl = generateQRCodeDataURL(billCode);
    return (
      <Document language="vi-VN">
        <Page style={{padding: 16, paddingBottom:100, paddingTop:100}}>
          <View style={{ padding: 10}}>
            <View  style={{ textAlign:"center", width:"100%", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Text
                style={{
                  marginBottom: 10,
                  textAlign: "center",
                  fontFamily: "Roboto",
                  fontWeight: "bold",  
                }}
              >
                  HÓA ĐƠN BÁN HÀNG
              </Text>
              <Image src={logo} style={{maxWidth: 140}}/>
              <Text style={{justifyContent:"flex-end"}}>
                  <Image
                      src={qrCodeDataUrl}
                      style={{ width: 40, height: 40 }}
                  />
                </Text>
            </View>
            {bill && (
              <View style={styles.vietNam}>
                <View style={{ textAlign:"center", width:"100%", marginBottom: 36 }}>
                    <Text style={{fontSize: 12}}>
                      Ngày{" "}
                      <Text  style={{ fontWeight: 'bold' }}>{`${moment(
                        bill?.billCreatedAt,
                        "DD/MM/YYYY HH:mm"
                      ).date()}`}</Text>{" "}
                      tháng{" "}
                      <Text  style={{ fontWeight: 'bold' }}>{`${
                        moment(
                          bill?.billCreatedAt,
                          "DD/MM/YYYY HH:mm"
                        ).month() + 1
                      }`}</Text>{" "}
                      năm{" "}
                      <Text  style={{ fontWeight: 'bold' }}>{`${moment(
                        bill?.billCreatedAt,
                        "DD/MM/YYYY HH:mm"
                      ).year()}`}</Text>
                   </Text>
                  </View>
                <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                  <View style={{ width: "30%" }}>
                    <Text>Đơn vị bán hàng:</Text>
                  </View>
                  <View style={{ width: "70%" }}>
                    <Text>Cửa hàng bán áo sơ mi nam outOfCollege</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                  <View style={{ width: "30%" }}>
                    <Text>Địa chỉ:</Text>
                  </View>
                  <View style={{ width: "70%" }}>
                    <Text>Tòa nhà FPT Polytechnic, đường Trịnh Văn Bô, Phương Canh, Nam Từ Liêm, Hà Nội</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                  <View style={{ width: "30%" }}>
                    <Text>Số điện thoại:</Text>
                  </View>
                  <View style={{ width: "70%" }}>
                    <Text>0988866377</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                  <View style={{ width: "30%" }}>
                    <Text>Số tài khoản:</Text>
                  </View>
                  <View style={{ width: "70%",  borderBottom: '1px dashed black', paddingBottom: 1}}>
                  </View>
                </View>
                <View style={{ paddingBottom: 12, marginBottom:12, width:"100%", borderBottom:"2px solid black"}}>
                </View>
                {/* Thông tin khách hàng */}
                <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                  <View style={{ width: "40%" }}>
                    <Text>Họ tên người mua hàng:</Text>
                  </View>
                  <View style={{ width: "60%"}}>
                    <Text>{bill?.deliveryNote?.fullName}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                  <View style={{ width: "40%" }}>
                    <Text>Địa chỉ:</Text>
                  </View>
                  <View style={{ width: "60%"}}>
                    <Text>{bill?.deliveryNote
                                ? bill?.deliveryNote?.ward +
                                  ", " +
                                  bill?.deliveryNote?.district +
                                  ", " +
                                  bill?.deliveryNote?.city
                                : null}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                  <View style={{ width: "40%" }}>
                    <Text>Số điện thoại:</Text>
                  </View>
                  <View style={{ width: "60%"}}>
                    <Text>{bill?.deliveryNote?.phoneNumber}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                  <View style={{ width: "40%" }}>
                    <Text>Hình thức thanh toán:</Text>
                  </View>
                  <View style={{ width: "60%"}}>
                  <Text>{bill?.lstPaymentDetail?.length === 1
                                ? bill?.lstPaymentDetail[0]?.paymentName ===
                                  "Cash"
                                  ? "Tiền mặt"
                                  : "Chuyển khoản"
                                : bill?.lstPaymentDetail?.length === 2
                                ? "Chuyển khoản, tiền mặt"
                                : null}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                  <View style={{ width: "40%" }}>
                    <Text>Nhân viên bán hàng:</Text>
                  </View>
                  <View style={{ width: "60%"}}>
                    <Text>{bill?.billCreatedBy}</Text>
                  </View>
                </View>
                {/* sản phẩm */}
                <View style={{ paddingBottom: 12, marginBottom:12, width:"100%", borderBottom:"2px solid black"}}>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                    Thông tin đơn hàng
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
                      <Text style={{ fontSize: 12 , textAlign:"center" }}>Sản phẩm</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12 , textAlign:"center" }}>Đơn giá</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12 , textAlign:"center" }}>Số lượng</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12 , textAlign:"center" }}>Thành tiền</Text>
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
                          <Text style={{ fontSize: 12, textAlign:"center" }}>
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
                          <Text style={{ fontSize: 12, textAlign:"center" }}>
                            {item?.productPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 12, textAlign:"center" }}>{item?.quantity}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 12, textAlign:"center" }}>
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
                <View style={{ paddingBottom: 12, marginBottom:12, width:"100%", borderBottom:"2px solid dashed"}}>
                </View>
                <View style={{ display:"flex", justifyContent: "flex-end" }}>
                    <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                      <View style={{ width: "30%" }}>
                        <Text>Thành tiền:</Text>
                      </View>
                      <View style={{ width: "70%" }}>
                        <Text>{bill?.totalPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                      <View style={{ width: "30%" }}>
                        <Text style={{fontSize: 12}}>Giá vận chuyển:</Text>
                      </View>
                      <View style={{ width: "70%" }}>
                        <Text style={{fontSize: 12}}>{(bill?.shippingFee ?? 0).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                      <View style={{ width: "30%" }}>
                        <Text style={{fontSize: 12}}>Giảm giá:</Text>
                      </View>
                      <View style={{ width: "70%" }}>
                        <Text style={{fontSize: 12}}>{bill?.priceReduce?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: "row", fontSize: 12, marginBottom:8 }}>
                      <View style={{ width: "30%" }}>
                        <Text style={{fontSize: 12}}>Khách hàng thanh toán:</Text>
                      </View>
                      <View style={{ width: "70%", flexDirection: "row", flexWrap: "wrap" }}>
                        {bill?.lstPaymentDetail && bill?.lstPaymentDetail.map((item) => (
                          <View style={{ marginRight: 10, width:"100%" }}>
                            <Text>
                              {item?.paymentName === "Cash" ? "Tiền mặt" : "Chuyển khoản"} - {item?.price?.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                            </Text>
                          </View>
                        ))}
                        <View style={{ width: "100%" }}>
                          <Text style={{ fontSize: 12 }}>
                            Tổng thanh toán - {bill?.lstPaymentDetail?.reduce((accumulator, item) => accumulator + item.price, 0).toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Text>
                        </View>
                      </View>

                    </View>
                    <View style={{ flexDirection: "row", fontSize: 14, marginBottom:8 }}>
                      <View style={{ width: "30%" }}>
                        <Text>Tổng cộng:</Text>
                      </View>
                      <View style={{ width: "70%" }}>
                        <Text>{bill?.amountPaid?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}</Text>
                      </View>
                    </View>
                    {bill?.lstPaymentDetail?.reduce((accumulator, item) => accumulator + item.price, 0)>bill?.amountPaid && (
                      <View style={{ flexDirection: "row", fontSize: 14, marginBottom:8 }}>
                        <View style={{ width: "30%" }}>
                          <Text>Tiền thừa:</Text>
                        </View>
                        <View style={{ width: "70%" }}>
                          <Text>
                            {(bill?.lstPaymentDetail?.reduce((accumulator, item) => accumulator + item.price, 0) - bill?.amountPaid)?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </Text>
                        </View>
                      </View>
                    )}
                    
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
                      ).date()}`}</strong>{" "}
                      tháng{" "}
                      <strong>{`${
                        moment(
                          bill?.billCreatedAt,
                          "DD/MM/YYYY HH:mm"
                        ).month() + 1
                      }`}</strong>{" "}
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
                  {bill.billType === "Online" ? (
                    <>
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
                    </>
                  ) : null}
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
                        <span>Tổng tiền</span>
                        <span>Giá vận chuyển</span>
                        <span>Giảm giá</span>
                        <span>Tổng thanh toán</span>
                        <span>Khách hàng thanh toán</span>
                        <span>Tiền thừa</span>
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
                          {bill?.priceReduce?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                        <span className={`${style.span} ${style.cssText}`}>
                          {(bill?.amountPaid)?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                        <span className={style.spacing}>
                          <span className={style.cssText}>
                          {bill?.lstPaymentDetail?.reduce((accumulator, item) => accumulator + item.price, 0).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                          </span>
                        </span>
                        <span className={style.spacing}>
                          <span className={style.cssText}>
                          {(bill?.lstPaymentDetail?.reduce((accumulator, item) => accumulator + item.price, 0)-bill?.amountPaid).toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                          </span>
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
