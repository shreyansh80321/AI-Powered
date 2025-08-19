import { genToken } from "../config/token.js";
import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";


export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be strong" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // use "lax" instead of false
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log("registration erro");
    return res.status(500).json({ message: `registeration error ${error}` });
  }
};

export const login = async (req, res) => { 
  try {
    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // use "lax" instead of false
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({ message: `Login error: ${error.message}` });
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log("Logout error:", error);
    return res.status(500).json({ message: `Logout error: ${error.message}` });
  }
};

export const googleLogin = async (req, res) => {
  try {
    let { name, email } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user=await User.create({name,email})
    }
    let token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", // use "lax" instead of false
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log("googleLogin error:", error);
    return res.status(500).json({ message: `googleLogin error: ${error.message}` });
  }
}