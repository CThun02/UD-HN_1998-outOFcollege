import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  Input,
  Row,
  Col,
  Form,
  DatePicker,
  Modal,
  Button,
  notification,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  TableOutlined,
  FullscreenOutlined,
} from "@ant-design/icons";
import SizeTable from "./SizeTable";
import styles from "../categorystyles/CategoryStyles.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";
const { Option } = Select;

const SizeAdmin = function ({ isAdmin }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [render, setRender] = useState();
  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    values.status = "ACTIVE";
    // Gọi API để thêm dữ liệu
    axios
      .post("http://localhost:8080/api/admin/size/create", values, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        // Xử lý thành công
        setRender(Math.random());
        setIsModalVisible(false);
        if (response.data) {
          message.success("Thêm thành công");
        } else {
          message.error("Kích cỡ đã tồn tại");
        }
      })
      .catch((error) => {
        // Xử lý lỗi
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        console.error("Lỗi khi thêm dữ liệu", error);
      });
  };

  useEffect(() => {}, [render]);

  return (
    <div className={styles.category}>
      <div className={styles.customer}>
        <h1 style={{ textAlign: "center" }}>
          <FullscreenOutlined /> Quản lý kích cỡ
        </h1>
        <Row className={styles.titleTB}>
          <h2>
            {" "}
            <TableOutlined /> Danh Sách kích cỡ
          </h2>
        </Row>
        <Row className={styles.adminMenu}>
          <Col span={10}>
            <Row className={styles.menu}>
              <Input
                placeholder="Nhập từ khóa để tìm kiếm"
                prefix={<SearchOutlined />}
              />
            </Row>
          </Col>
          {isAdmin ? (
            <Col span={14} style={{ textAlign: "end" }}>
              <Button className={styles.btnSeach} onClick={handleAdd}>
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Kích Thước</span>
              </Button>
            </Col>
          ) : null}
        </Row>
        <div className={styles.categoryTable}>
          <SizeTable isAdmin={isAdmin} renderTable={render}></SizeTable>
        </div>
        <Modal
          title="Thêm kích cỡ"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="sizeName"
              label="Size"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập kích cỡ",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};
export default SizeAdmin;
