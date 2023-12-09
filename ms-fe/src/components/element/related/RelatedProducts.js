import { Divider, List, Row, Spin } from "antd";
import styles from "./RelatedProducts.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ProductsList from "../product-cart/ProductsList";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";

const baseUrl = "http://localhost:8080/api/client/product";

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

  //loading
  const [isLoading, setIsLoading] = useState(false);

  function handlePageSize(current, size) {
    setPageNo(current);
    setPageSize(size);
  }

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

    return () => getProducts();
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
          tip="Vui lòng chờ..."
          spinning={isLoading}
          size="large"
          style={{ width: "100%" }}
        >
          <div className={styles.relatedProduct}>
            <div className={styles.positionRelative}>
              <div>
                <List
                  grid={{ gutter: 16, column: 4 }}
                  dataSource={products}
                  renderItem={(item) => (
                    <List.Item>
                      <ProductsList data={item} key={item.productDetailId} />
                    </List.Item>
                  )}
                  pagination={{
                    showSizeChanger: false,
                    pageSize: pageSize,
                    showLessItems: true,
                    style: { marginRight: "10px" },
                    onChange: (currentPage, pageSize) => {
                      handlePageSize(currentPage, pageSize);
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
}

export default RelatedProducts;
