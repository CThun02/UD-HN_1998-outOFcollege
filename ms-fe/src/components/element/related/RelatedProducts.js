import { Divider, Row, Spin } from "antd";
import styles from "./RelatedProducts.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ProductsList from "../product-cart/ProductsList";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

const baseUrl = "http://localhost:8080/api/admin/product";

function RelatedProducts() {
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
  const [pageSize, setPageSize] = useState(4);
  const [totalElements, setTotalElements] = useState(-1);

  //loading
  const [isLoading, setIsLoading] = useState(false);

  function handlePreClick() {
    if (pageNo > 1) {
      setPageNo((page) => Number(page) - 1);
    }
  }

  function handleNextClick() {
    if (pageNo < totalElements / pageSize) {
      setPageNo((page) => Number(page) + 1);
    }
  }

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
    <div className={styles.relatedProducts}>
      <div className={styles.content}>
        <div className={styles.divider}>
          <Divider plain className={styles.cssText}>
            Sản phẩm liên quan
          </Divider>
        </div>

        <Spin
          tip="Loading..."
          spinning={isLoading}
          size="large"
          style={{ width: "100%" }}
        >
          <div className={styles.relatedProduct}>
            <div className={styles.positionRelative}>
              <div
                className={`${styles.positionAbsolute} ${styles.size} ${
                  styles.color
                } ${styles.backgroundColor} ${styles.left} ${
                  pageNo > 1 ? styles.hover : ""
                }`}
                onClick={handlePreClick}
              >
                <DoubleLeftOutlined />
              </div>
              <div>
                <Row>
                  {products.map((product) => (
                    <ProductsList
                      span={6}
                      key={product.productDetailId}
                      data={product}
                    />
                  ))}
                </Row>

                <div
                  className={`${styles.positionAbsolute} ${styles.size} ${
                    styles.color
                  } ${styles.backgroundColor} ${styles.right} ${
                    pageNo <= totalElements / pageSize ? styles.hover : ""
                  }`}
                  onClick={handleNextClick}
                >
                  <DoubleRightOutlined />
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
}

export default RelatedProducts;
