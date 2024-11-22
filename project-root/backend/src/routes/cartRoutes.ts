// backend/routes/cartRoutes.ts
import express, { Request, Response } from 'express';
import Cart from '../models/Cart';
import Product from '../models/Product';


const router = express.Router();

// Получить корзину для пользователя
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Добавить товар в корзину
router.post('/:userId', async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      const newCart = new Cart({
        userId: req.params.userId,
        items: [{ productId, quantity }],
      });
      await newCart.save();
      return res.status(201).json(newCart);
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error adding item to cart' });
  }
});

// Обновить количество товара в корзине
router.put('/:userId/:productId', async (req: Request, res: Response) => {
  const { quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === req.params.productId
    );
    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return res.json(cart);
    }

    res.status(404).json({ message: 'Product not found in cart' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating cart' });
  }
});

// Удалить товар из корзины
router.delete('/:userId/:productId', async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== req.params.productId
    );
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Error removing item from cart' });
  }
});

export default router;
