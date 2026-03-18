import express from "express";
import upload from "../middlewares/multer.js";
import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  isAuthenticated,
  sendResetOtp,
  resetPassword,
  getDoctor,
  reuploadDocuments,
  getDoctorsList,
  appointmentsDoctor,
  cancelAppointmentDoctor,
  rescheduleAppointmentDoctor,
  doctorDashboard,
  completeAppointment,
  getDoctorPatients,
  updateDoctorProfile,
  getDoctorEarnings,
} from "../controllers/doctorController.js";
import doctorAuth from "../middlewares/doctorAuth.js";
const doctorRouter = express.Router();

doctorRouter.post(
  "/register",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "degree", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "MedicalLicense", maxCount: 1 },
  ]),
  register,
);

doctorRouter.post("/login", login);
doctorRouter.post("/logout", logout);
doctorRouter.post("/send-verify-otp", doctorAuth, sendVerifyOtp);
doctorRouter.post("/verify-email", doctorAuth, verifyEmail);
doctorRouter.get("/is-auth", doctorAuth, isAuthenticated);
doctorRouter.post("/send-reset-otp", sendResetOtp);
doctorRouter.post("/reset-password", resetPassword);
doctorRouter.get("/get-doctor", doctorAuth, getDoctor);
doctorRouter.post(
  "/reupload-documents",
  doctorAuth,
  upload.fields([
    { name: "degree", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "MedicalLicense", maxCount: 1 },
  ]),
  reuploadDocuments,
);

doctorRouter.get("/list", getDoctorsList);
doctorRouter.get("/appointments", doctorAuth, appointmentsDoctor);
doctorRouter.post("/cancel-appointment", doctorAuth, cancelAppointmentDoctor);
doctorRouter.post(
  "/reschedule-appointment",
  doctorAuth,
  rescheduleAppointmentDoctor,
);
doctorRouter.get("/patients", doctorAuth, getDoctorPatients);
doctorRouter.get("/dashboard", doctorAuth, doctorDashboard);
doctorRouter.post("/complete-appointment", doctorAuth, completeAppointment);
doctorRouter.post(
  "/update-profile",
  doctorAuth,
  upload.single("image"),
  updateDoctorProfile,
);
doctorRouter.get("/earnings", doctorAuth, getDoctorEarnings);

export default doctorRouter;
