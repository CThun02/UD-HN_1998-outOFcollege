import UserAddress from "./UserAddress";
import styles from "./Address.module.css";
import { Col, DatePicker, Form, Input, Modal, Radio, Row, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import EditAddress from "../../../../element/edit-address/EditAddress";

function Address({ address, setIsRender }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.address}>
      <div className={styles.content}>
        <Space style={{ width: "100%" }} direction="vertical" size={24}>
          <div className={styles.title}>
            <Row style={{ margin: 0 }}>
              <Col span={23}>
                <h2 className={styles.textColor}>Địa chỉ</h2>
              </Col>
              {address?.length < 3 && (
                <Col
                  span={1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PlusCircleOutlined
                    style={{
                      fontSize: "1.25rem",
                    }}
                    onClick={() => setOpen(true)}
                    className={styles.plusIcon}
                  />
                  {open && <EditAddress
                    isModalOpen={open}
                    handleAddressCancel={() => setOpen(false)}
                  />}
                </Col>
              )}
            </Row>
          </div>

          <div className={styles.body}>
            <Space style={{ width: "100%" }} direction="vertical" size={24}>
              {address?.map((address, i) => (
                <UserAddress
                  address={address}
                  index={i}
                  key={address.idAddress}
                  setIsRender={setIsRender}
                />
              ))}
            </Space>
          </div>
        </Space>
      </div>
    </div>
  );
}

function SaveAddress({ setIsModalOpen, isModalOpen }) {
  const [form] = Form.useForm();
  const [userUpdate, setUserUpdate] = useState({
    city: "",
    district: "",
    ward: "",
    street: "",
    email: "",
    phoneNumber: "",
    fullName: "",
    addressDetail: "",
    defaultAddress: "",
  });

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      centered
      title="Lưu địa chỉ"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item
            name={"fullName"}
            rules={[
              {
                required: true,
                message: "* Họ và tên không được bỏ trống",
                whitespace: true,
              },
            ]}
          >
            <Input
              name={"fullName"}
              placeholder="Họ và tên"
              size="large"
              className={styles.input}
            />
          </Form.Item>
          <Form.Item
            name={"phoneNumber"}
            rules={[
              {
                required: true,
                message: "* Số điện thoại không được bỏ trống",
                whitespace: true,
              },
              {
                pattern: /^0\d{9}$/,
                message: "* Số điện thoại chỉ chứa 10 số và bắt đầu bằng số 0",
              },
            ]}
          >
            <Input
              name={"phoneNumber"}
              placeholder="Số điện thoại"
              size="large"
              className={styles.input}
            />
          </Form.Item>
          <Form.Item
            name={"email"}
            rules={[
              {
                type: "email",
                message: "* Vui lòng nhập đúng định dạng Email",
              },
              {
                required: true,
                message: "* Không được bỏ trống",
              },
            ]}
          >
            <Input
              name="email"
              placeholder="Email"
              size="large"
              className={styles.input}
            />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
}

export default Address;
