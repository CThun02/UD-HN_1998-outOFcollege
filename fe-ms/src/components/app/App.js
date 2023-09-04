import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import ProductAdminIndex from "../admins/product-admin/ProductAdminIndex";
import ProductAdminCreate from "../admins/product-admin/ProductAdminCreate";
import ProductAdminUpdate from "../admins/product-admin/ProductAdminUpdate";
import ProductSizeColorAdminUpdate from "../admins/product-admin/ProductSizeColorAdminUpdate";
import IndexAdmin from "../admins/index/IndexAdmin";
import GetAllBill from "../admins/function-SaleCounter/GetAllBill";
import CreateBill from "../admins/function-SaleCounter/CreateBill";
import Sidebar from "../admins/sidebar/Sidebar";
import Nav from "../admins/nav/Nav";
import Statistics from "../admins/statistics/Statistics";
import Promition from "../admins/promition/Promition";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <div className={`row ${styles.main}`}>
          <div className={`col-3 ${styles.padding}`}>
            <Sidebar />
          </div>
          <div className={`col-9 ${styles.padding}`}>
            <Nav />
            <div className={`row ${styles.main}`}>
              <Routes>
                <Route
                  index
                  path="/controller/v1/admin"
                  element={<Statistics />}
                />
                <Route
                  index
                  path="/controller/v1/admin/statistics"
                  element={<Statistics />}
                />
                <Route
                  path="/controller/v1/admin/bill"
                  element={<GetAllBill />}
                />
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

                <Route
                  path="/controller/v1/admin/promition"
                  element={<Promition />}
                />
                <Route
                  path="/controller/v1/admin/voucher"
                  element={<Promition />}
                />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
