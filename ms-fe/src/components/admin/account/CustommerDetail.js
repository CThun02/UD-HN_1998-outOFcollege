import React, { useState } from "react";
import { Modal, Button } from "antd";

const CustomerDetail = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    // Thực hiện các tác vụ khi người dùng nhấp vào nút OK
  };

  const handleCancel = () => {
    setVisible(false);
    // Thực hiện các tác vụ khi người dùng nhấp vào nút Hủy
  };

  return (
    <div>
      {/* Nút mở modal */}
      <Button type="primary" onClick={showModal}>
        Mở Modal
      </Button>

      {/* Component Modal */}
      <Modal
        title="Tiêu đề Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Nội dung modal...</p>
      </Modal>
    </div>
  );
};

export default CustomerDetail;
