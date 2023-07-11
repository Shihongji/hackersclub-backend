import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import storiesRoutes from "./routes/story.js";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comment.js";
import categoryRoutes from "./routes/category.js";
import mongoose from "mongoose";

const app = express();
dotenv.config();

// Connect to MongoDB
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(express.json());
app.use(cors());

// Use stories routes
app.use("/stories", storiesRoutes);
// user routes
app.use("/users", userRoutes);
// comment routes 
app.use("/comments", commentRoutes);
// category routes 
app.use("/categories", categoryRoutes);

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
