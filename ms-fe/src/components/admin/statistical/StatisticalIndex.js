import React, { useState, useEffect } from "react";
import { Line, Pie } from "@ant-design/plots";
import styles from "./StatisticalIndex.module.css";
import axios from "axios";
import {
  ArrowUpOutlined,
  LineChartOutlined,
  MoneyCollectFilled,
  RetweetOutlined,
} from "@ant-design/icons";
import { Col, Row, DatePicker } from "antd";
import Statistic from "antd/es/statistic/Statistic";

const StatisticalIndex = () => {
  const [data, setData] = useState([]);
  const dataPieChart = [
    {
      type: "In Store",
      value: 25,
    },
    {
      type: "Online",
      value: 75,
    },
  ];
  const configPieChart = {
    appendPadding: 10,
    dataPieChart,
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

  const configLineChart = {
    data,
    xField: "year",
    yField: "gdp",
    seriesField: "name",
    yAxis: {
      label: {
        formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  const asyncFetch = () => {
    axios
      .get(
        "https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json"
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log("Get data failed", error);
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  return (
    <>
      <Row>
        <Col span={6}>
          <div className={`${styles.bgWhite} ${styles.fixHeightDefault} me-5`}>
            <h2>
              <MoneyCollectFilled /> Doanh thu hôm nay
            </h2>
            <Statistic
              style={{ marginTop: "8px" }}
              title="Đơn hàng bán được"
              value={10}
            />
            <Statistic title="Tổng doanh thu" value={200000.3126 + " VND"} />
          </div>
        </Col>
        <Col span={12}>
          <div
            className={`${styles.bgWhite} ${styles.fixHeightDefault} ms-5 me-5`}
          >
            <h2>
              <RetweetOutlined /> So sánh doanh thu
            </h2>
            <Row>
              <Col span={24}>
                <DatePicker.RangePicker
                  className={styles.input_noneBorder}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Doanh thu ngày... tháng... năm..."
                  value={200000.3126 + " VND"}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Doanh thu ngày... tháng... năm..."
                  value={210000.3126 + " VND"}
                />
              </Col>
              <Col span={24}>
                <Statistic
                  title="Active"
                  value={11.28}
                  precision={2}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<ArrowUpOutlined />}
                  suffix="%"
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={6}>
          <div className={`${styles.bgWhite} ${styles.fixHeightDefault}  ms-5`}>
            {/* <Pie {...configPieChart} /> */}
          </div>
        </Col>
      </Row>
      <div className={styles.bgWhite}>
        <h2>
          <LineChartOutlined /> Thống kê doanh thu
        </h2>
        <Line {...configLineChart} />
      </div>
    </>
  );
};

export default StatisticalIndex;
