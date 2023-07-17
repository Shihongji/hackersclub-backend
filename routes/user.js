import auth from '../middleware/auth.js';
import express from 'express';
const router = express.Router();
import {
  getAllUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
} from '../controllers/user.js';

router.get('/', auth, getAllUsers);
router.post('/', createUser);
router.get('/:UserId', getUserById);
router.patch('/:UserId', updateUserById);
router.delete('/:UserId', deleteUserById);

router.post('/login', loginUser);

export default router;
