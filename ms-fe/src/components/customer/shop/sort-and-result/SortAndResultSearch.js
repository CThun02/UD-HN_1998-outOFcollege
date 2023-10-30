import { Col, Row, Select } from "antd";

function SortAndResultSearch() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <div>
        <Row>
          <Col span={20}>
            <p style={{ fontSize: "16px", color: "#111111" }}>
              Hiển thị từ 1-12 trên 23 kết quả
            </p>
          </Col>
          <Col span={4}>
            <Select
              style={{ width: "100%" }}
              defaultValue={null}
              onChange={handleChange}
              options={[
                { value: null, label: "Giá" },
                { value: "priceUp", label: "Giá thấp đến cao" },
                { value: "priceDown", label: "Giá cao đến thấp" },
              ]}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SortAndResultSearch;
