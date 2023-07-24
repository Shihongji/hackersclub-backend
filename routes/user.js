import auth from "../middleware/auth.js";
import express from "express";
import multer from "multer";
import path from "path";

// This will configure multer to store incoming files in a directory named "uploads" in your server.
// Each file will be given a unique filename.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage });

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
