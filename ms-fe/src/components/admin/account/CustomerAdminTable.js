import React from "react";
import { FormOutlined } from "@ant-design/icons";
import QRScanner from "./QRScanner";
import { useNavigate, useParams } from "react-router-dom";
import DetailForm from "./DetailForm";
import { Table, Space, Pagination, Button, Row, Col, Form, Modal } from "antd";
import { FileOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import style from "./styles/CustomerIndex.module.css";
import axios from "axios";
import Avatar from "antd/es/avatar/avatar";
function CustomerTable(props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [form] = Form.useForm();
  const [name, setName] = useState(null);
  const [gender, setGender] = useState(null);
  const [birthdate, setBirthdate] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  let roleId = props.roleId;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/account/viewAll")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleAddAccount = () => {
    navigate(`/admin/${roleId === 1 ? "employee" : "customer"}/create`);
  };
  const handleAddAccount1 = () => {
    navigate(`/admin/${roleId === 1 ? "employee" : "customer"}/detail`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Thực hiện các thao tác liên quan đến trang hiện tại, ví dụ: lấy dữ liệu mới từ API
    fetchData(page - 1);
  };
  const fetchData = (page) => {
    if (roleId) {
      axios
        .get(
          `http://localhost:8080/api/admin/account/viewAll?page=${page}&roleId=${roleId}`
        )
        .then((response) => {
          setData(response.data.content);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const fetchCustomerData = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/admin/account/detail/${username}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer data:", error);
      return null;
    }
  };
  const handleOpenSecondModal1 = async (customer) => {
    try {
      const customerData = await fetchCustomerData(customer.username);
      if (customerData) {
        setSelectedCustomer(customerData);
      }
    } catch (error) {
      console.error("Error retrieving customer data:", error);
    }
  };

  const handleOpenSecondModal = (customer) => {
    setName(customer.fullName);
    setGender(customer.gender ? "Nam" : "Nữ");
    setBirthdate(customer.creatAt);
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
                    className={style.btnDetails}
                    type="link"
                    onClick={handleAddAccount1}
                    icon={<FormOutlined />}
                  ></Button>
                </Space>
              ),
            },
          ]}
        />
        {/* <Modal
  visible={!!selectedCustomer}
  onCancel={() => setSelectedCustomer(null)}
  footer={null}
>
  {selectedCustomer && (
    <DetailForm customer={selectedCustomer} />
  )}
</Modal> */}
        <div className="">
          <Row align="bottom" className={style.btnCRUD}>
            <Col span={2} className="">
              <Button
                className={style.faEye}
                onClick={"handleOpenQRScannerModal"}
              >
                <span>
                  <FileOutlined />
                </span>
              </Button>
            </Col>
          </Row>
          <Row justify="center">
            <Col span={12} offset={3}>
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
        <Modal
          visible={"showQRScannerModal"}
          onCancel={"handleCloseQRScannerModal"}
          footer={null}
        >
          <QRScanner
            onScan={(result) => {
              // setQRCodeResult(result); // Lưu kết quả quét mã QR
              // handleCloseQRScannerModal(); // Đóng modal sau khi quét thành công
            }}
          />
        </Modal>
      </div>
    );
  };
}
export default CustomerTable;
