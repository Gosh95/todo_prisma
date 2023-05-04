import { RequestHandler } from 'express';

class AuthMiddleware {
  isAuthenticated: RequestHandler = (req, _res, next) => {
    if (req.isAuthenticated()) {
      next();
    }
    next(new Error('Authentication is required.'));
  };
}

export default AuthMiddleware;
