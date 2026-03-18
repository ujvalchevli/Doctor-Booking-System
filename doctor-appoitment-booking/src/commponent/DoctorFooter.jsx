import React from "react";

function DoctorFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <div className="text-sm text-gray-500">
          © 2024 MediCare. All rights reserved.
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-[#5f6fff] transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-[#5f6fff] transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-[#5f6fff] transition-colors"
          >
            Help Center
          </a>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs text-gray-500">All systems operational</span>
        </div>
      </div>
    </footer>
  );
}

export default DoctorFooter;
