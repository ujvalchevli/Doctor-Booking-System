import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Appointment() {
  const { docId } = useParams();
  const { doctors, backendUrl, getDoctorsData, isLoggedin, getDoctorReviews, addReview, } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  const navigate = useNavigate();

  const bookAppointment = async () => {
    if (!isLoggedin) {
      toast.warn("Login to book appointment");
      return navigate("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/myappointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const fetchReviews = async () => {
    const data = await getDoctorReviews(docId);
    setReviews(data);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedin) {
      return toast.warn("Login to write a review");
    }
    const success = await addReview({ docId, rating, comment });
    if (success) {
      setComment("");
      setRating(5);
      setShowReviewForm(false);
      fetchReviews();
    }
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // getting current date
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      // setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
    fetchReviews();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  if (!docInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6fff]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          className="flex items-center text-gray-600 hover:text-[#5f6fff] mb-6"
          onClick={() => navigate(-1)}
        >
          <svg
            className="w-5 h-5 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Doctors
        </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Profile & Booking */}
          <div className="lg:col-span-1">
            {/* Doctor Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-4">
              {/* Doctor Image */}
              <div className="relative h-64">
                <img
                  src={docInfo.image}
                  alt={docInfo.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-2xl font-bold text-white">
                    {docInfo.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <p className="text-white/90">{docInfo.speciality}</p>
                    <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${docInfo.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                      {docInfo.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating & Stats */}
              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-5 h-5 text-yellow-400 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 font-semibold text-gray-900">4.9</span>
                  </div>
                  <span className="text-sm text-gray-500">50+ reviews</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-semibold text-gray-900">
                      {docInfo.experience}
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Section */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Book Appointment
                </h3>

                {/* Fee */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Consultation Fee</span>
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{docInfo.fees}
                    </span>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <div className="flex items-center gap-3 w-full overflow-x-scroll pb-2 custom-scrollbar">
                    {docSlots.length > 0 &&
                      docSlots.map((item, index) => (
                        <div
                          onClick={() => setSlotIndex(index)}
                          className={`text-center py-4 min-w-[3.5rem] rounded-xl cursor-pointer transition-all duration-200 border ${
                            slotIndex === index
                              ? "bg-[#5f6fff] text-white border-[#5f6fff] shadow-md shadow-[#5f6fff]/20"
                              : "bg-white text-gray-600 border-gray-100 hover:border-[#5f6fff]/30 hover:bg-gray-50"
                          }`}
                          key={index}
                        >
                          <p className="text-xs font-medium opacity-80 uppercase tracking-tighter">
                            {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                          </p>
                          <p className="text-lg font-bold mt-0.5">
                            {item[0] && item[0].datetime.getDate()}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Time Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <div className="flex items-center gap-2 w-full overflow-x-scroll pb-2 custom-scrollbar">
                    {docSlots.length > 0 &&
                      docSlots[slotIndex].map((item, index) => (
                        <p
                          onClick={() => setSlotTime(item.time)}
                          className={`text-sm font-medium px-4 py-2 rounded-full cursor-pointer whitespace-nowrap transition-all duration-200 border ${
                            item.time === slotTime
                              ? "bg-[#5f6fff] text-white border-[#5f6fff] shadow-sm shadow-[#5f6fff]/20"
                              : "text-gray-500 border-gray-100 hover:border-[#5f6fff]/30 hover:bg-gray-50"
                          }`}
                          key={index}
                        >
                          {item.time.toLowerCase()}
                        </p>
                      ))}
                  </div>
                </div>

                {/* Book Button */}
                <button
                  onClick={bookAppointment}
                  className="w-full py-3 bg-linear-to-r from-[#5f6fff] to-[#8a96ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!slotTime || !docInfo.available}
                >
                  {docInfo.available ? "Book Appointment" : "Doctor Currently Unavailable"}
                </button>

                {/* Availability Note */}
                <p className="text-xs text-gray-500 text-center mt-3">
                  Mon - Sat, 9:00 AM - 5:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Details, About, Reviews */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hospital Info Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#5f6fff]/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#5f6fff]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Medical Qualifications
                  </h3>
                  <p className="text-gray-600 flex items-center mt-1">
                    <svg
                      className="w-4 h-4 mr-1 text-gray-400"
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
                    {docInfo.address}
                  </p>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                About
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {docInfo.about}
              </p>
            </div>

            {/* Education & Qualifications */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Education & Qualifications
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="w-5 h-5 text-[#5f6fff] mr-3 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-600">{docInfo.degree}</span>
                </li>
              </ul>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Languages Spoken
              </h3>
              <div className="flex flex-wrap gap-2">
                {[docInfo.lunguage1, docInfo.lunguage2].filter(Boolean).map((lang, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Patient Reviews ({reviews.length})
                </h3>
                
              </div>

              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-sm italic">No reviews yet for this doctor.</p>
                ) : (
                  reviews.slice(0, 3).map((review, index) => (
                    <div key={index} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                      <img 
                        src={review.userId?.image} 
                        alt={review.userId?.name} 
                        className="w-12 h-12 rounded-full object-cover bg-gray-100"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-semibold text-gray-900">{review.userId?.name}</h4>
                          <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-md">
                            <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="ml-1 text-xs font-bold text-gray-900">{review.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{review.comment}</p>
                        <p className="text-[10px] text-gray-400 mt-2">
                          {new Date(review.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Write Review Form */}
              {showReviewForm ? (
                <form onSubmit={handleReviewSubmit} className="mt-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 text-center">Write your review</h4>
                  
                  {/* Star Rating */}
                  <div className="flex justify-center gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none transform hover:scale-110 transition-transform"
                      >
                        <svg
                          className={`w-8 h-8 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      </button>
                    ))}
                  </div>

                  <textarea
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell others about your experience with this doctor..."
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5f6fff]/20 focus:border-[#5f6fff] outline-none transition-all h-32 text-sm bg-white"
                  ></textarea>

                  <div className="flex gap-3 mt-4">
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="flex-1 py-3 text-gray-600 font-medium hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-2 py-3 bg-[#5f6fff] text-white font-semibold rounded-xl hover:shadow-lg hover:bg-[#4a5ae0] transition-all"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              ) : (
                <button 
                  onClick={() => setShowReviewForm(true)}
                  className="w-full mt-8 py-3 bg-white border-2 border-[#5f6fff] text-[#5f6fff] font-semibold rounded-xl hover:bg-[#5f6fff] hover:text-white transition-all transform active:scale-[0.98]"
                >
                  Write a Review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
