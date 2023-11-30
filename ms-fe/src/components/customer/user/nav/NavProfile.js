import styles from "./NavProfile.module.css";
function NavProfile({ tab, setTab }) {
  return (
    <div className={styles.nav}>
      <div className={styles.navBody}>
        <span
          className={`${styles.textSize} ${styles.textColor} ${styles.custom} ${tab === "userInfo" ? "" : styles.hover
            } ${tab === "userInfo" ? styles.active : ""}`}
          onClick={() => setTab("userInfo")}
        >
          Thông tin chung
        </span>
        <span>|</span>
        <span
          className={`${styles.textSize} ${styles.textColor} ${styles.custom} ${tab === "followOrder" ? "" : styles.hover
            } ${tab === "followOrder" ? styles.active : ""}`}
          onClick={() => setTab("followOrder")}
        >
          Đơn mua
        </span>
        <span>|</span>
        <span
          className={`${styles.textSize} ${styles.textColor} ${styles.custom} ${tab === "vouchers" ? "" : styles.hover
            } ${tab === "vouchers" ? styles.active : ""}`}
          onClick={() => setTab("vouchers")}
        >
          Mã giảm giá
        </span>
      </div>
    </div>
  );
}

export default NavProfile;
