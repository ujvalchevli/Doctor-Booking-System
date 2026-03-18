import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiPlusCircle } from "react-icons/fi";

const Welcome = () => {
  const navigate = useNavigate();

  const selectionCards = [
    {
      id: "patient",
      title: "I am a Patient",
      description: "Find the best doctors and book your appointments in seconds.",
      icon: <FiUser className="w-8 h-8" />,
      color: "from-[#5f6fff] to-[#8a96ff]",
      path: "/patients",
      action: "Book Appointment",
    },
    {
      id: "doctor",
      title: "I am a Doctor",
      description: "Manage your practice, schedule, and connect with patients.",
      icon: <FiPlusCircle className="w-8 h-8" />,
      color: "from-emerald-500 to-teal-400",
      path: "/doctor-home",
      action: "Dashboard Access",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-4">
      {/* Background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[#5f6fff]/5 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-3xl opacity-60"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 relative z-10"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-12 h-12 bg-linear-to-br from-[#5f6fff] to-[#8a96ff] rounded-2xl flex items-center justify-center shadow-xl shadow-[#5f6fff]/20">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <span className="text-4xl font-bold bg-linear-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Medi<span className="text-[#5f6fff]">Care</span>
          </span>
        </div>
        <p className="text-gray-500 text-lg max-w-md mx-auto">
          Welcome to the next generation of healthcare management. Please select your role to continue.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl relative z-10">
        {selectionCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group cursor-pointer"
            onClick={() => navigate(card.path)}
          >
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 flex flex-col h-full relative overflow-hidden">
              {/* Card Decoration */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-bl-[5rem]`}></div>
              
              <div className={`w-16 h-16 bg-linear-to-br ${card.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-[#5f6fff]/10 group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-[#5f6fff] transition-colors">
                {card.title}
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {card.description}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest group-hover:text-[#5f6fff] transition-colors">
                  {card.action}
                </span>
                <div className={`p-3 bg-gray-50 rounded-xl group-hover:bg-linear-to-br ${card.color} group-hover:text-white transition-all duration-300`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 text-gray-400 text-sm"
      >
        Your health is our priority. © 2026 MediCare Inc.
      </motion.p>
    </div>
  );
};

export default Welcome;
