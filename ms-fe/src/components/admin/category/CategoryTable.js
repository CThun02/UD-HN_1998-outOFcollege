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
import styles from "./CategoryStyle.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const CategoryTable = function (props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [api, contextHolder] = message.useMessage();

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const [id, setid] = useState("");
  const [render, setRender] = useState();

  const handleDetails = (item) => {
    setSelectedItem(item);
    setid(item?.id);
    setCategoryName(item?.categoryName);
    setShowDetailsModal(true);
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8080/api/admin/category/edit/${id}`,
        {
          categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        // Cập nhật lại danh sách dữ liệu sau khi cập nhật thành công
        setRender(Math.random());
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
          return;
        }
      });
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setSelectedData(id);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(
        `http://localhost:8080/api/admin/category/delete/${selectedData}`,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/category`, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  }, [props.renderTable, render]);

  return (
    <div>
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
            title: "Thể loại",
            dataIndex: "categoryName",
            key: "categoryName",
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
                  disabled={!props.isAdmin}
                  className={styles.btnDetails}
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
        <br></br>
        <p>
          Tên_Loại
          <Input
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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
      {contextHolder}
    </div>
  );
};

export default CategoryTable;
