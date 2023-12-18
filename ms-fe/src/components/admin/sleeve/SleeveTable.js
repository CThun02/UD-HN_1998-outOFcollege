import React from "react";
import { FormOutlined, DeleteFilled } from "@ant-design/icons";
import {
  Table,
  Space,
  Button,
  Modal,
  Input,
  message,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import styles from "../categorystyles/CategoryStyles.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";
import SockJs from "../../../service/SockJs";

const SleeveTable = function (props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [render, setRender] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sleeveName, setSleeveName] = useState("");
  const [status, setStatus] = useState("");
  const [id, setid] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleDetails = (item) => {
    setSelectedItem(item);
    setid(item?.id);
    setSleeveName(item?.sleeveName);
    setStatus(item?.status);
    setCreatedBy(item?.createdBy);
    setShowDetailsModal(true);
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setSelectedData(id);
  };
  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:8080/api/admin/sleeve/delete/${selectedData}`, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        message.success("Xóa thành công");
        const updatedData = data.filter((item) => item.id !== selectedData);
        setData(updatedData);
        setShowModal(false);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8080/api/admin/sleeve/edit/${id}`,
        {
          sleeveName,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        // Cập nhật lại danh sách dữ liệu sau khi cập nhật thành công
        // Đóng modal
        setRender(Math.random);
        message.success("Chỉnh sửa thành công");
        setShowDetailsModal(false);
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        } else {
          setShowModal(false);
          notification.error({
            message: "Lỗi",
            description: "Không thể xóa dữ liệu!",
          });
        }
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/sleeve`, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        const status = err?.response?.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
        }
      });
  }, [props.renderTable, render]);

  return (
    <div>
      {contextHolder}
      <SockJs connectTo={"sleeveType-topic"} setValues={setData} />
      <Table
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
          defaultPageSize: 5,
          showLessItems: true,
          style: { marginRight: "10px" },
        }}
        dataSource={data}
        columns={[
          {
            title: "STT",
            dataIndex: "stt",
            key: "id",
            render: (_, record) => {
              return (currentPage - 1) * 5 + data.indexOf(record) + 1;
            },
          },
          {
            title: "Kiểu tay áo",
            dataIndex: "sleeveName",
            key: "sleeveName",
          },
          {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
          },
          {
            title: "Người Tạo",
            dataIndex: "createdBy",
            key: "createdBy",
          },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button
                  className={styles.btnDetails}
                  type="primary"
                  size="large"
                  disabled={!props.isAdmin}
                  onClick={() => handleDetails(record)}
                  icon={<FormOutlined />}
                />
                <Button
                  className={styles.btnDetails}
                  type="primary"
                  size="large"
                  disabled={!props.isAdmin}
                  onClick={() => handleDelete(record.id)}
                  icon={<DeleteFilled />}
                />
              </Space>
            ),
          },
        ]}
      />
      <Modal
        title="Tay Áo"
        visible={showDetailsModal}
        onCancel={() => setShowDetailsModal(false)}
        footer={null}
      >
        <br></br>
        <div>
          <h6>Kiểu tay áo</h6>
          <Input
            value={sleeveName}
            onChange={(e) => setSleeveName(e.target.value)}
          />
        </div>
        <br></br>
        <Button type="primary" onClick={handleUpdate}>
          Update
        </Button>
      </Modal>
      <Modal
        title="Xác nhận xoá"
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onOk={handleConfirmDelete}
      >
        <p>Bạn có chắc chắn muốn xoá dữ liệu này?</p>
      </Modal>
    </div>
  );
};
export default SleeveTable;
