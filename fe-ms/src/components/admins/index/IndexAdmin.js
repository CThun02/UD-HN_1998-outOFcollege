import Sidebar from "../sidebar/Sidebar";
import Nav from "../nav/Nav";

import styles from "./IndexAdmin.module.css";

function IndexAdmin() {
  return (
    <div className={`row ${styles.main}`}>
      <div className={`col-3 ${styles.padding}`}>
        <Sidebar />
      </div>

      <div className={`col-9 ${styles.padding}`}>
        <Nav />
      </div>
    </div>
  );
}

export default IndexAdmin;
