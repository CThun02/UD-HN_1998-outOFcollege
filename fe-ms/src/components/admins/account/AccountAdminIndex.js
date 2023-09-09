import ButtonCRUD from "../button-crud/ButtonCRUD";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./AccountAdmin.module.css";
import AccountAdminCustomerTable from "./AccountAdminCustomerTable";
import AccountStaffTable from "./AccountStaffTable";
// import AccountStaffTable from "./AccountStaffTable";

const AccountAdminIndex = function () {
  const href = window.location.href + "";
  return (
    <div className={styles.account}>
      <div className={`col-10 offset-md-1 ${styles.radiusFrame}`}>
        <div className={`row`}>
          <div className="col-12">
            <div className="col-lg-3 offset-md-8 mt-3">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control ${styles.inputCommon}`}
                  id="floatingInput"
                  placeholder=""
                />
                <label htmlFor="floatingInput" className={styles.textGray}>
                  <FontAwesomeIcon
                    icon={faSearch}
                    className="me-2"
                  ></FontAwesomeIcon>
                  Nhập từ khóa để tìm kiếm
                </label>
              </div>
            </div>
            <div className="ps-5">
              <h5 className="d-inline-block">Trạng thái:</h5>
              <div className=" d-inline-block col-3">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon}`}
                  aria-label="Default select example"
                >
                  <option value={1}>Trạng thái</option>
                  <option value={0}>Kích hoạt</option>
                  <option value={0}>Ngưng kích hoạt</option>
                </select>
              </div>
            </div>
          </div>
          <div className="p-5">
            {href.includes("customer") ? (
              <AccountAdminCustomerTable></AccountAdminCustomerTable>
            ) : (
              <AccountStaffTable></AccountStaffTable>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAdminIndex;
