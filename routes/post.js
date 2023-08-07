import express from 'express';
const router = express.Router();
import {
  getAllPosts,
  createPost,
  getPostById,
  updatePostById,
  deletePostById,
  getPostBySlug,
  toggleVisibility,
  toggleDeletion,
  toggleSticky,
} from '../controllers/post.js';

router.get('/', getAllPosts);
router.post('/', createPost);
router.get('/id/:postId', getPostById);
router.put('/:postId', updatePostById);
router.delete('/:postId', deletePostById);
router.get('/:slug', getPostBySlug);
router.patch('/:postId/visibility', toggleVisibility);
router.patch('/:postId/deletion', toggleDeletion);
router.patch('/:postId/sticky', toggleSticky);

export default router;
