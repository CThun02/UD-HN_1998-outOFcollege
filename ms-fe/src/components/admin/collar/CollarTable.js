import React from "react";
import { FormOutlined, DeleteFilled } from "@ant-design/icons";

import { Table, Space, Button, Modal, Input, DatePicker } from "antd";
import { useEffect, useState } from "react";
import styles from "./CollarStyle.module.css";
import axios from "axios";
import moment from "moment";

const CollarTable = function (props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [collarName, setCollarName] = useState("");
  const [status, setStatus] = useState("");
  const [id, setid] = useState("");
  const [createdBy, setCreatedBy] = useState("");

  const handleDetails = (item) => {
    setSelectedItem(item);
    setid(item?.id);
    setCollarName(item?.collarTypeName);
    setStatus(item?.status);
    setCreatedBy(item?.createdBy);
    setShowDetailsModal(true);
  };

  const handleDateChange = (dateString) => {
    // Cập nhật trạng thái ngày tạo
    setSelectedItem((prevItem) => ({
      ...prevItem,
      createdAt: dateString,
    }));
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setSelectedData(id);
  };
  const handleUpdate = () => {
    axios
      .put(`http://localhost:8080/api/admin/collar/edit/${id}`, {
        collarName,
        status,
        createdAt: selectedItem?.createdAt,
        createdBy,
      })
      .then((response) => {
        // Cập nhật lại danh sách dữ liệu sau khi cập nhật thành công
        const updatedData = data.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              collarName,
              status,
              createdAt: selectedItem?.createdAt,
              createdBy,
            };
          }
          return item;
        });
        setData(updatedData);
        // Đóng modal
        setShowDetailsModal(false);
      })
      .catch((err) => console.log(err));
  };
  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:8080/api/admin/collar/delete/${selectedData}`)
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
      .get(`http://localhost:8080/api/admin/collar`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {console.log(data)}
      <Table
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
            title: "Cổ áo",
            dataIndex: "collarTypeName",
            key: "collarTypeName",
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
          STT <Input value={id} onChange={(e) => setid(e.target.value)} />
        </p>
        <br></br>
        <p>
          Tên_Cổ_Áo
          <Input
            value={collarName}
            onChange={(e) => setCollarName(e.target.value)}
          />
        </p>
        <br></br>
        <p>
          Trạng_Thái
          <Input value={status} onChange={(e) => setStatus(e.target.value)} />
        </p>
        <br></br>
        <p>
          Ngày_tạo
          <br></br>
          <DatePicker
            value={moment(selectedItem?.createdAt)}
            format="DD/MM/YYYY"
            onChange={(date, dateString) => handleDateChange(dateString)}
          />
        </p>
        <br></br>
        <p>
          Người_Tạo
          <Input
            value={createdBy}
            onChange={(e) => setStatus(e.target.value)}
          />
        </p>
        <br></br>
        <Button className="primary" onClick={handleUpdate}>Update</Button>
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
export default CollarTable;
