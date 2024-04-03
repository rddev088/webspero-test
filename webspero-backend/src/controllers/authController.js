import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import config from "../config/env/index.js";
import { getPublicFolderPath } from "../utils/helper.js";
import path from "path";

export async function register(req, res) {
  try {
    const { name, email, password, mobile, phone, zipCode } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password,
      mobile,
      phone,
      zipCode,
      password: hashedPassword,
      location: {
        type: "Point",
        coordinates: [76.748704, 30.719059], // default longitude, latitude (sector 43)
      },
    });

    if (req.files && Object.keys(req.files).length != 0) {
      const { profilePic } = req.files;

      const uploadPath = path.join(
        getPublicFolderPath(),
        "uploads",
        profilePic.name
      );

      await profilePic.mv(uploadPath, (err) => {
        if (err) return res.status(500).json({ error: err.message });
      });
      user.profilePic = `/uploads/${profilePic.name}`;
    }
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) throw new Error("Invalid password");

    const token = jwt.sign({ userId: user._id }, config.secret, {
      expiresIn: "1h",
    });

    res.json({ token, email: user.email, name: user.name });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}
