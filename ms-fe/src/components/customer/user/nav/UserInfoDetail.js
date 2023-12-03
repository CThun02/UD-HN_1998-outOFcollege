import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  message,
} from "antd";
import styles from "./UserInfoDetail.module.css";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import Password from "antd/es/input/Password";
import { useEffect } from "react";
import axios from "axios";
import bcrypt from 'bcryptjs';


function UserInfoDetail({ user, setIsRender }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  return (
    <div className={styles.userInfoDetail}>
      <div className={styles.content}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <div className={styles.title}>
            <Row
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
              }}
            >
              <Col span={23}>
                <h2>Thông tin tài khoản</h2>
              </Col>
              <Col span={1}>
                <EditOutlined
                  style={{ fontSize: "1.25rem" }}
                  className={styles.addressEdit}
                  onClick={showModal}
                />
              </Col>
            </Row>
          </div>

          <EditUser isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} user={user?.userInfomationDTO} />

          <div className={styles.body}>
            <Row style={{ margin: 0 }}>
              <Col span={16} style={{ borderRight: "1px solid #ccc" }}>
                <RowUserInfo
                  title={"Tên đăng nhập"}
                  data={user?.userInfomationDTO?.username}
                />
                <RowUserInfo title={"Mật khẩu"} data={"**********"} />
                <RowUserInfo
                  title={"Họ và tên"}
                  data={user?.userInfomationDTO?.fullName}
                />
                <RowUserInfo
                  title={"Email"}
                  data={user?.userInfomationDTO?.email}
                />
                <RowUserInfo
                  title={"Số điện thoại"}
                  data={user?.userInfomationDTO?.phoneNumber}
                />
                <RowUserInfo
                  title={"Giới tính"}
                  data={user?.userInfomationDTO?.gender}
                />
                <RowUserInfo
                  title={"Ngày sinh"}
                  data={user?.userInfomationDTO?.date}
                />
              </Col>
              <Col span={8}>
                <div className={styles.center}>
                  <Avatar
                    size={{
                      xs: 124,
                      sm: 132,
                      md: 140,
                      lg: 164,
                      xl: 180,
                      xxl: 200,
                    }}
                    icon={<UserOutlined />}
                    style={{ backgroundColor: "#EBE3D5" }}
                  />
                </div>
                <div className={styles.center}>
                  <Button type="primary" className={styles.btnColor}>
                    Chọn ảnh
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        </Space>
      </div>
    </div>
  );
}

function RowUserInfo({ title, data }) {
  return (
    <Row>
      <Col span={8} className={`${styles.textSize}`}>
        {title}
      </Col>
      <Col span={16} className={`${styles.textSize} ${styles.textColor}`}>
        {data ? (
          data
        ) : (
          <span style={{ fontStyle: "italic" }}>{`<Không có dữ liệu>`}</span>
        )}
      </Col>
    </Row>
  );
}

function EditUser({ setIsModalOpen, isModalOpen, user }) {
  const [form] = Form.useForm();
  const [userUpdate, setUserUpdate] = useState({
    username: "",
    password: "",
    passwordNew: "",
    rePassword: "",
    email: "",
    phoneNumber: "",
    fullName: "",
    role: "customer",
  });

  useEffect(() => {
    if (user && 'password' in user) {
      const { password, ...userWithoutPassword } = user;
      setUserUpdate(userWithoutPassword);
    } else {
      setUserUpdate(user);
    }
  }, [isModalOpen, user])

  const handleOk = () => {
    const formData = form.getFieldsValue();

    form.validateFields().then((values) => {
      const enteredPassword = values.password;
      const savedPassword = user.password;

      bcrypt.compare(enteredPassword, savedPassword, (err, result) => {
        if (err) {
          console.error(err);
          return;
        }
        if (result) {
          axios.post(`http://localhost:8080/api/client/user/update-user`, formData)
            .then(response => console.log(response))
            .catch(err => console.log(err))
          setIsModalOpen(false);
          message.info(`User updated`)
        } else {
          form.setFields([
            {
              name: 'password',
              errors: ['Mật khẩu không đúng'],
            },
          ]);
        }
      });
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      centered
      title="Sửa thông tin"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} initialValues={userUpdate}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Form.Item
            name={"username"}
            rules={[
              {
                required: true,
                message: "* Tên đăng nhập không được bỏ trống",
                whitespace: true,
              },
              {
                min: 6,
                message: "* Tên đăng nhập lơn hơn 6 kí tự",
              },
            ]}
          >
            <Input
              name={"username"}
              placeholder="Tên đăng nhập"
              size="large"
              className={styles.input}
              readOnly
              disabled
            />
          </Form.Item>

          <Form.Item
            name={"password"}
            rules={[
              {
                required: true,
                message: "* Mật khẩu không được bỏ trống",
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.length >= 10) {
                    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        "* Mật khẩu chứa kí tự in hoa và kí tự thường và số"
                      );
                    }
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Password
              name={"password"}
              placeholder="Nhập mật khẩu cũ"
              size="large"
              className={styles.input}
            />
          </Form.Item>

          <Form.Item
            name={"passwordNew"}
            rules={[
              {
                required: true,
                message: "* Mật khẩu mới không được bỏ trống",
                whitespace: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value.length >= 10) {
                    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        "* Mật khẩu mới chứa kí tự in hoa và kí tự thường và số"
                      );
                    }
                  } else {
                    return Promise.resolve();
                  }
                },
              }),
            ]}
          >
            <Password
              name={"passwordNew"}
              placeholder="Nhập mật khẩu mới"
              size="large"
              className={styles.input}
            />
          </Form.Item>

          <Form.Item
            name={"rePassword"}
            dependencies={['passwordNew']}
            rules={[
              {
                required: true,
                message: "* Không được bỏ trống",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const passwordNew = getFieldValue('passwordNew');
                  if (!value || passwordNew === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "* Nhập lại mật khẩu mới phải trùng với mật khẩu đã nhập"
                    )
                  );
                },
              }),
            ]}
          >
            <Password
              name={"rePassword"}
              placeholder="Nhập lại mật khẩu"
              size="large"
              className={styles.input}
            />
          </Form.Item>

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
          {/* <div>
          <Button
            type="primary"
            size="large"
            className={styles.button}
            htmlType="submit"
          >
            Xác nhận
          </Button>
        </div> */}
        </Space>
      </Form>
    </Modal>
  );
}

export default UserInfoDetail;
