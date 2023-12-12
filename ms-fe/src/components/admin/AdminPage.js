import AccountForm from "./account/AccountForm";
import CustomerAdmin from "./account/CustomorAdmin";
import DetailForm from "./account/DetailForm";
import MaterialAdmin from "./material/MaterialAdmin";
import CollorAdmin from "./collor/ColorAdmin";
import SleeveAdmin from "./sleeve/SleeveAdmin";
import SizeAdmin from "./size/SizeAdmin";
import ButtonAdmin from "./buttontype/ButtonAdmin";
import ShirtailAdmin from "./shirtailtype/ShirtTypeAdmin";
import PatternAdmin from "./pattern/PatternAdmin";
import CategoryAdmin from "./category/CategoryAdmin";
import BrandAdmin from "./brand/BrandAdmin";
import FormAdmin from "./form/FormAdmin";
import CollarAdmin from "./collar/CollarAdmin";
import BillManagement from "./sale-couter/BillManagement";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Button, Col, Result, Row } from "antd";
import SideBar from "./page/SideBar";
import NavBar from "./page/NavBar";
import Footer from "./page/Footer";
import ProductIndex from "./product/ProductIndex";
import Promotion from "./promotion/Promotion";
import CreatePromotion from "./promotion/CreatePromotion";
import Voucher from "./voucher/Voucher";
import Bill from "./sale-couter/Bill";
import ProductDetailsByProductId from "./product/ProductDetailsByProductId";
import ProductCreateDetails from "./product/ProductCreateDetails";
import BillTimeLine from "./sale-couter/TimeLine";
import SaveVoucher from "./voucher/SaveVoucher";
import StatisticalIndex from "./statistical/StatisticalIndex";
import { useEffect, useState } from "react";
import { NotificationProvider } from "../element/notification/Notification";
import ReturnIndex from "./return/ReturnIndex";
import { getToken } from "../../service/Token";
import BillReturn from "./return/BillReturn";

function AdminPage() {
  const [message, setMessage] = useState("");
  const token = getToken(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/authen/admin/sign-in");
    }
  }, [navigate, token]);

  return (
    <>
      <NotificationProvider>
        {token && (
          <Row style={{ margin: 0 }}>
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
                    <Route
                      path="statistical"
                      element={<StatisticalIndex />}
                    ></Route>
                    {/* Trả hàng */}
                    <Route path="return">
                      <Route index element={<ReturnIndex />}></Route>
                      <Route
                        path="return-bill/:billCode"
                        element={<BillReturn />}
                      ></Route>
                    </Route>
                    {/* ví dụ path= san-pham/hien-thi ->  
                  {/* Tại quầy */}
                    <Route path="counter-sales">
                      <Route index element={<Bill />}></Route>
                      <Route
                        path=":billId/timeline"
                        element={<BillTimeLine />}
                      ></Route>
                    </Route>
                    {/* Đơn hàng */}
                    <Route path="order" element={<BillManagement />}></Route>
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
                      {/* ví dụ path= san-pham/hien-thi ->  
                    <Route path="hien-thi" element="el" />
                    */}
                    </Route>
                    <Route path="button" element={<ButtonAdmin />}></Route>
                    <Route path="material" element={<MaterialAdmin />} />
                    {/*sanpham chi tiet */}
                    <Route path="pattern" element={<PatternAdmin />}></Route>
                    <Route
                      path="category"
                      element={<CategoryAdmin></CategoryAdmin>}
                    ></Route>
                    <Route
                      path="brand"
                      element={<BrandAdmin></BrandAdmin>}
                    ></Route>
                    <Route
                      path="form"
                      element={<FormAdmin></FormAdmin>}
                    ></Route>
                    <Route
                      path="collar"
                      element={<CollarAdmin></CollarAdmin>}
                    ></Route>
                    <Route path="shirtTail" element={<ShirtailAdmin />}></Route>
                    <Route path="sleeve" element={<SleeveAdmin />}></Route>
                    <Route path="color" element={<CollorAdmin />}></Route>
                    <Route path="size" element={<SizeAdmin />}></Route>
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
                      <Route
                        path="detail/:code"
                        element={<CreatePromotion />}
                      />
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
        )}
      </NotificationProvider>
    </>
  );
}

export default AdminPage;
