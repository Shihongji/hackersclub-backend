import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import createError from "http-errors";
import fs from "fs";
import cloudinary from "cloudinary";
dotenv.config();

export const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Register
export const createUser = async (req, res, next) => {
  const { username, password, email, bio, role } = req.body;
  // console.log(req.body.password);
  try {
    // Check if username already exists
    let userByUsername = await User.findOne({ username });
    if (userByUsername) {
      throw createError.Conflict(`${username} is already registered`);
    }
    // Check if email already exists
    let userByEmain = await User.findOne({ email });
    if (userByEmain) {
      throw createError.Conflict(`${email} is already registered`);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Upload the avatar to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "hackerClubAvatarTest/",
    });

    // Delete the image file from your server
    try {
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.log(err);
    }

    const user = new User({
      username,
      password: hashedPassword,
      email,
      avatar: result.secure_url,
      bio,
      role,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err.message);
    if (err.status) {
      res.status(err.status).json(err.message);
    } else {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
};

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      throw createError.NotFound("Email not registered");
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // console.log("pwd is: ", user.password);
      throw createError.Unauthorized("Invalid password");
    }

    // The user is authenticated, generate a JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    user.refreshToken = refreshToken;
    await user.save();
    // Set refreshToken as HttpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",  // set this based on environment
      sameSite: "strict", // preventing CSRF
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    console.error(err.message);
    if (err.status) {
      res.status(err.status).send(err.message);
    } else {
      res.status(500).send("Server Error");
    }
  }
};

export const getUserById = async (req, res) => {
  try {
    const gUser = await User.findById(req.params.UserId);
    if (!gUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(gUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.UserId,
      req.body,
      { new: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.UserId);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
