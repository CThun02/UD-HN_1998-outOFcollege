import FunctionButton from "../function-admin/FunctionButton";
import {
  faBasketShopping,
  faChartPie,
  faChevronDown,
  faCoins,
  faShirt,
  faStore,
  faTicket,
  faUserGear,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Sidebar.module.css";
import { useState } from "react";

function Sidebar() {
  const [isLoadingIcon, setIsLoadingIcon] = useState(false);

  return (
    <div className={`col-12 ${styles.sidebar}`}>
      <div className={styles.logo}>
        <img src="/image/logo/logo-men's-shopping.jpg" alt="Men's Shirt Shop" />
      </div>

      <div className={`row ${styles.styleSidebar}`}>
        <FunctionButton
          isLoadingIcon={isLoadingIcon}
          setIsLoadingIcon={setIsLoadingIcon}
          iconLeft={faChartPie}
          textFunction={"Thống kê"}
          isOpen={false}
        />
        <FunctionButton
          isLoadingIcon={isLoadingIcon}
          setIsLoadingIcon={setIsLoadingIcon}
          iconLeft={faBasketShopping}
          textFunction={"Quản lý đơn hàng"}
          isOpen={true}
        />
        <FunctionButton
          isLoadingIcon={isLoadingIcon}
          setIsLoadingIcon={setIsLoadingIcon}
          iconLeft={faStore}
          textFunction={"Bán hàng tại quầy"}
          isOpen={false}
        />
        <FunctionButton
          isLoadingIcon={isLoadingIcon}
          setIsLoadingIcon={setIsLoadingIcon}
          iconLeft={faCoins}
          textFunction={"Quản lý thu chi"}
          isOpen={false}
          iconRight={faChevronDown}
        />
        <FunctionButton
          isLoadingIcon={isLoadingIcon}
          setIsLoadingIcon={setIsLoadingIcon}
          iconLeft={faUserGear}
          textFunction={"Quản lý tài khoản"}
          isOpen={false}
          iconRight={faChevronDown}
        />
        <FunctionButton
          isLoadingIcon={isLoadingIcon}
          setIsLoadingIcon={setIsLoadingIcon}
          iconLeft={faShirt}
          textFunction={"Quản lý sản phẩm"}
          isOpen={false}
          iconRight={faChevronDown}
        />
        <FunctionButton
          isLoadingIcon={isLoadingIcon}
          setIsLoadingIcon={setIsLoadingIcon}
          iconLeft={faTicket}
          textFunction={"Khuyến mại"}
          isOpen={false}
          iconRight={faChevronDown}
        />
      </div>
    </div>
  );
}

export default Sidebar;
