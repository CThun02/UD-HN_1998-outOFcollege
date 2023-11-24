import { Input, Space } from "antd";
import styles from "./HeaderNavFollowOrder.module.css";
import { SearchOutlined } from "@ant-design/icons";

function HeaderNavFollowOrder({ setStatus, setCreatedBy, setSymbol, setCount }) {
  const onChangeBill = (e) => {
    console.log(e)
    if (e === '') {
      setStatus('')
      setCreatedBy('')
      setSymbol('')
      setCount('')
    } else if (e === 'Client') {
      setCreatedBy('CLIENT');
      setStatus("")
      setSymbol('')
      setCount('')
    } else if (e === 'Shipping') {
      setStatus('')
      setCreatedBy('')
      setSymbol('Shipping')
      setCount(3)
    } else if (e === 'Confirmed') {
      setStatus('')
      setCreatedBy('')
      setSymbol('Shipping')
      setCount(2)
    } else {
      setStatus(e);
      setCreatedBy("")
      setSymbol('')
      setCount('')
    }
  }
  return (
    <div className={styles.headerNavFollowOrder}>
      <div className={styles.content}>
        <div className={styles.width}>
          <Space size={16} style={{ width: "100%" }} direction="vertical">
            <div className={styles.center}>
              {/* <span
                className={`${styles.textSize} ${styles.textColor} ${styles.span} ${styles.active}`}
                onClick={() => setStatus(null)}
              >
                Tất cả
              </span> */}
              <span
                className={`${styles.textSize} ${styles.textColor} ${styles.span} ${styles.active}`}
                onClick={() => onChangeBill('Client')}
              >
                Chờ xác nhận
              </span>
              <span
                className={`${styles.textSize} ${styles.textColor} ${styles.span} ${styles.active}`}
                onClick={() => setStatus('Confirmed')}
              >
                Đã xác nhận
              </span>
              <span
                className={`${styles.textSize} ${styles.textColor} ${styles.span} ${styles.active}`}
                onClick={() => setStatus('Shipping')}
              >
                Đang giao hàng
              </span>
              <span
                className={`${styles.textSize} ${styles.textColor} ${styles.span} ${styles.active}`}
                onClick={() => onChangeBill('Complete')}
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
