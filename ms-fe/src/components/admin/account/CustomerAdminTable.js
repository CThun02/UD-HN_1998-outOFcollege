import React from "react";
import QRScanner from "./QRScanner";
import { useNavigate, useParams } from "react-router-dom";
import DetailForm from "./DetailForm";
import { Table, Space, Pagination, Button, Row, Col, Form, Modal } from "antd";
import { EyeOutlined, FileOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import style from "./styles/Customerlndex.module.css";
import { saveImage } from "../../../config/FireBase";
import { ref, getDownloadURL } from "firebase/storage";
import axios from "axios";
function CustomerTable(props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showQRScannerModal, setShowQRScannerModal] = useState(false); // State để xác định hiển thị modal
  const [qrCodeResult, setQRCodeResult] = useState("");
  let roleId = props.roleId;

  const [form] = Form.useForm();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/account/viewAll?roleId=" + roleId)
      .then((response) => {
        setData(response.data.content);
      })
      .catch((err) => console.log(err));
  }, [roleId]);

  const navigate = useNavigate();

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

  const url = async (urlImg) => {
    if (urlImg !== null && urlImg !== undefined && urlImg !== "") {
      await getDownloadURL(ref(saveImage, urlImg))
        .then((url) => {
          console.log(url);
          return url;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const handleOpenSecondModal = async (customer) => {
    navigate(
      `/admin/${roleId === 1 ? "employee" : "customer"}/detail/${customer}`
    );
  };
  const handleOpenQRScannerModal = () => {
    setShowQRScannerModal(true); // Hiển thị modal quét mã QR
  };

  const handleCloseQRScannerModal = () => {
    setShowQRScannerModal(false); // Ẩn modal quét mã QR
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
              return (currentPage - 1) * 5 + data.indexOf(record) + 1;
            },
          },

          {
            title: "Ảnh",
            dataIndex: "avatar",
            key: "avatar",
            render: (_, image) => (
              <>
                <img
                  src={url(image.image)}
                  className={style.picture}
                  alt="Avatar"
                  style={{ width: "50px", height: "50px" }}
                />
              </>
            ),
          },
          {
            title: "Tên Nhân Viên",
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
            title: "Ngày Tạo",
            dataIndex: "createdAt",
            key: "createdAt",
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
            <Button className={style.faEye} onClick={handleOpenQRScannerModal}>
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
      <Modal
        visible={showQRScannerModal}
        onCancel={handleCloseQRScannerModal}
        footer={null}
      >
        <QRScanner
          onScan={(result) => {
            setQRCodeResult(result); // Lưu kết quả quét mã QR
            handleCloseQRScannerModal(); // Đóng modal sau khi quét thành công
          }}
        />
      </Modal>
    </div>
  );
}
export default CustomerTable;
