import { Route, Routes, Link } from "react-router-dom";
import SignIn from "./sign-in/SignIn";
import SignUp from "./sign-up/SignUp";
import { Result, Button } from "antd";

function Authen() {
  return (
    <div>
      <Routes>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
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
    </div>
  );
}

export default Authen;
