import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./FunctionButton.module.css";

function FunctionButton({ icon, textFunction }) {
  return (
    <div className={styles.hover}>
      <a href="#" className={styles.link}>
        <p className={styles.lineHeight}>
          <FontAwesomeIcon icon={icon} className={styles.icon} />
          {textFunction}
        </p>
      </a>
    </div>
  );
}

export default FunctionButton;
