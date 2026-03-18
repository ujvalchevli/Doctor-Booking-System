import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

function HowItWorks() {
  return (
    <div>
      {/* How it Works Section */}
      <div className="mt-15 mb-10">
        <div className="text-center mb-12">
          <span className="text-[#5f6fff] font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            How it Works?
          </h2>
          <p className="text-gray-600 mt-2">
            4 Easy Steps to Get Your Solution
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="relative group">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-[#5f6fff] text-white flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Search Doctor
              </h3>
              <p className="text-gray-500">
                Choose from 1000+ verified doctors
              </p>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 text-[#5f6fff]">
              <FiArrowRight className="w-6 h-6" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative group">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-[#5f6fff] text-white flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Check Profile
              </h3>
              <p className="text-gray-500">
                View experience & patient reviews
              </p>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 text-[#5f6fff]">
              <FiArrowRight className="w-6 h-6" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative group">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-[#5f6fff] text-white flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Book Slot
              </h3>
              <p className="text-gray-500">Choose convenient date & time</p>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 text-[#5f6fff]">
              <FiArrowRight className="w-6 h-6" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="group">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-[#5f6fff] text-white flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Get Treatment
              </h3>
              <p className="text-gray-500">Consult & get best solution</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
