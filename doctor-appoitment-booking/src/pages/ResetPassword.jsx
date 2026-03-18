import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiShield,
  FiArrowRight,
  FiArrowLeft,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import { MdMarkEmailRead } from "react-icons/md";

function ResetPassword() {
  const { backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  // State management
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Timer state
  const [timer, setTimer] = useState(90);

  // Refs for OTP inputs
  const inputRefs = useRef([]);

  // Handle OTP input navigation
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const pasteValues = pasteData.split("");
    pasteValues.forEach((value, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = value;
      }
    });
    if (pasteValues.length > 0) {
      inputRefs.current[Math.min(pasteValues.length, 5)].focus();
    }
  };

  // Timer logic
  useEffect(() => {
    let interval;
    if (isOtpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOtpSent, timer]);

  // Step 1 & Resend: Send OTP to email
  const sendOtp = async (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/reset-otp", {
        email,
      });
      if (data.success) {
        toast.success(data.message);
        setIsOtpSent(true);
        setTimer(90); // Reset timer
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Reset password using OTP
  const resetPassword = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((input) => input.value).join("");

    if (otp.length < 6) {
      return toast.error("Please enter 6-digit OTP");
    }

    setIsLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        },
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#5f6fff]/10 via-white to-purple-100/30 flex items-center justify-center p-4">
      {/* Container */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20 backdrop-blur-sm">
        {!isOtpSent ? (
          /* Step 1: Request OTP */
          <form onSubmit={sendOtp}>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-linear-to-br from-[#5f6fff] to-[#8a96ff] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#5f6fff]/20">
                <FiMail className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Reset Password
              </h1>
              <p className="text-gray-500 text-sm">
                Enter your email to receive an OTP
              </p>
            </div>

            <div className="relative mb-6">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-[#5f6fff]/30 transition-all duration-300 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                <>
                  Send OTP
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full text-center text-sm text-gray-500 mt-6 flex items-center justify-center hover:text-[#5f6fff] transition-colors"
            >
              <FiArrowLeft className="mr-1" /> Back to Login
            </button>
          </form>
        ) : (
          /* Step 2: Reset Password Form */
          <form onSubmit={resetPassword}>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-linear-to-br from-[#5f6fff] to-[#8a96ff] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#5f6fff]/20">
                <MdMarkEmailRead className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                New Password
              </h1>
              <p className="text-gray-500 text-sm">
                Enter OTP and your new password
              </p>
            </div>

            {/* OTP Input Fields */}
            <div
              className="flex justify-between gap-2 mb-2"
              onPaste={handlePaste}
            >
              {Array(6)
                .fill(0)
                .map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputRefs.current[index] = el)}
                    onInput={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:border-[#5f6fff] focus:ring-4 focus:ring-[#5f6fff]/10 transition-all duration-200"
                    required
                  />
                ))}
            </div>

            {/* Timer and Resend */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center text-sm text-gray-500">
                <FiShield className="mr-1 text-[#5f6fff]" />
                <span>6-digit OTP</span>
              </div>
              <p className="text-xs text-gray-500">
                {timer > 0 ? (
                  <span className="flex items-center">
                    <span className="mr-1">Resend in</span>
                    <span className="font-bold text-[#5f6fff] bg-[#5f6fff]/10 px-2 py-1 rounded-lg">
                      {Math.floor(timer / 60)}:
                      {String(timer % 60).padStart(2, "0")}
                    </span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={sendOtp}
                    className="text-[#5f6fff] font-semibold hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </p>
            </div>

            {/* Password Field */}
            <div className="relative mb-6">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full pl-12 pr-12 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5f6fff] transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-[#5f6fff]/30 transition-all duration-300 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Resetting...
                </div>
              ) : (
                <>
                  Reset Password
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOtpSent(false);
                setTimer(90);
              }}
              className="w-full text-center text-sm text-gray-500 mt-6 flex items-center justify-center hover:text-[#5f6fff] transition-colors"
            >
              <FiArrowLeft className="mr-1" /> Change Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
