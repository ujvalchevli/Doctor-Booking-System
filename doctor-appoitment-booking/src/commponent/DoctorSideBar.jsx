import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { NavLink } from "react-router-dom";

function DoctorSideBar({ isMobileMenuOpen, setIsMobileMenuOpen }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { doctorData } = useContext(AppContext);

  const menuItems = [
    { icon: "user", label: "My Profile", path: "/doctor-home/profile" },
    { icon: "dashboard", label: "Dashboard", path: "/doctor-home" },
    { icon: "calendar", label: "Appointments", path: "/doctor-home/appointments" },
    { icon: "users", label: "My Patients", path: "/doctor-home/patients" },
    { icon: "chart", label: "Earnings", path: "/doctor-home/earnings" },
    
  ];

  const getIcon = (iconName) => {
    switch(iconName) {
      case 'user':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'dashboard':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'calendar':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'users':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'chart':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
     
      default:
        return null;
    }
  };

  return (
    <aside className={`bg-white border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-1 transition-all duration-300 z-30 flex flex-col fixed inset-y-0 left-0 lg:relative ${
      isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
    } ${
      isCollapsed ? 'lg:w-20' : 'lg:w-64'
    } w-64`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:bg-gray-50 z-50 transition-transform active:scale-90"
      >
        <svg className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
          isCollapsed ? 'rotate-180' : ''
        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Doctor Info */}
      <div className={`p-4 border-b border-gray-100 shrink-0 ${isCollapsed ? 'text-center' : ''}`}>
        <div className={`flex ${isCollapsed ? 'flex-col' : 'items-center'} gap-3`}>
          <img
            src={doctorData?.image}
            alt={doctorData?.name}
            className="w-10 h-10 rounded-full object-cover shadow-sm"
          />
          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{doctorData?.name}</p>
              <p className="text-[10px] font-medium text-[#5f6fff] uppercase tracking-wider truncate">{doctorData?.speciality}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu - Scrollable */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
        <ul className="space-y-1.5">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                end={item.path === "/doctor-home"}
                className={({ isActive }) =>
                  `group flex items-center ${
                    isCollapsed ? "justify-center" : "justify-between"
                  } p-3 rounded-xl transition-all duration-200 relative ${
                    isActive
                      ? "bg-[#5f6fff]/5 text-[#5f6fff]"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center">
                      <span
                        className={`transition-colors duration-200 ${
                          isActive
                            ? "text-[#5f6fff]"
                            : "text-gray-400 group-hover:text-[#5f6fff]"
                        }`}
                      >
                        {getIcon(item.icon)}
                      </span>
                      {!isCollapsed && (
                        <span className="ml-3 text-sm font-semibold">
                          {item.label}
                        </span>
                      )}
                    </div>
                    {/* Active Indicator Line */}
                    {!isCollapsed && isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#5f6fff] rounded-r-full"></div>
                    )}
                    
                    {!isCollapsed && item.count && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-lg font-bold ${
                          item.count === "New"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Upgrade Card - Relative and Part of Flex */}
      {/* {!isCollapsed && (
        <div className="p-4 shrink-0 mt-auto">
          <div className="bg-gradient-to-br from-[#5f6fff] to-[#8a96ff] rounded-2xl p-4 text-white shadow-lg shadow-[#5f6fff]/20 relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold">Premium Plan</p>
                <p className="text-[10px] opacity-80 font-medium">Get more features</p>
              </div>
            </div>
            <button className="w-full bg-white text-[#5f6fff] text-xs font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors relative z-10 shadow-sm">
              Upgrade Now
            </button>
          </div>
        </div>
      )} */}
    </aside>
  );
}

export default DoctorSideBar;