import {
  CarOutlined,
  FilterFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  TableOutlined,
  EyeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Space, Table, Tabs, Tag, notification } from "antd";
import Input from "antd/es/input/Input";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styles from "./ReturnIndex.module.css";
import { getToken } from "../../../service/Token";
import { Link } from "react-router-dom";

const ReturnIndex = () => {
  const api = "http://localhost:8080/api/admin/bill";
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [status, setStatus] = useState("RETURNS");
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
      key: "customerName",
      render: (text, record) => {
        let colorAccount = record.customerName ? "green" : "geekblue";
        return (
          <Space direction="vertical" style={{ width: "auto" }}>
            <div style={{ display: "block" }}>
              <div>
                {record.customerName ? record.customerName : record.fullName}
              </div>
              <Tag color={colorAccount}>
                {record.customerName ? "Thành viên" : "khách lẻ"}
              </Tag>
            </div>
          </Space>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => {
        return createdAt;
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(api + "/getReturnRequestByStatus?status=" + status, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setData(response.data);
      })
      .catch((err) => {
        console.log(err)
        const status = err.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
  }, [status]);

  return (
    <>
      <div className={styles.returnIndex}>
        <h2>
          <FilterFilled /> Bộ lọc
        </h2>
        <div style={{ width: "400px", margin: "20px 0" }}>
          <Input
            className={styles.filter_inputSearch}
            size="large"
            placeholder="Tìm kiếm hóa đơn"
            prefix={<SearchOutlined />}
            onChange={(e) => { }}
          />
        </div>
      </div>
      <div className={styles.returnIndex} style={{ marginTop: "25px" }}>
        <h2>
          <CarOutlined /> Yêu cầu trả hàng
        </h2>
        <Tabs
          defaultActiveKey={status}
          onChange={(e) => setStatus(e)}
          items={[
            CheckCircleOutlined,
            CloseCircleOutlined,
            ClockCircleOutlined,
          ].map((Icon, i) => {
            const id = String(i + 1);
            return {
              label: (
                <span>
                  <Icon />
                  {id === "1"
                    ? "Thành công"
                    : id === "2"
                      ? "Đã hủy"
                      : "Đang đợi"}
                </span>
              ),
              key: id === "1" ? "RETURNS" : id === "2" ? "RETURNC" : "RETURNW",
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
      </div>
    </>
  );
};

export default ReturnIndex;
