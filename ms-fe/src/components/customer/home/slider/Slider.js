import { Button } from "antd";
import styles from "./Slider.module.css";
import { Link } from "react-router-dom";

const imageSlider = "/slider/pictures-slider-1.png";
const sale = "20%";

function Slider({ reduce }) {
  return (
    <div className={styles.padding}>
      <div className={styles.relative}>
        <div>
          <div className={styles.imageSize}>
            <img src={imageSlider} alt="slider" />
          </div>
        </div>

        <div className={styles.absolute}>
          <h2 className={`${styles.textH2} ${styles.upperCase}`}>Sắp tới</h2>
          <h1 className={`${styles.textH1} ${styles.upperCase}`}>
            Đồ thời trang nam
          </h1>
          <p className={`${styles.textSpan} ${styles.upperCase}`}>
            Giảm tới {reduce ? reduce : sale} cho đặt hàng trực tuyến
          </p>
          <Link to="/ms-shop/shopping">
            <Button
              size="large"
              type="primary"
              className={`${styles.button} ${styles.spacing}`}
            >
              MUA NGAY
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Slider;
