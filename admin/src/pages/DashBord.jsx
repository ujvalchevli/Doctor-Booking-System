import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

function DashBord() {
  const { dashData, getDashData } = useContext(AdminContext);
  const navigate = useNavigate();

  useEffect(() => {
    getDashData();
  }, []);

  if (!dashData) {
    return (
      <div className="p-6 w-full flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6fff]"></div>
      </div>
    );
  }

  const stats = [
    {
      id: 1,
      title: "Total Doctors",
      value: dashData.doctors,
      change: "+12",
      changeType: "increase",
      icon: "doctors",
      color: "blue",
    },
    {
      id: 2,
      title: "Total Patients",
      value: dashData.patients,
      change: "+245",
      changeType: "increase",
      icon: "patients",
      color: "green",
    },
    {
      id: 3,
      title: "Appointments",
      value: dashData.appointments,
      change: "+89",
      changeType: "increase",
      icon: "appointments",
      color: "purple",
    },
    {
      id: 4,
      title: "Pending Verifications",
      value: dashData.pendingVerifications,
      change: "+3",
      changeType: "warning",
      icon: "pending",
      color: "yellow",
    },
  ];

  const recentDoctors = dashData.latestDoctors;

  const appointments = dashData.latestAppointments;

  const getIcon = (iconName, color) => {
    const iconColor = {
      blue: "text-blue-600",
      green: "text-green-600",
      purple: "text-purple-600",
      yellow: "text-yellow-600",
    };

    switch (iconName) {
      case "doctors":
        return (
          <svg
            className={`w-6 h-6 ${iconColor[color]}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        );
      case "patients":
        return (
          <svg
            className={`w-6 h-6 ${iconColor[color]}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "appointments":
        return (
          <svg
            className={`w-6 h-6 ${iconColor[color]}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case "pending":
        return (
          <svg
            className={`w-6 h-6 ${iconColor[color]}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-[#5f6fff] to-[#8a96ff] rounded-2xl p-6 text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Admin! 👋</h2>
        <p className="text-white/90">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}
              >
                {getIcon(stat.icon, stat.color)}
              </div>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  stat.changeType === "increase"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Appointments Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Appointments Overview
            </h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-[#5f6fff]">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>

          {/* Simple Bar Chart */}
          <div className="space-y-3">
            {dashData.appointmentDistribution.map((item, index) => {
              const maxCount = Math.max(...dashData.appointmentDistribution.map(d => d.count), 1);
              const percentage = (item.count / maxCount) * 100;
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{item.day}</span>
                    <span className="text-gray-900 font-medium">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full">
                    <div
                      className="bg-[#5f6fff] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Doctor Verification Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Doctor Verification Status
          </h3>
          <div className="space-y-4">
            {[
              { label: "Verified", count: dashData.verifiedDoctors, color: "green" },
              { label: "Pending", count: dashData.pendingVerifications, color: "yellow" },
              { label: "Rejected", count: dashData.rejectedDoctors, color: "red" },
            ].map((status, index) => {
              const total = dashData.doctors || 1;
              const percentage = (status.count / total) * 100;
              const colorClass = status.color === "green" ? "bg-green-500" : status.color === "yellow" ? "bg-yellow-500" : "bg-red-500";
              return (
                <div key={index}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 ${colorClass} rounded-full mr-2`}></div>
                      <span className="text-sm text-gray-600">{status.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{status.count}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
                    <div
                      className={`${colorClass} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <button className="text-[#5f6fff] text-sm font-medium hover:underline flex items-center">
              View All Verifications
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Doctors & Appointments */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Doctors */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Recent Doctor Registrations
            </h3>
            <button onClick={() => navigate('/alldoctors')} className="text-sm text-[#5f6fff] hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-500">{doctor.speciality}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      doctor.doctorverify === "verified"
                        ? "bg-green-100 text-green-600"
                        : doctor.doctorverify === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {doctor.doctorverify}
                  </span>
                  <p className="text-xs text-gray-400 mt-1">{new Date(doctor.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Latest Appointments
            </h3>
            <button onClick={() => navigate('/all-appointments')} className="text-sm text-[#5f6fff] hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {appointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{apt.userData.name}</p>
                    <p className="text-sm text-gray-500">{apt.docData.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {apt.slotTime}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      apt.cancelled
                        ? "bg-red-100 text-red-600"
                        : apt.isCompleted
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {apt.cancelled ? "Cancelled" : apt.isCompleted ? "Completed" : "Upcoming"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default DashBord;
