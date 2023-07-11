import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import Story from './models/story.js';
import { faker } from '@faker-js/faker';

dotenv.config();
const { DB_URL } = process.env;
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Define a Schema
const { Schema } = mongoose;
const blogSchema = new Schema({
  title: String,
  pub_date: Date,
  content: String,
});

// Create a model 
const Blog = mongoose.model('Blog', blogSchema);

// Generate and insert dummy data
async function generateData(n) {
  for (let i = 0; i < n; i++) {
    const newBlog = new Blog({
      title: faker.lorem.sentence(),
      pub_date: faker.date.recent(),
      content: faker.lorem.paragraphs(),
    });
    await newBlog.save();
  }

  console.log('Data generated successfully!');
}

generateData(100);
