import { useState } from "react";

import styles from "./FloatingLabels.module.css";
function FloatingLabels({ children, label, value, zIndex, disabled }) {
  const [focus, setFocus] = useState(false);

  return (
    <div
      className={styles.floatLabel}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <div
        className={`${styles.label} ${
          focus || (value && value.length !== 0) ? styles.labelFloat : ""
        } ${zIndex ? styles.zIndex : ""} ${disabled ? styles.disabled : ""}`}
      >
        {label}
      </div>
    </div>
  );
}

export default FloatingLabels;
