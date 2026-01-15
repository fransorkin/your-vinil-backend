const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;

    if (!username || !email || !password || !passwordConfirm) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['username', 'email', 'password', 'passwordConfirm'],
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        message: 'Passwords do not match',
        error: 'password and passwordConfirm must be identical',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Password too short',
        error: 'Password must be at least 6 characters',
      });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists',
        error: existingUser.email === email ? 'Email already registered' : 'Username already taken',
      });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      message: 'Error registering user',
      error: error.message,
    });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Missing required fields',
        required: ['email', 'password'],
      });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
        error: 'Email or password is incorrect',
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
        error: 'Email or password is incorrect',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Error logging in',
      error: error.message,
    });
  }
});

// GET /api/auth/profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile retrieved successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({
      message: 'Error retrieving profile',
      error: error.message,
    });
  }
});

// POST /api/auth/logout
router.post('/logout', authenticate, (req, res) => {
  res.status(200).json({
    message: 'Logout successful',
    note: 'Delete the token from client side',
  });
});

module.exports = router;
