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

const Bill = () => {
  var initialItems = [];
  const [modalVisible, setModalVisible] = useState([]);
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [switchChange, setSwitchChange] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cartId, setCartId] = useState(
    initialItems.length === 0 ? null : initialItems[0].key
  );
  const [render, setRendered] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
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
        // console.log(res.data.data)
        setProvinces(res.data.data)
      )
      .catch((err) => console.log(err));
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
    await axios
      .get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value}`,
        {
          headers: {
            token: `0f082cbe-5110-11ee-a59f-a260851ba65c`,
          },
        }
      )
      .then((res) => {
        setWards(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangSwitch = (checked) => {
    setSwitchChange(checked);
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
                      <Button style={{ color: "blue" }}>Chọn tài khoản</Button>
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
                              optionFilterProp="children"
                              filterOption={(input, option) =>
                                (option?.label ?? "").includes(input)
                              }
                              filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "")
                                  .toLowerCase()
                                  .localeCompare(
                                    (optionB?.label ?? "").toLowerCase()
                                  )
                              }
                              showSearch
                              style={{ width: 200 }}
                              onChange={handleProvinceChange}
                            >
                              {provinces.map((province) => (
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
                              {districts.map((district) => (
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
                            <Select style={{ width: 200 }}>
                              {wards.map((ward) => (
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
                          <span style={{ fontSize: "16px", display: "block" }}>
                            Tổng số tiền
                          </span>
                          <span style={{ fontSize: "16px", display: "block" }}>
                            Khách cần trả
                          </span>
                          <span style={{ fontSize: "16px", display: "block" }}>
                            Tiền thừa trả khách
                          </span>
                        </Col>
                        <Col span={12}>
                          <span style={{ fontSize: "16px", display: "block" }}>
                            3.000.000
                          </span>
                          <span style={{ fontSize: "16px", display: "block" }}>
                            0
                          </span>
                          <span
                            style={{
                              color: "red",
                              fontSize: "16px",
                              display: "block",
                            }}
                          >
                            3.000.000
                          </span>
                          <input className={styles.input} />
                          <span style={{ fontSize: "16px", display: "block" }}>
                            3.000.000
                          </span>
                        </Col>
                        <div style={{ marginTop: "20px" }}>
                          <TextArea rows={3} placeholder="ghi chú ..." style={{ marginBottom: '10px' }} />
                          <Button
                            icon={<DollarOutlined />}
                            className="cash-button"
                          >
                            Tiền
                          </Button>
                          <Button
                            style={{ margin: "0 10px" }}
                            icon={<SwapOutlined />}
                            className="cash-button"
                          >
                            Chuyển khoản
                          </Button>
                          <Button
                            icon={<DollarOutlined />}
                            className="cash-button"
                          >
                            Cả hai
                          </Button>
                        </div>
                        <div style={{ marginTop: "20px" }}>
                          <Button
                            type="primary"
                            style={{ width: "350px", height: "40px" }}
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
