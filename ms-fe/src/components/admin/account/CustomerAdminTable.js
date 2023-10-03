import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import DetailForm from "./DetailForm";
import {
  Table,
  Space,
  Pagination,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Radio,
} from "antd";
import { EyeOutlined, FileOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import style from "./styles/Customerlndex.module.css";

import axios from "axios";
function CustomerTable(props) {
  const [selectedUsername, setSelectedUsername] = useState({});
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  let roleId = props.roleId;

  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/account/viewAll")
      .then((response) => {
        setData(response.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Thực hiện các thao tác liên quan đến trang hiện tại, ví dụ: lấy dữ liệu mới từ API
    fetchData(page - 1);
  };
  const fetchData = (page) => {
    // Gửi yêu cầu API để lấy dữ liệu cho trang `page`
    // Sau khi nhận được dữ liệu mới, bạn có thể cập nhật state hoặc thực hiện các thao tác khác
    axios
      .get(`http://localhost:8080/api/admin/account/viewAll?page=${page}`)
      .then((response) => {
        setData(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOpenSecondModal = async (customer) => {
    navigate(
      `/admin/${roleId === 1 ? "employee" : "customer"}/detail/${customer}`
    );
  };

  return (
    <div>
      <Table
        pagination={false}
        dataSource={data}
        columns={[
          {
            title: "STT",
            dataIndex: "stt",
            key: "id",
            render: (_, record) => {
              return data.indexOf(record) + 1;
            },
          },

          {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (_, image) => (
              <img
                src={image.image}
                className={style.picture}
                alt="Avatar"
                style={{ width: "50px", height: "50px" }}
              />
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
            title: "Ngày Sinh",
            dataIndex: "creatAt",
            key: "createdDate",
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

      <div className="">
        <Row align="bottom" className={style.btnCRUD}>
          <Col span={2} className="">
            <Button className={style.faEye}>
              <span>
                <FileOutlined />
              </span>
            </Button>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={12} offset={6}>
            <div className={style.page}>
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
}
export default CustomerTable;
