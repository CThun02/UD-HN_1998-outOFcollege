import React from "react";
import { FormOutlined, DeleteFilled } from "@ant-design/icons";

import {
  Table,
  Space,
  Button,
  Modal,
  Input,
  message,
  Switch,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import styles from "./BrandStyle.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const BrandTable = function (props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [api, contextHolderNotification] = message.useMessage();

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [brandName, setBrandName] = useState("");

  const [id, setid] = useState("");

  const [render, setRender] = useState();

  const handleDetails = (item) => {
    setid(item?.id);
    setBrandName(item?.brandName);
    setShowDetailsModal(true);
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setSelectedData(id);
  };
  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8080/api/admin/brand/edit/${id}`,
        {
          brandName,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        // Đóng modal
        setRender(Math.random);
        setShowDetailsModal(false);
        message.success("Cập nhật thành công");
      })
      .catch((err) => {
        const status = err?.response?.data?.status;
        if (status === 403) {
          api.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });
        }
      });
  };
  const handleUpdateStatus = (id, statusUpdate) => {
    let mess = statusUpdate ? "Đang hoạt động" : "Ngưng hoạt động";
    const updatedStatusValue = statusUpdate ? "ACTIVE" : "INACTIVE";
    axios
      .put(
        `http://localhost:8080/api/admin/brand/update/${id}`,
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
        setRender(Math.random());
        api.success(mess, 2);
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
        setTimeout(() => {
          api.error(`Cập nhật trạng thái thất bại`, 2);
        }, 500);
      });
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:8080/api/admin/brand/delete/${selectedData}`, {
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
        .get(`http://localhost:8080/api/admin/brand`, {
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
      {contextHolderNotification}
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
            title: "Thương hiệu",
            dataIndex: "brandName",
            key: "brandName",
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
            title: "Thao tác",
            key: "action",
            render: (_, record) => (
              <Space size="middle">
                <Button
                  className={styles.btnDetails}
                  disabled={!props.isAdmin}
                  type="primary"
                  size="large"
                  onClick={() => handleDetails(record)}
                  icon={<FormOutlined />}
                />
                <Button
                  className={styles.btnDetails}
                  disabled={!props.isAdmin}
                  type="primary"
                  size="large"
                  onClick={() => handleDelete(record.id)}
                  icon={<DeleteFilled />}
                />
              </Space>
            ),
          },
        ]}
      />
      <Modal
        title="Chi tiết"
        visible={showDetailsModal}
        onCancel={() => setShowDetailsModal(false)}
        footer={null}
      >
        <p>
          Tên_Thương_Hiệu
          <Input
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
        </p>
        <br></br>
        <Button className="primary" onClick={handleUpdate}>
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
export default BrandTable;
