import { Button, notification, Space } from "antd";
import Input from "antd/es/input/Input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ReturnIndex.module.css";
import { getToken } from "../../../service/Token";
import { Link, useNavigate } from "react-router-dom";
import { QrcodeOutlined, SearchOutlined } from "@ant-design/icons";
import logoOOC from "../../../Assets/img/logo/logo_OOC.svg";
import QRReader from "../../../service/QRReader";

const ReturnIndex = () => {
  const api = "http://localhost:8080/api/admin/bill";
  const navigate = useNavigate();

  const [isModalQR, setIsModalQR] = useState(false);
  const [billCode, setBillCode] = useState("");

  function searchBill() {
    axios
      .get(`http://localhost:8080/api/admin/`, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
  }
  return (
    <>
      <QRReader
        visible={isModalQR}
        onCancel={() => setIsModalQR(false)}
        title={"Tìm kiếm hóa đơn"}
        setData={setBillCode}
      />
      <div className={styles.returnIndex}>
        <img alt="" style={{ width: "12%" }} src={logoOOC} />
        <h2 style={{ textAlign: "center" }}>Tìm kiếm đơn hàng</h2>
        <Input
          placeholder="Nhập mã hóa đơn đơn hàng"
          className={styles.filter_inputSearch}
          size="large"
          onChange={(e) => setBillCode(e.target.value.trim())}
        />
        <div style={{ marginTop: "20px" }}>
          <Space>
            <Button
              onClick={() => {
                navigate("/api/admin/return/return-bill");
              }}
              type="primary"
              size="large"
            >
              <SearchOutlined /> Tìm kiếm
            </Button>
            <Button
              onClick={() => setIsModalQR(true)}
              type="primary"
              size="large"
            >
              <QrcodeOutlined /> Quét QR
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
};

export default ReturnIndex;
