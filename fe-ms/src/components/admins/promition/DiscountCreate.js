import { useState } from "react";
import styles from "./DiscountCreate.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import moment from "moment/moment";
import axios from "axios";

const urlBase = "http://localhost:8080/admin/api/promition";

function DiscountCreate({ setIsDisplay }) {
  const [discountName, setDiscountName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [discountMaxValue, setDiscountMaxValue] = useState("");
  const [discountMethod, setDiscountMethod] = useState("");
  const [discountCondition, setDiscountCondition] = useState("");
  const [applyFor, setApplyfor] = useState("");

  const [isDisplayProducts, setIsDisplayProducts] = useState(false);

  function addDiscount(value) {
    axios
      .post(urlBase + "/save", value)
      .then(() => {
        setIsDisplayProducts(true);
      })
      .catch((err) => console.log(err))
      .finally((f) => console.log(f));
  }

  function handleSaveDiscount(e) {
    e.preventDefault();

    if (
      discountMethod === "MONEY" &&
      discountMaxValue === "" &&
      discountMaxValue === discountValue
    ) {
      setDiscountMaxValue(discountValue);
    }

    const discount = {
      id: null,
      discountName,
      startDate: moment(startDate, "yyyy-MM-dd").format(
        "YYYY-MM-DDTHH:mm:ss.SSS"
      ),
      endDate: moment(endDate, "yyyy-MM-dd").format("YYYY-MM-DDTHH:mm:ss.SSS"), // yyyy-MM-dd
      discountValue: discountValue === "" ? null : discountValue,
      discountMaxValue,
      discountMethod: discountMethod === "" ? "%" : discountMethod,
      discountCondition,
      applyFor: applyFor === "" ? "HOA_DON" : applyFor,
    };

    addDiscount(discount);

    setDiscountName("");
    setStartDate("");
    setEndDate("");
    setDiscountValue("");
    setDiscountMaxValue("");
    setDiscountMethod("");
    setDiscountCondition("");
    setApplyfor("");
  }

  function handleSetDiscountMethod(value) {
    if (value === true) setDiscountMethod("%");
    else setDiscountMethod("MONEY");
  }

  function handleSetApplyFor(value) {
    if (value === true) setApplyfor("HOA_DON");
    else setApplyfor("SAN_PHAM");
  }

  return (
    <div className={`${styles.createDiscount}`}>
      {setIsDisplay ? (
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
          <form onSubmit={handleSaveDiscount}>
            <div className={`row ${styles.spacing}`}>
              <div className={`col-12`}>
                <div className="mb-3">
                  <label className="form-label">Tên chương trình</label>
                  <input
                    type="text"
                    className="form-control"
                    value={discountName}
                    onChange={(e) => setDiscountName(e.target.value)}
                    placeholder="Tên chương trình"
                  />
                </div>
              </div>

              <div className={`col-6`}>
                <div className="mb-3">
                  <label className="form-label">Ngày bắt đầu</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div className={`col-6`}>
                <div className="mb-3">
                  <label className="form-label">Ngày kết thúc</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className={`col-6`}>
                <div className="mb-3">
                  <label className="form-label">Giá trị giảm</label>
                  <input
                    type="text"
                    className="form-control "
                    value={discountValue}
                    onChange={(e) => setDiscountValue(e.target.value)}
                    placeholder="Giá trị giảm"
                  />
                </div>
              </div>

              <div className={`col-6`}>
                <div className="mb-3">
                  <label className="form-label">Giá trị giảm tối đa</label>
                  <input
                    type="text"
                    className="form-control "
                    value={discountMaxValue}
                    onChange={(e) => setDiscountMaxValue(e.target.value)}
                    placeholder="Giá trị giảm tối đa"
                  />
                </div>
              </div>

              <div className={`col-3`}>
                <div className="mb-3">
                  <label className="form-label">Hình thức giảm</label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method"
                      id="method1"
                      value={true}
                      onChange={() => handleSetDiscountMethod(true)}
                      checked
                    />
                    <label className="form-check-label" htmlFor="method1">
                      Giảm theo %
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="method"
                      id="method2"
                      value={false}
                      onChange={() => handleSetDiscountMethod(false)}
                    />
                    <label className="form-check-label" htmlFor="method2">
                      Giảm tiền trực tiếp
                    </label>
                  </div>
                </div>
              </div>

              <div className={`col-3`}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="applyFor1">
                    Áp dụng cho
                  </label>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="applyFor"
                      id="applyFor1"
                      value={true}
                      onChange={() => handleSetApplyFor(true)}
                      checked
                    />
                    <label className="form-check-label" htmlFor="applyFor1">
                      Hóa đơn
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="applyFor"
                      id="applyFor2"
                      value={false}
                      onChange={() => handleSetApplyFor(false)}
                    />
                    <label className="form-check-label" htmlFor="applyFor2">
                      Sản phẩm
                    </label>
                  </div>
                </div>
              </div>

              <div className={`col-6`}>
                <div className="mb-3">
                  <label className="form-label">Điều kiện giảm giá</label>
                  <input
                    type="text"
                    className="form-control "
                    value={discountCondition}
                    onChange={(e) => setDiscountCondition(e.target.value)}
                    placeholder="Điều kiện giảm giá"
                  />
                </div>
              </div>
            </div>
            <div className="button">
              <button className="btn btn-primary" type="submit">
                Xác nhận
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {isDisplayProducts ? (
        <div className={styles.createContent}>
          <div className={`row ${styles.title} ${styles.spacing}`}>
            <div className="col-8">
              <h3>Thêm sản phẩm vào chương trình</h3>
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

          <div className={`${styles.tableProducts}`}></div>
        </div>
      ) : null}
    </div>
  );
}

export default DiscountCreate;
