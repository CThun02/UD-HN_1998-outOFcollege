import { Col, Row } from "antd";
import { useParams } from "react-router";
import styles from "./DetailProduct.module.css";
import BreadCrumb from "../../element/bread-crumb/BreadCrumb";
import { Link } from "react-router-dom";

const items = [
  {
    title: <Link to="/ms-shop/home">Home</Link>,
  },
  {
    title: <Link to="/ms-shop/shopping">Shop</Link>,
  },
  {
    title: "Detail",
  },
];

function DetailProduct() {
  const { id } = useParams();
  return (
    <div className={styles.background}>
      <div className={styles.detailProduct}>
        <div className={styles.content}>
          <div className={styles.title}>
            <BreadCrumb title={"Shop"} items={items} />
          </div>
          <div className={styles.body}>
            <Row className={styles.row}>
              <Col span={13}>hihi</Col>
              <Col span={11}>hihi</Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
