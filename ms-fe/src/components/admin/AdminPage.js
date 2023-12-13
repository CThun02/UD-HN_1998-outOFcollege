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
import { getAuthToken, getToken } from "../../service/Token";
import BillReturn from "./return/BillReturn";

function AdminPage() {
  const [message, setMessage] = useState("");
  const token = getToken(true);
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const authToken = getAuthToken(true);
  const isAdmin = data?.join().includes("ROLE_ADMIN");
  useEffect(() => {
    if (!token) {
      navigate("/authen/admin/sign-in");
    }
    if (!data) {
      authToken
        .then((res) => {
          setData(res?.roles);
        })
        .catch((err) => { });
    }
    console.log(isAdmin);
  }, [navigate, token, isAdmin, data, authToken]);
  return (
    <NotificationProvider>
      {token && (
        <Row style={{ margin: 0 }}>
          <Col span={4}>
            <SideBar isAdmin={isAdmin} />
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
                    element={<StatisticalIndex isAdmin={isAdmin} />}
                  ></Route>

                  {/* Trả hàng */}
                  <Route path="return">
                    <Route
                      index
                      element={<ReturnIndex isAdmin={isAdmin} />}
                    ></Route>
                    <Route
                      path="return-bill/:billCode"
                      element={<BillReturn isAdmin={isAdmin} />}
                    ></Route>
                  </Route>
                  {/* ví dụ path= san-pham/hien-thi ->  
                  {/* Tại quầy */}
                  <Route path="counter-sales">
                    <Route index element={<Bill isAdmin={isAdmin} />}></Route>
                    <Route
                      path=":billId/timeline"
                      element={<BillTimeLine isAdmin={isAdmin} />}
                    ></Route>
                  </Route>
                  {/* Đơn hàng */}
                  <Route
                    path="order"
                    element={<BillManagement isAdmin={isAdmin} />}
                  ></Route>
                  {/* sản phẩm */}
                  <Route path="product">
                    <Route index element={<ProductIndex isAdmin={isAdmin} />} />
                    <Route
                      path={"details/:productId"}
                      element={<ProductDetailsByProductId isAdmin={isAdmin} />}
                    />
                    <Route
                      path={"create-details"}
                      element={<ProductCreateDetails isAdmin={isAdmin} />}
                    />
                  </Route>
                  <Route
                    path="button"
                    element={<ButtonAdmin isAdmin={isAdmin} />}
                  ></Route>
                  <Route
                    path="material"
                    element={<MaterialAdmin isAdmin={isAdmin} />}
                  />
                  <Route
                    path="pattern"
                    element={<PatternAdmin isAdmin={isAdmin} />}
                  ></Route>
                  <Route
                    path="category"
                    element={<CategoryAdmin isAdmin={isAdmin}></CategoryAdmin>}
                  ></Route>
                  <Route
                    path="brand"
                    element={<BrandAdmin isAdmin={isAdmin}></BrandAdmin>}
                  ></Route>
                  <Route
                    path="form"
                    element={<FormAdmin isAdmin={isAdmin}></FormAdmin>}
                  ></Route>
                  <Route
                    path="collar"
                    element={<CollarAdmin isAdmin={isAdmin}></CollarAdmin>}
                  ></Route>
                  <Route
                    path="shirtTail"
                    element={<ShirtailAdmin isAdmin={isAdmin} />}
                  ></Route>
                  <Route
                    path="sleeve"
                    element={<SleeveAdmin isAdmin={isAdmin} />}
                  ></Route>
                  <Route
                    path="color"
                    element={<CollorAdmin isAdmin={isAdmin} />}
                  ></Route>
                  <Route
                    path="size"
                    element={<SizeAdmin isAdmin={isAdmin} />}
                  ></Route>
                  {/* Voucher */}
                  <Route path="vouchers">
                    <Route
                      index
                      element={<Voucher isAdmin={isAdmin} message={message} />}
                    />
                    <Route
                      path="save"
                      element={
                        <SaveVoucher
                          isAdmin={isAdmin}
                          setMessage={setMessage}
                        />
                      }
                    />
                    <Route
                      path="detail/:code"
                      element={
                        <SaveVoucher
                          isAdmin={isAdmin}
                          setMessage={setMessage}
                        />
                      }
                    />
                  </Route>
                  {/* Promotion */}
                  <Route path="promotion">
                    <Route index element={<Promotion isAdmin={isAdmin} />} />
                    <Route
                      path="create"
                      element={<CreatePromotion isAdmin={isAdmin} />}
                    />
                    <Route
                      path="detail/:code"
                      element={<CreatePromotion isAdmin={isAdmin} />}
                    />
                  </Route>
                  {/* Tài khoản */}
                  <Route
                    path="employee"
                    element={<CustomerAdmin isAdmin={isAdmin} roleId={1} />}
                  ></Route>
                  <Route
                    path="employee/create"
                    element={<AccountForm isAdmin={isAdmin} roleId={1} />}
                  ></Route>
                  <Route
                    path="employee/detail/:username"
                    element={<DetailForm isAdmin={isAdmin} roleId={1} />}
                  ></Route>
                  <Route
                    path="customer"
                    element={<CustomerAdmin isAdmin={isAdmin} roleId={2} />}
                  ></Route>
                  <Route
                    path="customer/create"
                    element={<AccountForm isAdmin={isAdmin} roleId={2} />}
                  ></Route>
                  <Route
                    path="customer/detail/:username"
                    element={<DetailForm isAdmin={isAdmin} roleId={2} />}
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
  );
}

export default AdminPage;