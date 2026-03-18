import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";

function AllPatients() {
  const { patients, getAllPatients } = useContext(AdminContext);

  useEffect(() => {
    getAllPatients();
  }, []);

  return (
    <div className="p-6 w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Patient Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            View and manage all registered patients on the platform
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
                  Patient
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Contact
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                  Gender
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                  Blood Group
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">
                  Age
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patients && patients.length > 0 ? (
                patients.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"
                          }
                          alt={item.name}
                          className="w-12 h-12 rounded-2xl object-cover shadow-sm ring-2 ring-white"
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-900 group-hover:text-[#5f6fff] transition-colors">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-gray-500 font-medium">
                            PAT{String(index + 1).padStart(3, "0")}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          {item.email}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {item.phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${
                          item.gender === "Male"
                            ? "bg-blue-50 text-blue-600"
                            : item.gender === "Female"
                              ? "bg-pink-50 text-pink-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.gender || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-600 border border-rose-100/50">
                        {item.BloodGroup || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm font-bold text-gray-700">
                        {item.age}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-500 truncate max-w-50">
                        {item.address
                          ? `${item.address.line1 || ""}, ${item.address.line2 || ""}`.trim()
                          : "No address"}
                      </p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-20">
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">
                        No patients found
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

export default AllPatients;
