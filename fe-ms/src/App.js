import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateBill from './components/admins/function-SaleCounter/CreateBill';
import GetAllBill from './components/admins/function-SaleCounter/GetAllBill';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/bill" Component={GetAllBill} index={true} />
        <Route path="/create-bill" Component={CreateBill} />
      </Routes>
    </Router>
  );
}

export default App;
