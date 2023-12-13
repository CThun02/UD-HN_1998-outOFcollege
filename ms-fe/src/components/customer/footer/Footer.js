import { Col, Divider, Row } from "antd";
import styles from "./Footer.module.css";
import LogoFooter from "./logo-footer/LogoFooter";
import QuickLinks from "./quick-link/QuickLinks";
import FooterFollowUs from "./follow-us/FooterFollowUs";

function Footer() {
  return (
    <div className={styles.footerBackground}>
      <div className={styles.content}>
        <div className={styles.footer}>
          <div className={styles.flexCenter}>
            <Row className={styles.rowMargin}>
              <Col xl={8} xs={24}>
                <LogoFooter />
              </Col>
              <Col xl={8} xs={24}>
                <QuickLinks />
              </Col>
              <Col xl={8} xs={24}>
                <FooterFollowUs />
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Divider
        style={{
          backgroundColor: "#ffffffa8",
          margin: 0,
        }}
      />
      <div className={styles.copyRight}>
        <div className={styles.flexCenter}>
          <p>Copyright © 2023 | OUT OF COLLEGE</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
