import React, { useEffect, useState } from "react";
import styles from "./BillManagement.module.css";
import { Button, Input, Select, Table, Tabs, Tag, TreeSelect, notification } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  FilterFilled,
  SearchOutlined,
  TableOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { getToken } from "../../../service/Token";
import numeral from "numeral";
const { RangePicker } = DatePicker;

const BillManagement = () => {
  const [billCode, setBillCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");
  const [symbol, setSymbol] = useState('')
  const [billType, setBillType] = useState("");
  const [createdBy, setcreatedBy] = useState("");
  const [count, setCount] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

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
      // dataIndex: "employee",
      key: "employee",
      render: (_, record) => {
        return record.employee?.includes('_') ?
          <span>
            {record.employee?.substring(record.employee.indexOf("_") + 1)} <br />
            {record.employee?.substring(0, record.employee.indexOf("_"))}
          </span> :
          record.status === 'Cancel' ? "Đã hủy" : "Chờ xác nhận";
      }
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
                {record.accountName ? record.accountName : record.fullName}
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
            record.totalPrice + record.shipPrice - record?.priceReduce
          ).format("0,0") + "đ"
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate) => {
        return moment(new Date(...createdDate)).format("HH:mm:ss DD/MM/YYYY");
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
                : object === "Complete" ? "green" : null;
        return (
          <Space direction="vertical">
            <div style={{ width: "auto", display: "flex" }}>
              <Tag color={color}>
                {object === "Unpaid"
                  ? "Chưa thanh toán"
                  : object === "Cancel"
                    ? "Đã hủy"
                    : object === "Complete" ? "Đã hoàn thành"
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
          <Link to={`/api/admin/counter-sales/${record.billId}/timeline`}>
            <Button>
              <EyeOutlined />
            </Button>
          </Link>
        );
      },
    },
  ];

  const fetchData = () => {
    setLoading(true);
    const params = {
      billCode: billCode,
      startDate: startDate,
      endDate: endDate,
      status: status,
      symbol: symbol,
      count: count,
      createdBy: createdBy,
    };
    console.log(params);
    axios
      .get(`http://localhost:8080/api/admin/bill?billCode=${billCode}&startDate=${startDate}&endDate=${endDate}&status=${status}&createdBy=${createdBy}&symbol=${symbol}&count=${count}`, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        setLoading(false);
      });
  };

  const treeData = [
    {
      value: "",
      title: "Tất cả",
    },
    {
      value: "In-store",
      title: "Tại quầy",
      children: [
        {
          value: "Shipping",
          title: "Giao hàng",
        },
        {
          value: "Received",
          title: "Đã nhận",
        },
      ],
    },
    {
      value: "Online",
      title: "Online",
    },
  ];

  const [value, setValue] = useState();
  const onChange = (newValue) => {
    setValue(newValue);
    if (newValue === "Shipping" || newValue === "Received") {
      setBillType("In-store");
      setcreatedBy(newValue);
    } else {
      setcreatedBy("");
      setBillType(newValue);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [billCode, startDate, endDate, status, createdBy, symbol, count]);

  const onChangeBill = (e) => {
    console.log(e)
    if (e === '') {
      setStatus('')
      setcreatedBy('')
      setSymbol('')
      setCount('')
    } else if (e === 'Client') {
      setcreatedBy('CLIENT');
      setStatus("")
      setSymbol('')
      setCount('')
    } else if (e === 'Shipping') {
      setStatus('')
      setcreatedBy('')
      setSymbol('Shipping')
      setCount(3)
    } else if (e === 'Confirmed') {
      setStatus('')
      setcreatedBy('')
      setSymbol('Shipping')
      setCount(2)
    } else {
      setStatus(e);
      setcreatedBy("")
      setSymbol('')
      setCount('')
    }
  }

  return (
    <div>
      <section className={styles.filter}>
        <h2 style={{ marginBottom: "10px" }}>
          <FilterFilled /> Bộ lọc
        </h2>

        <div>
          <span style={{ fontWeight: 500 }}>Ngày tạo</span>
          <RangePicker
            className={styles.filter_inputSearch}
            presets={rangePresets}
            onChange={onRangeChange}
          />
          <span style={{ margin: "0 20px", fontWeight: 500 }}>
            Trạng thái
            <Select
              bordered={false}
              style={{ width: "12%", borderBottom: "1px solid #ccc" }}
              onChange={(e) => {
                setStatus(e);
              }}
              defaultValue={""}
            >
              <Select.Option value={""}>Tất cả</Select.Option>
              <Select.Option value={"Unpaid"}>Chưa thanh toán</Select.Option>
              <Select.Option value={"Paid"}>Đã thanh toán</Select.Option>
              <Select.Option value={"Cancel"}>Đã huỷ</Select.Option>
            </Select>
          </span>
          <span style={{ fontWeight: 500 }}>
            Loại hóa đơn
            <TreeSelect
              showSearch
              style={{
                width: "16%",
                borderBottom: "1px solid #ccc",
              }}
              bordered={false}
              value={value}
              dropdownStyle={{
                maxHeight: 500,
                overflow: "auto",
              }}
              defaultValue={""}
              placeholder=""
              treeDefaultExpandAll
              onChange={onChange}
              treeData={treeData}
            />
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
          onChange={(e) => onChangeBill(e)
          }
          items={[
            CheckCircleOutlined,
            CloseCircleOutlined,
            ClockCircleOutlined,
            ClockCircleOutlined,
            ClockCircleOutlined,
            ClockCircleOutlined,
            ClockCircleOutlined,
            ClockCircleOutlined,
          ].map((Icon, i) => {
            const id = String(i + 1);
            return {
              label: (
                <span>
                  <Icon />
                  {id === "1" ? "Tất cả"
                    : id === "2" ? "Chờ xác nhận"
                      : id === '3' ? "Đã xác nhận"
                        : id === "4" ? "Đang giao"
                          : id === "5" ? "Đã hoàn thành"
                            : id === "6" ? "Đã hủy"
                              : id === '7' ? "Đã thanh toán"
                                : id === "8" ? "Chưa thanh toán" : ""}

                </span>
              ),
              key: id === "1" ? ""
                : id === "2" ? "Client"
                  : id === '3' ? "Confirmed"
                    : id === "4" ? "Shipping"
                      : id === "5" ? "Complete"
                        : id === "6" ? "Cancel"
                          : id === "7" ? "Paid"
                            : id === "8" ? "Unpaid" : '',
              children: (
                <div style={{ padding: "8px" }}>
                  <span style={{ fontWeight: 500 }}>
                    <TableOutlined /> Danh sách yêu cầu
                  </span>
                  <Table
                    style={{ marginTop: "10px" }}
                    dataSource={data}
                    columns={columns}
                    loading={loading}
                    loadingIndicator={<div>Loading...</div>}
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
