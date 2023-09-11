import styles from "./ProductAdmin.module.css";
import ButtonCRUD from "../button-crud/ButtonCRUD";
import {
  faMinus,
  faPencilAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment/moment";

function ProductAdminTable() {
  const api = "http://localhost:8080/admin/api/product";

  const [products, productsChange] = useState(null);
  const [page, pageChange] = useState(0);
  const [pageNumberToTal, pageNumberToTalChange] = useState(0);
  const [effect, effectChange] = useState(null);

  //fuction
  const next = function () {
    if (page >= pageNumberToTal - 1) {
      pageChange(0);
    } else {
      pageChange(page + 1);
    }
  };
  const prev = function () {
    if (page <= 0) {
      pageChange(pageNumberToTal - 1);
    } else {
      pageChange(page - 1);
    }
  };

  function url(productId, fileName) {
    const apiFile = "http://localhost:8080/admin/api/product/files/";
    return apiFile + productId + "/" + fileName;
  }

  function activeOrInActiveProduct(item) {
    let productUpdate = item;
    productUpdate.imgDefault = item.imgDefault;
    productUpdate.status = !(item.status === "Active");
    axios
      .put(api + "/update?id=" + productUpdate.id, productUpdate)
      .then((response) => {
        effectChange(response.data);
        axios
          .get(api + "/detailbyidpro/" + response.data.id)
          .then((response) => {
            let productDetails = response.data;
            for (let i = 0; i < productDetails.length; i++) {
              let productDetail = {
                id: undefined,
                productId: undefined,
                patternId: undefined,
                buttonId: undefined,
                materialId: undefined,
                collarId: undefined,
                sleeveId: undefined,
                colorId: undefined,
                sizeId: undefined,
                formId: undefined,
                shirtTailId: undefined,
                price: "",
                descriptionDetail: "",
                status: true,
                createdAt: undefined,
                createdBy: undefined,
              };
              productDetail.id = productDetails[i].id;
              productDetail.productId = productDetails[i].product.id;
              productDetail.patternId = productDetails[i].pattern.id;
              productDetail.buttonId = productDetails[i].button.id;
              productDetail.materialId = productDetails[i].material.id;
              productDetail.collarId = productDetails[i].collar.id;
              productDetail.sleeveId = productDetails[i].sleeve.id;
              productDetail.formId = productDetails[i].form.id;
              productDetail.shirtTailId = productDetails[i].shirtTail.id;
              productDetail.quantity = productDetails[i].quantity;
              if (
                productDetails[i].color.id !== null &&
                productDetails[i].size.id !== null
              ) {
                productDetail.colorId = productDetails[i].color.id;
                productDetail.sizeId = productDetails[i].size.id;
              }

              productDetail.price = productDetails[i].price;
              productDetail.createdAt = productDetails[i].createdAt;
              productDetail.createdBy = productDetails[i].createdBy;
              productDetail.status = item.status;
              productDetail.descriptionDetail =
                productDetails[i].descriptionDetail;
              axios
                .put(api + "/updateproductdetail", productDetail)
                .then((response) => {})
                .catch((error) => {
                  console.log(error.message);
                });
            }
          })
          .catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    axios
      .get(api + "/data?page=" + page)
      .then((response) => {
        productsChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
    axios
      .get(api + "/total")
      .then((response) => {
        pageNumberToTalChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, [page, effect]);

  return (
    <div>
      <table className="table table-hover mt-5 text-center align-self-center">
        <thead>
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Ảnh</th>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((item, index) => {
              let stt = page * 5;
              return (
                <tr key={item.id}>
                  <th scope="row">{index + 1 + stt}</th>
                  <td>
                    <img
                      alt="Tạm thời chưa có gì"
                      src={url(item.id, item.imgDefault)}
                      className={`d-inline-block ${styles.imgTable}`}
                    ></img>
                  </td>
                  <td>{item.productName}</td>
                  <td>
                    {moment(item.createdAt, "YYYY-MM-DDTHH:mm:ss.SSS").format(
                      "DD/MM/YYYY HH:mm:ss"
                    )}
                  </td>
                  <td>
                    <button
                      type="submit"
                      className={`${
                        item.status === "Active"
                          ? styles.btnStatusActive
                          : styles.btnStatusUnActive
                      } pt-1 pb-1 ps-2 pe-2`}
                      onClick={() => {
                        activeOrInActiveProduct(item);
                      }}
                    >
                      {item.status === "Active"
                        ? "Kinh Doanh"
                        : "Ngừng kinh doanh"}
                    </button>
                  </td>
                  <td>
                    <Link to={`/controller/v1/admin/product/update/${item.id}`}>
                      <ButtonCRUD
                        icon={faPencilAlt}
                        className={styles.btnCRUD}
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="col-12">
        <Link to="/controller/v1/admin/product/create">
          <ButtonCRUD className={styles.btnCreate} icon={faPlus} />
        </Link>
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-center">
              <ul className={`p-0 ${styles.pagination}`}>
                <li>
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="ps-2"
                    onClick={prev}
                  ></FontAwesomeIcon>
                </li>
                <li className={styles.pageNumber}>
                  <input
                    type={"text"}
                    className="text-center"
                    value={page + 1}
                    onChange={(event) => {
                      pageChange(event.target.value);
                    }}
                  />
                </li>
                <li>
                  <FontAwesomeIcon
                    onClick={next}
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

export default ProductAdminTable;
