import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";

function AllDoctor() {
  const { doctors, getAllDoctors, changeVerificationStatus } =
    useContext(AdminContext);

  // States for Modals
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  useEffect(() => {
    getAllDoctors();
  }, []);

  const handleViewDocs = (doctor) => {
    setSelectedDocs({
      degreeImage: doctor.degreeImage,
      idProof: doctor.idProof,
      MedicalLicense: doctor.MedicalLicense,
      name: doctor.name,
    });
    setShowDocsModal(true);
  };

  const handleEditClick = (doctor) => {
    setSelectedDoc(doctor);
    setNewStatus(doctor.doctorverify === true || doctor.doctorverify === "true" ? "true" : doctor.doctorverify === "rejected" ? "rejected" : "false");
    setRejectReason(doctor.rejectReason || "");
    setShowEditModal(true);
  };

  const handleSaveStatus = async () => {
    if (newStatus === "rejected" && !rejectReason.trim()) {
      return alert("Please provide a reason for rejection");
    }
    await changeVerificationStatus(selectedDoc._id, newStatus, rejectReason);
    setShowEditModal(false);
  };

  return (
    <div className="p-6 w-full animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Doctor Management</h1>
          <p className="text-gray-500 text-sm mt-1">Review, verify and manage all registered practitioners</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Doctor</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Specialty</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Availability</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Verification</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {doctors && doctors.length > 0 ? (
                doctors.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={item.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"}
                            alt={item.name}
                            className="w-12 h-12 rounded-2xl object-cover shadow-sm ring-2 ring-white"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${item.available ? "bg-green-500" : "bg-gray-400"}`} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 group-hover:text-[#5f6fff] transition-colors">{item.name}</p>
                          <p className="text-[11px] text-gray-400 font-medium">{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-lg">
                        {item.speciality}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.available ? (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Available
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full border border-rose-100/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                          Offline
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {(item.doctorverify === "true" || item.doctorverify === true) ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-100/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" /> Verified
                        </span>
                      ) : item.doctorverify === "rejected" ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full border border-red-100/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600" /> Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-600" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleViewDocs(item)}
                          className="p-2 text-gray-400 hover:text-[#5f6fff] hover:bg-[#5f6fff]/5 rounded-xl transition-all tooltip"
                          title="View Documents"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition-all"
                          title="Edit Status"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-20">
                    <div className="flex flex-col items-center">
                      <div className="p-4 bg-gray-50 rounded-full mb-4">
                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium">No doctors found in the system</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification Status Edit Modal */}
      {showEditModal && selectedDoc && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl animate-in zoom-in duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Update Verification</h2>
            <p className="text-gray-500 text-sm mb-6">Managing status for <span className="text-gray-900 font-bold">{selectedDoc.name}</span></p>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-100 p-3 rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#5f6fff] transition-all"
                >
                  <option value="false">Pending</option>
                  <option value="true">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {newStatus === "rejected" && (
                <div className="animate-in slide-in-from-top duration-300">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 block">Reason for Rejection</label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-100 p-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#5f6fff] transition-all"
                    rows="3"
                    placeholder="Provide details for the rejection..."
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-3 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-2xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveStatus}
                  className="flex-1 px-4 py-3 text-sm font-bold text-white bg-[#5f6fff] hover:bg-[#4a58ff] rounded-2xl shadow-lg shadow-[#5f6fff]/20 transition-all active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Documents Modal */}
      {showDocsModal && selectedDocs && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2rem] max-w-5xl w-full p-10 shadow-2xl animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-10 border-b border-gray-100 pb-6">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Credentials Review</h2>
                <p className="text-gray-500 font-medium mt-1">Authenticating documents for {selectedDocs.name}</p>
              </div>
              <button
                onClick={() => setShowDocsModal(false)}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all group"
              >
                <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Medical License */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">01</div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Medical License</h3>
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden border-4 border-gray-50 bg-gray-50 group relative shadow-inner">
                  <img
                    src={selectedDocs.MedicalLicense}
                    alt="Medical License"
                    className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-all duration-300" />
                </div>
              </div>

              {/* ID Proof */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 font-bold text-xs">02</div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">ID Proof</h3>
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden border-4 border-gray-50 bg-gray-50 group relative shadow-inner">
                  <img
                    src={selectedDocs.idProof}
                    alt="ID Proof"
                    className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-all duration-300" />
                </div>
              </div>

              {/* Degree Image */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600 font-bold text-xs">03</div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-widest">Qualifying Degree</h3>
                </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden border-4 border-gray-50 bg-gray-50 group relative shadow-inner">
                  <img
                    src={selectedDocs.degreeImage}
                    alt="Degree Image"
                    className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/5 transition-all duration-300" />
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-50 flex justify-end">
              <button
                onClick={() => setShowDocsModal(false)}
                className="px-10 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95"
              >
                Close Documents
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllDoctor;
