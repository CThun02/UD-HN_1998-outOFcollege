import { Col, Row } from "antd";
import styles from "./Quantity.module.css";

function Quantity({ quantity, setQuantity, quantityProduct }) {
  function handleSetValuePlus() {
    setQuantity((quantity) => {
      return quantity >= 100 ? quantity : Number(quantity) + 1;
    });
  }

  function handleSetValueMinus() {
    setQuantity((quantity) => {
      return quantity <= 1 ? quantity : Number(quantity) - 1;
    });
  }

  function handleOnChange(value) {
    if (value >= quantityProduct) {
      return quantityProduct;
    }

    if (value <= 1) {
      return 1;
    }

    return value;
  }

  return (
    <div className={styles.quantityInput}>
      <Row>
        <Col xl={6} xs={12} style={{ display: "flex" }}>
          <div className={styles.felxCenter}>
            <span className={styles.text}>Số lượng: </span>
          </div>
        </Col>
        <Col xl={8} xs={12}>
          <div className={styles.positon}>
            <button
              className={`${styles.buttonCss} ${styles.buttonMinus} ${
                quantity <= 1 ? "" : styles.buttonHover
              }`}
              disabled={quantity <= 1}
              onClick={() => handleSetValueMinus()}
            >
              -
            </button>
            <input
              type="number"
              className={`${styles.hiddenElement} ${styles.cssInputNumber}`}
              min={1}
              max={quantityProduct ? quantityProduct : 99}
              value={quantity}
              onChange={(e) => setQuantity(handleOnChange(e.target.value))}
            />
            <button
              className={`${styles.buttonCss} ${styles.buttonPLus} ${
                quantity >= quantityProduct ? "" : styles.buttonHover
              }`}
              disabled={quantity >= (quantityProduct ? quantityProduct : 99)}
              onClick={() => handleSetValuePlus()}
            >
              +
            </button>
          </div>
        </Col>
        <Col xl={10} xs={24} style={{ display: "flex" }}>
          <div className={styles.felxCenter}>
            <span>{quantityProduct} sản phẩm có sẵn</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Quantity;
