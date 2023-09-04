import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ButtonCRUD.module.css";

function ButtonCRUD({ icon, className }) {
  return (
    <button className={`ms-1 me-1 ${className} ${styles.ButtonCRUD}`}>
      <FontAwesomeIcon icon={icon}></FontAwesomeIcon>
    </button>
  );
}

export default ButtonCRUD;
