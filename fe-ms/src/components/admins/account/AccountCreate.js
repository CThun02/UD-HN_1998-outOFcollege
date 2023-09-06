import AccountForm from "./AccountForm";
import styles from "../account/css/style.css";

function ProductAdminCreate() {
  return (
    <div className={styles.product}>
      <AccountForm ModuleName={"Thêm tài khoản"}></AccountForm>
    </div>
  );
}

export default AccountForm;
