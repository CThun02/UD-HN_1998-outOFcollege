import React from "react";
import styles from "./SideBar.module.css";
import logoOOC from "../../../Assets/img/logo/logo_OOC.svg";
import { Menu } from "antd";
import {
  AuditOutlined,
  BookOutlined,
  EuroCircleOutlined,
  FontSizeOutlined,
  LineChartOutlined,
  OrderedListOutlined,
  PicCenterOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigate = useNavigate();
  const href = "/admin/";
  const handelClick = (key) => {
    switch (key) {
      case "thongKe":
        navigate(href + "thong-ke");
        break;
      case "taiQuay":
        navigate(href + "tai-quay");
        break;
      case "donHang":
        navigate(href + "don-hang");
        break;
      case "thuChi":
        navigate(href + "thu-chi");
        break;
      case "sanPhamChiTiet":
        navigate(href + "san-pham");
        break;
      case "loaiSanPham":
        navigate(href + "loai-san-pham");
        break;
      case "thuongHieu":
        navigate(href + "thuong-hieu");
        break;
      case "nhanVien":
        navigate(href + "nhan-vien");
        break;
      case "khachHang":
        navigate(href + "khach-hang");
        break;
      case "phieuGiamGia":
        navigate(href + "phieu-giam-gia");
        break;
      case "giamGiaSanPham":
        navigate(href + "giam-gia-san-pham");
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
                label: "Quản lý thu chi",
                icon: <EuroCircleOutlined />,
                key: "thuChi",
              },
              {
                label: "Quản lý sản phẩm",
                icon: <OrderedListOutlined />,
                key: "sanPham",
                children: [
                  {
                    label: "Sản phẩm chi tiết",
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
