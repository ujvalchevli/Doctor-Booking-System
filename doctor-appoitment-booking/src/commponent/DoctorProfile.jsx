import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function DoctorProfile() {
  const { doctorData, updateDoctorData } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    fees: "",
    address: "",
    available: true,
    lunguage1: "",
    lunguage2: "",
  });

  useEffect(() => {
    if (doctorData) {
      setFormData({
        name: doctorData.name || "",
        speciality: doctorData.speciality || "",
        degree: doctorData.degree || "",
        experience: doctorData.experience || "",
        about: doctorData.about || "",
        fees: doctorData.fees || "",
        address: doctorData.address || "",
        available: doctorData.available,
        lunguage1: doctorData.lunguage1 || "English",
        lunguage2: doctorData.lunguage2 || "Hindi",
      });
    }
  }, [doctorData]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updateForm = new FormData();
      updateForm.append("name", formData.name);
      updateForm.append("speciality", formData.speciality);
      updateForm.append("degree", formData.degree);
      updateForm.append("experience", formData.experience);
      updateForm.append("about", formData.about);
      updateForm.append("fees", formData.fees);
      updateForm.append("address", formData.address);
      updateForm.append("available", formData.available);
      updateForm.append("lunguage1", formData.lunguage1);
      updateForm.append("lunguage2", formData.lunguage2);
      
      if (image) {
        updateForm.append("image", image);
      }

      const data = await updateDoctorData(updateForm);
      if (data.success) {
        setIsEditing(false);
        setImage(false);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!doctorData) return null;

  return (
    <div className="max-w-4xl mx-auto py-4 sm:py-8 px-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Profile Header Background */}
        <div className="h-24 sm:h-32 bg-gradient-to-r from-[#5f6fff] to-[#8a96ff]"></div>
        
        <div className="px-4 sm:px-8 pb-8">
          {/* Profile Image & Basic Info */}
          <div className="relative flex flex-col items-center -mt-12 sm:-mt-16 mb-6 sm:mb-8">
            <div className="relative">
              <img
                src={image ? URL.createObjectURL(image) : doctorData.image}
                alt={doctorData.name}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-lg"
              />
              {isEditing && (
                <label htmlFor="image-upload" className="absolute bottom-1 right-1 bg-white p-2 rounded-xl shadow-md cursor-pointer hover:bg-gray-50 transition-colors border border-gray-100">
                  <svg className="w-4 h-4 text-[#5f6fff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="file"
                    id="image-upload"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                  />
                </label>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-4 leading-none text-center">{doctorData.name}</h1>
            <p className="text-[#5f6fff] font-medium mt-2 text-sm sm:text-base">{doctorData.speciality}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information Section */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Personal Information</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-tight">Full Name</label>
                  {isEditing ? (
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] outline-none transition-all"
                      required
                    />
                  ) : (
                    <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-transparent">{doctorData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-tight">Speciality</label>
                  {isEditing ? (
                    <select
                      name="speciality"
                      value={formData.speciality}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] outline-none transition-all"
                    >
                      <option value="General Physician">General Physician</option>
                      <option value="Gynecologist">Gynecologist</option>
                      <option value="Dermatologist">Dermatologist</option>
                      <option value="Pediatrician">Pediatrician</option>
                      <option value="Neurologist">Neurologist</option>
                      <option value="Gastroenterologist">Gastroenterologist</option>
                      <option value="Cardiologist">Cardiologist</option>
                      <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                    </select>
                  ) : (
                    <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-transparent">{doctorData.speciality}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-tight">Degree</label>
                  {isEditing ? (
                    <input
                      name="degree"
                      value={formData.degree}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] outline-none transition-all"
                      required
                    />
                  ) : (
                    <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-transparent">{doctorData.degree}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-tight">Experience</label>
                    {isEditing ? (
                      <input
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] outline-none transition-all"
                        required
                      />
                    ) : (
                      <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-transparent">{doctorData.experience}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-tight">Fees (₹)</label>
                    {isEditing ? (
                      <input
                        type="number"
                        name="fees"
                        value={formData.fees}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] outline-none transition-all"
                        required
                      />
                    ) : (
                      <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-transparent">₹{doctorData.fees}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Languages & Communication Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-2">Professional Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-tight">Primary Language</label>
                    {isEditing ? (
                      <input
                        name="lunguage1"
                        value={formData.lunguage1}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] outline-none transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-transparent">{doctorData.lunguage1}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-tight">Secondary Language</label>
                    {isEditing ? (
                      <input
                        name="lunguage2"
                        value={formData.lunguage2}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] outline-none transition-all"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-transparent">{doctorData.lunguage2}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-500 mb-2 uppercase tracking-tight">Clinic Address</label>
                  {isEditing ? (
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] outline-none transition-all resize-none"
                      required
                    />
                  ) : (
                    <p className="text-gray-900 font-medium px-4 py-3 bg-gray-50 rounded-xl border border-transparent whitespace-pre-wrap">{doctorData.address}</p>
                  )}
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-800">Available for Consultation</p>
                      <p className="text-xs text-gray-500">Toggle your availability for bookings</p>
                    </div>
                    {isEditing ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="available"
                          checked={formData.available}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5f6fff]"></div>
                      </label>
                    ) : (
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${doctorData.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {doctorData.available ? 'Available' : 'Unavailable'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Full Width Section - About */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-gray-500 uppercase tracking-tight">About Doctor</label>
                {isEditing ? (
                  <textarea
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] outline-none transition-all resize-none"
                    required
                  />
                ) : (
                  <p className="text-gray-900 px-4 py-3 bg-gray-50 rounded-xl border border-transparent leading-relaxed">{doctorData.about}</p>
                )}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-10 flex justify-end gap-3 border-t border-gray-100 pt-6">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-8 py-2.5 bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-8 py-2.5 bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all active:scale-95"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
