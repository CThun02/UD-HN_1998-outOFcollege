import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button, Col, Result, Row } from "antd";
import SideBar from "./components/admin/page/SideBar";
import NavBar from "./components/admin/page/NavBar";
import Footer from "./components/admin/page/Footer";
import ProductIndex from "./components/admin/product/ProductIndex";
import Promotion from "./components/admin/promotion/Promotion";
import CreatePromotion from "./components/admin/promotion/CreatePromotion";
import Voucher from "./components/admin/voucher/Voucher";
import Bill from "./components/admin/sale-couter/Bill";
import CreateBill from "./components/admin/sale-couter/CreateBill";
import ProductDetailsByProductId from "./components/admin/product/ProductDetailsByProductId";
import ProductCreateDetails from "./components/admin/product/ProductCreateDetails";
import BillTimeLine from "./components/admin/sale-couter/TimeLine";
import SaveVoucher from "./components/admin/voucher/SaveVoucher";
import { useState } from "react";
import { NotificationProvider } from "./components/element/notification/Notification";
import AccountForm from "./components/admin/account/AccountForm";
import CustomerAdmin from "./components/admin/account/CustomorAdmin";
import DetailForm from "./components/admin/account/DetailForm";
import ProductDetails from "./components/admin/product/ProductDetails";
import ProductUpdateDetails from "./components/admin/product/ProductUpdateDetails";
function App() {
  const [message, setMessage] = useState("");

  return (
    <>
      <NotificationProvider>
        <BrowserRouter>
          <Row>
            <Col span={4}>
              <SideBar />
            </Col>
            <Col span={20} className="h-100vh">
              <div>
                <NavBar />
              </div>
              <div className="content">
                <Routes>
                  <Route path="admin">
                    {/* Thống kê */}
                    {/* hiển thị mặc định khi vào admin là trang thống kê */}
                    <Route index element="statistical" />
                    <Route path="statistical" element="statistical"></Route>

                    {/* Tại quầy */}
                    <Route path="counter-sales">
                      <Route index element={<Bill />}></Route>
                      <Route path="bill" element={<CreateBill />}></Route>
                      <Route
                        path=":billId/timeline"
                        element={<BillTimeLine />}
                      ></Route>
                    </Route>

                    {/* Đơn hàng */}
                    <Route path="order" element="order"></Route>

                    {/* Thu chi */}

                    {/* ví dụ path= san-pham/hien-thi ->  
                      path="income-and-expenses"
                      element="income-and-expenses"
                    ></Route>
                    {/* Sản phẩm */}
                    <Route path="product">
                      <Route index element={<ProductIndex />} />
                      <Route
                        path={"details/:productId"}
                        element={<ProductDetailsByProductId />}
                      />
                      <Route
                        path={"create-details"}
                        element={<ProductCreateDetails />}
                      />
                      <Route
                        path={"update-details/:productId"}
                        element={<ProductUpdateDetails />}
                      />
                      {/* ví dụ path= san-pham/hien-thi ->  
                    <Route path="hien-thi" element="el" />
                    */}
                    </Route>
                    <Route path="category" element="category"></Route>
                    <Route path="brand" element="brand"></Route>

                    {/* Voucher */}
                    <Route path="vouchers">
                      <Route index element={<Voucher message={message} />} />
                      <Route
                        path="save"
                        element={<SaveVoucher setMessage={setMessage} />}
                      />
                      <Route
                        path="detail/:code"
                        element={<SaveVoucher setMessage={setMessage} />}
                      />
                    </Route>

                    {/* Promotion */}
                    <Route path="promotion">
                      <Route index element={<Promotion />} />
                      <Route path="create" element={<CreatePromotion />} />
                    </Route>
                    <Route path="category" element="category"></Route>
                    <Route path="brand" element="brand"></Route>

                    {/* Tài khoản */}
                    <Route
                      path="employee"
                      element={<CustomerAdmin roleId={1} />}
                    ></Route>
                    <Route
                      path="employee/create"
                      element={<AccountForm roleId={1} />}
                    ></Route>
                    <Route
                      path="employee/detail/:username"
                      element={<DetailForm roleId={1} />}
                    ></Route>
                    <Route
                      path="customer"
                      element={<CustomerAdmin roleId={2} />}
                    ></Route>
                    <Route
                      path="customer/create"
                      element={<AccountForm roleId={2} />}
                    ></Route>
                    <Route
                      path="customer/detail/:username"
                      element={<DetailForm roleId={2} />}
                    ></Route>
                  </Route>

                  {/* Not found */}
                  <Route
                    path="*"
                    element={
                      <Result
                        status={"404"}
                        title={"404"}
                        subTitle={"Xin lỗi, trang bạn truy cập không tồn tại."}
                        extra={
                          <Link to={"/admin"}>
                            <Button type="primary">Back Home</Button>
                          </Link>
                        }
                      />
                    }
                  />
                </Routes>
                <div>
                  <Footer />
                </div>
              </div>
            </Col>
          </Row>
        </BrowserRouter>
      </NotificationProvider>
    </>
  );
}

export default App;
