import { Col, Input, Row, Slider, Space } from "antd";
import styles from "./RangPrice.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8080/api/client/product/get-price-max";

function RangPrice({ filter, setFilter }) {
  //default max price range
  const [defulatRangePriceMax, setDefaultRangePrice] = useState(0);

  useEffect(() => {
    async function getPriceRange() {
      try {
        const res = await axios.get(baseUrl);
        const data = await res.data;

        setDefaultRangePrice(data);
      } catch (err) {
        console.log(err);
      }
    }

    getPriceRange();
  }, []);

  return (
    <>
      <Space size={10} direction="vertical" style={{ width: "100%" }}>
        <h3 className={`${styles.textSize} ${styles.textColor}`}>Giá tiền</h3>
        <Slider
          range
          min={0}
          max={defulatRangePriceMax}
          value={[
            filter.minPrice,
            filter.maxPrice ? filter.maxPrice : defulatRangePriceMax,
          ]}
          onChange={(value) => {
            setFilter({ ...filter, minPrice: value[0], maxPrice: value[1] });
            console.log("filter: ", filter);
          }}
        />
        <Space style={{ width: "100%" }} direction="vertical">
          <Row className={styles.rowSpacing}>
            <Col span={12}>
              <p className={`${styles.textLabel} ${styles.textColor}`}>Từ</p>
            </Col>
            <Col span={12}>
              <p className={`${styles.textLabel} ${styles.textColor}`}>Đến</p>
            </Col>
          </Row>
          <Row className={styles.rowSpacing}>
            <Space style={{ width: "100%" }} direction="horizontal" size={2}>
              <Col span={22}>
                <Input
                  name="minPrice"
                  className={styles.input}
                  value={filter.minPrice}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      [e.target.name]: e.target.value,
                    })
                  }
                  allowClear
                  suffix="đ"
                />
              </Col>
              <Col span={22}>
                <Input
                  name="maxPrice"
                  className={styles.input}
                  value={
                    filter.maxPrice ? filter.maxPrice : defulatRangePriceMax
                  }
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      [e.target.name]: e.target.value,
                    })
                  }
                  allowClear
                  suffix="đ"
                />
              </Col>
            </Space>
          </Row>
        </Space>
      </Space>
    </>
  );
}

export default RangPrice;
