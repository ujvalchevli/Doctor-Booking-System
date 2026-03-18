import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, ref: "user", required: true },
  docId: { type: String, ref: "doctor", required: true },
}, { timestamps: true });

const favoriteModel = mongoose.models.favorite || mongoose.model("favorite", favoriteSchema);

export default favoriteModel;
