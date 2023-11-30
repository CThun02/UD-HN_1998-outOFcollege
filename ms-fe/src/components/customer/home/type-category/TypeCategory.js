import { Button, Card, Col, Row, Space } from "antd";
import styles from "./TypeCategory.module.css";
import { Link } from "react-router-dom";

const urlImage = "/category/category-";

function TypeCategory() {
  return (
    <div className={styles.content}>
      <div className={styles.background}>
        <div className={styles.spacing}>
          <Space size={28}>
            <div className={styles.sizeBody}>
              <div className={styles.position}>
                <img
                  src={urlImage + 1 + ".png"}
                  alt="shirt"
                  className={styles.imageSize}
                />
              </div>
              <div>
                <h3 className={`${styles.center} ${styles.textH3}`}>
                  Áo sơ mi tay dài
                </h3>
                <p className={`${styles.center} ${styles.textP}`}>
                  Thiết kế thời thượng, phong cách. Chất liệu thoáng mát phù hợp
                  với mọi tình huống.
                </p>
                <Link>
                  <Button size="large" type="primary" className={styles.btn}>
                    Mua ngay
                  </Button>
                </Link>
              </div>
            </div>

            <div className={styles.sizeBody}>
              <div className={styles.position}>
                <img
                  src={urlImage + 2 + ".png"}
                  alt="shirt"
                  className={styles.imageSize}
                />
              </div>
              <div>
                <h3 className={`${styles.center} ${styles.textH3}`}>
                  Áo sơ mi tay ngắn
                </h3>
                <p className={`${styles.center} ${styles.textP}`}>
                  Đừng lo lắng về chất lượng sản phẩm hay giá cả, ở đây đó là
                  sựa lựa chọn tốt nhất của bạn.
                </p>
                <Link>
                  <Button size="large" type="primary" className={styles.btn}>
                    Mua ngay
                  </Button>
                </Link>
              </div>
            </div>

            <div className={styles.sizeBody}>
              <div className={styles.position}>
                <img
                  src={urlImage + 3 + ".png"}
                  alt="shirt"
                  className={styles.imageSize}
                />
              </div>
              <div>
                <h3 className={`${styles.center} ${styles.textH3}`}>
                  Áo sơ mi công sở
                </h3>
                <p className={`${styles.center} ${styles.textP}`}>
                  Đơn giản thanh lịch, luôn luôn lịch sự và thoải mái mỗi khi
                  bạn mặc trên người.
                </p>
                <Link>
                  <Button size="large" type="primary" className={styles.btn}>
                    Mua ngay
                  </Button>
                </Link>
              </div>
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default TypeCategory;
