import FollowingOrderContent from "./content-following-order/FollowingOrderContent";
import HeaderNavFollowOrder from "./header-nav/HeaderNavFollowOrder";
import styles from "./FollowingOrder.module.css";
import { Space } from "antd";
import { useState } from "react";

function FollowingOrder({ tab }) {
  const [billCode, setBillCode] = useState('')
  const [status, setStatus] = useState('')
  const [count, setCount] = useState(null)
  const [symbol, setSymbol] = useState('')
  const [createdBy, setCreatedBy] = useState('')

  return (
    <div>
      <div>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <HeaderNavFollowOrder setBillCode={setBillCode}
            setStatus={setStatus}
            setCount={setCount}
            setCreatedBy={setCreatedBy}
            setSymbol={setSymbol}
          />
          <FollowingOrderContent billCode={billCode} symbol={symbol} status={status} count={count} createdBy={createdBy} />
        </Space>
      </div>
    </div>
  );
}

export default FollowingOrder;
