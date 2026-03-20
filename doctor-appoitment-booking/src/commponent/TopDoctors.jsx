import React, { useContext } from 'react';
import { FiStar, FiMapPin, FiClock, FiCalendar, FiArrowRight, FiHeart } from 'react-icons/fi';
import { FaUserMd, FaStethoscope, FaRupeeSign } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function TopDoctors() {
  const { doctors, favorites, toggleFavorite } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#5f6fff] font-semibold text-sm uppercase tracking-wider">
            Top Rated
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Our Top Doctors
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our most experienced and highly recommended medical specialists
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.slice(0, 4).map((doctor, index) => (
            <div
              key={index}
              onClick={() => { navigate(`/appointment/${doctor._id}`); window.scrollTo(0,0) }}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
            >
              {/* Doctor Image */}
              <div className="relative h-56 overflow-hidden bg-blue-50">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(doctor._id);
                  }}
                  className="absolute top-3 right-[50px] w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10 shadow-sm"
                >
                  <FiHeart
                    className={`w-5 h-5 ${favorites.includes(doctor._id) ? "text-red-500 fill-current" : "text-gray-600"}`}
                  />
                </button>
                
                {/* Verified Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <div className="bg-[#5f6fff] text-white px-2 py-1 rounded-full text-[10px] font-medium flex items-center shadow-lg">
                    <MdVerified className="w-3 h-3 mr-1" />
                    Verified
                  </div>
                  <div className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center shadow-lg ${doctor.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1 ${doctor.available ? 'bg-white animate-pulse' : 'bg-white'}`}></div>
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[10px] font-medium flex items-center shadow-sm pointer-events-none">
                  <FiStar className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                  <span>4.8</span>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-[#5f6fff] transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-[#5f6fff] font-medium text-sm flex items-center mb-2">
                  <FaStethoscope className="w-3 h-3 mr-1" />
                  {doctor.speciality}
                </p>

                <div className="space-y-1.5 mb-3">
                  <p className="text-xs text-gray-500 flex items-center">
                    <FaUserMd className="w-3 h-3 mr-1 text-gray-400" />
                    {doctor.experience} exp.
                  </p>
                  <p className="text-xs text-gray-500 flex items-center truncate">
                    <FiMapPin className="w-3 h-3 mr-1 text-gray-400" />
                    {doctor.address}
                  </p>
                </div>

                {/* Fee and Book Button */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-xs text-gray-500">Fee</span>
                    <div className="flex items-center">
                      <FaRupeeSign className="w-3 h-3 text-gray-900" />
                      <span className="text-lg font-bold text-gray-900">{doctor.fees}</span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#5f6fff] text-white text-sm font-medium rounded-lg hover:bg-[#4a5ae0] transition-colors shadow-sm shadow-[#5f6fff]/30 flex items-center">
                    <FiCalendar className="w-3 h-3 mr-1" />
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button 
            onClick={() => { navigate('/doctor-list'); window.scrollTo(0,0) }}
            className="inline-flex items-center px-6 py-3 border border-[#5f6fff] text-[#5f6fff] font-medium rounded-lg hover:bg-[#5f6fff] hover:text-white transition-all duration-300"
          >
            View All Doctors
            <FiArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TopDoctors;
