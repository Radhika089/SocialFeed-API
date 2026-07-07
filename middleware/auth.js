import jwt from "jsonwebtoken";
import userModel from "../model/user.js";

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: " authentication or token is missing ",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findById(payload.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "You must be login",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
