import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import styles from "./StatisticalIndex.module.css";
import axios from "axios";
import {
  ArrowUpOutlined,
  DoubleRightOutlined,
  LineChartOutlined,
  MoneyCollectFilled,
  RetweetOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Col, Row, DatePicker } from "antd";
import Statistic from "antd/es/statistic/Statistic";
import PieChart from "./PieChart";
import TableUserBuyTheMost from "./TableProdutSellTheMost";
import TableProdutSellTheMost from "./TableProdutSellTheMost";

const StatisticalIndex = () => {
  const [data, setData] = useState([]);
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
        <Col span={10}>
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
      </Row>
      <Row>
        <Col span={24}>
          <div className={styles.bgWhite}>
            <h2>
              <LineChartOutlined /> Thống kê doanh thu
            </h2>
            <Line {...configLineChart} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <div className={`${styles.bgWhite} me-5`}>
            <h2>
              <DoubleRightOutlined /> Tỷ lệ thu chi
            </h2>
            <PieChart />
          </div>
        </Col>
        <Col span={18}>
          <div className={`${styles.bgWhite} ms-5`}>
            <h2>
              <UserOutlined /> Sản phẩm mua nhiều nhất
            </h2>
            <div style={{ margin: "20px 0" }}>
              <TableProdutSellTheMost />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StatisticalIndex;
