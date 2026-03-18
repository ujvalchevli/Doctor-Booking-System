import React, { useContext, useState } from "react";
import {
  FiMail,
  FiLock,
  FiUser,
  FiPhone,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { MdLocalHospital } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

// Doctor image
const doctorImage =
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1964&auto=format&fit=crop";

function Login() {
  const [state, setState] = useState("register");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (state === "register") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          phone,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/email-verify");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });
        if (data.success) {
          setIsLoggedin(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#5f6fff]/10 via-white to-purple-100/30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Side - Image with Overlay */}
          <div className="lg:w-1/2 relative overflow-hidden">
            <img
              src={doctorImage}
              alt="Medical professionals"
              className="w-full h-full object-cover absolute inset-0"
              style={{ minHeight: "600px" }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Content Overlay */}
            <div className="relative z-10 p-8 lg:p-12 flex flex-col justify-between h-full min-h-150">
              <div
                onClick={() => navigate("/")}
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all group"
                title="Back to Home"
              >
                <IoMdArrowRoundBack className="text-white text-2xl group-hover:-translate-x-1 transition-transform" />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-8">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <MdLocalHospital className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">
                    Medi<span className="text-white/90">Care</span>
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  {state === "register"
                    ? "Join Our Community"
                    : "Welcome Back!"}
                </h2>
                <p className="text-white/80 text-lg mb-8">
                  {state === "register"
                    ? "Create an account and start your healthcare journey with us"
                    : "Your health journey continues here"}
                </p>
              </div>

              {/* Testimonial */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <p className="text-white/90 text-sm italic mb-4">
                  "The best healthcare platform I've ever used. Booking
                  appointments is so easy and convenient."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                    R
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-medium">Rahul Sharma</p>
                    <p className="text-white/60 text-xs">Patient since 2022</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div>
                  <div className="text-2xl font-bold text-white">50k+</div>
                  <div className="text-white/60 text-xs">Happy Patients</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">200+</div>
                  <div className="text-white/60 text-xs">Expert Doctors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-white/60 text-xs">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="max-w-md mx-auto">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {state === "register" ? "Create Account" : "Welcome Back!"}
                </h1>
                <p className="text-gray-600 text-sm">
                  {state === "register"
                    ? "Please fill in your details to create an account"
                    : "Please log in to your account to continue"}
                </p>
              </div>

              {/* Form */}
              <form className="space-y-5" onSubmit={handleSubmit}>
                {state === "register" && (
                  <>
                    {/* Full Name */}
                    <div className="relative">
                      <FiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                      />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                      <FiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                      />
                    </div>
                  </>
                )}

                {/* Email (common for both) */}
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#5f6fff]"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {state === "register" && (
                  <>
                    {/* Confirm Password */}
                    <div className="relative">
                      <FiLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#5f6fff]"
                      >
                        {showConfirmPassword ? (
                          <FiEyeOff className="w-5 h-5" />
                        ) : (
                          <FiEye className="w-5 h-5" />
                        )}
                      </button>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        className="w-4 h-4 text-[#5f6fff] border-gray-300 rounded focus:ring-[#5f6fff]"
                      />
                      <label
                        htmlFor="terms"
                        className="ml-2 text-sm text-gray-600"
                      >
                        I agree to the{" "}
                        <a href="#" className="text-[#5f6fff] hover:underline">
                          Terms
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#5f6fff] hover:underline">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </>
                )}

                {state === "login" && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        className="w-4 h-4 text-[#5f6fff] border-gray-300 rounded focus:ring-[#5f6fff]"
                      />
                      <label
                        htmlFor="remember"
                        className="ml-2 text-sm text-gray-600"
                      >
                        Remember me
                      </label>
                    </div>
                    <p
                      onClick={() => navigate("/reset-password")}
                      className="text-sm text-[#5f6fff] hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-[#5f6fff]/30 transition-all duration-300 flex items-center justify-center group"
                >
                  {state === "register" ? "Create Account" : "Login"}
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Social Login */}
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-4">
                  <p className="text-center text-sm text-gray-600">
                    Are you a doctor?
                    <span
                      className="text-[#5f6fff] hover:underline cursor-pointer "
                      onClick={() => navigate("/doctor-register")}
                    >
                      Register here
                    </span>
                  </p>
                </div>
              </div>

              {/* Switch between login/register */}
              <p className="text-center text-sm text-gray-600 mt-6">
                {state === "register"
                  ? "Already have an account?"
                  : "Don't have an account?"}
                <button
                  onClick={() =>
                    setState(state === "register" ? "login" : "register")
                  }
                  className="ml-1 text-[#5f6fff] font-medium hover:underline focus:outline-none"
                >
                  {state === "register" ? "Login" : "Register"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
