import FollowingOrderContent from "./content-following-order/FollowingOrderContent";
import HeaderNavFollowOrder from "./header-nav/HeaderNavFollowOrder";
import styles from "./FollowingOrder.module.css";
import { Space } from "antd";
import { useState } from "react";

function FollowingOrder({ tab }) {
  const [status, setStatus] = useState(null)
  return (
    <div>
      <div>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <HeaderNavFollowOrder setStatus={setStatus} />
          <FollowingOrderContent status={status} />
        </Space>
      </div>
    </div>
  );
}

export default FollowingOrder;
