import { Col, Row, Space } from "antd";
import styles from "./ContentProfile.module.css";
import UserInfoDetail from "./UserInfoDetail";
import UserAddress from "./user-address/UserAddress";

function ContentProfile({ tab }) {
  return (
    <div className={styles.profile}>
      <div className={styles.content}>
        <div className={styles.width}>
          {tab === "userInfo" && (
            <Space direction="vertical" size={50} style={{ width: "100%" }}>
              <UserInfoDetail />
              <div>
                <Row
                  direction="horizontal"
                  style={{ width: "100%", margin: 0 }}
                  size={12}
                >
                  <Col span={11}>
                    <UserAddress />
                  </Col>
                  <Col span={2} />
                  <Col span={11}>
                    <UserAddress />
                  </Col>
                </Row>
              </div>
            </Space>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContentProfile;
