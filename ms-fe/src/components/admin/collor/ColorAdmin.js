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
  ColorPicker,
  notification,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import CollorTable from "./CollorTable";
import styles from "../categorystyles/CategoryStyles.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";
const { Option } = Select;

const CollorAdmin = function () {
  const [render, setRender] = useState();
  const [colorCode, setColorCode] = useState("");
  const [colorName, setColorName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    const values = {
      status: "ACTIVE",
      colorCode: colorCode,
      colorName: colorName,
    };

    // Gọi API để thêm dữ liệu
    axios
      .post("http://localhost:8080/api/admin/color/create", values, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        // Xử lý thành công
        console.log("Thêm thành công");
        setIsModalVisible(false);
        setRender(Math.random);
      })
      .catch((err) => {
        // Xử lý lỗi
        const status = err.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
    console.log(values);
  };

  useEffect(() => {}, [render]);
  return (
    <div className={styles.category}>
      <div className={styles.customer}>
        <Row className={styles.titleTB}>
          <h3>Danh Sách Màu Sắc</h3>
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
                <span className={styles.titleSeach}>Thêm Màu Sắc</span>
              </Button>
            </Col>
          </Col>
        </Row>
        <div className={styles.categoryTable}>
          <CollorTable renderTable={render}></CollorTable>
        </div>
        <Modal
          title="Thêm Màu Sắc"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              value="colorCode"
              label="Color Code"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã màu sắc",
                },
              ]}
            >
              <ColorPicker
                showText
                onChange={(e) => setColorCode(e.toHexString())}
              />
            </Form.Item>
            <Form.Item
              value="colorName"
              label="Color Name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập màu sắc",
                },
              ]}
            >
              <Input onChange={(e) => setColorName(e.target.value)} />
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
export default CollorAdmin;
