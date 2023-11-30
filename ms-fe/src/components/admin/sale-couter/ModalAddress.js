import { Button, Col, Modal, Row, Table, notification } from "antd";
import styles from "./search.module.css";
import React, { useState } from "react";
import Input from "antd/es/input/Input";
import { SearchOutlined } from "@ant-design/icons";
import ModalCreateAddress from "../../customer/checkout/ModalCreateAddress";
import axios from "axios";
import { getAuthToken } from "../../../service/Token";
import { useEffect } from "react";

const ModalAddress = ({
  isModalOpen,
  handleOk,
  handleCancel,
  render,
  selectedAddress,
  username
}) => {
  const [renderAddress, setRenderAddress] = useState(null)
  const [address, setAddress] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const columns = [
    {
      title: "#",
      key: "STT",
      render: (text, record, index) => {
        return (currentPage - 1) * pageSize + index + 1;
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

  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const showModalAddress = () => {
    if (address.length > 10) {
      notification.warning({
        message: 'Thông báo',
        description: 'Tối đa 10 địa chỉ.',
        duration: 2
      })
    } else {
      setIsModalAddressOpen(true);
    }
  };

  const handleAddressOk = () => {
    setIsModalAddressOpen(false);
  };

  const handleAddressCancel = () => {
    setIsModalAddressOpen(false);
  };

  const getAddress = async () => {
    if (username) {
      await axios.get(`http://localhost:8080/api/client/address?username=${username}`)
        .then((response) => {
          setAddress(response.data)
        }).catch((error) => {
          const status = error.response?.status;
          if (status === 403) {
            notification.error({
              message: "Thông báo",
              description: "Bạn không có quyền truy cập!",
            });
          }
        })
    }
  }

  useEffect(() => {
    getAddress();
  }, [renderAddress, username])

  return (
    <div>
      <Modal
        centered
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
              onChange={(event) => { }}
            />
          </Col>
          <Col span={6}></Col>
          <Col span={6}>
            <Button type="primary"
              onClick={showModalAddress}>
              Thêm địa chỉ mới
            </Button>
            <ModalCreateAddress
              isModalOpen={isModalAddressOpen}
              handleAddressOk={handleAddressOk}
              handleAddressCancel={handleAddressCancel}
              render={setRenderAddress}
              username={username}
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
              pagination={{
                showSizeChanger: true,
                pageSizeOptions: [5, 10, 15, 20],
                defaultPageSize: 5,
                showLessItems: true,
                style: { marginRight: "10px" },
                onChange: (currentPage, pageSize) => {
                  setCurrentPage(currentPage);
                  setPageSize(pageSize);
                },
              }}
              closeIcon
            />
          </Col>
        </Row>
      </Modal>
    </div >
  );
};

export default ModalAddress;