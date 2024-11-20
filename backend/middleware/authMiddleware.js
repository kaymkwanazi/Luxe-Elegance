import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    console.log('No token found');
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);

    req.user = await User.findById(decoded.userId).select('-password');
    if (!req.user) {
      console.log('User not found');
      return res.status(401).json({ message: 'User not found' });
    }
    
    console.log('User authenticated:', req.user);
    next();
  } catch (error) {
    console.log('Token is not valid', error);
    res.status(401);
    throw new Error('Not authorized, token invalid');
  }
});

export { protect };