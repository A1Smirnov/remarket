// backend/src/models/Cart.ts
import mongoose, { Schema, Document } from 'mongoose';

interface CartItem {
  productId: mongoose.Schema.Types.ObjectId;
  quantity: number;
}

interface Cart extends Document {
  userId: string;
  items: CartItem[];
}

const CartSchema = new Schema<Cart>({
  userId: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

const CartModel = mongoose.model<Cart>('Cart', CartSchema);

export default CartModel;
