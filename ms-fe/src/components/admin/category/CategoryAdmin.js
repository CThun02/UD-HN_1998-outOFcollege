import React, { useState } from "react";
import {
  Input,
  Row,
  Col,
  Button,
  Modal,
  Form,
  message,
  notification,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  TableOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import CategoryTable from "./CategoryTable";
import styles from "./CategoryStyle.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const CategoryAdmin = function ({ isAdmin }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [render, setRender] = useState();
  const [messageApi, contextHolder] = message.useMessage();

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
      .post("http://localhost:8080/api/admin/category/create", values, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        // Xử lý thành công
        setRender(Math.random);
        if (response.data) {
          message.success("Thêm thành công");
        } else {
          message.error("Loại sản phẩm đã tồn tại");
        }
        setIsModalVisible(false);
      })
      .catch((error) => {
        // Xử lý lỗi
        console.error("Lỗi khi thêm dữ liệu", error);
        const status = error?.response?.data?.status;
        if (status === 403) {
          message.error("Bạn không có quyền xem nội dung này");
          return;
        }
      });
  };
  useState(() => {}, [render]);
  return (
    <div className={styles.material}>
      <h1 style={{ textAlign: "center" }}>
        <SafetyCertificateOutlined /> Quản lý loại sản phẩm
      </h1>
      {contextHolder}
      <div className={styles.radiusFrame}>
        <Row className={styles.titleTB}>
          <h2>
            {" "}
            <TableOutlined /> Danh Sách loại sản phẩm
          </h2>
        </Row>
        <Row className={styles.adminMenu}>
          <Col span={10}>
            <Input
              placeholder="Nhập từ khóa để tìm kiếm"
              prefix={<SearchOutlined />}
            />
          </Col>
          {isAdmin ? (
            <Col span={14} style={{ textAlign: "end" }}>
              <Button
                className={styles.btnSeach}
                onClick={handleAdd}
                type="primary"
              >
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Thể Loại</span>
              </Button>
            </Col>
          ) : null}
        </Row>
        <div className={styles.materialTable}>
          <CategoryTable isAdmin={isAdmin} renderTable={render}></CategoryTable>
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
            name="categoryName"
            label="Tên Thể Loại"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên thể loại",
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

export default CategoryAdmin;
