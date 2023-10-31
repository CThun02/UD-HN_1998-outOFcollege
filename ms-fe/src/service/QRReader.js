import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { Modal } from "antd";

const QRReader = ({ visible, onCancel, setData }) => {
  const handleScan = (data) => {
    if (data) {
      setData(data);
    }
  };
  const [scan, setScan] = useState(false);
  useEffect(() => {
    setScan(visible);
  }, [visible]);
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
      {scan && (
        <QrReader
          facingMode={"user"}
          delay={1000}
          onError={(e) => console.log(e)}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
      )}
    </Modal>
  );
};

export default QRReader;
