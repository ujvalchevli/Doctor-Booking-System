import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Myprofile() {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(false);

  const { backendUrl, userData, setUserData } =
    useContext(AppContext);
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      formData.append("age", userData.age);
      formData.append("BloodGroup", userData.BloodGroup);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        {
          withCredentials: true,
        },
      );

      if (data.success) {
        toast.success(data.message);
        await setUserData(data.user);
        setIsEditing(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return userData ? (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:base">
            Manage your personal information and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              {/* Profile Image */}
              <div className="relative inline-block">
                {isEditing ? (
                  <label htmlFor="image" className="cursor-pointer group">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                      <img
                        src={image ? URL.createObjectURL(image) : (userData?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop")}
                        alt="Profile"
                        className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                    </div>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      id="image"
                      hidden
                      accept="image/*"
                    />
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-linear-to-r from-[#5f6fff] to-[#8a96ff] rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300">
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
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </label>
                ) : (
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <img
                      src={userData?.image || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold text-gray-900 mt-4">
                {userData?.name}
              </h2>
              <p className="text-gray-500 text-sm mb-4">{userData?.email}</p>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full mt-6 px-4 py-3 bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Right Column - Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Personal Information
              </h3>

              <div className="space-y-6">
                {/* Full Name */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <label className="text-sm font-medium text-gray-700 md:col-span-1">
                    Full Name
                  </label>
                  <div className="md:col-span-2">
                    {isEditing ? (
                      <input
                        type="text"
                        value={userData?.name}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                      />
                    ) : (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-400 mr-3"
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
                        <span className="text-gray-900">{userData?.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <label className="text-sm font-medium text-gray-700 md:col-span-1">
                    Email
                  </label>
                  <div className="md:col-span-2">
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 text-gray-400 mr-3"
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
                      <span className="text-gray-900">{userData?.email}</span>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <label className="text-sm font-medium text-gray-700 md:col-span-1">
                    Phone Number
                  </label>
                  <div className="md:col-span-2">
                    {isEditing ? (
                      <input
                        type="tel"
                        value={userData?.phone}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                      />
                    ) : (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-400 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span className="text-gray-900">{userData?.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <label className="text-sm font-medium text-gray-700 md:col-span-1">
                    Address
                  </label>
                  <div className="md:col-span-2">
                    {isEditing ? (
                      <div>
                        <input
                          type="text"
                          placeholder="Line 1"
                          value={userData?.address?.line1 || ""}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              address: {
                                ...userData.address,
                                line1: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                        />
                        <input
                          type="text"
                          placeholder="Line 2"
                          value={userData?.address?.line2 || ""}
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              address: {
                                ...userData.address,
                                line2: e.target.value,
                              },
                            })
                          }
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                        />
                      </div>
                    ) : (
                      <div className="flex items-start">
                        <svg
                          className="w-5 h-5 text-gray-400 mr-3 mt-0.5"
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
                        <span className="text-gray-900">
                          {userData?.address?.line1}
                          <br />
                          {userData?.address?.line2}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Gender */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <label className="text-sm font-medium text-gray-700 md:col-span-1">
                    Gender
                  </label>
                  <div className="md:col-span-2">
                    {isEditing ? (
                      <select
                        value={userData?.gender}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            gender: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
                      </select>
                    ) : (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-400 mr-3"
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
                        <span className="text-gray-900">{userData?.gender}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Blood Group (Additional) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <label className="text-sm font-medium text-gray-700 md:col-span-1">
                    Blood Group
                  </label>
                  <div className="md:col-span-2">
                    {isEditing ? (
                      <select
                        value={userData?.BloodGroup}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            BloodGroup: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                      </select>
                    ) : (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-400 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                        <span className="text-gray-900">
                          {userData?.BloodGroup}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Age */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <label className="text-sm font-medium text-gray-700 md:col-span-1">
                    Age
                  </label>
                  <div className="md:col-span-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={userData?.age}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            age: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                      />
                    ) : (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-400 mr-3"
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
                        <span className="text-gray-900">{userData?.age}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                  <label className="text-sm font-medium text-gray-700 md:col-span-1">
                    Date of Birth
                  </label>
                  <div className="md:col-span-2">
                    {isEditing ? (
                      <input
                        type="date"
                        value={userData?.dob ? userData.dob.split("/").reverse().join("-") : ""}
                        onChange={(e) => {
                          const date = e.target.value
                            .split("-")
                            .reverse()
                            .join("/");
                          setUserData({ ...userData, dob: date });
                        }}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                      />
                    ) : (
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-gray-400 mr-3"
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
                        <span className="text-gray-900">{userData?.dob}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Save Button (only visible when editing) */}
                {isEditing && (
                  <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                      onClick={updateUserProfileData}
                      
                      className="px-6 py-3 bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6fff]"></div>
    </div>
  );
}

export default Myprofile;
