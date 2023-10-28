import { Col, Row, Space } from "antd";
import styles from "./FooterFollowUs.module.css";
import { InstagramOutlined, YoutubeOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function FooterFollowUs() {
  return (
    <div>
      <Row>
        <Col span={24}>
          <h4 className={styles.fontWeight}>Theo dõi chúng tôi</h4>
        </Col>
      </Row>
      <Row>
        <Space direction="vertical" size={16}>
          <Link className={styles.hyperLink}>
            <Space size={12} direction="horizontal">
              <FontAwesomeIcon icon={faFacebook} />
              Facebook
            </Space>
          </Link>
          <Link className={styles.hyperLink}>
            <Space size={12} direction="horizontal">
              <InstagramOutlined />
              Instagram
            </Space>
          </Link>
          <Link className={styles.hyperLink}>
            <Space size={12} direction="horizontal">
              <YoutubeOutlined />
              Youtube
            </Space>
          </Link>
        </Space>
      </Row>
    </div>
  );
}

export default FooterFollowUs;
