import { Avatar, Button, Col, Row, Space } from "antd";
import styles from "./UserInfoDetail.module.css";
import { EditOutlined, UserOutlined } from "@ant-design/icons";

function UserInfoDetail() {
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
                <RowUserInfo title={"Tên đăng nhập"} data={"ndtoi"} />
                <RowUserInfo title={"Mật khẩu"} data={"********"} />
                <RowUserInfo title={"Họ và tên"} data={"Nguyen dinh toi"} />
                <RowUserInfo title={"Email"} data={"ndtoi@gmail.com"} />
                <RowUserInfo title={"Số điện thoại"} data={"0337970185"} />
                <RowUserInfo title={"Giới tính"} data={"Nam"} />
                <RowUserInfo title={"Ngày sinh"} data={"ndtoi"} />
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
      <Col span={12} className={`${styles.textSize}`}>
        {title}
      </Col>
      <Col span={12} className={`${styles.textSize} ${styles.textColor}`}>
        {data ? data : "<Không có dữ liệu>"}
      </Col>
    </Row>
  );
}

export default UserInfoDetail;
