import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import postsRoutes from "./routes/post.js";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comment.js";
import categoryRoutes from "./routes/category.js";
import verifyEmail from './routes/verification.js';
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

const app = express();
dotenv.config();

// Connect to MongoDB
const DB_URI = process.env.DB_URI;

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
// Configuring the Cloudinary SDK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(cors());

// Use stories routes
app.use("/posts", postsRoutes);
// user routes
app.use("/users", userRoutes);
// comment routes
app.use("/comments", commentRoutes);
// category routes
app.use("/categories", categoryRoutes);
// verification routes 
app.use("/verify", verifyEmail);

app.get("/", (req, res) => {
  res.json([
    {
      title: "First message from server",
      user: "Admin",
      content: "Server of Hackers Club website is running successfully!",
    },
    {
      title: "Second message from server",
      user: "Admin",
      content: "You can play around!",
    },
  ]);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
