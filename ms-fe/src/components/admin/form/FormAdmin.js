import React, { useState } from "react";

import { Input, Row, Col, Form, Button, Modal, message } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import FormTable from "./FormTable";
import styles from "./FormStyle.module.css";
import axios from "axios";

const FormAdmin = function () {
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
      .post("http://localhost:8080/api/admin/form/create", values)
      .then((response) => {
        // Xử lý thành công
        console.log("Thêm thành công");
        setIsModalVisible(false);
        setRender(Math.random);
        message.success("Thêm thành công");
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Lỗi khi thêm dữ liệu", error);
      });
  };

  return (
    <div className={styles.material}>
      <div className={styles.radiusFrame}>
        <Row className={styles.titleTB}>
          <h3>Danh Sách Chất Liệu</h3>
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
          <Col span={13} offset={1}>
            <Col span={9} offset={1}>
              <Button
                className={styles.btnSeach}
                onClick={handleAdd}
                type="primary"
              >
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Kiểu Dáng</span>
              </Button>
            </Col>
          </Col>
        </Row>
        <div className={styles.materialTable}>
          <FormTable renderTable={render}></FormTable>
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
