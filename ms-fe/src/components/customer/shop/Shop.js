import { Col, Divider, Pagination, Row, Spin } from "antd";
import styles from "./Shop.module.css";
import FilterShop from "./filter-shop/FilterShop";
import ProductsList from "../../element/product-cart/ProductsList";
import { useEffect, useState } from "react";
import BreadCrumb from "../../element/bread-crumb/BreadCrumb";
import { Link } from "react-router-dom";
import SortAndResultSearch from "./sort-and-result/SortAndResultSearch";
import axios from "axios";

const items = [
  {
    title: <Link to="/ms-shop/home">Trang chủ</Link>,
  },
  {
    title: "Cửa hàng",
  },
];

const baseUrl = "http://localhost:8080/api/client/product";

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
    sort: "up",
  });
  //page
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalElements, setTotalElements] = useState(-1);

  //loading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
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
        setTotalElements(data.totalElements);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getProducts();
  }, [pageNo, pageSize, filter]);

  return (
    <Spin
      tip="Loading..."
      spinning={isLoading}
      size="large"
      style={{ width: "100%" }}
    >
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
                <Pagination
                  current={pageNo}
                  pageSize={pageSize}
                  pageSizeOptions={[9, 12, 15, 18]}
                  total={totalElements}
                  onChange={(e) => setPageNo(e)}
                  onShowSizeChange={(e, v) => setPageSize(v)}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default Shop;
