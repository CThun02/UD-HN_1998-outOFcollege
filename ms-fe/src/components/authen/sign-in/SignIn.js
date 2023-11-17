import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  notification,
} from "antd";
import styles from "./SignIn.module.css";
import Password from "antd/es/input/Password";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { NotificationContext } from "../../element/notification/NotificationAuthen";
import { useContext } from "react";
import { setAuthHeader } from "../../../service/Token";

const facebookLogo = "/logo/facebook.png";
const googleLogo = "/logo/google.png";

const baseUrl = "http://localhost:8080/api/v1/auth/login";

function SignIn({ isAuthenAdmin }) {
  const [form] = Form.useForm();
  const [login, setLogin] = useState({
    login: "",
    password: "",
  });
  const navigate = useNavigate();
  const { showSuccessNotification } = useContext(NotificationContext);
  const [api, contextHolder] = notification.useNotification();

  async function handleOnSubmit() {
    try {
      const res = await axios.post(baseUrl, login);
      const data = await res.data;
      const status = await res.status;

      if (status === 200) {
        setAuthHeader(data.token);
      }

      showSuccessNotification("Đăng nhập thành công", "login");
      navigate(isAuthenAdmin ? "/api/admin" : "/ms-shop/home");
    } catch (err) {
      api.error({
        message: `Đã xảy ra lỗi`,
        description: `Tài khoản hoặc mật khẩu không chính xác.`,
      });
    }
  }

  return (
    <div className={styles.background}>
      {contextHolder}
      <div className={styles.content}>
        <div className={styles.parrentDiv}>
          <div className={styles.image}></div>
          <div className={styles.childDiv}>
            <Form form={form} onFinish={handleOnSubmit}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <h1 className={styles.h1}>Đăng nhập</h1>
                <Form.Item
                  name={"username"}
                  rules={[
                    {
                      required: true,
                      message: "* Tên đăng nhập không được bỏ trống",
                      whitespace: true,
                    },
                  ]}
                >
                  <Input
                    name={"username"}
                    placeholder="Tên đăng nhập"
                    size="large"
                    className={styles.input}
                    value={login.login}
                    onChange={(e) =>
                      setLogin({ ...login, login: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item
                  name={"password"}
                  rules={[
                    {
                      required: true,
                      message: "* Tên đăng nhập không được bỏ trống",
                      whitespace: true,
                    },
                  ]}
                >
                  <Password
                    name={"password"}
                    placeholder="Nhập mật khẩu"
                    size="large"
                    className={styles.input}
                    value={login.password}
                    onChange={(e) =>
                      setLogin({ ...login, password: e.target.value })
                    }
                  />
                </Form.Item>
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
                {isAuthenAdmin === false && (
                  <div className={styles.center}>
                    <Link to={"/authen/re-password"}>Quên mật khẩu?</Link>
                    <Link to={"/authen/sign-up"}>Đăng kí tài khoản</Link>
                  </div>
                )}
                <div>
                  <Divider
                    style={{ margin: "0", color: "#B0A695", fontWeight: 400 }}
                  >
                    Hoặc
                  </Divider>
                </div>
                <div className={styles.flex}>
                  <Button size="large" className={styles.logoIcon}>
                    <img
                      src={facebookLogo}
                      alt="facebook"
                      style={{ width: "20px", marginRight: "10px" }}
                    />
                    <span>Facebook</span>
                  </Button>
                  <Button size="large" className={styles.logoIcon}>
                    <img
                      src={googleLogo}
                      alt="google"
                      style={{ width: "20px", marginRight: "10px" }}
                    />
                    <span>Google</span>
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

export default SignIn;
