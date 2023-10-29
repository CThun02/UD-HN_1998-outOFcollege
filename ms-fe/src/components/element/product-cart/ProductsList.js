import { Badge, Card, Col, Rate, Space } from "antd";
import styles from "./ProductsList.module.css";
import numeral from "numeral";

function ProductsList({ data }) {
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
      ? data.priceProduct * (data.promotionReduce / 100)
      : null;

  return (
    <Col span={6} className={styles.centerd}>
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
          className={styles.width}
          hoverable
          style={{ width: 270, border: "none" }}
          cover={<img alt="product" src={data?.productImages[0].path} />}
        >
          <div className={styles.size}>
            <input type="hidden" value={data.productDetailId} />
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
