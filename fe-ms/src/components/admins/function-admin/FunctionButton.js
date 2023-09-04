import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import styles from "./FunctionButton.module.css";

function FunctionButton({
  iconLeft,
  textFunction,
  isOpen,
  iconRight,
  isLoadingIcon,
  setIsLoadingIcon,
}) {
  return (
    <div className={styles.hover}>
      <a
        href="#"
        className={`${styles.link} ${isOpen ? "open" : ""}`}
        onMouseEnter={() => setIsLoadingIcon(true)}
        onMouseLeave={() => setIsLoadingIcon(false)}
      >
        <p className={styles.lineHeight}>
          <FontAwesomeIcon icon={iconLeft} className={styles.icon} />
          {textFunction}
          {iconRight ? (
            isLoadingIcon ? (
              <FontAwesomeIcon
                icon={faChevronUp}
                className={`${styles.icon} ${styles.iconRight}`}
              />
            ) : (
              <FontAwesomeIcon
                icon={iconRight}
                className={`${styles.icon} ${styles.iconRight}`}
              />
            )
          ) : null}
        </p>
      </a>
    </div>
  );
}

export default FunctionButton;
