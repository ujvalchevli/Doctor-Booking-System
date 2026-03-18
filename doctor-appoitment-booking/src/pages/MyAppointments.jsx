import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function MyAppointments() {
  const { getUsersAppointments, cancelAppointment } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");

  const getUserAppointmentsList = async () => {
    const data = await getUsersAppointments();
    if (data) {
      setAppointments(data.reverse());
    }
  };

  useEffect(() => {
    getUserAppointmentsList();
  }, []);

  const onCancelAppointment = async (appointmentId) => {
    const success = await cancelAppointment(appointmentId);
    if (success) {
      getUserAppointmentsList();
    }
  };

  // Filter appointments based on selected tab
  const getFilteredAppointments = () => {
    let filtered = appointments;
    if (filter === "all") {
      filtered = appointments;
    } else if (filter === "upcoming") {
      filtered = appointments.filter((apt) => !apt.cancelled && !apt.isCompleted);
    } else if (filter === "completed") {
      filtered = appointments.filter((apt) => apt.isCompleted);
    } else if (filter === "cancelled") {
      filtered = appointments.filter((apt) => apt.cancelled);
    }
    return filtered;
  };

  const filteredAppointments = getFilteredAppointments();

  // Format date to readable format
  const formatDate = (slotDate) => {
    const [day, month, year] = slotDate.split("_");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${day} ${months[Number(month) - 1]}, ${year}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-2">
            View all your booked appointments
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-lg font-medium ${
              filter === "all"
                ? "bg-[#5f6fff] text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("upcoming")}
            className={`px-5 py-2 rounded-lg font-medium ${
              filter === "upcoming"
                ? "bg-[#5f6fff] text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-5 py-2 rounded-lg font-medium ${
              filter === "completed"
                ? "bg-[#5f6fff] text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter("cancelled")}
            className={`px-5 py-2 rounded-lg font-medium ${
              filter === "cancelled"
                ? "bg-[#5f6fff] text-white"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            Cancelled
          </button>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <div
              key={apt._id}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-100"
            >
              {/* Status Badge - Simple */}
              <div className="mb-3">
                {!apt.cancelled && !apt.isCompleted && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    Upcoming
                  </span>
                )}
                {apt.isCompleted && (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    Completed
                  </span>
                )}
                {apt.cancelled && (
                  <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Cancelled
                  </span>
                )}
              </div>

              {/* Doctor Info Row */}
              <div className="flex items-start gap-4">
                {/* Doctor Image */}
                <img
                  src={apt.docData.image}
                  alt={apt.docData.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />

                {/* Appointment Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {apt.docData.name}
                  </h3>
                  <p className="text-[#5f6fff] text-sm mb-2">{apt.docData.speciality}</p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {/* Date */}
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
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
                      {formatDate(apt.slotDate)}
                    </div>

                    {/* Time */}
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
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
                      {apt.slotTime}
                    </div>

                    {/* Address */}
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-4 h-4 mr-1 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {apt.docData.address}
                    </div>
                  </div>

                  {/* Fee */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-500">
                        Consultation Fee
                      </span>
                      <p className="text-xl font-bold text-gray-900">
                        ₹{apt.amount}
                      </p>
                    </div>

                    {/* Action Buttons - Simple */}
                    <div>
                      {!apt.cancelled && !apt.isCompleted && (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => toast.info("Payment feature coming soon!")}
                            className="px-4 py-2 bg-[#5f6fff] text-white text-sm rounded-lg hover:bg-[#4a5ae0]"
                          >
                            Pay Online
                          </button>
                          <button 
                            onClick={() => onCancelAppointment(apt._id)}
                            className="px-4 py-2 border border-red-500 text-red-500 text-sm rounded-lg hover:bg-red-500 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      )}
                      {apt.isCompleted && (
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200">
                          Completed
                        </button>
                      )}
                      {apt.cancelled && (
                        <button className="px-4 py-2 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                          Cancelled
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State - When no appointments */}
        {filteredAppointments.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
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
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No appointments found
            </h3>
            <p className="text-gray-500 mb-4">
              You don't have any {filter} appointments
            </p>
            <button className="px-5 py-2 bg-[#5f6fff] text-white rounded-lg hover:bg-[#4a5ae0]">
              Book an Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAppointments;
