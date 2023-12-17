import React, { useState } from "react";
import {
  Input,
  Row,
  Col,
  Form,
  Button,
  Modal,
  message,
  notification,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  TableOutlined,
  PauseOutlined,
} from "@ant-design/icons";
import CollarTable from "./CollarTable";
import styles from "./CollarStyle.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const CollarAdmin = function ({ isAdmin }) {
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
      .post("http://localhost:8080/api/admin/collar/create", values, {
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
          message.error("Cổ áo đã tồn tại");
        }
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
        console.log(err);
      });
  };

  return (
    <div className={styles.material}>
      <h1 style={{ textAlign: "center" }}>
        <PauseOutlined /> Quản lý loại cổ áo
      </h1>
      <div className={styles.radiusFrame}>
        <Row className={styles.titleTB}>
          <h2>
            {" "}
            <TableOutlined /> Danh Sách loại cổ áo
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
                onClick={handleAdd}
                type="primary"
              >
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Cổ Áo</span>
              </Button>
            </Col>
          ) : null}
        </Row>
        <div className={styles.materialTable}>
          <CollarTable isAdmin={isAdmin} renderTable={render}></CollarTable>
        </div>
      </div>
      <Modal
        title="Thêm Cổ Áo"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="collarTypeName"
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
