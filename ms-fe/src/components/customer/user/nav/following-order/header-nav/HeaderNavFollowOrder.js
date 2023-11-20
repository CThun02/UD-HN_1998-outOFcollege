import { Input, Space } from "antd";
import styles from "./HeaderNavFollowOrder.module.css";
import { SearchOutlined } from "@ant-design/icons";

function HeaderNavFollowOrder({ setStatus }) {
  return (
    <div className={styles.headerNavFollowOrder}>
      <div className={styles.content}>
        <div className={styles.width}>
          <Space size={16} style={{ width: "100%" }} direction="vertical">
            <div className={styles.center}>
              <span
                className={`${styles.textSize} ${styles.textColor} ${styles.span} ${styles.active}`}
                onClick={() => setStatus(null)}
              >
                Tất cả
              </span>
              <span
                className={`${styles.textSize} ${styles.textColor} ${styles.span} ${styles.active}`}
                onClick={() => setStatus(1)}
              >
                Chờ xác nhận
              </span>
              <span
                className={`${styles.textSize} ${styles.textColor} ${styles.span} ${styles.active}`}
                onClick={() => setStatus(2)}
              >
                Đã xác nhận
              </span>
              <span
                className={`${styles.textSize} ${styles.textColor} ${styles.span} ${styles.active}`}
                onClick={() => setStatus(3)}
              >
                Đang giao hàng
              </span>
              <span
                className={`${styles.textSize} ${styles.textColor} ${styles.span} ${styles.active}`}
                onClick={() => setStatus(4)}
              >
                Hoàn thành
              </span>
              <span
                className={`${styles.textSize} ${styles.textColor} ${styles.span} ${styles.active}`}
                onClick={() => setStatus(0)}
              >
                Đã hủy
              </span>
            </div>

            <div>
              <Input
                size="large"
                className={styles.input}
                placeholder="Bạn có thể tìm kiếm theo ID đơn hàng, Tên sản phẩm hoặc Mã sản phẩm"
                prefix={<SearchOutlined />}
              />
            </div>
          </Space>
        </div>
      </div >
    </div >
  );
}

export default HeaderNavFollowOrder;
