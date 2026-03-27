const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId) => {
  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    return jwt.sign({ id: userId }, JWT_SECRET, {
      expiresIn: "1d",
    });
  } catch (error) {
    throw new Error("Token generation failed");
  }
};

//register user

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    const user = await userModel.create({ name, email, password });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "User created",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login user

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find by email

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    //match password if found using model method we built in userModel

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Successful login",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
