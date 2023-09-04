import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

import styles from "./FunctionButton.module.css";
import { Link } from "react-router-dom";

function FunctionButton({
  url,
  iconLeft,
  textFunction,
  isOpen,
  iconRight,
  isLoadingIcon,
  setIsLoadingIcon,
}) {
  return (
    <div className={styles.hover}>
      <Link
        to={url}
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
      </Link>
    </div>
  );
}

export default FunctionButton;
