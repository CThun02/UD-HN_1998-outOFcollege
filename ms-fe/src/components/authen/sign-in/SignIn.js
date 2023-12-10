import { Button, Divider, Form, Input, Space, Spin, notification } from "antd";
import styles from "./SignIn.module.css";
import Password from "antd/es/input/Password";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { NotificationContext } from "../../element/notification/NotificationAuthen";
import { useContext } from "react";
import { getToken, setAuthHeader } from "../../../service/Token";
import { useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const facebookLogo = "/logo/facebook.png";
const googleLogo = "/logo/google.png";

const baseUrl = "http://localhost:8080/api/v1/auth";

function SignIn({ isAuthenAdmin }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [form] = Form.useForm();
  const [login, setLogin] = useState({
    login: "",
    password: "",
    role: isAuthenAdmin ? "ROLE_ADMIN" : "ROLE_CUSTOMER",
  });
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [apiNotification, contextHolderCore] = notification.useNotification();
  const {
    successMessage,
    clearNotification,
    context,
    showSuccessNotification,
  } = useContext(NotificationContext);
  async function handleOnSubmit() {
    try {
      if (!getToken(isAuthenAdmin)) {
        const res = await axios.post(baseUrl + "/login", login);
        const data = await res.data;
        const status = await res.status;

        if (status === 200) {
          setAuthHeader(data.token, isAuthenAdmin);
        }

        showSuccessNotification("Đăng nhập thành công", "login");
        navigate(isAuthenAdmin ? "/api/admin" : "/ms-shop/home");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      if (err.code === "ERR_NETWORK") {
        api.error({
          message: `Đã xảy ra lỗi`,
          description: `Máy chủ đang bảo trì.`,
        });
        return;
      }

      api.error({
        message: `Đã xảy ra lỗi`,
        description: `Tài khoản hoặc mật khẩu không chính xác.`,
      });
    }
  }

  async function handleOnSubmitGoogle(token) {
    try {
      if (!getToken(isAuthenAdmin)) {
        const decode = jwtDecode(token);
        const objectGoogle = {
          email: decode.email,
          name: decode.name,
          picture: decode.picture,
          role: isAuthenAdmin ? "ROLE_ADMIN" : "ROLE_CUSTOMER",
          isAdmin: isAuthenAdmin,
        };
        const res = await axios.post(baseUrl + "/google", objectGoogle);
        const data = await res.data;
        const status = await res.status;

        if (status === 200) {
          setAuthHeader(data.token, isAuthenAdmin);
        }

        showSuccessNotification("Đăng nhập thành công", "login");
        navigate(isAuthenAdmin ? "/api/admin" : "/ms-shop/home");
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      if (err.code === "ERR_NETWORK") {
        api.error({
          message: `Đã xảy ra lỗi`,
          description: `Máy chủ đang bảo trì.`,
        });
        return;
      }

      api.error({
        message: `Đã xảy ra lỗi`,
        description: `Tài khoản hoặc mật khẩu không chính xác.`,
      });
    }
  }

  useEffect(
    function () {
      let isCheck = true;
      async function notification() {
        if (
          successMessage !== "" &&
          successMessage !== null &&
          isCheck === true &&
          (context === "rePassword" || context === "signUp")
        ) {
          apiNotification.success({
            message: `Success`,
            description: `${successMessage}`,
          });
          clearNotification();
        }
      }

      return () => {
        notification(true);
        isCheck = false;
        setIsLoading(false);
      };
    },
    [successMessage, clearNotification, apiNotification, context]
  );

  useEffect(() => {
    if (getToken(isAuthenAdmin)) {
      setIsLoadingPage(false);
      navigate(isAuthenAdmin ? "/api/admin" : "/ms-shop");
    }
  }, [navigate, isAuthenAdmin]);

  return (
    <Spin
      tip="Vui lòng chờ..."
      spinning={isLoading}
      size="large"
      style={{ width: "100%" }}
    >
      <div className={styles.background}>
        {isLoadingPage && (
          <>
            {contextHolderCore} {contextHolder}
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
                          style={{
                            margin: "0",
                            color: "#B0A695",
                            fontWeight: 400,
                          }}
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
                        {isAuthenAdmin ? (
                          <GoogleOAuthProvider clientId="142772119548-58psqiarvspr1356mm7itghqsqbbl38d.apps.googleusercontent.com">
                            <GoogleLogin
                              onSuccess={(credentialResponse) =>
                                handleOnSubmitGoogle(
                                  credentialResponse.credential
                                )
                              }
                              onError={() => {
                                api.error({
                                  message: `Đã xảy ra lỗi`,
                                  description: `Máy chủ đang bảo trì. Vui lòng đăng nhập phương thức khác.`,
                                });
                                return;
                              }}
                              key={"login"}
                            />
                          </GoogleOAuthProvider>
                        ) : (
                          <GoogleOAuthProvider clientId="650795647044-pqeg0r3lphvuire996mi13fh17fn0893.apps.googleusercontent.com">
                            <GoogleLogin
                              onSuccess={(credentialResponse) =>
                                handleOnSubmitGoogle(
                                  credentialResponse.credential
                                )
                              }
                              onError={() => {
                                api.error({
                                  message: `Đã xảy ra lỗi`,
                                  description: `Máy chủ đang bảo trì. Vui lòng đăng nhập phương thức khác.`,
                                });
                                return;
                              }}
                              key={"login"}
                            />
                          </GoogleOAuthProvider>
                        )}
                      </div>
                    </Space>
                  </Form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Spin>
  );
}

export default SignIn;
