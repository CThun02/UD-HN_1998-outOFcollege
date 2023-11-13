import { Button, Form, Input, Space, notification } from "antd";
import styles from "./SignUp.module.css";
import Password from "antd/es/input/Password";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { NotificationContext } from "../../element/notification/NotificationAuthen";
import { setAuthHeader } from "../../../service/Token";

const baseUrl = "http://localhost:8080/api/v1/auth/signup";

function SignUp() {
  const [form] = Form.useForm();
  const [signUp, setSignUp] = useState({
    username: "",
    password: "",
    rePassword: "",
    email: "",
    phoneNumber: "",
    fullName: "",
    role: "customer",
  });
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const { showSuccessNotification } = useContext(NotificationContext);

  async function handleOnSubmit() {
    try {
      const res = await axios.post(baseUrl, signUp);
      const data = await res.data;
      const status = await res.status;

      if (status === 201) {
        setAuthHeader(data.token);
      }
      showSuccessNotification("Đăng kí thành công", "login");
      navigate("/ms-shop/home");
    } catch (err) {
      api.error({
        message: `Đã xảy ra lỗi`,
        description: `${err.response.data?.message}`,
      });
    }
  }

  return (
    <div className={styles.background}>
      {contextHolder ? contextHolder : null}
      <div className={styles.content}>
        <div className={styles.parrentDiv}>
          <div className={styles.image}></div>
          <div className={styles.childDiv}>
            <Form form={form} onFinish={handleOnSubmit}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <h1 className={styles.h1}>Đăng kí tài khoản</h1>
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
                    value={signUp.username}
                    onChange={(e) =>
                      setSignUp({ ...signUp, username: e.target.value })
                    }
                    className={styles.input}
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
                          if (
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(value)
                          ) {
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
                    placeholder="Nhập mật khẩu"
                    size="large"
                    value={signUp.password}
                    onChange={(e) =>
                      setSignUp({ ...signUp, password: e.target.value })
                    }
                    className={styles.input}
                  />
                </Form.Item>
                <Form.Item
                  name={"rePassword"}
                  rules={[
                    {
                      required: true,
                      message: "* Không được bỏ trống",
                    },

                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "* Nhập lại mật khẩu phải trùng với mật khẩu đã nhập"
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
                    value={signUp.rePassword}
                    onChange={(e) =>
                      setSignUp({ ...signUp, rePassword: e.target.value })
                    }
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
                    value={signUp.fullName}
                    onChange={(e) =>
                      setSignUp({ ...signUp, fullName: e.target.value })
                    }
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
                      message:
                        "* Số điện thoại chỉ chứa 10 số và bắt đầu bằng số 0",
                    },
                  ]}
                >
                  <Input
                    name={"phoneNumber"}
                    placeholder="Số điện thoại"
                    size="large"
                    value={signUp.phoneNumber}
                    onChange={(e) =>
                      setSignUp({ ...signUp, phoneNumber: e.target.value })
                    }
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
                    value={signUp.email}
                    onChange={(e) =>
                      setSignUp({ ...signUp, email: e.target.value })
                    }
                    className={styles.input}
                  />
                </Form.Item>
                <div className={styles.center}>
                  <Link to={"/authen/sign-in"}>Đăng nhập ngay</Link>
                </div>
                <div>
                  <Button
                    type="primary"
                    size="large"
                    className={styles.button}
                    htmlType="submit"
                  >
                    Xác nhận
                  </Button>
                </div>
              </Space>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
