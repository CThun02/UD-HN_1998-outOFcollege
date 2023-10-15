import React from "react";
import { FormOutlined, DeleteFilled } from "@ant-design/icons";

import { Table, Space, Button, Modal, Input, DatePicker } from "antd";
import { useEffect, useState } from "react";
import styles from "./BrandStyle.module.css";
import axios from "axios";

const BrandTable = function (props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [status, setStatus] = useState("");
  const [id, setid] = useState("");

  const [render, setRender] = useState();

  const handleDetails = (item) => {
    setid(item?.id);
    console.log(item);
    setBrandName(item?.brandName);
    setShowDetailsModal(true);
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setSelectedData(id);
  };
  const handleUpdate = () => {
    let brand={}
    axios
      .put(`http://localhost:8080/api/admin/brand/edit/${id}`, {
        brandName,
      })
      .then((response) => {
        // Đóng modal
        setShowDetailsModal(false);
        setRender(Math.random);
      })
      .catch((err) => console.log(err));
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:8080/api/admin/brand/delete/${selectedData}`)
      .then((response) => {
        // Xoá dữ liệu thành công
        // Cập nhật lại danh sách dữ liệu sau khi xoá
        const updatedData = data.filter((item) => item.id !== selectedData);
        setData(updatedData);
        // Đóng modal
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/brand`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, [props.renderTable, render]);

  return (
    <div>
      {console.log(data)}
      <Table
        pagination={{ pageSize: 5 }}
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
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
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
                  type="link"
                  onClick={() => handleDetails(record)}
                  icon={<FormOutlined />}
                />
                <Button
                  className={styles.btnDetails}
                  type="link"
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
