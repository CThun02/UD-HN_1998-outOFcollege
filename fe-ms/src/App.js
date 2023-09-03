import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexAdmin from "./components/admins/IndexAdmin";
import ProductAdminCreate from "./components/admins/product-admin/ProductAdminCreate";
import ProductAdminIndex from "./components/admins/product-admin/ProductAdminIndex";
import ProductAdminUpdate from "./components/admins/product-admin/ProductAdminUpdate";
import ProductSizeColorAdminUpdate from "./components/admins/product-admin/ProductSizeColorAdminUpdate";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/controller/v1/admin" element={<IndexAdmin />} />
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
