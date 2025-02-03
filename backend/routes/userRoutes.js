import express from 'express';
import { authUser,  registerUser, logoutUser,getUserProfile, updateUserProfile, getUsers } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/userModel.js';


const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password, isAdmin } = req.body;
  
    try {
      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create new user
      const user = new User({ name, email, password, isAdmin });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  });
router.post('/auth', authUser);
router.get('/', protect, getUsers);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;