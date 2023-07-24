import express from 'express';
const router = express.Router();
import {
  getAllComments,
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
  getCommentsByPostId,
} from '../controllers/comment.js';

router.get('/', getAllComments);
router.post('/', createComment);
router.get('/:commentId', getCommentById);
router.put('/:commentId', updateCommentById);
router.delete('/:commentId', deleteCommentById);
router.get('/commentsByPost/:postId', getCommentsByPostId);

export default router;
