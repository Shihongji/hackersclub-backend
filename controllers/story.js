import Story from "../models/story.js";

export const getAllStories = async (req, res) => {
  // Some queries
  const { page = 1, limit = 20, sortBy = 'created', order = 'desc', filter = '' } = req.query; 
  try {
    // Use the countDocuments() method to get the total number of stories 
    const total = await Story.countDocuments();
    // Use the find function with the limit and skip functionality for pagination
    // Use the sort function to sort the getAllStories 
    // Use the reges to filter the getAllStories
    const stories = await Story.find({ title: { $regex: filter, $options: 'i' } })
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.status(200).json({
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalStories: total,
      stories,
    });
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
