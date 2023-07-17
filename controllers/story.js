import Story from "../models/story.js";

export const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const createStory = async (req, res) => {
  try {
    const newStory = await Story.create(req.body);
    res.status(201).json(newStory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.storyId);
    if (!story) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStoryById = async (req, res) => {
  try {
    const updatedStory = await Story.findByIdAndUpdate(
      req.params.storyId,
      req.body,
      { new: true }
    );
    if (!updatedStory) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.status(200).json(updatedStory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteStoryById = async (req, res) => {
  try {
    const deletedStory = await Story.findByIdAndDelete(req.params.storyId);
    if (!deletedStory) {
      return res.status(404).json({ error: "Story not found" });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
