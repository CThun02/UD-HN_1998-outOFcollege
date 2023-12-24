import React, { useEffect, useState } from "react";
import styles from "./BillManagement.module.css";
import {
  Badge,
  Button,
  Input,
  Select,
  Table,
  Tabs,
  Tag,
  notification,
} from "antd";
import {
  CarOutlined,
  CarTwoTone,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  FilterFilled,
  SearchOutlined,
  ShoppingOutlined,
  TableOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { getToken } from "../../../service/Token";
import numeral from "numeral";
import SockJs from "../../../service/SockJs";
import locale from 'antd/lib/locale/vi_VN'; // Import Ant Design Vietnamese locale
const { RangePicker } = DatePicker;

const BillManagement = () => {
  const [billCode, setBillCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [symbol, setSymbol] = useState("");
  const [createdBy, setcreatedBy] = useState("");
  const [billType, setBillType] = useState("");
  const [count, setCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filterStatus, setFilterStatus] = useState(null);

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setStartDate(dateStrings[0]);
      setEndDate(dateStrings[1]);
    } else {
      setStartDate(null);
      setEndDate(null);
    }
  };

  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const columns = [
    {
      key: "stt",
      dataIndex: "index",
      title: "#",
      width: 70,
      render: (text, record, index) => {
        return (
          <span id={record.id}>
            {(currentPage - 1) * pageSize + (index + 1)}
          </span>
        );
      },
    },
    {
      title: "Mã",
      dataIndex: "billCode",
      key: "code",
    },
    {
      title: "Tên nhân viên",
      key: "employee",
      render: (_, record) => {
        return record.employee?.includes("_") ? (
          <span>
            {record.employee?.substring(record.employee.indexOf("_") + 1)}{" "}
            <br />
            {record.employee?.substring(0, record.employee.indexOf("_"))}
          </span>
        ) : record.status === "Cancel" ? (
          "Đã hủy"
        ) : (
          "Chờ xác nhận"
        );
      },
    },
    {
      title: "Tên khách hàng",
      key: "fullName",
      render: (text, record) => {
        let colorAccount = record.accountName ? "green" : "geekblue";
        return (
          <Space direction="vertical" style={{ width: "auto" }}>
            <div style={{ display: "block" }}>
              <div>
                {record.fullName ? record.fullName : record.accountName}
              </div>
              <Tag color={colorAccount}>
                {record.accountName ? "Thành viên" : "khách lẻ"}
              </Tag>
            </div>
          </Space>
        );
      },
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (text, record) => {
        return record.accountPhoneNumber
          ? record.accountPhoneNumber
          : record.phoneNumber;
      },
    },
    {
      title: "Tổng tiền",
      key: "totalPrice",
      render: (text, record) => {
        return (
          numeral(
            record.totalPrice + record.shipPrice < 0
              ? 0
              : record.totalPrice + record.shipPrice
          ).format("0,0") + "đ"
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate) => {
        return createdDate;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (object) => {
        let color =
          object === "Unpaid"
            ? "geekblue"
            : object === "Paid"
              ? "green"
              : object === "Cancel"
                ? "red"
                : object === "Complete"
                  ? "green"
                  : object === 'ReturnS' ? "warning" : '';
        return (
          <Space direction="vertical">
            <div style={{ width: "auto", display: "flex" }}>
              <Tag color={color}>
                {object === "Unpaid"
                  ? "Chưa thanh toán"
                  : object === "Cancel"
                    ? "Đã hủy"
                    : object === "Complete"
                      ? "Đã hoàn thành"
                      : object === 'ReturnS' ? 'Trả hàng'
                        : "Đã thanh toán"}
              </Tag>
            </div>
          </Space>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => {
        return (
          <Link
            to={
              filterStatus === "ReturnS"
                ? `/api/admin/return/return-bill/${record.billCode}/bill`
                : `/api/admin/counter-sales/${record.billId}/timeline`
            }
          >
            <Button>
              <EyeOutlined />
            </Button>
          </Link>
        );
      },
    },
  ];
  const [countBill, setCountBill] = useState({});

  const fetchData = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:8080/api/admin/bill?billCode=${billCode}&startDate=${startDate}&endDate=${endDate}&status=${status}&createdBy=${createdBy}&symbol=${symbol}&count=${count}&billType=${billType}`,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        const status = error.response?.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        setLoading(false);
      });

    axios
      .get(
        `http://localhost:8080/api/client/countBill?billType=${billType}&startDate=${startDate}&endDate=${endDate}`
      )
      .then((response) => setCountBill(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    billCode,
    startDate,
    endDate,
    status,
    createdBy,
    symbol,
    count,
    billType,
  ]);

  const onChangeBill = (e) => {
    setFilterStatus(e);
    if (e === "") {
      setStatus("");
      setcreatedBy("");
      setSymbol("");
      setCount("");
    } else if (e === "Client") {
      setcreatedBy("CLIENT");
      setStatus("");
      setSymbol("");
      setCount("");
    } else if (e === "Shipping") {
      setStatus("");
      setcreatedBy("");
      setSymbol("Shipping");
      setCount(3);
    } else if (e === "Confirmed") {
      setStatus("");
      setcreatedBy("");
      setSymbol("Shipping");
      setCount(2);
    } else if (e === "ReturnS") {
      setStatus(e);
      setcreatedBy("");
      setSymbol("");
      setCount("");
    } else {
      setStatus(e);
      setcreatedBy("");
      setSymbol("");
      setCount("");
    }
  };

  return (
    <div>
      <SockJs connectTo={"new-bill-topic"} setValues={setData} />
      <section className={styles.filter}>
        <h1 style={{ textAlign: "center" }}>
          <ShoppingOutlined /> Quản lý hóa đơn
        </h1>
        <h2 style={{ marginBottom: "10px" }}>
          <FilterFilled /> Bộ lọc
        </h2>
        <div>
          <span style={{ fontWeight: 500 }}>Ngày tạo</span>
          <RangePicker
            className={styles.filter_inputSearch}
            presets={rangePresets}
            onChange={onRangeChange}
            locale={locale}
            placeholder={['Ngày bắt đầu', 'Ngày kết thúc']}
          />
          <span style={{ margin: "0 20px", fontWeight: 500 }}>
            Loại hóa đơn
            <Select
              bordered={false}
              style={{ width: "12%", borderBottom: "1px solid #ccc" }}
              onChange={(e) => {
                setBillType(e);
              }}
              defaultValue={""}
            >
              <Select.Option value={""}>Tất cả</Select.Option>
              <Select.Option value={"In-Store"}>Tại quầy</Select.Option>
              <Select.Option value={"Online"}>Online</Select.Option>
            </Select>
          </span>
        </div>
        <div style={{ width: "400px", marginTop: "20px" }}>
          <Input
            className={styles.filter_inputSearch}
            size="large"
            placeholder="Tìm kiếm hóa đơn"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              setBillCode(e.target.value);
            }}
          />
        </div>
      </section>

      <section className={styles.content}>
        <h2 style={{ marginBottom: "10px" }}>
          <TableOutlined /> Danh sách hóa đơn
        </h2>
        <Tabs
          defaultActiveKey={status}
          onChange={(e) => onChangeBill(e)}
          items={[
            CheckCircleOutlined,
            ClockCircleOutlined,
            CheckCircleOutlined,
            CarOutlined,
            CheckCircleOutlined,
            CloseCircleOutlined,
            CheckCircleOutlined,
            ClockCircleOutlined,
            ClockCircleOutlined,
          ].map((Icon, i) => {
            const id = String(i + 1);
            return {
              label: (
                <Badge
                  showZero
                  count={
                    id === "1"
                      ? countBill.countAll
                      : id === "2"
                        ? countBill.countConfirmW
                        : id === "3"
                          ? countBill.countConfirmS
                          : id === "4"
                            ? countBill.shipping
                            : id === "5"
                              ? countBill.complete
                              : id === "6"
                                ? countBill.cancel
                                : id === "7"
                                  ? countBill?.paid
                                  : id === "8"
                                    ? countBill?.unpaid
                                    : id === "9"
                                      ? countBill.returnS
                                      : null
                  }
                >
                  <span style={{ padding: "20px" }}>
                    <Icon />
                    {id === "1"
                      ? "Tất cả"
                      : id === "2"
                        ? "Chờ xác nhận"
                        : id === "3"
                          ? "Chờ giao hàng"
                          : id === "4"
                            ? "Đang giao"
                            : id === "5"
                              ? "Đã hoàn thành"
                              : id === "6"
                                ? "Đã hủy"
                                : id === "7"
                                  ? "Đã thanh toán"
                                  : id === "8"
                                    ? "Chưa thanh toán"
                                    : id === "9"
                                      ? "Trả hàng"
                                      : ""}
                  </span>
                </Badge>
              ),
              key:
                id === "1"
                  ? ""
                  : id === "2"
                    ? "Client"
                    : id === "3"
                      ? "Confirmed"
                      : id === "4"
                        ? "Shipping"
                        : id === "5"
                          ? "Complete"
                          : id === "6"
                            ? "Cancel"
                            : id === "7"
                              ? "Paid"
                              : id === "8"
                                ? "Unpaid"
                                : id === "9"
                                  ? "ReturnS"
                                  : "",
              children: (
                <div style={{ padding: "8px" }}>
                  <span style={{ fontWeight: 500 }}>
                    <TableOutlined />
                  </span>
                  <Table
                    style={{ marginTop: "10px" }}
                    dataSource={data}
                    columns={columns}
                    loading={loading}
                    loadingIndicator={<div>Vui lòng chờ...</div>}
                    pagination={{
                      showSizeChanger: true,
                      pageSizeOptions: [5, 10, 15, 20],
                      defaultPageSize: 5,
                      showLessItems: true,
                      style: { marginRight: "10px" },
                      onChange: (currentPage, pageSize) => {
                        setCurrentPage(currentPage);
                        setPageSize(pageSize);
                      },
                    }}
                  />
                </div>
              ),
            };
          })}
        />
      </section>
    </div>
  );
};

export default BillManagement;
