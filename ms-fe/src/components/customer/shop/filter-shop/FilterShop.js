import { Divider, Input, Space } from "antd";
import styles from "./FilterShop.module.css";
import ComponentsFilter from "../../../element/filter-shop/ComponentsFilter";
import RangPrice from "./range-price/RangPrice";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import SockJs from "../../../../service/SockJs";

const baseUrl = "http://localhost:8080/api/admin";

function FilterShop({ filter, setFilter, setProducts, products }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const res = await axios.get(baseUrl + "/category");
        const data = await res.data;

        setCategories(data);
      } catch (err) {
        console.log(err);
      }
    }

    async function getBrands() {
      try {
        const res = await axios.get(baseUrl + "/brand");
        const data = await res.data;

        setBrands(data);
      } catch (err) {
        console.log(err);
      }
    }

    async function getColors() {
      try {
        const res = await axios.get(baseUrl + "/color");
        const data = await res.data;

        setColors(data);
      } catch (err) {
        console.log(err);
      }
    }

    async function getSizes() {
      try {
        const res = await axios.get(baseUrl + "/size");
        const data = await res.data;

        setSizes(data);
      } catch (err) {
        console.log(err);
      }
    }

    return () => {
      getCategories();
      getBrands();
      getColors();
      getSizes();
    };
  }, []);

  return (
    <div className={styles.width}>
      <SockJs setValues={setCategories} connectTo={"category-topic"} />
      <SockJs setValues={setBrands} connectTo={"brand-topic"} />
      <SockJs setValues={setColors} connectTo={"color-topic"} />
      <SockJs setValues={setSizes} connectTo={"size-topic"} />
      <div className={styles.content}>
        <Space direction="vertical" style={{ width: "100%" }} size={10}>
          <div className={styles.title}>
            <h3 className={`${styles.textSize} ${styles.textColor}`}>
              Bộ lọc tìm kiếm
            </h3>
          </div>

          <div className={styles.body}>
            <Space direction="vertical" style={{ width: "100%" }} size={10}>
              <div className={styles.paddingSize}>
                <div className={styles.searchName}>
                  <Input
                    name="productName"
                    placeholder="Nhập tên sản phẩm"
                    allowClear
                    size="large"
                    value={filter.productName}
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className={styles.range}>
                <Divider className={styles.dividerSize} />
                <div className={styles.paddingSize}>
                  <RangPrice filter={filter} setFilter={setFilter} />
                </div>
              </div>

              <div className={styles.radioGroup}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <ComponentsFilter
                    options={categories.map((e) => ({
                      value: e.id,
                      label: e.categoryName,
                    }))}
                    title={"Loại sản phẩm"}
                    name={"categories"}
                    filter={filter}
                    setFilter={setFilter}
                  />
                  <ComponentsFilter
                    options={brands.map((e) => ({
                      value: e.id,
                      label: e.brandName,
                    }))}
                    title={"Thương hiệu"}
                    name={"brands"}
                    filter={filter}
                    setFilter={setFilter}
                  />
                  <ComponentsFilter
                    options={colors.map((e) => ({
                      value: e.id,
                      label: e.colorName,
                    }))}
                    title={"Màu sắc"}
                    name={"colors"}
                    filter={filter}
                    setFilter={setFilter}
                  />
                  <ComponentsFilter
                    options={sizes.map((e) => ({
                      value: e.id,
                      label: e.sizeName,
                    }))}
                    title={"Kích cỡ"}
                    name={"sizes"}
                    filter={filter}
                    setFilter={setFilter}
                  />
                </Space>
              </div>
            </Space>
          </div>
        </Space>
      </div>
    </div>
  );
}

export default FilterShop;
