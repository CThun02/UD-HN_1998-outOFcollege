import Modal from "antd/es/modal/Modal";
import React, { useEffect } from "react";

const ModalProductReturnDetail = ({
  open,
  title,
  onCancel,
  productDetailId,
}) => {
  useEffect(() => {
    console.log(productDetailId);
  }, [productDetailId]);

  return (
    <Modal
      width={1000}
      centered
      open={open}
      title={title}
      onCancel={onCancel}
      footer={null}
    >
      ModalProductReturnDetail
    </Modal>
  );
};

export default ModalProductReturnDetail;
