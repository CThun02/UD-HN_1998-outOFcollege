import { Badge, Card, Col, Divider, Rate, Row, Space } from "antd";
import styles from "./Shop.module.css";
import FilterShop from "./filter-shop/FilterShop";
import ProductsList from "../../element/product-cart/ProductsList";
import { useEffect, useState } from "react";
import BreadCrumb from "../../element/bread-crumb/BreadCrumb";
import { Link } from "react-router-dom";
import SortAndResultSearch from "./sort-and-result/SortAndResultSearch";
import axios from "axios";
import numeral from "numeral";

const items = [
  {
    title: <Link to="/ms-shop/home">Home</Link>,
  },
  {
    title: "Shop",
  },
];

const baseUrl = "http://localhost:8080/api/admin/product";

function Shop() {
  // data
  const [products, setProducts] = useState([]);

  //filter
  const [filter, setFilter] = useState({
    productName: null,
    minPrice: null,
    maxPrice: null,
    categories: null,
    brands: null,
    colors: null,
    sizes: null,
    sort: null,
  });
  // note: filter giá giảm chứ không phải giá sản phẩm
  //page
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await axios.post(
          baseUrl +
            "/product-shop?pageNo=" +
            (pageNo - 1) +
            "&pageSize=" +
            pageSize,
          filter
        );
        const data = await res.data;

        setProducts(data.content);
      } catch (err) {
        console.log(err);
      }
    }

    getProducts();
  }, [pageNo, pageSize, filter]);

  useEffect(() => {}, []);

  return (
    <div className={styles.shop}>
      <div className={styles.breadCrumb}>
        <BreadCrumb title={"Shop"} items={items} />
      </div>

      <div className={styles.divider}>
        <div className={styles.dividerSize}>
          <Divider className={styles.dividerChange} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.body}>
          <Row>
            <Col span={6}>
              <FilterShop filter={filter} setFilter={setFilter} />
            </Col>
            <Col span={18}>
              <SortAndResultSearch
                filter={filter}
                setFilter={setFilter}
                products={products}
              />
              <Row>
                {products.map((product) => (
                  <ProductsList
                    span={8}
                    key={product.productDetailId}
                    data={product}
                  />
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Shop;
