// backend/src/routes/authRoutes.ts

import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User';

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

export default router;
