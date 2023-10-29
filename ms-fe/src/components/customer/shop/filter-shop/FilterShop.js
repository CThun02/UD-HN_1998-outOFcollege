import { Col, Divider, Input, Row, Slider, Space, theme } from "antd";
import styles from "./FilterShop.module.css";
import ComponentsFilter from "../../../element/filter-shop/ComponentsFilter";
import RangPrice from "./range-price/RangPrice";

const options = [
  { label: "Apple", value: "Apple" },
  { label: "Pear", value: "Pear" },
  { label: "Orange", value: "Orange" },
  { label: "Ice", value: "Ice" },
  { label: "Ice", value: "Ice" },
  { label: "Ice", value: "Ice" },
];

function FilterShop() {
  return (
    <div className={styles.width}>
      <div className={styles.content}>
        <Space direction="vertical" style={{ width: "100%" }} size={10}>
          <div className={styles.title}>
            <h3 className={`${styles.textSize} ${styles.textColor}`}>
              Bộ lọc tìm kiếm
            </h3>
          </div>

          <div className={styles.body}>
            <Space direction="vertical" style={{ width: "100%" }} size={10}>
              <div className={styles.paddingSize}>
                <div className={styles.searchName}>
                  <Input
                    placeholder="Nhập tên sản phẩm"
                    allowClear
                    size="large"
                  />
                </div>
              </div>

              <div className={styles.range}>
                <Divider className={styles.dividerSize} />
                <div className={styles.paddingSize}>
                  <RangPrice />
                </div>
              </div>

              <div className={styles.radioGroup}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <ComponentsFilter options={options} title={"Loại sản phẩm"} />
                  <ComponentsFilter options={options} title={"Thương hiệu"} />
                  <ComponentsFilter options={options} title={"Màu sắc"} />
                  <ComponentsFilter options={options} title={"Kích cỡ"} />
                </Space>
              </div>
            </Space>
          </div>
        </Space>
      </div>
    </div>
  );
}

export default FilterShop;
