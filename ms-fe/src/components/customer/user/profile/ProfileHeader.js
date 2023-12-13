import { Avatar, Row, Space } from "antd";
import styles from "./ProfileHeader.module.css";
import { UserOutlined } from "@ant-design/icons";

function ProfileHeader({ user }) {
  const hour = new Date().getHours();
  return (
    <div className={styles.background}>
      <div className={styles.position}>
        <div className={styles.image}></div>
        <div className={styles.absolute}>
          <Row className={styles.ProfileCss}>
            <div>
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
            <div>
              <Space direction="vertical" size={10} style={{ width: "100%" }}>
                <span className={`${styles.textColor} ${styles.fullName}`}>
                  {user?.userInfomationDTO?.fullName}
                </span>
                <span className={`${styles.textColor} ${styles.textSize}`}>
                  {user?.userInfomationDTO?.username}
                </span>
                <span className={`${styles.textColor} ${styles.textSize}`}>
                  {user?.userInfomationDTO?.phoneNumber}
                </span>
                <span className={`${styles.textColor} ${styles.textSize}`}>
                  {user?.userInfomationDTO?.email}
                </span>
              </Space>
            </div>

            <div className={`${styles.textColor} ${styles.textHeader}`}>
              {hour >= 1 && hour < 11 && "Chào buổi sáng, tốt lành."}
            </div>
            <div className={`${styles.textColor} ${styles.textHeader}`}>
              {hour >= 11 && hour < 13 && "Chào buổi trưa, tốt lành."}
            </div>
            <div className={`${styles.textColor} ${styles.textHeader}`}>
              {hour >= 13 && hour < 18 && "Chào buổi chiều, tốt lành."}
            </div>
            <div className={`${styles.textColor} ${styles.textHeader}`}>
              {hour >= 18 && hour < 23 && "Chào buổi tối, tốt lành."}
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
