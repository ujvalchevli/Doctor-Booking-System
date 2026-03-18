import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transporter from "../config/nodeMailer.js";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import { generateOTPVerificationEmail, generateResetPasswordEmail, generateAppointmentCancelledEmail, generateAppointmentRescheduledEmail, generateAppointmentCompletedEmail } from "../config/emailTemplates.js";

export const register = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const { image, degree: degreeFile, idProof, MedicalLicense } = req.files;

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !image ||
      !degreeFile ||
      !idProof ||
      !MedicalLicense
    ) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.json({ success: false, message: "Doctor already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload profile image
    const imageUpload = await cloudinary.uploader.upload(image[0].path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Upload degree image
    const degreeUpload = await cloudinary.uploader.upload(degreeFile[0].path, {
      resource_type: "auto",
    });
    const degreeImageUrl = degreeUpload.secure_url;

    // Upload ID Proof
    const idProofUpload = await cloudinary.uploader.upload(idProof[0].path, {
      resource_type: "auto",
    });
    const idProofUrl = idProofUpload.secure_url;

    // Upload Medical License
    const MedicalLicenseUpload = await cloudinary.uploader.upload(
      MedicalLicense[0].path,
      {
        resource_type: "auto",
      },
    );
    const MedicalLicenseUrl = MedicalLicenseUpload.secure_url;

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    const doctorData = {
      name,
      email,
      phone,
      password: hashedPassword,
      speciality,
      degree: degree,
      degreeImage: degreeImageUrl,
      idProof: idProofUrl,
      MedicalLicense: MedicalLicenseUrl,
      experience,
      about,
      fees,
      address,
      image: imageUrl,
      date: Date.now(),
      verifyOtp: otp,
      verifyOtpExpireAt: Date.now() + 90 * 1000,
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    const doctortoken = jwt.sign({ id: newDoctor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("doctortoken",doctortoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP. This OTP will expire in 1 minute 30 seconds.
      If you did not create an account, please ignore this email.`,
      html: generateOTPVerificationEmail(name, otp),
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Registration successful. OTP sent to email.",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password are required",
      });
    }

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const doctortoken = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("doctortoken", doctortoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true, message: "Login successful" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const logout = (req, res) => {
  try {
    res.clearCookie("doctortoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const sendVerifyOtp = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const doctor = await doctorModel.findById(doctorId);
    if (doctor.isVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    doctor.verifyOtp = otp;
    doctor.verifyOtpExpireAt = Date.now() + 90 * 1000;

    await doctor.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: doctor.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP. This OTP will expire in 1 minute 30 seconds.`,
      html: generateOTPVerificationEmail(doctor.name, otp),
    };
    await transporter.sendMail(mailOptions);

    return res.json({
      success: true,
      message: "Verification OTP sent to email",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const { otp } = req.body;

    if (!doctorId || !otp) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (doctor.verifyOtp === "" || doctor.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (Date.now() > doctor.verifyOtpExpireAt) {
      return res.json({ success: false, message: "OTP expired" });
    }

    doctor.isVerified = true;
    doctor.verifyOtp = "";
    doctor.verifyOtpExpireAt = 0;

    await doctor.save();

    return res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const isAuthenticated = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    return res.json({ success: true, doctor });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ success: false, message: "Email is required" });
    }

    const doctor = await doctorModel.findOne({ email });

    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    doctor.resetOtp = otp;
    doctor.resetOtpExpireAt = Date.now() + 90 * 1000;

    await doctor.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: doctor.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. Use this OTP to reset your password. This OTP will expire in 1 minute 30 seconds.`,
      html: generateResetPasswordEmail(otp),
    };
    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Reset OTP sent to email" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.json({
        success: false,
        message: "Email, OTP, and new password are required",
      });
    }

    const doctor = await doctorModel.findOne({ email });
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    if (doctor.resetOtp === "" || doctor.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (doctor.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    doctor.password = hashedPassword;
    doctor.resetOtp = "";
    doctor.resetOtpExpireAt = 0;
    await doctor.save();

    return res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const getDoctor = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    return res.json({
      success: true,
      doctor,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const reuploadDocuments = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const { degree: degreeFile, idProof, MedicalLicense } = req.files;

    if (!degreeFile || !idProof || !MedicalLicense) {
      return res.json({ success: false, message: "All documents are mandatory" });
    }

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Upload new documents to Cloudinary
    const degreeUpload = await cloudinary.uploader.upload(degreeFile[0].path, {
      resource_type: "auto",
    });
    const idProofUpload = await cloudinary.uploader.upload(idProof[0].path, {
      resource_type: "auto",
    });
    const MedicalLicenseUpload = await cloudinary.uploader.upload(MedicalLicense[0].path, {
      resource_type: "auto",
    });

    // Update doctor record
    doctor.degreeImage = degreeUpload.secure_url;
    doctor.idProof = idProofUpload.secure_url;
    doctor.MedicalLicense = MedicalLicenseUpload.secure_url;
    doctor.doctorverify = "pending";
    doctor.rejectReason = "";

    await doctor.save();

    return res.json({ success: true, message: "Documents re-uploaded successfully. Verification pending." });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const updateDoctorProfile = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const {
      name,
      phone,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available,
      lunguage1,
      lunguage2,
    } = req.body;
    const imageFile = req.file;

    const updateData = {
      name,
      phone,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
      available: available === "true" || available === true,
      lunguage1,
      lunguage2,
    };

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = imageUpload.secure_url;
    }

    const doctor = await doctorModel.findByIdAndUpdate(doctorId, updateData, {
      new: true,
    });

    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      doctor,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const getDoctorsList = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({ doctorverify: "true" })
      .select("-password");
    res.json({ success: true, doctors });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor appointments for doctor panel
export const appointmentsDoctor = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const appointments = await appointmentModel.find({ docId: doctorId });
    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment for doctor panel
export const cancelAppointmentDoctor = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      // Releasing doctor slot
      const { slotDate, slotTime } = appointmentData;
      const docData = await doctorModel.findById(doctorId);
      let slot_booked = docData.slotbooked;

      if (slot_booked[slotDate]) {
        slot_booked[slotDate] = slot_booked[slotDate].filter(
          (e) => e !== slotTime,
        );
      }

      await doctorModel.findByIdAndUpdate(doctorId, { slotbooked: slot_booked });

      // Send Cancellation email to patient
      const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: appointmentData.userData.email,
          subject: "Appointment Cancelled by Doctor",
          text: `Hello ${appointmentData.userData.name}, your appointment with Dr. ${docData.name} on ${appointmentData.slotDate} at ${appointmentData.slotTime} has been cancelled by the doctor.`,
          html: generateAppointmentCancelledEmail(appointmentData.userData.name, docData.name, appointmentData.slotDate, appointmentData.slotTime, 'doctor'),
      };
      await transporter.sendMail(mailOptions);

      return res.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return res.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to reschedule appointment for doctor panel
export const rescheduleAppointmentDoctor = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const { appointmentId, slotDate, slotTime } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === doctorId) {
      const docData = await doctorModel.findById(doctorId);
      let slot_booked = docData.slotbooked;

      // Checking for new slot availability
      if (slot_booked[slotDate]) {
        if (slot_booked[slotDate].includes(slotTime)) {
          return res.json({ success: false, message: "Slot not available" });
        } else {
          slot_booked[slotDate].push(slotTime);
        }
      } else {
        slot_booked[slotDate] = [];
        slot_booked[slotDate].push(slotTime);
      }

      // Releasing old slot
      const { slotDate: oldSlotDate, slotTime: oldSlotTime } = appointmentData;
      if (slot_booked[oldSlotDate]) {
        slot_booked[oldSlotDate] = slot_booked[oldSlotDate].filter(
          (e) => e !== oldSlotTime,
        );
      }

      await doctorModel.findByIdAndUpdate(doctorId, { slotbooked: slot_booked });
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        slotDate,
        slotTime,
      });

      // Send Reschedule email to patient
      const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: appointmentData.userData.email,
          subject: "Appointment Rescheduled",
          text: `Hello ${appointmentData.userData.name}, your appointment with Dr. ${docData.name} has been rescheduled. New Date: ${slotDate}, New Time: ${slotTime}.`,
          html: generateAppointmentRescheduledEmail(appointmentData.userData.name, docData.name, slotDate, slotTime),
      };
      await transporter.sendMail(mailOptions);

      res.json({ success: true, message: "Appointment Rescheduled" });
    } else {
      res.json({ success: false, message: "Reschedule Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor dashboard data for doctor panel
export const doctorDashboard = async (req, res) => {
  try {
    const doctorId = req.doctorId;

    const appointments = await appointmentModel.find({ docId: doctorId });

    let earnings = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earnings += item.amount;
      }
    });

    let patients = [];

    appointments.map((item) => {
      if (!patients.includes(item.userId)) {
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to mark appointment as completed for doctor panel
export const completeAppointment = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === doctorId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      // Releasing doctor slot
      const { slotDate, slotTime } = appointmentData;
      const docData = await doctorModel.findById(doctorId);
      let slot_booked = docData.slotbooked;

      if (slot_booked[slotDate]) {
        slot_booked[slotDate] = slot_booked[slotDate].filter(
          (e) => e !== slotTime,
        );
      }

      await doctorModel.findByIdAndUpdate(doctorId, { slotbooked: slot_booked });

      // Send Completion Email
      const mailOptions = {
          from: process.env.SENDER_EMAIL,
          to: appointmentData.userData.email,
          subject: "Appointment Completed",
          text: `Hello ${appointmentData.userData.name}, thank you for visiting Dr. ${docData.name}. Your appointment on ${appointmentData.slotDate} is marked as completed. We hope you have a healthy life!`,
          html: generateAppointmentCompletedEmail(appointmentData.userData.name, docData.name),
      };
      await transporter.sendMail(mailOptions);

      return res.json({ success: true, message: "Appointment Completed" });
    } else {
      return res.json({ success: false, message: "Marking Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API to get doctor's unique patients for doctor panel
export const getDoctorPatients = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const appointments = await appointmentModel.find({ docId: doctorId });

    const patientsMap = new Map();

    appointments.forEach((item) => {
      if (!patientsMap.has(item.userId)) {
        patientsMap.set(item.userId, {
          ...item.userData,
          _id: item.userId,
          lastAppointment: item.date,
          appointmentCount: 1,
        });
      } else {
        const patient = patientsMap.get(item.userId);
        patient.appointmentCount += 1;
        if (item.date > patient.lastAppointment) {
          patient.lastAppointment = item.date;
        }
      }
    });

    const patients = Array.from(patientsMap.values());

    res.json({ success: true, patients });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get doctor earnings for doctor panel
export const getDoctorEarnings = async (req, res) => {
  try {
    const doctorId = req.doctorId;
    const appointments = await appointmentModel.find({ 
      docId: doctorId,
      $or: [{ isCompleted: true }, { payment: true }]
    }).sort({ date: -1 });

    let totalEarnings = 0;
    const monthlyEarnings = {};
    const transactions = [];

    appointments.forEach((item) => {
      totalEarnings += item.amount;
      
      // Monthly grouping
      const date = new Date(item.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      
      if (!monthlyEarnings[monthYear]) {
        monthlyEarnings[monthYear] = 0;
      }
      monthlyEarnings[monthYear] += item.amount;

      transactions.push({
        _id: item._id,
        patientName: item.userData.name,
        patientImage: item.userData.image,
        amount: item.amount,
        date: item.date,
        slotDate: item.slotDate,
        slotTime: item.slotTime,
        status: item.isCompleted ? 'Completed' : 'Paid'
      });
    });

    const earningsData = {
      totalEarnings,
      monthlyEarnings: Object.entries(monthlyEarnings).map(([month, amount]) => ({ month, amount })),
      transactions
    };

    res.json({ success: true, earningsData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
