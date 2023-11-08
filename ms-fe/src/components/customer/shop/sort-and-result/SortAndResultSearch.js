import { Col, Row, Select } from "antd";

function SortAndResultSearch({ products, filter, setFilter }) {
  const handleChange = (value) => {
    setFilter({ ...filter, sort: value });
  };

  return (
    <div>
      <div>
        <Row>
          <Col span={20}>
            <p style={{ fontSize: "16px", color: "#111111" }}>
              Hiển thị <strong>{products.length}</strong> kết quả
            </p>
          </Col>
          <Col span={4}>
            <Select
              style={{ width: "100%" }}
              defaultValue={"up"}
              value={filter.sort}
              onChange={handleChange}
              options={[
                { value: "up", label: "Giá thấp đến cao" },
                { value: "down", label: "Giá cao đến thấp" },
              ]}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default SortAndResultSearch;
