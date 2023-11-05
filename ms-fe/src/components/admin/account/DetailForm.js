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
  Pagination,
  Spin,
} from "antd";
import { FormOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
const DetailForm = (props) => {
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

  const [loadingUpdate, setLoadingUdpate] = useState(false);
  const [loadingUpdateADD, setLoadingUdpateADD] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [imageFile, setImageFile] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [wards, setWards] = useState([]);
  const { username } = useParams();
  const [address, setAddress] = useState([]);
  const { Panel } = Collapse;
  const handlePanelChange = (key) => {};
  const [panelIndex, setPanelIndex] = useState(0);
  const [currenIndex, setCurrenIndex] = useState(1);
  const [render, setRender] = useState(2);
  const [addressCreate, setAddressCreate] = useState({
    id: " ",
    fullName: " ",
    sdt: " ",
    email: " ",
    city: " ",
    district: " ",
    ward: " ",
    descriptionDetail: " ",
    defaultaddress: null,
    status: "ACTIVE",
  });
  const [addressUpdate, setAddressUpdate] = useState({
    id: " ",
    fullName: " ",
    sdt: " ",
    email: " ",
    city: " ",
    district: " ",
    ward: " ",
    descriptionDetail: " ",
    defaultaddress: null,
    status: "ACTIVE",
  });
  const handleSetAccount = (field, value) => {
    setData((account) => ({
      ...account,
      [field]: value,
    }));
  };
  const handleSetAddressUpdate = (field, value) => {
    setAddressUpdate((addressUpdate) => ({
      ...addressUpdate,
      [field]: value,
    }));
  };
  const handleSetAddressCreate = (field, value) => {
    setAddressCreate((addressCreate) => ({
      ...addressCreate,
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

  const handleChangePagePanel = (index) => {
    setPanelIndex(index - 1);
    setCurrenIndex(index);
    setAddressUpdate(address[index - 1]);
    document.getElementById(index - 1).classList.remove("d-none");
    for (let i = 0; i < address.length; i++) {
      if (i === index - 1) {
        continue;
      }
      document.getElementById(i).classList.add("d-none");
    }
  };

  const fetchCustomerData = async () => {
    axios
      .get(`http://localhost:8080/api/admin/account/detail/${username}`)
      .then((response) => {
        setData(response.data);
        setAddress(response.data.accountAddress);
        setAddressUpdate(response.data.accountAddress[0]);
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

  const handleSetAddressDefault = (id, value) => {
    if (!value) {
      notification.warning({
        message: "Thông báo",
        description: `Phải có ít nhất một địa chỉ mặc định`,
      });
    } else {
      setLoadingUdpateADD(true);
      for (let add of address) {
        if (Number(add.id) === Number(id)) {
          axios
            .put(
              "http://localhost:8080/api/admin/account/updateAddressDefault?id=" +
                add.id +
                "&value=" +
                true
            )
            .then(() => {
              notification.success({
                message: "Thông báo",
                description: `Đặt địa chỉ mặc định thành công`,
              });
            })
            .catch(() => {
              message.error("Lỗi khi đặt địa chỉ mặc định");
            });
        } else {
          axios
            .put(
              "http://localhost:8080/api/admin/account/updateAddressDefault?id=" +
                add.id +
                "&value=" +
                false
            )
            .catch(() => {
              console.log("Lỗi khi đặt địa chỉ mặc định");
            });
        }
      }
    }
    setRender(Math.random());
    setLoadingUdpateADD(false);
  };

  const handleUpdate = async () => {
    // Hiển thị Modal xác nhận
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật không?",
      okText: "Cập nhật",
      cancelText: "Hủy bỏ",
      onOk: async () => {
        setLoadingUdpate(true);
        try {
          await axios
            .put(
              `http://localhost:8080/api/admin/account/update/${data.username}`,
              data
            )
            .then(() => {
              setLoadingUdpate(false);
              notification.open({
                message: "Thông báo",
                description: `Cập nhật ${
                  Number(roleId) === 1 ? "nhân viên" : "khách hàng"
                } thành công`,
                icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
              });
            });
        } catch (error) {
          console.error(error);
        }
      },
      onCancel: () => {
        // Hủy bỏ cập nhật
      },
    });
  };

  const handleUpdateAdress = () => {
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật không?",
      okText: "Cập nhật",
      cancelText: "Hủy bỏ",
      onOk: async () => {
        setLoadingUdpateADD(true);
        axios
          .put(
            "http://localhost:8080/api/admin/account/updateAdress",
            addressUpdate
          )
          .then(() => {
            setLoadingUdpateADD(false);
            notification.open({
              message: "Thông báo",
              description: `Cập nhật địa chỉ ${
                Number(roleId) === 1 ? "nhân viên" : "khách hàng"
              } thành công`,
              icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            });
          })
          .catch(() => {
            messageApi.error("Chỉnh sửa địa chỉ Thất bại!", 2);
          });
      },
    });
  };

  const handleCreateAddress = () => {
    Modal.confirm({
      title: "Xác nhận cập nhật",
      content: "Bạn có chắc chắn muốn cập nhật không?",
      okText: "Cập nhật",
      cancelText: "Hủy bỏ",
      onOk: async () => {
        setLoadingUdpateADD(true);
        axios
          .put(
            "http://localhost:8080/api/admin/account/createAddress?userName=" +
              data.username,
            addressCreate
          )
          .then((res) => {
            setLoadingUdpateADD(false);
            setRender(Math.random());
            notification.open({
              message: "Thông báo",
              description: `Thêm mới địa chỉ ${
                Number(roleId) === 1 ? "nhân viên" : "khách hàng"
              } thành công`,
              icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
            });
          })
          .catch(() => {
            messageApi.error("Thêm mới địa chỉ Thất bại!", 2);
          });
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
  }, [render]);
  return (
    <div className={styles.container}>
      {contextHolder}
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
          <Spin
            tip="Loading..."
            spinning={loadingUpdate}
            size="large"
            style={{ width: "100%" }}
          >
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
                  allowClear={false}
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
          </Spin>
        </Col>
        <Col span={16}>
          <Spin
            tip="Loading..."
            spinning={loadingUpdateADD}
            size="large"
            style={{ width: "100%" }}
          >
            <Collapse
              className="m-5"
              activeKey={[panelIndex]}
              onChange={handlePanelChange}
              size="small"
            >
              {address &&
                address.map((item, index) => {
                  return (
                    <Panel
                      id={index}
                      className={index === panelIndex ? "" : "d-none"}
                      header={<h5>{item.fullName}</h5>}
                      key={index}
                    >
                      <Switch
                        checked={item.defaultaddress}
                        onChange={(event) => {
                          handleSetAddressDefault(item.id, event);
                        }}
                      />
                      <Row>
                        <Col span={8}>
                          <div className="m-5">
                            <h6>Họ và tên</h6>
                            <Input
                              defaultValue={item.fullName}
                              onChange={(event) => {
                                handleSetAddressUpdate(
                                  "fullName",
                                  event.target.value
                                );
                              }}
                            />
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="m-5">
                            <h6>Số điện thoại</h6>
                            <Input
                              defaultValue={item.sdt}
                              onChange={(event) => {
                                handleSetAddressUpdate(
                                  "sdt",
                                  event.target.value
                                );
                              }}
                            />
                          </div>
                        </Col>
                        <Col span={8}>
                          <div className="m-5">
                            <h6>Email</h6>
                            <Input
                              defaultValue={item.email}
                              onChange={(event) => {
                                handleSetAddressUpdate(
                                  "email",
                                  event.target.value
                                );
                              }}
                            />
                          </div>
                        </Col>
                        <Col span={24}>
                          <div className="m-5">
                            <h6>Địa chỉ chi tiết</h6>
                            <TextArea
                              defaultValue={item.descriptionDetail}
                              onChange={(event) => {
                                handleSetAddressUpdate(
                                  "descriptionDetail",
                                  event.target.value
                                );
                              }}
                            />
                          </div>
                        </Col>
                        <Col span={24}>
                          <Row>
                            <Col span={8}>
                              <div className="m-5">
                                <h6>Tỉnh/Thành phố</h6>
                                <Select
                                  defaultValue={
                                    item.city.includes("|")
                                      ? item.city.substring(
                                          0,
                                          item.city.indexOf("|")
                                        )
                                      : item.city
                                  }
                                  showSearch
                                  style={{ width: "100%" }}
                                  size="medium"
                                  onChange={(event) => {
                                    fetchDistricts(
                                      event.substring(event.indexOf("|") + 1)
                                    );
                                    handleSetAddressUpdate("city", event);
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
                                  defaultValue={
                                    item.district.includes("|")
                                      ? item.district.substring(
                                          0,
                                          item.district.indexOf("|")
                                        )
                                      : item.district
                                  }
                                  showSearch
                                  style={{ width: "100%" }}
                                  size="medium"
                                  onChange={(event) => {
                                    fetchWard(
                                      event.substring(event.indexOf("|") + 1)
                                    );
                                    handleSetAddressUpdate("district", event);
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
                                  defaultValue={
                                    item.ward.includes("|")
                                      ? item.ward.substring(
                                          0,
                                          item.ward.indexOf("|")
                                        )
                                      : item.ward
                                  }
                                  onChange={(event) => {
                                    handleSetAddressUpdate("ward", event);
                                  }}
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
                                        value={
                                          ward.WardName + "|" + ward.WardCode
                                        }
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
                          <Button
                            type="primary"
                            onClick={() => {
                              handleUpdateAdress();
                            }}
                          >
                            <FormOutlined /> Xác nhận
                          </Button>
                        </div>
                      </Row>
                    </Panel>
                  );
                })}
            </Collapse>
            <div style={{ textAlign: "end" }}>
              <Pagination
                current={currenIndex}
                showLessItems
                pageSize={1}
                onChange={handleChangePagePanel}
                total={address.length}
              />
            </div>
          </Spin>
          {roleId === 2 ? (
            <div style={{ marginTop: "12px" }}>
              <Collapse
                className="m-5"
                onChange={handlePanelChange}
                size="small"
              >
                <Panel header={<h5>Thêm mới địa chỉ</h5>} key={1}>
                  <Spin
                    tip="Loading..."
                    spinning={loadingUpdateADD}
                    size="large"
                    style={{ width: "100%" }}
                  >
                    <Row>
                      <Col span={8}>
                        <div className="m-5">
                          <h6>Họ và tên</h6>
                          <Input
                            onChange={(event) => {
                              handleSetAddressCreate(
                                "fullName",
                                event.target.value
                              );
                            }}
                          />
                        </div>
                      </Col>
                      <Col span={8}>
                        <div className="m-5">
                          <h6>Số điện thoại</h6>
                          <Input
                            onChange={(event) => {
                              handleSetAddressCreate("sdt", event.target.value);
                            }}
                          />
                        </div>
                      </Col>
                      <Col span={8}>
                        <div className="m-5">
                          <h6>Email</h6>
                          <Input
                            type={"email"}
                            onChange={(event) => {
                              handleSetAddressCreate(
                                "email",
                                event.target.value
                              );
                            }}
                          />
                        </div>
                      </Col>
                      <Col span={24}>
                        <div className="m-5">
                          <h6>Địa chỉ chi tiết</h6>
                          <TextArea
                            onChange={(event) => {
                              handleSetAddressCreate(
                                "descriptionDetail",
                                event.target.value
                              );
                            }}
                          />
                        </div>
                      </Col>
                      <Col span={24}>
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
                                  handleSetAddressCreate("city", event);
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
                                showSearch
                                style={{ width: "100%" }}
                                size="medium"
                                onChange={(event) => {
                                  fetchWard(
                                    event.substring(event.indexOf("|") + 1)
                                  );
                                  handleSetAddressCreate("district", event);
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
                                onChange={(event) => {
                                  handleSetAddressCreate("ward", event);
                                }}
                              >
                                {wards &&
                                  wards.map((ward) => (
                                    <Select.Option
                                      label={ward.WardName}
                                      key={ward.WardCode}
                                      value={
                                        ward.WardName + "|" + ward.WardCode
                                      }
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
                        <Button type="primary" onClick={handleCreateAddress}>
                          <FormOutlined /> Xác nhận
                        </Button>
                      </div>
                    </Row>
                  </Spin>
                </Panel>
              </Collapse>
            </div>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default DetailForm;
