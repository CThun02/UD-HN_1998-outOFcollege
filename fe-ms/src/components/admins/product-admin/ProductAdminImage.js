/* eslint-disable jsx-a11y/alt-text */
import styles from "./ProductAdmin.module.css";
import ButtonCRUD from "../button-crud/ButtonCRUD";
import { faClose, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function ProductAdminImage() {
  return (
    <div className={`${styles.radiusFrame} mt-5 col-lg-10 offset-md-1`}>
      <h1 className="text-center p-5">Thêm ảnh sản phẩm</h1>
      <div className="p-5">
        <div className="row">
          <div className="col-3">
            <div className=" position-relative">
              <Link
                to="#"
                className={`link-dark position-absolute me-2 end-0 ${styles.btnClose}`}
              >
                <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
              </Link>
              <img src="" className={styles.imgProduct} />
            </div>
          </div>
          <div className="col-3">
            <div className=" position-relative">
              <Link
                to="#"
                className={`link-dark position-absolute me-2 end-0 ${styles.btnClose}`}
              >
                <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
              </Link>
              <img src="" className={styles.imgProduct} />
            </div>
          </div>
          <div className="col-3">
            <div className="position-relative">
              <Link
                to="#"
                className={`link-dark position-absolute me-2 end-0 ${styles.btnClose}`}
              >
                <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
              </Link>
              <img src="" className={styles.imgProduct} />
            </div>
          </div>
          <div className="col-3">
            <div className=" position-relative">
              <Link
                to="#"
                className={`link-dark position-absolute me-2 end-0 ${styles.btnClose}`}
              >
                <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
              </Link>
              <img src="" className={styles.imgProduct} />
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <Link to="/controller/v1/admin/product/create">
            <ButtonCRUD className={styles.btnCreate} icon={faPlus} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductAdminImage;
