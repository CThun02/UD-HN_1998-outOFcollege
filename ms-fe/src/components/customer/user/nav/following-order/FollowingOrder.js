import FollowingOrderContent from "./content-following-order/FollowingOrderContent";
import HeaderNavFollowOrder from "./header-nav/HeaderNavFollowOrder";
import styles from "./FollowingOrder.module.css";
import { Space } from "antd";

function FollowingOrder({ tab }) {
  return (
    <div>
      <div>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <HeaderNavFollowOrder />
          <FollowingOrderContent />
        </Space>
      </div>
    </div>
  );
}

export default FollowingOrder;
