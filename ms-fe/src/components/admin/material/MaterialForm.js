import React, { useEffect, useState } from "react";
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
  return (
    <div className={styles.container}>
      {contextHolder}
      <Form></Form>
    </div>
  );
};
export default MaterialForm;
