import { Link } from "react-router-dom";
import styles from "./ProductAdmin.module.css";
function ProductAdminForm({ ModuleName, ModuleActive }) {
  return (
    <div className={`mt-5 ms-5 mb-5 col-10 ${styles.radiusFrame}`}>
      <div className={`row`}>
        <div className="col-12">
          <div className="">
            <h1 className="text-center mb-5 mt-5">{ModuleName}</h1>
            <div className="row p-5">
              <div className="form-floating mb-5 col-12">
                <input
                  type="text"
                  className={`form-control ${styles.inputCommon}`}
                  id="ten"
                  placeholder=""
                />
                <label htmlFor="ten" className={styles.textGray}>
                  Tên sản phẩm
                </label>
              </div>
              <div className="form-floating mb-5 col-4">
                <input
                  type="text"
                  className={`form-control ${styles.inputCommon}`}
                  id="gia"
                  placeholder=""
                />
                <label htmlFor="gia" className={styles.textGray}>
                  Giá sản phẩm
                </label>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={1}>Đuôi áo</option>
                  <option value={1}>Two</option>
                  <option value={1}>Three</option>
                  <option value={1}>Four</option>
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={1}>Đuôi áo</option>
                  <option value={1}>Two</option>
                  <option value={1}>Three</option>
                  <option value={1}>Four</option>
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={1}>Đuôi áo</option>
                  <option value={1}>Two</option>
                  <option value={1}>Three</option>
                  <option value={1}>Four</option>
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={1}>Đuôi áo</option>
                  <option value={1}>Two</option>
                  <option value={1}>Three</option>
                  <option value={1}>Four</option>
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={1}>Đuôi áo</option>
                  <option value={1}>Two</option>
                  <option value={1}>Three</option>
                  <option value={1}>Four</option>
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={1}>Đuôi áo</option>
                  <option value={1}>Two</option>
                  <option value={1}>Three</option>
                  <option value={1}>Four</option>
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={1}>Đuôi áo</option>
                  <option value={1}>Two</option>
                  <option value={1}>Three</option>
                  <option value={1}>Four</option>
                </select>
              </div>
              <div className="form-floating col-12 mb-5 mt-5">
                <textarea
                  className={`form-control ${styles.inputCommon}`}
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                ></textarea>
                <label for="floatingTextarea2">Mô tả chi tiết</label>
              </div>
              <div className="col-12 text-center">
                <Link
                  to={ModuleActive}
                  type="submit"
                  className={`${styles.btnStatusActive} ps-4 pe-4 pt-2 pb-2`}
                >
                  Xác nhận
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAdminForm;
