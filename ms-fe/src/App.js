import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button, Col, Result, Row } from "antd";
import SideBar from "./components/admin/page/SideBar";
import NavBar from "./components/admin/page/NavBar";
import Promotion from "./components/admin/promotion/Promotion";
import Voucher from "./components/admin/voucher/Voucher";
import CreateVoucher from "./components/admin/voucher/CreateVoucher";
import Bill from "./components/admin/sale-couter/Bill"
import CreateBill from "./components/admin/sale-couter/CreateBill";

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
                <Route path="admin">
                  {/* Thống kê */}
                  {/* hiển thị mặc định khi vào admin là trang thống kê */}
                  <Route index element="statistical" />
                  <Route path="statistical" element="statistical"></Route>

                  {/* Tại quầy */}
                  <Route path="counter-sales">
                    <Route index element={<Bill />} ></Route>
                    <Route path="bill" element={<CreateBill />} ></Route>
                  </Route>

                  {/* Đơn hàng */}
                  <Route path="order" element="order"></Route>

                  {/* Thu chi */}
                  <Route
                    path="income-and-expenses"
                    element="income-and-expenses"
                  ></Route>

                  {/* Sản phẩm */}
                  <Route path="product">
                    <Route index element={"product"} />
                    {/* ví dụ path= san-pham/hien-thi ->  
                    <Route path="hien-thi" element="el" />
                    */}
                  </Route>
                  <Route path="category" element="category"></Route>
                  <Route path="brand" element={<SideBar />}></Route>

                  {/* Tài khoản */}
                  <Route path="employee" element="employee"></Route>
                  <Route path="customer" element="customer"></Route>

                  {/* Voucher */}
                  <Route path="voucher">
                    <Route index element={<Voucher />} />
                    <Route path="create" element={<CreateVoucher />} />

                    <Route path="detail" element={"Chi tiet"} />
                    <Route path="update" element={"Chi tiet"} />
                  </Route>

                  {/* Promotion */}
                  <Route path="promotion" element={<Promotion />}></Route>
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
            </div>
          </Col>
        </Row>
      </BrowserRouter>
    </>
  );
}

export default App;
