import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Row, Col, Radio, Button } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  TableOutlined,
  FilterFilled,
} from "@ant-design/icons";
import CustomerTable from "./CustomerAdminTable";
import styles from "./styles/CustomerIndex.module.css";

const CustomerAddminIndex = function (props) {
  const [value, setValue] = useState(1);

  const navigate = useNavigate();
  const handleAddAccount = () => {
    navigate(`/admin/${roleId === 1 ? "employee" : "customer"}/create`);
  };

  let roleId = props.roleId;
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {}, [roleId]);

  return (
    <div className={styles.customer}>
      <div className={styles.radiusFrame}>
        <Row className={styles.titleTB}>
          <h3>Danh Sách {roleId === 1 ? "nhân viên" : "khách hàng"}</h3>
        </Row>
        <Row className={styles.adminMenu}>
          <Col span={10}>
            <Row>
              <p>Nhập tên nhân viên , email, số điện thoại</p>
            </Row>
            <Row className={styles.thanhpho}>
              <Input
                placeholder="Nhập từ khóa để tìm kiếm"
                prefix={<SearchOutlined />}
              />
            </Row>
          </Col>
        </Row>
        <Col span={13} offset={1}>
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
              <Button className={styles.btnSeach} onClick={handleAddAccount}>
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Nhân Viên</span>
              </Button>
            </Col>
          </Row>
        </Col>
        <div className={styles.customer}>
          <h2>
            <FilterFilled /> Bộ lọc
          </h2>
          <Row className={`${styles.adminMenu} m-5`}>
            <Col span={14} className="m-5">
              <span>
                <b>Trạng thái</b>
              </span>
              {"  "}
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>Tất cả</Radio>
                <Radio value={"ACTIVE"}>Hoạt động</Radio>
                <Radio value={"INACTIVE"}>Ngưng hoạt động</Radio>
              </Radio.Group>
            </Col>
            <Col span={12} style={{ marginTop: "20px" }}>
              <Input
                className={styles.filter_inputSearch}
                placeholder="Nhập mã tên để tìm kiếm"
                prefix={<SearchOutlined />}
              />
            </Col>
          </Row>
        </div>
        <div className={styles.customer} style={{ marginTop: "20px" }}>
          <h2>
            <TableOutlined /> Danh Sách{" "}
            {roleId === 1 ? "nhân viên" : "khách hàng"}
          </h2>
          <div>
            <div className="m-5" style={{ textAlign: "end" }}>
              <Button
                onClick={handleAddAccount}
                className={styles.account__Create}
              >
                <PlusOutlined />
              </Button>
            </div>
            <CustomerTable roleId={roleId}></CustomerTable>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerAddminIndex;
