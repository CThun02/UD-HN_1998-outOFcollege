import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, Space, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "antd/es/avatar/avatar";
function CustomerTable(props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  let roleId = props.roleId;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/account/viewAll?roleId=" + roleId)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [roleId]);

  const navigate = useNavigate();

  const handleOpenSecondModal = async (customer) => {
    navigate(
      `/admin/${roleId === 1 ? "employee" : "customer"}/detail/${customer}`
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
        }}
        dataSource={
          data &&
          data.map((record, index) => ({
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
              return (currentPage - 1) * 5 + index + 1;
            },
          },

          {
            title: "Ảnh",
            dataIndex: "avatar",
            key: "avatar",
            render: (_, image) => (
              <>
                <Avatar
                  src={image.image}
                  style={{
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 5px 25px 0px",
                  }}
                  size={70}
                />
              </>
            ),
          },
          {
            title: "Tên Khách Hàng",
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
                  type="link"
                  onClick={() => handleOpenSecondModal(customer.username)}
                  icon={<EyeOutlined />}
                ></Button>
              </Space>
            ),
          },
        ]}
      />
    </div>
  );
}
export default CustomerTable;
