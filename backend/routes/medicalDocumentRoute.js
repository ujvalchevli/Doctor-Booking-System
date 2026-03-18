import express from "express";
import { uploadDocument, getUserDocuments, deleteDocument } from "../controllers/medicalDocumentController.js";
import upload from "../middlewares/multer.js";
import userAuth from "../middlewares/userAuth.js";

const medicalDocumentRouter = express.Router();

medicalDocumentRouter.post("/upload", userAuth, upload.single("docFile"), uploadDocument);
medicalDocumentRouter.post("/get-documents", userAuth, getUserDocuments);
medicalDocumentRouter.post("/delete", userAuth, deleteDocument);

export default medicalDocumentRouter;
