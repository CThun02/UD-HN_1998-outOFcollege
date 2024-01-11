import { Modal, notification } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const ModalConfirm = ({ isModalOpen, handleOk, handleCancel, action }) => {
  const [note, setNote] = useState("");

  const handleOkConfirm = () => {
    if (action === "rollback") {
      if (note?.length < 50) {
        notification.error({
          message: "Thông báo",
          description: "Nhập lý do >= 50 ký tự!",
        });
        return;
      }
    }
    if (note?.length > 100 || note?.length < 10) {
      notification.error({
        message: "Thông báo",
        description: "Vui lòng nhập ghi chú trước khi xác nhận.",
      });
      return;
    }

    handleOk(note);
    setNote("");
  };

  return (
    <>
      <Modal
        title={
          <>
            Ghi chú <span style={{ color: "red" }}>{"*"}</span>
          </>
        }
        open={isModalOpen}
        onOk={() => handleOkConfirm()}
        onCancel={handleCancel}
      >
        <TextArea
          rows={4}
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </Modal>
    </>
  );
};

export default ModalConfirm;
