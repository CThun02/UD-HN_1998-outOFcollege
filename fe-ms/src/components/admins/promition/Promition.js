import styles from "./Promition.module.css";

function Promition() {
  return (
    <div className={styles.promition}>
      <div className={styles.main}>
        <div className={styles.header}></div>
        <div className={styles.content}></div>
        <div className={styles.footer}></div>
      </div>
    </div>
  );
}

export default Promition;
