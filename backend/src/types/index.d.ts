import { Express } from 'express';
import { User } from '@prisma/client';

export interface AuthUser extends User {}

declare global {
  namespace Express {
    interface User extends AuthUser {}
  }
}
