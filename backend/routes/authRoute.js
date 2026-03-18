import express from "express";
const authRouter = express.Router();
import { register, login, logout, sendVerifyOtp, verifyEmail, isAuthenticated, sendResetOtp, resetPassword } from "../controllers/authController.js";
import userAuth from "../middlewares/userAuth.js";

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/sendVerifyOtp",userAuth, sendVerifyOtp);
authRouter.post("/verifyEmail", userAuth,verifyEmail);
authRouter.get("/is-Auth", userAuth,isAuthenticated);
authRouter.post("/reset-otp", sendResetOtp);
authRouter.post("/reset-password",resetPassword);



export default authRouter;