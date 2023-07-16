import express from 'express';
const router = express.Router();
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
} from '../controllers/user.js';

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:UserId', getUserById);
router.patch('/:UserId', updateUserById);
router.delete('/:UserId', deleteUserById);

export default router;
