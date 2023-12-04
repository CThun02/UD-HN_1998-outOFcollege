import React, { useEffect, useState } from "react";
import styles from "./AccountForm.module.css";
import axios from "axios";
import {
  Row,
  Col,
  Avatar,
  Input,
  Radio,
  Select,
  DatePicker,
  Button,
  Upload,
  notification,
  Tooltip,
  Modal,
  Spin,
} from "antd";
import { CheckCircleTwoTone, QrcodeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { saveImage } from "../../../config/FireBase";
import {
  isFormInputEmpty,
  isEmailCorrectFormat,
  isValidPhoneNumber,
} from "../product/ValidateForm";
import dayjs from "dayjs";
import QRReader from "../../../service/QRReader";
import { getToken } from "../../../service/Token";
// Nhập ảnh mã QR
const MyForm = (props) => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  let roleId = props.roleId;
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [accountScan, setAccountScan] = useState({
    idNo: roleId === 2 ? generateUniqueRandomHex(12) : " ",
    image: "none",
    fullName: " ",
    email: " ",
    numberPhone: " ",
    city: roleId === 2 ? "empty" : " ",
    district: roleId === 2 ? "empty" : " ",
    ward: roleId === 2 ? "empty" : " ",
    password: "12345",
    descriptionDetail: roleId === 2 ? "empty" : " ",
    dob: " ",
    gender: true,
    idRole: roleId,
  });
  const [render, setRender] = useState(null);

  const handleSetAccountScan = (field, value) => {
    setAccountScan((accountScan) => ({
      ...accountScan,
      [field]: value,
    }));
  };

  const handleUpload = (file) => {
    setImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  function generateRandomHex(length) {
    return Array.from({ length }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
  }

  function generateUniqueRandomHex(length) {
    var generatedCodes = {};

    while (true) {
      var code = generateRandomHex(length);

      if (!generatedCodes[code]) {
        generatedCodes[code] = true;
        return code;
      }
    }
  }

  const handleScan = (result) => {
    let value = result;
    const idNo = value.substring(0, value.indexOf("|"));
    const fullName = value.substring(
      value.indexOf("|") + 1,
      value.indexOf("|", value.indexOf("|") + 1)
    );
    const dob = value.substring(
      value.indexOf("|", value.indexOf("|") + 1) + 1,
      value.lastIndexOf("|")
    );
    const day = dob.substring(0, 2);
    const month = dob.substring(2, 4);
    const year = dob.substring(4);
    const dateDob = year + "-" + month + "-" + day;
    const gender =
      value.substring(value.lastIndexOf("|") + 1) === "Nam" ? true : false;
    handleSetAccountScan("idNo", idNo);
    handleSetAccountScan("fullName", fullName);
    handleSetAccountScan("dob", dateDob);
    handleSetAccountScan("gender", gender);
    setVisible(false);
    setRender(Math.random());
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const fetchDistricts = async (value) => {
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
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        console.log(error);
      });
  };
  const fetchWard = async (value) => {
    await axios
      .get(
        `https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${value}`,
        {
          headers: {
            token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
          },
        }
      )
      .then((response) => {
        setWards(response.data.data);
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        console.log(err);
      });
  };

  const onFinish = async () => {
    for (let key in accountScan) {
      if (typeof accountScan[key] === "string") {
        handleSetAccountScan(key, accountScan[key].trim());
      }
    }
    let check = isFormInputEmpty(accountScan);
    if (!check) {
      if (isEmailCorrectFormat(accountScan.email)) {
        notification.error({
          message: "Thông báo",
          description: "Email nhập không đúng định dạng!",
        });
      } else if (isValidPhoneNumber(accountScan.numberPhone)) {
        notification.error({
          message: "Thông báo",
          description: "Số điện thoại nhập không đúng định dạng!",
        });
      } else {
        Modal.confirm({
          title: "Xác nhận thêm mới",
          content: "Bạn có chắc chắn muốn Thêm mới không?",
          okText: "Thêm mới",
          cancelText: "Hủy bỏ",
          onOk: () => {
            const currentTimeInMillis = new Date().getTime();
            const imgRef = ref(
              saveImage,
              `accounts/${Number(roleId) === 1 ? "employees" : "customers"}/${currentTimeInMillis + "_" + accountScan.numberPhone
              }`
            );
            uploadBytes(imgRef, imageFile)
              .then(() => {
                return getDownloadURL(imgRef);
              })
              .then((url) => {
                accountScan.image = url;
              })
              .then(() => {
                // Gửi yêu cầu POST đến API
                axios
                  .post(
                    "http://localhost:8080/api/admin/account/create",
                    accountScan,
                    {
                      headers: {
                        Authorization: `Bearer ${getToken(true)}`,
                      },
                    }
                  )
                  .then((res) => {
                    notification.open({
                      message: "Thông báo",
                      description: `Thêm mới ${Number(roleId) === 1 ? "nhân viên" : "khách hàng"
                        } thành công`,
                      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
                    });
                    setLoading(false);
                    navigate(
                      `/api/admin/${Number(roleId) === 1 ? "employee" : "customer"
                      }`
                    );
                  })
                  .catch((err) => {
                    setLoading(false);
                    const status = err.response.status;
                    if (status === 400) {
                      notification.error({
                        message: "Thông báo",
                        description: `${err.response.data}`,
                      });
                    } else if (status === 403) {
                      notification.error({
                        message: "Thông báo",
                        description: "Bạn không có quyền truy cập!",
                      });
                    }
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
                console.log(err);
              });
            setLoading(true);
          },
        });
      }
    } else {
      notification.open({
        type: "error",
        message: "Thông báo",
        description: `Vui lòng nhập hết các trường`,
      });
    }

    // Xử lý khi gửi form thành công
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
          {
            headers: {
              "Content-Type": "application/json",
              token: "0f082cbe-5110-11ee-a59f-a260851ba65c",
            },
          }
        );
        const provincesData = response.data.data;
        setProvinces(provincesData);
      } catch (error) {
        console.error(error);
      }
    };
    return () => fetchProvinces();
  }, [render]);

  return (
    <Spin
      tip="Loading..."
      spinning={loading}
      size="large"
      style={{ width: "100%" }}
    >
      <div className={styles.container}>
        <Col span={20} offset={2}>
          <Row style={{ margin: "25px 0" }}>
            <Col span={8}>
              <h2>
                Thông tin {Number(roleId) === 1 ? "nhân viên" : "khách hàng"}
              </h2>
            </Col>
            <Col span={13}>
              <h2>Thông tin chi tiết</h2>
            </Col>
            {roleId === 1 ? (
              <>
                <QRReader
                  visible={visible}
                  setData={handleScan}
                  onCancel={handleCancel}
                />
                <Col span={3}>
                  <div className="m-5">
                    <Button type="primary" size="large" onClick={showModal}>
                      <QrcodeOutlined style={{ fontSize: "20px" }} />
                    </Button>
                  </div>
                </Col>
              </>
            ) : null}
          </Row>
        </Col>
        <Col span={20} offset={2}>
          <Row>
            <Col span={8}>
              <div className={styles.formContainer}>
                <div>
                  <Upload
                    name="avatar"
                    showUploadList={false}
                    beforeUpload={handleUpload}
                  >
                    <Tooltip placement="left" title={"click to upload avatar"}>
                      <Avatar
                        className={styles.avatarContainer}
                        size={160}
                        src={
                          imageUrl ||
                          "https://img.freepik.com/premium-vector/camera-with-plus-sign-icon_625445-191.jpg?w=2000"
                        }
                      />
                    </Tooltip>
                  </Upload>
                </div>
              </div>
            </Col>
            <Col span={16}>
              <Row style={{ paddingBottom: "16px" }}>
                <Col span={12}>
                  <div className="m-5">
                    <h6>
                      Mã định danh{" "}
                      {roleId === 1 ? (
                        <span style={{ color: "red" }}>*</span>
                      ) : (
                        ""
                      )}
                    </h6>
                    <Input
                      value={accountScan.idNo}
                      onChange={(event) => {
                        handleSetAccountScan(
                          "idNo",
                          event.target.value.replace(/[^\d]/g, "")
                        );
                      }}
                      onBlur={(event) => {
                        if (
                          event.target.value.length !== 12 &&
                          event.target.value.trim().length !== 0 &&
                          roleId === 1
                        ) {
                          notification.error({
                            message: "Thông báo",
                            description: "Mã định danh phải là 12 số",
                          });
                        } else
                          handleSetAccountScan(
                            "idNo",
                            event.target.value.trim().length === 0 &&
                              roleId === 2
                              ? "empty"
                              : event.target.value.trim()
                          );
                      }}
                      status={accountScan.idNo === "" ? "error" : ""}
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="m-5">
                    <h6>
                      Giới Tính <span style={{ color: "red" }}>*</span>
                    </h6>
                    <Radio.Group
                      value={accountScan.gender}
                      onChange={(event) =>
                        handleSetAccountScan("gender", event.target.value)
                      }
                    >
                      <Radio value={true}>Nam</Radio>
                      <Radio value={false}>Nữ</Radio>
                    </Radio.Group>
                  </div>
                </Col>
              </Row>

              <Row style={{ paddingBottom: "16px" }}>
                <Col span={12}>
                  <div className="m-5">
                    <h6>
                      Ngày sinh <span style={{ color: "red" }}>*</span>
                    </h6>
                    <DatePicker
                      value={
                        accountScan.dob === " " ||
                          accountScan.dob === "" ||
                          accountScan.dob === null
                          ? null
                          : dayjs(accountScan.dob)
                      }
                      style={{ width: "100%" }}
                      onChange={(event, eventString) => {
                        var currenYear = new Date().getFullYear();
                        if (event !== null) {
                          if (currenYear - event?.toDate().getFullYear() < 16) {
                            notification.error({
                              message: "Thông báo",
                              description: `${roleId === 1
                                ? "Nhân viên phải trên 16 tuổi"
                                : "Khách hàng phải trên 16 tuổi"
                                }`,
                            });
                            return;
                          }
                        }
                        handleSetAccountScan("dob", eventString);
                      }}
                      onBlur={(event) => {
                        handleSetAccountScan(
                          "dob",
                          event.target.value === "" ? null : event.target.value
                        );
                      }}
                      status={
                        accountScan.dob === null || accountScan.dob === ""
                          ? "error"
                          : ""
                      }
                    />
                  </div>
                </Col>
                <Col span={12}>
                  <div className="m-5">
                    <h6>
                      Email <span style={{ color: "red" }}>*</span>
                    </h6>
                    <Input
                      value={accountScan.email}
                      onChange={(event) =>
                        handleSetAccountScan("email", event.target.value.trim())
                      }
                      onBlur={(event) =>
                        handleSetAccountScan("email", event.target.value.trim())
                      }
                      required={true}
                      status={accountScan.email === "" ? "error" : ""}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row style={{ paddingBottom: "16px" }}>
                <Col span={8}>
                  <div className="m-5">
                    <h6>
                      Họ và tên <span style={{ color: "red" }}>*</span>
                    </h6>
                    <Input
                      value={accountScan.fullName}
                      onChange={(event) =>
                        handleSetAccountScan("fullName", event.target.value)
                      }
                      onBlur={(event) =>
                        handleSetAccountScan(
                          "fullName",
                          event.target.value.trim()
                        )
                      }
                      status={accountScan.fullName === "" ? "error" : ""}
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <div className="m-5">
                    <h6>
                      Số điện thoại <span style={{ color: "red" }}>*</span>
                    </h6>
                    <Input
                      value={accountScan.numberPhone}
                      onChange={(event) =>
                        handleSetAccountScan(
                          "numberPhone",
                          event.target.value.trim().replace(/[^\d]/g, "")
                        )
                      }
                      onBlur={(event) => {
                        if (
                          (!event.target.value.trim().startsWith(0) ||
                            event.target.value.trim().length !== 10) &&
                          event.target.value.trim().length !== 0
                        ) {
                          notification.error({
                            message: "Thông báo",
                            description: `Số điện thoại phải bắt đầu từ 0 và có 10 số!`,
                          });
                          return;
                        }
                        handleSetAccountScan(
                          "numberPhone",
                          event.target.value.trim()
                        );
                      }}
                      status={accountScan.numberPhone === "" ? "error" : ""}
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <div className="m-5">
                    <h6>
                      Địa chỉ chi tiết{" "}
                      {roleId === 1 ? (
                        <span style={{ color: "red" }}>*</span>
                      ) : (
                        ""
                      )}
                    </h6>
                    <Input
                      onBlur={(event) =>
                        handleSetAccountScan(
                          "descriptionDetail",
                          event.target.value.trim().length === 0 && roleId === 2
                            ? "empty"
                            : event.target.value.trim()
                        )
                      }
                      status={
                        accountScan.descriptionDetail === "" ? "error" : ""
                      }
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row style={{ paddingBottom: "16px" }}>
                <Col span={8}>
                  <div className="m-5">
                    <h6>
                      Tỉnh/Thành phố{" "}
                      {roleId === 1 ? (
                        <span style={{ color: "red" }}>*</span>
                      ) : (
                        ""
                      )}
                    </h6>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      size="medium"
                      onChange={(event) => {
                        fetchDistricts(event.substring(event.indexOf("|") + 1));
                        handleSetAccountScan("city", event);
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
                      status={accountScan.city === "" ? "error" : ""}
                    >
                      {provinces &&
                        provinces.map((province) => (
                          <Select.Option
                            key={province.ProvinceID}
                            value={
                              province.ProvinceName + "|" + province.ProvinceID
                            }
                            label={province.ProvinceName}
                          >
                            {province.ProvinceName}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="m-5">
                    <h6>
                      Quận/huyện{" "}
                      {roleId === 1 ? (
                        <span style={{ color: "red" }}>*</span>
                      ) : (
                        ""
                      )}
                    </h6>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      size="medium"
                      onChange={(event) => {
                        fetchWard(event.substring(event.indexOf("|") + 1));
                        handleSetAccountScan("district", event);
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
                      status={accountScan.district === "" ? "error" : ""}
                    >
                      {districts &&
                        districts.map((district) => (
                          <Select.Option
                            label={district.DistrictName}
                            key={district.DistrictID}
                            value={
                              district.DistrictName + "|" + district.DistrictID
                            }
                          >
                            {district.DistrictName}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>
                </Col>
                <Col span={8}>
                  <div className="m-5">
                    <h6>
                      Xã/Phường/Thị trấn{" "}
                      {roleId === 1 ? (
                        <span style={{ color: "red" }}>*</span>
                      ) : (
                        ""
                      )}
                    </h6>
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      size="medium"
                      onChange={(event) => {
                        handleSetAccountScan("ward", event);
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
                      status={accountScan.ward === "" ? "error" : ""}
                    >
                      {wards &&
                        wards.map((ward) => (
                          <Select.Option
                            label={ward.WardName}
                            key={ward.WardCode}
                            value={ward.WardName + "|" + ward.WardCode}
                          >
                            {ward.WardName}
                          </Select.Option>
                        ))}
                    </Select>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>

        <div className={styles.create} style={{ paddingBottom: "16px" }}>
          <Button type="primary" onClick={onFinish}>
            Xác Nhận
          </Button>
        </div>
      </div>
    </Spin>
  );
};

export default MyForm;
