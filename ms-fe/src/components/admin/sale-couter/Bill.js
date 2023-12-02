import {
  Tabs,
  Button,
  Table,
  Space,
  Divider,
  Row,
  Col,
  Input,
  Switch,
  Select,
  InputNumber,
  notification,
  Modal,
  Carousel,
  Segmented,
  Avatar,
  Badge,
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Bill.module.css";
import ModalProduct from "./ModalProduct";
import logoGhn from "../../../Assets/img/logo/logo_ghn.png";
import {
  CloseCircleOutlined,
  DeleteOutlined,
  DollarOutlined,
  SwapOutlined,
  QrcodeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  WalletOutlined,
} from "@ant-design/icons";
import * as Yup from "yup";
import axios from "axios";
import { now } from "moment";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ModalAccount from "./ModalAccount";
import ModalAddress from "./ModalAddress";
import QRReader from "../../../service/QRReader";
import FormUsingVoucher from "../../element/voucher/FormUsingVoucher";
import numeral from "numeral";
import SearchNameOrCodeVoucher from "../../element/voucher/SearchNameOrCodeVoucher";
import { getToken } from "../../../service/Token";

const Bill = () => {
  var initialItems = [];
  const [modalVisible, setModalVisible] = useState([]);
  const [modalAccountVisible, setModalAccountVisible] = useState([]);
  const [modalQRScanOpen, setModalQRScanOpen] = useState(false);
  function getCart() {
    initialItems = [];
    var checkEmpty = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("HD")) {
        var tab = {
          label: "Hóa đơn: " + localStorage.key(i),
          key: key,
          count: JSON.parse(localStorage.getItem(key)).productDetails.length
        };
        initialItems.push(tab);
        checkEmpty++;
      }
    }
    if (checkEmpty === 0) {
      localStorage.setItem(
        generateRandomBillCode(),
        JSON.stringify({
          timeStart: now(),
          productDetails: [],
          account: null,
        })
      );
    }
  }

  getCart();
  // danh sách table
  const initializeModalStates = () => {
    const initialState = items.map(() => false);
    setModalVisible(initialState);
  };

  const updateQuantity = (record, index, value) => {
    let cart = JSON.parse(localStorage.getItem(cartId));
    let productDetails = cart.productDetails;
    if (value > 99) {
      notification.warning({
        message: "Thông báo",
        description: "Chỉ được mua 100 sản phẩm",
        duration: 1,
      });
      setRendered(Math.random());
      return;
    }
    if (value > productDetails[index].productDetail.quantity) {
      notification.warning({
        message: "Thông báo",
        description: "Đã vượt quá số lượng tồn",
        duration: 1,
      });
      setRendered(Math.random());
      return;
    }
    productDetails[index].quantity = value;
    cart.productDetails = productDetails;
    localStorage.setItem(cartId, JSON.stringify(cart));
    notification.success({
      message: "Thông báo",
      description: "Chỉnh sửa số lượng thành công",
      duration: 1,
    });
    setRendered(cart);
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "stt",
      width: 70,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      key: "product",
      datatIndex: "product",
      title: "Sản phẩm",
      width: "50%",
      render: (text, record, index) => {
        return (
          <Row style={{ width: "100%" }}>
            <Col span={6} style={{ height: "100%" }}>
              <div
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                {record.productDetail.promotion?.length > 0 ? (
                  <Badge.Ribbon
                    text={`Giảm ${record.productDetail.promotion[0].promotionValue
                      ? record.productDetail.promotion[0].promotionMethod ===
                        "%"
                        ? record.productDetail.promotion[0].promotionValue +
                        " " +
                        record.productDetail.promotion[0].promotionMethod
                        : record.productDetail.promotion[0].promotionValue.toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )
                      : null
                      }`}
                    color="red"
                  >
                    <Carousel style={{ maxWidth: "300px" }} autoplay>
                      {record.productDetail.productImageResponse &&
                        record.productDetail.productImageResponse.map(
                          (item) => {
                            return (
                              <img
                                key={item.id}
                                style={{ width: "100%", marginTop: "10px" }}
                                alt=""
                                src={item.path}
                              />
                            );
                          }
                        )}
                    </Carousel>
                  </Badge.Ribbon>
                ) : (
                  <Carousel style={{ maxWidth: "300px" }} autoplay>
                    {record.productDetail.productImageResponse &&
                      record.productDetail.productImageResponse.map((item) => {
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
                )}
              </div>
            </Col>
            <Col span={18} style={{ height: "100%" }}>
              <div
                className="m-5"
                style={{
                  textAlign: "start",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontWeight: "500" }}>
                  {record.productDetail.product.productName +
                    "-" +
                    record.productDetail.brand.brandName +
                    "-" +
                    record.productDetail.category.categoryName +
                    "-" +
                    record.productDetail.button.buttonName +
                    "-" +
                    record.productDetail.material.materialName +
                    "-" +
                    record.productDetail.collar.collarTypeName +
                    "-" +
                    record.productDetail.sleeve.sleeveName +
                    "-" +
                    record.productDetail.shirtTail.shirtTailTypeName +
                    "-" +
                    record.productDetail.pattern.patternName +
                    "-" +
                    record.productDetail.form.formName}
                </span>
                <br />
                <div className={styles.optionColor}>
                  <b>Màu sắc: </b>
                  <span
                    style={{
                      backgroundColor: record.productDetail.color.colorCode,
                      marginLeft: "8px",
                    }}
                  ></span>
                  {record.productDetail.color.colorName}
                </div>
                <br />
                <b>Kích cỡ: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {record.productDetail.size.sizeName}
                </span>
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record, index) => {
        return (
          <InputNumber
            min={1}
            max={record.quantity >= record.productDetail.quantity}
            value={record.quantity}
            onBlur={(event) =>
              updateQuantity(record, index, event.target.value)
            }
          />
        );
      },
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",

      render: (text, record, index) => {
        return (
          <div style={{ textAlign: "center" }}>
            {record.productDetail.promotionValue ? (
              <span style={{ color: "#ccc" }}>
                <strike>
                  {record.productDetail.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </strike>
              </span>
            ) : (
              <span>
                {record.productDetail.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            )}
            <br />
            <span>
              {record.productDetail.promotionValue
                ? record.productDetail.promotionMethod === "%"
                  ? (
                    (record.productDetail.price *
                      (100 - Number(record.productDetail.promotionValue))) /
                    100
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                  : (
                    record.productDetail.price -
                    Number(record.productDetail.promotionValue)
                  ).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })
                : null}
            </span>
          </div>
        );
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (text, record, index) => {
        return (
          <span>
            {(record.priceReduce * record.quantity).toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            icon={<DeleteOutlined />}
            danger
            href="#1"
            key={record.key}
            onClick={() => handleDeleteProduct(record, index)}
          ></Button>
        </Space>
      ),
    },
  ];

  const options = [
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "160px",
            height: "50px",
          }}
        >
          <Avatar src={<DollarOutlined style={{ color: "black" }} />} />
          <div style={{ marginLeft: 8 }}>Tiền mặt</div>
        </div>
      ),
      value: "1",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "160px",
            height: "50px",
          }}
        >
          <Avatar src={<SwapOutlined style={{ color: "black" }} />} />
          <div style={{ marginLeft: 8 }}> Chuyển khoản</div>
        </div>
      ),
      value: "2",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(1);

  const handleOptionChange = (value, index) => {
    setSelectedOption(value);
    if (value === "2") {
      setAmountPaid(0);
    }
  };

  // xóa sản phẩm trong giỏ hàng
  const handleDeleteProduct = (record, index) => {
    Modal.confirm({
      title: "Xóa sản phẩm",
      content: "Bạn có chắc chắn muốn xóa sản phẩm?",
      onOk() {
        let cart = JSON.parse(localStorage.getItem(cartId));
        let productDetails = cart.productDetails;
        productDetails.splice(index, 1);
        localStorage.setItem(cartId, JSON.stringify(cart));
        setRendered(cart);
        notification.error({
          message: "Thông báo",
          description: "Xóa sản phẩm thành công.",
          duration: 2,
        });
      },
    });
  };

  const [activeKey, setActiveKey] = useState(
    initialItems.length === 0 ? null : initialItems[0].key
  );
  const [items, setItems] = useState(initialItems);
  const [switchChange, setSwitchChange] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cartId, setCartId] = useState(
    initialItems.length === 0 ? null : initialItems[0].key
  );
  const [render, setRendered] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [remainAmount, setRemainAmount] = useState(-1);
  const [shippingFee, setShippingFee] = useState(0);
  const [leadtime, setLeadtime] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDictrict, setSelectedDictrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [account, setAccount] = useState(null);
  const [address, setAddress] = useState({});
  const [showAddress, setShowAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({});
  const [transactionCode, setTransactionCode] = useState("");
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [isOpenFormVoucher, setIsOpenFormVoucher] = useState(false);
  const [voucherAdd, setVoucherAdd] = useState({});
  const [typeShipping, setTypeShipping] = useState([]);

  // xóa tài khoản
  const handleDeleteAccount = () => {
    let cart = JSON.parse(localStorage.getItem(cartId));
    delete cart.account;
    localStorage.setItem(cartId, JSON.stringify(cart));
    setSelectedAddress({});
    setShippingFee(null);
    setLeadtime(null);
    setRendered(Math.random);
  };
  const handleShowModalAccount = (index) => {
    const newModalVisible = [...modalAccountVisible];
    newModalVisible[index] = true;
    setModalAccountVisible(newModalVisible);
  };

  const handleCancelModaleAccount = (index) => {
    const newModalVisible = [...modalAccountVisible];
    newModalVisible[index] = false;
    setModalAccountVisible(newModalVisible);
  };

  const handleShowModalAddress = (index) => {
    const visible = [...showAddress];
    visible[index] = true;
    setShowAddress(visible);
  };

  const handleCancelAddress = (index) => {
    const visible = [...showAddress];
    visible[index] = false;
    setShowAddress(visible);
  };

  const fetchProvinces = async () => {
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

  const handleProvinceChange = async (value, valueDB) => {
    setSelectedProvince(valueDB);
    setSelectedDictrict(null);
    setSelectedWard(null)
    setLeadtime(null)
    setShippingFee(null)
    setDistricts([])
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

  const handleDistrictChange = async (value, valueDB) => {
    setSelectedDictrict(valueDB);
    setSelectedWard(null)
    setLeadtime(null)
    setShippingFee(null)
    setWards([])
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

  const handleWardChange = (value) => {
    setSelectedWard(value);
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

  //  giá tiền tạm tính
  const totalPrice = productDetails.reduce((total, product) => {
    return total + product.priceReduce * product.quantity;
  }, 0);

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

    return result;
  };
  // phí ship
  const handleShippingFee = (insuranceValue, toDistrictId, toWardCode) => {
    let totalWeight = 0;
    for (let i = 0; i < productDetails.length; i++) {
      totalWeight += productDetails[i].productDetail.weight;
    }
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
      weight: totalWeight,
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
          console.log(`1`);
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

  // switch bán tại quầy hoặc online
  const handleChangSwitch = (checked, index) => {
    if (!checked) {
      setTypeShipping(false);
    }
    const visible = [...switchChange];
    visible[index] = checked;
    setSwitchChange(visible);
    setSymbol(checked ? "Shipping" : "Received");
    if (!checked) {
      setTypeShipping(false);
    }
  };

  // mở modal product
  const showModal = (index) => {
    const newModalVisible = [...modalVisible];
    newModalVisible[index] = true;
    setModalVisible(newModalVisible);
  };

  // đóng modal product
  const handleCancel = (index) => {
    const newModalVisible = [...modalVisible];
    newModalVisible[index] = false;
    setModalVisible(newModalVisible);
  };

  // chuyển tab
  const onChange = (newActiveKey) => {
    setCartId(newActiveKey);
    setActiveKey(newActiveKey);
    setSelectedOption(1)
    handleDeleteAccount()
  };

  // gen mã hóa đơn
  function generateRandomBillCode() {
    let result = "";
    const characters = "ABCDEF0123456789";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return "HD_" + result;
  }

  // thêm mới tab
  const add = () => {
    if (items.length >= 5) {
      notification.error({
        message: "Thông báo",
        description: "Đã đạt tối đa 5 hóa đơn.",
        duration: 2,
      });
    } else {
      const newActiveKey = `${generateRandomBillCode()}`;
      const newPanes = [...items];
      newPanes.push({
        label: `Hóa đơn: ${newActiveKey}`,
        key: newActiveKey,
      });
      localStorage.setItem(
        newActiveKey,
        JSON.stringify({
          timeStart: now(),
          productDetails: [],
          account: null,
          count: 0
        })
      );
      setItems(newPanes);
      setCartId(newActiveKey);
      setActiveKey(newActiveKey);
    }
  };

  // xóa tab
  const remove = (targetKey) => {
    let newActiveKey = activeKey;
    localStorage.removeItem(targetKey);
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setCartId(newActiveKey);
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey, action) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  // hiển thị danh sách sản phẩm trong giỏ hàng
  const getProductDetails = () => {
    var cart = JSON.parse(localStorage.getItem(cartId));
    var productDetails = cart.productDetails;
    setProductDetails(productDetails);
    setAccount(cart.account);
  };

  const getListAddressByUsername = (username) => {
    if (username) {
      axios
        .get(`http://localhost:8080/api/admin/account/detail/${username}`, {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        })
        .then((response) => {
          setAddress(response.data);
        })
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
  };
  const scanAddProductDetailIntoCart = (result) => {
    axios
      .get(
        "http://localhost:8080/api/admin/product/getproductdetailbyidpd?productDetailId=" +
        result,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        var cart = JSON.parse(localStorage.getItem(cartId));
        var productDetails = cart.productDetails;
        var notExist = true;
        for (var i = 0; i < productDetails.length; i++) {
          if (
            Number(productDetails[i].productDetail.id) ===
            Number(response.data.id)
          ) {
            if (
              productDetails[i].quantity >
              productDetails[i].productDetail.quantity
            ) {
              notification.warning({
                message: "Thông báo",
                description: "Đã vượt quá số lượng tồn hoặc 100",
                duration: 1,
              });
              return;
            }
            notExist = false;
            productDetails[i].quantity += 1;
            break;
          }
        }
        if (notExist) {
          productDetails.push({
            productDetail: response.data,
            quantity: 1,
            priceReduce: response.data.promotionValue
              ? response.data.promotionMethod === "%"
                ? (response.data.price *
                  (100 - Number(response.data.promotionValue))) /
                100
                : response.data.price - Number(response.data.promotionValue)
              : response.data.price,
          });
        }
        cart = {
          productDetails: productDetails,
          timeStart: now(),
          account: cart.account,
        };
        console.log(cart);
        localStorage.setItem(cartId, JSON.stringify(cart));
        notification.success({
          message: "Thông báo",
          description: "Thêm thành công",
          duration: 2,
        });
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    setRendered(Math.random());
  };

  useEffect(() => {
    getListAddressByUsername(account?.username);
    fetchProvinces();
    if (selectedAddress?.city) {
      const city = selectedAddress?.city.substring(
        1 + selectedAddress.city.indexOf("|")
      );
      const district = selectedAddress?.district.substring(
        1 + selectedAddress.district.indexOf("|")
      );
      const ward = selectedAddress?.ward.substring(
        1 + selectedAddress.ward.indexOf("|")
      );

      handleProvinceChange(city);
      handleDistrictChange(district);
      handleShippingOrderLeadtime(district, ward);
      handleShippingFee(totalPrice, district, ward);
    } else {
      handleShippingOrderLeadtime(
        selectedDictrict?.split("|")[1],
        selectedWard?.split("|")[1]
      );
      handleShippingFee(
        totalPrice,
        selectedDictrict?.split("|")[1],
        selectedWard?.split("|")[1]
      );
    }

    getProductDetails();
    initializeModalStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    cartId,
    render,
    account?.username,
    selectedDictrict,
    selectedWard,
    modalQRScanOpen,
  ]);

  useEffect(() => {
    handleDeleteAccount();
  }, [])

  const [symbol, setSymbol] = useState("Received");
  const [note, setNote] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);

  const onChangeTypeShip = (checked, index) => {
    const visible = [...showAddress];
    visible[index] = checked;
    setTypeShipping(visible);
    setSelectedOption(1);
  };

  const [errors, setErrors] = useState({});
  const handleCreateBill = (index) => {
    const bill = {
      billCode: activeKey,
      accountId: account?.username,
      price: totalPrice,
      priceReduce: totalPrice - voucherPrice(),
      amountPaid: typeShipping[index]
        ? 0
        : selectedOption === 2
          ? voucherPrice() + shippingFee
          : amountPaid,
      billType: "In-Store",
      symbol: typeShipping[index] ? "Shipping" : symbol,
      status: typeShipping[index] ? "Unpaid" : "Complete",
      note: note,
      paymentDetailId: Number(selectedOption),
      lstBillDetailRequest: [],
      addressId: selectedAddress?.id,
      fullname: selectedAddress?.fullName,
      phoneNumber: selectedAddress.numberPhone,
      transactionCode: selectedOption === "2" ? transactionCode : null,
      voucherCode: voucherAdd?.voucherCode,
      createdBy: "user3",
    };
    const billAddress = {
      fullName: fullname,
      sdt: phoneNumber,
      city: selectedProvince,
      district: selectedDictrict,
      ward: selectedWard,
      descriptionDetail: detailAddress,
    };

    const schema = Yup.object().shape({
      fullName: Yup.string().required("Họ và tên không được để trống"),
      sdt: Yup.string()
        .required('Số điện thoại không được để trống')
        .matches(/^[0-9]{10}$/, 'Số điện thoại phải có đúng 10 chữ số'),
      city: Yup.string().required("Tỉnh/thành phố không được để trống"),
      district: Yup.string().required("Quận/huyện không được để trống"),
      ward: Yup.string().required("Phường/xã không được để trống"),
    });

    if (productDetails.length <= 0) {
      return notification.error({
        message: "Thông báo",
        description: "Không có sản phẩm nào trong giỏ hàng.",
        duration: 2,
      });
    } else if (Number(selectedOption) === 2 && transactionCode === "") {
      return setInputError("Mã giao dịch không được để trống");
    } else if (
      Number(selectedOption) !== 2 &&
      ((remainAmount < 0 && !typeShipping[index]) || isNaN(remainAmount))
    ) {
      return setInputError("Tiền không đủ");
    } else {
      for (let i = 0; i < productDetails.length; i++) {
        const billDetail = {
          productDetailId: productDetails[i].productDetail.id,
          price: productDetails[i].priceReduce,
          quantity: productDetails[i].quantity,
        };
        bill.lstBillDetailRequest.push(billDetail);
      }

      Modal.confirm({
        title: "Xác nhận thanh toán",
        content: "Bạn có chắc chắn muốn thanh toán?",
        async onOk() {
          let addressId;
          let hasError = false;
          if (!account && switchChange[index]) {
            try {
              await schema.validate(billAddress, { abortEarly: false });
              setErrors({});
              const response = await axios.post(
                "http://localhost:8080/api/admin/address",
                billAddress,
                {
                  headers: {
                    Authorization: `Bearer ${getToken(true)}`,
                  },
                }
              );
              console.log(response.data, `ứ ứ`);
              addressId = response.data.id;
            } catch (error) {
              const validationErrors = {};
              error.inner.forEach((err) => {
                validationErrors[err.path] = err.message;
              });
              setErrors(validationErrors);
              hasError = true;
            }
          }

          if (hasError) {
            console.log(hasError);
            return;
          }

          try {
            const response = await axios.post(
              "http://localhost:8080/api/admin/bill",
              bill,
              {
                headers: {
                  Authorization: `Bearer ${getToken(true)}`,
                },
              }
            );
            if (switchChange[index]) {
              await axios.post(
                "http://localhost:8080/api/admin/delivery-note",
                {
                  billId: response.data.id,
                  addressId: account ? selectedAddress?.id : addressId,
                  name: account ? account.fullName : fullname,
                  phoneNumber: account ? account.numberPhone : phoneNumber,
                  shipDate: switchChange[index] === true ? leadtime : null,
                  shipPrice: switchChange[index] === true ? shippingFee : null,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getToken(true)}`,
                  },
                }
              );
            }
            notification.success({
              message: "Thông báo",
              description: "Thanh toán thành công",
              duration: 2,
            });
            navigate(`/api/admin/order`);
            remove(activeKey);
          } catch (error) {
            const status = error.response?.status;
            if (status === 403) {
              notification.error({
                message: "Thông báo",
                description: "Bạn không có quyền truy cập!",
              });
            }
          }
        },
      });
    }
  };

  const [inputError, setInputError] = useState("");
  const handleChangeInput = (e, index) => {
    const inputValue = e.target.value;
    let calculatedValue = 0;
    if (switchChange[index]) {
      calculatedValue = inputValue - voucherPrice() - shippingFee;
    } else {
      calculatedValue = inputValue - voucherPrice();
    }
    setRemainAmount(calculatedValue);
    numeral(inputValue).format("0,0");

    if (calculatedValue < 0) {
      setInputError("Số tiền không đủ");
    } else {
      setAmountPaid(inputValue);
      setInputError("");
    }
  };

  return (
    <>
      <QRReader
        visible={modalQRScanOpen}
        key={cartId}
        onCancel={() => {
          setModalQRScanOpen(false);
        }}
        setData={scanAddProductDetailIntoCart}
      />
      <Tabs
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        className={styles.bill}
        onEdit={onEdit}
      >
        {items &&
          items.map((item, index) => {
            return (
              <Tabs.TabPane
                key={item.key}
                tab={
                  <Badge count={item.count ? item.count : 0} showZero >
                    <span style={{ padding: 10 }}>{item.label}</span>
                  </Badge>
                }
                items={item}
              >
                <div className={styles.tabContent}>
                  <Row>
                    <Col span={12}>
                      <h2>
                        <ShoppingCartOutlined /> Giỏ hàng
                      </h2>
                    </Col>
                    <Col span={12}>
                      <Button
                        className={styles.addButton}
                        onClick={() => showModal(index)}
                        type="primary"
                        size="large"
                      >
                        <ShoppingCartOutlined style={{ fontSize: "20px" }} />
                      </Button>
                      <Button
                        className={styles.addButton}
                        type="primary"
                        size="large"
                        style={{ marginRight: "8px" }}
                        onClick={() => setModalQRScanOpen(true)}
                      >
                        <QrcodeOutlined style={{ fontSize: "20px" }} />
                      </Button>
                      <ModalProduct
                        visible={modalVisible[index]}
                        onCancel={() => handleCancel(index)}
                        cartId={cartId}
                        render={setRendered}
                      />
                    </Col>
                  </Row>
                  <Divider
                    className={styles.blackDivider}
                    style={{ marginTop: "3px" }}
                  />
                  <Table
                    dataSource={
                      productDetails &&
                      productDetails.map((record, index) => ({
                        ...record,
                        key: record.id,
                      }))
                    }
                    columns={columns}
                    pagination={false}
                  />
                </div>

                <div className={styles.infoPayment}>
                  <Row>
                    <Col span={12}>
                      <h2>
                        <WalletOutlined /> Thông tin thanh toán
                      </h2>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Button
                        type="primary"
                        onClick={() => handleShowModalAccount(index)}
                        size="large"
                      >
                        <UserOutlined style={{ fontSize: "20px" }} /> Chọn tài
                        khoản
                      </Button>
                      <ModalAccount
                        visible={modalAccountVisible[index]}
                        onCancel={() => handleCancelModaleAccount(index)}
                        cartId={cartId}
                        render={setRendered}
                        account={address}
                        address={setSelectedAddress}
                      />
                    </Col>
                  </Row>
                  <Divider
                    className={styles.blackDivider}
                    style={{ marginTop: "3px" }}
                  />
                  <Row>
                    <Col span={15}>
                      {account && (
                        <>
                          <span>
                            <b>Tên khách hàng: </b> {account?.fullName}
                          </span>
                        </>
                      )}
                      {!account && (
                        <>
                          <span>
                            <b>Tên tài khoản:</b> Khách lẻ
                          </span>
                        </>
                      )}
                      {account && (
                        <Button
                          icon={<CloseCircleOutlined />}
                          danger
                          style={{ marginLeft: "2%", border: "none" }}
                          onClick={() => handleDeleteAccount()}
                        ></Button>
                      )}
                      {account && (
                        <Button
                          style={{ marginLeft: "50px" }}
                          onClick={() => handleShowModalAddress(index)}
                          type="primary"
                        >
                          Chọn địa chỉ
                        </Button>
                      )}
                      <ModalAddress
                        isModalOpen={showAddress[index]}
                        handleCancel={() => handleCancelAddress(index)}
                        cartId={cartId}
                        render={setRendered}
                        address={address.accountAddress}
                        selectedAddress={setSelectedAddress}
                        username={account?.username}
                      />
                      <Row style={{ marginBottom: "30px" }}>
                        <Col span={24}>
                          <Row>
                            <Col span={12}>
                              <div className="m-5">
                                <b style={{ color: "red" }}>*</b> Họ và tên
                                <Input
                                  placeholder="nhập họ và tên"
                                  onChange={(e) => setFullname(e.target.value)}
                                  value={selectedAddress?.fullName}
                                />
                                {errors.fullName && (
                                  <div style={{ color: "red" }}>
                                    {errors.fullName}
                                  </div>
                                )}
                              </div>
                            </Col>
                            <Col span={12}>
                              <div className="m-5">
                                <b style={{ color: "red" }}>*</b> Số điện thoại
                                <Input
                                  placeholder="nhập số điện thoại"
                                  onChange={(e) =>
                                    setPhoneNumber(e.target.value)
                                  }
                                  value={selectedAddress?.sdt}
                                />
                                {errors.sdt && (
                                  <div style={{ color: "red" }}>
                                    {errors.sdt}
                                  </div>
                                )}
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        <Col span={8}>
                          <div className="m-5">
                            <span>
                              <b style={{ color: "red" }}>*</b> Tỉnh/thành phố
                            </span>
                            <br />
                            <Select
                              style={{ width: "100%" }}
                              onChange={(event) =>
                                handleProvinceChange(
                                  event?.substring(event.indexOf("|") + 1),
                                  event
                                )
                              }
                              value={
                                selectedAddress.city
                                  ? selectedAddress?.city.substring(
                                    0,
                                    selectedAddress?.city.indexOf("|")
                                  )
                                  : undefined
                              }
                            >
                              {provinces &&
                                provinces.map((province) => (
                                  <Select.Option
                                    label={province?.ProvinceName}
                                    key={province?.ProvinceID}
                                    value={`${province?.ProvinceName}|${province?.ProvinceID}`}
                                  >
                                    {province?.ProvinceName}
                                  </Select.Option>
                                ))}
                            </Select>
                            {errors.city && (
                              <div style={{ color: "red" }}>{errors?.city}</div>
                            )}
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="m-5">
                            <span>
                              <b style={{ color: "red" }}>*</b> Quận/huyện
                            </span>
                            <br />
                            <Select
                              style={{ width: "100%" }}
                              onChange={(event) =>
                                handleDistrictChange(
                                  event?.substring(event.indexOf("|") + 1),
                                  event
                                )
                              }
                              value={
                                selectedAddress.district
                                  ? selectedAddress?.district.substring(
                                    0,
                                    selectedAddress.district.indexOf("|")
                                  )
                                  : selectedDictrict
                              }
                            >
                              {districts &&
                                districts.map((district) => {
                                  return (
                                    <Select.Option
                                      key={district?.DistrictID}
                                      value={`${district?.DistrictName}|${district?.DistrictID}`}
                                    >
                                      {district?.DistrictName}
                                    </Select.Option>
                                  );
                                })}
                            </Select>
                            {errors.district && (
                              <div style={{ color: "red" }}>
                                {errors?.district}
                              </div>
                            )}
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="m-5">
                            <span>
                              <b style={{ color: "red" }}>*</b> Phường/xã
                            </span>
                            <br />
                            <Select
                              style={{ width: "100%" }}
                              onChange={handleWardChange}
                              value={
                                selectedAddress.ward
                                  ? selectedAddress?.ward.substring(
                                    0,
                                    selectedAddress?.ward.indexOf("|")
                                  )
                                  : selectedWard
                              }
                            >
                              {wards &&
                                wards?.map((ward) => (
                                  <Select.Option
                                    key={ward?.WardCode}
                                    value={`${ward.WardName}|${ward.WardCode}`}
                                  >
                                    {ward.WardName}
                                  </Select.Option>
                                ))}
                            </Select>
                            {errors?.ward && (
                              <div style={{ color: "red" }}>{errors?.ward}</div>
                            )}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={16}>
                          <span>Địa chỉ cụ thể</span>
                          <Input
                            placeholder="Nhập địa chỉ cụ thể"
                            onChange={(e) => setDetailAddress(e.target.value)}
                            value={selectedAddress?.descriptionDetail}
                          />
                        </Col>
                      </Row>
                      {switchChange[index] && leadtime && (
                        <h3>
                          Ngày giao hàng dự kiến:{" "}
                          {moment(leadtime)?.format("DD/MM/YYYY") || ""}
                        </h3>
                      )}
                      <div>
                        <img
                          src={logoGhn}
                          alt="logo"
                          style={{ width: "90px", height: "80px" }}
                        />
                      </div>
                    </Col>
                    <Col span={8} offset={1}>
                      <Switch onChange={(e) => handleChangSwitch(e, index)} />
                      <span style={{ marginLeft: "5px" }}>Giao hàng</span>
                      <br />
                      <SearchNameOrCodeVoucher
                        priceBill={totalPrice}
                        username={account?.username}
                        voucher={voucherAdd}
                        setVoucher={setVoucherAdd}
                      />
                      <Button
                        type="primary"
                        style={{
                          marginTop: "10px",
                          marginLeft: "10px",
                        }}
                        onClick={() =>
                          setIsOpenFormVoucher(
                            productDetails.length > 0
                              ? true
                              : notification.error({
                                message: "Lỗi",
                                description:
                                  "Chưa có sản phẩm trong giỏ hàng.",
                                duration: 2,
                              })
                          )
                        }
                      >
                        Chọn mã giảm giá
                      </Button>
                      <FormUsingVoucher
                        priceBill={totalPrice}
                        voucher={voucherAdd}
                        setVoucher={setVoucherAdd}
                        isOpen={isOpenFormVoucher}
                        setIsOpen={setIsOpenFormVoucher}
                      />
                      <Row style={{ marginTop: "10px" }}>
                        <Col span={16}>
                          {" "}
                          <span
                            style={{
                              fontSize: "16px",
                              width: "100px",
                            }}
                          >
                            Thành tiền
                          </span>
                        </Col>
                        <Col span={8}>
                          <span
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            {totalPrice.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </Col>
                        <Col span={16}>
                          <span
                            style={{
                              fontSize: "16px",
                              width: "200%",
                              display: "block",
                            }}
                          >
                            Giảm giá
                          </span>
                        </Col>
                        <Col span={8}>
                          <span
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            {voucherAdd?.voucherValue
                              ? voucherAdd.voucherMethod === "vnd"
                                ? voucherAdd?.voucherValue + "đ"
                                : voucherAdd?.voucherValue + "%"
                              : "0đ"}
                          </span>
                          {voucherAdd.voucherId ? (
                            <bttuon
                              style={{
                                marginLeft: "20px",
                                color: "green",
                                cursor: "pointer",
                              }}
                              onClick={() => setVoucherAdd({})}
                            >
                              ❌
                            </bttuon>
                          ) : null}
                        </Col>

                        {switchChange[index] && shippingFee && (
                          <>
                            <Col span={16}>
                              <span
                                style={{
                                  fontSize: "16px",
                                  width: "200px",
                                }}
                              >
                                Phí vận chuyển
                              </span>
                            </Col>
                            <Col span={8}>
                              <span
                                style={{
                                  fontSize: "16px",
                                }}
                              >
                                {shippingFee?.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </span>
                            </Col>
                          </>
                        )}
                        <Col span={16}>
                          <span
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            Tổng cộng
                          </span>
                        </Col>
                        <Col span={8}>
                          {switchChange[index] ? (
                            <span
                              style={{
                                color: "red",
                                fontSize: "16px",
                              }}
                            >
                              {(voucherPrice() + shippingFee).toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                            </span>
                          ) : (
                            <span
                              style={{
                                color: "red",
                                fontSize: " 16px",
                              }}
                            >
                              {voucherPrice().toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                          )}
                        </Col>
                        {Number(selectedOption) !== 2 &&
                          !typeShipping[index] ? (
                          <>
                            <Col span={8} style={{ marginTop: "8px" }}>
                              <span
                                style={{
                                  fontSize: "16px",
                                  width: "200%",
                                  display: "block",
                                }}
                              >
                                Số tiền khách trả
                              </span>
                            </Col>
                            <Col span={16}>
                              <Input
                                type="number"
                                className={styles.input_noneBorder}
                                onChange={(e) => handleChangeInput(e, index)}
                              />
                              {inputError && (
                                <span
                                  style={{
                                    width: "200%",
                                    color: "red",
                                  }}
                                >
                                  {inputError}
                                </span>
                              )}
                            </Col>
                          </>
                        ) : null}
                        {Number(selectedOption) === 2 ? (
                          <>
                            <Input
                              placeholder="Nhập mã giao dịch"
                              size="large"
                              onChange={(e) =>
                                setTransactionCode(e.target.value)
                              }
                              style={{ margin: "10px 0", width: "380px" }}
                              className={styles.input_noneBorder}
                            />
                            <span style={{ fontSize: "16px", color: "red" }}>
                              {inputError}
                            </span>
                          </>
                        ) : null}
                        {Number(selectedOption) !== 2 &&
                          !typeShipping[index] ? (
                          <Col span={24}>
                            {remainAmount > 0 && (
                              <Row style={{ marginTop: "8px" }}>
                                <Col span={16}>
                                  <span
                                    style={{ fontSize: "16px", width: "200%" }}
                                  >
                                    Tiền thừa
                                  </span>
                                </Col>
                                <Col span={8}>
                                  <span
                                    style={{
                                      fontSize: "16px",
                                      color: "red",
                                    }}
                                  >
                                    {remainAmount.toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </span>
                                </Col>
                              </Row>
                            )}
                          </Col>
                        ) : null}
                        <TextArea
                          onChange={(e) => setNote(e.target.value)}
                          rows={3}
                          placeholder="ghi chú ..."
                          style={{ margin: "10px 0" }}
                        />
                        <div style={{ marginTop: "20px" }}>
                          {!typeShipping[index] && (
                            <Segmented
                              options={options}
                              style={{ marginBottom: "20px" }}
                              onChange={(e) => handleOptionChange(e, index)}
                            >
                              {options.map((option) => (
                                <div key={option.value}>{option.label}</div>
                              ))}
                            </Segmented>
                          )}
                          {switchChange[index] && (
                            <Row>
                              <Col span={5}>
                                <Switch
                                  onChange={(e) => onChangeTypeShip(e, index)}
                                  style={{}}
                                />
                              </Col>
                              <Col span={19}>
                                <h6
                                  style={{ fontSize: "14px", width: "200px" }}
                                >
                                  Thanh toán khi nhân hàng
                                </h6>
                              </Col>
                            </Row>
                          )}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                          <Button
                            type="primary"
                            onClick={() => handleCreateBill(index)}
                            style={{ width: "380px", height: "40px" }}
                          >
                            Xác nhận thanh toán
                          </Button>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Tabs.TabPane>
            );
          })}
      </Tabs>
    </>
  );
};

export default Bill;
