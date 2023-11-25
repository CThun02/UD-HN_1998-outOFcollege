import React from "react";
import styles from "./SideBar.module.css";
import logoOOC from "../../../Assets/img/logo/logo_OOC.svg";
import { Menu } from "antd";
import {
  AuditOutlined,
  BookOutlined,
  CarOutlined,
  DingtalkOutlined,
  DownOutlined,
  FontSizeOutlined,
  FullscreenOutlined,
  HighlightOutlined,
  LineChartOutlined,
  LoginOutlined,
  OrderedListOutlined,
  PauseOutlined,
  PicCenterOutlined,
  PieChartOutlined,
  PlayCircleOutlined,
  SafetyCertificateOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SlidersOutlined,
  StrikethroughOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../service/Token";

const SideBar = () => {
  const token = getToken(true);
  const navigate = useNavigate();
  const href = "/api/admin/";
  if (!token) {
    navigate("/authen/admin/sign-in");
  }
  const handelClick = (key) => {
    switch (key) {
      case "thongKe":
        navigate(href + "statistical");
        break;
      case "taiQuay":
        navigate(href + "counter-sales");
        break;
      case "donHang":
        navigate(href + "order");
        break;
      case "traHang":
        navigate(href + "return");
        break;
      case "sanPhamChiTiet":
        navigate(href + "product");
        break;
      case "loaiSanPham":
        navigate(href + "category");
        break;
      case "thuongHieu":
        navigate(href + "brand");
        break;
      case "hoaTiet":
        navigate(href + "pattern");
        break;
      case "dangAo":
        navigate(href + "form");
        break;
      case "nutAo":
        navigate(href + "button");
        break;
      case "coAo":
        navigate(href + "collar");
        break;
      case "tayAo":
        navigate(href + "sleeve");
        break;
      case "duoiAo":
        navigate(href + "shirtTail");
        break;
      case "chatLieu":
        navigate(href + "material");
        break;
      case "kichCo":
        navigate(href + "size");
        break;
      case "mauSac":
        navigate(href + "color");
        break;
      case "nhanVien":
        navigate(href + "employee");
        break;
      case "khachHang":
        navigate(href + "customer");
        break;
      case "phieuGiamGia":
        navigate(href + "vouchers");
        break;
      case "giamGiaSanPham":
        navigate(href + "promotion");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className={`h-100vh ${styles.sideBar}`}>
        <div className={styles.sideBar__Logo}>
          <img src={logoOOC} className={styles.sideBar__LogoImg} alt="" />
        </div>
        <div>
          <Menu
            mode="inline"
            className={styles.sideBar__menu}
            onClick={(event) => {
              handelClick(event.key);
            }}
            items={[
              {
                label: "Thống kê",
                icon: <PieChartOutlined />,
                key: "thongKe",
              },
              {
                label: "Bán hàng tại quầy",
                icon: <ShopOutlined />,
                key: "taiQuay",
              },
              {
                label: "Quản lý đơn hàng",
                icon: <ShoppingCartOutlined />,
                key: "donHang",
              },
              {
                label: "Trả hàng",
                icon: <CarOutlined />,
                key: "traHang",
              },
              {
                label: "Quản lý sản phẩm",
                icon: <OrderedListOutlined />,
                key: "sanPham",
                children: [
                  {
                    label: "Sản phẩm",
                    icon: <PicCenterOutlined />,
                    key: "sanPhamChiTiet",
                  },
                  {
                    label: "Loại sản phẩm",
                    icon: <SafetyCertificateOutlined />,
                    key: "loaiSanPham",
                  },
                  {
                    label: "Thương hiệu",
                    icon: <FontSizeOutlined />,
                    key: "thuongHieu",
                  },
                  {
                    label: "Hoạ tiết",
                    icon: <SlidersOutlined />,
                    key: "hoaTiet",
                  },
                  {
                    label: "Dáng áo",
                    icon: <StrikethroughOutlined />,
                    key: "dangAo",
                  },
                  {
                    label: "Nút áo",
                    icon: <PlayCircleOutlined />,
                    key: "nutAo",
                  },
                  {
                    label: "Cổ áo",
                    icon: <PauseOutlined />,
                    key: "coAo",
                  },
                  {
                    label: "Tay áo",
                    icon: <DingtalkOutlined />,
                    key: "tayAo",
                  },
                  {
                    label: "Đuôi áo",
                    icon: <DownOutlined />,
                    key: "duoiAo",
                  },
                  {
                    label: "Chất liệu",
                    icon: <LoginOutlined />,
                    key: "chatLieu",
                  },
                  {
                    label: "Kích cỡ",
                    icon: <FullscreenOutlined />,
                    key: "kichCo",
                  },
                  {
                    label: "Màu sắc",
                    icon: <HighlightOutlined />,
                    key: "mauSac",
                  },
                ],
              },
              {
                label: "Quản lý tài khoản",
                icon: <UsergroupAddOutlined />,
                key: "taiKhoan",
                children: [
                  {
                    label: "Nhân viên",
                    icon: <UserSwitchOutlined />,
                    key: "nhanVien",
                  },
                  {
                    label: "Khách hàng",
                    icon: <UserAddOutlined />,
                    key: "khachHang",
                  },
                ],
              },
              {
                label: "Giảm giá",
                icon: <AuditOutlined />,
                key: "giamGia",
                children: [
                  {
                    label: "Phiếu giảm giá",
                    icon: <BookOutlined />,
                    key: "phieuGiamGia",
                  },
                  {
                    label: "Giảm giá sản phẩm",
                    icon: <LineChartOutlined />,
                    key: "giamGiaSanPham",
                  },
                ],
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};

export default SideBar;
