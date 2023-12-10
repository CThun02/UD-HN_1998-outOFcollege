import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./components/admin/AdminPage";
import ClientPage from "./components/customer/ClientPage";
import { Result } from "antd";
import Authen from "./components/authen/Authen";
import { NotificationProvider } from "./components/element/notification/NotificationAuthen";

function App() {
  return (
    <>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<ClientPage />} />
            <Route path="api/*" element={<AdminPage />} />
            <Route path="ms-shop/*" element={<ClientPage />} />
            <Route path="authen/*" element={<Authen isAuthenAdmin={false} />} />
            <Route
              path="authen/admin/*"
              element={<Authen isAuthenAdmin={true} />}
            />
            <Route
              path="*"
              element={
                <Result
                  status={"404"}
                  title={"404"}
                  subTitle={"Xin lỗi, trang bạn truy cập không tồn tại."}
                />
              }
            />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </>
  );
}

export default App;
