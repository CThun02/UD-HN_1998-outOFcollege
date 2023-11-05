import { Col } from "antd";
import styles from "./Size.module.css";

function Size({ size, chooseSize, setChooseSize }) {
  function handleChooseSize(value) {
    setChooseSize(value);
  }

  return (
    <Col className={styles.spacing}>
      <div
        onClick={() => handleChooseSize(size)}
        className={`${styles.size} ${
          chooseSize?.id === size.id ? styles.sizeActive : styles.colorText
        }`}
      >
        <span
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            textTransform: "uppercase",
          }}
        >
          {size.sizeName}
        </span>
      </div>
    </Col>
  );
}

export default Size;
