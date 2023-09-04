import styles from "./ProductAdmin.module.css";
import ButtonCRUD from "../button-crud/ButtonCRUD";
import { faEye, faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function ProductAdminTable() {
  return (
    <table className="table mt-5 text-center align-self-center">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Ảnh</th>
          <th scope="col">Tên sản phẩm</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Trạng thái</th>
          <th scope="col">Thao tác</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>
            <img
              alt="Tạm thời chưa có gì"
              src=""
              className={`d-inline-block ${styles.imgTable}`}
            ></img>
          </td>
          <td>Áo Sơ Mi Nam Tay Dài Cổ V Túi Đắp Trơn Form Boxy</td>
          <td>40</td>
          <td>
            <button
              type="submit"
              className={`${styles.btnStatusActive} pt-1 pb-1 ps-2 pe-2`}
            >
              Kinh doanh
            </button>
          </td>
          <td>
            <Link to="/controller/v1/admin/product/update">
              <ButtonCRUD icon={faPencilAlt} />
            </Link>
            <Link to="/controller/v1/admin/product/update">
              <ButtonCRUD icon={faTrash} />
            </Link>
            <Link to="/controller/v1/admin/product/update">
              <ButtonCRUD icon={faEye} />
            </Link>
          </td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>
            <img
              alt="Tạm thời chưa có gì"
              src=""
              className={`d-inline-block ${styles.imgTable}`}
            ></img>
          </td>
          <td>Áo Sơ Mi Nam Tay Dài Cổ V Túi Đắp Trơn Form Boxy</td>
          <td>40</td>
          <td>
            <button
              type="submit"
              className={`${styles.btnStatusUnActive} pt-1 pb-1 ps-2 pe-2`}
            >
              Ngưng kinh doanh
            </button>
          </td>
          <td>
            <Link to="/controller/v1/admin/product/update">
              <ButtonCRUD icon={faPencilAlt} />
            </Link>
            <Link to="/controller/v1/admin/product/update">
              <ButtonCRUD icon={faTrash} />
            </Link>
            <Link to="/controller/v1/admin/product/update">
              <ButtonCRUD icon={faEye} />
            </Link>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default ProductAdminTable;
