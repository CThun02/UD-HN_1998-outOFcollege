import React, { useState } from "react";
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

const { Option } = Select;

const MyForm = () => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

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
    <Form onFinish={onFinish}>
      <Row gutter={16}>
        <Col span={6}>
          <Form.Item>
            <Space wrap size={16}>
              <Avatar
                shape="square"
                size={64}
                src={imageUrl}
                icon={<UserOutlined />}
              />
              <Upload
                name="avatar"
                showUploadList={false}
                beforeUpload={handleUpload}
              >
                <Button>Tải ảnh</Button>
              </Upload>
            </Space>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Tên đầy đủ"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập tên đầy đủ" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
          >
            <Radio.Group>
              <Radio value="male">Nam</Radio>
              <Radio value="female">Nữ</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Số CMND"
            name="idCardNumber"
            rules={[{ required: true, message: "Vui lòng nhập số CMND" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Số điện thoại"
            name="phoneNumber"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Ngày sinh"
            name="birthday"
            rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
          >
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="Thành phố"
            name="city"
            rules={[{ required: true, message: "Vui lòng chọn thành phố" }]}
          >
            <Select>
              <Option value="hanoi">Hà Nội</Option>
              <Option value="hcm">TP.HCM</Option>
              {/* Thêm các tùy chọn cho thành phố khác */}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Quận"
            name="district"
            rules={[{ required: true, message: "Vui lòng chọn quận" }]}
          >
            <Select>
              <Option value="district1">Quận 1</Option>
              <Option value="district2">Quận 2</Option>
              {/* Thêm các tùy chọn cho quận khác */}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Phường"
            name="ward"
            rules={[{ required: true, message: "Vui lòng chọn phường" }]}
          >
            <Select>
              <Option value="ward1">Phường 1</Option>
              <Option value="ward2">Phường 2</Option>
              {/* Thêm các tùy chọn cho phường khác */}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Đường"
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
        <Col span={12}>
          <Form.Item
            label="Địa chỉ chi tiết"
            name="address"
            rules={[
              { required: true, message: "Vui lòng nhập địa chỉ chi tiết" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Gửi
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MyForm;
