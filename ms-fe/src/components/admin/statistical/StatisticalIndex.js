import React, { useState, useEffect, useContext } from "react";
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
  EuroOutlined,
  CarOutlined,
  PieChartOutlined,
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
  Divider,
  Tabs,
} from "antd";
import Statistic from "antd/es/statistic/Statistic";
import PieChart from "./PieChart";
import TableProdutSellTheMost from "./TableProdutSellTheMost";
import ProductReturns from "./ProductReturns";
import dayjs from "dayjs";
import { getToken } from "../../../service/Token";
import { useNavigate } from "react-router-dom";

var currentDate = new Date();
var yesterday = new Date(currentDate.getTime() - 24 * 60 * 60 * 1000);

var formattedDateNow =
  currentDate.getFullYear() +
  "-" +
  (currentDate.getMonth() + 1) +
  "-" +
  currentDate.getDate();
var formattedDateYesterday =
  yesterday.getFullYear() +
  "-" +
  (yesterday.getMonth() + 1) +
  "-" +
  yesterday.getDate();
const { Option } = Select;

const StatisticalIndex = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [billRevenue, setBillRevenue] = useState({});
  const [billRevenueCompare, setBillRevenueCompare] = useState({});
  const [dateCompare, setDateCompare] = useState("date");
  const [dateValueFrom, setDateValueFrom] = useState(formattedDateYesterday);
  const [dateValueTo, setDateValueTo] = useState(formattedDateNow);
  const [dateLineChartValueFrom, setDateLineChartValueFrom] = useState(
    formattedDateYesterday
  );
  const [dateLineChartValueTo, setDateLineChartValueTo] =
    useState(formattedDateNow);
  const [isLoading, setIsLoading] = useState(false);
  const [render, setRender] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true);
  const [dateRevenue, setDateRevenue] = useState(formattedDateYesterday);
  const [dateRevenueTo, setDateRevenueTo] = useState(formattedDateNow);
  const [selectTypeDateProduct, setSelectTypeDateproduct] = useState("year");
  const [selectTypeDateProductReturn, setSelectTypeDateproductReturn] =
    useState("year");
  const [dateProductSellTheMost, setDateProductSellTheMost] = useState(
    formattedDateYesterday
  );
  const [dateProductSellTheMostTo, setDateProductSellTheMostTo] =
    useState(formattedDateNow);
  const [dateProductReturn, setDateProductReturn] = useState(
    formattedDateYesterday
  );
  const [dateProductReturnTo, setDateProductReturnTo] =
    useState(formattedDateNow);
  const [typeDateBillRevenue, setTypeDateBillRevenue] = useState("date");
  const [typeDateLineChart, setTypeDateLineChart] = useState("date");
  const [growthStoreDayData, setGrowthStoreDayData] = useState(null);
  const [growthStoreMonthData, setGrowthStoreMonthData] = useState(null);
  const [growthStoreYearData, setGrowthStoreYearData] = useState(null);
  const [reason, setReason] = useState("PRODUCE");

  const totalQuantity = billRevenue?.productDetailDisplay?.reduce(
    (total, item) => total + item.quantity,
    0
  );

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
      width: "60%",
      render: (text, record, index) => {
        return (
          <Row>
            <Col span={6} style={{ height: "100%" }}>
              <div
                style={{
                  marginTop: "10px",
                  marginRight: "10px",
                }}
              >
                {record.promotion.length !== 0 ? (
                  <Badge.Ribbon
                    text={`Giảm ${record.promotion[0].promotionValue
                        ? record.promotion[0].promotionMethod === "%"
                          ? record.promotion[0].promotionValue +
                          " " +
                          record.promotion[0].promotionMethod
                          : record.promotion[0].promotionValue.toLocaleString(
                            "vi-VN",
                            {
                              style: "currency",
                              currency: "VND",
                            }
                          )
                        : null
                      }`}
                    color="red"
                  >
                    <Carousel style={{ maxWidth: "300px" }} autoplay>
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
                  <Carousel style={{ maxWidth: "300px" }} autoplay>
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
            <Col span={18} style={{ height: "100%" }}>
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
        return (record.price * record.quantity)?.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      },
    },
  ];

  const configLineChart = {
    data,
    xField: "time",
    yField: "revenue",
    seriesField: "typeBill",
    yAxis: {
      label: {
        formatter: (v) => `${(v / 1000000).toFixed(1)} m`,
      },
    },
    legend: {
      position: "top",
    },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 2000,
      },
    },
  };

  function getLastDayOfMonth(date, month) {
    const firstDayOfNextMonth = new Date(
      Date.UTC(date.getFullYear(), month, 1)
    );
    const lastDayOfMonth = new Date(
      firstDayOfNextMonth.getTime() - 24 * 60 * 60 * 1000
    );
    return lastDayOfMonth.getDate();
  }

  function compareRevenue() {
    if (dateValueFrom === "" || dateValueTo === "") {
      notification.error({
        message: "Thông báo",
        description: "Vui lòng chọn đầy đủ thời gian",
      });
      return;
    }
    setIsLoading(true);
    var dateFrom = new Date(dateValueFrom);
    var dateTo = new Date(dateValueTo);
    var monthFrom = "";
    var monthTo = "";
    var dayFrom = "";
    var dayTo = "";

    if (dateCompare === "month" || dateCompare === "date") {
      monthFrom = dateFrom.getMonth()+1;
      monthTo = dateTo.getMonth()+1;
    }
    if (dateCompare === "date") {
      dayFrom = dateFrom.getDate();
      dayTo = dateTo.getDate();
    }
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
          dateFrom.getFullYear() +
          "&yearTo=" +
          dateTo.getFullYear() +
          "&monthTo=" +
          monthTo +
          "&dayTo=" +
          dayTo,
          {
            headers: {
              Authorization: `Bearer ${getToken(true)}`,
            },
          }
        )
        .then((res) => {
          setBillRevenueCompare(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          const status = err?.response?.status;
          if (status === 403) {
            notification.error({
              message: "Thông báo",
              description: "Bạn không có quyền truy cập!",
            });
          }
          console.log(err);
        });
    }
  }

  function getDataLineChart() {
    var dateFrom = new Date(dateLineChartValueFrom);
    var dateTo = new Date(dateLineChartValueTo);
    var yearFrom = dateFrom.getFullYear();
    var yearTo = dateTo.getFullYear();
    var monthFrom = "";
    var monthTo = "";
    var dayFrom = "";
    var dayTo = "";
    if (typeDateLineChart === "month") {
      monthFrom = dateFrom.getMonth() + 1;
      monthTo = dateTo.getMonth() + 1;
      dayFrom = "";
      dayTo = "";
    } else if (typeDateLineChart === "date") {
      dayFrom = dateFrom.getDate();
      dayTo = dateTo.getDate();
      monthFrom = dateFrom.getMonth() + 1;
      monthTo = dateTo.getMonth() + 1;
    } else {
      dayFrom = "";
      dayTo = "";
      monthFrom = "";
      monthTo = "";
    }

    if (dateFrom.getTime() > dateTo.getTime()) {
      notification.error({
        message: "Thông báo",
        description:
          "Thời gian bắt đầu phải bé hơn hoặc bằng thời gian kết thúc",
      });
      setIsLoading(false);
    } else {
      axios
        .get(
          "http://localhost:8080/api/admin/bill/getDataLineChart?dayFrom=" +
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
          dayTo,
          {
            headers: {
              Authorization: `Bearer ${getToken(true)}`,
            },
          }
        )
        .then((res) => {
          setData(res.data);
        })
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
  }

  async function getGrowthStoreDataByTime(time, setData) {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/admin/bill/getGrowthStoreByTime?time=" +
        time,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      );

      const data = response.data;
      setData(data);
      return data;
    } catch (error) {
      if (error.response && error.response.status === 403) {
        notification.error({
          message: "Thông báo",
          description: "Bạn không có quyền truy cập!",
        });
      }
    }
  }

  function getDataRevenue() {
    var dateFrom = new Date(
      typeDateBillRevenue === "other" ? dateRevenue : dateRevenueTo
    );
    var dateTo = new Date(dateRevenueTo);
    if (typeDateBillRevenue === "month") {
      dateFrom.setDate(1);
      dateTo.setDate(getLastDayOfMonth(dateFrom, dateFrom.getMonth()));
    } else if (typeDateBillRevenue === "year") {
      dateFrom.setDate(1);
      dateTo.setDate(getLastDayOfMonth(dateFrom, 11));
      dateFrom.setMonth(0);
      dateTo.setMonth(11);
    }
    dateFrom.setHours(dateFrom.getHours() + 7);
    dateTo.setHours(dateTo.getHours() + 7);
    if (dateFrom.getTime() > dateTo.getTime()) {
      notification.error({
        message: "Thông báo",
        description:
          "Thời gian bắt đầu phải bé hơn hoặc bằng thời gian kết thúc",
      });
      setIsLoading(false);
    } else {
      axios
        .get(
          "http://localhost:8080/api/admin/bill/getGrossRevenue?day=" +
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
          setLoading(false);
          setBillRevenue(res.data);
        })
        .catch((err) => {
          const status = err?.response?.status;
          if (status === 403) {
            notification.error({
              message: "Thông báo",
              description: "Bạn không có quyền truy cập!",
            });
          }
          console.log(err);
        });
    }
  }

  useEffect(() => {
    if (isAdmin === false) {
      notification.warning({
        message: "Thông báo",
        description: "Bạn không có quyền truy cập",
      });
      navigate("/api/admin/counter-sales");
    } else if (isAdmin === true) {
      getDataRevenue();
      getDataLineChart();
      compareRevenue();
      getGrowthStoreDataByTime("date", setGrowthStoreDayData);
      getGrowthStoreDataByTime("month", setGrowthStoreMonthData);
      getGrowthStoreDataByTime("year", setGrowthStoreYearData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dateCompare,
    render,
    dateRevenue,
    dateRevenueTo,
    typeDateBillRevenue,
    dateLineChartValueFrom,
    dateLineChartValueTo,
    typeDateLineChart,
    reason,
    isAdmin,
  ]);
  return (
    <>
      <Row>
        <Col span={24}>
          <h1 style={{ textAlign: "center" }}>
            <PieChartOutlined /> Thống kê
          </h1>
          <br />
        </Col>
        <Col span={16}>
          <div className={`${styles.bgWhite} ${styles.fixHeightDefault} me-5`}>
            <h2>
              <MoneyCollectFilled /> Xem doanh thu
            </h2>
            <Row>
              <Col span={24}>
                <p style={{ fontWeight: 500, marginTop: "12px" }}>
                  <ClockCircleOutlined /> Thời gian
                </p>
                <Select
                  value={typeDateBillRevenue}
                  onChange={(event) => {
                    setDateRevenue(formattedDateYesterday);
                    setDateRevenueTo(formattedDateNow);
                    setTypeDateBillRevenue(event);
                  }}
                  style={{ width: "15%" }}
                  bordered={false}
                >
                  <Option value="date">Ngày</Option>
                  <Option value="month">Tháng</Option>
                  <Option value="year">Năm</Option>
                  <Option value="other">Tùy chọn</Option>
                </Select>
                {typeDateBillRevenue === "other" ? (
                  <div style={{ width: "60%", display: "inline-block" }}>
                    <DatePicker
                      className={styles.input_noneBorder}
                      style={{ width: "50%" }}
                      picker={typeDateBillRevenue}
                      value={dayjs(dateRevenue)}
                      onChange={(date, dateString) =>
                        setDateRevenue(dateString)
                      }
                    />
                    <DatePicker
                      className={styles.input_noneBorder}
                      style={{ width: "50%" }}
                      picker={typeDateBillRevenue}
                      value={dayjs(dateRevenueTo)}
                      onChange={(date, dateString) =>
                        setDateRevenueTo(dateString)
                      }
                    />
                  </div>
                ) : (
                  <DatePicker
                    className={styles.input_noneBorder}
                    style={{ width: "50%" }}
                    picker={typeDateBillRevenue}
                    value={dayjs(dateRevenueTo)}
                    onChange={(date, dateString) => {
                      setDateRevenueTo(dateString);
                    }}
                  />
                )}
              </Col>
              <Col span={8}>
                <Statistic
                  style={{ marginTop: "8px" }}
                  title="Đơn hàng bán được"
                  value={billRevenue.billSell || 0}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  style={{ marginTop: "8px" }}
                  title="Tổng doanh thu"
                  value={
                    billRevenue.grossRevenue?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }) || 0
                  }
                />
              </Col>
              <Col span={8}>
                <Statistic
                  style={{ marginTop: "8px" }}
                  title="Số lượng sản phẩm bán được"
                  value={totalQuantity}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  style={{ marginTop: "8px" }}
                  title="Đơn hàng hoàn trả"
                  value={billRevenue.billSell || 0}
                />
              </Col>
              <Col span={24}>
                <p style={{ fontWeight: 500, marginTop: "20px" }}>
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
                  dataSource={
                    billRevenue.productDetailDisplay &&
                    billRevenue.productDetailDisplay.map((record, index) => ({
                      ...record,
                      key: index,
                    }))
                  }
                  scroll={{ y: 200 }}
                  columns={columns}
                  loading={loading}
                />
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={8}>
          <div className={`${styles.bgWhite} me-5`}>
            <h2>
              <DoubleRightOutlined /> Tỷ lệ doanh thu
            </h2>
            <PieChart formattedDateNow={formattedDateNow} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} className={styles.bgWhite}>
          <h2>
            <LineChartOutlined /> Thống kê doanh thu
          </h2>
          <div style={{ marginTop: "12px" }}>
            <span style={{ fontWeight: 500 }}>
              <ClockCircleOutlined />
              Thời gian
            </span>{" "}
            <br />
            <Select
              value={typeDateLineChart}
              onChange={(event) => {
                setTypeDateLineChart(event);
              }}
              style={{ width: "10%" }}
              bordered={false}
            >
              <Option value="date">Ngày</Option>
              <Option value="month">Tháng</Option>
              <Option value="year">Năm</Option>
            </Select>
            <DatePicker
              className={styles.input_noneBorder}
              style={{ width: "45%" }}
              picker={typeDateLineChart}
              onChange={(date, dateString) =>
                setDateLineChartValueFrom(dateString)
              }
              value={dayjs(dateLineChartValueFrom)}
            />
            <DatePicker
              className={styles.input_noneBorder}
              style={{ width: "45%" }}
              picker={typeDateLineChart}
              value={dayjs(dateLineChartValueTo)}
              onChange={(date, dateString) =>
                setDateLineChartValueTo(dateString)
              }
            />
            <Divider />
          </div>
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
          <div className={`${styles.bgWhite} ${styles.fixHeightDefault}`}>
            <Spin
              tip="Vui lòng chờ..."
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
                    <Option value="date">Ngày</Option>
                    <Option value="month">Tháng</Option>
                    <Option value="year">Năm</Option>
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
                    style={{ width: "10%" }}
                    icon={<CheckCircleOutlined />}
                  />
                </Col>

                <Col span={12}>
                  <Statistic
                    title={`Doanh thu ${dateValueFrom}`}
                    value={
                      billRevenueCompare.revenueFrom?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }) || 0
                    }
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={`Doanh thu ${dateValueTo}`}
                    value={
                      billRevenueCompare.revenueTo?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }) || 0
                    }
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
                <Col span={24} style={{ marginTop: "10px" }}>
                  <h2 style={{ margin: "10px 0" }}>
                    <RetweetOutlined /> Tốc độ tăng trưởng
                  </h2>
                  <Row className={styles.growthFrame}>
                    <Col span={12}>
                      <h3>
                        <EuroOutlined /> Doanh thu ngày
                      </h3>
                    </Col>
                    <Col span={12}>
                      <h3>
                        {growthStoreDayData?.revenue.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h3>
                    </Col>
                    {growthStoreDayData?.growthPercent < 0 ? (
                      <h3 style={{ color: "rgb(255, 77, 79)" }}>
                        <ArrowDownOutlined />
                        {Math.abs(growthStoreDayData?.growthPercent).toFixed(
                          2
                        ) + "%"}
                      </h3>
                    ) : (
                      <h3 style={{ color: "rgb(63, 134, 0)" }}>
                        <ArrowUpOutlined />
                        {Math.abs(growthStoreDayData?.growthPercent).toFixed(
                          2
                        ) + "%"}
                      </h3>
                    )}
                  </Row>
                  <Row className={styles.growthFrame}>
                    <Col span={12}>
                      <h3>
                        <EuroOutlined /> Doanh thu tháng
                      </h3>
                    </Col>
                    <Col span={12}>
                      <h3>
                        {growthStoreMonthData?.revenue.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h3>
                    </Col>
                    {growthStoreMonthData?.growthPercent < 0 ? (
                      <h3 style={{ color: "rgb(255, 77, 79)" }}>
                        <ArrowDownOutlined />
                        {Math.abs(growthStoreMonthData?.growthPercent).toFixed(
                          2
                        ) + "%"}
                      </h3>
                    ) : (
                      <h3 style={{ color: "rgb(63, 134, 0)" }}>
                        <ArrowUpOutlined />
                        {Math.abs(growthStoreMonthData?.growthPercent).toFixed(
                          2
                        ) + "%"}
                      </h3>
                    )}
                  </Row>
                  <Row className={styles.growthFrame}>
                    <Col span={12}>
                      <h3>
                        <EuroOutlined /> Doanh thu năm
                      </h3>
                    </Col>
                    <Col span={12}>
                      <h3>
                        {growthStoreYearData?.revenue.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h3>
                    </Col>
                    {growthStoreYearData?.growthPercent < 0 ? (
                      <h3 style={{ color: "rgb(255, 77, 79)" }}>
                        <ArrowDownOutlined />
                        {Math.abs(growthStoreYearData?.growthPercent).toFixed(
                          2
                        ) + "%"}
                      </h3>
                    ) : (
                      <h3 style={{ color: "rgb(63, 134, 0)" }}>
                        <ArrowUpOutlined />
                        {Math.abs(growthStoreYearData?.growthPercent).toFixed(
                          2
                        ) + "%"}
                      </h3>
                    )}
                  </Row>
                </Col>
              </Row>
            </Spin>
          </div>
        </Col>
        <Col span={16}>
          <div className={`${styles.bgWhite} ms-5`} style={{ height: "100%" }}>
            <h2>
              <UserOutlined /> Sản phẩm mua nhiều nhất
            </h2>
            <p style={{ fontWeight: 500, marginTop: "12px" }}>
              <ClockCircleOutlined /> Thời gian
            </p>
            <Select
              value={selectTypeDateProduct}
              onChange={(event) => {
                setDateProductSellTheMost(formattedDateYesterday);
                setDateProductSellTheMostTo(formattedDateNow);
                setSelectTypeDateproduct(event);
              }}
              style={{ width: "20%" }}
              bordered={false}
            >
              <Option value="date">Ngày</Option>
              <Option value="month">Tháng</Option>
              <Option value="year">Năm</Option>
              <Option value="other">Tùy chọn</Option>
            </Select>
            {selectTypeDateProduct === "other" ? (
              <div style={{ width: "80%", display: "inline-block" }}>
                <DatePicker
                  className={styles.input_noneBorder}
                  style={{ width: "50%" }}
                  picker={"date"}
                  value={dayjs(dateProductSellTheMost)}
                  onChange={(date, dateString) => {
                    setDateProductSellTheMost(dateString);
                  }}
                />
                <DatePicker
                  className={styles.input_noneBorder}
                  style={{ width: "50%" }}
                  picker={"date"}
                  value={dayjs(dateProductSellTheMostTo)}
                  onChange={(date, dateString) => {
                    setDateProductSellTheMostTo(dateString);
                  }}
                />
              </div>
            ) : (
              <DatePicker
                className={styles.input_noneBorder}
                style={{ width: "80%" }}
                picker={selectTypeDateProduct}
                value={dayjs(dateProductSellTheMostTo)}
                onChange={(date, dateString) => {
                  setDateProductSellTheMostTo(dateString);
                }}
              />
            )}
            <div style={{ margin: "20px 0" }}>
              <p style={{ fontWeight: 500, marginBottom: "12px" }}>
                <TableOutlined /> Danh sách sản phẩm
              </p>
              <TableProdutSellTheMost
                date={dateProductSellTheMost}
                dateToP={dateProductSellTheMostTo}
                type={selectTypeDateProduct}
              />
            </div>
          </div>
        </Col>
        <Col span={24}>
          <div
            className={`${styles.bgWhite}`}
            style={{ height: "100%", marginTop: "25px" }}
          >
            <h2>
              <CarOutlined /> Sản phẩm hoàn trả
            </h2>
            <p style={{ fontWeight: 500, marginTop: "12px" }}>
              <ClockCircleOutlined /> Thời gian
            </p>
            <Select
              value={selectTypeDateProductReturn}
              onChange={(event) => {
                setDateProductReturn(formattedDateYesterday);
                setDateProductReturnTo(formattedDateNow);
                setSelectTypeDateproductReturn(event);
              }}
              style={{ width: "20%" }}
              bordered={false}
            >
              <Option value="date">Ngày</Option>
              <Option value="month">Tháng</Option>
              <Option value="year">Năm</Option>
              <Option value="other">Tùy chọn</Option>
            </Select>
            {selectTypeDateProductReturn === "other" ? (
              <div style={{ width: "80%", display: "inline-block" }}>
                <DatePicker
                  className={styles.input_noneBorder}
                  style={{ width: "50%" }}
                  picker={"date"}
                  value={dayjs(dateProductReturn)}
                  onChange={(date, dateString) => {
                    setDateProductReturn(dateString);
                  }}
                />
                <DatePicker
                  className={styles.input_noneBorder}
                  style={{ width: "50%" }}
                  picker={"date"}
                  value={dayjs(dateProductReturnTo)}
                  onChange={(date, dateString) => {
                    setDateProductReturnTo(dateString);
                  }}
                />
              </div>
            ) : (
              <DatePicker
                className={styles.input_noneBorder}
                style={{ width: "80%" }}
                picker={selectTypeDateProductReturn}
                value={dayjs(dateProductReturnTo)}
                onChange={(date, dateString) => {
                  setDateProductReturnTo(dateString);
                }}
              />
            )}
            <div style={{ margin: "20px 0" }}>
              <Tabs
                defaultActiveKey={"1"}
                onChange={(e) => setReason(e)}
                items={[CheckCircleOutlined, ClockCircleOutlined].map(
                  (Icon, i) => {
                    const id = String(i + 1);
                    return {
                      label: (
                        <span style={{ padding: "20px" }}>
                          <Icon />
                          {id === "1" ? "Sản xuất" : "Khác"}
                        </span>
                      ),
                      key: id === "1" ? "PRODUCE" : "OTHER",
                      children: (
                        <div style={{ padding: "8px" }}>
                          <p style={{ fontWeight: 500, marginBottom: "12px" }}>
                            <TableOutlined /> Danh sách sản phẩm
                          </p>
                          <ProductReturns
                            date={dateProductReturn}
                            dateToP={dateProductReturnTo}
                            type={selectTypeDateProductReturn}
                            reason={reason}
                          />
                        </div>
                      ),
                    };
                  }
                )}
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StatisticalIndex;
