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
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import PatternTable from "./PatternTable";
import styles from "./PatternlStyle.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const PatternAdmin = function ({ isAdmin }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [render, setRender] = useState();
  const [searchKeyword, setSearchKeyword] = useState("");

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
      .post("http://localhost:8080/api/admin/pattern/create", values, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setRender(Math.random);
        if (response.data) {
          message.success("Thêm thành công");
        } else {
          message.error("Họa tiết đã tồn tại");
        }
        setIsModalVisible(false);
      })
      .catch((error) => {
        // Xử lý lỗi
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
          return;
        }
      });
  };

  return (
    <div className={styles.material}>
      <div className={styles.radiusFrame}>
        <Row className={styles.titleTB}>
          <h3>Danh Sách Họa tiết</h3>
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
              <Button
                className={styles.btnSeach}
                type="primary"
                onClick={handleAdd}
              >
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Họa tiết</span>
              </Button>
            </Col>
          ) : null}
        </Row>
        <div className={styles.materialTable}>
          <PatternTable isAdmin={isAdmin} renderTable={render}></PatternTable>
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
            name="patternName"
            label="Tên Loại Vải"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên loại vải",
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
export default PatternAdmin;
