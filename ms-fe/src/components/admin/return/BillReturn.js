import { ReloadOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Table } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import styles from "./BillReturn.module.css";

const BillReturn = () => {
  const columns = [
    {
      key: "#",
      title: "#",
    },
    {
      key: "product",
      title: "Sản phẩm",
      width: "50%",
    },
    {
      key: "quantity",
      title: "Số lượng",
    },
    {
      key: "total",
      title: "Tổng tiền",
    },
    {
      key: "action",
      title: "Thao tác",
    },
  ];

  return (
    <>
      <div className={styles.billReturn}>
        <h3 style={{ marginBottom: "25px" }}>Thông tin hóa đơn</h3>a
      </div>
      <div style={{ margin: "25px 0" }} className={styles.billReturn}>
        <h3>Thông tin khách hàng</h3>
        <Row style={{ margin: "25px 30px" }}>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Tên khách hàng</span>
              </Col>
              <Col span={16}>
                <span>Nguyễn Văn A</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Ngày giao hàng</span>
              </Col>
              <Col span={16}>
                <span>Nguyễn Văn A</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Số điện thoại</span>
              </Col>
              <Col span={16}>
                <span>Nguyễn Văn A</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Ngày nhận hàng</span>
              </Col>
              <Col span={16}>
                <span>Nguyễn Văn A</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Địa chỉ</span>
              </Col>
              <Col span={16}>
                <span>Nguyễn Văn A</span>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ marginBottom: "10px" }}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Trạng thái</span>
              </Col>
              <Col span={16}>
                <span>Nguyễn Văn A</span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Ghi chú</span>
              </Col>
              <Col span={16}>
                <span>Nguyễn Văn A</span>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row>
              <Col span={8}>
                <span style={{ fontWeight: 500 }}>Loại hóa đơn</span>
              </Col>
              <Col span={16}>
                <span>Nguyễn Văn A</span>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: "25px" }} className={styles.billReturn}>
        <h3 style={{ marginBottom: "25px" }}>Thông tin đơn hàng</h3>
        <div style={{ textAlign: "end", marginBottom: "10px" }}>
          <Button size="large" type="primary">
            <ReloadOutlined />
            Trả hàng tất cả
          </Button>
        </div>
        <Table columns={columns} />
      </div>
      <Row>
        <Col span={16}>
          <div
            className={`${styles.billReturn} me-5`}
            style={{ height: "100%" }}
          >
            <h3 style={{ marginBottom: "25px" }}>Thông tin trả hàng</h3>
          </div>
        </Col>
        <Col span={8}>
          <div className={`${styles.billReturn} ms-5`}>
            <h3 style={{ marginBottom: "25px" }}>Thông tin thanh toán</h3>
            <Row style={{ margin: "0 15px" }}>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Tổng giá gốc:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(63, 134, 0)" }}>
                  10.000.000 đ
                </span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Tổng giá trả:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(255, 77, 79)" }}>
                  10.000.000 đ
                </span>
              </Col>
              <Divider />
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600 }}>Tiền thừa trả khách:</span>
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                <span style={{ fontWeight: 600, color: "rgb(255, 77, 79)" }}>
                  10.000.000 đ
                </span>
              </Col>
              <Col span={24}>
                <span style={{ fontWeight: 600 }}>
                  Mô tả <span style={{ color: "rgb(255, 77, 79)" }}>*</span>
                </span>
                <TextArea allowClear />
              </Col>
              <Col span={24}>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "100%", margin: "20px 0 " }}
                >
                  <span style={{ fontWeight: 600 }}>Xác nhận trả hàng</span>
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BillReturn;
