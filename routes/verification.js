import express from 'express';
import { sendVerificationCode, verifyEmail } from '../controllers/verification.js';

const router = express.Router();

router.post('/send-verification-email', sendVerificationCode);
router.post('/verify-verification-code', verifyEmail);

export default router;
