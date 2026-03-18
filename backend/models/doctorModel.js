import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: 'Not provided' },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    degreeImage: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    address: { type: String, required: true },
    date: { type: Date, required: true },
    slotbooked: { type: Object, default: {} },
    doctorverify: { type: String, default: "pending" },
    rejectReason: { type: String, default: "" },  
    isVerified: { type: Boolean, default: false },
    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Number, default: 0 },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    lunguage1: { type: String, default: "English" },
    lunguage2: { type: String, default: "Hindi" },
    MedicalLicense: { type: String, required: true },
    idProof: { type: String, required: true },
  },
  { minimize: false },
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
