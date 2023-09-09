import styles from "./ProductAdmin.module.css";
import ButtonCRUD from "../button-crud/ButtonCRUD";
import { faEye, faPencilAlt, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductSizeColorAdminCreate from "./ProductSizeColorAdminCreate";
import ProductSizeColorAdminDetail from "./ProductSizeColorAdminDetail";
import ProductSizeColorAdminUpdate from "./ProductColorSizeAdminUpdate";

function ProductSizeColorAdminTable() {
  const api = "http://localhost:8080/admin/api/";

  const { productId } = useParams();
  const [count, setcount] = useState(0);
  const [sizeIdUpdate, setSizeIdUpdate] = useState(null);
  const [productDetail, setProductDetail] = useState({
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
  });
  const [productDetailColorSizes, productDetailColorSizesChange] = useState([
    {
      sizeId: undefined,
      sizeName: "",
      listColor: [
        { quantity: 0, price: 0, colorId: "", productDetailId: undefined },
      ],
    },
  ]);

  const [productDetailColorSizeDetail, productDetailColorSizeChange] = useState(
    {
      sizeId: undefined,
      sizeName: "",
      listColor: [
        { quantity: 0, price: 0, colorId: "", productDetailId: undefined },
      ],
    }
  );
  const [sizes, sizesChange] = useState(null);
  const [colors, colorsChange] = useState(null);
  var list = [];

  //fucntion
  //display sizecolor create  frame
  const displaySizeColorCreate = function () {
    var dis = document.getElementById("sizeColorFrame");
    dis.classList.remove("d-none");
  };

  //display sizecolor update frame
  const displaySizeColorUpdate = function (index, event, sizeId) {
    setSizeIdUpdate(sizeId);
    productDetailColorSizeChange(
      productDetailColorSizes[isNaN(index) === true ? 0 : index]
    );
    var dis = document.getElementById("sizeColorFrameUpdate");
    dis.classList.remove("d-none");
  };

  //display sizecolor detail frame
  const displaySizeColorDetail = function (index, event) {
    productDetailColorSizeChange(
      productDetailColorSizes[isNaN(index) === true ? 0 : index]
    );
    var dis = document.getElementById("sizeColorDetailFrame");
    dis.classList.remove("d-none");
  };

  const ProductDetailChange = (name, value) => {
    setProductDetail((prevProductDetail) => ({
      ...prevProductDetail,
      [name]: value,
    }));
  };

  //lấy dữ liệu size và color được chọn gửi về server
  function sizeChecked() {
    //Lấy ra ô check của size
    var sizes = document.getElementsByClassName("size_checked");
    for (var i = 0; i < sizes.length; i++) {
      if (sizes[i].checked) {
        let sizeId = sizes[i].value;
        //lấy ra ô check của color
        let colors = document.getElementsByClassName(`size${sizeId}`);
        for (let j = 0; j < colors.length; j++) {
          //Kiểm tra ô nào được checked
          if (colors[j].children[0].children[0].checked) {
            //lấy colorId
            let colorId = colors[j].children[0].children[0].value;
            //lấy số lượng
            let quantity =
              colors[j].children[2].children[0].children[0].children[0].value;
            //lấy giá
            let price = colors[j].children[3].children[0].value;
            list.push({
              colorId: colorId,
              sizeId: sizeId,
              quantity: quantity,
              price: price,
            });
          }
        }
      }
    }
    if (list.length !== 0) {
      axios
        .post(
          api + "product/createproductdetail/colorsize/" + productDetail.id,
          list
        )
        .then((response) => {
          console.log(response);
          axios
            .get(api + "product/detailcolorsize?productId=" + productId)
            .then((response) => {
              productDetailColorSizesChange(response.data);
              setcount(count + 1);
            })
            .catch((error) => {
              console.log(error.message);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    axios
      .get(api + "product/detail/" + productId)
      .then((response) => {
        ProductDetailChange("productId", response.data.product.id);
        ProductDetailChange("patternId", response.data.pattern.id);
        ProductDetailChange("buttonId", response.data.button.id);
        ProductDetailChange("materialId", response.data.material.id);
        ProductDetailChange("collarId", response.data.collar.id);
        ProductDetailChange("sleeveId", response.data.sleeve.id);
        ProductDetailChange("formId", response.data.form.id);
        ProductDetailChange("shirtTailId", response.data.shirtTail.id);
        ProductDetailChange("price", response.data.price);
        ProductDetailChange(
          "descriptionDetail",
          response.data.descriptionDetail
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
    axios
      .get(api + "product/detailcolorsize?productId=" + productId)
      .then((response) => {
        productDetailColorSizesChange(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
  }, [productId, count]);

  return (
    <div className={`${styles.radiusFrame} mt-5 col-lg-10 offset-md-1`}>
      <ProductSizeColorAdminCreate
        productDetail={productDetail}
        productDetailColorSizes={productDetailColorSizes}
        addFucntion={sizeChecked}
        sizes={sizes}
        colors={colors}
      ></ProductSizeColorAdminCreate>
      <ProductSizeColorAdminUpdate
        productDetail={productDetail}
        productDetailColorSizeDetail={productDetailColorSizeDetail}
        effect={productDetailColorSizesChange}
        colors={colors}
        sizeId={sizeIdUpdate}
      ></ProductSizeColorAdminUpdate>
      <ProductSizeColorAdminDetail
        productDetailColorSizeDetail={productDetailColorSizeDetail}
      ></ProductSizeColorAdminDetail>
      <h1 className="text-center p-5">Thêm màu sắc, kích cỡ và số lượng</h1>
      <div className="p-5">
        <table className="table text-center align-self-center">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Kích cỡ</th>
              <th scope="col">Màu sắc</th>
              <th scope="col">Số lượng</th>
              <th scope="col">Trạng Thái</th>
              <th scope="col">Thao Tác</th>
            </tr>
          </thead>
          <tbody>
            {productDetailColorSizes &&
              productDetailColorSizes.map((item, index) => {
                var totalQuantityProductDetail = 0;
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <th scope="row">{item.sizeName}</th>
                    <td>
                      {item.listColor.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className={`${styles.colorDisplay} d-inline-block me-2`}
                            style={{ backgroundColor: item.colorId }}
                          ></div>
                        );
                      })}
                    </td>
                    <td>
                      {item.listColor.forEach((item) => {
                        totalQuantityProductDetail += item.quantity;
                      })}
                      {totalQuantityProductDetail}
                    </td>
                    <td>
                      <button
                        type="submit"
                        className={`${styles.btnStatusActive} pt-1 pb-1 ps-2 pe-2`}
                      >
                        kích hoạt
                      </button>
                    </td>
                    <td>
                      <Link to="#">
                        <ButtonCRUD
                          action={
                            (index,
                            (event) => {
                              displaySizeColorDetail(index, event);
                            })
                          }
                          className={styles.btnCRUD}
                          icon={faEye}
                        />
                      </Link>
                      <Link to="#">
                        <ButtonCRUD
                          action={
                            (index,
                            (event) => {
                              displaySizeColorUpdate(index, event, item.sizeId);
                            })
                          }
                          className={styles.btnCRUD}
                          icon={faPencilAlt}
                        />
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="text-center">
          <ButtonCRUD
            action={displaySizeColorCreate}
            className={styles.btnCreate}
            icon={faPlus}
          />
        </div>
        <hr />
      </div>
    </div>
  );
}

export default ProductSizeColorAdminTable;
