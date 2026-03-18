import contactModel from "../models/contactModel.js";

const saveMessage = async (req, res) => {
  try {
    const { name, email, phonenumber, subject, message } = req.body;

    if (!name || !email || !phonenumber || !subject || !message) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const newMessage = new contactModel({
      name,
      email,
      phonenumber,
      subject,
      message,
    });

    await newMessage.save();

    res.json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const messages = await contactModel.find({});
    res.json({ success: true, messages });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { saveMessage, getAllMessages };
