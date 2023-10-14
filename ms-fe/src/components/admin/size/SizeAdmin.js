import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Input, Row, Col, Form, DatePicker, Modal, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import SizeTable from "./SizeTable";
import styles from "../categorystyles/CategoryStyles.module.css";
import axios from "axios";
const { Option } = Select;

const SizeAdmin = function () {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    // Gọi API để thêm dữ liệu
    axios
      .post("http://localhost:8080/api/admin/size/create", values)
      .then((response) => {
        // Xử lý thành công
        console.log("Thêm thành công");
        setIsModalVisible(false);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Lỗi khi thêm dữ liệu", error);
      });
  };
  return (
    <div className={styles.category}>
      <div className={styles.radiusFrame}>
        <Row className={styles.titleTB}>
          <h3>Danh Sách Kích Thước</h3>
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
            <Col span={5} offset={19}>
              <Button className={styles.btnSeach} onClick={handleAdd}>
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Kích Thước</span>
              </Button>
            </Col>
          </Col>
        </Row>
        <div className={styles.categoryTable}>
          <SizeTable></SizeTable>
        </div>
        <Modal
          title="Thêm Size"
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
                  message: "Vui lòng nhập tên thể loại",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="status"
              label="Trạng Thái"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn trạng thái",
                },
              ]}
            >
              <Select>
                <Option value="active">Hoạt động</Option>
                <Option value="inactive">Không hoạt động</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="createdDate"
              label="Ngày Tạo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ngày tạo",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="createdBy"
              label="Người Tạo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập người tạo",
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
