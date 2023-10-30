import { Col, Divider, Row } from "antd";
import styles from "./Shop.module.css";
import FilterShop from "./filter-shop/FilterShop";
import ProductsList from "../../element/product-cart/ProductsList";
import { useState } from "react";
import BreadCrumb from "../../element/bread-crumb/BreadCrumb";
import { Link } from "react-router-dom";
import SortAndResultSearch from "./sort-and-result/SortAndResultSearch";

const items = [
  {
    title: <Link to="/ms-shop/home">Home</Link>,
  },
  {
    title: "Shop",
  },
];

function Shop() {
  const [products, setProducts] = useState([]);
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
              <FilterShop />
            </Col>
            <Col span={18}>
              <SortAndResultSearch />
              <Row>
                <ProductsList />
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Shop;
