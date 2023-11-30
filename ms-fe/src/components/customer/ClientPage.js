import { Button, Col, Result, Row } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import HomeClient from "./home/index/HomeClient";
import About from "./about/About";
import Contact from "./contact/Contact";
import Checkout from "./checkout/Checkout";
import Shop from "./shop/Shop";
import DetailProduct from "./detail-product/DetailProduct";
import Cart from "./cart/Cart";
import { useEffect, useState } from "react";
import UserDetail from "./user/UserDetail";
import TimelineByBillCode from "../element/timeline/TimelineByBillCode";

function ClientPage() {
  const [render, setRender] = useState(0);
  useEffect(() => { }, [render])
  return (
    <Row>
      <Col span={24} className="h-100vh">
        <div>
          <Header render={render} setRenderHeader={setRender} />
        </div>
        <div>
          <Routes>
            <Route index element={<HomeClient />} />
            <Route path="home" element={<HomeClient />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="checkout" element={<Checkout setRenderHeader={setRender} />} />
            <Route path="cart" element={<Cart setRenderHeader={setRender} />} />
            <Route path="anything" element={<Shop />} />
            <Route path="user/:username" element={<UserDetail />} />
            <Route path="bill/:billCode" element={<TimelineByBillCode />} />
            <Route path="shopping">
              <Route index element={<Shop />} />
              {/* <Route path=":typeCategory">
                <Route index element={<Shop />} />
                <Route path="detail/:id" element={<DetailProduct />} />
              </Route> */}
              <Route path="detail/:id" element={<DetailProduct setRenderHeader={setRender} />} />
            </Route>
            <Route
              path="*"
              element={
                <Result
                  status={"404"}
                  title={"404"}
                  subTitle={"Xin lỗi, trang bạn truy cập không tồn tại."}
                  extra={
                    <Link to={"/ms-shop/home"}>
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
  );
}

export default ClientPage;
