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
} from "@ant-design/icons";
import axios from "axios";
import { now } from "moment";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ModalAccount from "./ModalAccount";
import ModalAddress from "./ModalAddress";
import FormUsingVoucher from "../../element/voucher/FormUsingVoucher";
import numeral from "numeral";

const Bill = () => {
  var initialItems = [];
  const [modalVisible, setModalVisible] = useState([]);
  const [modalAccountVisible, setModalAccountVisible] = useState([]);
  function getCart() {
    initialItems = [];
    var checkEmpty = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("HD")) {
        var tab = {
          label: "Hóa đơn: " + localStorage.key(i),
          key: key,
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
    }
    if (value > productDetails[index].quantity) {
    }
    productDetails[index].quantity = value;
    cart.productDetails = productDetails;
    localStorage.setItem(cartId, JSON.stringify(cart));
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
      key: "productName",
      title: "Sản phẩm",
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={4}>
              <Carousel autoplay className={styles.slider}>
                {record.productDetailImages &&
                  record.productDetailImages.map((productImage, index) => {
                    return <img key={index} alt="abc" src={productImage} />;
                  })}
              </Carousel>
            </Col>
            <Col span={20}>
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
      width: 200,
      render: (text, record, index) => {
        return (
          <InputNumber
            min={1}
            max={100}
            value={record.quantity}
            onChange={(value) => updateQuantity(record, index, value)}
          />
        );
      },
    },
    {
      title: "Thành tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 200,

      render: (text, record, index) => {
        return <span>{record.productDetail.price * record.quantity}</span>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      width: 200,

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

  // xóa sản phẩm trong giỏ hàng
  const handleDeleteProduct = (record, index) => {
    let cart = JSON.parse(localStorage.getItem(cartId));
    let productDetails = cart.productDetails;

    productDetails.splice(index, 1);
    localStorage.setItem(cartId, JSON.stringify(cart));
    setRendered(cart);
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
  const [selectedButton, setSelectedButton] = useState(null);
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

  // xóa tài khoản
  const handleDeleteAccount = () => {
    let cart = JSON.parse(localStorage.getItem(cartId));
    delete cart.account;
    localStorage.setItem(cartId, JSON.stringify(cart));
    setSelectedAddress({});
    setShippingFee(0);
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

  const handleButtonClick = (button) => {
    if (selectedButton === button) {
      setInputError("");
      setSelectedButton(null);
    } else {
      setInputError("");
      setSelectedButton(button);
    }
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
    return total + product.productDetail.price * product.quantity;
  }, 0);

  const voucherPrice = () => {
    let result = totalPrice;

    if (voucherAdd && voucherAdd.voucherMethod === "vnd") {
      if (result > (voucherAdd.voucherCondition ?? 0)) {
        result -= voucherAdd.voucherValue ?? 0;
      }
    } else if (voucherAdd && voucherAdd.voucherMethod === "%") {
      if (result > voucherAdd.voucherCondition) {
        const maxDiscount =
          (totalPrice * (voucherAdd.voucherValueMax ?? 0)) / 100; // Giới hạn giảm giá tối đa là 50%
        const discount = (totalPrice * (voucherAdd.voucherValue ?? 0)) / 100;
        result -= Math.min(discount, maxDiscount);
      }
    } else {
      result = totalPrice;
    }

    return result;
  };
  // phí ship
  const handleShippingFee = (insuranceValue, toDistrictId, toWardCode) => {
    const values = {
      service_id: 53321,
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
          console.log(error);
        });
    }
  };

  // switch bán tại quầy hoặc online
  const handleChangSwitch = (checked, index) => {
    const visible = [...switchChange];
    visible[index] = checked;
    setSwitchChange(visible);
    setSymbol(checked ? "Shipping" : "Received");
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
        .get(`http://localhost:8080/api/admin/account/detail/${username}`)
        .then((response) => {
          setAddress(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
  }, [cartId, render, account?.username, selectedDictrict, selectedWard]);

  const [symbol, setSymbol] = useState("Received");
  const [note, setNote] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);

  const handleCreateBill = (index) => {
    const bill = {
      billCode: activeKey,
      accountId: account?.username,
      price: totalPrice,
      priceReduce: totalPrice - voucherPrice(),
      amountPaid: amountPaid,
      billType: "In-Store",
      symbol: symbol,
      status: selectedButton !== 2 ? "Paid" : "Unpaid",
      note: note,
      paymentDetailId: selectedButton,
      lstBillDetailRequest: [],
      addressId: selectedAddress?.id,
      fullname: selectedAddress?.fullName,
      phoneNumber: selectedAddress.numberPhone,
      shipDate: switchChange[index] === true ? leadtime : null,
      shipPrice: switchChange[index] === true ? shippingFee : null,
      transactionCode: selectedButton === 2 ? transactionCode : null,
      voucherCode: voucherAdd?.voucherCode,
    };

    const billAddress = {
      fullName: fullname,
      sdt: phoneNumber,
      city: selectedProvince,
      district: selectedDictrict,
      ward: selectedWard,
      descriptionDetail: detailAddress,
    };

    if (productDetails.length <= 0) {
      return notification.error({
        message: "Thông báo",
        description: "Không có sản phẩm nào trong giỏ hàng.",
        duration: 2,
      });
    } else if (selectedButton == null) {
      return notification.error({
        message: "Thông báo",
        description: "Chưa chọn hình thức thanh toán",
        duration: 2,
      });
    } else if (selectedButton === 2 && transactionCode === "") {
      return setInputError("Mã giao dịch không được để trống");
    } else if (
      selectedButton !== 2 &&
      (remainAmount < 0 || isNaN(remainAmount))
    ) {
      return setInputError("Tiền không đủ");
    } else {
      for (let i = 0; i < productDetails.length; i++) {
        const billDetail = {
          productDetailId: productDetails[i].productDetail.id,
          price: productDetails[i].productDetail.price,
          quantity: productDetails[i].quantity,
        };

        bill.lstBillDetailRequest.push(billDetail);
      }
      Modal.confirm({
        title: "Xác nhận thanh toán",
        content: "Bạn có chắc chắn muốn thanh toán?",
        onOk() {
          if (account !== null && switchChange[index]) {
            axios
              .post(`http://localhost:8080/api/admin/address`, billAddress)
              .then((response) => {})
              .catch((error) => {
                console.log(error);
              });
          }
          axios
            .post("http://localhost:8080/api/admin/bill", bill)
            .then((response) => {
              if (response.data.symbol === "Received") {
                axios
                  .put(
                    `http://localhost:8080/api/admin/bill/${response.data.id}`,
                    {
                      status: "PAID",
                    }
                  )
                  .then((response) => {})
                  .catch((error) => {
                    console.log(error);
                  });
              }
              navigate(`/admin/order`);
              remove(activeKey);
            })
            .catch((error) => {
              console.log(error);
            });
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
              <Tabs.TabPane key={item.key} tab={item.label} items={item}>
                <div className={styles.tabContent}>
                  <Row>
                    <Col span={12}>
                      <h2>Giỏ hàng</h2>
                    </Col>
                    <Col span={12}>
                      <Button
                        className={styles.addButton}
                        onClick={() => showModal(index)}
                        style={{ color: "blue" }}
                      >
                        Thêm giỏ hàng
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
                      <h2>Thông tin thanh toán</h2>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Button
                        style={{ color: "blue" }}
                        onClick={() => handleShowModalAccount(index)}
                      >
                        Chọn tài khoản
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
                    <Col span={16}>
                      <Row style={{ marginBottom: "20px" }}>
                        <Col span={6} style={{ marginTop: "2px" }}>
                          {account && (
                            <>
                              <span
                                style={{ display: "block", width: "200px" }}
                              >
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
                        </Col>
                        <Col span={12}>
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
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24}>
                          <Row>
                            <Col span={12}>
                              <Row>
                                <Col span={5}>
                                  <b style={{ color: "red" }}>*</b> Họ và tên
                                </Col>
                                <Col span={14}>
                                  <Input
                                    placeholder="nhập họ và tên"
                                    onChange={(e) =>
                                      setFullname(e.target.value)
                                    }
                                    value={selectedAddress?.fullName}
                                  />
                                </Col>
                              </Row>
                            </Col>
                            <Col span={12}>
                              <Row>
                                <Col span={7}>
                                  <b style={{ color: "red" }}>*</b> Số điện
                                  thoại
                                </Col>
                                <Col span={14}>
                                  <Input
                                    placeholder="nhập số điện thoại"
                                    onChange={(e) =>
                                      setPhoneNumber(e.target.value)
                                    }
                                    value={selectedAddress?.sdt}
                                  />
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                      <Row style={{ marginBottom: "50px" }}>
                        <Col span={8}>
                          <span>
                            <b style={{ color: "red" }}>*</b> Tỉnh/thành phố
                          </span>
                          <br />
                          <Select
                            style={{ width: 200 }}
                            onChange={(event) =>
                              handleProvinceChange(
                                event.substring(event.indexOf("|") + 1),
                                event
                              )
                            }
                            value={
                              selectedAddress.city
                                ? selectedAddress?.city.substring(
                                    0,
                                    selectedAddress.city.indexOf("|")
                                  )
                                : undefined
                            }
                          >
                            {provinces &&
                              provinces.map((province) => (
                                <Select.Option
                                  label={province.ProvinceName}
                                  key={province.ProvinceID}
                                  value={`${province.ProvinceName}|${province.ProvinceID}`}
                                >
                                  {province.ProvinceName}
                                </Select.Option>
                              ))}
                          </Select>
                        </Col>
                        <Col span={8}>
                          <span>
                            <b style={{ color: "red" }}>*</b> Quận/huyện
                          </span>
                          <br />
                          <Select
                            style={{ width: 200 }}
                            onChange={(event) =>
                              handleDistrictChange(
                                event.substring(event.indexOf("|") + 1),
                                event
                              )
                            }
                            value={
                              selectedAddress.district
                                ? selectedAddress?.district.substring(
                                    0,
                                    selectedAddress.district.indexOf("|")
                                  )
                                : undefined
                            }
                          >
                            {districts &&
                              districts.map((district) => {
                                return (
                                  <Select.Option
                                    key={district.DistrictID}
                                    value={`${district.DistrictName}|${district.DistrictID}`}
                                  >
                                    {district.DistrictName}
                                  </Select.Option>
                                );
                              })}
                          </Select>
                        </Col>
                        <Col span={8}>
                          <span>
                            <b style={{ color: "red" }}>*</b> Phường/xã
                          </span>
                          <br />
                          <Select
                            style={{ width: 200 }}
                            onChange={handleWardChange}
                            value={
                              selectedAddress.ward
                                ? selectedAddress.ward.substring(
                                    0,
                                    selectedAddress.ward.indexOf("|")
                                  )
                                : undefined
                            }
                          >
                            {wards &&
                              wards.map((ward) => (
                                <Select.Option
                                  key={ward.WardCode}
                                  value={`${ward.WardName}|${ward.WardCode}`}
                                >
                                  {ward.WardName}
                                </Select.Option>
                              ))}
                          </Select>
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
                        <Col span={6} style={{ marginLeft: "30px" }}>
                          <img
                            src={logoGhn}
                            alt="logo"
                            style={{ width: "90px", height: "80px" }}
                          />
                        </Col>

                        {switchChange[index] && (
                          <h3>
                            Ngày giao hàng dự kiến:{" "}
                            {moment(leadtime).format("DD/MM/YYYY") || ""}
                          </h3>
                        )}
                      </Row>
                    </Col>
                    <Col span={8}>
                      <Switch onChange={(e) => handleChangSwitch(e, index)} />
                      <span style={{ marginLeft: "5px" }}>Giao hàng</span>
                      <br />
                      <Input
                        style={{ width: "200px" }}
                        placeholder="Mã giảm giá"
                      />
                      <Button
                        style={{
                          color: "blue",
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
                        <Col span={12}>
                          <Row>
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
                                  marginLeft: "100px",
                                  fontSize: "16px",
                                }}
                              >
                                {totalPrice.toLocaleString("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </span>
                            </Col>
                          </Row>
                          <Row>
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
                                  marginLeft: "100px",
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
                          </Row>

                          {switchChange[index] && (
                            <Row>
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
                                    marginLeft: "100px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {shippingFee?.toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </span>
                              </Col>
                            </Row>
                          )}
                          <Row>
                            <Col span={16}>
                              <span
                                style={{
                                  fontSize: "16px",
                                  width: "200%",
                                  display: "block",
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
                                    marginLeft: "100px",
                                    fontSize: "16px",
                                  }}
                                >
                                  {(
                                    voucherPrice() + shippingFee
                                  ).toLocaleString("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  })}
                                </span>
                              ) : (
                                <span
                                  style={{
                                    color: "red",
                                    marginLeft: "100px",
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
                          </Row>
                          {selectedButton !== 2 && (
                            <Row>
                              <Col span={16}>
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
                              <Col span={8}>
                                <input
                                  type="number"
                                  style={{ marginLeft: "100px" }}
                                  className={styles.input}
                                  onChange={(e) => handleChangeInput(e, index)}
                                />
                                {inputError && (
                                  <span
                                    style={{
                                      marginLeft: "100px",
                                      width: "200%",
                                    }}
                                    className={styles.error}
                                  >
                                    {inputError}
                                  </span>
                                )}
                              </Col>
                            </Row>
                          )}
                          {selectedButton === 2 && (
                            <>
                              <Input
                                placeholder="Nhập mã giao dịch"
                                size="large"
                                onChange={(e) =>
                                  setTransactionCode(e.target.value)
                                }
                                style={{ margin: "10px 0", width: "380px" }}
                              />
                              <span style={{ fontSize: "16px", color: "red" }}>
                                {inputError}
                              </span>
                            </>
                          )}
                          {selectedButton !== 2 && (
                            <Row>
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
                                    marginLeft: "100px",
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
                        <TextArea
                          onChange={(e) => setNote(e.target.value)}
                          rows={3}
                          placeholder="ghi chú ..."
                          style={{ margin: "10px 0" }}
                        />
                        <div style={{ marginTop: "20px" }}>
                          <div className={styles.buttonGroup}>
                            <Button
                              className={`${styles.cashButton} ${
                                selectedButton === 1 ? styles.selected : ""
                              }`}
                              icon={<DollarOutlined />}
                              onClick={() => handleButtonClick(1)}
                            >
                              Tiền
                            </Button>
                            <Button
                              style={{ margin: "0 10px" }}
                              className={`${styles.cashButton} ${
                                selectedButton === 2 ? styles.selected : ""
                              }`}
                              icon={<SwapOutlined />}
                              onClick={() => handleButtonClick(2)}
                            >
                              Chuyển khoản
                            </Button>
                            <Button
                              className={`${styles.cashButton} ${
                                selectedButton === 3 ? styles.selected : ""
                              }`}
                              onClick={() => handleButtonClick(3)}
                            >
                              Cả hai
                            </Button>
                          </div>
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
