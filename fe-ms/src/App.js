import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexAdmin from "./components/admins/IndexAdmin";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/controller/v1/admin" element={<IndexAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
