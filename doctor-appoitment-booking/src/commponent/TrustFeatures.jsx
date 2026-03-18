import React from "react";
import { BsShieldCheck } from "react-icons/bs";
import { FiHome, FiVideo } from "react-icons/fi";
import { MdVerified } from "react-icons/md";

function TrustFeatures() {
  return (
    <div>
      {/* Trust Features */}
      <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white/50 rounded-2xl border border-gray-100 ">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#5f6fff]/10 flex items-center justify-center">
            <MdVerified className="w-5 h-5 text-[#5f6fff]" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            Verified Doctors
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#5f6fff]/10 flex items-center justify-center">
            <FiVideo className="w-5 h-5 text-[#5f6fff]" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            Video Consult
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#5f6fff]/10 flex items-center justify-center">
            <FiHome className="w-5 h-5 text-[#5f6fff]" />
          </div>
          <span className="text-sm font-medium text-gray-700">Home Visit</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-[#5f6fff]/10 flex items-center justify-center">
            <BsShieldCheck className="w-5 h-5 text-[#5f6fff]" />
          </div>
          <span className="text-sm font-medium text-gray-700">
            Secure Payment
          </span>
        </div>
      </div>
    </div>
  );
}

export default TrustFeatures;
