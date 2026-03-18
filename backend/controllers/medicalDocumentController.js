import medicalDocumentModel from "../models/medicalDocumentModel.js";
import { v2 as cloudinary } from "cloudinary";

// API to upload medical document
export const uploadDocument = async (req, res) => {
    try {
        const { docName, docType } = req.body;
        const userId = req.userId; // Provided by userAuth middleware
        const imageFile = req.file;

        if (!userId || !docName || !docType || !imageFile) {
            return res.json({ success: false, message: "Missing Details" });
        }

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "auto",
        });
        const docFileUrl = imageUpload.secure_url;

        const docData = {
            userId,
            docName,
            docType,
            docFile: docFileUrl,
            date: Date.now(),
        };

        const newDoc = new medicalDocumentModel(docData);
        await newDoc.save();

        res.json({ success: true, message: "Document uploaded successfully" });

    } catch (error) {
        console.log("Error uploading document:", error);
        res.json({ success: false, message: error.message });
    }
};

// API to get all medical documents for a user
export const getUserDocuments = async (req, res) => {
    try {
        const userId = req.userId; // Provided by userAuth middleware
        const documents = await medicalDocumentModel.find({ userId });
        res.json({ success: true, documents });
    } catch (error) {
        console.log("Error getting user documents:", error);
        res.json({ success: false, message: error.message });
    }
};

// API to delete a medical document
export const deleteDocument = async (req, res) => {
    try {
        const { docId } = req.body;
        const userId = req.userId; // Provided by userAuth middleware

        // Verify the document belongs to the user
        const document = await medicalDocumentModel.findById(docId);
        if (!document || document.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized or Document Not Found" });
        }

        await medicalDocumentModel.findByIdAndDelete(docId);
        res.json({ success: true, message: "Document deleted successfully" });
    } catch (error) {
        console.log("Error deleting document:", error);
        res.json({ success: false, message: error.message });
    }
};
