import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { NotificationProvider } from "./components/element/notification/Notification";
import AdminPage from "./components/admin/AdminPage";
import ClientPage from "./components/customer/ClientPage";
import NotFoundPage from "./components/element/page/NotFoundPage";
import { Button, Result } from "antd";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<ClientPage />} />
          <Route path="api/*" element={<AdminPage />} />
          <Route path="ms-shop/*" element={<ClientPage />} />
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
    </>
  );
}

export default App;
