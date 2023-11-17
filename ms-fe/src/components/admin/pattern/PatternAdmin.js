import React, { useState } from "react";
import { Input, Row, Col, Form, Button, Modal, message } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import PatternTable from "./PatternTable";
import styles from "./PatternlStyle.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const PatternAdmin = function () {
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
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        // Xử lý thành công
        console.log("Thêm thành công");
        setIsModalVisible(false);
        setRender(Math.random);
        // Hiển thị thông báo thành công
        message.success("Thêm thành công");
      })
      .catch((error) => {
        // Xử lý lỗi
        if (error.response && error.response.status === 409) {
          // Nếu lỗi trùng tên mẫu, hiển thị thông báo lỗi
          Modal.error({
            title: "Lỗi",
            content: "Tên loại vải đã tồn tại. Vui lòng chọn tên khác.",
          });
        } else {
          console.error("Lỗi khi thêm dữ liệu", error);
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
          <Col span={13} offset={1}>
            <Col span={9} offset={1}>
              <Button
                className={styles.btnSeach}
                type="primary"
                onClick={handleAdd}
              >
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Họa tiết</span>
              </Button>
            </Col>
          </Col>
        </Row>
        <div className={styles.materialTable}>
          <PatternTable renderTable={render}></PatternTable>
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
