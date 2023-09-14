import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Col, Row } from "antd";
import SideBar from "./components/admin/page/SideBar";
import NavBar from "./components/admin/page/NavBar";
import AccountForm from "./components/admin/account/AccountForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Row>
          <Col span={4}>
            <SideBar />
          </Col>
          <Col span={20}>
            <div>
              <NavBar />
            </div>
            <div className="content">
              <Routes>
                {/* Thống kê */}
                <Route path="/admin/thong-ke" element="thongke"></Route>

                {/* Tại quầy */}
                <Route path="/admin/tai-quay" element="taiquay"></Route>

                {/* Đơn hàng */}
                <Route path="/admin/don-hang" element="donhang"></Route>

                {/* Thu chi */}
                <Route path="/admin/thu-chi" element="thuchi"></Route>

                {/* Sản phẩm */}
                <Route path="/admin/san-pham" element="sanpham"></Route>
                <Route
                  path="/admin/loai-san-pham"
                  element="loaisanpham"
                ></Route>
                <Route path="/admin/thuong-hieu" element={<SideBar />}></Route>

                {/* Tài khoản */}
                <Route path="/admin/nhan-vien" element="nhanvien"></Route>
                <Route
                  path="/admin/nhan-vien/create"
                  element={<AccountForm />}
                ></Route>
                <Route path="/admin/khach-hang" element="khachhang"></Route>

                {/* Giảm giá */}
                <Route
                  path="/admin/phieu-giam-gia"
                  element="phieugiamgia"
                ></Route>
                <Route
                  path="/admin/giam-gia-san-pham"
                  element="giamgiasanpham"
                ></Route>
              </Routes>
            </div>
          </Col>
        </Row>
      </BrowserRouter>
    </>
  );
}

export default App;
