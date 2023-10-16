import styles from "./FilterVoucherAndPromotion.module.css";

import { Col, DatePicker, Input, Row, Select, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import FloatingLabels from "../FloatingLabels/FloatingLabels";

const options = [];

options.push({
  label: "Tất cả",
  value: "ALL",
});

options.push({
  label: "Đang diễn ra",
  value: "ACTIVE",
});

options.push({
  label: "Đã kết thúc",
  value: "INACTIVE",
});

options.push({
  label: "Sắp diễn ra",
  value: "UPCOMING",
});

options.push({
  label: "Đã hủy",
  value: "CANCEL",
});

dayjs.extend(customParseFormat);

const dateFormat = "DD/MM/YYYY";

function FilterVoucherAndPromotion({
  searchNameOrCode,
  setSearchNameOrCode,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  status,
  setStatus,
}) {
  function handleSearchNameOrCode(query) {
    setSearchNameOrCode(query);
  }

  function handleStartDateChange(startDate) {
    if (startDate === undefined || startDate === null || startDate === "")
      setStartDate("");
    else setStartDate(startDate);
  }

  function handleEndDateChange(endDate) {
    if (endDate === undefined || endDate === null || endDate === "")
      setEndDate("");
    else setEndDate(endDate);
  }

  function handleSetStatus(value) {
    console.log(`selected ${value}`);
    setStatus(() => value);
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
              allowClear
            />
          </Col>
        </Row>

        <Row>
          <Col span={5}>
            <FloatingLabels
              label="Ngày bắt đầu"
              name="startDate"
              value={startDate}
            >
              <DatePicker
                style={{ width: "90%" }}
                format={dateFormat}
                size="large"
                placeholder={null}
                value={startDate}
                onChange={handleStartDateChange}
              />
            </FloatingLabels>
          </Col>
          <Col span={5}>
            <FloatingLabels
              label="Ngày kết thúc"
              name="endDate"
              value={endDate}
            >
              <DatePicker
                style={{ width: "90%" }}
                format={dateFormat}
                size="large"
                placeholder={null}
                value={endDate}
                onChange={handleEndDateChange}
                allowClear
              />
            </FloatingLabels>
          </Col>
          <Col span={5}>
            <Space style={{ width: "100%" }} direction="vertical">
              <FloatingLabels label="Trạng thái" name="status" value={"status"}>
                <Select
                  className={styles.selectedItem}
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
