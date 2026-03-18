import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";

function Appointments() {
  const { appointments, getAllAppointments } = useContext(AdminContext);

  useEffect(() => {
    getAllAppointments();
  }, []);

  const formatDate = (slotDate) => {
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

  return (
    <div className="p-6 w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Appointment Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Monitor and manage all patient-doctor consultations
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  #
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Patient
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                  Age
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Doctor
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                  Fees
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments && appointments.length > 0 ? (
                [...appointments].reverse().map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            item.userData.image ||
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                          }
                          alt={item.userData.name}
                          className="w-10 h-10 rounded-xl object-cover shadow-sm ring-2 ring-white"
                        />
                        <p className="text-sm font-bold text-gray-900 group-hover:text-[#5f6fff] transition-colors">
                          {item.userData.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-gray-700">
                        {item.userData.age}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {formatDate(item.slotDate)}
                        </p>
                        <p className="text-[11px] text-[#5f6fff] font-bold">
                          {item.slotTime}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.docData.image}
                          alt={item.docData.name}
                          className="w-10 h-10 rounded-xl object-cover shadow-sm ring-2 ring-white bg-blue-50"
                        />
                        <p className="text-sm font-medium text-gray-700">
                          {item.docData.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-900">
                      ₹{item.amount}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.cancelled ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />{" "}
                          Cancelled
                        </span>
                      ) : item.isCompleted ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                          Completed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />{" "}
                          Upcoming
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-20">
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-gray-50 rounded-full mb-4">
                        <svg
                          className="w-12 h-12 text-gray-300"
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
                      <p className="text-gray-500 font-medium">
                        No appointments found
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
