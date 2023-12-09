import { Col, Divider, List, Row, Spin } from "antd";
import styles from "./Shop.module.css";
import FilterShop from "./filter-shop/FilterShop";
import ProductsList from "../../element/product-cart/ProductsList";
import { useEffect, useState } from "react";
import BreadCrumb from "../../element/bread-crumb/BreadCrumb";
import { Link } from "react-router-dom";
import SortAndResultSearch from "./sort-and-result/SortAndResultSearch";
import axios from "axios";
import SockJs from "../../../service/SockJs";

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

  //loading
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getProducts() {
      try {
        const res = await axios.post(baseUrl + "/product-shop", filter);
        const data = await res.data;

        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    getProducts();
  }, [pageNo, pageSize, filter]);

  function handlePageSize(current, size) {
    setPageNo(current);
    setPageSize(size);
  }

  return (
    <Spin
      tip="Vui lòng chờ..."
      spinning={isLoading}
      size="large"
      style={{ width: "100%" }}
    >
      <SockJs setValues={setProducts} connectTo={"productDetailShop-topic"} />
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
                <List
                  grid={{ gutter: 16, column: 3 }}
                  dataSource={products}
                  renderItem={(item) => (
                    <List.Item>
                      <ProductsList data={item} key={item.productDetailId} />
                    </List.Item>
                  )}
                  pagination={{
                    showSizeChanger: true,
                    pageSizeOptions: [9, 12, 15, 18],
                    pageSize: pageSize,
                    showLessItems: true,
                    style: { marginRight: "10px" },
                    onChange: (currentPage, pageSize) => {
                      handlePageSize(currentPage, pageSize);
                    },
                  }}
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
