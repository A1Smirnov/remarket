// backend/src/routes/productRoutes.ts

import express, { Request, Response } from 'express';
import Product from '../models/Product';
import { IUser } from '../models/User';

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products or filter by category
 *     parameters:
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         description: Filter products by category
 *     responses:
 *       200:
 *         description: List of products
 */


// GET /api/products
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    let products;
    if (category) {
      products = await Product.find({ category: category });
    } else {
      products = await Product.find();
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
});

// POST /api/products
router.post('/', async (req: Request, res: Response) => {
    try {
      const { name, description, price, category, stock, userId } = req.body;
  
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
  
      // Connection to User
      const product = new Product({
        name,
        description,
        price,
        category,
        stock,
        user: userId,  // userId to conn
      });
  
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (err) {
      res.status(400).json({ message: 'Error creating product', error: err });
    }
  });
  

// GET /api/products/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product details', error: err });
  }
});

// PUT /api/products/:id
router.put('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: 'Error updating product', error: err });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting product', error: err });
  }
});

export default router;
