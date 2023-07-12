import express from 'express';
const router = express.Router();
import Story from '../models/story.js';
// import StoriesController from '../api/stories.controller.js';

// @route   GET /stories
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
// router.route('/').get(StoriesController.apiGetStories);

router.post('/', async (req, res) => {
  try {
    const newStory = await Story.create(req.body);
    res.status(201).json(newStory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:storyId', async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:storyId', async (req, res) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(req.params.storyId, req.body, { new: true });
    if (!updatedStory) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(200).json(updatedStory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:storyId', async (req, res) => {
  try {
    const deletedStory = await Story.findByIdAndDelete(req.params.storyId);
    if (!deletedStory) {
      return res.status(404).json({ error: 'Story not found' });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
