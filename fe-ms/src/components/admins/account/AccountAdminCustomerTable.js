import styles from "./AccountAdmin.module.css";
import ButtonCRUD from "../button-crud/ButtonCRUD";
import {
  faEye,
  faMinus,
  faPencilAlt,
  faPlus,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function AccountAdminCustomerTable() {
  return (
    <div>
      <table className="table mt-5 text-center align-self-center">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Tên Khách hàng</th>
            <th scope="col">Giới tính</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <ButtonCRUD className={styles.btnCreate} icon={faUser} />
            </td>
            <td>Nguyễn Đình Tới</td>
            <td>Nam</td>
            <td>2023/08/13 12:30:20</td>
            <td>
              <button
                type="submit"
                className={`${styles.btnStatusActive} pt-1 pb-1 ps-2 pe-2`}
              >
                Kích hoạt
              </button>
            </td>
            <td>
              <ButtonCRUD icon={faPencilAlt} className={styles.btnCRUD} />
              <ButtonCRUD icon={faTrash} className={styles.btnCRUD} />
              <ButtonCRUD icon={faEye} className={styles.btnCRUD} />
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>
              <ButtonCRUD className={styles.btnCreate} icon={faUser} />
            </td>
            <td>Nguyễn Đình Tới</td>
            <td>Nam</td>
            <td>2023/08/13 12:30:20</td>
            <td>
              <button
                type="submit"
                className={`${styles.btnStatusActive} pt-1 pb-1 ps-2 pe-2`}
              >
                Kích hoạt
              </button>
            </td>
            <td>
              <ButtonCRUD icon={faPencilAlt} className={styles.btnCRUD} />
              <ButtonCRUD icon={faTrash} className={styles.btnCRUD} />
              <ButtonCRUD icon={faEye} className={styles.btnCRUD} />
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>
              <ButtonCRUD className={styles.btnCreate} icon={faUser} />
            </td>
            <td>Nguyễn Đình Tới</td>
            <td>Nam</td>
            <td>2023/08/13 12:30:20</td>
            <td>
              <button
                type="submit"
                className={`${styles.btnStatusActive} pt-1 pb-1 ps-2 pe-2`}
              >
                Kích hoạt
              </button>
            </td>
            <td>
              <ButtonCRUD icon={faPencilAlt} className={styles.btnCRUD} />
              <ButtonCRUD icon={faTrash} className={styles.btnCRUD} />
              <ButtonCRUD icon={faEye} className={styles.btnCRUD} />
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>
              <ButtonCRUD className={styles.btnCreate} icon={faUser} />
            </td>
            <td>Nguyễn Đình Tới</td>
            <td>Nam</td>
            <td>2023/08/13 12:30:20</td>
            <td>
              <button
                type="submit"
                className={`${styles.btnStatusActive} pt-1 pb-1 ps-2 pe-2`}
              >
                Kích hoạt
              </button>
            </td>
            <td>
              <ButtonCRUD icon={faPencilAlt} className={styles.btnCRUD} />
              <ButtonCRUD icon={faTrash} className={styles.btnCRUD} />
              <ButtonCRUD icon={faEye} className={styles.btnCRUD} />
            </td>
          </tr>
          <tr>
            <th scope="row">1</th>
            <td>
              <ButtonCRUD className={styles.btnCreate} icon={faUser} />
            </td>
            <td>Nguyễn Đình Tới</td>
            <td>Nam</td>
            <td>2023/08/13 12:30:20</td>
            <td>
              <button
                type="submit"
                className={`${styles.btnStatusUnActive} pt-1 pb-1 ps-2 pe-2`}
              >
                Ngưng kích hoạt
              </button>
            </td>
            <td>
              <ButtonCRUD icon={faPencilAlt} className={styles.btnCRUD} />
              <ButtonCRUD icon={faTrash} className={styles.btnCRUD} />
              <ButtonCRUD icon={faEye} className={styles.btnCRUD} />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="col-12">
        <ButtonCRUD className={styles.btnCreate} icon={faPlus} />
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <ul className={`p-0 ${styles.pagination}`}>
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
  );
}

export default AccountAdminCustomerTable;
