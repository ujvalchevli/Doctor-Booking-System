import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function DoctorRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { backendUrl, isDoctor, setIsDoctor, setDoctorData, doctorData } =
    useContext(AppContext);

  // States for registration fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");

  // States for documents
  const [image, setImage] = useState(null);
  const [degreeFile, setDegreeFile] = useState(null);
  const [idProof, setIdProof] = useState(null);
  const [medicalLicense, setMedicalLicense] = useState(null);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!image || !degreeFile || !idProof || !medicalLicense) {
        return toast.error("All documents are mandatory");
      }

      setLoading(true);
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("address", address);
      formData.append("speciality", speciality);
      formData.append("degree", degree);
      formData.append("experience", experience);
      formData.append("fees", Number(fees));
      formData.append("about", about);

      // Appending files
      formData.append("image", image);
      formData.append("degree", degreeFile);
      formData.append("idProof", idProof);
      formData.append("MedicalLicense", medicalLicense);

      const { data } = await axios.post(
        backendUrl + "/api/doctor/register",
        formData
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/doctor-email-verify"); // Assuming this route exists or we'll create it
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#5f6fff]/10 via-white to-purple-100/30 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-linear-to-br from-[#5f6fff] to-[#8a96ff] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <svg
              className="w-10 h-10 text-white"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Doctor Registration
          </h1>
          <p className="text-gray-600">
            Join our network of healthcare professionals
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Progress Bar */}
          <div className="p-6 pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center w-full">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step >= 1
                      ? "bg-[#5f6fff] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </div>
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step >= 2 ? "bg-[#5f6fff]" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step >= 2
                      ? "bg-[#5f6fff] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
                <div
                  className={`flex-1 h-1 mx-2 ${
                    step >= 3 ? "bg-[#5f6fff]" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    step >= 3
                      ? "bg-[#5f6fff] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-2 text-sm px-2">
              <span className="text-gray-600">Personal Info</span>
              <span className="text-gray-600">Professional Details</span>
              <span className="text-gray-600">Documents</span>
            </div>
          </div>

          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Personal Information
              </h2>

              <div className="space-y-5">
                {/* Profile Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Photo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-full overflow-hidden border-2 border-dashed border-gray-300 relative group">
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <svg
                          className="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                      )}
                      <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="profile-image"
                        hidden
                        accept="image/*"
                      />
                    </div>
                    <label
                      htmlFor="profile-image"
                      className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                    >
                      {image ? "Change Photo" : "Upload Photo"}
                    </label>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
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
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      placeholder="Dr. John Doe"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5f6fff] focus:ring-2 focus:ring-[#5f6fff]/10"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      placeholder="doctor@example.com"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5f6fff] focus:ring-2 focus:ring-[#5f6fff]/10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5f6fff] focus:ring-2 focus:ring-[#5f6fff]/10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#5f6fff]"
                    >
                      {showPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
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
                      )}
                    </button>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinic/Hospital Address *
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-3 top-3 text-gray-400 w-5 h-5"
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
                    <textarea
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      rows="3"
                      placeholder="Enter your full clinic/hospital address"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5f6fff] focus:ring-2 focus:ring-[#5f6fff]/10"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {step === 2 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Professional Details
              </h2>

              <div className="space-y-5">
                {/* Speciality */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speciality *
                  </label>
                  <select
                    onChange={(e) => setSpeciality(e.target.value)}
                    value={speciality}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5f6fff] focus:ring-2 focus:ring-[#5f6fff]/10"
                    required
                  >
                    <option value="">Select Speciality</option>
                    <option value="General Physician">General Physician</option>
                    <option value="Gynecologist">Gynecologist</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Neurologist">Neurologist</option>
                    <option value="Gastroenterologist">Gastroenterologist</option>
                    <option value="Cardiologist">Cardiologist</option>
                    <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                  </select>
                </div>

                {/* Degree */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree *
                  </label>
                  <input
                    onChange={(e) => setDegree(e.target.value)}
                    value={degree}
                    type="text"
                    placeholder="e.g., MBBS, MD, DM"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5f6fff] focus:ring-2 focus:ring-[#5f6fff]/10"
                    required
                  />
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience (Years) *
                  </label>
                  <input
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                    type="text"
                    placeholder="e.g., 10"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5f6fff] focus:ring-2 focus:ring-[#5f6fff]/10"
                    required
                  />
                </div>

                {/* Consultation Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Consultation Fee *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                      ₹
                    </span>
                    <input
                      onChange={(e) => setFees(e.target.value)}
                      value={fees}
                      type="number"
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5f6fff] focus:ring-2 focus:ring-[#5f6fff]/10"
                      required
                    />
                  </div>
                </div>

                {/* About */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About *
                  </label>
                  <textarea
                    onChange={(e) => setAbout(e.target.value)}
                    value={about}
                    rows="4"
                    placeholder="Write a brief introduction about yourself, your experience, and your approach to patient care..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#5f6fff] focus:ring-2 focus:ring-[#5f6fff]/10"
                    required
                  ></textarea>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-8 py-3 bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Documents Upload */}
          {step === 3 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Documents Upload
              </h2>

              <div className="space-y-6">
                {/* Degree Certificate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Degree Certificate *
                  </label>
                  <label
                    htmlFor="degree-upload"
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#5f6fff] transition-colors cursor-pointer block relative group overflow-hidden"
                  >
                    {degreeFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-8 h-8 text-[#5f6fff]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                          <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                        </svg>
                        <span className="text-sm text-gray-700 font-medium">{degreeFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        <p className="text-gray-600 mb-1">
                          Click to upload degree certificate
                        </p>
                        <p className="text-xs text-gray-400">
                          JPG, PNG, PDF (Max 5MB)
                        </p>
                      </>
                    )}
                    <input
                      onChange={(e) => setDegreeFile(e.target.files[0])}
                      type="file"
                      id="degree-upload"
                      hidden
                    />
                  </label>
                </div>

                {/* Medical License */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical License *
                  </label>
                  <label
                    htmlFor="license-upload"
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#5f6fff] transition-colors cursor-pointer block relative group overflow-hidden"
                  >
                    {medicalLicense ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-8 h-8 text-[#5f6fff]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700 font-medium">{medicalLicense.name}</span>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        <p className="text-gray-600 mb-1">
                          Click to upload medical license
                        </p>
                        <p className="text-xs text-gray-400">
                          JPG, PNG, PDF (Max 5MB)
                        </p>
                      </>
                    )}
                    <input
                      onChange={(e) => setMedicalLicense(e.target.files[0])}
                      type="file"
                      id="license-upload"
                      hidden
                    />
                  </label>
                </div>

                {/* ID Proof */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID Proof (Aadhar/PAN/Passport) *
                  </label>
                  <label
                    htmlFor="id-proof-upload"
                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-[#5f6fff] transition-colors cursor-pointer block relative group overflow-hidden"
                  >
                    {idProof ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-8 h-8 text-[#5f6fff]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                        </svg>
                        <span className="text-sm text-gray-700 font-medium">{idProof.name}</span>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        <p className="text-gray-600 mb-1">
                          Click to upload ID proof
                        </p>
                        <p className="text-xs text-gray-400">
                          JPG, PNG, PDF (Max 5MB)
                        </p>
                      </>
                    )}
                    <input
                      onChange={(e) => setIdProof(e.target.files[0])}
                      type="file"
                      id="id-proof-upload"
                      hidden
                    />
                  </label>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="mt-8">
                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-[#5f6fff] border-gray-300 rounded focus:ring-[#5f6fff]"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I confirm that all information provided is true and correct
                  </label>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-8 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    disabled={loading}
                    onClick={onSubmitHandler}
                    className="px-8 py-3 bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Registering...
                      </div>
                    ) : (
                      "Submit Registration"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            className="text-[#5f6fff] font-medium hover:underline"
            onClick={() => navigate("/doctor-login")}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default DoctorRegister;
