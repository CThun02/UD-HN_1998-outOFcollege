import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import axios from "axios";
import Statistic from "antd/es/statistic/Statistic";
import { getToken } from "../../../service/Token";
import { Col, DatePicker, Row, Select, notification } from "antd";
import dayjs from "dayjs";
import styles from "./StatisticalIndex.module.css";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Option } = Select;
const PieChart = ({ formattedDateNow }) => {
  const [billRevenueCompare, setBillRevenueCompare] = useState({});
  const [datePercentCompare, setDatePercentCompare] =
    useState(formattedDateNow);
  const [selectTypeDate, setSelectTypeDate] = useState("year");
  const data = [
    {
      type: "Tại quầy",
      value: billRevenueCompare.inStoreRevenue,
    },
    {
      type: "Trực tuyến",
      value: billRevenueCompare.onlineRevenue,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  useEffect(() => {
    var day = "";
    var month = "";
    var year = datePercentCompare.substring(0, 4);
    if (selectTypeDate === "date") {
      month = datePercentCompare.substring(
        datePercentCompare.indexOf("-") + 1,
        datePercentCompare.lastIndexOf("-")
      );
      day = datePercentCompare.substring(
        datePercentCompare.lastIndexOf("-") + 1
      );
    } else if (selectTypeDate === "month") {
      month = datePercentCompare.substring(
        datePercentCompare.indexOf("-") + 1,
        datePercentCompare.lastIndexOf("-") === datePercentCompare.indexOf("-")
          ? datePercentCompare.length
          : datePercentCompare.lastIndexOf("-")
      );
    }
    axios
      .get(
        "http://localhost:8080/api/admin/bill/getBillRevenueCompare?day=" +
          day +
          "&month=" +
          month +
          "&year=" +
          year,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((res) => {
        setBillRevenueCompare(res.data);
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        console.log(err);
      });
  }, [datePercentCompare, selectTypeDate]);
  return (
    <div>
      <p style={{ fontWeight: 500, marginTop: "12px" }}>
        <ClockCircleOutlined /> Thời gian
      </p>
      <Select
        value={selectTypeDate}
        onChange={(event) => {
          setDatePercentCompare(formattedDateNow);
          setSelectTypeDate(event);
        }}
        style={{ width: "20%" }}
        bordered={false}
      >
        <Option value="date">Date</Option>
        <Option value="month">Month</Option>
        <Option value="year">Year</Option>
      </Select>
      <DatePicker
        className={styles.input_noneBorder}
        style={{ width: "80%" }}
        picker={selectTypeDate}
        value={dayjs(datePercentCompare)}
        onChange={(date, dateString) => setDatePercentCompare(dateString)}
      />
      <Pie {...config} />
      <Row>
        <Col span={12}>
          <Statistic
            title="Doanh thu tại cửa hàng"
            value={
              billRevenueCompare.inStoreRevenue?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              }) || 0
            }
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Doanh thu trực tuyến"
            value={
              billRevenueCompare.onlineRevenue?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              }) || 0
            }
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Tổng doanh thu"
            value={
              billRevenueCompare.totalRevenue?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              }) || 0
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default PieChart;
