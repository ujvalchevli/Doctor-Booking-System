import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiMail, FiShield, FiArrowRight } from "react-icons/fi";
import { MdVerifiedUser } from "react-icons/md";

function EmailVerify() {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const { backendUrl, isLoggedin, userData, getUserData } =
    useContext(AppContext);

  const [timer, setTimer] = useState(90);

  const resendOtp = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/sendVerifyOtp",
        {},
        { withCredentials: true },
      );
      if (data.success) {
        toast.success(data.message);
        setTimer(90);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const otp = inputRefs.current.map((input) => input.value).join("");
      const { data } = await axios.post(backendUrl + "/api/auth/verifyEmail", {
        otp,
      });

      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#5f6fff]/10 via-white to-purple-100/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 lg:p-10 border border-white/20 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-linear-to-br from-[#5f6fff] to-[#8a96ff] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#5f6fff]/20">
            <FiShield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Verify Account
          </h1>
          <p className="text-gray-600 text-sm">
            We have sent a 6-digit OTP to your email address. Please enter it
            below to verify your account.
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-8">
          <div
            className="flex justify-between gap-2 sm:gap-4"
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
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-[#5f6fff] focus:ring-4 focus:ring-[#5f6fff]/10 transition-all duration-200"
                  required
                />
              ))}
          </div>

          <button
            type="submit"
            className="w-full bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white py-4 rounded-2xl font-semibold hover:shadow-xl hover:shadow-[#5f6fff]/30 transition-all duration-300 flex items-center justify-center group"
          >
            Verify Email
            <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive code?{" "}
            <button
              onClick={resendOtp}
              disabled={timer > 0}
              className={`font-semibold hover:underline ${
                timer > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#5f6fff]"
              }`}
            >
              {timer > 0
                ? `Resend OTP in ${Math.floor(timer / 60)}:${String(
                    timer % 60,
                  ).padStart(2, "0")}`
                : "Resend OTP"}
            </button>
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerify;
