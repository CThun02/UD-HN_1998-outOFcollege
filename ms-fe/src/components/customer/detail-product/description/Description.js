import { Col, Row, Select, Space } from "antd";
import styles from "./Description.module.css";
import { useState } from "react";
import ComponentDetail from "./ComponentDetail";

function Description({ productDetail }) {
  const [tab, setTab] = useState("description");

  return (
    <div className={styles.description}>
      <div className={styles.flexContent}>
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
      </div>
      <div className={styles.selectResponse}>
        <Select
          bordered={false}
          value={tab}
          className={styles.selectDescription}
        >
          <Select.Option key={1} value={"description"}>
            <span
              className={`${styles.colorText} ${styles.sizeText} ${
                styles.cssHover
              } ${tab === "description" ? styles.active : ""}`}
              onClick={() => setTab("description")}
            >
              Mô tả chi tiết
            </span>
          </Select.Option>
          <Select.Option key={2} value={"detailProduct"}>
            <span
              className={`${styles.colorText} ${styles.sizeText} ${
                styles.cssHover
              } ${tab === "detailProduct" ? styles.active : ""}`}
              onClick={() => setTab("detailProduct")}
            >
              Thông tin sản phẩm
            </span>
          </Select.Option>
          <Select.Option key={3} value={"exchangeSize"}>
            <span
              className={`${styles.colorText} ${styles.sizeText} ${
                styles.cssHover
              } ${tab === "exchangeSize" ? styles.active : ""}`}
              onClick={() => setTab("exchangeSize")}
            >
              Quy đổi kích cỡ
            </span>
          </Select.Option>
        </Select>
      </div>

      <div className={styles.contentDescription}>
        <div style={{ width: "70%" }}>
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
              <div>
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
