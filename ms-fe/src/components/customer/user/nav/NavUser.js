import ContentProfile from "./ContentProfile";
import NavProfile from "./NavProfile";
import styles from "./NavUser.module.css";
import { useState } from "react";

function NavUser({ user, setIsRender }) {
  const [tab, setTab] = useState("userInfo");
  return (
    <div className={styles.navUser}>
      <NavProfile tab={tab} setTab={setTab} />
      <ContentProfile tab={tab} user={user} setIsRender={setIsRender} />
    </div>
  );
}

export default NavUser;
