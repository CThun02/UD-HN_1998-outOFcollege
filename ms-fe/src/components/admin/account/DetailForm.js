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
import { useParams } from "react-router-dom";
import moment from "moment/moment";
const { Option } = Select;
const { Panel } = Collapse;
const DetailForm = (props) => {
  var roleId = props.roleId;
  const [data, setData] = useState({
    username: "",
    fullName: "",
    dob: "",
    gender: "",
    numberPhone: "",
    email: "",
    idNo: "",
    roleId: roleId,
  });

  const [imageUrl, setImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const { username } = useParams();
  const [updatedData, setUpdatedData] = useState({});

  const { Panel } = Collapse;
  const handlePanelChange = (key) => {
    console.log("Expanded panel keys:", key);
  };
  console.log("đây là ", data.fullName);
  const handleUpload = (file) => {
    // Xử lý file ảnh tải lên và set state imageUrl
    // Thực hiện mã xử lý tải lên của bạn ở đây
    setImageFile(file);
    // Giả sử server trả về URL của ảnh đã tải lên
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
  };

  useEffect(() => {
    fetchCustomerData();
  }, [username]);
  const fetchCustomerData = async () => {
    axios
      .get(`http://localhost:8080/api/admin/account/detail/${username}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
    console.log(data);
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

  const handleChange = (propertyName, value) => {
    setData((prevData) => ({
      ...prevData,
      [propertyName]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/account/update/${data.username}`,
        data
      );
      console.log("Dữ liệu đã được cập nhật thành công!");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      <Row style={{ marginBottom: "25px" }}>
        <Col span={8}>
          <h2>Thông tin {Number(roleId) === 1 ? "nhân viên" : "khách hàng"}</h2>
        </Col>
        <Col span={16}>
          <h2>Thông tin địa chỉ</h2>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form initialValues={data}>
            <Col span={24}>
              <Form.Item className={styles.formContainer}>
                <Space wrap size={16}>
                  <div className={styles.avatarContainer}>
                    <Avatar
                      size={200}
                      src={data.image}
                      icon={<UserOutlined />}
                    />
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

                <Input type="text" name="username" value={data.username} />
              </div>
            </Col>
            <Col span={24}>
              <div className={styles.email}>
                <span>Mã định danh</span>

                <Input type="text" name="idNo" value={data.idNo} />
              </div>
            </Col>
            <Col span={24}>
              <div className={styles.email}>
                <span>Tên nhân viên</span>

                <Input
                  value={data.fullName}
                  onChange={(event) => {
                    handleChange("fullName", event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={24}>
              <div className={styles.email}>
                <span>Ngày sinh</span>

                <DatePicker
                  style={{ width: "100%" }}
                  value={moment(data.dob, "YYYY-MM-DD")}
                  onChange={(event) => {
                    handleChange("dob", event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={24}>
              <div className={styles.email}>
                <span>Giới Tính</span>

                <Radio.Group
                  value={data.gender}
                  onChange={(event) => {
                    handleChange("gender", event.target.value);
                  }}
                >
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Col span={24}>
              <div className={styles.email}>
                <span>Email</span>
                <Input
                  value={data.email}
                  onChange={(event) => {
                    handleChange("emailr", event.target.value);
                  }}
                />
              </div>
            </Col>
            <Col span={24}>
              <div className={styles.sdt}>
                <span>Số điện thoại</span>

                <Input
                  value={data.numberPhone}
                  onChange={(event) => {
                    handleChange("numberPhone", event.target.value);
                  }}
                />
              </div>
            </Col>

            <Button
              className={styles.sdt1}
              type="primary"
              onClick={handleUpdate}
            >
              Cập nhật
            </Button>
          </Form>
        </Col>
        <Col span={16}>
          <Collapse onChange={handlePanelChange} defaultActiveKey={["1"]}>
            <Panel header="Địa Chỉ" key="1">
              <Form className={styles.form1}>
                <Row>
                  <Col span={12}>
                    <div className={styles.ten1}>
                      <span>Tên nhân viên</span>

                      <Input value={data.fullName} />
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className={styles.ten1}>
                      <span>Số điện thoại</span>

                      <Input value={data.numberPhone} />
                    </div>
                  </Col>
                </Row>
                <Col span={24}>
                  <div className={styles.email}>
                    <span>Địa chỉ chi tiết</span>

                    <Input value={data.descriptionDetail} />
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
                    <div className={styles.quan}>
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
                    <div className={styles.ten1}>
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
