import { Button, Col, Row, Space } from "antd";
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
          setTimelines(response.data)
          let totalPrice = 0;
          totalPrice += response.data.price * response.data.quantity
          setTotalPrice(totalPrice)
        })
        .catch((error) => {
          console.error(error)
        })
    }
    getAll()
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
            {timelines.length > 0 && timelines.map((timeline) =>
              <Row style={{ margin: 0 }}>
                <Col span={3}>
                  <img src={image} alt="products" style={{ width: "100px" }} />
                </Col>
                <Col span={18}>

                  <Space Space style={{ width: "100%" }} size={8} direction="vertical">
                    <span className={`${styles.textColor} ${styles.textSize}`}>
                      {timeline.product.productName + '-' + timeline.brand.brandName + '-' + timeline.button.buttonName + '-' + timeline.category.categoryName + '-' + timeline.collar.collarTypeName + '-' + timeline.color.colorName + '-' + timeline.form.formName + '-' + timeline.material.materialName + '-' + timeline.pattern.patternName + '-' + timeline.shirtTail.shirtTailTypeName}
                    </span>

                    <span>{timeline.color.colorName}/{timeline.size.sizeName}</span>
                    <span className={styles.textColor}>x{timeline.quantity}</span>
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
              <Button type="primary" style={{ marginRight: "20px" }}>
                Mua lại
              </Button>
              <span>Thành tiền {totalPrice}</span>
            </div>
          </Space>
        </div>
      </div>
    </div >
  );
}

export default FollowingOrderContent;
