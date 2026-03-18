import jwt from "jsonwebtoken";
const adminAuth = async (req, res, next) => {
  try {
    const { admintoken } = req.cookies;
    if (!admintoken) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(admintoken, process.env.JWT_SECRET);

    if (decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
