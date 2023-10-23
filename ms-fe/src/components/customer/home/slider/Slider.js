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
          <h2 className={`${styles.textH2} ${styles.upperCase}`}>
            COMING SOON
          </h2>
          <h1 className={`${styles.textH1} ${styles.upperCase}`}>
            Men fashion
          </h1>
          <p className={`${styles.textSpan} ${styles.upperCase}`}>
            Sale up to {reduce ? reduce : sale} oFf for online order
          </p>
          <Link>
            <Button
              size="large"
              type="primary"
              className={`${styles.button} ${styles.spacing}`}
            >
              Shop now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Slider;
