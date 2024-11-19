// backend/src/models/User.ts

import mongoose, { Schema, Document, ObjectId } from 'mongoose';

export type Role = 'user' | 'admin';

export interface IUser extends Document {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: Role;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    verified: { type: Boolean, default: false }, // !!! Account verified by email
  },
  {
    timestamps: true,
  }
);

// Index for fast email response
UserSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', UserSchema);
