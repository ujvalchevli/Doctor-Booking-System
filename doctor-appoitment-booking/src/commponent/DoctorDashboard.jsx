import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import {
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiArrowUpRight,
  FiClock,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const {
    isDoctor,
    getDoctorDashData,
    completeAppointmentDoctor,
    cancelAppointmentDoctor,
  } = useContext(AppContext);
  const [dashData, setDashData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashData = async () => {
    try {
      setLoading(true);
      const data = await getDoctorDashData();
      if (data) {
        setDashData(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onComplete = async (id) => {
    const success = await completeAppointmentDoctor(id);
    if (success) fetchDashData();
  };

  const onCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const success = await cancelAppointmentDoctor(id);
      if (success) fetchDashData();
    }
  };

  useEffect(() => {
    if (isDoctor) {
      fetchDashData();
    }
  }, [isDoctor]);

  const formatDate = (slotDate) => {
    if (!slotDate) return "";
    const [day, month, year] = slotDate.split("_");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${day} ${months[Number(month) - 1]}, ${year}`;
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6fff]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 mt-2">
          Tracking your practice performance and upcoming schedule
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Earnings Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 bg-green-50 rounded-2xl">
              <FiDollarSign className="w-6 h-6 text-green-600" />
            </div>
            <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <FiArrowUpRight className="mr-1" /> +12%
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Total Earnings</p>
          <div className="flex items-baseline mt-1">
            <h2 className="text-3xl font-bold text-gray-900">
              ₹{dashData?.earnings}
            </h2>
            <span className="ml-1 text-gray-400 text-xs font-normal">
              this month
            </span>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 bg-blue-50 rounded-2xl">
              <FiCalendar className="w-6 h-6 text-blue-600" />
            </div>
            <span className="flex items-center text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              <FiArrowUpRight className="mr-1" /> +5%
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Total Appointments</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            {dashData?.appointments}
          </h2>
        </div>

        {/* Patients Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-4 bg-purple-50 rounded-2xl">
              <FiUsers className="w-6 h-6 text-purple-600" />
            </div>
            <span className="flex items-center text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
              <FiArrowUpRight className="mr-1" /> +8%
            </span>
          </div>
          <p className="text-gray-500 text-sm font-medium">Unique Patients</p>
          <h2 className="text-3xl font-bold text-gray-900 mt-1">
            {dashData?.patients}
          </h2>
        </div>
      </div>

      {/* Latest Appointments */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">Latest Appointments</h3>
          <button
            onClick={() => navigate("/doctor-home/appointments")}
            className="text-xs font-bold text-[#5f6fff] hover:underline uppercase tracking-wider"
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-gray-400 text-[10px] font-bold uppercase tracking-widest border-b border-gray-50">
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dashData?.latestAppointments.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        className="w-10 h-10 rounded-xl object-cover shadow-sm border border-gray-100"
                        src={item.userData.image}
                        alt=""
                      />
                      <span className="text-sm font-bold text-gray-900">
                        {item.userData.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {item.cancelled ? (
                      <div className="flex items-center text-red-500 text-xs font-bold gap-1">
                        <FiXCircle /> <span>Cancelled</span>
                      </div>
                    ) : item.isCompleted ? (
                      <div className="flex items-center text-green-500 text-xs font-bold gap-1">
                        <FiCheckCircle /> <span>Completed</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-blue-500 text-xs font-bold gap-1">
                        <FiClock /> <span>Upcoming</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-900">
                        {formatDate(item.slotDate)}
                      </span>
                      <span className="text-[10px] font-medium text-gray-400">
                        {item.slotTime}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {!item.cancelled && !item.isCompleted && (
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onComplete(item._id)}
                          className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold hover:bg-green-100 transition-colors"
                        >
                          Complete
                        </button>
                        <button
                          onClick={() => onCancel(item._id)}
                          className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-[10px] font-bold hover:bg-red-100 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {dashData?.latestAppointments.length === 0 && (
          <div className="p-12 text-center text-gray-400 font-medium italic">
            No recent appointments
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
