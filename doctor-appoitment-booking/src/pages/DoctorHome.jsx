import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import DoctorHeader from "../commponent/DoctorHader";
import DoctorSideBar from "../commponent/DoctorSideBar";
import DoctorFooter from "../commponent/DoctorFooter";
import { AppContext } from "../context/AppContext";
import DoctorAppointments from "../commponent/DoctorAppointments";
import { Routes, Route } from "react-router-dom";
import DoctorDashboard from "../commponent/DoctorDashboard";
import DoctorProfile from "../commponent/DoctorProfile";
import DoctorPatients from "../commponent/DoctorPatients";
import DoctorEarnings from "../commponent/DoctorEarnings";

function DoctorHome() {
  const { doctorData, reuploadDocuments } = useContext(AppContext);
  const [isReuploading, setIsReuploading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // States for documents
  const [degreeFile, setDegreeFile] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [medicalLicense, setMedicalLicense] = useState(null);

  const handleReupload = async (e) => {
    e.preventDefault();
    if (!degreeFile || !idProof || !medicalLicense) {
      return toast.error("All documents are mandatory");
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("degree", degreeFile);
      formData.append("idProof", idProof);
      formData.append("MedicalLicense", medicalLicense);

      const data = await reuploadDocuments(formData);
      if (data.success) {
        setIsReuploading(false);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return doctorData?.doctorverify === "true" ||
    doctorData?.doctorverify === true ? (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <DoctorHeader setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}
        <DoctorSideBar setIsMobileMenuOpen={setIsMobileMenuOpen} isMobileMenuOpen={isMobileMenuOpen} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Routes>
            <Route path="/" element={<DoctorDashboard />} />
            <Route path="/appointments" element={<DoctorAppointments />} />
            <Route path="/profile" element={<DoctorProfile />} />
            <Route path="/patients" element={<DoctorPatients />} />
            <Route path="/earnings" element={<DoctorEarnings />} />
            {/* Add more nested routes here as needed */}
          </Routes>
        </main>
      </div>
      <DoctorFooter />
    </div>
  ) : (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        {isReuploading ? (
          <div className="text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setIsReuploading(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h3 className="text-xl font-bold text-gray-800">
                Re-submit Documents
              </h3>
            </div>

            <form onSubmit={handleReupload} className="space-y-4">
              {/* Degree */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Degree Certificate
                </label>
                <input
                  type="file"
                  onChange={(e) => setDegreeFile(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#5f6fff]/10 file:text-[#5f6fff] hover:file:bg-[#5f6fff]/20"
                  required
                />
              </div>

              {/* ID Proof */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  ID Proof
                </label>
                <input
                  type="file"
                  onChange={(e) => setIdProof(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#5f6fff]/10 file:text-[#5f6fff] hover:file:bg-[#5f6fff]/20"
                  required
                />
              </div>

              {/* Medical License */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Medical License
                </label>
                <input
                  type="file"
                  onChange={(e) => setMedicalLicense(e.target.files[0])}
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#5f6fff]/10 file:text-[#5f6fff] hover:file:bg-[#5f6fff]/20"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#5f6fff] text-white font-semibold rounded-xl hover:bg-[#4a58ff] transition-all shadow-md active:scale-95 disabled:opacity-50 mt-6"
              >
                {loading ? "Uploading..." : "Submit for Verification"}
              </button>
            </form>
          </div>
        ) : (
          <>
            {/* Status Icon */}
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5 ${
                doctorData?.doctorverify === "rejected"
                  ? "bg-red-50"
                  : "bg-gray-100"
              }`}
            >
              {doctorData?.doctorverify === "rejected" ? (
                <svg
                  className="w-10 h-10 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-10 h-10 text-gray-500"
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
              )}
            </div>

            {/* Text Area */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {doctorData?.doctorverify === "rejected"
                ? "Verification Rejected"
                : "Verification Pending"}
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              {doctorData?.doctorverify === "rejected"
                ? "Unfortunately, your verification request was not approved."
                : "Your account is under review. You'll get access once verified."}
            </p>

            {/* Status Badge */}
            <div
              className={`inline-flex items-center px-3 py-1 rounded-full mb-4 ${
                doctorData?.doctorverify === "rejected"
                  ? "bg-red-100"
                  : "bg-yellow-100"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full mr-2 ${
                  doctorData?.doctorverify === "rejected"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              ></span>
              <span
                className={`text-xs font-medium ${
                  doctorData?.doctorverify === "rejected"
                    ? "text-red-700"
                    : "text-yellow-700"
                }`}
              >
                {doctorData?.doctorverify === "rejected"
                  ? "Rejected"
                  : "Under Review"}
              </span>
            </div>

            {/* Rejection Reason */}
            {doctorData?.doctorverify === "rejected" &&
              doctorData?.rejectReason && (
                <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-4 text-left">
                  <p className="text-xs font-semibold text-red-800 uppercase tracking-wider mb-1">
                    Reason for Rejection:
                  </p>
                  <p className="text-sm text-red-700">{doctorData.rejectReason}</p>
                </div>
              )}

            {/* Action for Rejected */}
            {doctorData?.doctorverify === "rejected" && (
              <button
                onClick={() => setIsReuploading(true)}
                className="w-full py-3 bg-white border-2 border-[#5f6fff] text-[#5f6fff] font-bold rounded-xl hover:bg-[#5f6fff]/5 transition-all mb-4"
              >
                Update Documents & Apply Again
              </button>
            )}

            {/* Contact info */}
            <p className="text-xs text-gray-400">
              Need help?{" "}
              <span className="text-[#5f6fff]">support@medicare.com</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default DoctorHome;
