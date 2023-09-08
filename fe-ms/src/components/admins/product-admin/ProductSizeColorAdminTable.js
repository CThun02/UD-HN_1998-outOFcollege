import styles from "./ProductAdmin.module.css";
import ButtonCRUD from "../button-crud/ButtonCRUD";
import { faEye, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ProductSizeColorAdminUpdate from "./ProductSizeColorAdminUpdate";
function ProductSizeColorAdminTable() {
  //display sizecolor frame
  const display = function () {
    var dis = document.getElementById("sizeColorFrame");
    dis.classList.remove("d-none");
  };

  return (
    <div className={`${styles.radiusFrame} mt-5 col-lg-10 offset-md-1`}>
      <ProductSizeColorAdminUpdate></ProductSizeColorAdminUpdate>
      <h1 className="text-center p-5">Thêm màu sắc, kích cỡ và số lượng</h1>
      <div className="p-5">
        <table className="table text-center align-self-center">
          <thead>
            <tr>
              <th scope="col">Kích cỡ</th>
              <th scope="col">Màu sắc</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>
                <div
                  className={`${styles.colorDisplay} d-inline-block me-2`}
                  style={{ backgroundColor: "White" }}
                ></div>
                <div
                  className={`${styles.colorDisplay} d-inline-block`}
                  style={{ backgroundColor: "Red" }}
                ></div>
              </td>
              <td>40</td>
              <td>
                <button
                  type="submit"
                  className={`${styles.btnStatusActive} pt-1 pb-1 ps-2 pe-2`}
                >
                  kích hoạt
                </button>
              </td>
              <td>
                <Link to="/controller/v1/admin/product/update">
                  <ButtonCRUD icon={faEye} />
                </Link>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>
                <div
                  className={`${styles.colorDisplay} d-inline-block me-2`}
                  style={{ backgroundColor: "White" }}
                ></div>
                <div
                  className={`${styles.colorDisplay} d-inline-block`}
                  style={{ backgroundColor: "Red" }}
                ></div>
              </td>
              <td>40</td>
              <td>
                <button
                  type="submit"
                  className={`${styles.btnStatusUnActive} pt-1 pb-1 ps-2 pe-2`}
                >
                  Ngưng kích hoạt
                </button>
              </td>
              <td>
                <Link to="/controller/v1/admin/product/update">
                  <ButtonCRUD icon={faEye} />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-center">
          <ButtonCRUD
            action={display}
            className={styles.btnCreate}
            icon={faPencilAlt}
          />
        </div>
        <hr />
      </div>
    </div>
  );
}

export default ProductSizeColorAdminTable;
