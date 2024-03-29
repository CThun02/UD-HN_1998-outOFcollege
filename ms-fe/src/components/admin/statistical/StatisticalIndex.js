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
  CheckCircleOutlined,
  ArrowDownOutlined,
  TableOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import {
  Col,
  Row,
  DatePicker,
  Select,
  Button,
  notification,
  Spin,
  Carousel,
  Badge,
  Table,
} from "antd";
import Statistic from "antd/es/statistic/Statistic";
import PieChart from "./PieChart";
import TableProdutSellTheMost from "./TableProdutSellTheMost";
import dayjs from "dayjs";

var currentDate = new Date();

var day = currentDate.getDate();
var month = currentDate.getMonth() + 1;
var year = currentDate.getFullYear();
var formattedDateNow = year + "-" + month + "-" + day;
var formattedDateYesterday = year + "-" + month + "-" + (day - 1);
const { Option } = Select;
const StatisticalIndex = () => {
  const [data, setData] = useState([]);
  const [billRevenue, setBillRevenue] = useState({});
  const [billRevenueCompare, setBillRevenueCompare] = useState({});
  const [dateCompare, setDateCompare] = useState("date");
  const [dateValueFrom, setDateValueFrom] = useState(formattedDateYesterday);
  const [dateValueTo, setDateValueTo] = useState(formattedDateNow);
  const [isLoading, setIsLoading] = useState(false);
  const [render, setRender] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      key: "#",
      datatIndex: "index",
      title: "#",
      width: "7%",
      render: (text, record, index) => {
        return (
          <span id={record.id}>
            {(currentPage - 1) * pageSize + (index + 1)}
          </span>
        );
      },
    },
    {
      key: "product",
      datatIndex: "product",
      title: "Sản phẩm",
      width: "50%",
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={4} style={{ height: "100%" }}>
              <div
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                {record.promotionValue !== null ? (
                  <Badge.Ribbon
                    text={`Giảm ${
                      record.promotionValue
                        ? record.promotionMethod === "%"
                          ? record.promotionValue + " " + record.promotionMethod
                          : record.promotionValue.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                        : null
                    }`}
                    color="red"
                  >
                    <Carousel autoplay>
                      {record.productImageResponse &&
                        record.productImageResponse.map((item) => {
                          return (
                            <img
                              key={item.id}
                              style={{ width: "100%", marginTop: "10px" }}
                              alt=""
                              src={item.path}
                            />
                          );
                        })}
                    </Carousel>
                  </Badge.Ribbon>
                ) : (
                  <Carousel autoplay>
                    {record.productImageResponse &&
                      record.productImageResponse.map((item) => {
                        return (
                          <img
                            key={item.id}
                            style={{ width: "100%", marginTop: "10px" }}
                            alt=""
                            src={item.path}
                          />
                        );
                      })}
                  </Carousel>
                )}
              </div>
            </Col>
            <Col span={20} style={{ height: "100%" }}>
              <div
                className="m-5"
                style={{
                  textAlign: "start",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontWeight: "500" }}>
                  {record.product.productName +
                    "-" +
                    record.brand.brandName +
                    "-" +
                    record.category.categoryName +
                    "-" +
                    record.button.buttonName +
                    "-" +
                    record.material.materialName +
                    "-" +
                    record.collar.collarTypeName +
                    "-" +
                    record.sleeve.sleeveName +
                    "-" +
                    record.shirtTail.shirtTailTypeName +
                    "-" +
                    record.pattern.patternName +
                    "-" +
                    record.form.formName}
                </span>
                <br />
                <div className={styles.optionColor}>
                  <b>Màu sắc: </b>
                  <span
                    style={{
                      backgroundColor: record.color.colorCode,
                      marginLeft: "8px",
                    }}
                  ></span>
                  {record.color.colorName}
                </div>
                <b>Kích cỡ: </b>
                <span
                  style={{
                    marginLeft: "8px",
                  }}
                >
                  {record.size.sizeName}
                </span>
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      key: "quantity",
      datatIndex: "quantity",
      title: "Số lượng bán",
      render: (text, record, index) => {
        return record.quantity;
      },
    },
    {
      key: "total",
      datatIndex: "total",
      title: "Tổng thu",
      render: (text, record, index) => {
        return record.price;
      },
    },
  ];

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

  function compareRevenue() {
    if (dateValueFrom === "" || dateValueTo === "") {
      notification.error({
        message: "Thông báo",
        description: "Vui lòng chọn đầy đủ thời gian",
      });
      return;
    }
    setIsLoading(true);
    var yearFrom = dateValueFrom.substring(0, 4);
    var yearTo = dateValueTo.substring(0, 4);
    var monthFrom = "";
    var monthTo = "";
    var dayFrom = "";
    var dayTo = "";

    if (dateCompare === "month" || dateCompare === "date") {
      monthFrom = dateValueFrom.substring(
        dateValueFrom.indexOf("-") + 1,
        dateValueFrom.indexOf("-") + 3
      );
      monthTo = dateValueTo.substring(
        dateValueTo.indexOf("-") + 1,
        dateValueTo.indexOf("-") + 3
      );
    }
    if (dateCompare === "date") {
      dayFrom = dateValueFrom.substring(dateValueFrom.lastIndexOf("-") + 1);
      dayTo = dateValueTo.substring(dateValueTo.lastIndexOf("-") + 1);
    }
    var dateFrom = new Date(
      yearFrom,
      monthFrom === "" ? 0 : monthFrom,
      dayFrom === "" ? 1 : dayFrom
    );
    var dateTo = new Date(
      yearTo,
      monthTo === "" ? 0 : monthTo,
      dayTo === "" ? 1 : dayTo
    );
    if (dateFrom.getTime() >= dateTo.getTime()) {
      notification.error({
        message: "Thông báo",
        description: "Thời gian bắt đầu phải bé hơn thời gian kết thúc",
      });
      setIsLoading(false);
    } else {
      axios
        .get(
          "http://localhost:8080/api/admin/bill/compareRevenueDate?dayFrom=" +
            dayFrom +
            "&monthFrom=" +
            monthFrom +
            "&yearFrom=" +
            yearFrom +
            "&yearTo=" +
            yearTo +
            "&monthTo=" +
            monthTo +
            "&dayTo=" +
            dayTo
        )
        .then((res) => {
          setBillRevenueCompare(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }
  }
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/bill/getGrossRevenue")
      .then((res) => {
        setBillRevenue(res.data);
      })
      .catch((err) => console.log(err));
    asyncFetch();
    compareRevenue();
  }, [dateCompare, render]);

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

  return (
    <>
      <Row>
        <Col span={14}>
          <div className={`${styles.bgWhite} ${styles.fixHeightDefault} me-5`}>
            <h2>
              <MoneyCollectFilled /> Xem doanh thu
            </h2>
            <Row>
              <Col span={6}>
                <p style={{ fontWeight: 500 }}>
                  <ClockCircleOutlined /> Thời gian
                </p>
                <DatePicker
                  className={styles.input_noneBorder}
                  style={{ width: "90%" }}
                  picker={"date"}
                  defaultValue={dayjs(formattedDateNow)}
                />
                <Statistic
                  style={{ marginTop: "8px" }}
                  title="Đơn hàng bán được"
                  value={billRevenue.billSell || 0}
                />
                <Statistic
                  title="Tổng doanh thu"
                  value={
                    billRevenue.grossRevenue?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }) || 0
                  }
                />
              </Col>
              <Col span={18}>
                <p style={{ fontWeight: 500 }}>
                  <TableOutlined /> Sản phẩm bán được
                </p>
                <Table
                  style={{ marginTop: "12px" }}
                  pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: [5, 10, 15, 20],
                    defaultPageSize: 5,
                    style: { marginRight: "10px" },
                    onChange: (currentPage, pageSize) => {
                      setCurrentPage(currentPage);
                      setPageSize(pageSize);
                    },
                  }}
                  scroll={{ y: 360 }}
                  columns={columns}
                  loading={loading}
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={10}>
          <div className={`${styles.bgWhite} ${styles.fixHeightDefault}`}>
            <Spin
              tip="Loading..."
              spinning={isLoading}
              size="large"
              style={{ width: "100%", height: "100%" }}
            >
              <h2>
                <RetweetOutlined /> So sánh doanh thu
              </h2>
              <Row>
                <Col span={24}>
                  <Select
                    value={dateCompare}
                    onChange={(event) => {
                      var yearFrom = formattedDateYesterday.substring(0, 4);
                      var yearTo = formattedDateYesterday.substring(0, 4);
                      var monthFrom = formattedDateYesterday.substring(
                        formattedDateYesterday.indexOf("-") + 1,
                        formattedDateYesterday.lastIndexOf("-")
                      );
                      var monthTo = formattedDateNow.substring(
                        formattedDateNow.indexOf("-") + 1,
                        formattedDateNow.lastIndexOf("-")
                      );
                      if (event === "date") {
                        setDateValueFrom(formattedDateYesterday);
                        setDateValueTo(formattedDateNow);
                      } else if (event === "month") {
                        if (Number(monthFrom) - 1 === 0) {
                          monthFrom = 12;
                          yearFrom = Number(yearFrom) - 1;
                        } else {
                          monthFrom = Number(monthFrom) - 1;
                        }
                        setDateValueFrom(yearFrom + "-" + monthFrom);
                        setDateValueTo(yearTo + "-" + monthTo);
                      } else {
                        yearFrom = (Number(yearFrom) - 1).toString();
                        setDateValueFrom(yearFrom);
                        setDateValueTo(yearTo);
                      }
                      setDateCompare(event);
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
                    style={{ width: "35%" }}
                    picker={dateCompare}
                    onChange={(date, dateString) =>
                      setDateValueFrom(dateString)
                    }
                    value={dayjs(dateValueFrom)}
                  />
                  <DatePicker
                    className={styles.input_noneBorder}
                    style={{ width: "35%" }}
                    picker={dateCompare}
                    value={dayjs(dateValueTo)}
                    onChange={(date, dateString) => setDateValueTo(dateString)}
                  />
                  <Button
                    onClick={() => {
                      setRender(Math.random());
                    }}
                    type="primary"
                    size="large"
                  >
                    <CheckCircleOutlined />
                  </Button>
                </Col>

                <Col span={12}>
                  <Statistic
                    title={`Doanh thu ${dateValueFrom}`}
                    value={billRevenueCompare.revenueFrom || 0}
                    suffix="VND"
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={`Doanh thu ${dateValueTo}`}
                    value={billRevenueCompare.revenueTo || 0}
                    suffix="VND"
                  />
                </Col>
                <Col span={24}>
                  <Statistic
                    title={
                      billRevenueCompare.revenueFrom -
                        billRevenueCompare.revenueTo >
                      0
                        ? "INACTIVE"
                        : "ACTIVE"
                    }
                    value={
                      (Math.abs(
                        billRevenueCompare.revenueFrom -
                          billRevenueCompare.revenueTo
                      ) /
                        (billRevenueCompare.revenueFrom +
                          billRevenueCompare.revenueTo)) *
                        100 || 0
                    }
                    precision={2}
                    valueStyle={
                      billRevenueCompare.revenueFrom -
                        billRevenueCompare.revenueTo >
                      0
                        ? { color: "#ff4d4f" }
                        : { color: "#3f8600" }
                    }
                    prefix={
                      billRevenueCompare.revenueFrom -
                        billRevenueCompare.revenueTo >
                      0 ? (
                        <ArrowDownOutlined />
                      ) : (
                        <ArrowUpOutlined />
                      )
                    }
                    suffix="%"
                  />
                </Col>
              </Row>
            </Spin>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={styles.bgWhite}>
          <h2>
            <LineChartOutlined /> Thống kê doanh thu
          </h2>
          <Line {...configLineChart} />
          <div style={{ textAlign: "center", margin: "20px 0" }}>
            <span>
              <LineChartOutlined />. Biểu đồ thống kê doanh thu theo thời gian
            </span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <div className={`${styles.bgWhite} me-5`}>
            <h2>
              <DoubleRightOutlined /> Tỷ lệ doanh thu
            </h2>
            <PieChart />
          </div>
        </Col>
        <Col span={16}>
          <div className={`${styles.bgWhite} ms-5`} style={{ height: "100%" }}>
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
