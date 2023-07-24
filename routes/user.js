import auth from "../middleware/auth.js";
import express from "express";
import upload from "../middleware/uploadImage.js";

const router = express.Router();
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
  updateUserById,
} from "../controllers/user.js";

router.get("/", getAllUsers);
router.post("/register", upload.single("avatar"), createUser);
router.get("/:UserId", getUserById);
router.patch("/:UserId", updateUserById);
router.delete("/:UserId", deleteUserById);

router.post("/login", loginUser);

export default router;
