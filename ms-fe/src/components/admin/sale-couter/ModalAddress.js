import { text } from "@fortawesome/fontawesome-svg-core";
import { Button, Col, Modal, Row, Table } from "antd";
import axios from "axios";
import styles from "./search.module.css";
import React, { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import { SearchOutlined } from "@ant-design/icons";

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
              record.ward.replace(/[0-9|-]/g, "") +
              " " +
              record.district.replace(/[0-9|-]/g, "") +
              " " +
              record.city.replace(/[0-9|-]/g, "")}
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
            <Button type="primary" onClick={() => handleSelectAddress(record)}>
              Chọn
            </Button>
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
        title="Tìm kiếm địa chỉ"
      >
        <Row>
          <Col span={12} style={{ marginBottom: "12px" }}>
            <Input
              className={styles.filter_inputSearch}
              placeholder="Nhập địa chỉ"
              prefix={<SearchOutlined />}
              onChange={(event) => {}}
            />
          </Col>
          <Col span={24}>
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
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ModalAddress;
