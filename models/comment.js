import mongoose from 'mongoose';

// Define comment schema
const { Schema } = mongoose;
const commentSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  created: { type: Date, default: Date.now },
  storyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
