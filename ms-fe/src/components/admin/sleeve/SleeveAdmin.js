import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Input, Row, Col, Form, DatePicker, Modal, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import SleeveTable from "./SleeveTable";
import styles from "../categorystyles/CategoryStyles.module.css";
import axios from "axios";
const { Option } = Select;

const SleeveAdmin = function () {
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
      .post("http://localhost:8080/api/admin/sleeve/create", values)
      .then((response) => {
        // Xử lý thành công
        console.log("Thêm thành công");
        setIsModalVisible(false);
        setRender(Math.random);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Lỗi khi thêm dữ liệu", error);
      });
  };

  useEffect(() => {}, [render]);

  return (
    <div className={styles.category}>
      <div className={styles.customer}>
        <Row className={styles.titleTB}>
          <h3>Danh Sách Tay Áo</h3>
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
          <Col span={12} offset={1}>
            <Col span={5} offset={18}>
              <Button className={styles.btnSeach} onClick={handleAdd}>
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Kiểu Tay Áo</span>
              </Button>
            </Col>
          </Col>
        </Row>
        <div className={styles.categoryTable}>
          <SleeveTable renderTable={render}></SleeveTable>
        </div>
        <Modal
          title="Thêm Kiểu Tay Áo"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="sleeveName"
              label="Kiểu tay áo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập kiểu tay áo",
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
export default SleeveAdmin;
