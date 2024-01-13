import { Col, Input, Row, Slider, Space } from "antd";
import styles from "./RangPrice.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import numeral from "numeral";

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
        setFilter({ ...filter, maxPrice: data });
      } catch (err) {
        console.log(err);
      }
    }

    getPriceRange();
  }, []);

  const handleOnchange = (min, max) => {
    if (min && max) {
      const minNumber = Number(min.replace(",", ""));
      const maxNumber = Number(max.replace(",", ""));
      setFilter({ minPrice: minNumber, maxPrice: maxNumber });
    } else {
      if (min) {
        const minNumber = Number(min.replace(",", ""));
        if (minNumber < defulatRangePriceMax) {
          console.log("data: ", minNumber);
          setFilter({ ...filter, minPrice: minNumber });
        }
      }

      if (max) {
        const maxNumber = Number(max.replace(",", ""));
        if (maxNumber <= defulatRangePriceMax) {
          setFilter({
            ...filter,
            maxPrice: maxNumber,
          });
        }
      }
    }

    // if (products) {
    //   const filteredData = products
    //     .filter((el) => {
    //       let price = 0;
    //       if (el.promotionMethod && el.promotionReduce) {
    //         if (el.promotionMethod === "%") {
    //           price =
    //             el.priceProductMin -
    //             (el.priceProductMin * el.promotionReduce) / 100;
    //         } else {
    //           price = el.priceProductMin - el.promotionReduce;
    //         }
    //       } else {
    //         price = el.priceProductMax;
    //       }

    //       if (min && max) {
    //         const minNumber = Number(min.replace(",", ""));
    //         const maxNumber = Number(max.replace(",", ""));
    //         return price >= minNumber && price <= maxNumber;
    //       } else if (min) {
    //         const minNumber = Number(min.replace(",", ""));
    //         return price >= minNumber;
    //       } else if (max) {
    //         const maxNumber = Number(max.replace(",", ""));
    //         return price <= maxNumber;
    //       }

    //       return false;
    //     })
    //     .map((el) => {
    //       return {
    //         productDetailId: el.productDetailId,
    //         productId: el.productId,
    //         brandId: el.brandId,
    //         categoryId: el.categoryId,
    //         patternId: el.patternId,
    //         formId: el.formId,
    //         buttonId: el.buttonId,
    //         materialId: el.materialId,
    //         collarId: el.collarId,
    //         sleeveId: el.sleeveId,
    //         shirtTailId: el.shirtTailId,
    //         categoryName: el.categoryName,
    //         productName: el.productName,
    //         brandName: el.brandName,
    //         promotionMethod: el.promotionMethod,
    //         promotionReduce: el.promotionReduce,
    //         priceProductMin: el.priceProductMin,
    //         priceProductMax: el.priceProductMax,
    //         quantitySelling: el.quantitySelling,
    //         productImages: el.productImages,
    //       };
    //     });

    //   setProducts(filteredData);
    // }
  };

  return (
    <>
      <Space size={10} direction="vertical" style={{ width: "100%" }}>
        <h3 className={`${styles.textSize} ${styles.textColor}`}>Giá tiền</h3>
        <Slider
          range
          min={0}
          max={defulatRangePriceMax}
          value={[
            typeof filter.minPrice === "number" ? filter.minPrice : 0,
            typeof filter.maxPrice === "number"
              ? filter.maxPrice
                ? filter.maxPrice
                : defulatRangePriceMax
              : 0,
          ]}
          onChange={(value) => {
            handleOnchange(value[0], value[1]);
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
                  value={numeral(filter.minPrice).format("0,0")}
                  onChange={(e) => handleOnchange(e.target.value)}
                  allowClear
                  suffix="đ"
                />
              </Col>
              <Col span={22}>
                <Input
                  name="maxPrice"
                  className={styles.input}
                  value={numeral(filter.maxPrice).format("0,0")}
                  onChange={(e) => handleOnchange(0, e.target.value)}
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
