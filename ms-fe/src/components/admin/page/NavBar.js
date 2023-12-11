import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  List,
  Popover,
  Space,
  notification,
} from "antd";
import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import {
  BellOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useEffect } from "react";
import { clearAuthToken, getAuthToken, getToken } from "../../../service/Token";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import numeral from "numeral";
import moment from "moment";
import SockJs from "../../../service/SockJs";
import { NotificationContext } from "../../element/notification/NotificationAuthen";

const baseUrl = "http://localhost:8080/api/v1";
const NavBar = () => {
  const [user, setUser] = useState("");
  const token = getToken(true);
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { label: "3rd menu item", key: "3" },
  ]);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [apiNotification, contextHolder] = notification.useNotification();
  const { successMessage, clearNotification, context } =
    useContext(NotificationContext);

  useEffect(() => {
    let isCheck = true;
    async function notification() {
      if (
        successMessage !== "" &&
        isCheck === true &&
        context === "confirm-order"
      ) {
        apiNotification.success({
          message: `Success`,
          description: `${successMessage}`,
        });
        clearNotification();
      }
    }
    console.log("successMessage:  ", successMessage);
    console.log("context:  ", context);
    return () => {
      notification(true);
      isCheck = false;
    };
  }, [successMessage, clearNotification, apiNotification, context]);

  function handlePageSize(current, size) {
    setPageNo(current);
    setPageSize(size);
  }

  useEffect(() => {
    async function getNotifications() {
      try {
        const res = await axios.get(baseUrl + "/notification/findAll");
        const data = await res.data;
        setNotifications(data);
      } catch (err) {
        console.log(err);
      }
    }

    getNotifications();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/authen/admin/sign-in");
    }
  }, [navigate, token]);
  const content = (
    <div style={{ width: "100px" }}>
      <p>
        <Link
          onClick={() => {
            clearAuthToken(true);
            setUser("");
          }}
          className={styles.link}
        >
          Đăng xuất
        </Link>
      </p>
    </div>
  );

  useEffect(() => {
    return () =>
      getAuthToken(true)
        .then((data) => {
          setUser(data?.fullName);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);

  return (
    <>
      {contextHolder}
      <div className={styles.navBar}>
        <SockJs
          setValues={setNotifications}
          connectTo={"notifications-topic"}
        />
        <div className={styles.navBar__contentPosition}>
          <Space>
            <Button className={styles.navBar__button}>
              <MenuFoldOutlined />
            </Button>
            <Breadcrumb
              items={[
                {
                  href: "http://localhost:3000/api/admin",
                  title: <HomeOutlined />,
                },
                {
                  title: (
                    <>
                      <UserOutlined />
                      <span>Application List</span>
                    </>
                  ),
                },
              ]}
            />
          </Space>
          <Space>
            <Button className={styles.navBar__button}>
              <Badge count={notifications?.length}>
                <Dropdown
                  overlay={() =>
                    NotificationList(notifications, handlePageSize, pageSize)
                  }
                  trigger={["click"]}
                >
                  <BellOutlined
                    style={{
                      fontSize: notifications?.length ? "26px" : "24px",
                      color: "#111111",
                    }}
                  />
                </Dropdown>
              </Badge>
            </Button>
            <div className={styles.navBar__avatar}></div>
            {user && (
              <>
                <span>Xin chào,</span>

                <Popover
                  content={content}
                  placement="bottomLeft"
                  trigger="hover"
                >
                  <strong>{user}</strong>
                </Popover>
              </>
            )}
          </Space>
        </div>
      </div>
    </>
  );
};

function NotificationList(notifications, handlePageSize, pageSize) {
  return (
    <div style={{ padding: "16px", backgroundColor: "#fff" }}>
      <List
        itemLayout="horizontal"
        dataSource={notifications}
        renderItem={(item) => (
          <Link
            to={`/api/admin/counter-sales/${item.billId}/timeline`}
            className={styles.hover}
          >
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.imageDefault} />}
                title={`Chờ xác nhận - ${moment(item.orderDate).format(
                  "HH:mm DD/MM/YYYY"
                )}`}
                description={`${item.productName} - ${item.brandName} - ${item.categoryName}`}
                style={{ width: "300px" }}
              />
            </List.Item>
          </Link>
        )}
        pagination={{
          showSizeChanger: false,
          pageSize: pageSize,
          showLessItems: true,
          style: { marginRight: "10px" },
          onChange: (currentPage, pageSize) => {
            handlePageSize(currentPage, pageSize);
          },
        }}
      />
    </div>
  );
}

export default NavBar;
