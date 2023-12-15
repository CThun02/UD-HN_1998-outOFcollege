import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Table, notification } from "antd";
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
  phoneNumber,
}) => {
  const [loading, setLoadding] = useState(true);
  const [renderThis, setRenderThis] = useState(null);
  var cart = JSON.parse(localStorage.getItem(cartId));

  const add = (value) => {
    cart.account = value;
    address(
      value?.accountAddress?.filter(
        (address) => address.defaultaddress === true
      )[0]
    );
    console.log(value.accountAddress);
    localStorage.setItem(cartId, JSON.stringify(cart));
    render(Math.random);
    onCancel();
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => {
        return index + 1;
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
        open={visible}
        onCancel={() => {
          onCancel();
          setRenderThis(visible);
        }}
        footer={null}
        width={1000}
      >
        <Row>
          <Col span={12} style={{ marginBottom: "12px" }}>
            <Input
              className={styles.filter_inputSearch}
              placeholder="Nhập tên, số điện thoại khách hàng"
              prefix={<SearchOutlined />}
              onChange={(event) => {
                filter(event.target.value);
              }}
            />
          </Col>
          <Col span={24}>
            <Table
              pagination={false}
              columns={columns}
              dataSource={
                data &&
                data.map((record, index) => ({
                  ...record,
                  key: record.id,
                }))
              }
              loading={loading}
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ModalAccount;
