import express from "express";
import fileUpload from "express-fileupload";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import cors from "cors";
import { connectDB } from "./src/config/db/db.js";
import "dotenv/config";

connectDB();
const app = express();
app.use(cors());
app.use(fileUpload());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);

app.listen(process.env.PORT, () =>
  console.log("Server is running on port 3000")
);
