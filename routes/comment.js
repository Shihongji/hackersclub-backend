import express from 'express';
const router = express.Router();
import {
  getAllComments,
  createComment,
  getCommentById,
  updateCommentById,
  deleteCommentById,
} from '../controllers/comment.js';

router.get('/', getAllComments);
router.post('/', createComment);
router.get('/:commentId', getCommentById);
router.put('/:commentId', updateCommentById);
router.delete('/:commentId', deleteCommentById);

export default router;
