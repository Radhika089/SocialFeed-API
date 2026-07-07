import userModel from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const JWT_KEY = process.env.JWT_KEY;
const TOKEN_EXPIRES = "24h";

const createdToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_KEY, { expiresIn: TOKEN_EXPIRES });
};

export async function register(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "password should be at least of 8 characters",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "email is in already use",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
    });

    const token = createdToken(user._id);

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("Server Error", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    const token = createdToken(user._id);

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      message: "Login Successfully!",
    });
  } catch (error) {
    console.log("Server Error", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
