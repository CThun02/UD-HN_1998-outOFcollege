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
                  Name Category
                </h3>
                <p className={`${styles.center} ${styles.textP}`}>
                  Ut sollicitudin quam vel purus tempus, vel eleifend felis
                  varius.
                </p>
                <Link>
                  <Button size="large" type="primary" className={styles.btn}>
                    Shop now
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
                  Name Category
                </h3>
                <p className={`${styles.center} ${styles.textP}`}>
                  Ut sollicitudin quam vel purus tempus, vel eleifend felis
                  varius.
                </p>
                <Link>
                  <Button size="large" type="primary" className={styles.btn}>
                    Shop now
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
                  Name Category
                </h3>
                <p className={`${styles.center} ${styles.textP}`}>
                  Ut sollicitudin quam vel purus tempus, vel eleifend felis
                  varius.
                </p>
                <Link>
                  <Button size="large" type="primary" className={styles.btn}>
                    Shop now
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
