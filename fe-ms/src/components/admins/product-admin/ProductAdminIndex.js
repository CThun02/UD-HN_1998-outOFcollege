import ButtonCRUD from "../button-crud/ButtonCRUD";
import styles from "./ProductAdmin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProductAdminFilter from "./ProductAdminFilter";
import ProductAdminTable from "./ProductAdminTable";

const App = function () {
  return (
    <div className={`mt-5 ms-5 mb-5 col-9 ${styles.radiusFrame}`}>
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
        </div>
        <div className="p-5">
          <ProductAdminFilter />
          <ProductAdminTable />
          <div className="col-12">
            <Link to="/controller/v1/admin/product/create">
              <ButtonCRUD className={styles.btnCreate} icon={faPlus} />
            </Link>
            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-center">
                  <ul className={`r p-0 ${styles.pagination}`}>
                    <li>
                      <FontAwesomeIcon
                        icon={faMinus}
                        className="ps-2"
                      ></FontAwesomeIcon>
                    </li>
                    <li className={styles.pageNumber}>
                      <input type={"text"} className="text-center" value={1} />
                    </li>
                    <li>
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="pe-2"
                      ></FontAwesomeIcon>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
