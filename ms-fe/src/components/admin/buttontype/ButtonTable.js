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

const ButtonTable = function (props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [render, setRender] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [buttonName, setButtonName] = useState("");
  const [id, setid] = useState("");
  const [api, contextHolder] = message.useMessage();

  const handleDetails = (item) => {
    setSelectedItem(item);
    setid(item?.id);
    setButtonName(item?.buttonName);
    setShowDetailsModal(true);
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setSelectedData(id);
  };
  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:8080/api/admin/button/delete/${selectedData}`, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        message.success("Xóa thành công");
        setRender(Math.random);
        const updatedData = data.filter((item) => item.id !== selectedData);
        setData(updatedData);
        setShowModal(false);
      })
      .catch((err) => {
        const status = err?.response?.data?.status;
        if (status === 403) {
          api.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
        }
      });
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8080/api/admin/button/edit/${id}`,
        {
          buttonName,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        // Đóng modal
        message.success("Chỉnh sửa thành công");
        setShowDetailsModal(false);
        setRender(Math.random);
      })
      .catch((err) => {
        const status = err?.response?.data?.status;
        if (status === 403) {
          notification.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
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
    return () =>
      axios
        .get(`http://localhost:8080/api/admin/button`, {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        })
        .then((response) => {
          setData(response.data);
        })
        .catch((err) => {
          const status = err?.response?.data?.status;
          if (status === 403) {
            api.error({
              message: "Lỗi",
              description: "Bạn không có quyền xem nội dung này",
            });
            return;
          }
        });
  }, [props.renderTable, render]);
  return (
    <div>
      {contextHolder}
      <SockJs connectTo={"button-topic"} setValues={setData} />
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
            title: "Kiểu cúc áo",
            dataIndex: "buttonName",
            key: "buttonName",
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
        title="Cúc áo"
        visible={showDetailsModal}
        onCancel={() => setShowDetailsModal(false)}
        footer={null}
      >
        <br />
        <div>
          <h6>Kiểu Cúc Áo</h6>
          <Input
            value={buttonName}
            onChange={(e) => setButtonName(e.target.value)}
          />
        </div>
        <br />
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
export default ButtonTable;
