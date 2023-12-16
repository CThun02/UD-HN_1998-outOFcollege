import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Row,
  Col,
  Form,
  Modal,
  Button,
  ColorPicker,
  notification,
  message,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  TableOutlined,
  HighlightOutlined,
} from "@ant-design/icons";
import CollorTable from "./CollorTable";
import styles from "../categorystyles/CategoryStyles.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const CollorAdmin = function ({ isAdmin }) {
  const [render, setRender] = useState();
  const [colorCode, setColorCode] = useState("#1677FF");
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
        setRender(Math.random());
        setIsModalVisible(false);
        if (response.data) {
          message.success("Thêm thành công");
        } else {
          message.error("Màu sắc đã tồn tại");
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

  useEffect(() => {}, [render]);
  return (
    <div className={styles.category}>
      <div className={styles.customer}>
        <h1 style={{ textAlign: "center" }}>
          <HighlightOutlined /> Quản lý màu sắc
        </h1>
        <Row className={styles.titleTB}>
          <h2>
            {" "}
            <TableOutlined /> Danh Sách màu sắc
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
                <span className={styles.titleSeach}>Thêm Màu Sắc</span>
              </Button>
            </Col>
          ) : null}
        </Row>
        <div className={styles.categoryTable}>
          <CollorTable isAdmin={isAdmin} renderTable={render}></CollorTable>
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
                onChange={(e) => {
                  setColorCode(e.toHexString());
                }}
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
