import {} from "@fortawesome/free-solid-svg-icons";
import { faCircleUser, faBell } from "@fortawesome/free-regular-svg-icons";

import styles from "./Nav.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className={styles.nav}>
      <div className={`row `}>
        <div className={`col-6 `}>
          <div className={styles.navLeft}>
            <input type="text" placeholder="Search...." />
          </div>
        </div>

        <div className={`col-6 `}>
          <div className={styles.navRight}>
            <Link to="/">
              <FontAwesomeIcon
                icon={faBell}
                className={styles.iconNotification}
              />
            </Link>
            <Link to="/">
              <FontAwesomeIcon
                icon={faCircleUser}
                className={styles.iconUser}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
