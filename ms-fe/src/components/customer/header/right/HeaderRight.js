import { Badge, Col, Popover, Row } from "antd";
import styles from "./HeaderRight.module.css";
import { Link } from "react-router-dom";
import { UserOutlined, ShoppingCartOutlined } from "@ant-design/icons";

const content = (
  <div style={{ width: "100px" }}>
    <p>
      <Link className={styles.link}>Login</Link>
    </p>
    <p>
      <Link className={styles.link}>Logout</Link>
    </p>
  </div>
);

function HeaderRight() {
  return (
    <div className={styles.flex}>
      <Row className={styles.margin}>
        <Col span={10}></Col>
        <Col span={14}>
          <div className={styles.lineHeight}>
            <Row className={styles.margin}>
              <Col span={1}></Col>
              <Col span={7}>
                <Link className={styles.link}>Giới thiệu</Link>
              </Col>
              <Col span={7}>
                <Link className={styles.link}>Liên hệ</Link>
              </Col>
              <Col span={7}>
                <p className={styles.cssParagraph}>$0.00</p>
                <Badge count={5}>
                  <Link className={styles.link}>
                    <ShoppingCartOutlined className={styles.iconSize} />
                  </Link>
                </Badge>
              </Col>
              <Col span={2} className={styles.centerd}>
                <Link to={"/ms-shop/home"} className={styles.link}>
                  <Popover
                    content={content}
                    placement="bottomLeft"
                    trigger="hover"
                  >
                    <UserOutlined className={styles.iconSize} />
                  </Popover>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HeaderRight;
