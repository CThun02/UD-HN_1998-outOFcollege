import styles from "./ProductAdmin.module.css";
import ButtonCRUD from "../button-crud/ButtonCRUD";
import {
  faCheck,
  faClose,
  faEye,
  faPencilAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductSizeColorAdminCreate from "./ProductSizeColorAdminCreate";
import ProductSizeColorAdminDetail from "./ProductSizeColorAdminDetail";
import ProductSizeColorAdminUpdate from "./ProductColorSizeAdminUpdate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        {
          quantity: 0,
          price: 0,
          colorId: "",
          productDetailId: undefined,
          status: "",
        },
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

  function deleteAllColorSize(kichHoat, list) {
    let listColor = list.listColor;
    for (let i = 0; i < listColor.length; i++) {
      axios
        .get(
          api +
          "product/detailStatus?id=" +
          listColor[i].productDetailId +
          "&status=" +
          (listColor[i].status === "Active")
        )
        .then((response) => {
          let productDetailUpdate = productDetail;
          productDetailUpdate.id = response.data.id;
          productDetailUpdate.status = !kichHoat;
          productDetailUpdate.colorId = response.data.color.id;
          productDetailUpdate.sizeId = response.data.size.id;
          productDetailUpdate.quantity = response.data.quantity;
          axios
            .put(api + "product/updateproductdetail", productDetail)
            .then((response) => {
              setcount(response.data);
              setSizeIdUpdate(0);
            });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  useEffect(() => {
    axios
      .get(api + "product/detail/" + productId)
      .then((response) => {
        ProductDetailChange("id", response.data.id);
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
  }, [productId, count, productDetail.id]);

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
        effect={setcount}
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
                var kichHoat = false;
                var totalQuantityProductDetail = 0;
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <th scope="row">{item.sizeName}</th>
                    <td>
                      {item.listColor.map((item, index) => {
                        var red = parseInt(item.colorId.substring(1, 3), 16);
                        var green = parseInt(item.colorId.substring(3, 5), 16);
                        var blue = parseInt(item.colorId.substring(5, 7), 16);
                        if (item.status === "Active") {
                          kichHoat = true;
                        }
                        return (
                          <div
                            key={index}
                            className={`${styles.colorDisplay} d-inline-block me-2 text-center`}
                            style={{ backgroundColor: item.colorId }}
                          >
                            <FontAwesomeIcon
                              icon={
                                item.status === "InActive" ? faClose : faCheck
                              }
                              color={
                                (red >= 128 && green >= 128 && blue >= 128) ||
                                  (red >= 128 && green >= 128) ||
                                  (blue >= 128 && green >= 128) ||
                                  (blue >= 128 && red >= 128)
                                  ? "black"
                                  : "white"
                              }
                            ></FontAwesomeIcon>
                          </div>
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
                        className={`${kichHoat === true
                            ? styles.btnStatusActive
                            : styles.btnStatusUnActive
                          } pt-1 pb-1 ps-2 pe-2`}
                        onClick={() => deleteAllColorSize(kichHoat, item)}
                      >
                        {kichHoat === true ? "kích hoạt" : "Ngưng kích hoạt"}
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
