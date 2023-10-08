import {
  Tabs,
  Button,
  Table,
  Space,
  Tag,
  Divider,
  Row,
  Col,
  Input,
  Switch,
  Select,
  InputNumber,
  notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Bill.module.css";
import ModalProduct from "./ModalProduct";
import logoGhn from "../../../Assets/img/logo/logo_ghn.png";
import {
  DeleteOutlined,
  DollarOutlined,
  SearchOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { now } from "moment";
import TextArea from "antd/es/input/TextArea";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";
import ModalAccount from "./ModalAccount";

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
          account: {}
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
    },
    {
      title: "Sản phẩm",
      key: "name",
      width: 500,
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={6}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <img
                  src={
                    "https://vapa.vn/wp-content/uploads/2022/12/anh-3d-thien-nhien.jpeg"
                  }
                  width={"100%"}
                  alt=""
                />
              </div>
            </Col>
            <Col span={18}>
              <h6>
                {record.productDetail.product.productName} {" - "}
                <div className={styles.optionColor}>
                  <span
                    style={{
                      backgroundColor: record.productDetail.color.colorCode,
                    }}
                  ></span>
                  {record.productDetail.color.colorName}
                </div>
              </h6>
              <div style={{ textAlign: "left", marginLeft: 20 }}>
                <span style={{ fontWeight: 500, marginRight: 20 }}>
                  Kích cỡ: {record.productDetail.size.sizeName}
                </span>
                <br />
                <span style={{ fontWeight: 500 }}>
                  Chất liệu: {record.productDetail.material.materialName}
                </span>
                <br />
                <span style={{ fontWeight: 500 }}>
                  Nút áo: {record.productDetail.button.buttonName}
                </span>
                <br />
                <span style={{ fontWeight: 500 }}>
                  Cổ áo: {record.productDetail.collar.collarTypeName}
                </span>
                <br />
                <span style={{ fontWeight: 500 }}>
                  Đuôi áo: {record.productDetail.shirtTail.shirtTailTypeName}
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
      render: (text, record, index) => {
        return <span>{record.productDetail.price * record.quantity}</span>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<DeleteOutlined />}
            danger
            href="#1"
            key={record.key}
          ></Button>
        </Space>
      ),
    },
  ];


  const [activeKey, setActiveKey] = useState(
    initialItems.length === 0 ? null : initialItems[0].key
  );
  const [items, setItems] = useState(initialItems);
  const [switchChange, setSwitchChange] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cartId, setCartId] = useState(
    initialItems.length === 0 ? null : initialItems[0].key
  );
  const [render, setRendered] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [remainAmount, setRemainAmount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0)
  const [leadtime, setLeadtime] = useState(null)
  const [selectedDictrict, setSelectedDictrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null)
  const [selectedButton, setSelectedButton] = useState(null);
  const [showModalAccount, setShowModalAccount] = useState(false);

  const handleShowModalAccount = (index) => {
    const newModalVisible = [...modalAccountVisible];
    newModalVisible[index] = true;
    setModalAccountVisible(newModalVisible);
  }

  const handleCancelModaleAccount = (index) => {
    const newModalVisible = [...modalAccountVisible];
    newModalVisible[index] = false;
    setModalAccountVisible(newModalVisible);
  }
  const navigate = useNavigate();
  const handleButtonClick = (button) => {
    if (selectedButton === button) {
      setSelectedButton(null);
    } else {
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
      .then((res) =>
        setProvinces(res.data.data),
      )
      .catch((err) =>
        console.log(err)
      );
  };

  const handleProvinceChange = async (value) => {
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
  };

  const handleDistrictChange = async (value) => {
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
      setSelectedDictrict(value)
    } catch (error) {
      console.log(error);
    }
  };

  const handleWardChange = (value) => {
    setSelectedWard(value)
  }

  const handleShippingOrderLeadtime = async (toDistrictId, toWardCode) => {
    const values = {
      from_district_id: 3440,
      from_ward_code: '13010',
      to_district_id: toDistrictId,
      to_ward_code: `${toWardCode}`,
      service_id: 53321
    };

    try {
      const response = await axios.post(
        'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime',
        values,
        {
          headers: {
            token: '0f082cbe-5110-11ee-a59f-a260851ba65c',
            shop_id: '4534109'
          }
        }
      );

      const leadtimeTimestamp = response.data.data.leadtime;
      const leadtimeMoment = moment.unix(leadtimeTimestamp);
      const formattedDateTime = leadtimeMoment.format('DD/MM/YYYY');

      setLeadtime(`${formattedDateTime}`);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = productDetails.reduce((total, product) => {
    return total + product.productDetail.price * product.quantity;
  }, 0);

  const handleShippingFee = async (insuranceValue, toDistrictId, toWardCode) => {
    const values = {
      service_id: 53321,
      insurance_value: insuranceValue,
      coupon: null,
      from_district_id: 3440,
      to_district_id: toDistrictId,
      to_ward_code: toWardCode,
      height: 15,
      length: 15,
      weight: 1000,
      width: 15
    };

    try {
      const response = await axios.post(
        'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
        values,
        {
          headers: {
            token: '0f082cbe-5110-11ee-a59f-a260851ba65c',
            shop_id: '4534109'
          }
        }
      );

      setShippingFee(response.data.data.total);
    } catch (error) {
      console.log(error);
    }
  };

  // tính phí vận chuyển && tính ngày giao hàng
  if (switchChange) {
    handleShippingFee(totalPrice, selectedDictrict, selectedWard);
    handleShippingOrderLeadtime(selectedDictrict, selectedWard)
  }

  const handleChangSwitch = (checked) => {
    setSwitchChange(checked);
    if (!checked) {
      setShippingFee(0);
      setLeadtime(null)
      setBilType('In-store')
    } else {
      setBilType('Online')
    }

  };

  const showModal = (index) => {
    const newModalVisible = [...modalVisible];
    newModalVisible[index] = true;
    setModalVisible(newModalVisible);
  };

  const handleCancel = (index) => {
    const newModalVisible = [...modalVisible];
    newModalVisible[index] = false;
    setModalVisible(newModalVisible);
  };

  const onChange = (newActiveKey) => {
    setCartId(newActiveKey);
    setActiveKey(newActiveKey);
  };

  function generateRandomBillCode() {
    let result = "";
    const characters = "ABCDEF0123456789";

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return "HD_" + result;
  }

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
          account: {}
        })
      );
      setItems(newPanes);
      setCartId(newActiveKey);
      setActiveKey(newActiveKey);
    }
  };

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

  const getProductDetails = () => {
    var cart = JSON.parse(localStorage.getItem(cartId));
    var productDetails = cart.productDetails;
    setProductDetails(productDetails);
  };


  useEffect(() => {
    fetchProvinces();
    getProductDetails();
    initializeModalStates();
  }, [cartId, render]);



  const [billType, setBilType] = useState('In-store')
  const handleCreateBill = () => {
    const bill = {
      price: totalPrice,
      priceReduce: null,
      billType: billType,
      status: 'watting',
      lstBillDetailRequest: [],
    };

    if (productDetails.length <= 0) {
      return console.log('không có sản phẩm')
    } else {
      for (let i = 0; i < productDetails.length; i++) {
        const billDetail = {
          productDetailId: productDetails[i].productDetail.id,
          price: productDetails[i].productDetail.price,
          quantity: productDetails[i].quantity
        };

        bill.lstBillDetailRequest.push(billDetail);
      }
    }
    console.log(bill)

    axios.post(`http://localhost:8080/api/admin/bill`, bill)
      .then(response => {
        navigate(`/admin/counter-sales/${response.data.id}/timeline`)
      })
      .catch((error) => {
        console.log(error)
      })
  }

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
              <Tabs.TabPane key={item.key} tab={item.label}>
                <div className={styles.tabContent}>
                  <div className={styles.cartContainer}>
                    <h2>Giỏ hàng</h2>
                    <Button
                      type="primary"
                      className={styles.addButton}
                      onClick={() => showModal(index)}
                    >
                      Thêm giỏ hàng
                    </Button>
                  </div>
                  <Divider
                    className={styles.blackDivider}
                    style={{ marginTop: "10px" }}
                  />
                  <Table dataSource={productDetails} columns={columns} />
                  <ModalProduct
                    visible={modalVisible[index]}
                    onCancel={() => handleCancel(index)}
                    cartId={cartId}
                    render={setRendered}
                  />
                </div>
                <div className={styles.lstAccount}>
                  <Row>
                    <Col span={12}>
                      <h2>Tài khoản</h2>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Input
                        prefix={<SearchOutlined />}
                        placeholder="tìm kiếm tài khoản"
                        style={{ width: "200px", marginRight: "20px" }}
                      />
                      <Button style={{ color: "blue" }} onClick={() => handleShowModalAccount(index)}>Chọn tài khoản</Button>
                      <ModalAccount
                        visible={modalAccountVisible[index]}
                        onCancel={() => handleCancelModaleAccount(index)}
                        cartId={cartId}
                        render={setRendered}
                      />
                    </Col>
                  </Row>
                  <Divider
                    className={styles.blackDivider}
                    style={{ marginTop: "10px" }}
                  />
                  <Row>
                    <Col span={6}>
                      <h3>Tên khách hàng</h3>
                    </Col>
                    <Col span={12}>
                      <Tag
                        color="gray"
                        style={{ borderRadius: "15px", padding: "2px 6px" }}
                      >
                        Khách lẻ
                      </Tag>

                    </Col>
                  </Row>
                </div>

                <div className={styles.infoPayment}>
                  <h2 style={{ textAlign: "left" }}>Thông tin thanh toán</h2>
                  <Divider
                    className={styles.blackDivider}
                    style={{ marginTop: "3px" }}
                  />
                  <Row>
                    <Col span={16}>
                      {switchChange && (
                        <Row>
                          <Col span={10}>
                            <span>
                              <b style={{ color: "red" }}>*</b> Họ và tên
                            </span>
                            <Input placeholder="nhập họ và tên" />
                          </Col>
                          <Col span={10} style={{ marginLeft: "40px" }}>
                            <span>
                              <b style={{ color: "red" }}>*</b> Số điện thoại
                            </span>
                            <Input placeholder="nhập số điện thoại" />
                          </Col>
                        </Row>
                      )}
                      {switchChange && (
                        <Row style={{ margin: "40px 0" }}>
                          <Col span={7}>
                            <span>
                              <b style={{ color: "red" }}>*</b> Tỉnh/thành phố
                            </span>
                            <br />
                            <Select
                              style={{ width: 200 }}
                              onChange={handleProvinceChange}
                            >
                              {provinces && provinces.map((province) => (
                                <Select.Option
                                  label={province.ProvinceName}
                                  key={province.ProvinceID}
                                  value={province.ProvinceID}
                                >
                                  {province.ProvinceName}
                                </Select.Option>
                              ))}
                            </Select>
                          </Col>
                          <Col span={7}>
                            <span>
                              <b style={{ color: "red" }}>*</b> Quận/huyện
                            </span>
                            <br />
                            <Select
                              style={{ width: 200 }}
                              onChange={handleDistrictChange}
                            >
                              {districts && districts.map((district) => (
                                <Select.Option
                                  key={district.DistrictID}
                                  value={district.DistrictID}
                                >
                                  {district.DistrictName}
                                </Select.Option>
                              ))}
                            </Select>
                          </Col>
                          <Col span={7}>
                            <span>
                              <b style={{ color: "red" }}>*</b> Phường/xã
                            </span>
                            <br />
                            <Select style={{ width: 200 }}
                              onChange={handleWardChange}
                            >
                              {wards && wards.map((ward) => (
                                <Select.Option
                                  key={ward.WardCode}
                                  value={ward.WardCode}
                                >
                                  {ward.WardName}
                                </Select.Option>
                              ))}
                            </Select>
                          </Col>
                        </Row>
                      )}
                      {switchChange && (
                        <Row>
                          <Col span={16}>
                            <span>Địa chỉ cụ thể</span>
                            <Input placeholder="Nhập địa chỉ cụ thể" />
                          </Col>
                          <Col span={6} style={{ marginLeft: "30px" }}>
                            <img
                              src={logoGhn}
                              alt="an sẽ"
                              style={{ width: "90px", height: "80px" }}
                            />
                          </Col>
                          <h3>Ngày giao hàng dự kiến: {leadtime || ''}</h3>
                        </Row>
                      )}
                    </Col>
                    <Col span={8}>
                      <Switch onChange={handleChangSwitch} />
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
                        className={styles.font}
                      >
                        Chọn mã giảm giá
                      </Button>
                      <Row style={{ marginTop: "10px" }}>
                        <Col span={12}>
                          <span style={{ fontSize: "16px", display: "block" }}>
                            Tiền hàng
                          </span>
                          <span style={{ fontSize: "16px", display: "block" }}>
                            Giảm giá
                          </span>
                          {switchChange &&
                            <>
                              <span style={{ fontSize: "16px", display: "block" }}>
                                Phí ship
                              </span>
                            </>}
                          <span style={{ fontSize: "16px", display: "block" }}>
                            Tổng số tiền
                          </span>
                          {!switchChange && <>
                            <span style={{ fontSize: "16px", display: "block" }}>
                              Khách cần trả
                            </span>
                            <span style={{ fontSize: "16px", display: "block" }}>
                              Tiền thừa trả khách
                            </span></>}
                        </Col>
                        <Col span={12}>
                          {/* tiền hàng */}
                          <span style={{ fontSize: "16px", display: "block" }}>
                            {totalPrice.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND',
                            })}
                          </span>
                          {/* giảm giá */}
                          <span style={{ fontSize: "16px", display: "block" }}>
                            0
                          </span>
                          {/* phí ship */}
                          {switchChange && <>
                            <span style={{ fontSize: "16px", display: "block" }}>
                              {shippingFee?.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              })}
                            </span></>}
                          {/* tổng tiền */}
                          <span
                            style={{
                              color: "red",
                              fontSize: "16px",
                              display: "block",
                            }}
                          >
                            {(totalPrice + (shippingFee || 0)).toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            })}
                          </span>
                          {!switchChange && <>
                            {/* khách cần trả */}
                            <input type="number" className={styles.input}
                              onChange={(e) => setRemainAmount(e.target.value - totalPrice)
                              }
                            />
                            {/* tiền thừa */}
                            <span style={{ fontSize: "16px", display: "block" }}>
                              {remainAmount.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              })}
                            </span></>}
                        </Col>
                        <TextArea rows={3} placeholder="ghi chú ..." style={{ margin: '10px 0' }} />
                        <div style={{ marginTop: "20px" }}>
                          <div className={styles.buttonGroup}>
                            <Button
                              className={`${styles.cashButton} ${selectedButton === 'money' ? styles.selected : ''}`}
                              icon={<DollarOutlined />}
                              onClick={() => handleButtonClick('money')}
                            >
                              Tiền
                            </Button>
                            <Button
                              style={{ margin: "0 10px" }}
                              className={`${styles.cashButton} ${selectedButton === 'transfer' ? styles.selected : ''}`}
                              icon={<SwapOutlined />}
                              onClick={() => handleButtonClick('transfer')}
                            >
                              Chuyển khoản
                            </Button>
                            <Button
                              className={`${styles.cashButton} ${selectedButton === 'both' ? styles.selected : ''}`}
                              onClick={() => handleButtonClick('both')}
                            >
                              Cả hai
                            </Button>
                          </div>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                          <Button
                            type="primary"
                            onClick={() => handleCreateBill()}
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
