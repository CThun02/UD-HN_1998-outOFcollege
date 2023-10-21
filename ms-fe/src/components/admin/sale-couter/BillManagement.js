import React, { useEffect, useState } from "react";
import styles from "./BillManagement.module.css";
import { Button, Input, Select, Table, Tag, TreeSelect } from "antd";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
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

  const columns = [
    {
      title: "#",
      key: "index",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Mã",
      dataIndex: "billCode",
      key: "code",
    },
    {
      title: "Tổng sản phẩm",
      dataIndex: "totalQuantity",
      key: "totalQuantity",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
      key: "fullname",
      render: (fullname) => {
        return fullname || "Khách lẻ";
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (createdDate) => {
        return moment(createdDate).format(` HH:mm:ss DD/MM/YYYY`);
      },
    },
    {
      title: "Loại hóa đơn",
      dataIndex: "symbol",
      key: "symbol",
      render: (object) => {
        let color =
          object.toLocaleLowerCase() === "Shipping".toLocaleLowerCase()
            ? "geekblue"
            : object.toLocaleLowerCase() === "Received".toLocaleLowerCase()
            ? "green"
            : null;
        return (
          <Space direction="vertical">
            <div style={{ width: "auto", display: "flex" }}>
              <Tag color={color}>{object}</Tag>
            </div>
          </Space>
        );
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (object) => {
        let color =
          object === "ACTIVE"
            ? "geekblue"
            : object.toLocaleLowerCase() === "PAID".toLocaleLowerCase()
            ? "green"
            : object === "cancel"
            ? "red"
            : null;
        return (
          <Space direction="vertical">
            <div style={{ width: "auto", display: "flex" }}>
              <Tag color={color}>
                {object === "ACTIVE"
                  ? "Chưa thanh toán"
                  : object === "cancel"
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
          <Link to={`/admin/counter-sales/${record.billId}/timeline`}>
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
        params: params,
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
        <div style={{ width: "400px", marginBottom: "20px" }}>
          <Input
            size="large"
            placeholder="Tìm kiếm hóa đơn"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              setBillCode(e.target.value);
            }}
          />
        </div>
        <div>
          <Space direction="vertical" size={12}>
            <RangePicker presets={rangePresets} onChange={onRangeChange} />
          </Space>
          <span style={{ margin: "0 20px" }}>
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
              <Select.Option value={"active"}>Chưa thanh toán</Select.Option>
              <Select.Option value={"paid"}>Đã thanh toán</Select.Option>
              <Select.Option value={"cancel"}>Đã huỷ</Select.Option>
            </Select>
          </span>
          <span>
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
      </section>

      <section className={styles.content}>
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
          }}
        />
      </section>
    </div>
  );
};

export default BillManagement;
