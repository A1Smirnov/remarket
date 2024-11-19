// src/types/express/index.d.ts
import { IUserPayload } from '../../middlewares/authMiddleware';

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload; // Расширяем Request с полем user
    }
  }
}
