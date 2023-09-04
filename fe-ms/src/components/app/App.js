import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import ProductAdminIndex from "../admins/product-admin/ProductAdminIndex";
import ProductAdminCreate from "../admins/product-admin/ProductAdminCreate";
import ProductAdminUpdate from "../admins/product-admin/ProductAdminUpdate";
import ProductSizeColorAdminUpdate from "../admins/product-admin/ProductSizeColorAdminUpdate";
import IndexAdmin from "../admins/index/IndexAdmin";
import GetAllBill from "../admins/function-SaleCounter/GetAllBill";
import CreateBill from "../admins/function-SaleCounter/CreateBill";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/controller/v1/admin" element={<IndexAdmin />}>
            <Route />
          </Route>
          <Route path="/controller/v1/admin/bill" element={<GetAllBill />} />
          <Route
            path="/controller/v1/admin/create-bill"
            element={<CreateBill />}
          />
          <Route
            path="/controller/v1/admin/product"
            element={<ProductAdminIndex />}
          />
          <Route
            path="/controller/v1/admin/product/create"
            element={<ProductAdminCreate />}
          />
          <Route
            path="/controller/v1/admin/product/update"
            element={<ProductAdminUpdate />}
          />
          <Route
            path="/controller/v1/admin/product/updateSizeColor"
            element={<ProductSizeColorAdminUpdate />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
