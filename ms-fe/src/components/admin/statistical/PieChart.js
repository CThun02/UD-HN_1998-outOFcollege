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
  const [datePercentCompareTo, setDatePercentCompareTo] =
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
    var dateFrom = new Date(datePercentCompare);
    var dateTo = new Date(
      selectTypeDate === "other" ? datePercentCompareTo : datePercentCompare
    );
    function getLastDayOfMonth(month) {
      const firstDayOfNextMonth = new Date(
        Date.UTC(dateFrom.getFullYear(), month, 1)
      );
      const lastDayOfMonth = new Date(
        firstDayOfNextMonth.getTime() - 24 * 60 * 60 * 1000
      );
      return lastDayOfMonth.getDate();
    }
    if (selectTypeDate === "month") {
      dateFrom.setDate(1);
      dateTo.setDate(getLastDayOfMonth(dateFrom.getMonth()));
    } else if (selectTypeDate === "year") {
      dateFrom.setDate(1);
      dateTo.setDate(getLastDayOfMonth(11));
      dateFrom.setMonth(0);
      dateTo.setMonth(11);
    }
    if (dateFrom.getTime() > dateTo.getTime()) {
      notification.error({
        message: "Thông báo",
        description:
          "Thời gian bắt đầu phải bé hơn hoặc bằng thời gian kết thúc",
      });
    } else {
      axios
        .get(
          "http://localhost:8080/api/admin/bill/getBillRevenueCompare?day=" +
            encodeURIComponent(dateFrom.toISOString()) +
            "&dayTo=" +
            encodeURIComponent(dateTo.toISOString()),
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
    }
  }, [datePercentCompare, datePercentCompareTo, selectTypeDate]);
  return (
    <div>
      <p style={{ fontWeight: 500, marginTop: "12px" }}>
        <ClockCircleOutlined /> Thời gian
      </p>
      <Select
        value={selectTypeDate}
        onChange={(event) => {
          setDatePercentCompare(formattedDateNow);
          setDatePercentCompareTo(formattedDateNow);
          setSelectTypeDate(event);
        }}
        style={{ width: "30%" }}
        bordered={false}
      >
        <Option value="date">Ngày</Option>
        <Option value="month">Tháng</Option>
        <Option value="year">Năm</Option>
        <Option value="other">Tùy chọn</Option>
      </Select>
      {selectTypeDate === "other" ? (
        <div style={{ display: "inline-block", width: "70%" }}>
          <DatePicker
            className={styles.input_noneBorder}
            style={{ width: "50%" }}
            picker={"date"}
            value={dayjs(datePercentCompare)}
            onChange={(date, dateString) => setDatePercentCompare(dateString)}
          />
          <DatePicker
            className={styles.input_noneBorder}
            style={{ width: "50%" }}
            picker={"date"}
            value={dayjs(datePercentCompareTo)}
            onChange={(date, dateString) => setDatePercentCompareTo(dateString)}
          />
        </div>
      ) : (
        <DatePicker
          className={styles.input_noneBorder}
          style={{ width: "70%" }}
          picker={selectTypeDate}
          value={dayjs(datePercentCompare)}
          onChange={(date, dateString) => setDatePercentCompare(dateString)}
        />
      )}

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
