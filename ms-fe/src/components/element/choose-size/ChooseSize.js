import { Row } from "antd";
import styles from "./ChooseSize.module.css";
import Size from "./Size";

function ChooseSize({ sizes, chooseSize, setChooseSize }) {
  return (
    <>
      <div className={styles.sizeList}>
        <Row className={styles.rowCss}>
          {sizes?.map((size) => (
            <Size
              key={size.id}
              size={size}
              chooseSize={chooseSize}
              setChooseSize={setChooseSize}
            />
          ))}
        </Row>
      </div>
    </>
  );
}

export default ChooseSize;
