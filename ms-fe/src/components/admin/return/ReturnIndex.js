import { Button, notification, Space } from "antd";
import Input from "antd/es/input/Input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ReturnIndex.module.css";
import { getToken } from "../../../service/Token";
import { useNavigate } from "react-router-dom";
import { CarOutlined, QrcodeOutlined, SearchOutlined } from "@ant-design/icons";
import logoOOC from "../../../Assets/img/logo/logo_OOC.svg";
import QRReader from "../../../service/QRReader";

const ReturnIndex = () => {
  const navigate = useNavigate();

  const [isModalQR, setIsModalQR] = useState(false);
  const [billCode, setBillCode] = useState("");

  function searchBill(billCode) {
    axios
      .get(
        `http://localhost:8080/api/admin/bill/getBillByBillCode?billCode=` +
          billCode,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        var now = Date.now();
        var sevenDay = 7 * 24 * 60 * 60 * 1000;
        if (response.data) {
          if (response.data.status !== "Complete") {
            notification.error({
              message: "Thông báo",
              description: "Hóa đơn chưa hoàn thành để thực hiện hoàn trả!",
            });
          } else {
            if (
              now - new Date(response.data.completionDate).getTime() >
              sevenDay
            ) {
              notification.error({
                message: "Thông báo",
                description: "Hóa đơn đã vượt quá 7 ngày để hoàn trả!",
              });
            } else {
              navigate(
                "/api/admin/return/return-bill/" +
                  response.data.billCode +
                  "/return"
              );
            }
          }
        } else {
          notification.error({
            message: "Thông báo",
            description: "Không tìm thấy hóa đơn",
          });
        }
      })
      .catch((error) => {
        const status = error?.response?.status;
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
        setData={searchBill}
      />
      <div className={styles.returnIndex}>
        <h1 style={{ textAlign: "center" }}>
          <CarOutlined /> Trả hàng
        </h1>
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
                searchBill(billCode);
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
