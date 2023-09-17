import React, { useState } from "react";
import styles from "./AccountForm.module.css";
import qrcode from "./qrcode.png";
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
} from "antd";
import { UserOutlined } from "@ant-design/icons";
// Nhập ảnh mã QR

const { Option } = Select;

const MyForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [qrcodeImage, setQRCodeImage] = useState(qrcode);

  const handleUpload = (file) => {
    // Xử lý file ảnh tải lên và set state imageUrl
    // Thực hiện mã xử lý tải lên của bạn ở đây
    setImageFile(file);
    // Giả sử server trả về URL của ảnh đã tải lên
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  const onFinish = (values) => {
    // Xử lý khi gửi form thành công
    console.log(values);
  };

  return (
    <div className={styles.container}>
      <Form onFinish={onFinish}>
        <h2>Thêm tài khoản</h2>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item className={styles.formContainer}>
              <Space wrap size={16}>
                <Avatar
                  shape="square"
                  size={200}
                  src={imageUrl}
                  icon={<UserOutlined />}
                />
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
          {/* <Col span={8} offset={8}>
            <div className={styles.qrcodeContainer}>
              <img src={qrcodeImage} alt="Mã QR" className={styles.qrcode} />
            </div>
          </Col> */}
          <Col span={16}>
            <div>
              <span> Họ và Tên</span>
              <Form.Item
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập Họ và Tên" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <Row>
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
              <Col span={8}>
                <div>
                  <span>Giới Tính</span>
                  <Form.Item
                    name="gender"
                    rules={[
                      { required: true, message: "Vui lòng chọn giới tính" },
                    ]}
                  >
                    <Radio.Group>
                      <Radio value="male">Nam</Radio>
                      <Radio value="female">Nữ</Radio>
                    </Radio.Group>
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.sdt}>
                  <span>Số điện thoại</span>
                  <Form.Item
                    name="phoneNumber"
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
                  <span>Số CMND</span>
                  <Form.Item
                    name="idCardNumber"
                    rules={[
                      { required: true, message: "Vui lòng nhập số CMND" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Col>

              <Col span={8}>
                <div>
                  <span>Ngày sinh</span>
                  <Form.Item
                    name="birthday"
                    rules={[
                      { required: true, message: "Vui lòng chọn ngày sinh" },
                    ]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <Row>
              <Col span={8}>
                <div className={styles.thanhpho}>
                  <span>Thành phố</span>
                  <Form.Item
                    name="city"
                    rules={[
                      { required: true, message: "Vui lòng chọn thành phố" },
                    ]}
                  >
                    <Select>
                      <Option value="hanoi">Hà Nội</Option>
                      <Option value="hcm">TP.HCM</Option>
                      {/* Thêm các tùy chọn cho thành phố khác */}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div className={styles.quan}>
                  <span>Quận</span>
                  <Form.Item
                    name="district"
                    rules={[{ required: true, message: "Vui lòng chọn quận" }]}
                  >
                    <Select>
                      <Option value="district1">Quận 1</Option>
                      <Option value="district2">Quận 2</Option>
                      {/* Thêm các tùy chọn cho quận khác */}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <span>Phường</span>
                  <Form.Item
                    name="ward"
                    rules={[
                      { required: true, message: "Vui lòng chọn phường" },
                    ]}
                  >
                    <Select>
                      <Option value="ward1">Phường 1</Option>
                      <Option value="ward2">Phường 2</Option>
                      {/* Thêm các tùy chọn cho phường khác */}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
            </Row>
          </Col>

          <Col span={24}>
            <Row>
              <Col span={8}>
                <span>Đường</span>
                <Form.Item
                  className={styles.duong}
                  name="street"
                  rules={[{ required: true, message: "Vui lòng chọn đường" }]}
                >
                  <Select>
                    <Option value="street1">Đường 1</Option>
                    <Option value="street2">Đường 2</Option>
                    {/* Thêm các tùy chọn cho đường khác */}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={16}>
                <span>Địa chỉ chi tiết</span>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ chi tiết",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
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
