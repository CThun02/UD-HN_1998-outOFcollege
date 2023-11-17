import React, { useEffect, useState } from "react";
import styles from "./BillManagement.module.css";
import { Button, Input, Select, Table, Tag, TreeSelect } from "antd";
import {
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
  const [billType, setBillType] = useState("");
  const [symbol, setSymbol] = useState("");
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
      dataIndex: "employee",
      key: "employee",
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
            : object.toLocaleLowerCase() === "PAID".toLocaleLowerCase()
            ? "green"
            : object === "Cancel"
            ? "red"
            : null;
        return (
          <Space direction="vertical">
            <div style={{ width: "auto", display: "flex" }}>
              <Tag color={color}>
                {object === "Unpaid"
                  ? "Chưa thanh toán"
                  : object === "Cancel"
                  ? "Đã hủy"
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
      billType: billType,
      symbol: symbol,
    };
    console.log(params);
    axios
      .get(`http://localhost:8080/api/admin/bill`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
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
      setSymbol(newValue);
    } else {
      setSymbol("");
      setBillType(newValue);
    }
  };

  useEffect(() => {
    fetchData();
  }, [billCode, startDate, endDate, status, billType, symbol]);

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
            {/* <Select
                            style={{ width: '12%', borderBottom: '1px solid #ccc' }}
                            onChange={(e) => {
                                setBillType(e);
                            }}
                            bordered={false}
                            defaultValue={''}
                        >
                            <Select.Option value={''}>Tất cả</Select.Option>
                            <Select.Option value={'In-store'}>Tại quầy</Select.Option>
                            <Select.Option value={'Online'}>Online</Select.Option>
                        </Select> */}
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
        <Table
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
      </section>
    </div>
  );
};

export default BillManagement;
