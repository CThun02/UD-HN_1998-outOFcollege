import { CheckCircleOutlined } from "@ant-design/icons";
import Modal from "antd/es/modal/Modal";
import React from "react";

const Confirm = ({ isModalOpen, handelOk, handleCancel }) => {
  return (
    <Modal open={isModalOpen} onOk={handelOk} onCancel={handleCancel}>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <div>
          <CheckCircleOutlined
            style={{ fontSize: "180px", color: "#52C41A" }}
          />
        </div>
        <h1>Xác nhận thêm mới</h1>
      </div>
    </Modal>
  );
};

export default Confirm;
