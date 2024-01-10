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
  Flex,
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
  InteractionOutlined,
  ShopOutlined,
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
import TableOrderProduct from "./TableOrderProduct";

const urlAutofillVoucher = "http://localhost:8080/api/client/autoFillVoucher";
const baseUrl =
  "http://localhost:8080/api/admin/product/updateQuantityProductDetail";

const Bill = () => {
  var initialItems = [];
  const [boolean, setBoolean] = useState(true);
  const [modalVisible, setModalVisible] = useState([]);
  const [modalAccountVisible, setModalAccountVisible] = useState([]);
  const [modalQRScanOpen, setModalQRScanOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [priceATM, setPriceATM] = useState(0);
  function getCart() {
    initialItems = [];
    var checkEmpty = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("HD")) {
        var tab = {
          label: "Hóa đơn: " + localStorage.key(i),
          key: key,
          count: JSON.parse(localStorage.getItem(key)).productDetails.length,
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
    if (Number(record?.quantity) !== Number(value)) {
      let cart = JSON.parse(localStorage.getItem(cartId));
      let productDetails = cart.productDetails;
      if (!/^\d+$/.test(value)) {
        notification.warning({
          message: "Thông báo",
          description: "Số lượng phải là số nguyên dương",
          duration: 1,
        });
        setRendered(Math.random());
        return;
      }
      if (value > 99) {
        notification.warning({
          message: "Thông báo",
          description: "Chỉ được mua 100 sản phẩm",
          duration: 1,
        });
        setRendered(Math.random());
        return;
      }
      if (value <= 0) {
        notification.warning({
          message: "Thông báo",
          description: "Số lượng sản phẩm phải là số nguyên dương",
          duration: 1,
        });
        productDetails[index].quantity = 1;
        cart.productDetails = productDetails;
        localStorage.setItem(cartId, JSON.stringify(cart));
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

      axios
        .post(
          baseUrl,
          {
            productDetail: record?.productDetail,
            quantityCurrent: Number(record?.quantity),
            quantityUpdate: Number(value),
            request: {
              brandId: "",
              categoryId: "",
              buttonId: "",
              materialId: "",
              shirtTailId: "",
              sleeveId: "",
              collarId: "",
              colorId: "",
              sizeId: "",
              patternId: "",
              formId: "",
            },
            isEditProductTimeLine: false,
          },
          {
            headers: {
              Authorization: `Bearer ${getToken(true)}`,
            },
          }
        )
        .then(() => {
          setRendered(cart);
          notification.success({
            message: "Thông báo",
            description: "Chỉnh sửa số lượng thành công",
            duration: 1,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const options = [
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "50px",
          }}
        >
          <Avatar src={<DollarOutlined style={{ color: "black" }} />} />
          <div>Tiền mặt</div>
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
            width: "100%",
            height: "50px",
          }}
        >
          <Avatar src={<SwapOutlined style={{ color: "black" }} />} />
          <div> Chuyển khoản</div>
        </div>
      ),
      value: "2",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "50px",
          }}
        >
          <Avatar src={<InteractionOutlined style={{ color: "black" }} />} />
          <div>Cả 2</div>
        </div>
      ),
      value: "3",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(1);

  const handleOptionChange = (value, index) => {
    setSelectedOption(value);
    setAmountPaid(0);
    setTransactionCode("");
    setRemainAmount(0);
    setPrice(0);
  };

  // xóa sản phẩm trong giỏ hàng
  const handleDeleteProduct = (record, index) => {
    Modal.confirm({
      title: "Xóa sản phẩm",
      content: "Bạn có chắc chắn muốn xóa sản phẩm?",
      onOk() {
        //rollback số lượng
        axios
          .post(
            baseUrl,
            {
              productDetail: record?.productDetail,
              quantityCurrent: Number(record?.quantity),
              quantityUpdate: 0,
              request: {
                brandId: "",
                categoryId: "",
                buttonId: "",
                materialId: "",
                shirtTailId: "",
                sleeveId: "",
                collarId: "",
                colorId: "",
                sizeId: "",
                patternId: "",
                formId: "",
              },
              isEditProductTimeLine: false,
            },
            {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            }
          )
          .then(() => {
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
          })
          .catch((err) => {
            console.log(err);
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
  const [email, setEmail] = useState("");

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
    setSelectedWard(null);
    setLeadtime(null);
    setShippingFee(null);
    setDistricts([]);
    if (value) {
      await axios
        .get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${value?.trim()}`,
          {
            headers: {
              token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
            },
          }
        )
        .then((response) => {
          const data = response?.data?.data?.filter(
            (item) => item?.DistrictID !== 3451
          );
          setDistricts(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleDistrictChange = async (value, valueDB) => {
    setSelectedDictrict(valueDB);
    setSelectedWard(null);
    setLeadtime(null);
    setShippingFee(null);
    setWards([]);
    if (value) {
      try {
        const response = await axios.get(
          `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value?.trim()}`,
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
      to_ward_code: `${toWardCode?.trim()}`,
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
  const totalPrice = productDetails?.reduce((total, product) => {
    return total + product.priceReduce * product.quantity;
  }, 0);

  const voucherPrice = () => {
    let result = 0;

    if (voucherAdd) {
      if (voucherAdd.voucherMethod === "vnd") {
        if (totalPrice >= (voucherAdd.voucherCondition ?? 0)) {
          result = voucherAdd.voucherValue ?? 0;
        }
      } else {
        if (totalPrice >= voucherAdd.voucherCondition) {
          const discountPercent = voucherAdd.voucherValue ?? 0;
          const maxDiscount = voucherAdd.voucherValueMax ?? 0;
          let discount = (totalPrice * discountPercent) / 100;
          result = Math.min(discount, maxDiscount);
        }
      }
    }

    return result >= 0 ? result : 0;
  };
  // phí ship
  const handleShippingFee = (insuranceValue, toDistrictId, toWardCode) => {
    let totalWeight = 0;
    for (let i = 0; i < productDetails?.length; i++) {
      totalWeight += productDetails[i]?.productDetail?.weight;
    }
    let service_id = 53321;
    const values = {
      service_id: service_id,
      insurance_value: insuranceValue,
      coupon: null,
      from_district_id: 3440,
      to_district_id: Number(toDistrictId),
      to_ward_code: toWardCode?.trim(),
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
          setShippingFee(response?.data?.data?.total);
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
              setShippingFee(response?.data?.data?.total);
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
    setRemainAmount(-1);
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
    console.log("newActiveKey: ", newActiveKey);
    setPrice("0");
    setCartId(newActiveKey);
    setActiveKey(newActiveKey);
    setSelectedOption(1);
    setSelectedProvince(null);
    setSelectedDictrict(null);
    setSelectedWard(null);
    handleDeleteAccount();
  };

  const countCardWait = (key) => {
    const dataLocal = JSON.parse(window.localStorage.getItem(key));
    return dataLocal?.productDetails?.length;
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
          count: 0,
        })
      );
      setItems(newPanes);
      setCartId(newActiveKey);
      setActiveKey(newActiveKey);
    }
  };

  // xóa tab
  const remove = (targetKey, isUpdate) => {
    if (isUpdate) {
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
      return;
    }
    Modal.confirm({
      title: "Xóa hóa đơn",
      content: "Bạn có chắc chắn muốn xóa hóa đơn này không?",
      onOk() {
        var cart = JSON.parse(localStorage.getItem(cartId));
        var productDetails = cart?.productDetails;

        for (let index = 0; index < productDetails.length; index++) {
          var productDetail = productDetails[index]?.productDetail;
          var quantityCurrent = productDetails[index]?.quantity;
          axios
            .post(
              baseUrl,
              {
                productDetail: productDetail,
                quantityCurrent: quantityCurrent,
                quantityUpdate: 0,
                request: {
                  brandId: "",
                  categoryId: "",
                  buttonId: "",
                  materialId: "",
                  shirtTailId: "",
                  sleeveId: "",
                  collarId: "",
                  colorId: "",
                  sizeId: "",
                  patternId: "",
                  formId: "",
                },
                isEditProductTimeLine: false,
              },
              {
                headers: {
                  Authorization: `Bearer ${getToken(true)}`,
                },
              }
            )
            .then(() => {
              setRendered(cart);
              notification.success({
                message: "Thông báo",
                description: "Chỉnh sửa số lượng thành công",
                duration: 1,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }

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
      },
    });
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
    console.log("getProductDetails");
    var cart = JSON.parse(localStorage.getItem(cartId));
    var productDetails = cart?.productDetails;

    if (productDetails?.length < 0) {
      return;
    }
    setProductDetails(productDetails);
    setAccount(cart?.account);
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
              productDetails[i]?.quantity >
              productDetails[i]?.productDetail?.quantity
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
            productDetail: response?.data,
            quantity: 1,
            priceReduce: response?.data?.promotionValue
              ? response?.data?.promotionMethod === "%"
                ? (response?.data?.price *
                    (100 - Number(response?.data?.promotionValue))) /
                  100
                : response?.data?.price - Number(response?.data?.promotionValue)
              : response?.data?.price,
          });
        }
        cart = {
          productDetails: productDetails,
          timeStart: now(),
          account: cart?.account,
        };

        axios
          .post(
            baseUrl,
            {
              productDetail: productDetails[i].productDetail,
              quantityCurrent: productDetails[i]?.quantity,
              request: {
                brandId: "",
                categoryId: "",
                buttonId: "",
                materialId: "",
                shirtTailId: "",
                sleeveId: "",
                collarId: "",
                colorId: "",
                sizeId: "",
                patternId: "",
                formId: "",
              },
            },
            {
              headers: {
                Authorization: `Bearer ${getToken(true)}`,
              },
            }
          )
          .then(() => {
            localStorage.setItem(cartId, JSON.stringify(cart));
            notification.success({
              message: "Thông báo",
              description: "Thêm thành công",
              duration: 2,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        const status = err?.response?.status;
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
  }, []);

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
    let isError = false;
    const bill = {
      billCode: activeKey,
      accountId: account?.username,
      price: totalPrice,
      priceReduce: voucherPrice(),
      // amountPaid: typeShipping[index]
      //   ? 0
      //   : Number(selectedOption) === 2
      //   ? voucherPrice() + shippingFee
      //   : Number(selectedOption) === 3
      //   ? voucherPrice() + shippingFee
      //   : amountPaid,
      amountPaid: totalPrice - voucherPrice() + (shippingFee ? shippingFee : 0),
      billType: "In-Store",
      symbol: typeShipping[index] ? "Shipping" : symbol,
      status: typeShipping[index]
        ? "wait_for_delivery"
        : !typeShipping[index] && switchChange[index]
        ? "wait_for_delivery"
        : "Complete",
      paymentInDelivery: typeShipping[index] ? typeShipping[index] : false,
      priceAmountATM: priceATM ? priceATM.replace(/[,]/g, "") : null,
      isSellingAdmin: true,
      note: note,
      paymentDetailId: Number(selectedOption),
      lstBillDetailRequest: [],
      addressId: selectedAddress?.id,
      fullname: selectedAddress?.fullName,
      transactionCode:
        Number(selectedOption) === 2 || Number(selectedOption) === 3
          ? transactionCode
          : null,
      phoneNumber: selectedAddress?.numberPhone,
      voucherCode: voucherAdd?.voucherCode ?? null,
      // createdBy: token,
      priceAmountCast: price ? price.replace(/[,]/g, "") : null,
      // Number(selectedOption) !== 2
      //   ? price
      //     ? price.replace(/[,]/g, "")
      //     : null
      //   : null,
      emailDetails: {
        recipient: selectedAddress?.email ? [selectedAddress?.email] : [email],
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
                            <span>Đơn hàng ${activeKey}</span>
                        </td>
                    </tr>
                </table>
                        <div style="padding: 0 20px; margin-top: 24px;">
                            <span style="font-weight: 500; font-size: 24px;">Cảm ơn bạn đã mua hàng!</span><br><br>
                            <p style="text-align: justify;">Xin chào ${fullname}, Chúng tôi đã nhận được đặt hàng của bạn và đã sẵn sàng để vận chuyển. Chúng tôi sẽ thông báo cho bạn khi đơn hàng được gửi đi.</p><br>
                            <div style="text-align: center">
                                <a style="color: white; font-weight: 500; padding: 16px 20px; border-radius: 4px; background-color: #1666a2; margin-right: 20px;" href="http://localhost:3000/ms-shop/bill/${activeKey}">
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
                                                    <img alt="product" style="width: 100%; border: 1px solid #ccc; border-radius: 8px;" src=${
                                                      item.productDetail
                                                        ?.productImageResponse[0]
                                                        ?.path
                                                    }>
                                                </div>
                                                <div style="width: 55%; padding: 4px;">
                                                    <p>${
                                                      item.productDetail.product
                                                        .productName +
                                                      "-" +
                                                      item.productDetail.button
                                                        .buttonName +
                                                      "-" +
                                                      item.productDetail.brand
                                                        .brandName +
                                                      "-" +
                                                      item.productDetail
                                                        .category.categoryName +
                                                      "-" +
                                                      item.productDetail.collar
                                                        .materialName +
                                                      "-" +
                                                      item.productDetail.color
                                                        .collarName +
                                                      "-" +
                                                      item.productDetail.sleeve
                                                        .sleeveName +
                                                      "-" +
                                                      item.productDetail
                                                        .shirtTail
                                                        .shirtTailTypeName +
                                                      "-" +
                                                      item.productDetail
                                                        .patternName +
                                                      "-" +
                                                      item.productDetail
                                                        .formName
                                                    } <span style="display: inline-block">(x ${
                                        item.quantity
                                      })</span></p >
                                                </div >
      <div style="width: 25%; padding: 4px;">
        <p>${item.priceReduce?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}</p>
      </div >
                                            </div > `;
                                    })}
    <hr>
      <div style="width: 70%; float: right; padding: 4px 20px;">
        <div style="display: flex; justify-content: space-between; padding: 4px 0;">
          <span>Tổng giá trị sản phẩm:</span>
          <span style="font-weight: 500;">
            ${(voucherPrice() + (shippingFee ?? 0))?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      </div>
    </div>
                        </div >
                    </td >
                </tr >
            </table >
        </body > `,
        subject: `THÔNG BÁO XÁC NHẬN ĐƠN HÀNG ${activeKey} `,
      },
    };

    const billAddress = {
      email: email,
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
        .required("Số điện thoại không được để trống")
        .matches(/^[0-9]{10}$/, "Số điện thoại phải có đúng 10 chữ số"),
      city: Yup.string().required("Tỉnh/ thành phố không được để trống"),
      district: Yup.string().required("Quận/ huyện không được để trống"),
      ward: Yup.string().required("Phường/ xã không được để trống"),
      email: Yup.string().email("Địa chỉ email không hợp lệ"),
    });
    let calculatedValue = 0;
    if (switchChange[index]) {
      calculatedValue = totalPrice - voucherPrice() + shippingFee;
    } else {
      calculatedValue = totalPrice - voucherPrice();
    }
    const customerAmountPay =
      totalPrice - voucherPrice() + (shippingFee ? shippingFee : 0);
    if (!typeShipping[index]) {
      if (Number(selectedOption) === 1) {
        const priced = Number(price?.replace(",", ""));
        if (priced < customerAmountPay) {
          isError = true;
          setInputError("Vui lòng nhập số tiền cần thanh toán");
          return;
        }
      }

      if (Number(selectedOption) === 3) {
        if (remainAmount === -1) {
          isError = true;
          setInputError("Bạn chưa nhập tiền");
        } else {
          setInputError("");
        }

        if (transactionCode.trim().length === 0) {
          isError = true;
          setTransactionError("Mã giao dịch không được để trống");
        } else {
          setTransactionError("");
        }

        if (priceATM) {
          if (!priceATM?.replace(/[^\d.]/g, "")) {
            isError = true;
            setPriceATMError("Sai định dạng");
          } else {
            if (Number(priceATM?.replace(/[,]/g, "")) < remainAmount) {
              isError = true;
              setPriceATMError("Số tiền không đủ");
            }
          }
        } else {
          isError = true;
          setPriceATMError("Vui lòng nhập số tiền cần thanh toán");
        }

        if (inputError && transactionError && setPriceATMError) {
          return;
        }
      }

      if (productDetails?.length <= 0) {
        isError = true;
        return notification.error({
          message: "Thông báo",
          description: "Không có sản phẩm nào trong giỏ hàng.",
          duration: 2,
        });
      }

      if (Number(selectedOption) === 1) {
        const priceNumber = Number(price.replace(",", ""));
        if (priceNumber < Number(calculatedValue)) {
          console.log("remainAmount: ", remainAmount);
          isError = true;
          return setInputError("Nhập đủ số tiền cần thanh toán");
        }
      }

      if (Number(selectedOption) === 3 || Number(selectedOption) === 2) {
        if (Number(selectedOption) === 2) {
          if (priceATM) {
            if (!priceATM.replace(/[^\d.]/g, "")) {
              isError = true;
              setPriceATMError("Sai định dạng");
            } else {
              const priceATMStr = priceATM.replace(/[,]/g, "");
              if (Number(priceATMStr) < remainAmount) {
                isError = true;
                setPriceATMError("Số tiền không đủ");
              } else {
                setPriceATMError("");
              }
            }
          } else {
            isError = true;
            setPriceATMError("Vui lòng nhập số tiền cần thanh toán");
          }
          if (transactionCode.trim() === "") {
            isError = true;
            return setTransactionError("Mã giao dịch không được để trống");
          }
        }
      }
    }

    if (switchChange[index])
      if (/^[+]?\d*\.?\d+$/.test(shippingFee)) {
        if (shippingFee < 10000) {
          isError = true;
          setShippingFeeError("Số tiền vận chuyển quá nhỏ");
        } else if (shippingFee > 1000000) {
          isError = true;
          setShippingFeeError("Số tiền vận chuyển quá lớn");
        } else {
          isError = false;
          setShippingFeeError("");
        }
      }

    if (!isError) {
      for (let i = 0; i < productDetails?.length; i++) {
        const billDetail = {
          productDetailId: productDetails[i].productDetail.id,
          price: productDetails[i].priceReduce,
          quantity: productDetails[i].quantity,
        };
        bill?.lstBillDetailRequest?.push(billDetail);
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
                    Authorization: `Bearer ${getToken(true)} `,
                  },
                }
              );
              addressId = response?.data?.id;
            } catch (error) {
              const validationErrors = {};
              error.inner.forEach((err) => {
                validationErrors[err?.path] = err.message;
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
                  Authorization: `Bearer ${getToken(true)} `,
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
                  phoneNumber: account ? account?.numberPhone : phoneNumber,
                  shipDate: switchChange[index] === true ? leadtime : null,
                  shipPrice: switchChange[index] === true ? shippingFee : null,
                },
                {
                  headers: {
                    Authorization: `Bearer ${getToken(true)} `,
                  },
                }
              );
            }

            notification.success({
              message: "Thông báo",
              description: "Thao tác thành công",
              duration: 2,
            });
            navigate(`/api/admin/order`);
            remove(activeKey, true);
          } catch (error) {
            const status = error?.response?.status;
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
  const [transactionError, setTransactionError] = useState("");
  const [priceATMError, setPriceATMError] = useState("");

  const handleChangeInput = (inputValue, index) => {
    const totalPrice = productDetails?.reduce((total, product) => {
      return total + product.priceReduce * product.quantity;
    }, 0);
    setAmountPaid(inputValue);
    let calculatedValue = 0;
    if (switchChange[index]) {
      calculatedValue =
        inputValue - (totalPrice - voucherPrice() + shippingFee);
    } else {
      calculatedValue = inputValue - (totalPrice - voucherPrice());
    }
    setRemainAmount(calculatedValue);
    numeral(inputValue).format("0,0");
    if (calculatedValue < 0 && selectedOption === "1") {
      setInputError("Số tiền không đủ");
    } else {
      setInputError("");
      setTransactionError("");
    }
  };

  const [shippingFeeError, setShippingFeeError] = useState("");
  const handleChangeShippingFee = (value, index) => {
    if (switchChange[index])
      if (/^[+]?\d*\.?\d+$/.test(value)) {
        const replaceValue = value.replace(",", "");
        const data = Number(replaceValue);
        if (data < 10000) {
          setShippingFeeError("Số tiền vận chuyển quá nhỏ");
        } else if (data > 1000000) {
          setShippingFeeError("Số tiền vận chuyển quá lớn");
        } else {
          setShippingFeeError("");
        }
        setShippingFee(data);
      }
  };

  useEffect(() => {
    async function autoFillVoucher() {
      if (totalPrice > 0) {
        try {
          const res = await axios.post(urlAutofillVoucher, {
            priceBill: totalPrice ? totalPrice : null,
            username: null,
          });
          const data = await res.data;
          setVoucherAdd(data);
        } catch (err) {
          setVoucherAdd({});
          notification.error({
            message: "Lỗi",
            description: "Hệ thống xảy ra lỗi",
            duration: 2,
          });
        }
      }
    }
    autoFillVoucher();
  }, [totalPrice, switchChange, typeShipping, selectedOption, price]);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>
        <ShopOutlined /> Bán hàng tại quầy
      </h1>
      <br />
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
                  <Badge count={countCardWait(item.key)} showZero>
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
                        isEditProductTimeLine={false}
                        setBoolean={setBoolean}
                        boolean={boolean}
                      />
                    </Col>
                  </Row>
                  <Divider
                    className={styles.blackDivider}
                    style={{ marginTop: "3px" }}
                  />
                  {/* <Table
                    dataSource={
                      productDetails &&
                      productDetails?.map((record, index) => ({
                        ...record,
                        key: record.id,
                      }))
                    }
                    columns={columns}
                    pagination={false}
                  /> */}
                  <TableOrderProduct
                    productDetails={productDetails}
                    handleDeleteProduct={handleDeleteProduct}
                    updateQuantity={updateQuantity}
                    bool={boolean}
                    cartId={cartId}
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
                        address={address?.accountAddress}
                        selectedAddress={setSelectedAddress}
                        username={account?.username}
                      />
                      <Row style={{ marginBottom: "30px" }}>
                        <Col span={24}>
                          <Row>
                            <Col span={24}>
                              <div className="m-5">
                                <b style={{ color: "red" }}></b> Email
                                <Input
                                  placeholder="nhập email"
                                  value={selectedAddress?.email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                  <div style={{ color: "red" }}>
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                            </Col>
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
                              <b style={{ color: "red" }}>*</b> Tỉnh/ thành phố
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
                                selectedAddress?.city
                                  ? selectedAddress?.city.substring(
                                      0,
                                      selectedAddress?.city.indexOf("|")
                                    )
                                  : selectedProvince
                              }
                            >
                              {provinces &&
                                provinces.map((province) => (
                                  <Select.Option
                                    label={province?.ProvinceName}
                                    key={province?.ProvinceID}
                                    value={`${province?.ProvinceName}| ${province?.ProvinceID} `}
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
                              <b style={{ color: "red" }}>*</b> Quận/ huyện
                            </span>
                            <br />
                            <Select
                              style={{ width: "100%" }}
                              onChange={(event) => {
                                handleDistrictChange(
                                  event?.substring(event.indexOf("|") + 1),
                                  event
                                );
                                console.log("data: ", event);
                              }}
                              value={
                                selectedAddress?.district
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
                                      value={`${district?.DistrictName}| ${district?.DistrictID} `}
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
                              <b style={{ color: "red" }}>*</b> Phường/ xã
                            </span>
                            <br />
                            <Select
                              style={{ width: "100%" }}
                              onChange={handleWardChange}
                              value={
                                selectedAddress?.ward
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
                                    value={`${ward.WardName}| ${ward.WardCode} `}
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

                      <Row style={{ marginTop: "10px" }}>
                        <Col span={12}>
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
                        <Col span={12}>
                          <span
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            {totalPrice?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </Col>
                        <Col span={12}>
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
                        <Col span={12}>
                          <span
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            {voucherAdd?.voucherValue
                              ? voucherAdd.voucherMethod === "vnd"
                                ? voucherAdd?.voucherValue?.toLocaleString(
                                    "vi-VN",
                                    {
                                      style: "currency",
                                      currency: "VND",
                                    }
                                  )
                                : voucherAdd?.voucherValue + "%"
                              : "0đ"}
                          </span>
                        </Col>

                        {switchChange[index] && shippingFee && (
                          <>
                            <Col span={12}>
                              <span
                                style={{
                                  fontSize: "16px",
                                  width: "200px",
                                }}
                              >
                                Phí vận chuyển
                              </span>
                            </Col>
                            <Col span={12}>
                              <Input
                                placeholder="Số tiền vận chuyển"
                                className={styles.input_noneBorder}
                                value={numeral(shippingFee).format("0,0")}
                                onChange={(e) => {
                                  handleChangeShippingFee(
                                    e.target.value.replace(/\D/g, ""),
                                    index
                                  );
                                }}
                              />
                              {inputError && (
                                <span
                                  style={{
                                    width: "200%",
                                    color: "red",
                                  }}
                                >
                                  {shippingFeeError}
                                </span>
                              )}
                              <span style={{ fontSize: "16px", color: "red" }}>
                                {shippingFeeError}
                              </span>
                            </Col>
                          </>
                        )}
                        <Col span={12}>
                          <span
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            Tổng cộng
                          </span>
                        </Col>
                        <Col span={12}>
                          {switchChange[index] ? (
                            <span
                              style={{
                                color: "red",
                                fontSize: "16px",
                              }}
                            >
                              {(
                                totalPrice -
                                voucherPrice() +
                                (shippingFee ? shippingFee : 0)
                              )?.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </span>
                          ) : (
                            <span
                              style={{
                                color: "red",
                                fontSize: " 16px",
                              }}
                            >
                              {(totalPrice - voucherPrice())?.toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                            </span>
                          )}
                        </Col>
                        {(Number(selectedOption) !== 2 &&
                          !typeShipping[index]) ||
                        Number(selectedOption) === 3 ? (
                          <>
                            <Col span={12} style={{ marginTop: "8px" }}>
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
                            <Col span={12}>
                              <Input
                                className={styles.input_noneBorder}
                                value={price}
                                onChange={(e) => {
                                  handleChangeInput(
                                    e.target.value.replace(/\D/g, ""),
                                    index
                                  );
                                  setPrice(
                                    numeral(
                                      e.target.value.replace(/\D/g, "")
                                    ).format("0,0")
                                  );
                                }}
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
                        {Number(selectedOption) !== 2 &&
                        !typeShipping[index] ? (
                          <Col span={24}>
                            {remainAmount > 0 && (
                              <Row style={{ marginTop: "8px" }}>
                                <Col span={12}>
                                  <span
                                    style={{ fontSize: "16px", width: "200%" }}
                                  >
                                    Tiền thừa
                                  </span>
                                </Col>
                                <Col span={12}>
                                  <span
                                    style={{
                                      fontSize: "16px",
                                      color: "red",
                                    }}
                                  >
                                    {remainAmount?.toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </span>
                                </Col>
                              </Row>
                            )}
                          </Col>
                        ) : null}
                        {Number(selectedOption) === 2 ||
                        Number(selectedOption) === 3 ? (
                          <>
                            <Input
                              value={priceATM}
                              placeholder="Nhập số tiền khách chuyển ATM"
                              size="large"
                              onChange={(e) => {
                                handleChangeInput(
                                  e.target.value.replace(/\D/g, ""),
                                  index
                                );
                                setPriceATM(
                                  numeral(
                                    e.target.value.replace(/\D/g, "")
                                  ).format("0,0")
                                );
                              }}
                              style={{ margin: "10px 0", width: "380px" }}
                              className={styles.input_noneBorder}
                            />
                            <span style={{ fontSize: "16px", color: "red" }}>
                              {priceATMError}
                            </span>

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
                              {transactionError}
                            </span>
                          </>
                        ) : null}
                        <TextArea
                          onChange={(e) => setNote(e.target.value)}
                          rows={3}
                          placeholder="ghi chú ..."
                          style={{ margin: "10px 0" }}
                        />
                        <Col span={24} style={{ marginTop: "20px" }}>
                          {!typeShipping[index] && (
                            <Flex
                              gap="small"
                              align="center"
                              style={{ width: "100%" }}
                              vertical
                            >
                              <Segmented
                                options={options}
                                style={{ marginBottom: "20px", height: "100%" }}
                                onChange={(e) => handleOptionChange(e, index)}
                              ></Segmented>
                            </Flex>
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
                        </Col>
                        <Col span={24} style={{ marginTop: "20px" }}>
                          <Button
                            type="primary"
                            onClick={() => handleCreateBill(index)}
                            style={{ width: "100%", height: "40px" }}
                          >
                            Xác nhận thanh toán
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Tabs.TabPane>
            );
          })}
      </Tabs>
      <FormUsingVoucher
        priceBill={totalPrice}
        voucher={voucherAdd}
        setVoucher={setVoucherAdd}
        isOpen={isOpenFormVoucher}
        setIsOpen={setIsOpenFormVoucher}
        username={account ? account?.username : null}
      />
    </>
  );
};

export default Bill;
