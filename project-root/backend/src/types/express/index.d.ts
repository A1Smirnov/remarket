// src/types/express/index.d.ts
import { IUserPayload } from '../../middlewares/authMiddleware';
import { Role } from '../models/User'; 

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
      };
    }
  }
}
