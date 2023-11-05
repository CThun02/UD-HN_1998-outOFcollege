import { Col } from "antd";
import styles from "./Color.module.css";

function Color({ color, chooseColor, setChooseColor }) {
  function handleChooseColor(colorValue) {
    setChooseColor(colorValue);
  }
  return (
    <Col className={styles.spacing}>
      <div
        className={`${styles.chooseColorActive}`}
        style={{
          border:
            chooseColor.id === color.id ? "2px solid " + color?.colorCode : "",
        }}
        onClick={() => handleChooseColor(color)}
      >
        <div
          className={`${styles.chooseColor} `}
          style={{ backgroundColor: color.colorCode }}
        ></div>
      </div>
    </Col>
  );
}

export default Color;
