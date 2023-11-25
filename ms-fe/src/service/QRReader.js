import React from "react";
import { Modal } from "antd";
import { useZxing } from "react-zxing";

const QRReader = ({ visible, onCancel, setData, title }) => {
  const { ref } = useZxing({
    onDecodeResult: (result) => {
      setData(result.getText());
    },
    paused: !visible,
  });

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => {
        onCancel();
      }}
      footer={null}
      centered
    >
      <>
        <video width={"100%"} ref={ref} />
      </>
    </Modal>
  );
};

export default QRReader;
