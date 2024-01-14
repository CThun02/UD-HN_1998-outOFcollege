import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  Divider,
  notification,
  Row,
  Radio,
  Table,
  Tooltip,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import SpanBorder from "../sale-couter/SpanBorder";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAuthToken, getToken } from "../../../service/Token";
import styles from "./BillReturn.module.css";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "antd/es/modal/Modal";
import Input from "antd/es/input/Input";
import {
  FaClock,
  FaRegCheckCircle,
  FaRegFileAlt,
  FaRocket,
  FaTimes,
  FaTruck,
} from "react-icons/fa";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import ModalDetail from "../sale-couter/ModalDetail";

var productsReturns = [];
const BillReturn = () => {
  const { billCode, name } = useParams();
  const navigate = useNavigate();
  const token = getAuthToken(true);

  const [billInfo, setBillInfor] = useState(null);
  const [modalQuantityReturn, setModalQuantityReturn] = useState([false]);
  const [quantity, setQuantity] = useState(1);
  const [render, setRender] = useState(null);
  const [totalPrice, seTotalPrice] = useState(0);
  const [note, setNote] = useState("");
  const [modalDetail, setModalDetail] = useState(false);
  const [isLoad, setIsLoad] = useState(0);
  const [voucher, setVoucher] = useState(null);
  const [voucherNewUse, setVoucherNewUse]= useState(null);
  const [voucherPrice, setVoucherPrice]=useState(0);
  const [payAfterReturn, setPayAfterReturn] = useState(0);
  const [totalPricePaid, setTotalPricePaid] = useState(0);
  const [customerPaidBillOld, setCustomerPaidBillOld] = useState(0);

  const handleShowModalProduct = (index, value) => {
    const newModalVisible = [...modalQuantityReturn];
    newModalVisible[index] = value;
    setModalQuantityReturn(newModalVisible);
  };

  const columns = [
    {
      key: "#",
      datatIndex: "index",
      title: "#",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      key: "product",
      title: "Sản phẩm",
      width: "50%",
      render: (_, record) => {
        return (
          <Row>
            <Col span={4}>
              <div className="m-5">
                <Carousel style={{ maxWidth: 300 }} autoplay>
                  {record.productImageResponses &&
                    record.productImageResponses.map((item) => {
                      return (
                        <img
                          key={item.id}
                          style={{ width: "100%", marginTop: "10px" }}
                          alt=""
                          src={item.path}
                        />
                      );
                    })}
                </Carousel>
              </div>
            </Col>
            <Col span={20}>
              <div className="m-5" style={{ textAlign: "left" }}>
                <span style={{ fontWeight: 500 }}>
                  {record.productName +
                    "-" +
                    record.productButton +
                    "-" +
                    record.productBrandName +
                    "-" +
                    record.productCateGoryName +
                    "-" +
                    record.productMaterial +
                    "-" +
                    record.productCollar +
                    "-" +
                    record.productSleeve +
                    "-" +
                    record.productShirtTail +
                    "-" +
                    record.productPatternName +
                    "-" +
                    record.productFormName}
                </span>
                <br />
                <div className={styles.optionColor}>
                  <b>Màu sắc: </b>
                  <span
                    style={{
                      backgroundColor: record.productColor,
                      marginLeft: "8px",
                    }}
                  ></span>
                  {record.productColorName}
                </div>
                <b>Kích cỡ: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {record.productSize}
                </span>
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      key: "quantity",
      title: "Số lượng",
      render: (_, record) => {
        return record.quantity;
      },
    },
    {
      key: "total",
      title: "Tổng tiền",
      render: (_, record) => {
        return (record.productPrice* record.quantity)?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
    },
    {
      key: "action",
      title: "Thao tác",
      render: (_, record, index) => {
        return (
          <>
            <Modal
              open={modalQuantityReturn[index]}
              onCancel={() => handleShowModalProduct(index, false)}
              centered
              footer={null}
              title={"Nhập số lượng"}
            >
              <Input
                value={quantity}
                onChange={(e) => {
                  var checkQuantity = e.target.value.replace(/[^\d]/g, "");
                  setQuantity(checkQuantity);
                  if(checkQuantity>record.quantity){
                    notification.error({
                      message:"Thông báo",
                      description:"Vượt quá số lượng có thể hoàn trả!"
                    });
                  }
                }}
              />
              <div style={{ marginTop: "8px", textAlign: "center" }}>
                {billInfo?.status !=="ReturnS" && !record.checkInPromotion && (
                  <Button
                    onClick={() => {
                      reloadProduct(index, record);
                    }}
                    disabled={quantity<0 || quantity>record.quantity}
                    type="primary"
                    size="large"
                  >
                    Xác nhận
                  </Button>
                )}
              </div>
            </Modal>
            <Tooltip
              title={
                record.checkInPromotion
                  ? "Sản phẩm mua trong đợt khuyến mại không thể trả hàng!"
                  : ""
              }
            >
              <Button
                onClick={() => {
                  handleShowModalProduct(index, true);
                }}
                type="primary"
                size="large"
                disabled={billInfo?.status ==="ReturnS" || record.checkInPromotion}
                icon={
                  record.checkInPromotion ? (
                    <CloseOutlined />
                  ) : (
                    <ReloadOutlined />
                  )
                }
              >{record?.billDetailStatus==="ReturnS"?"Trả hàng":""}</Button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  function newVoucher(totalPrice){
    var priceBillAfterReturn = billInfo?.price - totalPrice;
    var conditonUseVoucherOld = priceBillAfterReturn>=voucher?.voucherCondition?true:false;
    if(!conditonUseVoucherOld){
      axios.post(`http://localhost:8080/api/client/autoFillVoucher`
            , {
              usename: billInfo?.usename,
              priceBill: priceBillAfterReturn,
              voucherCodeOrName: null,
            }).then(res=>{
              setVoucherNewUse(res.data);
              setTotalPricePaid(billInfo?.price -totalPrice - countPriceReduce(res.data, billInfo?.price))
              setVoucherPrice(countPriceReduce(res.data, billInfo?.price))
            }).catch(err=>{
              console.log(err)
            })
    }else{
      setVoucherNewUse(null);
      setTotalPricePaid(priceBillAfterReturn - countPriceReduce(voucher, billInfo?.price));
      setVoucherPrice(countPriceReduce(voucher, billInfo?.price))
    }
  }

  async function confirmReload(status) {
    const data = await token;
    if (note) {
      var productReturnString = "";
      for (let index = 0; index < productsReturns.length; index++) {
        if(productsReturns[index]?.note===""){
          notification.warning({
            message: "Thông báo",
            description: "Vui lòng nhập mô tả cho từng sản phẩm trả hàng!",
          });
          return;
        }
        productReturnString +=
          " | Hoàn trả sản phẩm: " +
          productsReturns[index]?.productCode +
          " | Id sản phẩm: " +
          productsReturns[index]?.productImageResponses[0]?.productDetailId;
      }
      for (let index = Number(status); index <= Number(status) + 1; index++) {
        await axios
          .post(
            `http://localhost:8080/api/admin/timeline/${billInfo?.id}`,
            {
              note: "Lý do: " + note + productReturnString,
              status: index,
              createdBy: data?.username + "_" + data?.fullName,
            },
            {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            }
          )
          .then((response) => {})
          .catch((error) => {
            const status = error.response.status;
            if (status === 403) {
              notification.error({
                message: "Thông báo",
                description: "Bạn không có quyền truy cập!",
              });
            }
          });
      }
      for (let index = 0; index < productsReturns.length; index++) {
        const request = {
          productDetailId: productsReturns[index].productDetailId,
          billId: billInfo?.id,
          reason: productsReturns[index].reason==="OTHER"?"OTHER":"PRODUCE",
          quantity: productsReturns[index].quantity,
          price: productsReturns[index].productPrice,
          note: productsReturns[index].note
        };
        await axios
          .post(`http://localhost:8080/api/admin/product-return`, request, {
            headers: {
              Authorization: `Bearer ${getToken(true)}`,
            },
          })
          .then((response) => {})
          .catch((error) => {
            const status = error.response.status;
            if (status === 403) {
              notification.error({
                message: "Thông báo",
                description: "Bạn không có quyền truy cập!",
              });
            }
          });
      }
      notification.success({
        message: "Thông báo",
        description: "Trả hàng thành công",
      });
      changeBillAfterReturn(
        billInfo?.id,
        customerPaidBillOld - totalPricePaid,
        voucherPrice,
        voucherNewUse?.voucherCode
      );
      setRender(Math.random());
      productsReturns = [];
    } else {
      notification.warning({
        message: "Thông báo",
        description: "Vui lòng nhập mô tả!",
      });
    }
  }
  function changeBillAfterReturn(billId, priceReturn, voucherPrice, newVoucher) {
    axios
      .put(
        `http://localhost:8080/api/admin/bill/updateBillReturn?billId=${billId}&priceReturn=${priceReturn}&voucherPrice=${voucherPrice}&newVoucherCode=${newVoucher?newVoucher:""}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setRender(response.data);
      })
      .catch((error) => {
        const status = error?.response?.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        return;
      });
  }

  function changeStatusBillDetail(id, status) {
    axios
      .put(
        `http://localhost:8080/api/admin/bill/billDetail/change-status?status=${
          status === "5" || status === "3"
            ? "ReturnW"
            : status === "-1"
            ? "ReturnC"
            : status === "ACTIVE"
            ? "ACTIVE"
            : "ReturnS"
        }`,
        id,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setRender(response.data);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        return;
      });
  }

  function countPriceReduce(voucher, price){
    var priceReduce= voucher
      ? voucher?.voucherMethod === "vnd"
        ? voucher?.voucherValue
        : (price * voucher?.voucherValue) / 100 >
          voucher?.voucherValueMax
        ?voucher?.voucherValueMax:
          (price * voucher?.voucherValue) /100
      : 0
    return priceReduce;
  }

  function reloadProduct(index, record) {
    let quantityCheck=record.quantity;
    for (let index = 0; index < productsReturns.length; index++) {
      if (
        Number(record.billDetailId) ===
        Number(productsReturns[index].billDetailId)
      ) {
        quantityCheck -= productsReturns[index].quantity;
      }
    }
    if(quantity>quantityCheck){
      notification.error({
        message: "Thông báo",
        description: "Số lượng trả đã vượt quá số lượng mua",
      })
    }else{
      record.quantity = quantity;
      record.note = "";
      productsReturns.push(record);
      let totalPrice = productsReturns.reduce((sum, product) => sum + (product.productPrice*product.quantity), 0)
      newVoucher(totalPrice);
      notification.success({
        message: "Thông báo",
        description: "Chọn sản phẩm thành công",
      });
      handleShowModalProduct(index, false);
      setQuantity(1);
      setRender(Math.random());
    }
  }

  function deleteIfNoneReturned(index) {
    productsReturns.splice(index, 1);
    let totalPrice = productsReturns.reduce((sum, product) => sum + (product.productPrice*product.quantity), 0)
    newVoucher(totalPrice);
    setRender(Math.random());
    notification.success({
      message: "Thông báo",
      description: "Xóa thành công",
    });
  }

  async function searchBill() {
    await axios
      .get(
        `http://localhost:8080/api/admin/bill/getBillByBillCode?billCode=` +
          billCode,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        var now = new Date();
        var sevenDay = 7 * 24 * 60 * 60 * 1000;
        if (response.data) {
          if (
            response.data.status !== "Complete" ||
            now.getTime() - new Date(response.data.completionDate).getTime() >
              sevenDay
          ) {
            navigate("/api/admin/return");
          }
          if (response.data.status === "ReturnS") {
            navigate(`/api/admin/return/return-bill/${billCode}/bill`);
          }
        } else {
          navigate("/api/admin/return");
        }
      })
      .catch((error) => {
        const status = error.response?.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
  }

  useEffect(() => {
    if (billCode) {
      if (name !== "bill") {
        searchBill();
      }
      axios
            .get(
              `http://localhost:8080/api/admin/bill/getBillReturnByBillCode?billCode=` +
                billCode,
              {
                headers: {
                  Authorization: `Bearer ${getToken(true)}`,
                },
              }
            )
            .then((response) => {
              setBillInfor(response.data);
              if (response?.data?.status === "ReturnS") {
                productsReturns = response?.data?.billDetails.filter(item=> item.billDetailStatus==="ReturnS")
                axios.get(`http://localhost:8080/api/admin/product-return/getProductReturnByBillCode?billCode=`+billCode,
                {
                  headers: {
                    Authorization: `Bearer ${getToken(true)}`,
                  },
                })
                  .then(res=>{
                    for (let index = 0; index < res?.data?.length; index++) {
                      for (let j = index; j < productsReturns.length; j++) {
                        if(res.data[index].id === productsReturns[j].productDetailId){
                          productsReturns[j].index = index;
                          productsReturns[j].reason = res.data[index].status;
                          productsReturns[j].note = res.data[index].descriptionDetail;
                        }
                      }
                    }
                    productsReturns.filter(item => console.log(item))
                  }).catch(err =>{
                      console.log(err)
                  })
              }
              var total = 0;
              for (let index = 0; index < productsReturns.length; index++) {
                total +=
                  productsReturns[index].productPrice *
                  productsReturns[index].quantity;
              }
              axios.get("http://localhost:8080/api/admin/voucher-history/getVoucherByBillCode?billCode="+billCode,
                {
                  headers: {
                    Authorization: `Bearer ${getToken(true)}`,
                  },
                }).then(resVoucher => {
                  let vouchers = resVoucher?.data;
                  var voucherActive = vouchers?.filter(item=>item.status === "ACTIVE")[0]
                  var voucherInActive = vouchers?.filter(item=>item.status === "INACTIVE")[0]
                  var priceReduce = countPriceReduce(voucherActive, response?.data.price);
                  if(response.data?.status ==="ReturnS"){
                    if(resVoucher.data.length===1){
                      setVoucher(voucherActive);
                      setCustomerPaidBillOld(response.data?.price - priceReduce)
                    }else{
                      setVoucherNewUse(voucherActive);
                      setVoucher(voucherInActive);
                      setCustomerPaidBillOld(response.data?.price - countPriceReduce(voucherInActive, response?.data.price));
                    }
                    setTotalPricePaid(response.data?.price -total - response.data?.priceReduce);
                  }else{
                    setVoucher(voucherActive);
                    setCustomerPaidBillOld(response.data?.price - priceReduce);
                    if(total===0){
                      setTotalPricePaid(response.data?.price - priceReduce);
                    }
                  }
                }).catch(error=>{
                  console.log(error)
                })
              seTotalPrice(total);
              setIsLoad(1);
            })
            .catch((error) => {
              const status = error?.response?.status;
              if (status === 403) {
                notification.error({
                  message: "Thông báo",
                  description: "Bạn không có quyền truy cập!",
                });
              }
            });
        
    }
    if (isLoad === 0) {
      productsReturns = [];
    }
  }, [billCode, modalQuantityReturn, render]);
  return (
    <>
      <ModalDetail
        isModalOpen={modalDetail}
        handleCancel={() => setModalDetail(false)}
        timelineDetail={billInfo?.timeLines}
        symbol={billInfo?.symbol}
      />
      <div className={styles.billReturn}>
        <h3 style={{ marginBottom: "25px" }}>Thông tin hóa đơn</h3>
        <div style={{ overflowX: "scroll", height: "50%" }}>
          <div style={{ width: "fit-content" }}>
            <Timeline minEvents={2} placeholder className={styles.timeLine}>
              {billInfo?.symbol !== "Received" ? (
                <Timeline minEvents={6} placeholder className={styles.timeLine}>
                  {billInfo?.timeLines &&
                    billInfo?.timeLines
                      .filter(
                        (item) =>
                          item.status === "1" ||
                          item.status === "2" ||
                          item.status === "3" ||
                          item.status === "4" ||
                          item.status === "5" ||
                          item.status === "6"
                      )
                      .map((data) => (
                        <TimelineEvent
                          color={
                            data.status === "0" || data.status === "-1"
                              ? "#FF0000"
                              : data.status === "5"
                              ? "#f0ad4e"
                              : "#00cc00"
                          }
                          icon={
                            data.status === "1"
                              ? FaRegFileAlt
                              : data.status === "0"
                              ? FaTimes
                              : data.status === "2"
                              ? FaRegFileAlt
                              : data.status === "3"
                              ? FaTruck
                              : CheckCircleOutlined
                          }
                          title={
                            data.status === "0" ? (
                              <h3>Đã hủy</h3>
                            ) : data.status === "1" ? (
                              <h3>Chờ xác nhận</h3>
                            ) : data.status === "2" ? (
                              <h3>Chờ giao hàng</h3>
                            ) : data.status === "3" ? (
                              <h3>
                                Đã đóng gói & <br /> đang được giao
                              </h3>
                            ) : data.status === "4" ? (
                              <h3>Giao hàng thành công</h3>
                            ) : data.status === "5" ? (
                              <h3>Yêu cầu trả hàng</h3>
                            ) : data.status === "-1" ? (
                              <h3>Trả hàng thất bại</h3>
                            ) : (
                              <h3>Trả hàng thành công</h3>
                            )
                          }
                          subtitle={data.createdDate}
                        />
                      ))}
                </Timeline>
              ) : (
                <Timeline minEvents={2} placeholder className={styles.timeLine}>
                  {billInfo?.timeLines &&
                    billInfo?.timeLines.map((data) => (
                      <TimelineEvent
                        color={
                          data.status === "0" || data.status === "-1"
                            ? "#FF0000"
                            : data.status === "3"
                            ? "#f0ad4e"
                            : "#00cc00"
                        }
                        icon={
                          data.status === "1"
                            ? FaRegFileAlt
                            : data.status === "0"
                            ? FaTimes
                            : data.status === "2"
                            ? FaRegCheckCircle
                            : data.status === "3"
                            ? FaClock
                            : data.status === "4"
                            ? FaRocket
                            : null
                        }
                        title={
                          data.status === "1" ? (
                            <h3>Chờ xác nhận</h3>
                          ) : data.status === "2" ? (
                            <h3>Thanh toán thành công</h3>
                          ) : data.status === "0" ? (
                            <h3>Đã hủy</h3>
                          ) : data.status === "3" ? (
                            <h3>Yêu cầu trả hàng</h3>
                          ) : data.status === "-1" ? (
                            <h3>Trả hàng thất bại</h3>
                          ) : (
                            <h3>Trả hàng thành công</h3>
                          )
                        }
                        subtitle={data.createdDate}
                      />
                    ))}
                </Timeline>
              )}
            </Timeline>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Button
            type="primary"
            size="large"
            onClick={() => setModalDetail(true)}
          >
            Chi tiết
          </Button>
        </div>
      </div>
      <div style={{ margin: "25px 0" }} className={styles.billReturn}>
        <h3>Thông tin khách hàng</h3>
        <Row style={{ margin: "25px 30px" }}>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Tên khách hàng</span>
              </Col>
              <Col span={16}>
                <span>
                  {billInfo?.fullName !== null
                    ? billInfo?.fullName
                    : billInfo?.customerName}
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Ngày giao hàng</span>
              </Col>
              <Col span={16}>
                <span>
                  {billInfo?.shippingDate === null
                    ? billInfo?.conpletionDate
                    : billInfo?.shippingDate}
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Số điện thoại</span>
              </Col>
              <Col span={16}>
                <span>
                  {billInfo?.phoneNumberReceived === null
                    ? billInfo?.phoneNumber
                    : billInfo?.phoneNumberReceived}
                </span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Ngày nhận hàng</span>
              </Col>
              <Col span={16}>
                <span>{billInfo?.conpletionDate}</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Địa chỉ</span>
              </Col>
              <Col span={16}>
                <span>{billInfo?.address}</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Trạng thái</span>
              </Col>
              <Col span={16}>
                <SpanBorder child={"Thành công"} color={"#1677ff"} />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Ghi chú</span>
              </Col>
              <Col span={16}>
                <span>{billInfo?.note}</span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Loại hóa đơn</span>
              </Col>
              <Col span={16}>
                <SpanBorder
                  child={
                    billInfo?.billType === "Online" ? "Trực tuyến" : "Tại quầy"
                  }
                  color={"#1677ff"}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: "25px" }} className={styles.billReturn}>
        <h3 style={{ marginBottom: "25px" }}>Thông tin đơn hàng</h3>
        <div style={{ textAlign: "end", marginBottom: "10px" }}>
          {billInfo?.status !=="ReturnS" && (
            <Button
              size="large"
              type="primary"
              onClick={() => {
                Modal.confirm({
                  centered: true,
                  title: "Xác nhận trả hàng tất cả",
                  content: "Chắc chắn trả hàng?",
                  onOk() {
                    productsReturns = billInfo?.billDetails.filter(
                      (item) => !item.checkInPromotion
                    );
                    setRender(Math.random());
                    notification.success({
                      message: "Thông báo",
                      description: "Thêm thông tin trả hàng thành công!",
                    });
                  },
                });
              }}
            >
              <ReloadOutlined />
              Trả hàng tất cả
            </Button>
          )}
        </div>
        <Table
          dataSource={
            billInfo?.billDetails &&
            billInfo?.billDetails.map((record, index) => ({
              ...record,
              key: index,
            }))
          }
          columns={columns}
        />
      </div>
      <Row>
        <Col span={16}>
          <div
            className={`${styles.billReturn} me-5`}
            style={{ height: "100%" }}
          >
            <h3 style={{ marginBottom: "25px" }}>Thông tin trả hàng</h3>

            <Row>
              {productsReturns &&
                productsReturns.map((record, index) => {
                  return (
                    <Col span={24} key={index}>
                      <Row>
                        <Col span={4}>
                          <div className="m-5">
                            <Carousel style={{ maxWidth: 300 }} autoplay>
                              {record.productImageResponses &&
                                record.productImageResponses.map((item) => {
                                  return (
                                    <img
                                      key={item.id}
                                      style={{
                                        width: "100%",
                                        marginTop: "10px",
                                      }}
                                      alt=""
                                      src={item.path}
                                    />
                                  );
                                })}
                            </Carousel>
                          </div>
                        </Col>
                        <Col span={18}>
                          <div className="m-5" style={{ textAlign: "left" }}>
                            <span style={{ fontWeight: 500 }}>
                              {record.productName +
                                "-" +
                                record.productButton +
                                "-" +
                                record.productBrandName +
                                "-" +
                                record.productCateGoryName +
                                "-" +
                                record.productMaterial +
                                "-" +
                                record.productCollar +
                                "-" +
                                record.productSleeve +
                                "-" +
                                record.productShirtTail +
                                "-" +
                                record.productPatternName +
                                "-" +
                                record.productFormName}
                            </span>
                            <br />
                            <div className={styles.optionColor}>
                              <b>Màu sắc: </b>
                              <span
                                style={{
                                  backgroundColor: record.productColor,
                                  marginLeft: "8px",
                                }}
                              ></span>
                              {record.productColorName}
                            </div>
                            <b>Kích cỡ: </b>
                            <span
                              style={{
                                marginLeft: "8px",
                              }}
                            >
                              {record.productSize}
                            </span>
                            <br />
                            <b>Số lượng trả: </b>
                            <span
                              style={{
                                marginLeft: "8px",
                              }}
                            >
                              {record.quantity}
                            </span>
                            <br />
                            <b>Tổng giá hoàn trả: </b>
                            <span
                              style={{
                                marginLeft: "8px",
                              }}
                            >
                              {(
                                record.productPrice * record.quantity
                              ).toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                          </div>
                        </Col>
                        <Col span={2}>
                          <div
                            style={{
                              display: "flex",
                              height: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {billInfo?.status !=="ReturnS" && (
                              <CloseCircleOutlined
                                style={{
                                  cursor: "pointer",
                                  color: "rgb(255, 77, 79)",
                                  fontSize: "20px",
                                }}
                                onClick={() => deleteIfNoneReturned(index)}
                              />
                            )}
                          </div>
                        </Col>
                        <Col span={24}>
                          {billInfo?.status !=="ReturnS" ? (
                            <Radio.Group
                              name="radiogroup"
                              key={index}
                              defaultValue={
                                productsReturns[index].reason
                                  ? productsReturns[index].reason
                                  : "PRODUCE"
                              }
                              onChange={(e) => {
                                productsReturns[index].reason = e.target.value;
                              }}
                            >
                              <Radio value={"PRODUCE"}>
                                Lỗi do nhà sản xuất
                              </Radio>
                              <Radio value={"OTHER"}>Lý do khác</Radio>
                            </Radio.Group>
                          ) : (
                            <Radio.Group
                              name="radiogroup"
                              key={index}
                              value={
                                productsReturns[index].reason
                                  ? productsReturns[index].reason
                                  : "PRODUCE"
                              }
                            >
                              <Radio value={"PRODUCE"}>
                                Lỗi do nhà sản xuất
                              </Radio>
                              <Radio value={"OTHER"}>Lý do khác</Radio>
                            </Radio.Group>
                          )}
                        </Col>
                        <Col span={24}>
                          <span style={{ fontWeight: 600 }}>Mô tả <span style={{color:"red"}}>*</span></span><br />
                          {
                            billInfo?.status === "ReturnS"?(
                              <span>{productsReturns[index].note}</span>
                            ):(
                              <TextArea readOnly={billInfo?.status === "ReturnS"}  onChange={(event)=>{productsReturns[index].note = event.target.value}}/>
                            )
                          }
                        </Col>
                      </Row>
                      <Divider />
                    </Col>
                  );
                })}
            </Row>
          </div>
        </Col>
        <Col span={8}>
          <div className={`${styles.billReturn} ms-5`}>
            <h3 style={{ marginBottom: "25px" }}>Thông tin thanh toán</h3>
            <Row style={{ margin: "0 15px" }}>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Tổng giá gốc:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>
                  {billInfo?.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Giảm giá:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>
                  {voucher
                    ? voucher?.voucherMethod === "vnd"
                      ? voucher?.voucherValue.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : (billInfo?.price * voucher?.voucherValue) / 100 >
                        voucher?.voucherValueMax
                      ? voucher?.voucherValue +
                        "% - Giảm tối đa: " +
                        voucher?.voucherValueMax.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : voucher?.voucherValue +
                        "% - Giảm: " +
                        (
                          (billInfo?.price * voucher?.voucherValue) /
                          100
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                    : (0).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                </span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Điều kiện giảm giá:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>
                  {voucher
                    ? voucher?.voucherCondition?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })
                    : (0).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                </span>
              </Col>
              <Divider />
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>
                  Tổng giá thanh toán sau trả:
                </span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>
                  {(billInfo?.price - totalPrice)?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Tổng giá trả:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(255, 77, 79)" }}>
                  {(totalPrice).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Giảm giá sau trả:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>
                  {voucher
                    ? voucher?.voucherCondition > billInfo?.price - totalPrice
                      ? "Không đủ điều kiện"
                      : voucher?.voucherMethod === "vnd"
                      ? voucher?.voucherValue.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : ((billInfo?.price - totalPrice) *
                          voucher?.voucherValue) /
                          100 >
                        voucher?.voucherValueMax
                      ? voucher?.voucherValue +
                        "% - Giảm tối đa: " +
                        voucher?.voucherValueMax.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : voucher?.voucherValue +
                        "% - Giảm: " +
                        (
                          ((billInfo?.price - totalPrice) *
                            voucher?.voucherValue) /
                          100
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                    : (0).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                </span>
                <br />
              </Col>
              {voucherNewUse
                    ? voucherNewUse?
                  <Col span={24} style={{border:"1px solid #ccc", borderRadius:"4px", marginBottom: "10px", padding:"8px" }}>
                      <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>Giảm giá mới:{"   "} {voucherNewUse?.voucherName}</span><br />
                      <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>Điều kiện giảm giá: {"   "}
                      {voucherNewUse?.voucherCondition.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}</span><br />
                      <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>Giảm giá: {"   "}
                      {voucherNewUse
                    ? voucherNewUse?.voucherMethod === "vnd"
                      ? voucherNewUse?.voucherValue.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : (billInfo?.price * voucherNewUse?.voucherValue) / 100 >
                      voucherNewUse?.voucherValueMax
                      ? voucherNewUse?.voucherValue +
                        "% - Giảm tối đa: " +
                        voucherNewUse?.voucherValueMax.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                      : voucherNewUse?.voucherValue +
                        "% - Giảm: " +
                        (
                          (billInfo?.price * voucherNewUse?.voucherValue) /
                          100
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                    : (0).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}</span>
                  </Col>:null:null
              }
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Thành tiền:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {totalPricePaid.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                })}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Khách hàng đã thanh toán:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>
                  {(
                    customerPaidBillOld
                  )?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
                <br />
                {
                    billInfo?.shipPrice?
                      <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>
                          ({billInfo?.shipPrice.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })} Phí vận chuyển)
                      </span>:null
                  }

              </Col>
              <Divider />
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>
                {(customerPaidBillOld-totalPricePaid)<0?"Khách hàng cần bù: ": "Tiền thừa trả khách: "}</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {Math.abs(customerPaidBillOld-totalPricePaid).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
              </Col>
              <Col span={24}>
                <span style={{ fontWeight: 600 }}>
                  Mô tả <span style={{ color: "rgb(255, 77, 79)" }}>*</span>
                </span>
                <br />
                {billInfo?.status !== "ReturnS" ? (
                  <div>
                    <TextArea
                      onChange={(e) => {
                        setNote(e.target.value);
                      }}
                      disabled={productsReturns.length === 0}
                      allowClear
                    />
                    <Button
                      type="primary"
                      size="large"
                      style={{ width: "100%", margin: "20px 0 " }}
                      disabled={productsReturns.length === 0}
                      onClick={() =>
                        Modal.confirm({
                          centered: true,
                          title: "Xác nhận trả hàng",
                          content: "Chắc chắn trả hàng?",
                          onOk() {
                            confirmReload(
                              billInfo?.symbol === "Shipping" ? "5" : "3"
                            );
                          },
                        })
                      }
                    >
                      <span style={{ fontWeight: 600 }}>Xác nhận trả hàng</span>
                    </Button>
                  </div>
                ) : (
                  <span>
                    {billInfo?.timeLines[billInfo?.timeLines.length - 1]?.note}
                  </span>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BillReturn;
