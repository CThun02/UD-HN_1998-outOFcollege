import React, { useEffect, useState } from "react";
import {
  Input,
  Row,
  Col,
  Form,
  Modal,
  Button,
  notification,
  message,
} from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonTable from "./ButtonTable";
import styles from "../categorystyles/CategoryStyles.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const ButtonAdmin = function ({ isAdmin }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [render, setRender] = useState();

  const handleAdd = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    // Gọi API để thêm dữ liệu
    axios
      .post(
        "http://localhost:8080/api/admin/button/create?buttonTypeName=" +
          values.buttonName,
        null,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setRender(Math.random());
        setIsModalVisible(false);
        if (response.data) {
          message.success("Thêm thành công");
        } else {
          message.error("Cúc áo đã tồn tại");
        }
      })
      .catch((error) => {
        const status = error?.response?.data?.status;
        if (status === 403) {
          api.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
        }
      });
  };

  useEffect(() => {}, [render]);
  return (
    <div className={styles.category}>
      {contextHolder}
      <div className={styles.customer}>
        <Row className={styles.titleTB}>
          <h3>Danh Sách Cúc Áo</h3>
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
                <span className={styles.titleSeach}>Thêm Kiểu Cúc Áo</span>
              </Button>
            </Col>
          ) : null}
        </Row>
        <div className={styles.categoryTable}>
          <ButtonTable isAdmin={isAdmin} renderTable={render}></ButtonTable>
        </div>
        <Modal
          title="Thêm Kiểu Cúc Áo"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="buttonName"
              label="Kiểu Cúc Áo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập kiểu cúc áo",
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
export default ButtonAdmin;
