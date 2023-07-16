import express from 'express';
const router = express.Router();
import {
  getAllStories,
  createStory,
  getStoryById,
  updateStoryById,
  deleteStoryById,
} from '../controllers/story.js';

router.get('/', getAllStories);
router.post('/', createStory);
router.get('/:storyId', getStoryById);
router.put('/:storyId', updateStoryById);
router.delete('/:storyId', deleteStoryById);

export default router;
