import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  userId: { type: String, ref: "user", required: true },
  docId: { type: String, ref: "doctor", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Number, default: Date.now() },
}, { timestamps: true });

const reviewModel = mongoose.models.review || mongoose.model("review", reviewSchema);

export default reviewModel;
