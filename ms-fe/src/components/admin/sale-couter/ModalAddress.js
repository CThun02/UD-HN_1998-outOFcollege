import { text } from "@fortawesome/fontawesome-svg-core";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ModalAddress = ({
  isModalOpen,
  handleOk,
  handleCancel,
  address,
  render,
  selectedAddress,
}) => {
  const columns = [
    {
      title: "#",
      key: "STT",
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: "Địa chỉ",
      key: "address",
      render: (text, record, index) => {
        return (
          <>
            {record.descriptionDetail +
              " " +
              record.ward +
              " " +
              record.district +
              " " +
              record.city}
          </>
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record, index) => {
        return (
          <div>
            <Button onClick={() => handleSelectAddress(record)}>Chọn</Button>
          </div>
        );
      },
    },
  ];

  const handleSelectAddress = (record) => {
    // selected(index);
    selectedAddress(record);
    handleCancel();
    render(Math.random);
  };

  return (
    <div>
      <Modal
        closeIcon={true}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={1000}
      >
        <Table
          columns={columns}
          dataSource={
            address &&
            address.map((record, index) => ({
              ...record,
              key: record.id,
            }))
          }
          pagination={false}
          closeIcon
        />
      </Modal>
    </div>
  );
};

export default ModalAddress;
