import { Badge, Button, Carousel, Col, Row, Space } from "antd";
import styles from "./FollowingOrderContent.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../../../../../../service/Token";

const image = "/products/shirt-men.jpg";

function FollowingOrderContent({ status }) {
  const [timelines, setTimelines] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const token = getAuthToken()
  useEffect(() => {
    const getAll = async () => {
      const data = await token
      await axios.get(`http://localhost:8080/api/client/timelineByUser?username=${data.username}&status=${status}&phoneNumber&email`)
        .then((response) => {
          console.log(response.data)
          let totalPrice = 0;
          for (let i = 0; i < response.data.length; i++) {
            totalPrice += response.data[i].price * response.data[i].quantity
            console.log(totalPrice)
          }
          setTotalPrice(totalPrice)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    getAll()
    console.log(timelines)

  }, [status])

  return (
    <div className={styles.content}>
      <div className={styles.width}>
        <div className={styles.followingContent}>
          <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <div style={{ borderBottom: "1px solid #ccc", padding: "5px 0" }}>
              <span
                style={{
                  fontSize: "1.25rem",
                  color: "#ee4d2d",
                  textTransform: "uppercase",
                }}
              >
                Chờ giao hàng
              </span>
            </div>
            {timelines?.length > 0 && timelines.map((timeline) =>
              <Row style={{ margin: 0 }}>
                <Col span={3}>
                  <Badge.Ribbon
                    text={`Giảm ${timeline.promotion[0].promotionValue
                      ? timeline.promotion[0].promotionMethod ===
                        "%"
                        ? timeline.promotion[0].promotionValue +
                        " " +
                        timeline.promotion[0].promotionMethod
                        : timeline.promotion[0].promotionValue.toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )
                      : null
                      }`}
                    color="red"
                  >
                    <Carousel style={{ maxWidth: "300px" }} autoplay>
                      {timeline.productImageResponse &&
                        timeline.productImageResponse.map(
                          (item) => {
                            return (
                              <img
                                key={item.id}
                                style={{ width: "100%", marginTop: "10px" }}
                                alt=""
                                src={item.path}
                              />
                            );
                          }
                        )}
                    </Carousel>
                  </Badge.Ribbon>
                </Col>
                <Col span={18}>
                  <Space Space style={{ width: "100%", marginLeft: "16px" }} size={8} direction="vertical">
                    <Row>
                      <Col span={24}>
                        <div
                          className="m-5"
                          style={{
                            textAlign: "start",
                            height: "100%",
                            justifyContent: "center",
                          }}
                        >
                          <span style={{ fontWeight: "500" }}>
                            {timeline.product.productName +
                              "-" +
                              timeline.brand.brandName +
                              "-" +
                              timeline.category.categoryName +
                              "-" +
                              timeline.button.buttonName +
                              "-" +
                              timeline.material.materialName +
                              "-" +
                              timeline.collar.collarTypeName +
                              "-" +
                              timeline.sleeve.sleeveName +
                              "-" +
                              timeline.shirtTail.shirtTailTypeName +
                              "-" +
                              timeline.pattern.patternName +
                              "-" +
                              timeline.form.formName}
                          </span>
                          <br />
                          <div className={styles.optionColor}>
                            <b>Màu sắc: </b>
                            <span
                              style={{
                                backgroundColor: timeline.color.colorCode,
                                marginLeft: "8px",
                              }}
                            ></span>
                            {timeline.color.colorName}
                          </div>
                          <b>Kích cỡ: </b>
                          <span
                            style={{
                              marginLeft: "8px",
                            }}
                          >
                            {timeline.size.sizeName}
                          </span>
                          <br />
                          <b>Số lượng: </b>
                          <span
                            style={{
                              marginLeft: "8px",
                            }}
                          >
                            {timeline.quantity}
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Space>
                </Col>
                <Col
                  span={3}
                  style={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <span style={{ fontSize: "1.25rem", color: "#ee4d2d" }}>
                    {(timeline.price * timeline.quantity).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>
                </Col>
              </Row>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                borderTop: "1px solid #ccc",
                padding: "10px 0",
              }}
            >
              {/* <Button type="primary" style={{ marginRight: "20px" }}>
                Mua lại
              </Button> */}
              <span>Thành tiền: {totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}</span>
            </div>
          </Space>
        </div>
      </div>
    </div >
  );
}

export default FollowingOrderContent;
