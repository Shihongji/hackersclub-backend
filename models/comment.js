import mongoose from 'mongoose';

// Define comment schema
const { Schema } = mongoose;
const commentSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  created: { type: Date, default: Date.now },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
