import express from 'express';
const router = express.Router();
import { getProducts, getProductById, createProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const Product = require('../models/productModel');

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.get('/cart', async (req, res) => {
    try {
      const cartItems = await Product.find(); // Fetch all products or based on some criteria
      res.json(cartItems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;