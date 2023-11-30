import { Link } from "react-router-dom";
import styles from "./FirstPayBill.module.css";
import { Button } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function FirstPayBill() {
  return (
    <div className={styles.padding}>
      <h2 className={styles.textH2}>
        Được giảm giá 25% cho lần mua hàng đầu tiên của bạn!
      </h2>
      <Link>
        <Button size="large" type="primary" className={styles.btn}>
          <FontAwesomeIcon
            icon={faCartShopping}
            style={{ marginRight: "5px" }}
          />
          Mua ngay
        </Button>
      </Link>
    </div>
  );
}

export default FirstPayBill;
