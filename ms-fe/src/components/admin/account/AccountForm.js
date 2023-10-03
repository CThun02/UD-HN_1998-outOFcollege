import React, { useEffect, useState } from "react";
import styles from "./AccountForm.module.css";

import axios from "axios";
import {
  Row,
  Col,
  Space,
  Avatar,
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  Button,
  Upload,
  message,
  notification,
} from "antd";
import { CheckCircleTwoTone, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { saveImage } from "../../../config/FireBase";

// Nhập ảnh mã QR
const { Option } = Select;
const MyForm = (props) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  let roleId = props.roleId;

  const handleUpload = (file) => {
    // Xử lý file ảnh tải lên và set state imageUrl
    // Thực hiện mã xử lý tải lên của bạn ở đây
    setImageFile(file);
    // Giả sử server trả về URL của ảnh đã tải lên
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
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
        console.log(response);
        setProvinces(provincesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProvinces();
  }, []);

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

  const onFinish = async (values) => {
    values.idRole = roleId;

    const currentTimeInMillis = new Date().getTime();
    const imgRef = ref(
      saveImage,
      `accounts/${Number(roleId) === 1 ? "employees" : "customers"}/${
        currentTimeInMillis + values.username
      }`
    );

    uploadBytes(imgRef, imageFile)
      .then(() => {
        return getDownloadURL(imgRef);
      })
      .then((url) => {
        console.log("Đường dẫn tham chiếu:", url);
        values.image = url; // Lưu đường dẫn vào biến values.image
      })
      .catch((error) => {
        console.error("Lỗi khi tải lên ảnh:", error);
      });
    values.image = `/accounts/employees/${
      currentTimeInMillis + values.username
    }`;
    // Xử lý khi gửi form thành công
    try {
      // Gửi yêu cầu POST đến API
      const response = await axios.post(
        "http://localhost:8080/api/admin/account/create",
        values
      );
      console.log(response.data); // Đây là phản hồi từ API
      messageApi.loading("loading", 2);
      setTimeout(() => {
        notification.open({
          message: "Notification",
          description: `Thêm mới ${
            Number(roleId) === 1 ? "nhân viên" : "khách hàng"
          } thành công`,
          icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
        });
        navigate("/admin/employee");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <Form onFinish={onFinish}>
        <Row style={{ marginBottom: "25px" }}>
          <Col span={8}>
            <h2>
              Thông tin {Number(roleId) === 1 ? "nhân viên" : "khách hàng"}
            </h2>
          </Col>
          <Col span={16}>
            <h2>Thông tin chi tiết</h2>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item className={styles.formContainer}>
              <Space wrap size={16}>
                <div className={styles.avatarContainer}>
                  <Avatar size={200} src={imageUrl} icon={<UserOutlined />} />
                </div>
                <Upload
                  name="avatar"
                  showUploadList={false}
                  beforeUpload={handleUpload}
                >
                  <Button>+</Button>
                </Upload>
              </Space>
            </Form.Item>
          </Col>
          <Col span={16} style={{ marginTop: "20px" }}>
            <Row>
              <Col span={12}>
                <div className={styles.email}>
                  <span>Mã định danh</span>
                  <Form.Item
                    name="idNo"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mã định danh",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>

              <Col span={12}>
                <div>
                  <span>Giới Tính</span>
                  <Form.Item
                    name="gender"
                    rules={[
                      { required: true, message: "Vui lòng chọn giới tính" },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value={true}>Nam</Radio>
                      <Radio value={false}>Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <div className={styles.email}>
                  <span>Ngày sinh</span>
                  <Form.Item
                    name="dob"
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày sinh" },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.email}>
                  <span>Email</span>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email" },
                      { type: "email", message: "Email không hợp lệ" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={8}>
                <div className={styles.email}>
                  <span>Username</span>
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập username",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.sdt}>
                  <span>Số điện thoại</span>
                  <Form.Item
                    name="numberPhone"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.email}>
                  <span>Địa chỉ chi tiết</span>
                  <Form.Item
                    name="descriptionDetail"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập địa chỉ chi tiết",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Row>
              <Col span={8}>
                <div className={styles.email}>
                  <span> Tên Nhân Viên</span>
                  <Form.Item
                    name="fullName"
                    rules={[
                      { required: true, message: "Vui lòng nhập Họ và Tên" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>
              <Col span={16}>
                <Row>
                  <Col span={8}>
                    <div className={styles.email}>
                      <span>Tỉnh/Thành phố</span>
                      <Form.Item
                        name="city"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng chọn thành phố",
                          },
                        ]}
                      >
                        <Select
                          showSearch
                          onChange={fetchDistricts}
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
                        >
                          {provinces.map((province) => (
                            <Select.Option
                              key={province.ProvinceID}
                              value={province.ProvinceID}
                              label={province.ProvinceName}
                            >
                              {province.ProvinceName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.email}>
                      <span>Quận/huyện</span>
                      <Form.Item
                        name="district"
                        rules={[
                          { required: true, message: "Vui lòng chọn quận" },
                        ]}
                      >
                        <Select
                          showSearch
                          onChange={fetchWard}
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
                        >
                          {districts.map((district) => (
                            <Select.Option
                              label={district.DistrictName}
                              key={district.DistrictID}
                              value={district.DistrictID}
                            >
                              {district.DistrictName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.email}>
                      <span>Xã/Phường/Thị trấn</span>
                      <Form.Item
                        name="ward"
                        rules={[
                          { required: true, message: "Vui lòng chọn phường" },
                        ]}
                      >
                        <Select
                          showSearch
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
                        >
                          {wards.map((ward) => (
                            <Select.Option
                              label={ward.WardName}
                              key={ward.WardCode}
                              value={ward.WardCode}
                            >
                              {ward.WardName}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>

        <Form.Item className={styles.create}>
          <Button type="primary" htmlType="submit">
            Xác Nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyForm;
