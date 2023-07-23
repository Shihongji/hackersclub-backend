import express from 'express';
const router = express.Router();
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
} from '../controllers/post.js';

router.get('/', getAllPosts);
router.post('/', createPost);
router.get('/:postId', getPostById);
router.put('/:postId', updatePostById);
router.delete('/:postId', deletePostById);

export default router;
