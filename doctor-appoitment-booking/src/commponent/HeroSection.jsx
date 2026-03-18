import React from "react";
import {
  FiPlay,
  FiArrowRight,
  FiVideo,
  FiHome,
  FiCheckCircle,
} from "react-icons/fi";
import { MdVerified, MdStar } from "react-icons/md";
import { FaStethoscope } from "react-icons/fa";
import { BsShieldCheck } from "react-icons/bs";
import doctorImage from "../assets/happy-doctor-holding-clipboard-with-patients.jpg";

function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50/30 via-white to-purple-50/30"></div>
      <div className="absolute top-40 right-0 w-96 h-96 bg-[#5f6fff]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-20 w-80 h-80 bg-purple-100/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              <BsShieldCheck className="w-5 h-5 text-[#5f6fff] mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Verified Medical Professionals
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                Find Your
                <span className="block text-[#5f6fff]">Trusted Doctor</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-lg">
                Book appointments with India's top specialists.
                <span className="block text-[#5f6fff] font-semibold mt-1">
                  100% Verified & Trusted
                </span>
              </p>
            </div>

            {/* Features List */}
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">50+ Experts</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">24/7 Service</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">200+ Beds</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-700">Video Consult</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button className="group px-8 py-4 bg-[#5f6fff] text-white font-semibold rounded-xl hover:bg-[#4a5ae0] transition-all duration-300 flex items-center shadow-lg shadow-[#5f6fff]/30">
                Book Appointment
                <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="flex items-center space-x-3 px-6 py-4 text-gray-700 hover:text-[#5f6fff] transition-colors group">
                <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-[#5f6fff]/10 flex items-center justify-center transition-colors">
                  <FiPlay className="w-5 h-5 text-[#5f6fff] ml-0.5" />
                </div>
                <span className="font-medium">Watch Introduction</span>
              </button>
            </div>

            {/* Stats with Icons */}
            <div className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5f6fff]">15+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5f6fff]">50k+</div>
                <div className="text-sm text-gray-500">Happy Patients</div>
              </div>
              <div className="w-px h-12 bg-gray-200"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#5f6fff]">98%</div>
                <div className="text-sm text-gray-500">Positive Feedback</div>
              </div>
            </div>
          </div>

          {/* Right Content - Doctor Image Area */}
          <div className="relative">
            {/* Main Image Container */}
            <div className="relative z-10">
              {/* Image Frame */}
              <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
                {/* Your Doctor Image */}
                <img
                  src={doctorImage}
                  alt="Doctor"
                  className="w-full h-auto object-cover"
                  style={{
                    maxHeight: "600px",
                    width: "100%",
                    objectPosition: "center",
                  }}
                 
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#5f6fff]/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl"></div>

              {/* Pattern Dots */}
              <div className="absolute top-10 -right-8 w-24 h-24 opacity-20">
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-[#5f6fff] rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Cards */}

            {/* Experience Card */}
            <div className="hidden sm:block absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl p-4 z-20 animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-linear-to-br from-[#5f6fff] to-[#8a96ff] flex items-center justify-center text-white shadow-lg">
                  <FaStethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-gray-800">
                    15+ Years
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Medical Experience
                  </div>
                </div>
              </div>
            </div>

            {/* Rating Card */}
            <div
              className="hidden lg:block absolute -right-8 top-1/3 bg-white rounded-2xl shadow-xl p-4 z-20 animate-float"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MdStar key={star} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">
                    4.9/5 Rating
                  </div>
                  <div className="text-xs text-gray-500">
                    Based on 2.5k+ reviews
                  </div>
                </div>
              </div>
            </div>

            {/* Availability Card */}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;
