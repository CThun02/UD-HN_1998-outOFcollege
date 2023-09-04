import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import ProductAdminIndex from "../admins/product-admin/ProductAdminIndex";
import ProductAdminCreate from "../admins/product-admin/ProductAdminCreate";
import ProductAdminUpdate from "../admins/product-admin/ProductAdminUpdate";
import ProductSizeColorAdminUpdate from "../admins/product-admin/ProductSizeColorAdminUpdate";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
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
