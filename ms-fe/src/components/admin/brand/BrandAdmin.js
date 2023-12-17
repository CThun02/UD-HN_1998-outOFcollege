import React, { useState } from "react";
import {
  Input,
  Row,
  Col,
  Button,
  Form,
  Modal,
  message,
  notification,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  TableOutlined,
  FontSizeOutlined,
} from "@ant-design/icons";
import BrandTable from "./BrandTable";
import styles from "./BrandStyle.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const BrandAdmin = function ({ isAdmin }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [render, setRender] = useState();
  const [api, contextHolder] = notification.useNotification();

  const handleAdd1 = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (values) => {
    values.status = "ACTIVE";
    // Gọi API để thêm dữ liệu
    axios
      .post("http://localhost:8080/api/admin/brand/create", values, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setRender(Math.random);

        if (response.data) {
          message.success("Thêm thành công");
        } else {
          message.error("Thương hiệu đã tồn tại");
        }
        setIsModalVisible(false);
      })
      .catch((error) => {
        // Xử lý lỗi
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

  useState(() => {}, [render]);

  return (
    <div className={styles.material}>
      <h1 style={{ textAlign: "center" }}>
        <FontSizeOutlined /> Quản lý thương hiệu
      </h1>
      {contextHolder}
      <div className={styles.radiusFrame}>
        <Row className={styles.titleTB}>
          <h2>
            {" "}
            <TableOutlined /> Danh Sách thương hiệu
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
              <Button
                className={styles.btnSeach}
                onClick={handleAdd1}
                type="primary"
              >
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Thương Hiệu</span>
              </Button>
            </Col>
          ) : null}
        </Row>
        <div className={styles.materialTable}>
          <BrandTable isAdmin={isAdmin} renderTable={render}></BrandTable>
        </div>
      </div>
      <Modal
        title="Thêm Thương hiệu"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="brandName"
            label="Tên Thương hiệu"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên thương hiệu",
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
export default BrandAdmin;
