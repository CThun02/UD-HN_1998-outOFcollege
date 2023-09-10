import { faClose, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonCRUD from "../button-crud/ButtonCRUD";
import styles from "./ProductAdmin.module.css";

function ProductSizeColorAdminUpdate(props) {
  const api = "http://localhost:8080/admin/api/product/";

  const { productId } = useParams();
  const [productColors, setProductColors] = useState(
    props.productDetailColorSizeDetail
  );
  const [count, setcount] = useState(0);

  const colors = props.colors;
  var listColor = [];

  //fucntion
  function closeTab() {
    document.getElementById("sizeColorFrameUpdate").classList.add("d-none");
  }

  function updateColorPrice(event, colorId, productDetailId, quantity) {
    let productDetail = props.productDetail;
    productDetail.id = productDetailId;
    productDetail.colorId = colorId;
    productDetail.sizeId = productColors.sizeId;
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
    productDetail.sizeId = productColors.sizeId;
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

  function addNewProduct() {
    var colorssize = document.getElementsByClassName("sizecolorupdate");
    for (let index = 0; index < colorssize.length; index++) {
      let checked = colorssize[index].childNodes[4].childNodes[0].checked;
      if (checked) {
        let colorId = colorssize[index].childNodes[4].childNodes[0].value;
        let quantity =
          colorssize[index].childNodes[2].childNodes[0].childNodes[0]
            .childNodes[0].value;
        let price = colorssize[index].childNodes[3].childNodes[0].value;
        listColor.push({
          colorId: colorId,
          sizeId: productColors.sizeId,
          quantity: quantity,
          price: price,
        });
      }
    }
    if (listColor.length !== 0) {
      axios
        .post(
          api +
            "createproductdetail/colorsize/" +
            productColors.listColor[0].productDetailId,
          listColor
        )
        .then((response) => {
          setcount(count + 1);
          axios
            .get(api + "detailcolorsize?productId=" + productId)
            .then((response) => {
              props.effect(response.data);
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    closeTab();
  }

  function updateColorProperty(colorId, propertyType, newValue) {
    const newListColor = productColors.listColor.map((color) => {
      if (color.colorId === colorId) {
        return {
          ...color,
          [propertyType]: newValue,
        };
      }
      return color;
    });

    setProductColors((prevState) => ({
      ...prevState,
      listColor: newListColor,
    }));
  }

  useEffect(() => {
    if (props.sizeId !== undefined && props.sizeId !== null) {
      axios
        .get(
          api +
            "detailcolorbyidsizenidpro?productId=" +
            productId +
            "&sizeId=" +
            props.sizeId
        )
        .then((response) => {
          setProductColors(response.data);
        });
    }
  }, [props.sizeId, productId, count]);
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
              <h4>{productColors.sizeName}</h4>
              <table
                id={`size${productColors.sizeId}`}
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
                  {productColors.listColor &&
                    productColors.listColor.map((color, index) => {
                      return (
                        <tr
                          key={color.colorId}
                          className={`size${color.colorId}`}
                        >
                          <td>{index + 1}</td>
                          <td>
                            <div
                              className={`${styles.colorDisplay} d-inline-block`}
                              style={{
                                backgroundColor: color.colorId,
                              }}
                            ></div>
                          </td>
                          <td>
                            <ul className={`p-0 ${styles.pagination}`}>
                              <li className={`${styles.pageNumber} ps-5 pe-5`}>
                                <input
                                  type={"text"}
                                  className="text-center"
                                  name={color.colorId}
                                  value={color.quantity}
                                  onChange={(event) => {
                                    updateColorProperty(
                                      color.colorId,
                                      "quantity",
                                      event.target.value
                                    );
                                  }}
                                  onBlur={(event) =>
                                    updateColorQuantity(
                                      event,
                                      color.colorId,
                                      color.productDetailId,
                                      color.price
                                    )
                                  }
                                />
                              </li>
                            </ul>
                          </td>
                          <td>
                            <input
                              type="text"
                              className={`form-control ${styles.inputCommon} text-center`}
                              name={color.colorId}
                              placeholder=""
                              value={color.price}
                              onChange={(event) => {
                                updateColorProperty(
                                  color.colorId,
                                  "price",
                                  event.target.value
                                );
                              }}
                              onBlur={(event) =>
                                updateColorPrice(
                                  event,
                                  color.colorId,
                                  color.productDetailId,
                                  color.quantity
                                )
                              }
                            />
                          </td>
                          <td>
                            <ButtonCRUD
                              icon={faTrash}
                              className={styles.btnCRUD}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <h4 className="pt-5">Thêm màu sắc mới</h4>
              <table
                id={`size${productColors.sizeId}`}
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
                    // eslint-disable-next-line array-callback-return
                    colors.map((color, index) => {
                      var exist = false;
                      productColors.listColor.forEach((colorExist) => {
                        if (colorExist.colorId === color.id) {
                          exist = true;
                        }
                      });
                      if (exist === false) {
                        return (
                          <tr key={color.id} className={`sizecolorupdate`}>
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
                                <li
                                  className={`${styles.pageNumber} ps-5 pe-5`}
                                >
                                  <input
                                    type={"text"}
                                    className="text-center"
                                    name={color.id}
                                    defaultValue={1}
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
                                defaultValue={props.productDetail.price}
                              />
                            </td>
                            <td>
                              <input
                                className="form-check-input ms-3"
                                type="checkbox"
                                value={color.id}
                                id="flexCheckDefault"
                              />
                            </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
            <div className="mb-5 text-center">
              <button
                className={`${styles.btnStatusActive} pt-2 pb-2 ps-3 pe-3`}
                onClick={addNewProduct}
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
