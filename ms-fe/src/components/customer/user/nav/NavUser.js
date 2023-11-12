import ContentProfile from "./ContentProfile";
import NavProfile from "./NavProfile";
import styles from "./NavUser.module.css";
import { useState } from "react";

function NavUser() {
  const [tab, setTab] = useState("userInfo");
  return (
    <div className={styles.navUser}>
      <NavProfile tab={tab} setTab={setTab} />
      <ContentProfile tab={tab} />
    </div>
  );
}

export default NavUser;
