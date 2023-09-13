import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import CreateGrad from "./pages/grad/CreateGrad";
import UpdateGard from "./pages/grad/UpdateGrad";
import CreateTray from "./pages/tray/CreateTray";
import UpdateTray from "./pages/tray/UpdateTray";
import ImportExcel from "./pages/excel/ImportExcel";
import ScanUic from "./pages/uic/ScanUic";
import Order from "./pages/order/Order";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <>
      <ToastContainer />
        <Routes>
          <Route path="/" element={<Order />} />
          <Route path="/dashboard/grad-master" element={<CreateGrad />} />
          <Route path="/dashboard/grad-master/:slug" element={<UpdateGard />} />
          <Route path="/dashboard/tray-master" element={<CreateTray />} />
          <Route path="/dashboard/tray-master/:id" element={<UpdateTray />} />
          <Route path="/dashboard/import-excel" element={<ImportExcel />} />
          <Route path="/dashboard/scan-uic" element={<ScanUic />} />
          <Route path="/dashboard/order" element={<Order />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </>
    </div>
  );
}

export default App;
