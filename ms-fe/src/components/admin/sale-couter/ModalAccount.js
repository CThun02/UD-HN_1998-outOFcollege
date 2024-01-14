import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Table, notification, Radio } from "antd";
import Input from "antd/es/input/Input";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./search.module.css";
import { getToken } from "../../../service/Token";

const ModalAccount = ({
  visible,
  onCancel,
  cartId,
  render,
  address,
  setEmail,
  setFullname,
  setPhoneNumber,
  setProvinces,
  setWards,
  setDistricts,
  setDetailAddress
}) => {
  const [loading, setLoadding] = useState(true);
  const [renderThis, setRenderThis] = useState(null);
  var cart = JSON.parse(localStorage.getItem(cartId));
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [account, setAcount] = useState({
    idNo: generateUniqueRandomHex(12),
    image: "none",
    fullName: " ",
    email: " ",
    numberPhone: " ",
    city: "empty",
    district: "empty",
    ward: "empty",
    password: "12345",
    descriptionDetail: "empty",
    dob: " ",
    gender: true,
    idRole: 2,
  })

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

  const add = (value) => {
    cart.account = value;
    var addressDefault = value?.accountAddress?.filter(
        (address) => (
          address.defaultaddress === true
        )
      )[0]
    address(
      addressDefault
    );
    console.log(addressDefault)
    setEmail(addressDefault?.email)
    setFullname(addressDefault?.fullName);
    setPhoneNumber(addressDefault?.sdt)
    setProvinces(addressDefault?.city?.substring(0, addressDefault?.city.indexOf("|")));
    setWards(addressDefault?.ward.substring(0,addressDefault?.ward.indexOf("|") ))
    setDistricts(addressDefault?.district.substring(0, addressDefault?.district.indexOf("|") ))
    setDetailAddress(addressDefault?.detailAddress)

    localStorage.setItem(cartId, JSON.stringify(cart));
    render(Math.random);
    onCancel();
  };

  const handelSetAccount = (field, value) => {
    setAcount((account) => ({
      ...account,
      [field]: value,
    }));
  }

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => {
        return (
          <span id={record.id}>
            {(currentPage - 1) * pageSize + (index + 1)}
          </span>
        );
      },
    },
    {
      title: "Tên",
      dataIndex: "fullName",
      key: "fullname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "numberPhone",
      key: "numberPhone",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (gender) => {
        return gender === true ? "Nam" : "Nữ";
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => {
        return (
          <div>
            <Button type="primary" onClick={() => add(record)}>
              Chọn
            </Button>
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState([]);
  function filter(keyword) {
    axios
      .get(
        `http://localhost:8080/api/admin/account/getAllCustomer?keyword=${keyword}&roleId=2&status=ACTIVE`,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoadding(false);
      })
      .catch((error) => {
        const status = error.response?.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
  }
  useEffect(() => {
    filter("");
  }, [renderThis]);
  return (
    <div>
      <Modal
        title="Tìm kiếm khách hàng"
        key={cartId}
        open={visibleCreate}
        onCancel={() => {
          setVisibleCreate(false)
          setRenderThis(visible);
        }}
        centered
        footer={null}
      >
        <Row>
          <Col offset={2} span={20}>
            <Row>
              <Col span={24}>
                <span style={{ fontWeight: "500" }}>Tên khách hàng</span>
                <Input
                  value={account?.fullName}
                  onChange={(event) => { handelSetAccount("fullName", event.target.value) }}
                  style={{ width: "100%" }} size="small"
                  status={account?.fullName === "" ? "error" : null}
                />
              </Col>
              <Col span={24}>
                <span style={{ fontWeight: "500" }}>Số điện thoại</span>
                <Input
                  value={account?.numberPhone}
                  onChange={(event) => { handelSetAccount("numberPhone", event.target.value.replace(/[^\d]/g, "")) }}
                  style={{ width: "100%" }} size="small"
                  status={account?.numberPhone === "" ? "error" : null}
                />
              </Col>
              <Col span={24}>
                <span style={{ fontWeight: "500" }}>Email</span>
                <Input
                  value={account?.email}
                  onChange={(event) => { handelSetAccount("email", event.target.value.replace(" ", "")) }}
                  style={{ width: "100%" }} size="small"
                  status={account?.email === "" ? "error" : null}
                />
              </Col>
              <Col span={24}>
                <span style={{ fontWeight: "500" }}>Giới tính</span>
                <Radio.Group
                  value={account?.gender}
                  onChange={(event) => { handelSetAccount("gender", event.target.value) }}
                >
                  <Radio value={true}>Nam</Radio>
                  <Radio value={false}>Nữ</Radio>
                </Radio.Group>
              </Col>
            </Row>
            <Col span={24} style={{ textAlign: "center" }}>
              <Button type="primary" size="large">Xác nhận</Button>
            </Col>
          </Col>
        </Row>
      </Modal>
      <Modal
        centered
        title="Tìm kiếm khách hàng"
        key={cartId}
        open={visible}
        onCancel={() => {
          onCancel();
          setRenderThis(visible);
        }}
        footer={null}
        width={1000}
      >
        <Row>
          <Col span={12} style={{ marginBottom: "24px" }}>
            <Input
              className={styles.filter_inputSearch}
              placeholder="Nhập tên, số điện thoại khách hàng"
              prefix={<SearchOutlined />}
              onChange={(event) => {
                filter(event.target.value);
              }}
            />
          </Col>
          {/* <Col span={12} style={{ textAlign: "end" }}>
            <Button size="large" type="primary" onClick={() => { setVisibleCreate(true) }}>Thêm khách hàng</Button>
          </Col> */}
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={
                data &&
                data.map((record, index) => ({
                  ...record,
                  key: record.id,
                }))
              }
              pagination={{
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 15, 20],
                defaultPageSize: 5,
                showLessItems: true,
                style: { marginRight: "10px" },
                onChange: (currentPage, pageSize) => {
                  setCurrentPage(currentPage);
                  setPageSize(pageSize);
                },
              }}
              loading={loading}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ModalAccount;
