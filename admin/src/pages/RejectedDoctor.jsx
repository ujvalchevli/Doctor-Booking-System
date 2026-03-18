import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";

function RejectedDoctor() {
  const { doctors, getAllDoctors } = useContext(AdminContext);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState(null);

  useEffect(() => {
    getAllDoctors();
  }, []);

  const rejectedDoctors = doctors.filter(
    (doc) => doc.doctorverify === "rejected",
  );

  const handleViewDocs = (doctor) => {
    setSelectedDocs({
      degreeImage: doctor.degreeImage,
      idProof: doctor.idProof,
      MedicalLicense: doctor.MedicalLicense,
      name: doctor.name,
    });
    setShowDocsModal(true);
  };

  return (
    <div className="p-6 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Rejected Doctors</h1>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Doctor
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Specialty
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Documents
              </th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-6 py-3">
                Rejection Reason
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rejectedDoctors && rejectedDoctors.length > 0 ? (
              rejectedDoctors.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          item.image ||
                          "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop"
                        }
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">{item.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{item.speciality}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleViewDocs(item)}
                      className="text-[#5f6fff] text-xs font-medium hover:underline flex items-center gap-1 mx-auto"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="bg-red-50 text-red-700 text-xs font-medium px-3 py-1.5 rounded-lg border border-red-100">
                      {item.rejectReason || "No reason provided"}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-12">
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-12 h-12 text-gray-300 mb-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="text-gray-500">No rejected doctors</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Documents Modal */}
      {showDocsModal && selectedDocs && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-8 border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Doctor Documents
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Reviewing documents for {selectedDocs.name}
                </p>
              </div>
              <button
                onClick={() => setShowDocsModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-500"
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
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Medical License */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Medical License
                </h3>
                <div className="aspect-3/4 rounded-xl overflow-hidden border-2 border-gray-100 bg-gray-50 group relative">
                  <img
                    src={selectedDocs.MedicalLicense}
                    alt="Medical License"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>

              {/* ID Proof */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  ID Proof
                </h3>
                <div className="aspect-3/4 rounded-xl overflow-hidden border-2 border-gray-100 bg-gray-50 group relative">
                  <img
                    src={selectedDocs.idProof}
                    alt="ID Proof"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>

              {/* Degree Image */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Degree Image
                </h3>
                <div className="aspect-3/4 rounded-xl overflow-hidden border-2 border-gray-100 bg-gray-50 group relative">
                  <img
                    src={selectedDocs.degreeImage}
                    alt="Degree Image"
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setShowDocsModal(false)}
                className="px-8 py-2.5 bg-[#5f6fff] text-white font-medium rounded-xl hover:bg-[#4a58ff] transition-all shadow-md active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RejectedDoctor;
