import React, { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function DoctorEmailVerify() {
  const { backendUrl,doctorData } = useContext(AppContext);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(90); // 1:30 in seconds
  const [canResend, setCanResend] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, "0")}:${sec
      .toString()
      .padStart(2, "0")}`;
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus move forward
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const onVerifyHandler = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length < 6) {
      return toast.error("Please enter 6-digit OTP");
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/doctor/verify-email",
        { otp: otpString },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        // Registration complete flow
        toast.success("Registration Successful!");
        navigate("/doctor-home");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onResendOtp = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/doctor/send-verify-otp",
        {},
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setTimer(90);
        setCanResend(false);
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
    <div className="min-h-screen bg-linear-to-br from-[#5f6fff]/10 via-white to-purple-100/30 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#5f6fff] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                1
              </div>
              <div className="w-12 h-1 bg-[#5f6fff] mx-1"></div>
              <div className="w-8 h-8 bg-[#5f6fff] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                2
              </div>
              <div className="w-12 h-1 bg-gray-200 mx-1"></div>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-sm">
                3
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-2 mb-6">
            <span>Register</span>
            <span className="text-[#5f6fff] font-medium">Verify</span>
            <span>Complete</span>
          </div>

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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Email Verification
            </h2>
            <div className="flex items-center justify-center mt-2 bg-blue-50 p-2 rounded-lg">
              <svg
                className="w-4 h-4 text-[#5f6fff] mr-2"
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
              <p className="text-sm text-gray-700">
                Verification code sent to{" "}
                <span className="font-semibold text-[#5f6fff]">
                  {doctorData?.email || "your email"}
                </span>
              </p>
            </div>
          </div>

          {/* OTP Input Fields */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
              Enter 6-digit verification code
            </label>
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#5f6fff] focus:ring-4 focus:ring-[#5f6fff]/10 transition-all"
                />
              ))}
            </div>
          </div>

          {/* Timer */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-[#5f6fff] mr-2"
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
                <span className="text-sm text-gray-600">Time remaining</span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-[#5f6fff]">
                  {formatTime(timer)}
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-[#5f6fff] h-1.5 rounded-full transition-all duration-1000"
                style={{ width: `${(timer / 90) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onVerifyHandler}
              disabled={loading}
              className="w-full bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-[#5f6fff]/30 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>

            <button
              onClick={onResendOtp}
              disabled={!canResend || loading}
              className="w-full border-2 border-[#5f6fff] text-[#5f6fff] py-4 rounded-xl font-semibold hover:bg-[#5f6fff] hover:text-white transition-all duration-300 disabled:opacity-30"
            >
              Resend Code
            </button>
          </div>

          {/* Edit Email */}
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/doctor-register")}
              className="text-sm text-gray-500 hover:text-[#5f6fff] flex items-center justify-center mx-auto"
            >
              <svg
                className="w-4 h-4 mr-1"
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
              Edit details
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Didn't receive the code? Check your spam folder or{" "}
              <button
                disabled={!canResend}
                onClick={onResendOtp}
                className="text-[#5f6fff] hover:underline disabled:text-gray-300"
              >
                request new code
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorEmailVerify;