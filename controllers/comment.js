import Comment from "../models/comment.js";
import Post from "../models/post.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

export const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCommentById = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      req.body,
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteCommentById = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId).populate("commentIds");
    res.status(200).json(post.commentIds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCommentByPostId = async (req, res) => {
  const { postId } = req.params;
  try {
    const newComment = await Comment.create(req.body);
    const post = await Post.findById(postId);
    post.commentIds.push(newComment._id);
    await post.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export const getCommentsByUserId = async (req, res) => {
  try {
    const comments = await Comment.find({ userId: req.params.userId }).populate('postId', 'title'); // when displaying comments, we also want to show the post title
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
