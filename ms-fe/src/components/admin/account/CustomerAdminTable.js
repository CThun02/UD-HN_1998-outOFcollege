import React from "react";
import { Table, Space, Pagination, FloatButton, Button, Row, Col } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import style from "./styles/CustomerIndex.module.css";
import axios from "axios";

function CustomerTable() {
  const dataSource = [
    {
      key: "1",
      stt: 1,
      image: "https://example.com/image1.jpg",
      name: "Đại Ka Kiên Của Thằng An Nguu",
      gender: "Nam",
      createdDate: "2023-09-15",
    },
    {
      key: "2",
      stt: 2,
      image: "https://example.com/image2.jpg",
      name: "An Sẽ Gầy Thôi",
      gender: "Nữ",
      createdDate: "2023-09-14",
    },
  ];
  // const fetchData = useEffect(() => {
  //   axios
  //     .get("/api/data")
  //     .then((response) => {
  //       setDataSource(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);
  return (
    <div>
      <Table
        pagination={false}
        dataSource={dataSource}
        columns={[
          {
            title: "STT",
            dataIndex: "stt",
            key: "id",
          },
          {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (image) => (
              <img
                className={style.picture}
                src={image}
                alt="Avatar"
                style={{ width: "50px", height: "50px" }}
              />
            ),
          },
          {
            title: "Tên Khách Hàng",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Giới Tính",
            dataIndex: "gender",
            key: "gender",
          },
          {
            title: "Ngày Tạo",
            dataIndex: "createdDate",
            key: "createdDate",
          },
          {
            title: "Trạng Thái",
            dataIndex: "status",
            key: "status",
            render: (status) => <button></button>,
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button>
                  <FormOutlined />
                </Button>
              </Space>
            ),
          },
        ]}
      />
      <div className="">
        <Row justify="center">
          <Col span={12} offset={6}>
            <div className={style.page}>
              <>
                <Pagination simple defaultCurrent={1} total={2} />
              </>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default CustomerTable;
