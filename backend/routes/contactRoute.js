import express from "express";
import { saveMessage, getAllMessages } from "../controllers/contactController.js";
import adminAuth from "../middlewares/adminAuth.js";

const contactRouter = express.Router();

contactRouter.post("/send", saveMessage);
contactRouter.get("/all", adminAuth, getAllMessages);

export default contactRouter;
