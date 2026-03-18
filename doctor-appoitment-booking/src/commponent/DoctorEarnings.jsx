import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import { 
  FiDollarSign, 
  FiTrendingUp, 
  FiClock, 
  FiUser, 
  FiCalendar,
  FiArrowUpRight,
  FiArrowDownLeft
} from "react-icons/fi";

const DoctorEarnings = () => {
  const { getDoctorEarnings, currencySymbol } = useContext(AppContext);
  const [earningsData, setEarningsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEarnings = async () => {
    try {
      setLoading(true);
      const data = await getDoctorEarnings();
      if (data) {
        setEarningsData(data);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEarnings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5f6fff]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Earnings Overview</h2>
          <p className="text-gray-500">Track and manage your income from appointments</p>
        </div>
        <button 
          onClick={fetchEarnings}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-600 shadow-sm"
        >
          <FiClock className="w-4 h-4" />
          Refresh Data
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-4">
              <FiDollarSign className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Earnings</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">
              {currencySymbol}{earningsData?.totalEarnings?.toLocaleString() || 0}
            </h3>
            <div className="mt-4 flex items-center gap-1 text-green-600 font-bold text-sm">
              <FiTrendingUp className="w-4 h-4" />
              <span>Lifetime Income</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#5f6fff]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-[#5f6fff]/5 text-[#5f6fff] rounded-xl flex items-center justify-center mb-4">
              <FiCalendar className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Transactions</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">
              {earningsData?.transactions?.length || 0}
            </h3>
            <div className="mt-4 flex items-center gap-1 text-[#5f6fff] font-bold text-sm">
              <FiArrowUpRight className="w-4 h-4" />
              <span>Paid Appointments</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-4">
              <FiTrendingUp className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Avg. per Session</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-1">
              {currencySymbol}{earningsData?.transactions?.length > 0 
                ? Math.round(earningsData.totalEarnings / earningsData.transactions.length).toLocaleString() 
                : 0}
            </h3>
            <div className="mt-4 flex items-center gap-1 text-purple-600 font-bold text-sm">
              <FiArrowUpRight className="w-4 h-4" />
              <span>Session Efficiency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown & Recent Transactions */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Monthly Summary */}
        <div className="xl:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 px-1">Monthly Breakdown</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 divide-y divide-gray-50">
            {earningsData?.monthlyEarnings?.map((item, index) => (
              <div key={index} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">{item.month}</p>
                </div>
                <p className="font-bold text-[#5f6fff]">{currencySymbol}{item.amount.toLocaleString()}</p>
              </div>
            )) || (
              <p className="text-center text-gray-500 py-4">No data available</p>
            )}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="xl:col-span-3 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 px-1">Recent Transactions</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {earningsData?.transactions?.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.patientImage} 
                            alt={item.patientName} 
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-100"
                          />
                          <p className="text-sm font-bold text-gray-900">{item.patientName}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-gray-900">{item.slotDate}</span>
                          <span className="text-xs text-gray-500">{item.slotTime}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          item.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-[#5f6fff]/10 text-[#5f6fff]'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-900">{currencySymbol}{item.amount.toLocaleString()}</p>
                      </td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan="4" className="text-center py-8 text-gray-500">No transactions found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorEarnings;
