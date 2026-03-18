import express from "express";
const adminRouter = express.Router();
import {
  adminlogin,
  isAdminAuth,
  adminlogout,
  getdoctordata,
  getuserdata,
  changeVerificationStatus,
  appointmentsAdmin,
  adminDashboard,
} from "../controllers/adminController.js";
import adminAuth from "../middlewares/adminAuth.js";
adminRouter.post("/login", adminlogin);
adminRouter.post("/logout", adminlogout);
adminRouter.get("/is-auth", adminAuth, isAdminAuth);
adminRouter.get("/doctors", getdoctordata);
adminRouter.get("/patients", getuserdata);
adminRouter.post(
  "/change-verification-status",
  adminAuth,
  changeVerificationStatus,
);
adminRouter.get("/appointments", adminAuth, appointmentsAdmin);
adminRouter.get("/dashboard", adminAuth, adminDashboard);

export default adminRouter;
