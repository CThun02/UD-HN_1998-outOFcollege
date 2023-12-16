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
import {
  SearchOutlined,
  PlusOutlined,
  TableOutlined,
  DownOutlined,
} from "@ant-design/icons";
import ShirtTypeTable from "./ShirtTypeTable";
import styles from "../categorystyles/CategoryStyles.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const ShirtTailAdmin = function ({ isAdmin }) {
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
      .post(
        "http://localhost:8080/api/admin/shirt-tail/create?name=" +
          values.shirtTailTypeName,
        null,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        // Xử lý thành công
        setRender(Math.random());
        setIsModalVisible(false);
        if (response.data) {
          message.success("Thêm thành công");
        } else {
          message.error("Đuôi áo đã tồn tại");
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
        }
      });
  };

  useEffect(() => {}, [render]);
  return (
    <div className={styles.category}>
      <div className={styles.customer}>
        <h1 style={{ textAlign: "center" }}>
          <DownOutlined /> Quản lý đuôi áo
        </h1>
        <Row className={styles.titleTB}>
          <h2>
            {" "}
            <TableOutlined /> Danh Sách đuôi áo
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
                <span className={styles.titleSeach}>Thêm Kiểu Đuôi Áo</span>
              </Button>
            </Col>
          ) : null}
        </Row>
        <div className={styles.categoryTable}>
          <ShirtTypeTable
            isAdmin={isAdmin}
            renderTable={render}
          ></ShirtTypeTable>
        </div>
        <Modal
          title="Thêm Kiểu Đuôi Áo"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onFinish={handleSubmit}>
            <Form.Item
              name="shirtTailTypeName"
              label="Kiểu Đuôi Áo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập kiểu đuôi áo",
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
export default ShirtTailAdmin;
