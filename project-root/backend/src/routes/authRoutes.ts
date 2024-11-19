// backend/src/routes/authRoutes.ts

import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';
import { protect } from '../middlewares/authMiddleware';
import { sendResetPasswordEmail } from '../services/emailService';

const router = express.Router();

const generateToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET!, { expiresIn: '1h' });
};

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    const savedUser = await newUser.save();

    const token = generateToken(savedUser._id.toString(), savedUser.role);

    res.status(201).json({ token, user: { id: savedUser._id, name: savedUser.name, email: savedUser.email, role: savedUser.role } });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err });
  }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id.toString(), user.role);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});

// GET /api/auth/profile
router.get('/profile', protect, async (req: Request, res: Response) => {
  try {
    const user = await User.findById((req as any).user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile', error: err });
  }
});

// POST /api/auth/forgot-password
router.post('/forgot-password', async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Генерация токена для сброса пароля
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '15m' });

    // Отправка письма с токеном
    await sendResetPasswordEmail(user.email, resetToken);

    res.json({ message: 'Password reset link sent to your email.' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending reset link.', error: err });
  }
});

// POST /api/auth/reset-password
router.post('/reset-password', async (req: Request, res: Response) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password has been reset successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Error resetting password.', error: err });
  }
});

export default router;
