import React, { useState, useEffect } from "react";
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
  Collapse,
} from "antd";
import { UserOutlined, FormOutlined } from "@ant-design/icons";
const { Option } = Select;
const { Panel } = Collapse;
const DetailForm = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);

  const { Panel } = Collapse;
  const handlePanelChange = (key) => {
    console.log("Expanded panel keys:", key);
  };

  const handleUpload = (file) => {
    // Xử lý file ảnh tải lên và set state imageUrl
    // Thực hiện mã xử lý tải lên của bạn ở đây
    setImageFile(file);
    // Giả sử server trả về URL của ảnh đã tải lên
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  return (
    <div className={styles.container}>
      <Row style={{ marginBottom: "25px" }}>
        <Col span={8}>
          <h2>Thông tin nhân viên</h2>
        </Col>
        <Col span={16}>
          <h2>Thông tin địa chỉ</h2>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Col span={24}>
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
          <Col span={24}>
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
                // initialValue={initialValues.username}
              >
                <Input />
              </Form.Item>
            </div>
          </Col>
          <Col span={24}>
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
          <Col span={24}>
            <div className={styles.email}>
              <span>Tên nhân viên</span>
              <Form.Item
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên nhân viên",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </Col>
          <Col span={24}>
            <div className={styles.email}>
              <span>Ngày sinh</span>
              <Form.Item
                name="dob"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>
          </Col>
          <Col span={24}>
            <div>
              <span>Giới Tính</span>
              <Form.Item
                name="gender"
                rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
              >
                <Radio.Group>
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </Col>
          <Col span={24}>
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
          <Col span={24}>
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
          <Form.Item className={styles.create}>
            <Button type="primary">Cập nhật</Button>
          </Form.Item>
        </Col>
        <Col span={16}>
          <Collapse onChange={handlePanelChange} defaultActiveKey={["1"]}>
            <Panel header="Địa Chỉ" key="1">
              <Form>
                <Row>
                  <Col span={12}>
                    <div className={styles.email}>
                      <span>Tên nhân viên</span>
                      <Form.Item
                        name="fullName"
                        rules={[
                          {
                            required: true,
                            message: "Vui lòng nhập tên nhân viên",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={12}>
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
                </Row>
                <Col span={24}>
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
                <Row>
                  <Col span={8}>
                    <div className={styles.thanhpho}>
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
                        <Select showSearch>
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
                      </Form.Item>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className={styles.quan}>
                      <span>Quận/huyện</span>
                      <Form.Item
                        name="district"
                        rules={[
                          { required: true, message: "Vui lòng chọn quận" },
                        ]}
                      >
                        <Select>
                          {districts.map((district) => (
                            <Select.Option
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
                        <Select>
                          <Option value="ward1">Phường 1</Option>
                          <Option value="ward2">Phường 2</Option>
                          {/* Thêm các tùy chọn cho phường khác */}
                        </Select>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>

                <Button
                  type="primary"
                  className={styles.formContainer}
                  icon={<FormOutlined />}
                ></Button>
              </Form>
            </Panel>
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default DetailForm;
