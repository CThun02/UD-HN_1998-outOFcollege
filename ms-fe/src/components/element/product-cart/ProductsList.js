import { Badge, Button, Card, Col, Rate, Row, Space } from "antd";
import styles from "./ProductsList.module.css";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

function ProductsList({ data, span }) {
  const [active, setActive] = useState(false);

  function handleMouseIn() {
    setActive(true);
  }

  function handleMouseOut() {
    setActive(false);
  }

  const isMethod = data.promotionReduce
    ? data.promotionMethod === "vnd"
      ? "vnd"
      : data.promotionMethod === "%"
      ? "%"
      : null
    : null;

  const price =
    isMethod === "vnd"
      ? data.priceProduct - data.promotionReduce
      : isMethod === "%"
      ? data.priceProduct - data.priceProduct * (data.promotionReduce / 100)
      : null;
  //onMouseEnter={onMouseIn}
  //onMouseLeave = { onMouseOut };
  return (
    <Col span={span} className={`${styles.centerd} ${styles.marginBottom}`}>
      <Badge.Ribbon
        text={
          isMethod && price
            ? isMethod === "vnd"
              ? numeral(data.promotionReduce).format("0,0") + "đ"
              : isMethod === "%"
              ? data.promotionReduce + "%"
              : null
            : null
        }
        color="#FF9130"
        style={{ height: "32px", lineHeight: "32px" }}
      >
        <Card
          className={`${styles.width} `}
          style={{ width: "270px", border: "none" }}
          cover={
            <div
              className={styles.position}
              onMouseLeave={() => handleMouseOut(false)}
            >
              <img
                onMouseEnter={() => handleMouseIn(true)}
                alt="product"
                src={data?.productImages[0].path}
                className={`${styles.cssHover} ${styles.imageSize}`}
              />
              <div
                className={`${styles.transition} ${
                  active ? styles.absolute : styles.hidden
                }`}
                onMouseEnter={() => handleMouseIn(true)}
              >
                <div
                  className={styles.absoluteCenter}
                  onMouseEnter={() => handleMouseIn(true)}
                >
                  <Row
                    className={styles.row}
                    onMouseEnter={() => handleMouseIn(true)}
                  >
                    <Space onMouseEnter={() => handleMouseIn(true)}>
                      <Link onMouseEnter={() => handleMouseIn(true)}>
                        <Button
                          onMouseEnter={() => handleMouseIn(true)}
                          type="primary"
                          className={`${styles.cssBtn} ${styles.addToCart}`}
                        >
                          <PlusCircleOutlined />
                          Add to cart
                        </Button>
                      </Link>
                      <Link onMouseEnter={() => handleMouseIn(true)}>
                        <Button
                          onMouseEnter={() => handleMouseIn(true)}
                          onMouseLeave={() => handleMouseOut(false)}
                          type="primary"
                          className={`${styles.cssBtn} ${styles.quickView}`}
                        >
                          <EyeOutlined />
                          Quick view
                        </Button>
                      </Link>
                    </Space>
                  </Row>
                </div>
              </div>
            </div>
          }
        >
          <div
            className={styles.size}
            onMouseLeave={() => handleMouseOut(false)}
          >
            <Space direction="vertical" size={6} style={{ width: "100%" }}>
              <p className={`${styles.centerd} ${styles.opacity}`}>
                {data.categoryName}
              </p>
              <h2 className={`${styles.centerd} ${styles.textH2}`}>
                {data.productName}
              </h2>
              <p className={styles.centerd}>
                <i>
                  <Rate value={5} style={{ fontSize: "14px" }} />
                </i>
              </p>
              <p className={styles.centerd}>
                <del className={styles.priceReduce}>
                  {isMethod
                    ? numeral(data.priceProduct).format("0,0") + "đ"
                    : ""}
                </del>
                <bdi className={`${styles.fontWeight} ${styles.bdiSize}`}>
                  {numeral(price ? price : null).format("0,0") + "đ"}
                </bdi>
              </p>
            </Space>
          </div>
        </Card>
      </Badge.Ribbon>
    </Col>
  );
}

export default ProductsList;
