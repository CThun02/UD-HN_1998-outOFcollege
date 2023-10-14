import React from "react";
import { FormOutlined, DeleteFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Space, Pagination, Button, Row, Col, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import styles from "./MaterialStyle.module.css";
import axios from "axios";

const MaterialTable = function (props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/material")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Thực hiện các thao tác liên quan đến trang hiện tại, ví dụ: lấy dữ liệu mới từ API
    fetchData(page - 1);
  };
  const fetchData = (page) => {
    axios
      .get(`http://localhost:8080/api/admin/material`)
      .then((response) => {
        setData(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <Table
        pagination={false}
        dataSource={data}
        columns={[
          {
            title: "STT",
            dataIndex: "id",
            key: "id",
            render: (_, record) => {
              return (currentPage - 1) * 5 + data.indexOf(record) + 1;
            },
          },

          {
            title: "Chất liệu",
            dataIndex: "materialName",
            key: "materialName",
          },
          {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
          },
          {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
          },
          {
            title: "Người Tạo",
            dataIndex: "createdBy",
            key: "createdBy",
          },
          {
            title: "Action",
            key: "action",
            render: () => (
              <Space size="middle">
                <Button
                  className={styles.btnDetails}
                  type="link"
                  onClick=""
                  icon={<FormOutlined />}
                />
                <Button
                  className={styles.btnDetails}
                  type="link"
                  onClick=""
                  icon={<DeleteFilled />}
                />
              </Space>
            ),
          },
        ]}
      />
      <div>
        <Row justify="center">
          <Col span={12} offset={3}>
            <div className={styles.page}>
              <>
                <Pagination
                  current={currentPage}
                  onChange={handlePageChange}
                  total={100} // Tổng số trang
                  pageSize={5} // Số mục hiển thị trên mỗi trang
                />
              </>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default MaterialTable;
