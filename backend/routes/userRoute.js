import express from "express";
import userAuth from "../middlewares/userAuth.js";
import {
  getUserData,
  updateUserData,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  toggleFavorite,
  getFavorites,
  addReview,
  getDoctorReviews,
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";
const userRouter = express.Router();
userRouter.get("/user-data", userAuth, getUserData);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  userAuth,
  updateUserData,
);
userRouter.post("/book-appointment", userAuth, bookAppointment);
userRouter.get("/appointments", userAuth, listAppointment);
userRouter.post("/cancel-appointment", userAuth, cancelAppointment);
userRouter.post("/toggle-favorite", userAuth, toggleFavorite);
userRouter.get("/favorites", userAuth, getFavorites);
userRouter.post("/add-review", userAuth, addReview);
userRouter.get("/get-reviews/:docId", getDoctorReviews);

export default userRouter;
