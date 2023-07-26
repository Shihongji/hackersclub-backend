import VerificationCode from "../models/verification.js";
import User from "../models/user.js";
import { sendVerificationEmail } from "../middleware/mailer.js";

export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  // Check if email already exists
  let userByEmail = await User.findOne({ email });
  if (userByEmail) {
    res.status(400).json({ message: `${email} is already registered` });
  } else {
    // Generate verification code
    const code = Math.floor(1000000 * Math.random()).toString();

    // Save verification code to database
    const verificationCode = new VerificationCode({
      email,
      code,
    });
    await verificationCode.save();

    // Send verification code to user's email
    sendVerificationEmail(email, code);

    res.status(200).json({ message: `Verification code sent to ${email}` });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, code } = req.body;

  // Check the verificationCode in database
  const verificationCode = await VerificationCode.findOne({ email, code });

  if (verificationCode) {
    res.json({ message: "Email verified" });
  } else {
    res.status(400).json({ message: "Invalid verification code" });
  }
};
