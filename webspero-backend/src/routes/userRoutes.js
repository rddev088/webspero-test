import express from "express";
import {
  uploadProfilePic,
  insertDummyData,
  findNearest,
  getUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/get-user", verifyToken, getUser);
router.post("/update-profile/", verifyToken, uploadProfilePic);
router.post("/seed-users", verifyToken, insertDummyData);
router.get("/find-nearest-users", verifyToken, findNearest);

export default router;
