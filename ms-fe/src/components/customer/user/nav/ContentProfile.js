import { Space } from "antd";
import styles from "./ContentProfile.module.css";
import UserInfoDetail from "./UserInfoDetail";
import FollowingOrder from "./following-order/FollowingOrder";
import Address from "./user-address/Address";

function ContentProfile({ tab, user, setIsRender }) {
  return (
    <div className={styles.profile}>
      <div className={styles.content}>
        <div className={styles.width}>
          {tab === "userInfo" && (
            <Space direction="vertical" size={50} style={{ width: "100%" }}>
              <UserInfoDetail user={user} setIsRender={setIsRender} />
              <div className={styles.address}>
                <Address address={user.addressDTO} setIsRender={setIsRender} />
              </div>
            </Space>
          )}

          {tab === "followOrder" && <FollowingOrder tab={tab} />}
        </div>
      </div>
    </div>
  );
}

export default ContentProfile;
