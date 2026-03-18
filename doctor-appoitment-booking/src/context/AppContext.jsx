import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [userData, setUserData] = useState(false);
  const [doctorData, setDoctorData] = useState(false);
  const [isDoctorAuthLoading, setIsDoctorAuthLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userDocuments, setUserDocuments] = useState([]);

  const getAuthStatus = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        setIsLoggedin(false);
        setUserData(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getDoctorAuthStatus = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/is-auth");
      if (data.success) {
        setIsDoctor(true);
        await getDoctorData();
      } else {
        setIsDoctor(false);
        setDoctorData(false);
      }
      } finally {
        setIsDoctorAuthLoading(false);
      }
    };
      


  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/user-data");
      data.success ? setUserData(data.user) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getDoctorData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/get-doctor");
      data.success ? setDoctorData(data.doctor) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAuthStatus();
  }, []);
  useEffect(() => {
    getDoctorAuthStatus();
    getDoctorsData();
    if (isLoggedin) {
      getFavoritesData();
      getMedicalDocuments();
    }
  }, [isLoggedin]);


  const reuploadDocuments = async (formData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/reupload-documents",
        formData
      );
      if (data.success) {
        toast.success(data.message);
        await getDoctorData();
      } else {
        toast.error(data.message);
      }
      return data;
    } catch (error) {
      toast.error(error.message);
      return { success: false, message: error.message };
    }
  };

  const updateDoctorData = async (formData) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/update-profile",
        formData
      );
      if (data.success) {
        toast.success(data.message);
        await getDoctorData();
      } else {
        toast.error(data.message);
      }
      return data;
    } catch (error) {
      toast.error(error.message);
      return { success: false, message: error.message };
    }
  };

  const getFavoritesData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/favorites");
      if (data.success) {
        setFavorites(data.favorites.map((fav) => fav.docId._id));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleFavorite = async (docId) => {
    if (!isLoggedin) {
      toast.info("Please login to add to favorites");
      return false;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/toggle-favorite",
        { docId }
      );
      if (data.success) {
        toast.success(data.message);
        getFavoritesData();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const getUsersAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments");
      if (data.success) {
        return data.appointments;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId }
      );
      if (data.success) {
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const getDoctorAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/appointments");
      if (data.success) {
        return data.appointments;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDoctorDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard");
      if (data.success) {
        return data.dashData;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getDoctorPatients = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/patients");
      if (data.success) {
        return data.patients;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cancelAppointmentDoctor = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId }
      );
      if (data.success) {
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const completeAppointmentDoctor = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId }
      );
      if (data.success) {
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const rescheduleAppointmentDoctor = async (
    appointmentId,
    slotDate,
    slotTime
  ) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/reschedule-appointment",
        { appointmentId, slotDate, slotTime }
      );
      if (data.success) {
        toast.success(data.message);
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const getDoctorEarnings = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/earnings");
      if (data.success) {
        return data.earningsData;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getMedicalDocuments = async () => {
    try {
      if (!isLoggedin) return;
      const { data } = await axios.post(backendUrl + "/api/medical-documents/get-documents");
      if (data.success) {
        setUserDocuments(data.documents);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const uploadMedicalDocument = async (formData) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/medical-documents/upload", formData);
      if (data.success) {
        toast.success(data.message);
        getMedicalDocuments();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const deleteMedicalDocument = async (docId) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/medical-documents/delete", { docId });
      if (data.success) {
        toast.success(data.message);
        getMedicalDocuments();
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      toast.error(error.message);
      return false;
    }
  };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    doctorData,
    setDoctorData,
    getDoctorData,
    isDoctor,
    setIsDoctor,
    isDoctorAuthLoading,
    reuploadDocuments,
    doctors,
    getDoctorsData,
    getUsersAppointments,
    cancelAppointment,
    getDoctorAppointments,
    cancelAppointmentDoctor,
    rescheduleAppointmentDoctor,
    completeAppointmentDoctor,
    getDoctorDashData,
    updateDoctorData,
    getDoctorPatients,
    getDoctorEarnings,
    favorites,
    setFavorites,
    getFavoritesData,
    toggleFavorite,
    userDocuments,
    getMedicalDocuments,
    uploadMedicalDocument,
    deleteMedicalDocument,
    getDoctorReviews: async (docId) => {
      try {
        const { data } = await axios.get(backendUrl + `/api/user/get-reviews/${docId}`);
        return data.success ? data.reviews : [];
      } catch (error) {
        toast.error(error.message);
        return [];
      }
    },
    addReview: async (reviewData) => {
      try {
        const { data } = await axios.post(backendUrl + "/api/user/add-review", reviewData);
        if (data.success) {
          toast.success(data.message);
          return true;
        } else {
          toast.error(data.message);
          return false;
        }
      } catch (error) {
        toast.error(error.message);
        return false;
      }
    },
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
