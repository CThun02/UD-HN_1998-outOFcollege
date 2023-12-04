import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, Space, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import Avatar from "antd/es/avatar/avatar";
function CustomerTable(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  let roleId = props.roleId;

  const navigate = useNavigate();

  const handleOpenSecondModal = async (customer) => {
    navigate(
      `/api/admin/${roleId === 1 ? "employee" : "customer"}/detail/${customer}`
    );
  };

  return (
    <div className="m-5">
      <Table
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
        dataSource={
          props.data &&
          props.data.map((record, index) => ({
            ...record,
            key: index,
          }))
        }
        columns={[
          {
            title: "#",
            dataIndex: "index",
            key: "index",
            render: (text, record, index) => {
              return (currentPage - 1) * pageSize + index + 1;
            },
          },

          {
            title: "Ảnh",
            dataIndex: "avatar",
            key: "avatar",
            render: (_, image) => (
              <>
                <Avatar
                  src={
                    image.image
                      ? image.image
                      : "https://img.freepik.com/premium-vector/camera-with-plus-sign-icon_625445-191.jpg?w=2000"
                  }
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 5px 25px 0px",
                  }}
                  size={70}
                />
              </>
            ),
          },
          {
            title: "Họ và tên",
            dataIndex: "fullName",
            key: "username",
          },
          {
            title: "Giới Tính",
            dataIndex: "gender",
            key: "gender",
            render: (_, record) => (record.gender === true ? "nam" : "nữ"),
          },
          {
            title: "Số điện thoại",
            dataIndex: "phoneNumber",
            key: "phoneNumber",
          },

          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Action",
            key: "action",
            render: (_, customer) => (
              <Space size="middle">
                <Button
                  type="primary"
                  onClick={() => handleOpenSecondModal(customer.username)}
                  size="large"
                >
                  <EyeOutlined />
                </Button>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
}
export default CustomerTable;
