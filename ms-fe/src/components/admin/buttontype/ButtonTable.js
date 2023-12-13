import React from "react";
import { FormOutlined, DeleteFilled } from "@ant-design/icons";
import {
  Table,
  Space,
  Button,
  Switch,
  Modal,
  Input,
  notification,
  message,
} from "antd";
import { useEffect, useState } from "react";
import styles from "../categorystyles/CategoryStyles.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

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

  const handleUpdateStatus = (id, statusUpdate) => {
    let mess = statusUpdate ? "Đang hoạt động" : "Ngưng hoạt động";
    const updatedStatusValue = statusUpdate ? "ACTIVE" : "INACTIVE"; // Cập nhật trạng thái dựa trên giá trị của statusUpdate
    axios
      .put(
        `http://localhost:8080/api/admin/button/updateStatus/${id}`,
        {
          status: updatedStatusValue,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setRender(Math.random);
        if (statusUpdate) {
          api.success(mess, 2);
        } else {
          api.error(mess, 2);
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
        api.error(`Cập nhật trạng thái thất bại`, 2);
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
          api.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
          return;
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
            key: "status",
            title: "Trạng thái",
            dataIndex: "status",
            width: 150,
            render: (status, record) => (
              <>
                <Switch
                  disabled={!props.isAdmin}
                  onChange={(checked) => {
                    handleUpdateStatus(record.id, checked);
                  }}
                  checked={status === "ACTIVE"}
                />
              </>
            ),
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
