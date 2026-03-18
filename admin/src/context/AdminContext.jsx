import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

axios.defaults.withCredentials = true;

const AdminContextProvider = (props) => {
  const [isAAuth, setIsAAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAdminAuthStatus = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/is-auth");
      if (data.success) {
        setIsAAuth(true);
      } else {
        setIsAAuth(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdminAuthStatus();
  }, []);

  const [doctors, setDoctors] = useState([]);

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/doctors");
      if (data.success) {
        setDoctors(data.doctor);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [patients, setPatients] = useState([]);

  const getAllPatients = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/patients");
      if (data.success) {
        setPatients(data.user);
        console.log(patients);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const aLogout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/admin/logout");
      if (data.success) {
        setIsAAuth(false);
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeVerificationStatus = async (docId, status, rejectReason = "") => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-verification-status",
        { docId, status, rejectReason },
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const [appointments, setAppointments] = useState([]);

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments");
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [messages, setMessages] = useState([]);

  const getAllMessages = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/contact/all");
      if (data.success) {
        setMessages(data.messages);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };



  const [dashData, setDashData] = useState(false);

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard");
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    dashData,
    getDashData,
    isAAuth,
    setIsAAuth,
    loading,
    backendUrl,
    aLogout,
    doctors,
    getAllDoctors,
    patients,
    getAllPatients,
    changeVerificationStatus,
    appointments,
    getAllAppointments,
    messages,
    getAllMessages,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
