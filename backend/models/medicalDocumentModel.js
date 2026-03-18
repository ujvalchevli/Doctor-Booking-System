import mongoose from "mongoose";

const medicalDocumentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    docName: { type: String, required: true },
    docType: { type: String, required: true }, // e.g., 'Sugar Report', 'Blood Test', etc.
    docFile: { type: String, required: true }, // Cloudinary URL
    date: { type: Number, required: true },
}, { minimize: false });

const medicalDocumentModel = mongoose.models.medicalDocument || mongoose.model("medicalDocument", medicalDocumentSchema);

export default medicalDocumentModel;
