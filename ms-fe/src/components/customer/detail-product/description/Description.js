import { Col, Row, Space } from "antd";
import styles from "./Description.module.css";
import { useState } from "react";
import ComponentDetail from "./ComponentDetail";

function Description({ productDetail }) {
  const [tab, setTab] = useState("description");

  return (
    <div className={styles.description}>
      <div className={styles.flexContent}>
        <div className={styles.tabs}>
          <Space direction="horizontal" style={{ width: "100%" }} size={100}>
            <span
              className={`${styles.colorText} ${styles.sizeText} ${
                styles.cssHover
              } ${tab === "description" ? styles.active : ""}`}
              onClick={() => setTab("description")}
            >
              Mô tả chi tiết
            </span>
            <span
              className={`${styles.colorText} ${styles.sizeText} ${
                styles.cssHover
              } ${tab === "detailProduct" ? styles.active : ""}`}
              onClick={() => setTab("detailProduct")}
            >
              Thông tin sản phẩm
            </span>
            <span
              className={`${styles.colorText} ${styles.sizeText} ${
                styles.cssHover
              } ${tab === "exchangeSize" ? styles.active : ""}`}
              onClick={() => setTab("exchangeSize")}
            >
              Quy đổi kích cỡ
            </span>
          </Space>
        </div>
      </div>

      <div className={styles.contentDescription}>
        <div>
          {tab === "description" && (
            <p
              className={`${styles.cssParagraph} ${
                tab === "description" ? styles.open : styles.hidden
              }`}
            >
              {productDetail.description}
            </p>
          )}
          {tab === "detailProduct" && (
            <div
              className={`${styles.cssParagraph} ${
                tab === "detailProduct" ? styles.open : styles.hidden
              }`}
            >
              <div className={styles.flexCenter}>
                <Space style={{ width: "100%" }} direction="vertical" size={8}>
                  <ComponentDetail
                    title={"Loại cổ áo"}
                    content={productDetail.collarName}
                  />
                  <ComponentDetail
                    title={"Chiều dài tay áo"}
                    content={productDetail.sleeveName}
                  />
                  <ComponentDetail
                    title={"Chất liệu"}
                    content={productDetail.materialName}
                  />
                  <ComponentDetail
                    title={"Thương hiệu"}
                    content={productDetail.brandName}
                  />
                  <ComponentDetail
                    title={"Loại sản phẩm"}
                    content={productDetail.categoryName}
                  />
                  <ComponentDetail
                    title={"Họa tiết"}
                    content={productDetail.patternName}
                  />
                  <ComponentDetail
                    title={"Kiểu dáng"}
                    content={productDetail.formName}
                  />
                  <ComponentDetail
                    title={"Loại cúc áo"}
                    content={productDetail.buttonName}
                  />

                  <ComponentDetail
                    title={"Loại đuôi áo"}
                    content={productDetail.shirtTail}
                  />
                  <ComponentDetail
                    title={"Trọng lượng"}
                    content={productDetail.weight + "g"}
                  />
                </Space>
              </div>
            </div>
          )}
          {tab === "exchangeSize" && (
            <div
              className={`${styles.cssParagraph} ${
                tab === "exchangeSize" ? styles.open : styles.hidden
              }`}
            >
              exchangeSize
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Description;
