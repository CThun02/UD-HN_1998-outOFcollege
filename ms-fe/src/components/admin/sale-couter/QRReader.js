import Modal from "antd/es/modal/Modal";
import React, { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

export const QRReader = ({ visible, onCancel, cartId, render }) => {
  const [scanResult, setScanResult] = useState("");

  return (
    <>
      <Modal
        title="Tìm kiếm sản phẩm"
        style={{ top: "10px" }}
        key={cartId}
        open={visible}
        onCancel={() => {
          onCancel();
          render(Math.random());
        }}
        footer={null}
        centered
      >
        <QrReader
          scanDelay={3000}
          onResult={(result, error) => {
            if (result !== undefined && result !== null) {
              console.log(result.getText());
            }
          }}
          style={{ width: "100%" }}
        />
        <p>{scanResult}</p>
      </Modal>
    </>
  );
};
