import jwt from "jsonwebtoken";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";
import appointmentModel from "../models/appointmentModel.js";

export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email.trim() === process.env.ADMIN_EMAIL.trim() &&
      password.trim() === process.env.ADMIN_PASSWORD.trim()
    ) {
      const admintoken = jwt.sign(email + password, process.env.JWT_SECRET);
      res.cookie("admintoken", admintoken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({
        success: true,
        message: "Admin Login successful",
        admintoken,
      });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const isAdminAuth = async (req, res) => {
  try {
    return res.json({ success: true, message: "Authorized" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const adminlogout = async (req, res) => {
  try {
    res.clearCookie("admintoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const getdoctordata = async (req, res) => {
  try {
    const doctor = await doctorModel.find({});
    return res.json({ success: true, doctor });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const getuserdata = async (req, res) => {
  try {
    const user = await userModel.find({});
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const changeVerificationStatus = async (req, res) => {
  try {
    const { docId, status, rejectReason } = req.body;
    await doctorModel.findByIdAndUpdate(docId, {
      doctorverify: status,
      rejectReason: status === "rejected" ? rejectReason : "",
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get all appointments list
export const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({}).sort({ date: -1 });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API to get dashboard data for admin panel
export const adminDashboard = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    const users = await userModel.find({});
    const appointments = await appointmentModel.find({}).sort({ date: -1 });

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.slice(0, 5),
      latestDoctors: doctors.reverse().slice(0, 5),
      pendingVerifications: doctors.filter((doc) => doc.doctorverify === "pending")
        .length,
      verifiedDoctors: doctors.filter((doc) => doc.doctorverify === "verified")
        .length,
      rejectedDoctors: doctors.filter((doc) => doc.doctorverify === "rejected")
        .length,
      // Appointment distribution for the week (mocking days for now based on actual data if possible)
      appointmentDistribution: [
        { day: "Mon", count: appointments.filter(a => new Date(a.date).getDay() === 1).length },
        { day: "Tue", count: appointments.filter(a => new Date(a.date).getDay() === 2).length },
        { day: "Wed", count: appointments.filter(a => new Date(a.date).getDay() === 3).length },
        { day: "Thu", count: appointments.filter(a => new Date(a.date).getDay() === 4).length },
        { day: "Fri", count: appointments.filter(a => new Date(a.date).getDay() === 5).length },
      ]
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
