import { Col, Popconfirm, Row, Space, Tag, message } from "antd";
import styles from "./UserAddress.module.css";
import { DeleteOutlined, EditOutlined, StarOutlined } from "@ant-design/icons";
import { request } from "../../../../../service/Token";
import EditAddress from "../../../../element/edit-address/EditAddress";
import { useEffect } from "react";
import { useState } from "react";

const baseUrl = "http://localhost:8080/api/client/user";

function UserAddress({ address, index, setIsRender }) {
  function handleSetDefaultAddress(value) {
    request("POST", baseUrl + "/update-address", {
      ...value,
      defaultAddress: true,
    });
    setIsRender((render) => !render);
  }

  const confirm = (value) => {
    request("DELETE", baseUrl + "/delete-address?addressId=" + value, {});
    setIsRender((render) => !render);
  };

  const cancel = (e) => {
    message.error("Click on No");
  };

  const [openAdd, setOpenAdd] = useState(false);

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
                span={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Space direction="horizontal" size={18}>
                  <Popconfirm
                    title="Xác nhận"
                    description="Bạn chắc chắn muốn xóa địa chỉ này?"
                    onConfirm={() => confirm(address.idAddress)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined
                      style={{ fontSize: "1.25rem" }}
                      className={styles.deleteAddress}
                    />
                  </Popconfirm>

                  <EditOutlined
                    style={{ fontSize: "1.25rem" }}
                    className={styles.addressEdit}
                    onClick={() => setOpenAdd(true)}
                  />

                  <EditAddress
                    isModalOpen={openAdd}
                    handleAddressOk={() => console.log(123)}
                    handleAddressCancel={() => setOpenAdd(false)}
                    render={setIsRender}
                    addressId={address.idAddress}
                  />

                  {!address.defaultAddress && (
                    <StarOutlined
                      style={{ fontSize: "1.25rem" }}
                      className={styles.starIcon}
                      onClick={() => handleSetDefaultAddress(address)}
                    />
                  )}
                </Space>
              </Col>
            </Row>
          </div>
          <div className={styles.addressDetail}>
            <RowAddress title={"Họ tên"} data={address.fullName} />
            <RowAddress title={"Số điện thoại"} data={address.phoneNumber} />
            <RowAddress
              title={"Thành phố"}
              data={address.city?.substring(0, address.city.indexOf("|"))}
            />
            <RowAddress
              title={"Huyện"}
              data={address.district?.substring(
                0,
                address.district.indexOf("|")
              )}
            />
            <RowAddress
              title={"Phường"}
              data={address.ward?.substring(0, address.ward.indexOf("|"))}
            />
            <RowAddressDetail
              title={"Địa chỉ chi tiết"}
              detailCity={`${address.city?.substring(
                0,
                address.city.indexOf("|")
              )} 
              - ${address.district?.substring(0, address.district.indexOf("|"))}
               -${address.ward?.substring(0, address.ward.indexOf("|"))}`}
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
