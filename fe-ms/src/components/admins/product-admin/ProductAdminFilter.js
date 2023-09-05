import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./ProductAdmin.module.css";

function ProductAdminFilter() {
  const api = "http://localhost:8080/admin/api/";
  const [brands, brandsChange] = useState(null);
  const [categories, categoriesChange] = useState(null);
  const [patterns, patternsChange] = useState(null);
  const [buttonTypes, buttonTypesChange] = useState(null);
  const [materials, materialsChange] = useState(null);
  const [shirtTailTypes, shirtTailTypesChange] = useState(null);
  const [collarTypes, collarTypesChange] = useState(null);
  const [forms, formsChange] = useState(null);

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
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-2 offset-md-5">
            <h5 className="text-center">Bộ lọc</h5>
            <div>
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
          </div>
        </div>
      </div>
      <div className="col-12 pt-4">
        <div className="row">
          <div className="col-4 mb-5">
            <select
              className={`form-select ${styles.inputCommon} ${styles.selectCommon} d-inline-block`}
              aria-label="Default select example"
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
            >
              <option value={null}>Trạng thái</option>
              <option value={true}>Kinh Doanh</option>
              <option value={false}>Ngừng Kinh doanh</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductAdminFilter;
