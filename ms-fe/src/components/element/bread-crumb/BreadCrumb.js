import { Link } from "react-router-dom";
import styles from "./BreadCrumb.module.css";
import { Breadcrumb } from "antd";

function BreadCrumb({ title, items }) {
  return (
    <div className={styles.content}>
      <div className={styles.body}>
        <div className={styles.title}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        <div className={styles.creadCrumb}>
          <Breadcrumb items={items} />
        </div>
      </div>
    </div>
  );
}

export default BreadCrumb;
