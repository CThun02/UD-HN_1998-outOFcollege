import UserAddress from "./UserAddress";
import styles from "./Address.module.css";
import { Col, Row, Space } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

function Address({ address }) {
  console.log("address: ", address);
  return (
    <div className={styles.address}>
      <div className={styles.content}>
        <Space style={{ width: "100%" }} direction="vertical" size={24}>
          <div className={styles.title}>
            <Row style={{ margin: 0 }}>
              <Col span={23}>
                <h2 className={styles.textColor}>Địa chỉ</h2>
              </Col>
              {address.length < 3 && (
                <Col
                  span={1}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PlusCircleOutlined
                    style={{
                      fontSize: "1.25rem",
                    }}
                    className={styles.plusIcon}
                  />
                </Col>
              )}
            </Row>
          </div>

          <div className={styles.body}>
            <Row
              direction="horizontal"
              style={{ width: "100%", margin: 0 }}
              size={12}
            >
              {address?.map((address, i) => (
                <Col
                  key={address.idAddress}
                  span={8}
                  style={{ padding: "0 10px" }}
                >
                  <UserAddress
                    address={address}
                    index={i}
                    key={address.idAddress}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Space>
      </div>
    </div>
  );
}

export default Address;
