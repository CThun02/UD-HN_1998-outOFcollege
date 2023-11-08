import React, { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import axios from "axios";
import Statistic from "antd/es/statistic/Statistic";
import { Col, Row } from "antd";

const PieChart = () => {
  const [billRevenueCompare, setBillRevenueCompare] = useState({});
  const data = [
    {
      type: "In Store",
      value: billRevenueCompare.inStoreRevenue,
    },
    {
      type: "Online",
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
    axios
      .get("http://localhost:8080/api/admin/bill/getBillRevenueCompare")
      .then((res) => {
        setBillRevenueCompare(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
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
    </>
  );
};

export default PieChart;
