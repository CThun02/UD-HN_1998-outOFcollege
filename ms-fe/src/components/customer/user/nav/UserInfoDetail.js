import { Avatar, Button, Col, Row, Space } from "antd";
import styles from "./UserInfoDetail.module.css";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

function UserInfoDetail({ user }) {
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
                />
              </Col>
            </Row>
          </div>

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

export default UserInfoDetail;
