import jwt from "jsonwebtoken";
const doctorAuth = async (req, res, next) => {
  try {
    const { doctortoken } = req.cookies;

    if (!doctortoken) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(doctortoken, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // Attach doctorId to req
    req.doctorId = decoded.id;

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default doctorAuth;