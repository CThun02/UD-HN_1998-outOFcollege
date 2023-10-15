import React, { useState, useEffect } from "react";
import styles from "./AccountForm.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
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
  Collapse,
  message,
  notification,
  Modal,
  Tooltip,
  Switch,
} from "antd";
import { FormOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { useParams } from "react-router-dom";
const DetailForm = (props) => {
  const navigate = useNavigate();
  var roleId = props.roleId;
  const [data, setData] = useState({
    username: "",
    fullName: "",
    image: "",
    dob: "",
    gender: "",
    numberPhone: "",
    email: "",
    idNo: "",
    roleId: roleId,
  });

  const [messageApi, contextHolder] = message.useMessage();
  const [imageFile, setImageFile] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const { username } = useParams();
  const [address, setAddress] = useState([]);
  const { Panel } = Collapse;
  const handlePanelChange = (key) => {
    console.log("Expanded panel keys:", key);
  };
  const handleSetAccount = (field, value) => {
    setData((account) => ({
      ...account,
      [field]: value,
    }));
  };
  const handleUpload = (file) => {
    // Xử lý file ảnh tải lên và set state imageUrl
    // Thực hiện mã xử lý tải lên của bạn ở đây
    setImageFile(file);
    // Giả sử server trả về URL của ảnh đã tải lên
    const imageUrl = URL.createObjectURL(file);
    handleSetAccount("image", imageUrl);
  };

  const fetchCustomerData = async () => {
    axios
      .get(`http://localhost:8080/api/admin/account/detail/${username}`)
      .then((response) => {
        setData(response.data);
        setAddress(response.data.accountAddress);
      })
      .catch((err) => console.log(err));
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
    console.log("loop");
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
    // Hiển thị Modal xác nhận
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật không?",
      okText: "Cập nhật",
      cancelText: "Hủy bỏ",
      onOk: async () => {
        try {
          await axios.put(
            `http://localhost:8080/api/admin/account/update/${data.username}`,
            data
          );
          messageApi.loading("loading", 2);
          setTimeout(() => {
            notification.open({
              message: "Notification",
              description: `Cập nhật ${
                Number(roleId) === 1 ? "nhân viên" : "khách hàng"
              } thành công`,
              icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            });
          }, 2000);
        } catch (error) {
          console.error(error);
        }
      },
      onCancel: () => {
        // Hủy bỏ cập nhật
      },
    });
  };
  useEffect(() => {
    fetchCustomerData();
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
  }, []);
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
          <Col span={24} style={{ textAlign: "center" }}>
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
                    data.image === "none" ||
                    data.image === "" ||
                    data.image === null ||
                    data.image === undefined
                      ? "https://img.freepik.com/premium-vector/camera-with-plus-sign-icon_625445-191.jpg?w=2000"
                      : data.image
                  }
                />
              </Tooltip>
            </Upload>
          </Col>
          <Col span={24}>
            <div className="m-5">
              <span>Username</span>
              <Input type="text" name="username" value={data.username} />
            </div>
          </Col>
          <Col span={24}>
            <div className="m-5">
              <span>Mã định danh</span>
              <Input type="text" name="idNo" value={data.idNo} />
            </div>
          </Col>
          <Col span={24}>
            <div className="m-5">
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
            <div className="m-5">
              <span>Ngày sinh</span>
              <DatePicker
                style={{ width: "100%" }}
                value={dayjs(data.dob)}
                onChange={(event) => {
                  handleChange("dob", event);
                }}
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="m-5">
              <span>Giới Tính: </span>
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
            <div className="m-5">
              <span>Email</span>
              <Input
                value={data.email}
                onChange={(event) => {
                  handleChange("email", event.target.value);
                }}
              />
            </div>
          </Col>
          <Col span={24}>
            <div className="m-5">
              <span>Số điện thoại</span>
              <Input
                value={data.numberPhone}
                onChange={(event) => {
                  handleChange("numberPhone", event.target.value);
                }}
              />
            </div>
          </Col>

          <Button className="m-5" type="primary" onClick={handleUpdate}>
            Cập nhật
          </Button>
        </Col>
        <Col span={16}>
          <Collapse
            className="m-5"
            onChange={handlePanelChange}
            defaultActiveKey={[0]}
          >
            {address &&
              address.map((item, index) => {
                return (
                  <Panel
                    header={
                      <h5>
                        {data.fullName +
                          ": " +
                          item.ward +
                          ", " +
                          item.district +
                          ", " +
                          item.city}
                      </h5>
                    }
                    key={index}
                  >
                    <Switch defaultChecked={index === 0} />
                    <Col span={24}>
                      <div className="m-5">
                        <h6>Địa chỉ chi tiết</h6>
                        <Input defaultValue={item.descriptionDetail} />
                      </div>
                    </Col>
                    <Col span={24}>
                      <Row>
                        <Col span={8}>
                          <div className="m-5">
                            <h6>Tỉnh/Thành phố</h6>
                            <Select
                              defaultValue={item.city}
                              showSearch
                              style={{ width: "100%" }}
                              size="medium"
                              onChange={(event) => {
                                fetchDistricts(
                                  event.substring(event.indexOf("|") + 1)
                                );
                              }}
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
                              defaultValue={item.district}
                              showSearch
                              style={{ width: "100%" }}
                              size="medium"
                              onChange={(event) => {
                                fetchWard(
                                  event.substring(event.indexOf("|") + 1)
                                );
                              }}
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
                              defaultValue={item.ward}
                              showSearch
                              style={{ width: "100%" }}
                              size="medium"
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
                              {wards &&
                                wards.map((ward) => (
                                  <Select.Option
                                    label={ward.WardName}
                                    key={ward.WardCode}
                                    value={ward.WardName}
                                  >
                                    {ward.WardName}
                                  </Select.Option>
                                ))}
                            </Select>
                          </div>
                        </Col>
                      </Row>
                    </Col>

                    <div className="m-5">
                      <Button type="primary">
                        <FormOutlined /> Xác nhận
                      </Button>
                    </div>
                  </Panel>
                );
              })}
          </Collapse>
        </Col>
      </Row>
    </div>
  );
};

export default DetailForm;
