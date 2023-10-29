import { Button, Col, Result, Row } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import HomeClient from "./home/index/HomeClient";
import Shop from "./shop/Shop";

function ClientPage() {
  return (
    <Row>
      <Col span={24} className="h-100vh">
        <div>
          <Header />
        </div>
        <div>
          <Routes>
            <Route index element={<HomeClient />} />
            <Route path="home" element={<HomeClient />} />
            <Route path="anything" element={<Shop />} />
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
