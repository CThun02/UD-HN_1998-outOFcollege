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
  message,
  notification,
  Tooltip,
  Modal,
} from "antd";
import { CheckCircleTwoTone, ScanOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { saveImage } from "../../../config/FireBase";
import QRScanner from "./QRScanner";
import { isFormInputEmpty } from "../product/ValidateForm";
import dayjs from "dayjs";
// Nhập ảnh mã QR
const MyForm = (props) => {
  const navigate = useNavigate();
  let roleId = props.roleId;
  const [messageApi, contextHolder] = message.useMessage();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [visible, setVisible] = useState(false);
  const [accountScan, setAccountScan] = useState({
    idNo: " ",
    username: " ",
    image: "none",
    fullName: " ",
    email: " ",
    numberPhone: " ",
    city: " ",
    district: " ",
    ward: " ",
    password: "12345",
    descriptionDetail: " ",
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
        console.error(error);
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
        .catch((error) => {
          console.log(error);
        });
    };

  const onFinish = async () => {
    let check = isFormInputEmpty(accountScan);
    messageApi.loading("loading", 2);
    if (!check) {
      const currentTimeInMillis = new Date().getTime();
      const imgRef = ref(
        saveImage,
        `accounts/${Number(roleId) === 1 ? "employees" : "customers"}/${
          currentTimeInMillis + accountScan.username
        }`
      );
      let accountAdd = { ...accountScan };
      for (let key in accountAdd) {
        if (typeof accountAdd[key] === "string") {
          accountAdd[key] = accountAdd[key].trim();
        }
      }
      uploadBytes(imgRef, imageFile)
        .then(() => {
          return getDownloadURL(imgRef);
        })
        .then((url) => {
          console.log("Đường dẫn tham chiếu:", url);
          accountAdd.image = url;
        })
        .then(() => {
          try {
            // Gửi yêu cầu POST đến API
            const response = axios.post(
              "http://localhost:8080/api/admin/account/create",
              accountAdd
            );
            setTimeout(() => {
              notification.open({
                message: "Notification",
                description: `Thêm mới ${
                  Number(roleId) === 1 ? "nhân viên" : "khách hàng"
                } thành công`,
                icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
              });
              navigate(
                `/admin/${Number(roleId) === 1 ? "employee" : "customer"}`
              );
            }, 2000);
          } catch (error) {
            console.error(error);
          }
        })
        .catch((error) => {
          console.error("Lỗi khi tải lên ảnh:", error);
        });
    } else {
      setTimeout(() => {
        notification.open({
          type: "error",
          message: "Notification",
          description: `Vui lòng nhập hết cách trường`,
        });
      }, 2000);
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
    fetchProvinces();
  }, [render]);

  return (
    <div className={styles.container}>
      {contextHolder}
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
              <Modal open={visible} onCancel={handleCancel} footer={null}>
                <QRScanner onScan={handleScan} />
              </Modal>
              <Col span={3}>
                <div className="m-5">
                  <Button className={styles.btnQR} onClick={showModal}>
                    <ScanOutlined style={{ fontSize: 24 }} />
                    <span style={{ fontWeight: 500, marginLeft: 12 }}>
                      {" "}
                      Quét QR
                    </span>
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
                  <h6>Mã định danh</h6>
                  <Input
                    value={accountScan.idNo}
                    onChange={(event) =>
                      handleSetAccountScan("idNo", event.target.value)
                    }
                    status={accountScan.idNo === "" ? "error" : ""}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="m-5">
                  <h6>Giới Tính</h6>
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
                  <h6>Ngày sinh</h6>
                  <DatePicker
                    value={
                      accountScan.dob === "" || accountScan.dob === " "
                        ? null
                        : dayjs(accountScan.dob)
                    }
                    style={{ width: "100%" }}
                    onChange={(event) => {
                      handleSetAccountScan("dob", event === null ? "" : event);
                    }}
                    status={
                      accountScan.dob === "" || accountScan.dob === null
                        ? "error"
                        : ""
                    }
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className="m-5">
                  <h6>Email</h6>
                  <Input
                    value={accountScan.email}
                    onChange={(event) =>
                      handleSetAccountScan("email", event.target.value)
                    }
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
                  <h6>Tên tài khoản</h6>
                  <Input
                    value={accountScan.username}
                    onChange={(event) =>
                      handleSetAccountScan("username", event.target.value)
                    }
                    status={accountScan.username === "" ? "error" : ""}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Số điện thoại</h6>
                  <Input
                    value={accountScan.numberPhone}
                    onChange={(event) =>
                      handleSetAccountScan("numberPhone", event.target.value)
                    }
                    status={accountScan.numberPhone === "" ? "error" : ""}
                  />
                </div>
              </Col>
              <Col span={8}>
                <div className="m-5">
                  <h6>Địa chỉ chi tiết</h6>
                  <Input
                    value={accountScan.descriptionDetail}
                    onChange={(event) =>
                      handleSetAccountScan(
                        "descriptionDetail",
                        event.target.value
                      )
                    }
                    status={accountScan.descriptionDetail === "" ? "error" : ""}
                  />
                </div>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Row style={{ paddingBottom: "16px" }}>
              <Col span={8}>
                <div className="m-5">
                  <h6> Tên Nhân Viên</h6>
                  <Input
                    value={accountScan.fullName}
                    onChange={(event) =>
                      handleSetAccountScan("fullName", event.target.value)
                    }
                    status={accountScan.fullName === "" ? "error" : ""}
                  />
                </div>
              </Col>
              <Col span={16}>
                <Row>
                  <Col span={8}>
                    <div className="m-5">
                      <h6>Tỉnh/Thành phố</h6>
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        size="medium"
                        onChange={(event) => {
                          fetchDistricts(
                            event.substring(event.indexOf("|") + 1)
                          );
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
                                province.ProvinceName +
                                "|" +
                                province.ProvinceID
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
                      <h6>Quận/huyện</h6>
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
                                district.DistrictName +
                                "|" +
                                district.DistrictID
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
                      <h6>Xã/Phường/Thị trấn</h6>
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
        </Row>
      </Col>

      <div className={styles.create} style={{ paddingBottom: "16px" }}>
        <Button type="primary" onClick={onFinish}>
          Xác Nhận
        </Button>
      </div>
    </div>
  );
};

export default MyForm;
