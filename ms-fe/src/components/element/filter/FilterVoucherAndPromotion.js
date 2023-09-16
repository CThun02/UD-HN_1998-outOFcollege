import styles from "./FilterVoucherAndPromotion.module.css";

import { Col, DatePicker, Input, Row, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import FloatingLabels from "../FloatingLabels/FloatingLabels";
import { useState } from "react";

const options = [];

options.push({
  label: "Tất cả",
  value: "all",
});

options.push({
  label: "Đang hoạt động",
  value: "Đang hoạt động",
});

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

function FilterVoucherAndPromotion() {
  const [searchNameOrCode, setSearchNameOrCode] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("all");

  function handleSearchNameOrCode(query) {
    setSearchNameOrCode(query);
  }

  function handleStartDatChange(startDate) {
    setStartDate(startDate);
  }

  function handleEndDatChange(endDate) {
    setEndDate(endDate);
  }

  function handleSetStatus(status) {
    console.log(`selected ${status}`);
    setStatus(status);
  }

  return (
    <div className={styles.filter}>
      <Space size={18} style={{ width: "100%" }} direction="vertical">
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
              value={searchNameOrCode}
              onChange={(e) => handleSearchNameOrCode(e.target.value)}
            />
          </Col>
        </Row>

        <Row>
          <Col span={4}>
            <FloatingLabels
              label="Ngày bắt đầu"
              name="startDate"
              value={startDate}
            >
              <DatePicker
                format={dateFormat}
                size="large"
                placeholder={null}
                value={startDate}
                onChange={handleStartDatChange}
              />
            </FloatingLabels>
          </Col>
          <Col span={4}>
            <FloatingLabels
              label="Ngày kết thúc"
              name="endDate"
              value={endDate}
            >
              <DatePicker
                format={dateFormat}
                size="large"
                placeholder={null}
                value={endDate}
                onChange={handleEndDatChange}
              />
            </FloatingLabels>
          </Col>
          <Col span={4}>
            <Space style={{ width: "100%" }} direction="vertical">
              <FloatingLabels label="Trạng thái" name="status" value={status}>
                <Select
                  onChange={handleSetStatus}
                  options={options}
                  style={{ width: "100%" }}
                  placeholder={null}
                  defaultValue={["Tất cả"]}
                  size="large"
                />
              </FloatingLabels>
            </Space>
          </Col>
        </Row>
      </Space>
    </div>
  );
}

export default FilterVoucherAndPromotion;
