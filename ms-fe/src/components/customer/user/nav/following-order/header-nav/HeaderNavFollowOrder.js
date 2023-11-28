import { Input, Space } from "antd";
import styles from "./HeaderNavFollowOrder.module.css";
import { SearchOutlined } from "@ant-design/icons";

function HeaderNavFollowOrder({ setStatus, setCreatedBy, setSymbol, setCount }) {
  const onChangeBill = (e) => {
    if (e === '') {
      setStatus('')
      setCreatedBy('')
      setSymbol('')
      setCount('')
    } else if (e === 'CLIENT') {
      setCreatedBy('CLIENT');
      setStatus('')
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
    } else if (e === 'Complete') {
      setStatus(e)
      setSymbol('Shipping')
      setCount(4)
      setCreatedBy("")
    } else if (e === 'Cancel') {
      setStatus(e);
      setCreatedBy("")
      setSymbol('')
      setCount(1)
    }
    else {
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
                onClick={() => onChangeBill('CLIENT')}
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
                onClick={() => onChangeBill('Shipping')}
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
                onClick={() => onChangeBill('Cancel')}
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
