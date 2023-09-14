import styles from "./FilterVoucherAndPromotion.module.css";

import { Col, DatePicker, Input, Row, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

function FilterVoucherAndPromotion() {
  return (
    <div className={styles.filter}>
      <Space size={12} style={{ width: "100%" }} direction="vertical">
        <Row>
          <Space size={10} className={styles.color}>
            <i>
              <FontAwesomeIcon icon={faFilter} />
            </i>

            <h2>Bộ lọc</h2>
          </Space>
        </Row>

        <Row>
          <Col span={8}>
            <Input
              className={styles.input}
              size="middle"
              placeholder="Nhập tên hoặc mã"
              prefix={<SearchOutlined />}
              width={"20%"}
            />
          </Col>
        </Row>

        <Row>
          <Col span={4}>
            <DatePicker
              format={dateFormat}
              size="middle"
              placeholder="Ngày bắt đầu"
            />
          </Col>
          <Col span={4}>
            <DatePicker
              format={dateFormat}
              size="middle"
              placeholder="Ngày kết thúc"
            />
          </Col>
          <Col span={6}>
            <Space style={{ width: "100%" }} direction="vertical">
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={["Tất cả", "Đang diễn ra"]}
                size="middle"
              />
            </Space>
          </Col>
        </Row>
      </Space>
    </div>
  );
}

export default FilterVoucherAndPromotion;
