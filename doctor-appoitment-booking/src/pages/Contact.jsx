import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Contact() {
  const { backendUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    subject: "",
    message: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/contact/send",
        formData
      );
      if (data.success) {
        toast.success(data.message);
        setFormData({
          name: "",
          email: "",
          phonenumber: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#5f6fff]/10 via-white to-purple-100/30 py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5f6fff]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[#5f6fff] font-semibold text-sm uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mt-4 mb-6">
              Contact <span className="text-[#5f6fff]">Us</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Have questions? We're here to help. Reach out to us anytime and
              we'll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#5f6fff] to-[#8a96ff] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Visit Us
              </h3>
              <p className="text-gray-500 text-sm">
                123 Healthcare Avenue,
                <br />
                Medical District, Mumbai - 400001
              </p>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#5f6fff] to-[#8a96ff] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Call Us
              </h3>
              <p className="text-gray-500 text-sm">
                +91 12345 67890
                <br />
                +91 98765 43210
              </p>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#5f6fff] to-[#8a96ff] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Email Us
              </h3>
              <p className="text-gray-500 text-sm">
                info@medicare.com
                <br />
                support@medicare.com
              </p>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center group hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#5f6fff] to-[#8a96ff] rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Working Hours
              </h3>
              <p className="text-gray-500 text-sm">
                Mon-Sat: 9:00 AM - 8:00 PM
                <br />
                Sun: 10:00 AM - 2:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Send us a Message
              </h2>
              <p className="text-gray-600 mb-8">
                We'll get back to you within 24 hours
              </p>

              <form onSubmit={onSubmitHandler} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
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
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={onChangeHandler}
                      required
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
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
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={onChangeHandler}
                      required
                      placeholder="john@example.com"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
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
                    <input
                      type="tel"
                      name="phonenumber"
                      value={formData.phonenumber}
                      onChange={onChangeHandler}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l5 5a2 2 0 01.586 1.414V19a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2z"
                      />
                    </svg>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={onChangeHandler}
                      required
                      placeholder="Appointment, Query, etc."
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                    />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <svg
                      className="absolute left-4 top-6 text-gray-400 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    <textarea
                      rows="5"
                      name="message"
                      value={formData.message}
                      onChange={onChangeHandler}
                      required
                      placeholder="Write your message here..."
                      className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#5f6fff] to-[#8a96ff] text-white py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-[#5f6fff]/30 transition-all duration-300 flex items-center justify-center group"
                >
                  Send Message
                  <svg
                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden h-80">
                <iframe
                  src="https://maps.google.com/maps?q=Surat,%20Gujarat&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="map"
                  className="w-full h-full"
                ></iframe>
              </div>

              {/* Quick Contact */}
              <div className="bg-linear-to-br from-[#5f6fff] to-[#8a96ff] rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Emergency Contact</h3>
                <p className="text-white/90 mb-6">
                  For immediate medical assistance, our emergency services are
                  available 24/7.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-white/70">Emergency</p>
                      <p className="text-xl font-bold">108</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <svg
                      className="w-6 h-6 text-white"
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
                    <div>
                      <p className="text-sm text-white/70">Ambulance</p>
                      <p className="text-xl font-bold">102</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-100 hover:bg-[#5f6fff] rounded-xl flex items-center justify-center transition-colors group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-100 hover:bg-[#5f6fff] rounded-xl flex items-center justify-center transition-colors group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-100 hover:bg-[#5f6fff] rounded-xl flex items-center justify-center transition-colors group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.044-.791-.008-1.735.165-2.595.18-.89 1.203-5.096 1.203-5.096s-.3-.6-.3-1.486c0-1.39.806-2.428 1.81-2.428.852 0 1.264.64 1.264 1.408 0 .857-.546 2.14-.828 3.33-.236.995.5 1.807 1.48 1.807 1.78 0 3.147-1.876 3.147-4.584 0-2.396-1.722-4.072-4.18-4.072-2.847 0-4.518 2.134-4.518 4.34 0 .858.33 1.78.743 2.28.083.1.094.188.07.29-.076.316-.244.995-.277 1.133-.044.183-.146.222-.336.134-1.247-.58-2.027-2.405-2.027-3.874 0-3.155 2.293-6.052 6.608-6.052 3.47 0 6.165 2.472 6.165 5.776 0 3.447-2.174 6.222-5.19 6.222-1.013 0-1.966-.527-2.29-1.15 0 0-.5 1.907-.622 2.374-.225.867-.834 1.95-1.242 2.61.936.29 1.93.447 2.96.447 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-gray-100 hover:bg-[#5f6fff] rounded-xl flex items-center justify-center transition-colors group"
                  >
                    <svg
                      className="w-6 h-6 text-gray-600 group-hover:text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#5f6fff] font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
              Find answers to common questions about our services and
              appointments
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I book an appointment?
              </h3>
              <p className="text-gray-600">
                You can book an appointment through our website by searching for
                a doctor, selecting a convenient time slot, and confirming your
                booking. It's quick and easy!
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I consult with a doctor online?
              </h3>
              <p className="text-gray-600">
                Yes, we offer video consultation services. You can choose the
                video consult option when booking your appointment.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What are your emergency services?
              </h3>
              <p className="text-gray-600">
                We provide 24/7 emergency services. You can call our emergency
                helpline at 108 for immediate assistance.
              </p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I cancel or reschedule an appointment?
              </h3>
              <p className="text-gray-600">
                You can cancel or reschedule your appointment through your
                account dashboard or by contacting our support team.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
