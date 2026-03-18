import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiUsers, 
  FiAward, 
  FiMapPin, 
  FiHeart, 
  FiShield, 
  FiZap, 
  FiStar,
  FiArrowRight,
  FiPhoneCall
} from "react-icons/fi";

// Team member images
const teamImages = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1887&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
];

const stats = [
  { icon: <FiUsers />, value: "50k+", label: "Happy Patients", color: "bg-blue-500" },
  { icon: <FiUsers />, value: "200+", label: "Expert Doctors", color: "bg-indigo-500" },
  { icon: <FiMapPin />, value: "15+", label: "Branches", color: "bg-purple-500" },
  { icon: <FiAward />, value: "25+", label: "Awards Won", color: "bg-teal-500" },
];

const values = [
  { icon: <FiHeart />, title: "Compassion", desc: "Treating every patient with empathy and deep care." },
  { icon: <FiShield />, title: "Integrity", desc: "Honest, transparent and ethical medical practices." },
  { icon: <FiZap />, title: "Innovation", desc: "Leveraging cutting-edge tech for better healthcare." },
  { icon: <FiStar />, title: "Excellence", desc: "Setting the gold standard in medical service quality." },
];

function About() {
  const navigate = useNavigate();

  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center bg-linear-to-br from-[#5f6fff]/10 via-white to-purple-100/30 py-20 px-5">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#5f6fff]/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/20 rounded-full blur-[100px] -ml-40 -mb-40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#5f6fff]/10 text-[#5f6fff] font-bold text-xs uppercase tracking-widest mb-6">
                About Our Platform
              </span>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] mb-6">
                Redefining the <span className="bg-linear-to-r from-[#5f6fff] to-[#8a96ff] bg-clip-text text-transparent">Healthcare</span> Experience
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                We bridge the gap between world-class medical expertise and your doorstep. 
                Dedicated to making healthcare accessible, affordable, and deeply personal for everyone.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <button 
                  onClick={() => navigate("/doctor-list")}
                  className="px-8 py-4 bg-[#5f6fff] text-white font-bold rounded-2xl hover:bg-[#4a5ae0] transition-all duration-300 shadow-xl shadow-[#5f6fff]/30 flex items-center group"
                >
                  Explore Doctors
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate("/contact")}
                  className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-2xl hover:border-[#5f6fff] hover:text-[#5f6fff] transition-all duration-300 flex items-center"
                >
                  <FiPhoneCall className="mr-2" />
                  Contact Us
                </button>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop" 
                  alt="Modern Hospital" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#5f6fff] rounded-full flex flex-col items-center justify-center text-white shadow-xl rotate-12">
                <span className="text-3xl font-black">10+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-center px-4">Years of Trust</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-5 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform ${stat.color}`}>
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-black text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-gray-500 font-semibold uppercase tracking-widest text-xs">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">Our Core Philosophy</h2>
            <div className="w-24 h-1.5 bg-[#5f6fff] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:translate-y-[-10px] transition-transform"
              >
                <div className="w-16 h-16 bg-[#5f6fff]/10 rounded-2xl flex items-center justify-center text-[#5f6fff] text-3xl mx-auto mb-6">
                  {val.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{val.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-5 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-[#5f6fff] font-black uppercase tracking-[0.2em] text-xs underline decoration-4 underline-offset-8">Our Leadership</span>
              <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mt-6">Meet the Visionaries</h2>
            </div>
            <button 
              onClick={() => navigate("/doctor-list")}
              className="px-6 py-3 bg-[#5f6fff]/5 text-[#5f6fff] font-bold rounded-xl hover:bg-[#5f6fff] hover:text-white transition-all duration-300"
            >
              View All Experts
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamImages.map((img, idx) => (
              <div key={idx} className="group relative">
                <div className="aspect-[3/4] rounded-[40px] overflow-hidden shadow-xl mb-6 relative">
                  <img src={img} alt="Team Member" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-linear-to-t from-[#5f6fff]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Dr. {["Sarah Johnson", "Michael Chen", "Priya Sharma", "James Wilson"][idx]}</h3>
                <p className="text-[#5f6fff] font-bold text-sm uppercase tracking-widest mt-1">
                  {["Chief Cardiologist", "Head of Neurology", "Senior Pediatrician", "Orthopedic Surgeon"][idx]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-5">
        <div className="container mx-auto px-4">
          <div className="bg-linear-to-br from-[#5f6fff] to-[#8a96ff] rounded-[60px] p-12 lg:p-24 text-center text-white relative overflow-hidden shadow-2xl flex flex-col items-center">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-20 -mt-20"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-3xl -mr-40 -mb-40"></div>
            
            <h2 className="text-4xl lg:text-7xl font-black mb-8 leading-tight max-w-4xl relative z-10">
              Transforming Lives Through Better Care
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl relative z-10 leading-relaxed">
              Join millions of users who trust MediCare for their health needs. 
              Book your first consultation today and experience the difference.
            </p>
            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <button 
                onClick={() => navigate("/doctor-list")}
                className="px-12 py-5 bg-white text-[#5f6fff] font-black rounded-[20px] hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Find a Doctor
              </button>
              <button 
                onClick={() => navigate("/contact")}
                className="px-12 py-5 bg-transparent border-2 border-white/40 text-white font-black rounded-[20px] hover:bg-white/10 transition-all duration-300"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
