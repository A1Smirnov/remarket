import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  user: IUser['_id'];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
