import React from "react";
import { FormOutlined, DeleteFilled } from "@ant-design/icons";
import {
  Table,
  Space,
  Button,
  Modal,
  Input,
  ColorPicker,
  message,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import styles from "../categorystyles/CategoryStyles.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const CollorTable = function (props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [render, setRender] = useState();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [collorName, setCollorName] = useState("");
  const [colorCode, setColorCode] = useState("#1677FF");
  const [status, setStatus] = useState("");
  const [id, setid] = useState("");

  const handleDetails = (item) => {
    setSelectedItem(item);
    setid(item?.id);
    setColorCode(item?.colorCode);
    setCollorName(item?.colorName);
    setStatus(item?.status);
    setShowDetailsModal(true);
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setSelectedData(id);
  };
  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:8080/api/admin/color/delete/${selectedData}`, {
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

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8080/api/admin/color/edit/${id}`,
        {
          colorCode: colorCode,
          colorName: collorName,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setRender(Math.random);
        setShowDetailsModal(false);
        message.success("Chỉnh sửa thành công");
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
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/color`, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setData(response.data);
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
            title: "Mã màu",
            dataIndex: "colorCode",
            key: "colorCode",
          },
          {
            title: "Màu sắc",
            dataIndex: "colorName",
            key: "colorName",
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
        title="Màu Sắc"
        visible={showDetailsModal}
        onCancel={() => setShowDetailsModal(false)}
        footer={null}
      >
        <br></br>
        <div>
          <h6>Mã màu sắc</h6>
          <ColorPicker
            showText
            value={colorCode}
            onChange={(e) => setColorCode(e.toHexString())}
          />
        </div>
        <br></br>
        <div>
          <h6>Tên Màu Sắc</h6>
          <Input
            value={collorName}
            onChange={(e) => setCollorName(e.target.value)}
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
export default CollorTable;
