import {
  faChevronDown,
  faClose,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./ProductAdmin.module.css";
function ProductSizeColorAdminCreate(productDetail) {
  function handleClick(event, idTable) {
    const currentCheck = event.target;
    if (currentCheck.checked) {
      document.getElementById(idTable).classList.remove("d-none");
    } else {
      document.getElementById(idTable).classList.add("d-none");
    }
  }

  function closeTab() {
    document.getElementById("sizeColorFrame").classList.add("d-none");
  }

  function addcolorsize() {
    productDetail.addFucntion();
    closeTab();
  }

  //get data size color
  const api = "http://localhost:8080/admin/api/";
  const [sizes, sizesChange] = useState(null);
  const [colors, colorsChange] = useState(null);

  useEffect(() => {
    axios
      .get(api + "color/data")
      .then((response) => {
        colorsChange(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get(api + "size/data")
      .then((response) => {
        sizesChange(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div id="sizeColorFrame" className="d-none">
      <div className={`${styles.maxWH}`}>
        <div
          style={{ height: "100vh" }}
          className="d-flex align-items-center justify-content-center"
        >
          <div
            className={`col-5 ${styles.radiusFrame} ${styles.sizeColorFrame}`}
          >
            <div className="p-5">
              <div className="text-end">
                <FontAwesomeIcon
                  className={`link-dark ${styles.btnClose}`}
                  icon={faClose}
                  onClick={closeTab}
                ></FontAwesomeIcon>
              </div>
              <h3>Kích cỡ</h3>
              {sizes &&
                sizes.map((item) => {
                  var check = false;
                  productDetail.productDetailColorSizes.forEach(
                    (itemDetail) => {
                      if (itemDetail.sizeId === item.id) {
                        check = true;
                      }
                    }
                  );
                  if (check === false) {
                    return (
                      <div key={item.id} className="form-check">
                        <input
                          className="form-check-input size_checked"
                          type="checkbox"
                          value={item.id}
                          id={`${item.id}`}
                          onChange={(event) => {
                            handleClick(event, `size${item.id}`);
                          }}
                        />
                        <label
                          className="form-check-label me-5"
                          htmlFor={`${item.id}`}
                        >
                          {item.sizeName}
                        </label>
                        <FontAwesomeIcon
                          className="float-end"
                          icon={faChevronDown}
                        ></FontAwesomeIcon>
                        <table
                          id={`size${item.id}`}
                          className={`table text-center align-self-center d-none ${styles.idsize}`}
                        >
                          <thead>
                            <tr>
                              <th scope="col"></th>
                              <th scope="col">Màu sắc</th>
                              <th scope="col">Số lượng</th>
                              <th scope="col">Giá</th>
                            </tr>
                          </thead>
                          <tbody>
                            {colors &&
                              colors.map((color) => {
                                return (
                                  <tr
                                    key={color.id}
                                    className={`size${item.id}`}
                                  >
                                    <td>
                                      <input
                                        className="form-check-input ms-3"
                                        type="checkbox"
                                        value={color.id}
                                        id="flexCheckDefault"
                                      />
                                    </td>
                                    <td>
                                      <div
                                        className={`${styles.colorDisplay} d-inline-block`}
                                        style={{ backgroundColor: color.id }}
                                      ></div>
                                    </td>
                                    <td>
                                      <ul
                                        className={`p-0 ${styles.pagination}`}
                                      >
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
                                            defaultValue={1}
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
                                        defaultValue={
                                          productDetail.productDetail.price
                                        }
                                      />
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                })}
              <div>
                <div className="mt-5 text-center">
                  <button
                    className={`${styles.btnStatusActive} pt-2 pb-2 ps-3 pe-3`}
                    onClick={addcolorsize}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductSizeColorAdminCreate;
