import mongoose from 'mongoose';

// Define the schema for the Story model
const { Schema } = mongoose;
const postSchema = new Schema({
  author: String,
  title: String,
  url: String,
  text: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  commentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  // tags: [String],
});

// Create the Post model using the schema
const Post = mongoose.model('Post', postSchema,);

export default Post;
