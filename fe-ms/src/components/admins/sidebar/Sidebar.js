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
    <div className={`col-12 ${styles.sidebar}`}>
      <div className={styles.logo}>
        <img src="/image/logo/logo-men's-shopping.jpg" alt="Men's Shirt Shop" />
      </div>

      <div className={`row ${styles.styleSidebar}`}>
        <FunctionButton
          icon={faChartPie}
          textFunction={"Thống kê"}
          isOpen={false}
        />
        <FunctionButton
          icon={faBasketShopping}
          textFunction={"Quản lý đơn hàng"}
          isOpen={true}
        />
        <FunctionButton
          icon={faStore}
          textFunction={"Bán hàng tại quầy"}
          isOpen={false}
        />
        <FunctionButton
          icon={faCoins}
          textFunction={"Quản lý thu chi"}
          isOpen={false}
        />
        <FunctionButton
          icon={faUserGear}
          textFunction={"Quản lý tài khoản"}
          isOpen={false}
        />
        <FunctionButton
          icon={faShirt}
          textFunction={"Quản lý sản phẩm"}
          isOpen={false}
        />
        <FunctionButton
          icon={faTicket}
          textFunction={"Khuyến mại"}
          isOpen={false}
        />
      </div>
    </div>
  );
}

export default Sidebar;
