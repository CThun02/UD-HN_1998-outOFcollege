import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Space,
  notification,
} from "antd";
import styles from "./UserInfoDetail.module.css";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import Password from "antd/es/input/Password";
import { useEffect } from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import moment from "moment";
const format = 'YYYY-MM-DD'

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

          <EditUser
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            user={user?.userInfomationDTO}
            setIsRender={setIsRender}
          />

          <div className={styles.body}>
            <Row style={{ margin: 0 }}>
              <Col xs={24} sm={16} className={styles.border}>
                <RowUserInfo
                  title={"Tài khoản"}
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
                  data={user?.userInfomationDTO?.gender === true ? 'Nam' : 'Nữ'}
                />
                <RowUserInfo
                  title={"Ngày sinh"}
                  data={moment(user?.userInfomationDTO?.date).format('DD/MM/YYYY')}
                />
              </Col>
              <Col xs={24} sm={8}>
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
      <Col span={10} className={`${styles.textSize}`}>
        {title}
      </Col>
      <Col span={14} className={`${styles.textSize} ${styles.textColor}`}>
        {data ? (
          data
        ) : (
          <span style={{ fontStyle: "italic" }}>{`<Không có dữ liệu>`}</span>
        )}
      </Col>
    </Row>
  );
}

function EditUser({ setIsModalOpen, isModalOpen, user, setIsRender }) {
  const [form] = Form.useForm();
  const [userUpdate, setUserUpdate] = useState({
    username: "",
    password: "",
    newPassword: "",
    rePassword: "",
    email: "",
    phoneNumber: "",
    fullName: "",
    gender: true,
    dateOfBirth: '',
    role: "customer",
  });
  const [dob, setDob] = useState(null)
  useEffect(() => {
    if (user && "password" in user) {
      const { password, ...userWithoutPassword } = user;

      setDob(moment(user.date).format('YYYY-MM-DD'))
      setUserUpdate(userWithoutPassword)
    } else {
      setUserUpdate(user);
    }
  }, [isModalOpen, user]);

  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        const formData = form.getFieldsValue();

        bcrypt.compare(formData.password, user.password, (err, result) => {
          if (err) {
            console.error(err);
            return;
          }

          if (result) {
            axios
              .post(
                `http://localhost:8080/api/client/user/update-user`,
                formData
              )
              .then((response) => {
                setIsRender(response.data);
                setIsModalOpen(false);
                notification.success({
                  message: "Thông báo",
                  description: "Sửa thông tin thành công",
                  duration: 2,
                });
                form.resetFields();
              })
              .catch((err) => console.log(err));
          } else {
            form.setFields([
              {
                name: "password",
                errors: ["Mật khẩu không đúng"],
              },
            ]);
          }
        });
      })
      .catch((error) => {
        console.log("Validation failed:", error);
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

          <Form.Item
            name="gender"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn giới tính',
              },
            ]}
          >
            <Radio.Group>
              <Radio value={true}>Nam</Radio>
              <Radio value={false}>Nữ</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Ngày sinh"
            name="dateOfBirth"
            rules={[
              {
                required: true,
                message: 'Ngày sinh không được bỏ trống!',
              },
            ]}
            initialValue={moment(dob)}
          >
            <DatePicker format={format} disabledDate={current => current && current > moment().endOf('day')} />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
}

export default UserInfoDetail;
