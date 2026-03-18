import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { FiHeart, FiStar, FiMapPin, FiClock, FiCalendar } from "react-icons/fi";
import { FaUserMd, FaStethoscope, FaRupeeSign } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Favorites() {
  const { backendUrl, isLoggedin, toggleFavorite, favorites } = useContext(AppContext);
  const [favoriteDoctors, setFavoriteDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchFavoriteDoctors = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/favorites");
      if (data.success) {
        setFavoriteDoctors(data.favorites.map(fav => fav.docId));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedin) {
      fetchFavoriteDoctors();
    } else {
      navigate("/login");
    }
  }, [isLoggedin, favorites]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6fff]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your Favorite Doctors
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Quickly access your most trusted healthcare providers.
        </p>
      </div>

      {favoriteDoctors.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <FiHeart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Favorites Yet</h3>
          <p className="text-gray-500 mb-6">Start favoriting doctors to see them here.</p>
          <button
            onClick={() => navigate("/doctor-list")}
            className="px-6 py-3 bg-[#5f6fff] text-white font-medium rounded-xl hover:bg-[#4a5ae0] transition-colors"
          >
            Browse Doctors
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteDoctors.map((doctor, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
            >
              {/* Doctor Image */}
              <div className="relative h-56 overflow-hidden bg-blue-50">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onClick={() => { navigate(`/appointment/${doctor._id}`); window.scrollTo(0,0) }}
                />
                
                {/* Favorite Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(doctor._id);
                  }}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors z-10"
                >
                  <FiHeart className={`w-5 h-5 ${favorites.includes(doctor._id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </button>

                {/* Verified Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
                  <div className="bg-[#5f6fff] text-white px-2 py-1 rounded-full text-[10px] font-medium flex items-center shadow-lg">
                    <MdVerified className="w-3 h-3 mr-1" />
                    Verified
                  </div>
                  <div className={`px-2 py-1 rounded-full text-[10px] font-bold flex items-center shadow-lg ${doctor.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full mr-1 ${doctor.available ? 'bg-white animate-pulse' : 'bg-white'}`}></div>
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="p-5" onClick={() => { navigate(`/appointment/${doctor._id}`); window.scrollTo(0,0) }}>
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
      )}
    </div>
  );
}

export default Favorites;
