import { useState } from "react";
import styles from "./DiscountCreate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function DiscountCreate({ setIsDisplay }) {
  const [discountName, setDiscountName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [discountMaxValue, setDiscountMaxValue] = useState("");
  const [discountMethod, setDiscountMethod] = useState("");
  const [discountCondition, setDiscountCondition] = useState("");

  return (
    <div className={`${styles.createDiscount}`}>
      <div className={styles.createContent}>
        <div className={`row ${styles.title} ${styles.spacing}`}>
          <div className="col-8">
            <h3>Tạo chương trình</h3>
          </div>

          <div className={`col-4 ${styles.iconClose}`}>
            <label>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={() => setIsDisplay(false)}
              />
            </label>
          </div>
        </div>
        <form>
          <div className={`row ${styles.spacing}`}>
            <div className={`col-12`}>
              <div class="mb-3">
                <label class="form-label">Tên chương trình</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Tên chương trình"
                />
              </div>
            </div>

            <div className={`col-6`}>
              <div class="mb-3">
                <label class="form-label">Ngày bắt đầu</label>
                <input type="date" class="form-control" />
              </div>
            </div>

            <div className={`col-6`}>
              <div class="mb-3">
                <label class="form-label">Ngày kết thúc</label>
                <input type="date" class="form-control" />
              </div>
            </div>

            <div className={`col-6`}>
              <div class="mb-3">
                <label class="form-label">Giá trị giảm</label>
                <input
                  type="text"
                  class="form-control "
                  placeholder="Giá trị giảm"
                />
              </div>
            </div>

            <div className={`col-6`}>
              <div class="mb-3">
                <label class="form-label">Giá trị giảm tối đa</label>
                <input
                  type="text"
                  class="form-control "
                  placeholder="Giá trị giảm tối đa"
                />
              </div>
            </div>

            <div className={`col-6`}>
              <div class="mb-3">
                <label class="form-label">Hình thức giảm</label>
                <input
                  type="text"
                  class="form-control "
                  placeholder="Hình thức giảm"
                />
              </div>
            </div>

            <div className={`col-6`}>
              <div class="mb-3">
                <label class="form-label">Điều kiện giảm giá</label>
                <input
                  type="text"
                  class="form-control "
                  placeholder="Điều kiện giảm giá"
                />
              </div>
            </div>
          </div>
          <div className="button">
            <button className="btn btn-primary">Xác nhận</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DiscountCreate;
