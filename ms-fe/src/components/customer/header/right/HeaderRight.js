import { Badge, Popover, Space, notification, Dropdown } from "antd";
import styles from "./HeaderRight.module.css";
import { Link, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  ShopOutlined,
  CarOutlined,
  PhoneOutlined,
  FileOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { getAuthToken, clearAuthToken } from "../../../../service/Token";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { NotificationContext } from "../../../element/notification/NotificationAuthen";
const cartAPI = "http://localhost:8080/api/client/cart";

function HeaderRight(props) {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(null);
  const [usernameEncode, setUsernameEncode] = useState("");
  const [data, setData] = useState(null);
  const [cartIndex, setCartIndex] = useState({
    quantity: 0,
    totalPrice: 0,
  });
  const [apiNotification, contextHolder] = notification.useNotification();
  const { successMessage, clearNotification, context } =
    useContext(NotificationContext);
  const items = [
    {
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "12px",
            borderBottom: "1px solid #d0f1ff",
          }}
          onClick={() => navigate("/ms-shop/user/" + usernameEncode)}
        >
          <span style={{ fontWeight: 500 }}>
            Xin Chào, {user ? user : "quý khách"}
          </span>
          <img
            width={48}
            height={48}
            style={{
              marginLeft: "12px",
              borderRadius: "50%",
              border: "1px solid #edf2f9",
            }}
            alt=""
            src={
              userImage
                ? userImage
                : "https://img.freepik.com/premium-vector/camera-with-plus-sign-icon_625445-191.jpg?w=2000"
            }
          />
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          style={{ padding: "4px 12px" }}
          onClick={() => navigate("/ms-shop")}
        >
          <span>
            <HomeOutlined /> Trang chủ
          </span>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div
          style={{ padding: "4px 12px" }}
          onClick={() => navigate("/ms-shop/shopping")}
        >
          <span>
            <ShopOutlined /> Cửa hàng
          </span>
        </div>
      ),
      key: "3",
    },
    {
      label: (
        <div
          style={{ padding: "4px 12px" }}
          onClick={() => navigate("/ms-shop/follow-order")}
        >
          <span>
            <CarOutlined /> Theo dõi đơn hàng
          </span>
        </div>
      ),
      key: "4",
    },
    {
      label: (
        <div
          style={{ padding: "4px 12px" }}
          onClick={() => navigate("/ms-shop/about")}
        >
          <span>
            <FileOutlined /> Giới thiệu
          </span>
        </div>
      ),
      key: "5",
    },
    {
      label: (
        <div
          style={{ padding: "4px 12px" }}
          onClick={() => navigate("/ms-shop/contact")}
        >
          <span>
            <PhoneOutlined /> Liên hệ
          </span>
        </div>
      ),
      key: "6",
    },
    {
      label: (
        <div
          style={{ padding: "12px 12px", borderTop: "1px solid #edf2f9" }}
          onClick={() => logOutOrIn(user ? "/ms-shop" : "/authen/sign-in")}
        >
          <span>
            {user ? (
              <>
                <LogoutOutlined /> Đăng xuất
              </>
            ) : (
              <>
                <LoginOutlined /> Đăng nhập
              </>
            )}
          </span>
        </div>
      ),
      key: "7",
    },
  ];

  function logOutOrIn(link) {
    if (user) {
      clearAuthToken();
      setUser("");
      notification.success({
        message: "Thông báo",
        description: "Đăng xuất thành công",
      });
      props.setRenderHeader(Math.random());
    }
    navigate(link);
  }

  useEffect(() => {
    // return () =>
    getAuthToken()
      .then((data) => {
        setUser(data?.fullName);
        setData(data?.username);
        setUserImage(data?.image);
        if (data?.username) {
          axios
            .get(
              `http://localhost:8080/api/client/getCartIndex?username=${data?.username}`
            )
            .then((res) => {
              setCartIndex(res.data);
            })
            .catch((er) => {
              console.log(er);
            });
        } else {
          if (successMessage && context === "addToCart") {
            apiNotification.success({
              message: `Thông báo`,
              description: `${successMessage}`,
            });
            clearNotification();
          }

          setCartIndex({});
          const cartIndexLocal = JSON.parse(localStorage.getItem("user"));
          console.log(cartIndexLocal.productDetails);
          let totalPrice = 0;
          for (let i = 0; i < cartIndexLocal?.productDetails.length; i++) {
            totalPrice += Number(
              cartIndexLocal.productDetails[i].data[0].price *
                cartIndexLocal.productDetails[i].quantity
            );
          }
          setCartIndex(
            {
              quantity: cartIndexLocal?.productDetails.length,
              totalPrice: totalPrice,
            },
            Math.random()
          );
        }
        const enCodeData = btoa(JSON.stringify(data?.username));
        const convertPath = enCodeData.replace(/\//g, "-----");
        setUsernameEncode(convertPath);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("2");
  }, [
    props.render,
    apiNotification,
    clearNotification,
    successMessage,
    context,
  ]);

  const content = (
    <div style={{ width: "100px" }}>
      <p>
        <Link to={"/authen/sign-in"} className={styles.link}>
          Đăng nhập
        </Link>
      </p>
    </div>
  );

  const contentLogout = (
    <div style={{ width: "100px" }}>
      {user && (
        <p>
          <Link
            onClick={() => {
              clearAuthToken();
              setUser("");
              apiNotification.info({
                message: "Success",
                description: "Đăng xuất thành công!",
              });
              props.setRenderHeader(Math.random());
            }}
            to={"/ms-shop"}
            className={styles.link}
          >
            Đăng xuất
          </Link>
        </p>
      )}
    </div>
  );

  const handleCreateCartByUsername = () => {
    if (data) {
      try {
        axios.post(`${cartAPI}/createCart?username=` + data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={styles.flex}>
      {contextHolder}
      <div className={styles.lineHeight}>
        <div style={{ display: "inline-block", marginRight: "16px" }}>
          <p className={styles.cssParagraph}>
            {cartIndex.totalPrice?.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>
          <Badge count={cartIndex.quantity}>
            <Link
              to={"/ms-shop/cart"}
              onClick={() => {
                handleCreateCartByUsername();
                props.setSelectedTab("cart");
              }}
              className={styles.link}
            >
              <ShoppingCartOutlined
                className={`${
                  props.selectedTab === "cart" ? styles.active : ""
                } ${styles.iconSize}`}
              />
            </Link>
          </Badge>
        </div>
        <Space>
          {user ? (
            <UserOutlined className={styles.iconSize} />
          ) : (
            <Popover content={content} placement="bottomLeft" trigger="hover">
              <UserOutlined className={styles.iconSize} />
            </Popover>
          )}
          {user ? (
            <div
              style={{ marginLeft: "10px" }}
              className={styles.cssText}
              title={user}
            >
              <span>Xin chào, </span>{" "}
              <Popover
                content={contentLogout}
                placement="bottomLeft"
                trigger="hover"
              >
                <Link
                  to={"/ms-shop/user/" + usernameEncode}
                  className={styles.link}
                >
                  <strong>{user}</strong>
                </Link>
              </Popover>
            </div>
          ) : null}
        </Space>
      </div>
      <div className={styles.menuUser}>
        <Badge count={cartIndex.quantity}>
          <Link
            to={"/ms-shop/cart"}
            onClick={() => {
              handleCreateCartByUsername();
              props.setSelectedTab("cart");
            }}
            className={styles.link}
          >
            <ShoppingCartOutlined
              className={`${
                props.selectedTab === "cart" ? styles.active : ""
              } ${styles.iconSize}`}
              style={{ marginRight: "12px" }}
            />
          </Link>
        </Badge>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
        >
          <MenuOutlined
            className={`${props.selectedTab === "cart" ? styles.active : ""} ${
              styles.iconSize
            }`}
            onClick={(e) => {
              e.preventDefault();
            }}
            style={{ marginLeft: "12px" }}
          />
        </Dropdown>
      </div>
    </div>
  );
}

export default HeaderRight;
