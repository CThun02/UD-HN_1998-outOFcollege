import React, { useState } from "react";

import {
  Input,
  Row,
  Col,
  Form,
  Button,
  Modal,
  message,
  notification,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  TableOutlined,
  StrikethroughOutlined,
} from "@ant-design/icons";
import FormTable from "./FormTable";
import styles from "./FormStyle.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const FormAdmin = function ({ isAdmin }) {
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
      .post("http://localhost:8080/api/admin/form/create", values, {
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
          message.error("Dáng áo đã tồn tại");
        }
      })
      .catch((err) => {
        // Xử lý lỗi
        const status = err?.response?.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
  };

  return (
    <div className={styles.material}>
      <h1 style={{ textAlign: "center" }}>
        <StrikethroughOutlined /> Quản lý dáng áo
      </h1>
      <div className={styles.radiusFrame}>
        <Row className={styles.titleTB}>
          <h2>
            {" "}
            <TableOutlined /> Danh Sách dáng áo
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
          <Col span={14} style={{ textAlign: "end" }}>
            {isAdmin ? (
              <Button
                className={styles.btnSeach}
                onClick={handleAdd}
                type="primary"
              >
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Kiểu Dáng</span>
              </Button>
            ) : null}
          </Col>
        </Row>
        <div className={styles.materialTable}>
          <FormTable isAdmin={isAdmin} renderTable={render}></FormTable>
        </div>
      </div>
      <Modal
        title="Thêm Thể Loại"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="formName"
            label="Tên kiểu dáng"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên kiểu dáng",
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
  );
};
export default FormAdmin;
