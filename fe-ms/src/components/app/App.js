import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexAdmin from "../admins/index/IndexAdmin";

import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/controller/v1/admin" element={<IndexAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
