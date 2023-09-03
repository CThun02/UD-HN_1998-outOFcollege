import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexAdmin from "./components/admins/IndexAdmin";
import GetAllBill from "./components/admins/function-SaleCounter/GetAllBill";
import CreateBill from "./components/admins/function-SaleCounter/CreateBill";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/controller/v1/admin" element={<IndexAdmin />} />
          <Route path="/controller/v1/bill" element={<GetAllBill />} />
          <Route path="/controller/v1/create-bill" element={<CreateBill />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
