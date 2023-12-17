import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Row, Col, Radio, Button, notification } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  TableOutlined,
  FilterFilled,
  UserOutlined,
} from "@ant-design/icons";
import CustomerTable from "./CustomerAdminTable";
import styles from "./styles/CustomerIndex.module.css";
import axios from "axios";
import { getToken } from "../../../service/Token";

const CustomerAddminIndex = function (props) {
  const [value, setValue] = useState("ALL");
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState([]);
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const handleAddAccount = () => {
    navigate(`/api/admin/${roleId === 1 ? "employee" : "customer"}/create`);
  };

  let roleId = props.roleId;
  const onChange = (e) => {
    setValue(e.target.value);
  };

  function filter() {
    axios
      .get(
        "http://localhost:8080/api/admin/account/getAllCustomer?roleId=" +
          roleId +
          "&keyword=" +
          keyword +
          "&status=" +
          value,
        {
          headers: {
            Authorization: `Bearer ${getToken(true)}`,
          },
        }
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        const status = err?.response?.data?.status;
        if (status === 403) {
          api.error({
            message: "Lỗi",
            description: "Bạn không có quyền xem nội dung này",
          });

          setData([]);
          return;
        }
      });
  }

  useEffect(() => {
    filter();
  }, [roleId, value, keyword]);

  return (
    <>
      {contextHolder}

      <div className={styles.customer}>
        <h1 style={{ textAlign: "center" }}>
          <UserOutlined /> Quản lý {roleId === 2 ? "khách hàng" : "nhân viên"}
        </h1>
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
              <Radio value={"ALL"}>Tất cả</Radio>
              <Radio value={"ACTIVE"}>Hoạt động</Radio>
              <Radio value={"INACTIVE"}>Ngưng hoạt động</Radio>
            </Radio.Group>
          </Col>
          <Col span={12} style={{ marginTop: "20px" }}>
            <Input
              className={styles.filter_inputSearch}
              placeholder="Nhập tên, số điện thoại, email để tìm kiếm"
              prefix={<SearchOutlined />}
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
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
          <CustomerTable data={data} roleId={roleId}></CustomerTable>
        </div>
      </div>
    </>
  );
};
export default CustomerAddminIndex;
