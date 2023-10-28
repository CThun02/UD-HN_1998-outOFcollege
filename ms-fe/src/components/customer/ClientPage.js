import { Button, Col, Result, Row } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import HomeClient from "./home/index/HomeClient";
import About from "./about/About";

function ClientPage() {
  return (
    <Row>
      <Col span={24} className="h-100vh">
        <div>
          <Header />
        </div>
        <div>
          <Routes>
            <Route index element={"index"} />
            <Route path="home" element={<HomeClient />} />
            <Route path="about" element={<About />} />
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
  );
}

export default ClientPage;
