import React, { useContext, useState, useMemo, useEffect } from "react";
import {
  FiSearch,
  FiFilter,
  FiStar,
  FiMapPin,
  FiClock,
  FiVideo,
  FiCalendar,
  FiChevronRight,
  FiHeart,
} from "react-icons/fi";
import { FaUserMd, FaStethoscope, FaRupeeSign } from "react-icons/fa";
import { MdVerified, MdLocalHospital } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function DoctorList() {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors, favorites, toggleFavorite } = useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("All Specialties");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    if (speciality) {
      setFilterSpecialty(speciality);
    } else {
      setFilterSpecialty("All Specialties");
    }
  }, [speciality]);

  const filteredDoctors = useMemo(() => {
    return doctors
      .filter((doc) => {
        const matchesSearch =
          doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.speciality.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty =
          filterSpecialty === "All Specialties" ||
          doc.speciality.toLowerCase() === filterSpecialty.toLowerCase();
        return matchesSearch && matchesSpecialty;
      })
      .sort((a, b) => {
        if (sortBy === "experience") {
          return parseInt(b.experience) - parseInt(a.experience);
        } else if (sortBy === "fee-low") {
          return a.fees - b.fees;
        } else if (sortBy === "fee-high") {
          return b.fees - a.fees;
        } else {
          return 0; // Default sort
        }
      });
  }, [doctors, searchTerm, filterSpecialty, sortBy]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#5f6fff] font-semibold text-sm uppercase tracking-wider">
            Our Experts
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mt-2">
            Find Your Doctor
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Search from verified specialists and book your appointment instantly
          </p>
        </div>

        {/* Search and Filter Bar - UI Only */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input - UI Only */}
            <div className="md:col-span-2 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by doctor, specialty, or hospital..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] transition-all"
              />
            </div>

            {/* Specialty Filter - UI Only */}
            <div className="relative">
              <select
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] appearance-none bg-white cursor-pointer"
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
              >
                <option value="All Specialties">All Specialties</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Orthopedic Surgeon">Orthopedic Surgeon</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="General Physician">General Physician</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
                <option value="Gynecologist">Gynecologist</option>
              </select>
              <FiFilter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            {/* Sort By - UI Only */}
            <div className="relative">
              <select
                className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] appearance-none bg-white cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Top Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="fee-low">Fee: Low to High</option>
                <option value="fee-high">Fee: High to Low</option>
              </select>
              <FiChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">
              {filteredDoctors.length}
            </span>{" "}
            doctors found
          </p>
          <button className="md:hidden flex items-center text-[#5f6fff] font-medium">
            <FiFilter className="mr-2" />
            Filters
          </button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDoctors.map((doctor, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              onClick={() => navigate(`/appointment/${doctor._id}`)}
            >
              {/* Doctor Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

                {/* Favorite Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(doctor._id);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                >
                  <FiHeart className={`w-5 h-5 ${favorites.includes(doctor._id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </button>

                {/* Verified Badge */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="bg-[#5f6fff] text-white px-3 py-1 rounded-full text-xs font-medium flex items-center shadow-lg">
                    <MdVerified className="w-4 h-4 mr-1" />
                    Verified
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-lg ${doctor.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    <div className={`w-2 h-2 rounded-full mr-1.5 ${doctor.available ? 'bg-white animate-pulse' : 'bg-white'}`}></div>
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-6">
                {/* Name and Rating */}
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {doctor.name}
                    </h3>
                    <p className="text-[#5f6fff] font-medium flex items-center">
                      <FaStethoscope className="w-4 h-4 mr-1" />
                      {doctor.speciality}
                    </p>
                  </div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                    <FiStar className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold text-gray-900">
                      4.8
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MdLocalHospital className="w-4 h-4 mr-2 text-gray-400" />
                    {doctor.degree}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiMapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {doctor.address}
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <FiClock className="w-4 h-4 mr-2 text-gray-400" />
                    {doctor.experience} experience
                  </div>
                </div>

                {/* Languages */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                    {doctor.lunguage1}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                    {doctor.lunguage2}
                  </span>
                </div>

                {/* Fee and Book Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-sm text-gray-500">
                      Consultation Fee
                    </span>
                    <div className="flex items-center">
                      <FaRupeeSign className="w-4 h-4 text-gray-900" />
                      <span className="text-2xl font-bold text-gray-900">
                        {doctor.fees}
                      </span>
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-[#5f6fff] text-white font-medium rounded-xl hover:bg-[#4a5ae0] transition-colors shadow-lg shadow-[#5f6fff]/30 flex items-center">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 border-2 border-[#5f6fff] text-[#5f6fff] font-semibold rounded-xl hover:bg-[#5f6fff] hover:text-white transition-all duration-300">
            Load More Doctors
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 bg-linear-to-r from-[#5f6fff]/10 to-purple-100/30 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#5f6fff] rounded-full flex items-center justify-center mb-3">
                <MdVerified className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">100% Verified</h4>
              <p className="text-sm text-gray-500">All doctors verified</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#5f6fff] rounded-full flex items-center justify-center mb-3">
                <FaUserMd className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">50+ Experts</h4>
              <p className="text-sm text-gray-500">Multi-speciality</p>
            </div>
            {/* <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#5f6fff] rounded-full flex items-center justify-center mb-3">
                <FiVideo className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">Video Consult</h4>
              <p className="text-sm text-gray-500">Available 24/7</p>
            </div> */}
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[#5f6fff] rounded-full flex items-center justify-center mb-3">
                <FiClock className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">Instant Booking</h4>
              <p className="text-sm text-gray-500">No waiting</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorList;
