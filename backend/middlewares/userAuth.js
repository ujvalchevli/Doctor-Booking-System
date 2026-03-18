import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    // ✅ Attach userId safely to req
    req.userId = decoded.id;

    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export default userAuth;