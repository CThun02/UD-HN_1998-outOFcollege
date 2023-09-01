import FunctionButton from "../function-admin/FunctionButton";
import {
  faBasketShopping,
  faChartPie,
  faCoins,
  faShirt,
  faStore,
  faTicket,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/image/logo/logo-men's-shopping.jpg" alt="Men's Shirt Shop" />
      </div>

      <div className={styles.styleSidebar}>
        <FunctionButton icon={faChartPie} textFunction={"Thống kê"} />
        <FunctionButton
          icon={faBasketShopping}
          textFunction={"Quản lý đơn hàng"}
        />
        <FunctionButton icon={faStore} textFunction={"Bán hàng tại quầy"} />
        <FunctionButton icon={faCoins} textFunction={"Quản lý thu chi"} />
        <FunctionButton icon={faUserGear} textFunction={"Quản lý tài khoản"} />
        <FunctionButton icon={faShirt} textFunction={"Quản lý sản phẩm"} />
        <FunctionButton icon={faTicket} textFunction={"Khuyến mại"} />
      </div>
    </div>
  );
}

export default Sidebar;
