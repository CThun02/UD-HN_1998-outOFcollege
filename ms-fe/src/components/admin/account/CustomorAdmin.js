import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Input, Row, Col, Radio, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import CustomerTable from "./CustomerAdminTable";
import style from "./styles/Customerlndex.module.css";
import styles from "./AccountForm.module.css";

const CustomerAddminIndex = function (props) {
  const { Option } = Select;
  const [value, setValue] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");

  const navigate = useNavigate();
  const handleAddAccount = () => {
    navigate(`/admin/${roleId === 1 ? "employee" : "customer"}/create`);
  };

  let roleId = props.roleId;
  const onChange = (e) => {
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

  const handleSearch = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleFormSubmit = () => {
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
              <p>
                Nhập tên {Number(roleId) === 1 ? "nhân viên" : "khách hàng"} ,
                email, số điện thoại
              </p>
            </Row>
            <Row className={styles.thanhpho}>
              <Input
                placeholder="Nhập từ khóa để tìm kiếm"
                prefix={<SearchOutlined />}
                onChange={handleSearch}
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
                <Button className={style.btnSeach} onClick={handleAddAccount}>
                  <PlusOutlined className={style.faPlus} />
                  <span className={style.titleSeach}>
                    Thêm {Number(roleId) === 1 ? "nhân viên" : "khách hàng"}
                  </span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className={style.customerTable}>
          <CustomerTable
            roleId={roleId}
            searchKeyword={searchKeyword}
          ></CustomerTable>
        </div>
      </div>
    </div>
  );
};

export default CustomerAddminIndex;
