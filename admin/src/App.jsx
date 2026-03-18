import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SlideBar from "./components/SlideBar";
import DashBord from "./pages/DashBord";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./pages/AdminLogin";
import { AdminContext } from "./context/AdminContext";
import AllDoctor from "./pages/AllDoctor";
import AllPatients from "./pages/AllPatients";
import PendingDoctor from "./pages/PendingDoctor";
import RejectedDoctor from "./pages/RejectedDoctor";
import Appointments from "./pages/Appointments";
import ContactMessages from "./pages/ContactMessages";

function App() {
  const { isAAuth, loading } = useContext(AdminContext);

  if (loading) {
    return null; // Or a loading spinner
  }

  return isAAuth ? (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <SlideBar />
        <Routes>
          <Route path="/" element={<DashBord />} />
          <Route path="/alogin" element={<DashBord />} />
          <Route path="/alldoctors" element={<AllDoctor />} />
          <Route path="/allpatients" element={<AllPatients />} />
          <Route path="/pendingdoctors" element={<PendingDoctor/>} />
          <Route path="/rejecteddoctors" element={<RejectedDoctor/>} />
          <Route path="/all-appointments" element={<Appointments/>} />
          <Route path="/contact-messages" element={<ContactMessages/>} />
         
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <AdminLogin />
    </>
  );
}

export default App;
