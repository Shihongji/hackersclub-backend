import mongoose from 'mongoose';

// user model
const { Schema } = mongoose;
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  created: { type: Date, default: Date.now },
  avatar: String,
  bio: String,
  role: { type: String, default: 'user' },
  refreshToken: String,
});

const User = mongoose.model('User', userSchema);

export default User;
