import styles from "./FogotPassword.module.css";
import { NotificationContext } from "../../element/notification/NotificationAuthen";
import { Button, Form, Input, Space, Spin, notification } from "antd";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:8080/api/v1/auth/rePassword";

function FogotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [rePassword, setRepassword] = useState({
    email: "",
  });
  const { showSuccessNotification } = useContext(NotificationContext);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  async function handleOnSubmit() {
    try {
      const res = await axios.post(baseUrl, rePassword);
      const status = await res.status;

      if (status === 200) {
        showSuccessNotification(
          "Mật khẩu đã được gửi tới email.",
          "rePassword"
        );
        navigate("/authen/sign-in");
      }
      setIsLoading(false);
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        api.error({
          message: `Đã xảy ra lỗi`,
          description: `Máy chủ đang bảo trì.`,
        });
        return;
      }

      api.error({
        message: `Đã xảy ra lỗi`,
        description: `Email không chính xác`,
      });

      setIsLoading(false);
    }
  }
  return (
    <Spin
      tip="Vui lòng chờ..."
      spinning={isLoading}
      size="large"
      style={{ width: "100%" }}
    >
      <div className={styles.background}>
        {contextHolder}
        <div className={styles.content}>
          <div className={styles.parrentDiv}>
            <div className={styles.image}></div>
            <div className={styles.childDiv}>
              <Form form={form} onFinish={handleOnSubmit}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <h1 className={styles.h1}>Quên mật khẩu</h1>
                  <Form.Item
                    style={{ margin: 0 }}
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
                      value={rePassword.email}
                      onChange={(e) =>
                        setRepassword({ ...rePassword, email: e.target.value })
                      }
                      className={styles.input}
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
                </Space>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default FogotPassword;
