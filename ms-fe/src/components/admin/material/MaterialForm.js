import React, { useState } from "react";
import { DatePickerProps } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./AccountForm.module.css";
import axios from "axios";
import {
  Row,
  Col,
  Space,
  Avatar,
  Form,
  Input,
  Radio,
  Select,
  DatePicker,
  Button,
  Upload,
  message,
  notification,
} from "antd";

const MaterialForm = function (props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [value, setValue] = useState(1);
  const selectStatus = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const selectCreateBy = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const navigate = useNavigate();
  const handleAdd = () => {
    navigate(`/create`);
  };
  return (
    <div className={styles.container}>
      {contextHolder}
      <Form>
        <Row>
          <Col span={12}>
            <p>Id: </p> <Input type="number" disabled></Input>
          </Col>
          <Col span={4} offset={8}>
            <Button type="primary" onClick={handleAdd}>
              Thêm
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p>Tên Chất Liệu</p> <Input placeholder="Tên chất liệu" />
          </Col>
          <Col span={12}>
            <p>Trạng thái</p>{" "}
            <Radio.Group onChange={selectStatus} value={value}>
              <Radio value={1}>Active</Radio>
              <Radio value={2}>Inactive</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <p>Ngày Tạo</p> <DatePicker onChange={onChange} />
          </Col>
          <Col>
            <p>Người Tạo: </p>{" "}
            <Radio.Group onChange={selectCreateBy} value={value}>
              <Radio value={1}>Active</Radio>
              <Radio value={2}>Inactive</Radio>
            </Radio.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default MaterialForm;
