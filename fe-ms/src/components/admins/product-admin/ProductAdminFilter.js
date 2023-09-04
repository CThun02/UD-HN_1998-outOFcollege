import styles from "./ProductAdmin.module.css";

function ProductAdminFilter() {
  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-2 offset-md-5">
            <h5 className="text-center">Bộ lọc</h5>
            <div>
              <select
                className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                aria-label="Default select example"
              >
                <option value={1}>Dáng áo</option>
                <option value={1}>Two</option>
                <option value={1}>Three</option>
                <option value={1}>Four</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 pt-4">
        <div className="row">
          <div className="col-3">
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
          <div className="col-3">
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
          <div className="col-3">
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
          <div className="col-3">
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
        </div>
      </div>
      <div className="col-12 pt-4">
        <div className="row">
          <div className="col-3">
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
          <div className="col-3">
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
          <div className="col-3">
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
          <div className="col-3">
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
        </div>
      </div>
    </div>
  );
}
export default ProductAdminFilter;
