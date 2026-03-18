import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiCalendar,
  FiLogOut,
  FiChevronDown,
  FiShield,
  FiUserCheck,
  FiHeart,
  FiFileText,
} from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { MdLocalHospital } from "react-icons/md";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { backendUrl, setIsLoggedin, userData, setUserData, favorites } =
    useContext(AppContext);
  const navigate = useNavigate();

  // Handle clicking outside profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        setIsProfileOpen(false);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <MdLocalHospital className="w-8 h-8 text-[#5f6fff]" />
            <span className="text-2xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Medi<span className="text-[#5f6fff]">Care</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/patients"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? "text-[#5f6fff] bg-[#5f6fff]/5"
                    : "text-gray-600 hover:text-[#5f6fff] hover:bg-[#5f6fff]/5"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/doctor-list"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? "text-[#5f6fff] bg-[#5f6fff]/5"
                    : "text-gray-600 hover:text-[#5f6fff] hover:bg-[#5f6fff]/5"
                }`
              }
            >
              Doctors
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? "text-[#5f6fff] bg-[#5f6fff]/5"
                    : "text-gray-600 hover:text-[#5f6fff] hover:bg-[#5f6fff]/5"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? "text-[#5f6fff] bg-[#5f6fff]/5"
                    : "text-gray-600 hover:text-[#5f6fff] hover:bg-[#5f6fff]/5"
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate("/favorites")}
              className="relative p-2 text-gray-600 hover:text-[#5f6fff] rounded-lg hover:bg-[#5f6fff]/5 transition-all duration-200 group"
              title="Favorites"
            >
              <FiHeart className="w-6 h-6" />
              {userData && favorites.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              )}
            </button>
            {userData ? (
              <div className="relative" ref={profileRef}>
                
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1.5 pr-3 rounded-full hover:bg-gray-100 transition-all duration-200 group border border-transparent hover:border-gray-200 shadow-sm hover:shadow-md"
                >
                  <div className="relative">
                    <img
                      src={userData.image}
                      alt={userData.name}
                      className="w-10 h-10 object-cover rounded-full ring-2 ring-white shadow-sm"
                    />
                    {userData.isAccountVerified && (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-white rounded-full p-0.5 shadow-sm">
                        <HiOutlineBadgeCheck className="w-4 h-4 text-green-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-start min-w-20">
                    <span className="text-sm font-semibold text-gray-800 line-clamp-1">
                      {userData.name}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium">
                      Account Settings
                    </span>
                  </div>
                  <FiChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden py-2 z-50 origin-top-right"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 mb-1">
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                          Signed in as
                        </p>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {userData.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="px-2 space-y-1">
                        {!userData.isAccountVerified && (
                          <button
                            onClick={() => {
                              navigate("/email-verify");
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-amber-600 hover:bg-amber-50 transition-colors duration-200 group"
                          >
                            <div className="p-1.5 bg-amber-100 rounded-lg group-hover:scale-110 transition-transform">
                              <FiShield className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-medium">
                              Verify Email
                            </span>
                          </button>
                        )}

                        <button
                          onClick={() => {
                            navigate("/myprofile");
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-[#5f6fff] transition-all duration-200 group"
                        >
                          <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#5f6fff]/10 group-hover:scale-110 transition-all">
                            <FiUser className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">
                            My Profile
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            navigate("/favorites");
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-[#5f6fff] transition-all duration-200 group"
                        >
                          <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#5f6fff]/10 group-hover:scale-110 transition-all">
                            <FiHeart className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">
                            Favorites
                          </span>
                        </button>
                        <button
                          onClick={() => {
                            navigate("/my-documents");
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-[#5f6fff] transition-all duration-200 group"
                        >
                          <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#5f6fff]/10 group-hover:scale-110 transition-all">
                            <FiFileText className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">
                            My Documents
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            navigate("/myappointments");
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-gray-50 hover:text-[#5f6fff] transition-all duration-200 group"
                        >
                          <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-[#5f6fff]/10 group-hover:scale-110 transition-all">
                            <FiCalendar className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">
                            Appointments
                          </span>
                        </button>
                      </div>

                      <div className="mt-2 pt-2 border-t border-gray-100 px-2">
                        <button
                          onClick={logout}
                          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 group"
                        >
                          <div className="p-1.5 bg-red-100 rounded-lg group-hover:scale-110 transition-transform">
                            <FiLogOut className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2.5 bg-linear-to-r from-[#5f6fff] to-[#7a86ff] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#5f6fff]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
                >
                  Sign Up Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div
                className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></div>
              <div
                className={`w-5 h-0.5 bg-gray-600 my-1 transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
              ></div>
              <div
                className={`w-5 h-0.5 bg-gray-600 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col space-y-1">
              <NavLink
                to="/patients"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                    isActive
                      ? "text-[#5f6fff] bg-[#5f6fff]/5"
                      : "text-gray-600 hover:text-[#5f6fff] hover:bg-[#5f6fff]/5"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/doctor-list"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                    isActive
                      ? "text-[#5f6fff] bg-[#5f6fff]/5"
                      : "text-gray-600 hover:text-[#5f6fff] hover:bg-[#5f6fff]/5"
                  }`
                }
              >
                Doctors
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                    isActive
                      ? "text-[#5f6fff] bg-[#5f6fff]/5"
                      : "text-gray-600 hover:text-[#5f6fff] hover:bg-[#5f6fff]/5"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                    isActive
                      ? "text-[#5f6fff] bg-[#5f6fff]/5"
                      : "text-gray-600 hover:text-[#5f6fff] hover:bg-[#5f6fff]/5"
                  }`
                }
              >
                Contact
              </NavLink>
              
              {userData && (
                <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col space-y-1">
                  <div className="px-4 py-2 flex items-center space-x-3 mb-2">
                    <img
                      src={userData.image}
                      alt={userData.name}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{userData.name}</p>
                      <p className="text-[10px] text-gray-500">{userData.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/myprofile");
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-[#5f6fff] py-3 px-4 rounded-lg hover:bg-[#5f6fff]/5 transition-all duration-200 font-medium"
                  >
                    <FiUser className="w-5 h-5" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate("/favorites");
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-[#5f6fff] py-3 px-4 rounded-lg hover:bg-[#5f6fff]/5 transition-all duration-200 font-medium"
                  >
                    <FiHeart className="w-5 h-5" />
                    <span>Favorites</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/my-documents");
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-[#5f6fff] py-3 px-4 rounded-lg hover:bg-[#5f6fff]/5 transition-all duration-200 font-medium"
                  >
                    <FiFileText className="w-5 h-5" />
                    <span>My Documents</span>
                  </button>
                  <button
                    onClick={() => {
                      navigate("/myappointments");
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-gray-600 hover:text-[#5f6fff] py-3 px-4 rounded-lg hover:bg-[#5f6fff]/5 transition-all duration-200 font-medium"
                  >
                    <FiCalendar className="w-5 h-5" />
                    <span>Appointments</span>
                  </button>
                  
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-600 hover:bg-red-50 py-3 px-4 rounded-lg transition-all duration-200 font-medium mt-2"
                  >
                    <FiLogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}

              {!userData && (
                <div className="flex flex-col space-y-2 pt-4 mt-2 border-t border-gray-100">
                  <button 
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="px-5 py-3 text-gray-600 hover:text-[#5f6fff] font-medium transition-colors duration-200 text-left"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    className="px-6 py-3 bg-linear-to-r from-[#5f6fff] to-[#7a86ff] text-white font-medium rounded-xl hover:shadow-lg hover:shadow-[#5f6fff]/30 transition-all duration-200"
                  >
                    Sign Up Free
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
