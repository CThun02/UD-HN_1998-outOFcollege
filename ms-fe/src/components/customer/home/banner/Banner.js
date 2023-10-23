import { Card, Col, Row } from "antd";
import styles from "./Banner.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckMoving, faRecycle } from "@fortawesome/free-solid-svg-icons";

import {
  faMoneyBill1,
  faAddressBook,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div>
      <div className={styles.background}>
        <Row gutter={16} className={styles.spacing}>
          <Col span={6}>
            <Card
              bordered={false}
              className={`${styles.backgroundCard} ${styles.padding}`}
            >
              <Row>
                <Col span={6}>
                  <FontAwesomeIcon
                    icon={faTruckMoving}
                    style={{ color: "#2fc1ff", fontSize: "36px" }}
                  />
                </Col>
                <Col span={18} className={styles.sizeText}>
                  <Link>Free shipping</Link>
                  <p>Trên 1 triệu đồng</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              bordered={false}
              className={`${styles.backgroundCard} ${styles.padding}`}
            >
              <Row>
                <Col span={6}>
                  <FontAwesomeIcon
                    icon={faAddressBook}
                    style={{ color: "#2fc1ff", fontSize: "36px" }}
                  />
                </Col>
                <Col span={18} className={styles.sizeText}>
                  <Link>Chứng nhận</Link>
                  <p>100% hàng thật</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              bordered={false}
              className={`${styles.backgroundCard} ${styles.padding}`}
            >
              <Row>
                <Col span={6}>
                  <FontAwesomeIcon
                    icon={faMoneyBill1}
                    style={{ color: "#2fc1ff", fontSize: "36px" }}
                  />
                </Col>
                <Col span={18} className={styles.sizeText}>
                  <Link>Tiết kiệm lớn</Link>
                  <p>Giá thấp nhất</p>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              bordered={false}
              className={`${styles.backgroundCard} ${styles.padding}`}
            >
              <Row>
                <Col span={6}>
                  <FontAwesomeIcon
                    icon={faRecycle}
                    style={{ color: "#2fc1ff", fontSize: "36px" }}
                  />
                </Col>
                <Col span={18} className={styles.sizeText}>
                  <Link>Tái chế dễ dàng</Link>
                  <p>Không có câu hỏi</p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Banner;
