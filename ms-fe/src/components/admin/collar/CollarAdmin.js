import React, { useState } from "react";
import {
  Select,
  Input,
  Row,
  Col,
  Form,
  Button,
  DatePicker,
  Modal,

} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import CollarTable from "./CollarTable";
import styles from "./CollarStyle.module.css";
import axios from "axios";
const { Option } = Select;
const CollarAdmin = function () {
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
      .post("http://localhost:8080/api/admin/collar/create", values)
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
              <Button className={styles.btnSeach} onClick={handleAdd} type="primary">
                <PlusOutlined className={styles.faPlus}  />
                <span className={styles.titleSeach}>Thêm Cổ Áo</span>
              </Button>
            </Col>
          </Col>
        </Row>
        <div className={styles.materialTable}>
          <CollarTable></CollarTable>
        </div>
      </div>
      <Modal
        title="Thêm Cố Áo"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="collarName"
            label="Tên Cổ Áo"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên cổ áo",
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
            name="createdAt"
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
  );
};
export default CollarAdmin;
