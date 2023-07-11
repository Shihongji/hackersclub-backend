import mongoose from 'mongoose';

// Define the schema for the Story model
const { Schema } = mongoose;
const storySchema = new Schema({
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

// Create the Story model using the schema
const Story = mongoose.model('Story', storySchema);

export default Story;
