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
} from "antd";
import React, { useEffect, useState } from "react";
import styles from "./Bill.module.css";
import ModalProduct from "./ModalProduct";
import logoGhn from "../../../Assets/img/logo/logo_ghn.png";
import {
  CloseCircleOutlined,
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
import { FaMapMarkerAlt } from "react-icons/fa";
import ModalAddress from "./ModalAddress";

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
          account: null
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

  // xóa tài khoản 
  const handleDeleteAccount = () => {
    let cart = JSON.parse(localStorage.getItem(cartId));
    delete cart.account;
    localStorage.setItem(cartId, JSON.stringify(cart));
    setSelectedAddress(0);
    setShippingFee(0);
    setLeadtime(null)
    setRendered(cart);
  }

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
  const [remainAmount, setRemainAmount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0)
  const [leadtime, setLeadtime] = useState(null)
  const [selectedDictrict, setSelectedDictrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null)
  const [selectedButton, setSelectedButton] = useState(null);
  const [account, setAccount] = useState(null);
  const [address, setAddress] = useState([])
  const [showAddress, setShowAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(0)
  const navigate = useNavigate();

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

  const handleShowModalAddress = (index) => {
    const visible = [...showAddress]
    visible[index] = true;
    setShowAddress(visible)
  }

  const handleCancelAddress = (index) => {
    const visible = [...showAddress]
    visible[index] = false;
    setShowAddress(visible)
  }

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

  const handleDistrictChange = async (value) => {
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
        setSelectedDictrict(value)
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleWardChange = (value) => {
    setSelectedWard(value)
  }

  const handleShippingOrderLeadtime = (toDistrictId, toWardCode) => {
    console.log(`object`, toDistrictId, toWardCode)
    const values = {
      from_district_id: 3440,
      from_ward_code: '13010',
      to_district_id: Number(toDistrictId),
      to_ward_code: `${toWardCode}`,
      service_id: 53321
    };

    if (account !== null && toDistrictId && toWardCode) {
      axios
        .post(
          'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime',
          values,
          {
            headers: {
              token: '0f082cbe-5110-11ee-a59f-a260851ba65c',
              shop_id: '4534109'
            }
          }
        )
        .then(response => {
          const leadtimeTimestamp = response.data.data.leadtime;
          const leadtimeMoment = moment.unix(leadtimeTimestamp);
          const formattedDateTime = leadtimeMoment.format('DD/MM/YYYY');

          setLeadtime(`${formattedDateTime}`);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  //  tỏng giá tiền
  const totalPrice = productDetails.reduce((total, product) => {
    return total + product.productDetail.price * product.quantity;
  }, 0);

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
      width: 15
    };

    if (account !== null && insuranceValue && toDistrictId && toWardCode) {
      axios
        .post(
          'https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee',
          values,
          {
            headers: {
              token: '0f082cbe-5110-11ee-a59f-a260851ba65c',
              shop_id: '4534109'
            }
          }
        )
        .then(response => {
          setShippingFee(response.data.data.total);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  // switch bán tại quầy hoặc online
  const handleChangSwitch = (checked, index) => {
    const visible = [...switchChange];
    visible[index] = true;
    setSwitchChange(visible);
    if (!checked) {
      setBilType('In-store')
      setShippingFee(0)
      visible[index] = false;
    } else {
      setBilType('Online')
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
          account: null
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
    setAccount(cart.account)
  };

  const getListAddressByUsername = (username) => {
    axios.get(`http://localhost:8080/api/admin/bill/customer/${username}/address`)
      .then((response) => {
        setAddress(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getListAddressByUsername(account?.username)
    fetchProvinces();
    handleProvinceChange(address[0]?.city);
    handleDistrictChange(address[0]?.district);
    if (address.length > 0) {
      handleShippingOrderLeadtime(address[selectedAddress]?.district, address[selectedAddress]?.ward)
      handleShippingFee(totalPrice, address[selectedAddress]?.district, address[selectedAddress]?.ward)
    }
    getProductDetails();
    initializeModalStates();
  }, [cartId, render, account?.username, address[0]?.city, address[0]?.district]);

  const [billType, setBilType] = useState('In-store')
  const [note, setNote] = useState("")
  const handleCreateBill = () => {
    const bill = {
      billCode: activeKey,
      accountId: account?.username,
      price: totalPrice,
      priceReduce: null,
      billType: billType,
      status: 'watting',
      note: note,
      lstBillDetailRequest: [],
    };

    if (selectedButton == null) {
      return console.log('chưa chọn hình thức thanh toán')
    }

    if (remainAmount < (shippingFee + totalPrice)) {
      return console.log('không nạp đủ tiền')
    }

    if (productDetails.length <= 0) {
      return notification.error({
        message: "Thông báo",
        description: "Không có sản phẩm nào trong giỏ hàng.",
        duration: 2,
      });
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
    // Modal.confirm({
    //   title: 'Xác nhận thanh toán',
    //   content: 'Bạn có chắc chắn muốn thanh toán?',
    //   onOk() {
    //     axios
    //       .post('http://localhost:8080/api/admin/bill', bill)
    //       .then((response) => {
    //         navigate(`/admin/counter-sales/${response.data.id}/timeline`);
    //         remove(activeTab);
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }
    // })
    console.log(activeKey)
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
                  <Table dataSource={productDetails} columns={columns} pagination={false} />

                </div>

                <div className={styles.infoPayment}>
                  <Row>
                    <Col span={12}>
                      <h2>Thông tin thanh toán</h2>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
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
                    style={{ marginTop: "3px" }}
                  />
                  <Row>
                    <Col span={16}>
                      <Row style={{ marginBottom: '20px' }}>
                        <Col span={6} style={{ marginTop: '2px' }}>
                          {account && (
                            <>
                              <span style={{ display: 'block', width: '200px' }}>
                                <b>Tên khách hàng: </b> {account.fullname}
                              </span>
                            </>
                          )}
                          {!account && (
                            <>
                              <span><b>Tên tài khoản:</b> Khách lẻ</span>
                            </>
                          )}
                        </Col>
                        <Col span={12} >
                          {account &&
                            <Button
                              icon={<CloseCircleOutlined />}
                              danger
                              style={{ marginLeft: '2%', border: 'none' }}
                              onClick={() => handleDeleteAccount()}
                            ></Button>
                          }
                          {
                            account &&
                            <Button
                              style={{ marginLeft: '50px' }}
                              onClick={() => handleShowModalAddress(index)}
                            >Chọn địa chỉ</Button>
                          }
                          <ModalAddress
                            isModalOpen={showAddress[index]}
                            handleCancel={() => handleCancelAddress(index)}
                            cartId={cartId}
                            render={setRendered}
                            username={account?.username}
                            selected={setSelectedAddress}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col span={10}>
                          <span>
                            <b style={{ color: "red" }}>*</b> Họ và tên
                          </span>
                          <Input placeholder="nhập họ và tên" value={account?.username} />
                        </Col>
                        <Col span={10} style={{ marginLeft: "40px" }}>
                          <span>
                            <b style={{ color: "red" }}>*</b> Số điện thoại
                          </span>
                          <Input placeholder="nhập số điện thoại" value={account?.phoneNumber} />
                        </Col>
                      </Row>
                      <Row style={{ margin: "40px 0" }}>
                        <Col span={7}>
                          <span>
                            <b style={{ color: "red" }}>*</b> Tỉnh/thành phố
                          </span>
                          <br />
                          <Select
                            style={{ width: 200 }}
                            onChange={handleProvinceChange}
                            value={address[0]?.city ? Number(address[selectedAddress]?.city) : undefined}
                          >
                            {provinces &&
                              provinces.map((province) => (
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
                            value={address[selectedAddress]?.district ? Number(address[selectedAddress]?.district) : undefined}
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
                            value={address[selectedAddress]?.ward}
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
                      <Row>
                        <Col span={16}>
                          <span>Địa chỉ cụ thể</span>
                          <Input placeholder="Nhập địa chỉ cụ thể" value={address[selectedAddress]?.descriptionDetail} />
                        </Col>
                        <Col span={6} style={{ marginLeft: "30px" }}>
                          <img
                            src={logoGhn}
                            alt="an sẽ"
                            style={{ width: "90px", height: "80px" }}
                          />
                        </Col>
                        {(switchChange[index] && account) && <h3>Ngày giao hàng dự kiến: {leadtime || ''}</h3>}
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
                        className={styles.font}
                      >
                        Chọn mã giảm giá
                      </Button>
                      <Row style={{ marginTop: "10px" }}>
                        <Col span={12}>
                          <span style={{ fontSize: "16px", width: '200%', display: "block" }}>
                            Tiền hàng
                            <span style={{ marginLeft: '134px' }}>
                              {totalPrice.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              })}
                            </span>
                          </span>
                          <span style={{ fontSize: "16px", width: '200%', display: "block" }}>
                            Giảm giá
                            <span style={{ marginLeft: '142px' }}>
                              0 đ
                            </span>
                          </span>
                          {(switchChange[index] && account) &&
                            <>
                              <span style={{ fontSize: "16px", width: '200%', display: "block" }}>
                                Phí ship
                                <span style={{ marginLeft: '150px' }}>
                                  {shippingFee?.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND'
                                  })}
                                </span>
                              </span>

                            </>}
                          <span style={{ fontSize: "16px", width: '200%', display: "block" }}>
                            Tổng số tiền
                            <span
                              style={{
                                color: "red",
                                marginLeft: '117px'
                              }}
                            >
                              {(totalPrice + shippingFee).toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND'
                              })}
                            </span>
                          </span>
                          {!switchChange[index] && <>
                            <span style={{ fontSize: "16px", width: '200%', display: "block" }}>
                              Số tiền khách trả
                              <input type="number" className={styles.input}
                                onChange={(e) => setRemainAmount(e.target.value - totalPrice - shippingFee)
                                } />
                            </span>
                            <span style={{ fontSize: "16px", width: '200%', display: "block" }}>
                              Tiền thừa trả khách
                              <span style={{ marginLeft: '72px' }}>
                                {remainAmount.toLocaleString('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                })}
                              </span>
                            </span>
                          </>}
                        </Col>

                        <TextArea onChange={(e) => setNote(e.target.value)} rows={3} placeholder="ghi chú ..." style={{ margin: '10px 0' }} />
                        <div style={{ marginTop: "20px" }}>
                          <div className={styles.buttonGroup}>
                            <Button
                              className={`${styles.cashButton} ${selectedButton === 1 ? styles.selected : ''}`}
                              icon={<DollarOutlined />}
                              onClick={() => handleButtonClick(1)}
                            >
                              Tiền
                            </Button>
                            <Button
                              style={{ margin: "0 10px" }}
                              className={`${styles.cashButton} ${selectedButton === 2 ? styles.selected : ''}`}
                              icon={<SwapOutlined />}
                              onClick={() => handleButtonClick(2)}
                            >
                              Chuyển khoản
                            </Button>
                            <Button
                              className={`${styles.cashButton} ${selectedButton === 3 ? styles.selected : ''}`}
                              onClick={() => handleButtonClick(3)}
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
