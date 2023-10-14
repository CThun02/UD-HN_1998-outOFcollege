import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Input, Row, Col, Radio, Button } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import MaterialTable from "./MaterialTable";
import styles from "./MaterialStyle.module.css";

const MaterialAdmin = function () {
  return (
    <div className={styles.material}>
      <div className={styles.radiusFrame}>
        <Row className={styles.titleTB}>
          <h3>Danh Sách Chất Liệu</h3>
        </Row>
        <Row className={styles.adminMenu}>
          <Col span={10}>
            <Row className={styles.menu}>
              <Input
                placeholder="Nhập từ khóa để tìm kiếm"
                prefix={<SearchOutlined />}
              />
            </Row>
          </Col>
          <Col span={13} offset={1}>
            <Col span={9} offset={1}>
              <Button className={styles.btnSeach}>
                <PlusOutlined className={styles.faPlus} />
                <span className={styles.titleSeach}>Thêm Chất Liệu</span>
              </Button>
            </Col>
          </Col>
        </Row>
        <div className={styles.materialTable}>
          <MaterialTable></MaterialTable>
        </div>
      </div>
    </div>
  );
};
export default MaterialAdmin;
