import {
  CarOutlined,
  FilterFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  TableOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Button, Space, Table, Tabs, Tag } from "antd";
import Link from "antd/es/typography/Link";
import moment from "moment";
import numeral from "numeral";
import React, { useState } from "react";
import styles from "./ReturnIndex.module.css";

const ReturnIndex = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
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
  return (
    <>
      <div className={styles.returnIndex}>
        <h2>
          <FilterFilled /> Bộ lọc
        </h2>
      </div>
      <div className={styles.returnIndex} style={{ marginTop: "25px" }}>
        <h2>
          <CarOutlined /> Yêu cầu trả hàng
        </h2>
        <Tabs
          defaultActiveKey="2"
          onChange={(e) => console.log(e)}
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
              key: id,
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
