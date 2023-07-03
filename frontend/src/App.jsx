import "./App.css";
import { Routes,Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Adminpage from "./components/Adminpage";
import NavbarAdminPage from "./components/NavbarAdminPage";
import Table from "./components/Table";
import OrderNow from "./components/OrderNow";
import Menu from "./components/Menu";
import Receipt from "./components/Receipt";
import RegisterEmp from "./components/RegisterEmp";
import RegisterCus from "./components/RegisterCus";
export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Menu" element={<Menu/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/Admin" element={<Adminpage/>} />
        <Route path="/NavbarAdminPage" element={<NavbarAdminPage/>} />
        <Route path="/Table" element={<Table/>} />
        <Route path="/Order" element={<OrderNow/>} />
        <Route path="/Receipt" element={<Receipt/>} />
        <Route path="/RegisterEmp" element={<RegisterEmp/>} />
        <Route path="/RegisterCus" element={<RegisterCus/>} />
      </Routes>
    </div>
  )
}