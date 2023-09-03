import {
  faChevronDown,
  faChevronRight,
  faClose,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import IndexAdmin from "../IndexAdmin";
import styles from "./ProductAdmin.module.css";

function ProductSizeColorAdminUpdate() {
  return (
    <div className="">
      <IndexAdmin></IndexAdmin>
      <div className={styles.maxWH}>
        <div
          style={{ height: "100vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div
            className={`col-5 ${styles.radiusFrame} ${styles.sizeColorFrame}`}
          >
            <div className="p-5">
              <div className="text-end">
                <Link to={"/controller/v1/admin/product/update"}>
                  <FontAwesomeIcon
                    className={`link-dark ${styles.btnClose}`}
                    icon={faClose}
                  ></FontAwesomeIcon>
                </Link>
              </div>
              <h3>Kích cỡ</h3>
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label me-5"
                    for="flexCheckDefault"
                  >
                    S
                  </label>
                  <FontAwesomeIcon
                    className="ms-5"
                    icon={faChevronDown}
                  ></FontAwesomeIcon>
                  <table className="table text-center align-self-center">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Màu sắc</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Giá tăng</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            className="form-check-input ms-3"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </td>
                        <td>
                          <div
                            className={`${styles.colorDisplay} d-inline-block`}
                            style={{ backgroundColor: "Red" }}
                          ></div>
                        </td>
                        <td>
                          <ul className={`r p-0 ${styles.pagination}`}>
                            <li>
                              <FontAwesomeIcon
                                icon={faMinus}
                                className="ps-2"
                              ></FontAwesomeIcon>
                            </li>
                            <li className={styles.pageNumber}>
                              <input
                                type={"text"}
                                className="text-center"
                                value={1}
                              />
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faPlus}
                                className="pe-2"
                              ></FontAwesomeIcon>
                            </li>
                          </ul>
                        </td>
                        <td>
                          <input
                            type="text"
                            className={`form-control ${styles.inputCommon} text-center`}
                            id="ten"
                            placeholder=""
                            value={0}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <input
                            className="form-check-input ms-3"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                          />
                        </th>
                        <td>
                          <div
                            className={`${styles.colorDisplay} d-inline-block`}
                            style={{ backgroundColor: "White" }}
                          ></div>
                        </td>
                        <td>
                          <ul className={`r p-0 ${styles.pagination}`}>
                            <li>
                              <FontAwesomeIcon
                                icon={faMinus}
                                className="ps-2"
                              ></FontAwesomeIcon>
                            </li>
                            <li className={styles.pageNumber}>
                              <input
                                type={"text"}
                                className="text-center"
                                value={1}
                              />
                            </li>
                            <li>
                              <FontAwesomeIcon
                                icon={faPlus}
                                className="pe-2"
                              ></FontAwesomeIcon>
                            </li>
                          </ul>
                        </td>
                        <td>
                          <input
                            type="text"
                            className={`form-control ${styles.inputCommon} text-center`}
                            id="ten"
                            placeholder=""
                            value={0}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label
                    className="form-check-label me-5"
                    for="flexCheckDefault"
                  >
                    M
                  </label>
                  <FontAwesomeIcon
                    className="ms-5"
                    icon={faChevronRight}
                  ></FontAwesomeIcon>
                </div>
                <div className="mt-5 text-center">
                  <Link
                    to=""
                    className={`${styles.btnStatusActive} pt-2 pb-2 ps-3 pe-3`}
                  >
                    Xác nhận
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductSizeColorAdminUpdate;
