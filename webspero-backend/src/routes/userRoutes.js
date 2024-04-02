import express from "express";
import {
  uploadProfilePic,
  insertDummyData,
  findNearest,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/seed-users", verifyToken, insertDummyData);
router.post("/update-profile/", verifyToken, uploadProfilePic);
router.get("/find-nearest-users", verifyToken, findNearest);

export default router;
