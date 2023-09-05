import styles from "./ProductAdmin.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProductAdminForm({ ModuleName }) {
  const productDetailId = useParams();
  const navigate = useNavigate();
  //product
  const [productName, productNameChange] = useState("");
  const [code, codeChange] = useState("");
  const [description, descriptionChange] = useState("");
  const [brandId, brandIdChange] = useState("");
  const [categoryid, categoryIdChange] = useState("");
  const [status, statusChange] = useState("");
  //product detail
  const [patternId, patternIdChange] = useState("");
  const [buttonId, buttonTypeIdChange] = useState("");
  const [materialId, materialIdChange] = useState("");
  const [collartypeId, collartypeIdChange] = useState("");
  const [sleeveId, sleeveIdChange] = useState("");
  const [formId, formIdChange] = useState("");
  const [shirtTailTypeId, shirtTailTypeIdChange] = useState("");
  const [price, priceChange] = useState("");

  const api = "http://localhost:8080/admin/api/";
  const [brands, brandsChange] = useState(null);
  const [categories, categoriesChange] = useState(null);
  const [patterns, patternsChange] = useState(null);
  const [buttonTypes, buttonTypesChange] = useState(null);
  const [materials, materialsChange] = useState(null);
  const [shirtTailTypes, shirtTailTypesChange] = useState(null);
  const [collarTypes, collarTypesChange] = useState(null);
  const [forms, formsChange] = useState(null);

  var product = {
    brandId: brandId,
    categoryId: categoryid,
    code: code,
    productName: productName,
    description: description,
    status: status,
  };
  var productDetail = {
    productId: null,
    patternId: patternId,
    buttonId: buttonId,
    materialId: materialId,
    collarId: collartypeId,
    sleeve: "",
  };

  const action = function () {
    if (Object.keys(productDetailId).length === 0) {
      axios
        .post(api + "product/create", product)
        .then((response) => {
          product = response.data;
          navigate("/controller/v1/admin/product/update/" + product.id);
        })
        .catch((err) => {
          console.error(err);
        });
      axios
        .post(api + "product/create", product)
        .then((response) => {
          product = response.data;
          navigate("/controller/v1/admin/product/update/" + product.id);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
    }
  };

  useEffect(() => {
    axios
      .get(api + "brand/data")
      .then((response) => {
        brandsChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
    axios
      .get(api + "category/data")
      .then((response) => {
        categoriesChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
    axios
      .get(api + "pattern/data")
      .then((response) => {
        patternsChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
    axios
      .get(api + "buttontype/data")
      .then((response) => {
        buttonTypesChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
    axios
      .get(api + "material/data")
      .then((response) => {
        materialsChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
    axios
      .get(api + "shirttailtype/data")
      .then((response) => {
        shirtTailTypesChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
    axios
      .get(api + "collartype/data")
      .then((response) => {
        collarTypesChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
    axios
      .get(api + "form/data")
      .then((response) => {
        formsChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, []);

  return (
    <div className={`col-10 offset-md-1 ${styles.radiusFrame}`}>
      <div className={`row`}>
        <div className="col-12">
          <div className="">
            <h1 className="text-center mb-5 mt-5">{ModuleName}</h1>
            <div className="row p-5">
              <div className="form-floating mb-5 col-8">
                <input
                  type="text"
                  className={`form-control ${styles.inputCommon}`}
                  id="ten"
                  placeholder=""
                  onChange={(e) => {
                    productNameChange(e.target.value);
                  }}
                  value={productName}
                />
                <label htmlFor="ten" className={styles.textGray}>
                  Tên sản phẩm
                </label>
              </div>
              <div className="form-floating mb-5 col-4">
                <input
                  type="text"
                  className={`form-control ${styles.inputCommon}`}
                  id="ma"
                  placeholder=""
                  onChange={(e) => {
                    codeChange(e.target.value);
                  }}
                  value={code}
                />
                <label htmlFor="ma" className={styles.textGray}>
                  Mã sản phẩm
                </label>
              </div>
              <div className="form-floating mb-5 col-4">
                <input
                  type="text"
                  className={`form-control ${styles.inputCommon}`}
                  id="gia"
                  placeholder=""
                />
                <label htmlFor="gia" className={styles.textGray}>
                  Giá sản phẩm
                </label>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                  onChange={(value) => brandIdChange(value.target.value)}
                >
                  <option value={null}>Thương hiệu</option>
                  {brands &&
                    brands.map((item) => {
                      return (
                        <option
                          selected={brandId === item.id}
                          key={item.id}
                          value={item.id}
                        >
                          {item.brandName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                  onChange={(value) => categoryIdChange(value.target.value)}
                >
                  <option value={null}>Loại sản phẩm</option>
                  {categories &&
                    categories.map((item) => {
                      return (
                        <option
                          selected={categoryid === item.id}
                          key={item.id}
                          value={item.id}
                        >
                          {item.categoryName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={null}>Họa tiết</option>
                  {patterns &&
                    patterns.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.patternName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={null}>Loại cúc áo</option>
                  {buttonTypes &&
                    buttonTypes.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.buttonName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={null}>Chất liệu</option>
                  {materials &&
                    materials.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.materialName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={1}>Đuôi áo</option>
                  {shirtTailTypes &&
                    shirtTailTypes.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.shirtTailTypeName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={1}>Cổ áo</option>
                  {collarTypes &&
                    collarTypes.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.collarTypeName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                >
                  <option value={1}>Dáng áo</option>
                  {forms &&
                    forms.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.formName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                  onChange={(e) => {
                    statusChange(e.target.value);
                  }}
                >
                  <option value={null}>Trạng thái</option>
                  <option selected={status === true} value={true}>
                    Kinh Doanh
                  </option>
                  <option selected={status === false} value={false}>
                    Ngừng Kinh doanh
                  </option>
                </select>
              </div>
              <div className="form-floating col-12 mb-5 mt-5">
                <textarea
                  className={`form-control ${styles.inputCommon}`}
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  onChange={(e) => descriptionChange(e.target.value)}
                  value={description}
                ></textarea>
                <label htmlFor="floatingTextarea2">Mô tả chi tiết</label>
              </div>
              <div className="col-12 text-center">
                <button
                  type="submit"
                  className={`${styles.btnStatusActive} ps-4 pe-4 pt-2 pb-2`}
                  onClick={action}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductAdminForm;
