import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import DoctorList from "./pages/DoctorList";
import Header from "./commponent/Header";
import Footer from "./commponent/Footer";
import ScrollToTop from "./commponent/ScrollToTop";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Myprofile from "./pages/Myprofile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Favorites from "./pages/Favorites";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorEmailVerify from "./pages/DoctorEmailVerify";
import DoctorResetPassword from "./pages/DoctorResetPassword";
import DoctorHome from "./pages/DoctorHome";
import Welcome from "./pages/Welcome";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { useNavigate } from "react-router-dom";
import Doctorlogin from "./pages/doctorlogin";
import MyDocuments from "./pages/MyDocuments";

function App() {
  const location = useLocation();
  const { isDoctor,isDoctorAuthLoading } = useContext(AppContext);
  const navigate = useNavigate();

  // Route protection for doctor dashboard
  useEffect(() => {
    if (
      location.pathname === "/doctor-home" &&
      !isDoctorAuthLoading &&
      !isDoctor
    ) {
      navigate("/doctor-login");
    }
  }, [location.pathname, isDoctor, isDoctorAuthLoading, navigate]);

  // Define routes where Header and Footer should be hidden
  const hideHeaderFooter =
    [
      "/",
      "/login",
      "/email-verify",
      "/reset-password",
      "/doctor-login",
      "/doctor-register",
      "/doctor-email-verify",
    ].includes(location.pathname) || location.pathname.startsWith("/doctor-home");

  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      {!hideHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/patients" element={<Home />} />
        <Route path="/doctor-list" element={<DoctorList />} />
        <Route path="/doctor-list/:speciality" element={<DoctorList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myprofile" element={<Myprofile />} />
        <Route path="/myappointments" element={<MyAppointments />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/my-documents" element={<MyDocuments />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/doctor-register" element={<DoctorRegister />} />
        <Route path="/doctor-email-verify" element={<DoctorEmailVerify />} />
        <Route
          path="/doctor-reset-password"
          element={<DoctorResetPassword />}
        />
        <Route path="/doctor-login" element={<Doctorlogin />} />
        <Route path="/doctor-home/*" element={<DoctorHome />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
