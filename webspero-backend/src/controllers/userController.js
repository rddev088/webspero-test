import User from "../models/user.model.js";
import { getPublicFolderPath } from "../utils/helper.js";
import path from "path";
import bcrypt from "bcrypt";
import fs from "fs";
import mongoose from "mongoose";

export async function getUser(req, res) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ data: user, message: "User Found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function uploadProfilePic(req, res) {
  try {
    const updates = req.body;
    const userId = req.userId;
    const user = await User.findById(userId);
    console.log({ user });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.files && Object.keys(req.files).length != 0) {
      const { profilePic } = req.files;
      updates.profilePic = `/uploads/${profilePic.name}`;
      const uploadPath = path.join(
        getPublicFolderPath(),
        "uploads",
        profilePic.name
      );

      await profilePic.mv(uploadPath, (err) => {
        if (err) return res.status(500).json({ error: err.message });
      });
      const existingImagePath = path.join(
        getPublicFolderPath(),
        user?.profilePic
      );

      if (fs.existsSync(existingImagePath)) {
        fs.unlinkSync(existingImagePath);
      }
    }

    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updates.password = hashedPassword;
    }

    Object.assign(user, updates);
    await user.save();

    res.status(201).json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function insertDummyData(req, res) {
  const randomCoordinates = [
    [76.748704, 30.719059],
    [76.751912, 30.717887],
    [76.745632, 30.720345],
    [76.752509, 30.718451],
    [76.746973, 30.719886],
  ];

  // Create an array of 20 user objects
  const users = Array.from({ length: 20 }, (_, index) => {
    const randomIndex = Math.floor(Math.random() * randomCoordinates.length);
    const [longitude, latitude] = randomCoordinates[randomIndex];

    return {
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      password: "password123",
      mobile: "1234567890",
      zipCode: "12345",
      location: {
        type: "Point",
        coordinates: [longitude, latitude], // Assign random coordinates
      },
    };
  });

  // Insert the users into the database
  User.insertMany(users)
    .then(() => {
      res.status(201).json({ message: "User seeder executed successfully" });
    })
    .catch((error) => {
      res.status(401).json({ error: error.message });
    });
}

export async function findNearest(req, res) {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the coordinates of the logged-in user
    const { coordinates } = user.location;

    // Find the 5 nearest users to the logged-in user
    const nearestUsers = await User.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: coordinates,
          },
          distanceField: "distance",
          spherical: true,
          maxDistance: 10000, // Maximum distance in meters
        },
      },
      {
        $match: {
          email: { $ne: user.email }, // Exclude the logged-in user
        },
      },
      {
        $limit: 5, // Limit to 5 nearest users
      },
    ]);

    return res.status(200).json(nearestUsers);
  } catch (error) {
    console.error("Error finding nearest users:", error);
    res.status(400).json({ message: error.message });
  }
}
