import React, { useState } from "react";
import { Select, Input, Row, Col, Radio, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import CustomerTable from "./CustomerAdminTable";
import style from "./styles/CustomerIndex.module.css";

const CustomerAddminIndex = function () {
  const { Option } = Select;
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const MySelect = () => {
    return (
      <Select defaultValue="option1" style={{ width: 200 }}>
        <Option value="option1" defaultValue disable>
          Trạng thái
        </Option>
        <Option value="option2">Hoạt động</Option>
        <Option value="option3">Ngưng hoạt động</Option>
      </Select>
    );
  };

  return (
    <div className={style.customer}>
      <div className={style.radiusFrame}>
        <Row className={style.titleTB}>
          <h3>Danh Sách Khách Hàng</h3>
        </Row>
        <Row className={style.adminMenu}>
          <Col span={10}>
            <Row>
              <p>Nhập tên khách hàng, email, số điện thoại</p>
            </Row>
            <Row>
              <Input
                placeholder="Nhập từ khóa để tìm kiếm"
                prefix={<SearchOutlined />}
              />
            </Row>
          </Col>
          <Col span={12} offset={2}>
            <p>Trạng thái</p>
            <Row>
              <Col span={14}>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1}>Tất cả</Radio>
                  <Radio value={2}>Hoạt động</Radio>
                  <Radio value={3}>Không hoạt động</Radio>
                </Radio.Group>
              </Col>
              <Col span={9} offset={1}>
                <Button className={style.btnSeach}>
                  <PlusOutlined className={style.faPlus} />
                  <span className={style.titleSeach}>Thêm khách hàng</span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className={style.customerTable}>
          <CustomerTable></CustomerTable>
        </div>
      </div>
    </div>
  );
};
export default CustomerAddminIndex;
