import userModel from "../models/userModel.js";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import favoriteModel from "../models/favoriteModel.js";
import reviewModel from "../models/reviewModel.js";
import transporter from "../config/nodeMailer.js";
import { generateAppointmentBookedEmail, generateAppointmentCancelledEmail } from "../config/emailTemplates.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({
      success: true,
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const updateUserData = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, gender, dob, BloodGroup, age } = req.body;
    const imageFile = req.file;

    if (!name || !phone) {
      return res.json({
        success: false,
        message: "Name and Phone are required",
      });
    }

    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        address: typeof address === "string" ? JSON.parse(address) : address,
        gender,
        dob,
        BloodGroup,
        age,
      },
    );
    if (imageFile) {
      const imageupload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageupload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
      user.image = imageUrl;
    }

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to book appointment
export const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not available" });
    }

    let slot_booked = docData.slotbooked;

    // Checking for slot availability
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

    const userData = await userModel.findById(userId).select("-password");

    delete docData.slotbooked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Save new slots data in docData
    await doctorModel.findByIdAndUpdate(docId, { slotbooked: slot_booked });

    // Send Booking Confirmation Email
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: userData.email,
        subject: "Appointment Booked Successfully",
        text: `Hello ${userData.name}, your appointment with Dr. ${docData.name} has been successfully booked for ${slotDate} at ${slotTime}. Thank you for choosing our service!`,
        html: generateAppointmentBookedEmail(userData.name, docData.name, slotDate, slotTime),
    };
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get user appointments for frontend my-appointments page
export const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to cancel appointment
export const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // Verify appointment user
    if (appointmentData.userId !== userId) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    // Releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;

    const docData = await doctorModel.findById(docId);

    let slot_booked = docData.slotbooked;

    slot_booked[slotDate] = slot_booked[slotDate].filter((e) => e !== slotTime);

    await doctorModel.findByIdAndUpdate(docId, { slotbooked: slot_booked });

    // Send Cancellation Email
    const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: appointmentData.userData.email,
        subject: "Appointment Cancelled",
        text: `Hello ${appointmentData.userData.name}, your appointment with Dr. ${appointmentData.docData.name} on ${appointmentData.slotDate} at ${appointmentData.slotTime} has been successfully cancelled.`,
        html: generateAppointmentCancelledEmail(appointmentData.userData.name, appointmentData.docData.name, appointmentData.slotDate, appointmentData.slotTime, 'patient'),
    };
    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to toggle favorite doctor
export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId } = req.body;

    const favorite = await favoriteModel.findOne({ userId, docId });

    if (favorite) {
      await favoriteModel.findByIdAndDelete(favorite._id);
      res.json({ success: true, message: "Removed from favorites", isFavorite: false });
    } else {
      const newFavorite = new favoriteModel({ userId, docId });
      await newFavorite.save();
      res.json({ success: true, message: "Added to favorites", isFavorite: true });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get favorite doctors
export const getFavorites = async (req, res) => {
  try {
    const userId = req.userId;
    const favorites = await favoriteModel.find({ userId }).populate("docId");

    res.json({ success: true, favorites });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to add review
export const addReview = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, rating, comment } = req.body;

    if (!docId || !rating || !comment) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const newReview = new reviewModel({
      userId,
      docId,
      rating,
      comment,
      date: Date.now(),
    });

    await newReview.save();
    res.json({ success: true, message: "Review added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API to get reviews for a doctor
export const getDoctorReviews = async (req, res) => {
  try {
    const { docId } = req.params;
    const reviews = await reviewModel
      .find({ docId })
      .populate("userId", "name image")
      .sort({ date: -1 });

    res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
