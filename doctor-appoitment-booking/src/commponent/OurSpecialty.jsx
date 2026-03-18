import React from "react";
import { useNavigate } from "react-router-dom";

function OurSpecialty() {
  const navigate = useNavigate();
  const specialties = [
    {
      id: 1,
      name: "Cardiologist",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ),
      description: "Heart specialists",
      doctors: 24,
      color: "from-red-500 to-pink-500",
    },
    {
      id: 2,
      name: "Neurologist",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
        </svg>
      ),
      description: "Brain & nerves",
      doctors: 18,
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: 3,
      name: "Dermatologist",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
      description: "Skin specialists",
      doctors: 15,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 4,
      name: "Pediatrician",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-9c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm4 0c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
        </svg>
      ),
      description: "Child care",
      doctors: 20,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: 5,
      name: "Orthopedic Surgeon",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14 4h-4v2h4V4zm6 10v-2h-4v2h4zm-10 0v-2H6v2h4zm12-6h-8v2h8V8zM4 8H2v2h2V8zm16 8h-4v2h4v-2zM6 16H4v2h2v-2z" />
        </svg>
      ),
      description: "Bone & joints",
      doctors: 22,
      color: "from-orange-500 to-amber-500",
    },
    {
      id: 6,
      name: "General Physician",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm4 8h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V7c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      ),
      description: "Primary care",
      doctors: 35,
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: 7,
      name: "Gastroenterologist",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      description: "Digestive system",
      doctors: 13,
      color: "from-lime-500 to-green-500",
    },
    {
      id: 8,
      name: "Gynecologist",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      description: "Women's health",
      doctors: 19,
      color: "from-fuchsia-500 to-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#5f6fff] font-semibold text-sm uppercase tracking-wider">
            Our Specialties
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 mb-4">
            Expert Care Across All{" "}
            <span className="text-[#5f6fff]">Specialties</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We have highly specialized doctors across 50+ departments to provide
            you with the best healthcare
          </p>
        </div>

        {/* Stats Banner */}
        <div className="bg-linear-to-r from-[#5f6fff]/10 to-purple-100/30 rounded-2xl p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#5f6fff] mb-2">50+</div>
              <div className="text-gray-600">Specialties</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#5f6fff] mb-2">200+</div>
              <div className="text-gray-600">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#5f6fff] mb-2">15k+</div>
              <div className="text-gray-600">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#5f6fff] mb-2">24/7</div>
              <div className="text-gray-600">Emergency Care</div>
            </div>
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {specialties.map((specialty) => (
            <div
              key={specialty.id}
              onClick={() => navigate(`/doctor-list/${specialty.name}`)}
              className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
            >
              {/* Icon with Gradient Background */}
              <div
                className={`w-16 h-16 rounded-2xl bg-linear-to-br ${specialty.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{specialty.icon}</div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#5f6fff] transition-colors">
                {specialty.name}
              </h3>
              <p className="text-gray-500 text-sm mb-3">
                {specialty.description}
              </p>

              {/* Doctor Count */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#5f6fff] font-medium">
                  {specialty.doctors}+ Doctors
                </span>
                <svg
                  className="w-5 h-5 text-gray-400 group-hover:text-[#5f6fff] group-hover:translate-x-1 transition-all"
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
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 rounded-2xl bg-[#5f6fff] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

       


        {/* Emergency Banner */}
        <div className="mt-20 bg-linear-to-r from-[#5f6fff] to-[#8a96ff] rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-16 -mb-16"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-3xl font-bold mb-2">Need Emergency Care?</h3>
              <p className="text-white/90 text-lg">
                24/7 emergency services available for immediate assistance
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-[#5f6fff] font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300">
                Call Emergency
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                Find Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurSpecialty;
