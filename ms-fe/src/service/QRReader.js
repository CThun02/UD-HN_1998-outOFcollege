import Modal from "antd/es/modal/Modal";
import React from "react";
import { QrReader } from "react-qr-reader";

const QRReader = ({ visible, onCancel, setData }) => {
  const handleScan = (data) => {
    if (data) {
      setData(data.getText());
    }
  };

  return (
    <Modal
      title="Tìm kiếm sản phẩm"
      open={visible}
      onCancel={() => {
        onCancel();
      }}
      footer={null}
      centered
    >
      <QrReader
        scanDelay={500}
        onResult={(result, error) => {
          console.log(error);
          handleScan(result);
        }}
        constraints={{ facingMode: "user" }}
        style={{ width: "100%" }}
      />
    </Modal>
  );
};

export default QRReader;
