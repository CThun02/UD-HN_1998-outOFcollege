import { Row } from "antd";
import styles from "./ChooseColor.module.css";
import Color from "./Color";

function ChooseColor({ colors, chooseColor, setChooseColor }) {
  return (
    <>
      <div className={styles.divColor}>
        <div className={styles.maxWidth}>
          <Row className={styles.rowCss}>
            {colors?.map((color) => (
              <Color
                key={color.id}
                color={color}
                chooseColor={chooseColor}
                setChooseColor={setChooseColor}
              />
            ))}
          </Row>
        </div>
      </div>
    </>
  );
}

export default ChooseColor;
