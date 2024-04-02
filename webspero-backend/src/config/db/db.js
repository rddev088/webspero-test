import mongoose from "mongoose";
import config from "../env/index.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {});
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
