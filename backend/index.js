import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoDb.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import configureCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import contactRouter from "./routes/contactRoute.js";
import medicalDocumentRouter from "./routes/medicalDocumentRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
configureCloudinary();

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Doctor Appointment Booking System Backend is running");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/admin", adminRouter);
app.use("/api/contact", contactRouter);
app.use("/api/medical-documents", medicalDocumentRouter);

app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server error:", err);
  });
