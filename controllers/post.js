import Post from "../models/post.js";

export const getAllPosts = async (req, res) => {
  // Destructuring query parameters with default values for pagination and sorting.
  const {
    page = 1,
    limit = 20,
    sortBy = "created",
    order = "desc",
    filter = "",
  } = req.query;
  try {
    // Use the countDocuments() method to get the total number of stories
    // Too expensive to run on large datasets, don't use in production!
    // const total = await Post.countDocuments();
    // Finding posts with optional filtering, sorting, and pagination:
    // 1. Filters posts by title using a regular expression for a case-insensitive search.
    // 2. Sorts the posts based on the sortBy parameter and order.
    // 3. Limits the number of posts returned to the specified limit.
    const posts = await Post.find({ title: { $regex: filter, $options: "i" } })
      .sort({ [sortBy]: order === "desc" ? -1 : 1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .populate("userId", "username")
      .select("title created_at commentIds userId")
      .lean(); // Returns a plain JavaScript object instead of a mongoose document instance.

    const modifiedPosts = posts.map((post) => ({
      title: post.title,
      author: post.userId.username,
      created_at: post.created_at,
      total_comments: post.commentIds.length,
    }));

    res.status(200).json({
      results: modifiedPosts,
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePostById = async (req, res) => {
  const { postId } = req.params;
  const { title, url, text, categoryId, is_deleted, tags } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const updatePost = { title, url, text, categoryId, is_deleted, tags };
    const updatedPost = await Post.findByIdAndUpdate(postId, updatePost, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePostById = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleVisibility = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "No post found with this ID" });
    }

    // Updating with the opposite of current visibility
    post.is_visible = !post.is_visible;
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleDeletion = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "No post found with this ID" });
    }

    // Updating with the opposite of current delete status
    post.is_deleted = !post.is_deleted;
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const toggleSticky = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "No post found with this ID" });
    }

    // Updating with the opposite of current sticky status
    post.is_stickied = !post.is_stickied;
    await post.save();

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
