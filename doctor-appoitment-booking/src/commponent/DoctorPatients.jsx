import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FiSearch, FiUser, FiCalendar, FiClock, FiMail, FiPhone } from "react-icons/fi";

function DoctorPatients() {
  const { getDoctorPatients } = useContext(AppContext);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPatients = async () => {
    setLoading(true);
    const data = await getDoctorPatients();
    if (data) {
      setPatients(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6fff]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Patients</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and view your patient history</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative max-w-md w-full">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
          />
        </div>
      </div>

      {/* Patients Grid */}
      {filteredPatients.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={patient.image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"} 
                    alt={patient.name} 
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-4 ring-gray-50 group-hover:ring-[#5f6fff]/10 transition-all"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-[#5f6fff] transition-colors">
                    {patient.name}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium bg-gray-100 inline-block px-2 py-0.5 rounded-lg mt-1">
                    Patient ID: #{patient._id.slice(-6).toUpperCase()}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <FiMail className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  <span className="truncate">{patient.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiPhone className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  <span>{patient.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <FiUser className="w-4 h-4 mr-3 text-gray-400 shrink-0" />
                  <span>{patient.gender || "Not specified"}, {patient.dob ? (new Date().getFullYear() - new Date(patient.dob).getFullYear()) : "N/A"} years</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-50">
                <div className="bg-gray-50 p-2.5 rounded-xl text-center">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Last Visit</p>
                  <p className="text-sm font-bold text-gray-700">{formatDate(patient.lastAppointment)}</p>
                </div>
                <div className="bg-[#5f6fff]/5 p-2.5 rounded-xl text-center">
                  <p className="text-[10px] text-[#5f6fff] font-bold uppercase tracking-wider mb-1">Visits</p>
                  <p className="text-sm font-bold text-[#5f6fff]">{patient.appointmentCount}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-16 text-center border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiUser className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            {searchTerm ? "No patients match your search criteria. Try a different term." : "Patients who book appointments with you will appear here."}
          </p>
        </div>
      )}
    </div>
  );
}

export default DoctorPatients;
