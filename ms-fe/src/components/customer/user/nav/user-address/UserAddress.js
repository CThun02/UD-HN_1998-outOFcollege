import { Col, Row, Space, Tag } from "antd";
import styles from "./UserAddress.module.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

function UserAddress() {
  return (
    <div className={styles.userAddress}>
      <div className={styles.content}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <div className={styles.title}>
            <Row style={{ margin: 0 }}>
              <Col span={21}>
                <Space
                  style={{ width: "100%" }}
                  size={12}
                  direction="horizontal"
                >
                  <h2 className={styles.textColor}>Địa chỉ 1</h2>
                  <Tag
                    color="volcano"
                    style={{ fontSize: "0.8rem", padding: "4px 6px" }}
                  >
                    Mặc định
                  </Tag>
                </Space>
              </Col>

              <Col
                span={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Space
                  direction="horizontal"
                  style={{ width: "100%" }}
                  size={18}
                >
                  <EditOutlined
                    style={{ fontSize: "1.25rem" }}
                    className={styles.addressEdit}
                  />

                  <DeleteOutlined
                    style={{ fontSize: "1.25rem" }}
                    className={styles.deleteAddress}
                  />
                </Space>
              </Col>
            </Row>
          </div>
          <div className={styles.addressDetail}>
            <RowAddress title={"Họ tên"} data={"Tới"} />
            <RowAddress title={"Số điện thoại"} data={"0123456789"} />
            <RowAddress title={"Địa chỉ"} data={"abcdef"} />
          </div>
        </Space>
      </div>
    </div>
  );
}

function RowAddress({ title, data }) {
  return (
    <Row>
      <Col span={12} className={`${styles.textSize}`}>
        {title}
      </Col>
      <Col span={12} className={`${styles.textSize} ${styles.textColor}`}>
        {data ? data : "<Không có dữ liệu>"}
      </Col>
    </Row>
  );
}

export default UserAddress;
