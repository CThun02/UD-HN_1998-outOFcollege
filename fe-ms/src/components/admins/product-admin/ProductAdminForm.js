import styles from "./ProductAdmin.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProductAdminForm({ ModuleName }) {
  const { productId } = useParams();

  const navigate = useNavigate();

  const [product, productChange] = useState({
    brandId: undefined,
    categoryId: undefined,
    productCode: "",
    productName: "",
    status: undefined,
  });

  const [productDetail, productDetailChange] = useState({
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

  const handleProductDetailChange = (event) => {
    const { name, value } = event.target;
    productDetailChange((prevProductDetail) => ({
      ...prevProductDetail,
      [name]: value,
    }));
  };

  const handleProductChange = (event) => {
    const { name, value } = event.target;
    productChange((prevProductDetail) => ({
      ...prevProductDetail,
      [name]: value,
    }));
  };

  const api = "http://localhost:8080/admin/api/";
  const [brands, brandsChange] = useState(null);
  const [categories, categoriesChange] = useState(null);
  const [patterns, patternsChange] = useState(null);
  const [buttonTypes, buttonTypesChange] = useState(null);
  const [materials, materialsChange] = useState(null);
  const [shirtTailTypes, shirtTailTypesChange] = useState(null);
  const [collarTypes, collarTypesChange] = useState(null);
  const [forms, formsChange] = useState(null);
  const [sleeveTypes, sleeveTypesChange] = useState(null);

  const action = function () {
    if (productId === undefined) {
      axios
        .post(api + "product/create", product)
        .then((response) => {
          productDetail.productId = response.data.id;
          console.log(productDetail);
          axios
            .post(api + "product/createproductdetail", productDetail)
            .then((response) => {
              navigate(
                "/controller/v1/admin/product/update/" + productDetail.productId
              );
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
    }
  };
  useEffect(() => {
    if (productId !== undefined) {
      axios
        .get(api + "product/detail/" + productId)
        .then((response) => {
          productDetailChange(response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
      if (productDetail.productId !== null) {
        axios
          .get(api + "product/" + productId)
          .then((response) => {
            productChange(response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    }
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
    axios
      .get(api + "sleevetype/data")
      .then((response) => {
        sleeveTypesChange(response.data);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  }, [product.id, productDetail.id, productId]);

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
                  name="productName"
                  placeholder={product.productName}
                  onChange={handleProductChange}
                  value={product.productName}
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
                  placeholder={product.productCode}
                  name="productCode"
                  onChange={handleProductChange}
                  value={product.productCode}
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
                  placeholder={productDetail.price}
                  name="price"
                  onChange={handleProductDetailChange}
                  value={productDetail.price}
                />
                <label htmlFor="gia" className={styles.textGray}>
                  Giá sản phẩm
                </label>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                  name="brandId"
                  onChange={handleProductChange}
                  value={product.brandId}
                >
                  <option value={null}>Thương hiệu</option>
                  {brands &&
                    brands.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
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
                  name="categoryId"
                  onChange={handleProductChange}
                  value={product.categoryId}
                >
                  <option value={null}>Loại sản phẩm</option>
                  {categories &&
                    categories.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
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
                  name="patternId"
                  onChange={handleProductDetailChange}
                  value={productDetail.patternId}
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
                  name="buttonId"
                  onChange={handleProductDetailChange}
                  value={productDetail.buttonId}
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
                  name="materialId"
                  onChange={handleProductDetailChange}
                  value={productDetail.materialId}
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
                  name="shirtTailId"
                  onChange={handleProductDetailChange}
                  value={productDetail.shirtTailId}
                >
                  <option value={undefined}>Đuôi áo</option>
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
                  name="collarId"
                  onChange={handleProductDetailChange}
                  value={productDetail.collarId}
                >
                  <option value={undefined}>Cổ áo</option>
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
                  name="formId"
                  onChange={handleProductDetailChange}
                  value={productDetail.formId}
                >
                  <option value={null}>Dáng áo</option>
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
                  name="sleeveId"
                  onChange={handleProductDetailChange}
                  value={productDetail.sleeveId}
                >
                  <option value={null}>Tay áo</option>
                  {sleeveTypes &&
                    sleeveTypes.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.sleeveName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mb-5">
                <select
                  className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
                  aria-label="Default select example"
                  name="status"
                  onChange={handleProductChange}
                  value={
                    product.status === "Active"
                      ? true
                      : product.status === "InActive"
                      ? false
                      : undefined
                  }
                >
                  <option value={undefined}>Trạng thái</option>
                  <option value={true}>Kinh Doanh</option>
                  <option value={false}>Ngừng Kinh doanh</option>
                </select>
              </div>
              <div className="form-floating col-12 mb-5 mt-5">
                <textarea
                  className={`form-control ${styles.inputCommon}`}
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  name="descriptionDetail"
                  onChange={handleProductDetailChange}
                  value={productDetail.descriptionDetail}
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
