import React from "react";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <MdLocalHospital className="w-8 h-8 text-[#5f6fff]" />
              <span className="text-xl font-bold">
                Medi<span className="text-[#5f6fff]">Care</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Providing quality healthcare services since 2010.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-[#5f6fff] rounded-full flex items-center justify-center transition-colors"
              >
                <FaFacebookF className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-[#5f6fff] rounded-full flex items-center justify-center transition-colors"
              >
                <FaTwitter className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-[#5f6fff] rounded-full flex items-center justify-center transition-colors"
              >
                <FaInstagram className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-[#5f6fff] rounded-full flex items-center justify-center transition-colors"
              >
                <FaLinkedinIn className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#5f6fff] transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#5f6fff] transition-colors text-sm"
                >
                  Our Doctors
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#5f6fff] transition-colors text-sm"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#5f6fff] transition-colors text-sm"
                >
                  Appointments
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#5f6fff] transition-colors text-sm"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">General Consultation</li>
              <li className="text-gray-400 text-sm">Emergency Care</li>
              <li className="text-gray-400 text-sm">Pharmacy</li>
              <li className="text-gray-400 text-sm">Health Checkups</li>
              <li className="text-gray-400 text-sm">Diagnostic Center</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-[#5f6fff] shrink-0" />
                <span className="text-gray-400 text-sm">
                  123 Healthcare Ave, Mumbai
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-[#5f6fff]" />
                <span className="text-gray-400 text-sm">+91 12345 67890</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-[#5f6fff]" />
                <span className="text-gray-400 text-sm">info@medicare.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiClock className="w-5 h-5 text-[#5f6fff]" />
                <span className="text-gray-400 text-sm">24/7 Emergency</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 MediCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
