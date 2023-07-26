import express from 'express';
import { sendVerificationCode, verifyEmail, forgotPassword, resetPassword } from '../controllers/verification.js';

const router = express.Router();

router.post('/send-verification-email', sendVerificationCode);
router.post('/verify-verification-code', verifyEmail);
// forgot password
// reset password
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
export default router;
