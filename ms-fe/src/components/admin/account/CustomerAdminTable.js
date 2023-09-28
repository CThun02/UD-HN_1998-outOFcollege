import React from "react";
import { useNavigate } from "react-router-dom";
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
import {
  HighlightOutlined,
  PlusOutlined,
  EyeOutlined,
  FileOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import style from "./styles/Customerlndex.module.css";
import axios from "axios";
function CustomerTable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [form] = Form.useForm();
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthdate, setBirthdate] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/account/api/viewAll")
      .then((response) => {
        setData(response.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleAddAccount = () => {
    navigate("/admin/employee/create");
  };
  const handleAddAccount1 = () => {
    navigate("/admin/employee/detail");
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Thực hiện các thao tác liên quan đến trang hiện tại, ví dụ: lấy dữ liệu mới từ API
    fetchData(page - 1);
  };
  const fetchData = (page) => {
    // Gửi yêu cầu API để lấy dữ liệu cho trang `page`
    // Sau khi nhận được dữ liệu mới, bạn có thể cập nhật state hoặc thực hiện các thao tác khác
    axios
      .get(`http://localhost:8080/account/api/viewAll?page=${page}`)
      .then((response) => {
        setData(response.data.content);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleDeleteCustomer = (username) => {
    // Gửi yêu cầu xóa dữ liệu đến API
    axios
      .delete(`http://localhost:8080/account/api/delete/${username}`)
      .then((response) => {
        // Xóa thành công, tải lại dữ liệu từ API
        fetchData(currentPage - 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOpenSecondModal = (customer) => {
    setName(customer.fullName);
    setGender(customer.gender ? "Nam" : "Nữ");
    setBirthdate(customer.creatAt);
  };

  const onFinish = async (values) => {
    values.idRole = 1;
    console.log(values);
    // Xử lý khi gửi form thành công
    try {
      // Gửi yêu cầu POST đến API
      const response = await axios.post(
        "http://localhost:8080/account/api/create",
        values
      );
      console.log(response.data); // Đây là phản hồi từ API
    } catch (error) {
      console.error(error);
    }
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
                  onClick={handleAddAccount1}
                  icon={<EyeOutlined />}
                ></Button>
              </Space>
            ),
          },
        ]}
      />
      <div className="">
        <Row align="bottom" className={style.btnCRUD}>
          <Col span={2} offset={1}>
            <Button className={style.faPlus} onClick={handleAddAccount}>
              <span>
                <PlusOutlined />
              </span>
            </Button>
          </Col>
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
