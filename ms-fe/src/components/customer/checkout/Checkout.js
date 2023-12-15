import React, { useContext, useEffect, useState } from "react";
import styles from "./Checkout.module.css";
import {
  Button,
  Col,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  notification,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment/moment";
import numeral from "numeral";
import TextArea from "antd/es/input/TextArea";
import FloatingLabels from "../../element/FloatingLabels/FloatingLabels";
import * as yup from "yup";
import { getAuthToken } from "../../../service/Token";
import ModalAddress from "../../admin/sale-couter/ModalAddress.js";
import FormUsingVoucher from "../../element/voucher/FormUsingVoucher.js";
import { Font } from "@react-pdf/renderer";
import { NotificationContext } from "../../element/notification/NotificationAuthen";

const urlAutofillVoucher = "http://localhost:8080/api/client/autoFillVoucher";

const Checkout = ({ setRenderHeader }) => {
  const { showSuccessNotification } = useContext(NotificationContext);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [email, setEmail] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [leadtime, setLeadtime] = useState(null);
  const [shippingFee, setShippingFee] = useState(null);
  const [error, setError] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const token = getAuthToken();
  const [dataToken, setDataToken] = useState(null);
  const [address, setAddress] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState({
    fullName: "",
    sdt: "",
    city: "",
    district: "",
    ward: "",
    descriptionDetail: "",
  });
  const navigate = useNavigate();
  const cartAPI = "http://localhost:8080/api/client/cart";
  const [render, setRender] = useState(null);
  const [showAdd, setShowAdd] = useState(false);
  const [voucherAdd, setVoucherAdd] = useState({});
  const [isOpenFormVoucher, setIsOpenFormVoucher] = useState(false);
  const [username, setUsername] = useState(null);

  const handleProvincesChange = (e) => {
    formData.city = e;
    formData.district = "";
    formData.ward = "";
    setDistricts([]);
    setWards([]);
    fetchDistrict(e?.substring(e.indexOf("|") + 1));
    setSelectedDistrict(null);
    setSelectedWard(null);
    setLeadtime(null);
    setShippingFee(null);
  };

  const handleDistrictChange = (e) => {
    formData.district = e;
    formData.ward = "";
    setWards([]);
    setSelectedDistrict(e?.substring(e.indexOf("|") + 1));
    fetchWard(e?.substring(e.indexOf("|") + 1));
    setSelectedWard(null);
    setLeadtime(null);
    setShippingFee(null);
  };

  const handleWardChange = (e) => {
    formData.ward = e;
    setSelectedWard(e?.substring(e.indexOf("|") + 1));
  };

  useEffect(() => {
    getAuthToken()
      .then((data) => {
        setUsername(data?.username);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    async function autoFillVoucher() {
      try {
        const res = await axios.post(urlAutofillVoucher, {
          priceBill: totalPrice ? totalPrice : null,
          username: username ? username : null,
        });
        const data = await res.data;
        setVoucherAdd(data);
      } catch (err) {
        notification.error({
          message: "Lỗi",
          description: "Hệ thống xảy ra lỗi",
          duration: 2,
        });
      }
    }

    autoFillVoucher();
  }, [totalPrice, username]);

  const fetchProvince = async () => {
    await axios
      .get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
        {
          headers: {
            token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
          },
        }
      )
      .then((res) => setProvinces(res.data.data))
      .catch((err) => console.log(err));
  };

  const fetchDistrict = async (value) => {
    if (value) {
      await axios
        .get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${value}`,
          {
            headers: {
              token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
            },
          }
        )
        .then((response) => {
          setDistricts(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const fetchWard = async (value) => {
    if (value) {
      try {
        const response = await axios.get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value}`,
          {
            headers: {
              token: `0f082cbe-5110-11ee-a59f-a260851ba65c`,
            },
          }
        );

        const wards = response.data.data;
        setWards(wards);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleShippingOrderLeadtime = (toDistrictId, toWardCode) => {
    const values = {
      from_district_id: 3440,
      from_ward_code: "13010",
      to_district_id: Number(toDistrictId),
      to_ward_code: `${toWardCode}`,
      service_id: 53321,
    };

    if (toDistrictId && toWardCode) {
      axios
        .post(
          "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime",
          values,
          {
            headers: {
              token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
              shop_id: "4534109",
            },
          }
        )
        .then((response) => {
          const leadtimeTimestamp = response.data.data.leadtime;
          const leadtimeMoment = moment.unix(leadtimeTimestamp);
          setLeadtime(
            moment(leadtimeMoment._d).format("YYYY-MM-DDTHH:mm:ss.SSS")
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleShippingFee = (insuranceValue, toDistrictId, toWardCode) => {
    let service_id = 53321;
    const values = {
      service_id: service_id,
      insurance_value: insuranceValue,
      coupon: null,
      from_district_id: 3440,
      to_district_id: Number(toDistrictId),
      to_ward_code: toWardCode,
      height: 15,
      length: 15,
      weight: 1000,
      width: 15,
    };

    if (insuranceValue && toDistrictId && toWardCode) {
      axios
        .post(
          "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
          values,
          {
            headers: {
              token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
              shop_id: "4534109",
            },
          }
        )
        .then((response) => {
          setShippingFee(response.data.data.total);
        })
        .catch((error) => {
          console.log("Lỗi khi gọi API lần 1:", error);
          service_id = 53322;
          values.service_id = service_id;
          axios
            .post(
              "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
              values,
              {
                headers: {
                  token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
                  shop_id: "4534109",
                },
              }
            )
            .then((response) => {
              setShippingFee(response.data.data.total);
            })
            .catch((err) => {
              console.log(values);
              console.log("Lỗi khi gọi API lần 2:", err);
            });
        });
    }
  };

  const generateRandomBillCode = () => {
    let result = "";
    const characters = "ABCDEF0123456789";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return "HD_" + result;
  };

  const [formData, setFormData] = useState({
    bill_code: generateRandomBillCode(),
    email: "",
    billType: "Online",
    paymentDetailId: 1,
    price: 0,
    priceReduce: 0,
    fullName: "",
    phoneNumber: "",
    city: "",
    district: "",
    ward: "",
    addressDetail: "",
    note: "",
    lstBillDetailRequest: [],
  });

  const validate = yup.object().shape({
    fullName: yup.string().required("Tên không được để trống"),
    phoneNumber: yup
      .string()
      .required("Số điện thoại không được để trống")
      .matches(
        /^0\d{9}$/,
        "Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số"
      ),
    city: yup.string().required("Thành phố không được để trống"),
    district: yup.string().required("Quận huyện không được để trống"),
    ward: yup.string().required("Phường xã không được để trống"),
    email: yup
      .string()
      .email("Email không hợp lệ")
      .required("Email không được để trống"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const removeProductDetailCart = () => {
    const cart = JSON.parse(localStorage.getItem("user"));
    const checkout = JSON.parse(localStorage.getItem("checkout"));

    if (cart && checkout) {
      const productDetailUpdate = cart.productDetails;

      for (let i = 0; i < productDetailUpdate.length; i++) {
        const cartProductId = productDetailUpdate[i].data[0].id;

        const isInCheckout = checkout.some(
          (checkoutItem) => checkoutItem.data[0].id === cartProductId
        );

        if (isInCheckout) {
          productDetailUpdate.splice(i, 1);
          i--;
        }
      }

      cart.productDetails = productDetailUpdate;
      localStorage.setItem("user", JSON.stringify(cart));
    }
  };

  const removeCartDetail = () => {
    for (let i = 0; i < productDetails?.length; i++) {
      let cartDetailId = productDetails[i].cartDetailResponse.cartDetailId;
      axios
        .delete(`${cartAPI}/${cartDetailId}`)
        .then((response) => { })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const getAddress = async () => {
    const data = await token;
    setUsername(data?.username);
    if (data) {
      await axios
        .get(
          `http://localhost:8080/api/client/address?username=${data?.username}`
        )
        .then((response) => {
          if (response.data) {
            let addd = response.data.filter(
              (item) => item.defaultaddress === true
            )[0];
            setAddress(response.data);
            if (addd) {
              setDefaultAddress(addd);
              let district = addd.district?.substring(
                1 + addd.district.indexOf("|")
              );
              let ward = addd.ward?.substring(1 + addd.ward.indexOf("|"));
              handleShippingOrderLeadtime(Number(district), ward);
              handleShippingFee(100, district, ward);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const billCodeGen = generateRandomBillCode();
    const bill = {
      billCode: billCodeGen,
      price: totalPrice,
      priceReduce: voucherPrice() < 0 ? shippingFee : voucherPrice(),
      paymentDetailId: formData.paymentDetailId,
      billType: "Online",
      symbol: "Shipping",
      status: formData.paymentDetailId === 2 ? "Paid" : "Unpaid",
      accountId: dataToken ? dataToken.username : null,
      note: formData.note,
      lstBillDetailRequest: formData.lstBillDetailRequest,
      transactionCode: formData.paymentDetailId === 2 ? "" : null,
      voucherCode: voucherAdd.voucherCode ? voucherAdd.voucherCode : null,
      emailDetails: {
        recipient: dataToken ? [email] : [formData.email],
        messageBody: `<body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="width: 100%; max-width:720px; margin: 0 auto;">
                    <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 40px 0;">
                        <table style="width: 100%; padding: 0 20px;">
                        <tr>
                            <td style="text-align: left; width: 50%">
                                <img alt="Logo" src="https://firebasestorage.googleapis.com/v0/b/outofcollge.appspot.com/o/logo%2Flogo_OOC.png?alt=media&token=9dec0335-3b77-4c5b-a278-b5b22b9ecbb4" width="70%" />
                            </td>
                            <td style="text-align: right; vertical-align: middle; width: 50%">
                                <span>Đơn hàng ${billCodeGen}</span>
                            </td>
                        </tr>
                    </table>
                            <div style="padding: 0 20px; margin-top: 24px;">
                                <span style="font-weight: 500; font-size: 24px;">Cảm ơn bạn đã mua hàng!</span><br><br>
                                <p style="text-align: justify;">Xin chào ${formData.fullName
          }, Chúng tôi đã nhận được đặt hàng của bạn và đã sẵn sàng để vận chuyển. Chúng tôi sẽ thông báo cho bạn khi đơn hàng được gửi đi.</p><br>
                                <div style="text-align: center">
                                    <a style="color: white; font-weight: 500; padding: 16px 20px; border-radius: 4px; background-color: #1666a2; margin-right: 20px;" href="http://localhost:3000/ms-shop/bill/${billCodeGen}">
                                        Xem đơn hàng
                                    </a>
                                    hoặc <a style="margin-left: 20px;" href="http://localhost:3000/">Đến cửa hàng</a>
                                </div>
                                <br>
                                <hr>
                                <br>
                                        <span>Thông tin đơn hàng</span>
                                        <div style="margin-top: 8px;">
                                        ${productDetails.map((item, index) => {
            return `<div key={index} style="display: flex; justify-content: space-between; align-items: center; padding: 4px 20px;">
                                                    <div style="width: 20%; padding: 4px;">
                                                        <img alt="product" style="width: 100%; border: 1px solid #ccc; border-radius: 8px;" src=${dataToken
                ? item
                  .productImageResponse[0]
                  .path
                : item.data[0]
                  .productImageResponse[0]
                  .path
              }>
                                                    </div>
                                                    <div style="width: 55%; padding: 4px;">
                                                        <p>${!dataToken ? (item.data[0].product.productName + "-" + item.data[0].button.buttonName +
                "-" +
                item.data[0].brand.brandName +
                "-" +
                item.data[0].category.categoryName +
                "-" +
                item.data[0].material.materialName +
                "-" +
                item.data[0].collar.collarTypeName +
                "-" +
                item.data[0].sleeve.sleeveName +
                "-" +
                item.data[0].shirtTail.shirtTailTypeName +
                "-" +
                item.data[0].pattern.patternName +
                "-" +
                item.data[0].form.formName) : (item?.cartDetailResponse.productName +
                  "-" +
                  item?.cartDetailResponse?.brand.brandName +
                  "-" +
                  item?.cartDetailResponse?.category.categoryName +
                  "-" +
                  item?.cartDetailResponse?.pattern.patternName +
                  "-" +
                  item?.cartDetailResponse?.form.formName +
                  "-" +
                  item?.cartDetailResponse?.button.buttonName +
                  "-" +
                  item?.cartDetailResponse?.material.materialName +
                  "-" +
                  item?.cartDetailResponse?.collarType.collarName +
                  "-" +
                  item?.cartDetailResponse?.sleeveType.sleeveName +
                  "-" +
                  item?.cartDetailResponse?.shirtTailType.shirtTailName)} <span style="display: inline-block">(x ${item.quantity})</span></p>
                                                    </div>
                                                    <div style="width: 25%; padding: 4px;">
                                                        <p>${dataToken
                ? (item
                  ?.promotion[0]
                  ? (item
                    ?.promotion[0]
                    ?.promotionMethod ===
                    "vnd"
                    ? item
                      ?.promotion[0]
                      ?.promotionValue
                    : ((100 -
                      item
                        ?.promotion[0]
                        ?.promotionValue) /
                      100) *
                    item
                      ?.cartDetailResponse
                      ?.priceitem) *
                  item
                    .cartDetailResponse
                    ?.quantity
                  : item
                    .cartDetailResponse
                    ?.quantity *
                  item
                    ?.cartDetailResponse
                    ?.priceProductDetail
                ).toLocaleString(
                  "vi-VN",
                  {
                    style:
                      "currency",
                    currency:
                      "VND",
                  }
                )
                : (item.data[0]
                  .promotion[0]
                  ? (item.data[0]
                    .promotion[0]
                    ?.promotionMethod ===
                    "vnd"
                    ? item
                      .data[0]
                      .promotion[0]
                      ?.promotionValue
                    : ((100 -
                      item
                        .data[0]
                        .promotion[0]
                        ?.promotionValue) /
                      100) *
                    item
                      .data[0]
                      .price) *
                  item?.quantity
                  : item?.quantity *
                  item.data[0]
                    .price
                ).toLocaleString(
                  "vi-VN",
                  {
                    style:
                      "currency",
                    currency:
                      "VND",
                  }
                )
              }</p>
                                                    </div >
                                                </div > `;
          })}
                                            <hr>
                                            <div style="width: 70%; float: right; padding: 4px 20px;">
                                                <div style="display: flex; justify-content: space-between; padding: 4px 0;">
                                                    <span>Tổng giá trị sản phẩm:</span>
                                                    <span style="font-weight: 500;">
                                                        ${totalPrice.toLocaleString(
            "vi-VN",
            {
              style: "currency",
              currency: "VND",
            }
          )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </body>`,
        subject: `THÔNG BÁO XÁC NHẬN ĐƠN HÀNG ${billCodeGen}`,
      },
    };

    const billAddress = {
      email: formData.email,
      fullName: formData.fullName,
      sdt: formData.phoneNumber,
      city: formData.city,
      district: formData.district,
      ward: formData.ward,
      descriptionDetail: formData.addressDetail,
    };

    if (!dataToken) {
      try {
        await validate.validate(formData, { abortEarly: false });
        setError({});
      } catch (errors) {
        const validationErrors = {};
        errors.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setError(validationErrors);
        return;
      }
    }

    Modal.confirm({
      title: "Xác nhận thanh toán",
      content: "Bạn có chắc chắn muốn thanh toán?",
      async onOk() {
        setFormData({ ...formData, lstBillDetailRequest: [] });
        if (dataToken) {
          for (let i = 0; i < productDetails?.length; i++) {
            const billDetail = {
              productDetailId:
                productDetails[i].cartDetailResponse.productDetailId,
              price: productDetails[i]?.promotion[0]
                ? (productDetails[i]?.promotion[0]?.promotionMethod === "vnd"
                  ? productDetails[i]?.cartDetailResponse
                    ?.priceProductDetail -
                  productDetails[i]?.promotion[0]?.promotionValue
                  : ((100 - productDetails[i]?.promotion[0]?.promotionValue) /
                    100) *
                  productDetails[i]?.cartDetailResponse
                    ?.priceProductDetail)
                : productDetails[i]?.cartDetailResponse?.priceProductDetail,
              quantity: productDetails[i].cartDetailResponse.quantity,
            };
            formData.lstBillDetailRequest.push(billDetail);
          }
        } else {
          for (let i = 0; i < productDetails?.length; i++) {
            const billDetail = {
              productDetailId: productDetails[i].data[0].id,
              price: productDetails[i].data[0].promotion[0]
                ? (productDetails[i].data[0].promotion[0]?.promotionMethod ===
                  "vnd"
                  ? productDetails[i].data[0].price -
                  productDetails[i].data[0].promotion[0]?.promotionValue
                  : ((100 -
                    productDetails[i].data[0].promotion[0]
                      ?.promotionValue) /
                    100) *
                  productDetails[i].data[0].price)
                : productDetails[i].data[0].price,
              quantity: productDetails[i].quantity,
            };
            formData.lstBillDetailRequest.push(billDetail);
          }
        }

        try {
          const response = await axios.post(
            "http://localhost:8080/api/client/bill",
            bill
          );
          const responseAddress = await axios.post(
            "http://localhost:8080/api/client/address",
            billAddress
          );
          await axios.post("http://localhost:8080/api/client/delivery-note", {
            billId: response.data.id,
            addressId: dataToken ? defaultAddress?.id : responseAddress.data.id,
            name: dataToken ? defaultAddress?.fullName : formData.fullName,
            phoneNumber: dataToken ? defaultAddress?.sdt : formData.phoneNumber,
            shipDate: leadtime ?? null,
            shipPrice: shippingFee ?? null,
          });
          if (formData.paymentDetailId === 2) {
            axios
              .get(`http://localhost:8080/api/client/pay`, {
                params: {
                  billId: response.data.id,
                  price: totalPrice + shippingFee,
                  email: formData.email,
                },
              })
              .then((response) => {
                window.location.href = `${response.data}`;
                //notifications
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            showSuccessNotification("Xác nhận đơn hàng", "confirm-order");
            notification.success({
              message: "Thông báo",
              description: "Thanh toán thành công",
              duration: 2,
            });
            navigate(`/ms-shop`);
          }
          removeCartDetail();
          localStorage.removeItem("checkout");

          setRenderHeader(Math.random());
        } catch (error) {
          console.log(error);
        }
        if (!dataToken) {
          removeProductDetailCart();
          setRenderHeader(Math.random());
        }
      },
    });

    console.log(voucherPrice() < 0 ? shippingFee : voucherPrice());
  };

  const getAllCarts = async () => {
    const data = await token;
    setDataToken(data);
    let carts = JSON.parse(localStorage.getItem("checkout"));
    if (!carts) {
      navigate(`/ms-shop`);
    }
    setProductDetails(carts);
    let totalPrice = 0;
    if (data) {
      for (let i = 0; i < carts?.length; i++) {
        let priceReduced = carts[i]?.promotion[0]
          ? (carts[i]?.promotion[0]?.promotionMethod === "vnd"
            ? carts[i]?.cartDetailResponse?.priceProductDetail -
            carts[i]?.promotion[0]?.promotionValue
            : ((100 - carts[i]?.promotion[0]?.promotionValue) / 100) *
            carts[i]?.cartDetailResponse?.priceProductDetail) *
          carts[i].cartDetailResponse?.quantity
          : carts[i]?.cartDetailResponse?.priceProductDetail *
          carts[i].cartDetailResponse?.quantity;
        totalPrice += priceReduced;
      }
    } else {
      for (let i = 0; i < carts?.length; i++) {
        let priceReduced = carts[i].data[0].promotion[0]
          ? (carts[i].data[0].promotion[0]?.promotionMethod === "vnd"
            ? carts[i].data[0].price -
            carts[i].data[0].promotion[0]?.promotionValue
            : ((100 - carts[i].data[0].promotion[0]?.promotionValue) / 100) *
            carts[i].data[0].price) * carts[i]?.quantity
          : carts[i].data[0].price * carts[i]?.quantity;
        totalPrice += priceReduced;
      }
    }
    setTotalPrice(Number(totalPrice));
  };

  const voucherPrice = () => {
    let result = totalPrice;

    if (voucherAdd && voucherAdd.voucherMethod === "vnd") {
      if (result > (voucherAdd.voucherCondition ?? 0)) {
        result -= voucherAdd.voucherValue ?? 0;
      }
    } else if (voucherAdd && voucherAdd.voucherMethod === "%") {
      if (result > voucherAdd.voucherCondition) {
        const discountPercent = voucherAdd.voucherValue ?? 0;
        const maxDiscount = voucherAdd.voucherValueMax ?? 0;
        let discount = (totalPrice * discountPercent) / 100;
        result -= Math.min(discount, maxDiscount);
      }
    } else {
      result = totalPrice;
    }

    return result
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAddress();
    const getEmail = async () => {
      const data = await token;
      if (data) {
        await axios
          .get(`http://localhost:8080/api/client/account/${data?.username}`)
          .then((response) => {
            console.log(response.data.email);
            setEmail(response.data.email);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    // axios.get(`http://localhost:8080/api/client/pdf/${billCode}`)
    //     .then((response) => {
    //         setBill(response.data);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    getEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchProvince();
    fetchDistrict();
    fetchWard();
    getAllCarts();

    if (!dataToken) {
      handleShippingOrderLeadtime(selectedDistrict, selectedWard);
      handleShippingFee(100, selectedDistrict, selectedWard);
    } else {
      let district = defaultAddress.district?.substring(
        1 + defaultAddress.district.indexOf("|")
      );
      let ward = defaultAddress.ward?.substring(
        1 + defaultAddress.ward.indexOf("|")
      );
      handleShippingOrderLeadtime(Number(district), ward);
      handleShippingFee(100, district, ward);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDistrict, selectedWard, render]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Row style={{ paddingTop: "50px" }}>
          <Col span={14}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
              THANH TOÁN
            </h1>
            <Row>
              <Col span={13}>
                <Row style={{ marginBottom: "5px" }}>
                  <Col span={18}>
                    <span style={{ fontSize: "20px", fontWeight: 500 }}>
                      Thông tin đơn hàng
                    </span>
                    {dataToken && (
                      <Button
                        type="primary"
                        onClick={() => setShowAdd(true)}
                        style={{ margin: "12px 0" }}
                      >
                        Chọn địa chỉ
                      </Button>
                    )}
                    <ModalAddress
                      isModalOpen={showAdd}
                      handleCancel={() => setShowAdd(false)}
                      address={address}
                      selectedAddress={setDefaultAddress}
                      render={setRender}
                      username={username}
                    />
                  </Col>
                  <Col span={6} style={{ paddingTop: 5 }}>
                    {!dataToken && (
                      <span style={{ fontSize: "15px", fontWeight: 500 }}>
                        <Link
                          style={{ color: "#111111" }}
                          to={"/authen/sign-in"}
                        >
                          <UserOutlined />
                          Đăng nhập
                        </Link>
                      </span>
                    )}
                  </Col>
                </Row>

                {/* form */}
                <Row>
                  {dataToken ? null : (
                    <Col className={styles.mb} span={24}>
                      <FloatingLabels
                        label="Email"
                        zIndex={true}
                        value={
                          dataToken ? defaultAddress?.email : formData?.email
                        }
                      >
                        <Input
                          size="large"
                          name="email"
                          onChange={handleChange}
                          value={
                            dataToken ? defaultAddress?.email : formData?.email
                          }
                          allowClear
                        />
                        {error.email && (
                          <div className={styles.errorText}>{error.email}</div>
                        )}
                      </FloatingLabels>
                    </Col>
                  )}
                  <Col className={styles.mb} span={24}>
                    <FloatingLabels
                      label="Họ tên"
                      zIndex={true}
                      value={
                        dataToken ? defaultAddress.fullName : formData.fullName
                      }
                    >
                      <Input
                        size="large"
                        name="fullName"
                        onChange={handleChange}
                        value={
                          dataToken
                            ? defaultAddress.fullName
                            : formData.fullName
                        }
                        allowClear
                      />
                      {error.fullName && (
                        <div className={styles.errorText}>{error.fullName}</div>
                      )}
                    </FloatingLabels>
                  </Col>
                  <Col className={styles.mb} span={24}>
                    <FloatingLabels
                      label="Số điện thoại"
                      zIndex={true}
                      value={
                        dataToken ? defaultAddress.sdt : formData.phoneNumber
                      }
                    >
                      <Input
                        size="large"
                        name={`${dataToken ? "sdt" : "phoneNumber"}`}
                        onChange={handleChange}
                        value={
                          dataToken ? defaultAddress.sdt : formData.phoneNumber
                        }
                        allowClear
                      />
                      {error.phoneNumber && (
                        <div className={styles.errorText}>
                          {error.phoneNumber}
                        </div>
                      )}
                    </FloatingLabels>
                  </Col>
                  <Col className={styles.mb} span={24}>
                    <FloatingLabels
                      label="Tỉnh/thành phố"
                      zIndex={true}
                      value={dataToken ? defaultAddress.city : formData.city}
                    >
                      <Select
                        showSearch
                        style={{
                          height: 45,
                          width: 380,
                        }}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        name="city"
                        value={
                          dataToken
                            ? defaultAddress.city?.substring(
                              0,
                              defaultAddress.city.indexOf("|")
                            )
                            : formData.city
                        }
                        allowClear
                        onChange={(e) => {
                          handleProvincesChange(e);
                        }}
                        options={provinces.map((province) => ({
                          value:
                            province.ProvinceName + "|" + province.ProvinceID,
                          label: province.ProvinceName,
                        }))}
                      />
                      {error.city && (
                        <div className={styles.errorText}>{error.city}</div>
                      )}
                    </FloatingLabels>
                  </Col>
                  <Col className={styles.mb} span={24}>
                    <FloatingLabels
                      label="Quận/huyện"
                      zIndex={true}
                      value={
                        dataToken ? defaultAddress.district : formData.district
                      }
                    >
                      <Select
                        showSearch
                        style={{
                          height: 45,
                          width: 380,
                        }}
                        value={
                          dataToken
                            ? defaultAddress?.district?.substring(
                              0,
                              defaultAddress.district.indexOf("|")
                            )
                            : formData.district
                        }
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        onChange={(e) => handleDistrictChange(e)}
                        options={districts?.map((district) => ({
                          value:
                            district.DistrictName + "|" + district.DistrictID,
                          label: district.DistrictName,
                        }))}
                        allowClear
                      />
                      {error.district && (
                        <div className={styles.errorText}>{error.district}</div>
                      )}
                    </FloatingLabels>
                  </Col>
                  <Col className={styles.mb} span={24}>
                    <FloatingLabels
                      label="Phường xã"
                      zIndex={true}
                      value={dataToken ? defaultAddress.ward : formData.ward}
                    >
                      <Select
                        showSearch
                        style={{
                          height: 45,
                          width: 380,
                        }}
                        value={
                          dataToken
                            ? defaultAddress.ward?.substring(
                              0,
                              defaultAddress.ward.indexOf("|")
                            )
                            : formData.ward
                        }
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          (option?.label ?? "").includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        onChange={(e) => handleWardChange(e)}
                        allowClear
                        options={wards?.map((ward) => ({
                          value: ward.WardName + "|" + ward.WardCode,
                          label: ward.WardName,
                        }))}
                      />
                      {error.ward && (
                        <div className={styles.errorText}>{error.ward}</div>
                      )}
                    </FloatingLabels>
                  </Col>
                  <Col className={styles.mb} span={24}>
                    <FloatingLabels
                      label="Địa chỉ chi tiết"
                      zIndex={true}
                      value={
                        dataToken
                          ? defaultAddress.descriptionDetail
                          : formData.addressDetail
                      }
                    >
                      <Input
                        size="large"
                        name="addressDetail"
                        value={
                          dataToken
                            ? defaultAddress.descriptionDetail
                            : formData.addressDetail
                        }
                        onChange={handleChange}
                        allowClear
                      />
                    </FloatingLabels>
                  </Col>
                  <Col className={styles.mb} span={24}>
                    <FloatingLabels
                      label="Ghi chú"
                      zIndex={true}
                      value={formData.note}
                    >
                      <TextArea rows={4} name="note" onChange={handleChange} />
                    </FloatingLabels>
                  </Col>
                </Row>
              </Col>
              <Col span={10} style={{ marginLeft: "20px" }}>
                <span style={{ fontSize: "20px", fontWeight: 500 }}>
                  Vận chuyển
                </span>
                <div
                  style={{
                    marginTop: "5px",
                    border: "1px solid rgba(175, 175, 175, .34)",
                    padding: "20px 10px",
                    borderRadius: "5px",
                    height: 60,
                    width: "110%",
                  }}
                >
                  <span style={{ fontWeight: 500 }}>
                    {" "}
                    Thời gian nhận hàng dự kiến:
                  </span>
                  <span style={{ marginLeft: "10px" }}>
                    {leadtime ? moment(leadtime).format("DD/MM/YYYY") : ""}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "20px",
                    border: "1px solid rgba(175, 175, 175, .34)",
                    padding: "10px",
                    width: "110%",
                  }}
                >
                  <Radio.Group
                    name="paymentDetailId"
                    onChange={handleChange}
                    value={formData.paymentDetailId}
                  >
                    <Space direction="vertical">
                      <Radio value={1} style={{ marginBottom: 15 }}>
                        <span style={{ fontWeight: 500 }}>
                          Thanh toán khi nhận hàng
                        </span>
                        {formData.paymentDetailId === 1 && (
                          <div>Bạn sẽ thanh toán khi nhận được hàng</div>
                        )}
                      </Radio>
                      <Radio value={2}>
                        <span style={{ fontWeight: 500 }}>
                          Thanh toán trưc tuyến
                        </span>
                        {formData.paymentDetailId === 2 && (
                          <div>
                            Bạn sẽ thanh toán bằng hình thức chuyển khoản
                          </div>
                        )}
                      </Radio>
                    </Space>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <div
              style={{
                border: "1px solid rgba(175, 175, 175, .34)",
                width: "auto",
                height: "700px",
                padding: " 20px",
                marginLeft: 40,
              }}
            >
              <h1 style={{ marginBottom: "10px" }}>Đơn hàng</h1>
              <hr />
              <div style={{ maxHeight: "300px", overflowY: "auto" }}>
                <table>
                  <thead>
                    <tr>
                      <th className={styles.visuallyHidden}>Ảnh sản phẩm</th>
                      <th className={styles.visuallyHidden}>Mô tả</th>
                      <th className={styles.visuallyHidden}>Đơn giá</th>
                    </tr>
                  </thead>
                  {dataToken ? (
                    <tbody>
                      <Space
                        style={{ width: "100%" }}
                        direction="vertical"
                        size={16}
                      >
                        {productDetails &&
                          productDetails?.map((productDetail) => (
                            <tr>
                              <div style={{ width: "100%" }}>
                                <Space
                                  style={{
                                    width: "100%",
                                    borderBottom: "1px solid #ccc",
                                    padding: "8px 8px 10px 8px",
                                  }}
                                  direction="horizontal"
                                  size={16}
                                >
                                  <div className={styles.productThumbnail}>
                                    <div
                                      className={styles.productThumbnailWrapper}
                                    >
                                      <img
                                        src={
                                          productDetail?.productImageResponse[0]
                                            ?.path
                                        }
                                        alt=""
                                        className={styles.productThumbnailImage}
                                      />
                                    </div>
                                    <span
                                      className={
                                        styles.productThumbnailQuantity
                                      }
                                    >
                                      {
                                        productDetail?.cartDetailResponse
                                          .quantity
                                      }
                                    </span>
                                  </div>
                                  <div style={{ width: 256 }}>
                                    <span>
                                      {productDetail?.cartDetailResponse.productName +
                                        "-" +
                                        productDetail?.cartDetailResponse.button.buttonName +
                                        "-" +
                                        productDetail?.cartDetailResponse.brand.brandName +
                                        "-" +
                                        productDetail?.cartDetailResponse.category.categoryName +
                                        "-" +
                                        productDetail?.cartDetailResponse.material.materialName +
                                        "-" +
                                        productDetail?.cartDetailResponse.collarType.collarTypeName +
                                        "-" +
                                        productDetail?.cartDetailResponse.sleeveType.sleeveName +
                                        "-" +
                                        productDetail?.cartDetailResponse.shirtTailType.shirtTailTypeName +
                                        "-" +
                                        productDetail?.cartDetailResponse.pattern.patternName +
                                        "-" +
                                        productDetail?.cartDetailResponse.form.formName}
                                    </span>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          height: 20,
                                          width: 20,
                                          borderRadius: "50%",
                                          backgroundColor:
                                            productDetail?.cartDetailResponse.color
                                              .colorCode,
                                        }}
                                      ></div>
                                      /
                                      <span>
                                        {
                                          productDetail?.cartDetailResponse.size
                                            .sizeName
                                        }
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    {numeral(
                                      productDetail?.promotion[0]
                                        ? (productDetail?.promotion[0]
                                          ?.promotionMethod === "vnd"
                                          ? productDetail?.cartDetailResponse
                                            ?.priceProductDetail -
                                          productDetail?.promotion[0]
                                            ?.promotionValue
                                          : ((100 -
                                            productDetail?.promotion[0]
                                              ?.promotionValue) /
                                            100) *
                                          productDetail?.cartDetailResponse
                                            ?.priceProductDetail)
                                        : productDetail?.cartDetailResponse
                                          ?.priceProductDetail
                                    ).format("0,0") + "đ"}
                                  </div>
                                </Space>
                              </div>
                            </tr>
                          ))}
                      </Space>
                    </tbody>
                  ) : (
                    <tbody>
                      <Space
                        style={{ width: "100%" }}
                        direction="vertical"
                        size={16}
                      >
                        {productDetails &&
                          productDetails?.map((productDetail) => (
                            <tr>
                              <div style={{ width: "100%" }}>
                                <Space
                                  style={{
                                    width: "100%",
                                    borderBottom: "1px solid #ccc",
                                    padding: "8px 8px 10px 8px",
                                  }}
                                  direction="horizontal"
                                  size={16}
                                >
                                  <div className={styles.productThumbnail}>
                                    <div
                                      className={styles.productThumbnailWrapper}
                                    >
                                      <img
                                        src={
                                          productDetail.data[0]
                                            ?.productImageResponse[0]?.path
                                        }
                                        alt=""
                                        className={styles.productThumbnailImage}
                                      />
                                    </div>
                                    <span
                                      className={
                                        styles.productThumbnailQuantity
                                      }
                                    >
                                      {productDetail.quantity}
                                    </span>
                                  </div>
                                  <div style={{ width: 256 }}>
                                    <span>
                                      {productDetail.data[0].product
                                        .productName +
                                        "-" +
                                        productDetail.data[0].button
                                          .buttonName +
                                        "-" +
                                        productDetail.data[0].brand.brandName +
                                        "-" +
                                        productDetail.data[0].category
                                          .categoryName +
                                        "-" +
                                        productDetail.data[0].material
                                          .materialName +
                                        "-" +
                                        productDetail.data[0].collar
                                          .collarTypeName +
                                        "-" +
                                        productDetail.data[0].sleeve
                                          .sleeveName +
                                        "-" +
                                        productDetail.data[0].shirtTail
                                          .shirtTailTypeName +
                                        "-" +
                                        productDetail.data[0].pattern
                                          .patternName +
                                        "-" +
                                        productDetail.data[0].form.formName}
                                    </span>
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                      }}
                                    >
                                      <div
                                        style={{
                                          height: 20,
                                          width: 20,
                                          borderRadius: "50%",
                                          backgroundColor:
                                            productDetail.data[0].color
                                              .colorCode,
                                        }}
                                      ></div>
                                      /
                                      <span>
                                        {productDetail.data[0].size.sizeName}
                                      </span>
                                    </div>
                                  </div>
                                  <div>
                                    {numeral(
                                      productDetail.data[0].promotion[0]
                                        ? (productDetail.data[0].promotion[0]
                                          ?.promotionMethod === "vnd"
                                          ? productDetail.data[0].price -
                                          productDetail.data[0].promotion[0]
                                            ?.promotionValue
                                          : ((100 -
                                            productDetail.data[0]
                                              .promotion[0]
                                              ?.promotionValue) /
                                            100) *
                                          productDetail.data[0].price) *
                                        productDetail?.quantity
                                        : productDetail?.quantity *
                                        productDetail.data[0].price
                                    ).format("0,0") + "đ"}
                                  </div>
                                </Space>
                              </div>
                            </tr>
                          ))}
                      </Space>
                    </tbody>
                  )}
                </table>
              </div>
              <div
                style={{
                  borderTop: "1px solid rgba(175,175,175,.34)",
                  padding: "10px",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => setIsOpenFormVoucher(true)}
                >
                  Chọn mã giảm giá
                </Button>
                <FormUsingVoucher
                  priceBill={totalPrice ? totalPrice : null}
                  voucher={voucherAdd}
                  setVoucher={setVoucherAdd}
                  isOpen={isOpenFormVoucher}
                  setIsOpen={setIsOpenFormVoucher}
                  username={dataToken?.username ? dataToken?.username : ""}
                />
                {console.log(voucherAdd)}
              </div>
              <div
                style={{
                  borderTop: "1px solid rgba(175,175,175,.34)",
                  padding: "10px",
                }}
              >
                <Row style={{ margin: "0" }}>
                  <Col span={18} className={styles.textLeft}>
                    Tạm tính
                  </Col>
                  <Col span={6}>{numeral(totalPrice).format("0,0") + "đ"}</Col>
                  <Col span={18} className={styles.textLeft}>
                    Phí vận chuyển
                  </Col>
                  <Col span={6}>
                    {numeral(shippingFee).format("0,0 đ") + "đ"}
                  </Col>
                  <Col span={18} className={styles.textLeft}>
                    Giảm giá
                  </Col>
                  <Col span={6}>
                    {voucherAdd?.voucherValue
                      ? voucherAdd.voucherMethod === "vnd"
                        ? voucherAdd?.voucherValue.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                        : voucherAdd?.voucherValue + "%"
                      : "0đ"}
                    {voucherAdd.voucherId ? (
                      <span
                        style={{
                          marginLeft: "20px",
                          color: "green",
                          cursor: "pointer",
                        }}
                        onClick={() => setVoucherAdd({})}
                      >
                        ❌
                      </span>
                    ) : null}
                  </Col>

                  <Col span={18} className={styles.textLeft}>
                    Tổng cộng
                  </Col>
                  <Col span={6}>
                    {numeral(voucherPrice() < 0 ? shippingFee : voucherPrice() + shippingFee).format("0,0") + "đ"}
                  </Col>

                  {voucherAdd.voucherId ? (
                    <Col span={24} className={styles.textLeft}>
                      <span
                        style={{ color: "#ff9130" }}
                      >{`Đang áp dụng voucher `}</span>{" "}
                      <strong>{voucherAdd?.voucherName}</strong>
                    </Col>
                  ) : null}
                </Row>
              </div>
              <div>
                <Link to="" style={{ textAlign: "left" }}>
                  {" "}
                  {"< Quay về giỏ hàng"}
                </Link>
                <Button
                  type="primary"
                  style={{
                    width: "100px",
                    height: "40px",
                    marginLeft: "150px",
                  }}
                  onClick={handleSubmit}
                >
                  Đặt hàng
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default Checkout;
