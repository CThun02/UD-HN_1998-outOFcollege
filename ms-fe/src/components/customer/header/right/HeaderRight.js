import { Badge, Col, Popover, Row, Space } from "antd";
import styles from "./HeaderRight.module.css";
import { Link } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { getAuthToken, clearAuthToken } from "../../../../service/Token";
import { useContext } from "react";
import { NotificationContext } from "../../../element/notification/NotificationAuthen";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

function HeaderRight() {
  const { showSuccessNotification } = useContext(NotificationContext);
  const [user, setUser] = useState("");
  const [data, setData] = useState(null);
  const cartAPI = 'http://localhost:8080/api/admin/cart';
  const token = getAuthToken();
  useEffect(() => {
    return () =>
      token
        .then((data) => {
          setUser(data?.fullName);
          setData(data?.username);
        })
        .catch((error) => {
          console.log(error);
          showSuccessNotification({ error }, "login");
        });
  }, []);

  const content = (
    <div style={{ width: "100px" }}>
      {user ? (
        <p>
          <Link
            onClick={() => {
              clearAuthToken();
              setUser("");
            }}
            className={styles.link}
          >
            Đăng xuất
          </Link>
        </p>
      ) : (
        <>
          <p>
            <Link to={"/authen/sign-in"} className={styles.link}>
              Đăng nhập
            </Link>
          </p>
        </>
      )}
    </div>
  );

  const handleCreateCartByUsername = () => {
    if (data) {
      try {
        const response = axios.post(`${cartAPI}/createCart?username=` + data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.flex}>
      <Row className={styles.margin}>
        <Col span={24}>
          <div className={styles.lineHeight}>
            <Row className={styles.margin}>
              <Col span={user ? 4 : 11}></Col>
              <Col span={4}>
                <Link to={"/ms-shop/about"} className={styles.link}>
                  Giới thiệu
                </Link>
              </Col>
              <Col span={4}>
                <Link to={"/ms-shop/contact"} className={styles.link}>
                  Liên hệ
                </Link>
              </Col>
              <Col span={4}>
                <p className={styles.cssParagraph}>$0.00</p>
                <Badge count={5}>
                  <Link to={"/ms-shop/cart"} onClick={() => handleCreateCartByUsername()} className={styles.link}>
                    <ShoppingCartOutlined className={styles.iconSize} />
                  </Link>
                </Badge>
              </Col>
              <Col span={user ? 8 : 1} className={styles.centerd}>
                <Space>
                  {user ? (
                    <div>
                      <span>Xin chào, </span> <strong>{user}</strong>
                    </div>
                  ) : null}
                  <Link className={styles.link}>
                    <Popover
                      content={content}
                      placement="bottomLeft"
                      trigger="hover"
                    >
                      <UserOutlined className={styles.iconSize} />
                    </Popover>
                  </Link>
                </Space>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HeaderRight;
