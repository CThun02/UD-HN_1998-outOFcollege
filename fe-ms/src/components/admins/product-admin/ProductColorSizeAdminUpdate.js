import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { parseInt } from "lodash";
import ButtonCRUD from "../button-crud/ButtonCRUD";
import styles from "./ProductAdmin.module.css";

function ProductSizeColorAdminUpdate(props) {
  const api = "http://localhost:8080/admin/api/product/";
  var detailcolorssize = props.productDetailColorSizeDetail;
  const colors = props.colors;
  function closeTab() {
    document.getElementById("sizeColorFrameUpdate").classList.add("d-none");
  }

  function updateColorPrice(event, colorId, productDetailId, quantity) {
    let productDetail = props.productDetail;
    productDetail.id = productDetailId;
    productDetail.colorId = colorId;
    productDetail.sizeId = detailcolorssize.sizeId;
    productDetail.price = event.target.value;
    productDetail.quantity = quantity;
    productDetail.status = productDetail.status === "Active" ? true : false;
    axios
      .put(api + "updateproductdetailcolorsize", productDetail)
      .then((res) => {
        console.log(res);
      });
  }
  function updateColorQuantity(event, colorId, productDetailId, price) {
    let productDetail = props.productDetail;
    productDetail.id = productDetailId;
    productDetail.colorId = colorId;
    productDetail.sizeId = detailcolorssize.sizeId;
    productDetail.price = price;
    productDetail.quantity = event.target.value;
    productDetail.status = productDetail.status === "Active" ? true : false;
    axios
      .put(api + "updateproductdetailcolorsize", productDetail)
      .then((res) => {
        console.log(res);
      });
    console.log(productDetail);
  }
  return (
    <div id="sizeColorFrameUpdate" className="d-none">
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
              <h4>{detailcolorssize.sizeName}</h4>
              <table
                id={`size${detailcolorssize.sizeId}`}
                className={`table text-center align-self-center ${styles.idsize}`}
              >
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Màu sắc</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {colors &&
                    colors.map((color, index) => {
                      var check = false;
                      var colorExist = null;
                      detailcolorssize.listColor.forEach((cl) => {
                        if (cl.colorId === color.id) {
                          check = true;
                          colorExist = cl;
                        }
                      });
                      return (
                        <tr key={color.id} className={`size${color.id}`}>
                          <td>{index + 1}</td>
                          <td>
                            <div
                              className={`${styles.colorDisplay} d-inline-block`}
                              style={{
                                backgroundColor: color.id,
                              }}
                            ></div>
                          </td>
                          <td>
                            <ul className={`p-0 ${styles.pagination}`}>
                              <li className={`${styles.pageNumber} ps-5 pe-5`}>
                                <input
                                  type={"text"}
                                  className="text-center"
                                  name={color.id}
                                  defaultValue={
                                    check === true
                                      ? parseInt(colorExist.quantity)
                                      : 1
                                  }
                                  onBlur={
                                    check === true
                                      ? (event) =>
                                          updateColorQuantity(
                                            event,
                                            color.id,
                                            colorExist.productDetailId,
                                            colorExist.price
                                          )
                                      : (event) => updateColorQuantity(event)
                                  }
                                />
                              </li>
                            </ul>
                          </td>
                          <td>
                            <input
                              type="text"
                              className={`form-control ${styles.inputCommon} text-center`}
                              name={color.id}
                              placeholder=""
                              defaultValue={
                                check === true
                                  ? parseInt(colorExist.price)
                                  : parseInt(props.productDetail.price)
                              }
                              onBlur={
                                check === true
                                  ? (event) =>
                                      updateColorPrice(
                                        event,
                                        color.id,
                                        colorExist.productDetailId,
                                        colorExist.quantity
                                      )
                                  : (event) => updateColorPrice(event)
                              }
                            />
                          </td>
                          <td>
                            {check === true ? (
                              <ButtonCRUD
                                icon={faTrash}
                                className={styles.btnCRUD}
                              />
                            ) : (
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={color.id}
                                id="flexCheckDefault"
                                title="add new color into product"
                              />
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
            <div className="mb-5 text-center">
              <button
                className={`${styles.btnStatusActive} pt-2 pb-2 ps-3 pe-3`}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductSizeColorAdminUpdate;
