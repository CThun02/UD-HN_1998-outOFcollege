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
import styles from "./PatternlStyle.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const PatternTable = function (props) {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [messageApi, contextHolder] = message.useMessage();

  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [patternName, setPatternName] = useState("");

  const [id, setid] = useState("");
  const [render, setRender] = useState();

  const handleDetails = (item) => {
    setSelectedItem(item);
    setid(item?.id);
    setPatternName(item?.patternName);

    setShowDetailsModal(true);
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setSelectedData(id);
  };

  const handleUpdate = () => {
    axios
      .put(
        `http://localhost:8080/api/admin/pattern/edit/${id}`,
        {
          patternName,
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
        setShowDetailsModal(false);
        setRender(Math.random());

        // Hiển thị thông báo thành công
        message.success("Cập nhật thành công");
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
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
        `http://localhost:8080/api/admin/pattern/update/${id}`,
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
        setTimeout(() => {
          messageApi.success(mess, 2);
        }, 500);
      })
      .catch((error) => {
        const status = error.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
          return;
        }
        setTimeout(() => {
          messageApi.error(`Cập nhật trạng thái thất bại`, 2);
        }, 500);
      });
  };

  const handleConfirmDelete = () => {
    axios
      .delete(
        `http://localhost:8080/api/admin/pattern/delete/${selectedData}`,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        // Xoá dữ liệu thành công
        // Cập nhật lại danh sách dữ liệu sau khi xoá
        const updatedData = data.filter((item) => item.id !== selectedData);
        setData(updatedData);
        // Đóng modal
        setShowModal(false);
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
          return;
        }
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/admin/pattern`, {
        headers: {
          Authorization: `Bearer ${getToken(true)}`,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        const status = err.response.status;
        if (status === 403) {
          notification.error({
            message: "Thông báo",
            description: "Bạn không có quyền truy cập!",
          });
          return;
        }
      });
  }, [props.renderTable, render]);

  return (
    <div>
      {console.log(data)}
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
            title: "Tên Loại Vải",
            dataIndex: "patternName",
            key: "patternName",
          },
          {
            key: "status",
            title: "Trạng thái",
            dataIndex: "status",
            width: 150,
            render: (status, record) => (
              <>
                <Switch
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
                  type="link"
                  onClick={() => handleDetails(record)}
                  icon={<FormOutlined />}
                >
                  Xem chi tiết
                </Button>
                <Button
                  className={styles.btnDetails}
                  type="link"
                  onClick={() => handleDelete(record.id)}
                  icon={<DeleteFilled />}
                >
                  Xóa
                </Button>
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
          Tên_Loại_Vải
          <Input
            value={patternName}
            onChange={(e) => setPatternName(e.target.value)}
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
export default PatternTable;
