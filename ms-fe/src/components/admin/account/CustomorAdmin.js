import React, { useEffect, useState } from "react";

import { Select, Input, Row, Col, Radio, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import CustomerTable from "./CustomerAdminTable";
import style from "./styles/Customerlndex.module.css";

const CustomerAddminIndex = function (props) {
  const { Option } = Select;
  const [value, setValue] = useState(1);
  let roleId = props.roleId;
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
  const handleFormSubmit = () => {
    // Thực hiện các hành động sau khi form gửi thành công
    // Ví dụ: cập nhật lại dữ liệu, hiển thị thông báo thành công, vv.
    console.log("Form submitted successfully!");
  };
  useEffect(() => {
    console.log("render");
  }, [roleId]);

  return (
    <div className={style.customer}>
      <div className={style.radiusFrame}>
        <Row className={style.titleTB}>
          <h3>Danh Sách {roleId === 1 ? "nhân viên" : "khách hàng"}</h3>
        </Row>
        <Row className={style.adminMenu}>
          <Col span={10}>
            <Row>
              <p>Nhập tên khách hàng, email, số điện thoại</p>
            </Row>
            <Row className={style.adminMenu1}>
              <Input
                placeholder="Nhập từ khóa để tìm kiếm"
                prefix={<SearchOutlined />}
              />
            </Row>
          </Col>
          <Col span={14}>
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
          <CustomerTable roleId={roleId}></CustomerTable>
        </div>
      </div>
    </div>
  );
};
export default CustomerAddminIndex;
