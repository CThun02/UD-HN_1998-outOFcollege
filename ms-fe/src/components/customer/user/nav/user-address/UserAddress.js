import { Col, Row, Space, Tag } from "antd";
import styles from "./UserAddress.module.css";
import { DeleteOutlined, EditOutlined, StarOutlined } from "@ant-design/icons";

function UserAddress({ address, index }) {
  console.log("address", address.idAddress, "index", index);
  return (
    <div className={styles.userAddress}>
      <div className={styles.content}>
        <Space direction="vertical" size={24} style={{ width: "100%" }}>
          <div className={styles.title}>
            <Row style={{ margin: 0 }}>
              <Col span={16}>
                <Space
                  style={{ width: "100%" }}
                  size={12}
                  direction="horizontal"
                >
                  <h2 className={styles.textColor}>Địa chỉ {index + 1} </h2>
                  {address.defaultAddress && (
                    <Tag
                      color="volcano"
                      style={{ fontSize: "0.8rem", padding: "4px 6px" }}
                    >
                      Mặc định
                    </Tag>
                  )}
                </Space>
              </Col>

              <Col
                span={8}
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
                  {!address.defaultAddress && (
                    <StarOutlined
                      style={{ fontSize: "1.25rem" }}
                      className={styles.starIcon}
                    />
                  )}

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
            <RowAddress title={"Họ tên"} data={address.fullName} />
            <RowAddress title={"Số điện thoại"} data={address.phoneNumber} />
            <RowAddress title={"Thành phố"} data={address.city} />
            <RowAddress title={"Huyện"} data={address.district} />
            <RowAddress title={"Phường"} data={address.ward} />
            <RowAddressDetail
              title={"Địa chỉ chi tiết"}
              detailCity={`${address.city} - ${address.district} ${address.ward}`}
              detailHouse={`${address.street} - ${address.descriptionDetail}`}
            />
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

function RowAddressDetail({ title, detailHouse, detailCity }) {
  return (
    <Row>
      <Col
        span={12}
        className={`${styles.textSize}`}
        style={{ display: "flex", alignItems: "center" }}
      >
        {title}
      </Col>
      <Col span={12} className={`${styles.textSize} ${styles.textColor}`}>
        {detailHouse && detailCity ? (
          <Space direction="vertical" size={10} style={{ width: "100%" }}>
            <span>{detailHouse}</span>
            <span>{detailCity}</span>
          </Space>
        ) : (
          "<Không có dữ liệu>"
        )}
      </Col>
    </Row>
  );
}

export default UserAddress;
