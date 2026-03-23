import React, { useState } from "react";

function SlideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      section: "MAIN",
      items: [
        { icon: "dashboard", label: "Dashboard", path: "/" },
        {
          icon: "doctors",
          label: "Doctors",
          path: "/alldoctors",
        },
        {
          icon: "patients",
          label: "Patients",
          path: "/allpatients",
        },
        {
          icon: "appointments",
          label: "Appointments",
          path: "/all-appointments",
        },
      ],
    },
    {
      section: "VERIFICATION",
      items: [
        {
          icon: "pending",
          label: "Pending Approvals",
          path: "/pendingdoctors",
          badge: true,
        },
        {
          icon: "rejected",
          label: "Rejected",
          path: "/rejecteddoctors",
        },
      ],
    },
    {
      section: "MANAGEMENT",
      items: [
        {
          icon: "messages",
          label: "Contact Messages",
          path: "/contact-messages",
        },
      ],
    },
  ];

  const getIcon = (iconName) => {
    switch (iconName) {
      case "dashboard":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        );
      case "doctors":
        return (
          <svg
            className="w-5 h-5"
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
        );
      case "patients":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "appointments":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case "pending":
        return (
          <svg
            className="w-5 h-5"
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
        );
      case "verified":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "rejected":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );

      case "messages":
        return (
          <svg
            className="w-5 h-5"
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
        );

      default:
        return null;
    }
  };

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-9 bg-white border border-gray-200 rounded-full p-1.5 shadow-md hover:bg-gray-50"
      >
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
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
      </button>

      {/* Admin Info */}
      <div
        className={`p-4 border-b border-gray-100 ${isCollapsed ? "text-center" : ""}`}
      >
        <div
          className={`flex ${isCollapsed ? "flex-col" : "items-center"} gap-3`}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#5f6fff] to-[#8a96ff] rounded-full flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          {!isCollapsed && (
            <div>
              <p className="text-sm font-semibold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="p-4 h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
        {menuItems.map((section, idx) => (
          <div key={idx} className="mb-6">
            {!isCollapsed && (
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                {section.section}
              </h4>
            )}
            <ul className="space-y-1">
              {section.items.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} p-3 rounded-xl transition-colors ${
                      window.location.pathname === item.path
                        ? "bg-gradient-to-r from-[#5f6fff]/10 to-[#8a96ff]/10 text-[#5f6fff]"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center">
                      <span
                        className={
                          window.location.pathname === item.path
                            ? "text-[#5f6fff]"
                            : "text-gray-500"
                        }
                      >
                        {getIcon(item.icon)}
                      </span>
                      {!isCollapsed && (
                        <span className="ml-3 text-sm font-medium">
                          {item.label}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && item.count && (
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.badge
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                    {isCollapsed && item.count && (
                      <span
                        className={`absolute -top-1 -right-1 text-xs w-4 h-4 flex items-center justify-center rounded-full ${
                          item.badge
                            ? "bg-yellow-500 text-white"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
        {!isCollapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-500 ml-2">System Online</span>
            </div>
            <div className="text-xs text-gray-400">v2.0.0</div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default SlideBar;
